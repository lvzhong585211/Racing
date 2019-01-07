namespace Logic {
    /**
     * 定义地图上格子的标记
     */
    export enum EMapCellFlag {
        Obstacle = 0,       // 不可以通过  
        Pass = 1,           // 可以通过        
        SafeRegion = 255,   // 安全区
    }

    /**
     * 定义用于查找路径的结构
     */
    export interface IMoveComponent {
        SpriteType: EActorType;
        Coordinate: Laya.Point;
    }

    /**
     * 定义格子的坐标类型. 注:主要用作 GMapData 中格子的坐标.
     */
    export class CellCoord {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    export type Coord2D = CellCoord;    // 2D坐标系(服务坐标系). 注:专门定义类型是方便读懂代码

    /**
     * 游戏地图的模板数据，主要指图形相关的数据，如障碍物，寻路格子信息等。
     * 注: 这里有两个概念在不同的地方有不同的名称: levelId 对应 mapCode, mapId 对应 mapPicCode,主要是方便在不同地方兼容,以后再统一修改名称
     */
    export class GMapData {
        private mMapWidth: number;  // 地图宽度
        private mMapHeight: number; // 地图高度
        private mGridSizeX = 200;   // 障碍物格子X宽度(将来从配置读取)
        private mGridSizeY = 200;   // 障碍物格子Y高度(将来从配置读取)
        private mGridSizeXNum = 0;  // 障碍物格子X的个数
        private mGridSizeYNum = 0;  // 障碍物格子Y的个数
        private mFixedObstruction: Global.Uint8ArrayGrid;        // 障碍物(干净的，原始的)
        private mTerrainWithTeleports: Global.Uint8ArrayGrid;    // 地形格子(带传送点的, 安全区等)
        private mHoldRole: number = 0;   // 是否一个格子只能占一个角色
        private mHoldMonster: number = 0; // 是否一个格子只能占一个怪物
        private mHoldNPC: number = 0;    // 是否一个格子只能占一个NPC
        private mMapGrid: MapGrid;      // 地图格子的管理
        private mConfig: tables.LevelConfigInfo;            // 关卡配置

        private mPathGrid: PathFinding.core.Grid;           // 用于A*寻路的数据
        private mPathFinder: PathFinding.finders.AStarFinder; // A*算法

        public get fixedObstruction() {
            return this.mFixedObstruction;
        }

        public get mapWidth() {
            return this.mMapWidth;
        }

        public get mapHeight() {
            return this.mMapHeight;
        }

        public get gridSizeX() {
            return this.mGridSizeX;
        }

        public get gridSizeY() {
            return this.mGridSizeY;
        }

        public get mapGrid() {
            return this.mMapGrid;
        }

        public get HoldRole() {
            return this.mHoldRole;
        }

        public get HoldMonster() {
            return this.mHoldMonster;
        }

        public get HoldNPC() {
            return this.mHoldNPC;
        }

        public get Config() {
            return this.mConfig;
        }

        /**
         * 加载关卡相关的逻辑数据
         * @param mapPicCode 指定要加载的数据的地图Id
         * @param dataName 指定要加载的数据文件名称
         * @param progress 用于显示进度
         */
        public async load(mapCode: number, mapPicCode: number, progress?: Laya.Handler): Promise<boolean> {

            const toLoadResNames = ["obs", "anquanqu"];  // 要加载的资源名称

            await GMapData.loadMapData(mapPicCode, toLoadResNames, progress);

            this.loadObstruction(mapCode, mapPicCode);
            this.loadAnQuanQu(mapCode, mapPicCode);

            // 关卡配置
            this.mConfig = tableMgr.levelConfigTable.Find(mapCode);

            // 构造寻路使用的数据            
            this.mPathGrid = new PathFinding.core.Grid(this.mFixedObstruction.xSize, this.mFixedObstruction.ySize);
            // 填充寻路的障碍物信息
            for (let y = 0; y < this.mGridSizeYNum; y++) {
                for (let x = 0; x < this.mGridSizeXNum; x++) {
                    const walkable = (this.mFixedObstruction.get(x, y) === EMapCellFlag.Pass);
                    this.mPathGrid.setWalkableAt(x, y, walkable);
                }
            }
            this.mPathFinder = new PathFinding.finders.AStarFinder({ diagonalMovement: 1 });  // 允许斜角移动

            // 清理使用完成的资源
            GMapData.clearSceneData(mapPicCode, toLoadResNames);
            return true;
        }

        /**
         * 清理指定的资源
         * @param mapPicCode 指定要清理的资源对应的地图Id
         * @param resNames 指定要清理的资源名称
         */
        private static clearSceneData(mapPicCode: number, resNames: string[]): void {
            // 清理加载的资源
            resNames.forEach(resName => {
                const fileUrl = Global.getMapJsonPath(mapPicCode, resName);
                Laya.loader.clearRes(fileUrl);
            });
        }

        /**
         * 封装的加载给定地图数据的函数
         * @param mapPicCode 指定要加载的地图Id
         * @param dataName 指定要加载的数据文件名称. 支持加载一组资源
         * @param progress 用于显示进度
         * @return 返回加载成功的资源对象,否则返回null
         * 注: 此函数支持重入
         */
        private static async loadMapData(mapPicCode: number, dataName: string | string[], progress?: Laya.Handler): Promise<any> {
            let fileUrls: any;
            if (Array.isArray(dataName)) {
                fileUrls = [];
                dataName.forEach(resName => {
                    fileUrls.push(Global.getMapJsonPath(mapPicCode, resName));
                });
            } else {
                fileUrls = Global.getMapJsonPath(mapPicCode, dataName);
            }
            const obsData = await Global.Utils.LoadRes(fileUrls, progress);
            if (!obsData) {
                Global.Log.Assert(false);
                return null;
            }

            return obsData;
        }

        /**
         * 加载障碍物信息
         * @param mapCode 指定关卡的ID
         * @param mapPicCode 指定要从中加载障碍物的地图Id
         * @param progress 进度更新回调函数
         */
        private loadObstruction(mapCode: number, mapPicCode: number) {
            Global.ReEnterCheck.tryEnter(this.loadObstruction);

            const fileUrl = Global.getMapJsonPath(mapPicCode, "obs");
            const obsData = Laya.loader.getRes(fileUrl);
            if (!obsData) {
                Global.ReEnterCheck.leave(this.loadObstruction);
                Global.Log.Assert(false);
                return false;
            }

            this.mMapWidth = parseInt(obsData.MapWidth);
            this.mMapHeight = parseInt(obsData.MapHeight);

            this.mMapGrid = new MapGrid(mapCode, this.mMapWidth, this.mMapHeight, this.gridSizeX, this.gridSizeY, this);

            let wGridsNum = (this.mapWidth - 1) / this.gridSizeX | 0 + 1;
            let hGridsNum = (this.mapHeight - 1) / this.gridSizeY | 0 + 1;

            wGridsNum = Math.ceil(Math.log2(wGridsNum));
            wGridsNum = Math.floor(Math.pow(2, wGridsNum));

            hGridsNum = Math.ceil(Math.log2(hGridsNum));
            hGridsNum = Math.floor(Math.pow(2, hGridsNum));

            this.mGridSizeXNum = wGridsNum;
            this.mGridSizeYNum = hGridsNum;

            // 设置道路通过的默认值
            const fixedObs = new Global.Uint8ArrayGrid(wGridsNum, hGridsNum);
            for (let row = 0; row < hGridsNum; row++) {
                for (let col = 0; col < wGridsNum; col++) {
                    //  最外边一圈及地图外固定为障碍
                    if (row === 0 || row >= hGridsNum - 1 || col === 0 || col >= wGridsNum - 1)
                        fixedObs.set(row, col, EMapCellFlag.Obstacle);
                    else
                        fixedObs.set(row, col, EMapCellFlag.Pass);  // 设置默认值为可以通过
                }
            }
            this.mFixedObstruction = fixedObs;

            // 从配置中读取道路通过性. 具体见各个地图的 obs.json 文件
            const obstruction = (obsData.Value as string).split(",");
            for (let index = obstruction.length - 1; index >= 0; --index) {
                const obsInfo = obstruction[index];
                if (obsInfo.trim() === "")
                    continue;
                const obstructionXY = obsInfo.split("_");
                const xIndex = parseInt(obstructionXY[0]) / 2;
                const yIndex = parseInt(obstructionXY[1]) / 2;
                if (xIndex < 0 || xIndex >= wGridsNum || yIndex < 0 || yIndex >= hGridsNum) {
                    continue;
                }

                fixedObs.set(xIndex, yIndex, EMapCellFlag.Obstacle);
            }

            // 复制一份数据到地形格子
            this.mTerrainWithTeleports = fixedObs.clone();

            // TODO: ... 一些场景会有临时的障碍物?

            Global.ReEnterCheck.leave(this.loadObstruction);
            return true;
        }

        /**
         * 加载安全区信息
         * @param mapCode
         * @param mapPicCode
         * @param progress
         */
        private loadAnQuanQu(mapCode: number, mapPicCode: number) {
            Global.ReEnterCheck.tryEnter(this.loadAnQuanQu);

            // 加载资源数据
            const fileUrl = Global.getMapJsonPath(mapPicCode, "anquanqu");
            const anquanquData = Laya.loader.getRes(fileUrl);
            if (!anquanquData) {
                Global.ReEnterCheck.leave(this.loadAnQuanQu);
                Global.Log.Assert(false);
                return false;
            }

            const terrainWithTeleports = this.mTerrainWithTeleports;

            // 从配置中读取道路通过性. 具体见各个地图的 obs.json 文件
            const obstruction = (anquanquData.Value as string).split(",");
            for (let index = obstruction.length - 1; index >= 0; --index) {
                const obsInfo = obstruction[index];
                if (obsInfo.trim() === "")
                    continue;
                const obstructionXY = obsInfo.split("_");
                const xIndex = parseInt(obstructionXY[0]) / 2;
                const yIndex = parseInt(obstructionXY[1]) / 2;
                if (xIndex < 0 || xIndex >= this.mGridSizeXNum || yIndex < 0 || yIndex >= this.mGridSizeYNum) {
                    continue;
                }

                terrainWithTeleports.set(xIndex, yIndex, EMapCellFlag.SafeRegion);
            }

            Global.ReEnterCheck.leave(this.loadAnQuanQu);
            return true;
        }

        /**
         * 设置传送点
         * @param nTeleportPosX 传送点X位置
         * @param nTeleportPosY 传送点Y位置
         * @param nTeleportRadius 传送点有效半径
         * @param nTeleportKey 传送点ID
         */
        public setTeleport(nTeleportPosX: number, nTeleportPosY: number, nTeleportRadius: number, nTeleportKey: number) {
            //  modify by DJ  之前计算起点和终点的操作时，进行了 +2 和 -2 的操作， 现在去掉了， 地图放大两倍用之前的公式会有问题
            const startX = Math.floor((nTeleportPosX - nTeleportRadius) / this.gridSizeX); // +2
            const endX = Math.floor((nTeleportPosX + nTeleportRadius) / this.gridSizeX);   // -2
            const startY = Math.floor((nTeleportPosY - nTeleportRadius) / this.gridSizeY); // +2
            const endY = Math.floor((nTeleportPosY + nTeleportRadius) / this.gridSizeY);   // -2
            // 设定传送区域(10-19)
            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    if ((x >= 0 && x < this.gridSizeX) && (y >= 0 && y < this.gridSizeY)) {
                        this.mTerrainWithTeleports.set(x, y, nTeleportKey);
                    }
                }
            }
        }

        /**
         * 获取对应坐标位置的格子标记
         * @param cx 指定要查询的坐标(2D坐标系)
         * @param cy 指定要查询的坐标(2D坐标系)
         */
        public getCellFlag(cx: number, cy: number): number {
            if (cx >= this.mMapWidth || cy >= this.mMapHeight) {
                return 0;
            }

            const nGridX = cx / this.mGridSizeX | 0;
            const nGridY = cy / this.mGridSizeY | 0;
            return this.mTerrainWithTeleports.get(nGridX, nGridY);
        }

        /**
         * 加载地图的配置项
         */
        private LoadMapConfig(): void {
            Global.Log.Assert(false);   // to do ...
        }

        /**
         * 把2D坐标转换到格子坐标系
         * @param coord 指定要转换的2D坐标
         */
        public toGridCoordFrom2D(coord: Coord2D): CellCoord {
            return new CellCoord(
                coord.x / this.mGridSizeX | 0,
                coord.y / this.mGridSizeY | 0
            );
        }

        /**
         * 把2D坐标转换到对应格子的中心点坐标系
         * @param coord 指定要转换的2D坐标
         */
        public toCellCenterCoordFrom2D(coord: Coord2D): CellCoord {
            return new CellCoord(
                (coord.x / this.mGridSizeX | 0) * this.mGridSizeX + this.mGridSizeX / 2,
                (coord.y / this.mGridSizeY | 0) * this.mGridSizeY + this.mGridSizeY / 2
            );
        }

        /**
         * 查询给定的坐标是否在安全区内
         * @param cx 指定要查询的坐标(2D坐标系)
         * @param cy 指定要查询的坐标(2D坐标系)
         */
        public inSafeRegion(cx: number, cy: number): boolean {
            return EMapCellFlag.SafeRegion === this.getCellFlag(cx, cy);
        }

        /**
         * 沿给定路径获取最长的非障碍路径 *
         * @param path 给定路径
         */
        private getLinearPath(path: ANode[]): ANode[] {
            const path1 = new Array<ANode>();
            for (let i = 0; i < path.length; i++) {
                if (path[i].x >= this.mFixedObstruction.xSize || path[i].y >= this.mFixedObstruction.ySize) {
                    continue;
                }

                // 不可移动点
                if (EMapCellFlag.Obstacle === this.mFixedObstruction.get(path[i].x, path[i].y)) {
                    break;
                }

                path1.push(path[i]);
            }

            return path1;
        }

        /**
         * 算两个格子之间的近似直线的块的算法
         * @param s 用于输出查找到格子
         * @param x1,y1 起始点(格子坐标系)
         */
        private bresenham(s: ANode[], x1: number, y1: number, x2: number, y2: number): boolean {
            let t: number, x: number, y: number, dx: number, dy: number, error: number;
            const flag = Math.abs(y2 - y1) > Math.abs(x2 - x1);
            if (flag) {
                t = x1; x1 = y1; y1 = t;
                t = x2; x2 = y2; y2 = t;
            }

            let reverse = false;
            if (x1 > x2) {
                t = x1; x1 = x2; x2 = t;
                t = y1; y1 = y2; y2 = t;
                reverse = true;
            }
            dx = x2 - x1;
            dy = Math.abs(y2 - y1);
            error = dx / 2;
            for (x = x1, y = y1; x <= x2; ++x) {
                if (flag) {
                    s.push(new ANode(y, x));
                }
                else {
                    s.push(new ANode(x, y));
                }

                error -= dy;
                if (error < 0) {
                    if (y1 < y2)
                        ++y;
                    else
                        --y;
                    error += dx;
                }
            }

            if (reverse) {
                s.reverse();
            }

            const s1 = this.getLinearPath(s);
            const res = (s1.length === s.length);

            s.splice(0, s.length);
            s.concat(s1);

            return res;
        }

        /**
         * 寻找一个直线的两点间的从开始点出发的最大无障碍点
         * @param start 起始点
         * @param to 终点
         */
        public findLinearNoObsMaxPoint(start: CellCoord, to: CellCoord): Laya.Point {
            const path = new Array<ANode>();
            this.bresenham(path, start.x, start.y, to.x, to.y);
            if (path.length > 1) {
                const pathNode = path[path.length - 1];
                return new Laya.Point(pathNode.x, pathNode.y);
            }
            return null;
        }

        /**
         * 从距离一个点的固定距离的4个方向中，选择一个没有障碍物的点
         * @param p         目标点
         * @param offset    偏移距离
         */
        public getAPointIn4Direction(p: Laya.Point, offset: number): Laya.Point {
            if (!this.fixedObstruction) {
                return p;
            }

            const px = p.x | 0;
            const py = p.y | 0;

            let x = px;
            let y = py;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min(this.mapWidth - 1, x);
            y = Math.min(this.mapHeight - 1, y);
            if (this.fixedObstruction.get(Math.floor(x / this.mGridSizeX), Math.floor(y / this.mGridSizeY)) > 0) {
                return new Laya.Point(x, y);
            }

            x = px - offset;
            y = py;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min(this.mapWidth, x);
            y = Math.min(this.mapHeight, y);
            if (this.fixedObstruction.get(Math.floor(x / this.mGridSizeX), Math.floor(y / this.mGridSizeY)) > 0) {
                return new Laya.Point(x, y);
            }

            x = px + offset;
            y = py;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min(this.mapWidth, x);
            y = Math.min(this.mapHeight, y);
            if (this.fixedObstruction.get(Math.floor(x / this.mGridSizeX), Math.floor(y / this.mGridSizeY)) > 0) {
                return new Laya.Point(x, y);
            }

            x = px;
            y = py - offset;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min(this.mapWidth, x);
            y = Math.min(this.mapHeight, y);
            if (this.fixedObstruction.get(Math.floor(x / this.mGridSizeX), Math.floor(y / this.mGridSizeY)) > 0) {
                return new Laya.Point(x, y);
            }
            x = px;
            y = py + offset;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min(this.mapWidth, x);
            y = Math.min(this.mapHeight, y);
            if (this.fixedObstruction.get(Math.floor(x / this.mGridSizeX), Math.floor(y / this.mGridSizeY)) > 0) {
                return new Laya.Point(x, y);
            }
            return p;
        }

        /**
         * 从距离一个点的固定距离的4个方向中，选择一个没有障碍物的点
         * @param worldPoint 目标点(服务器坐标系)
         * @return 查找到点(服务器坐标系)
         */
        public getAGridPointIn4DirectionWithWorldCoord(worldPoint: Laya.Point): Laya.Point {
            const inPoint = this.toGridCoordFrom2D(worldPoint);
            const retPoint = this.getAGridPointIn4Direction(inPoint);
            if (retPoint === inPoint) {
                return worldPoint;   // 可以直接使用原来的位置
            }

            retPoint.x = retPoint.x * this.gridSizeX;
            retPoint.y = retPoint.y * this.gridSizeY;
            return new Laya.Point(retPoint.x, retPoint.y);
        }

        /**
         * 从距离一个点的固定距离的4个方向中，选择一个没有障碍物的点
         * @param gridPoint 格子坐标系
         * @return 查找到坐标(格子坐标系)
         */
        private getAGridPointIn4Direction(gridPoint: CellCoord): CellCoord {
            const gridX = gridPoint.x;
            const gridY = gridPoint.y;

            const obs = this.fixedObstruction;
            if (gridX >= obs.xSize || gridY >= obs.ySize) {
                return gridPoint;
            }

            if (obs.get(gridX, gridY) === EMapCellFlag.Pass) {
                return gridPoint;
            }

            let p = gridPoint;

            const maxGridX: number = (this.mapWidth - 1) / this.gridSizeX | 0 + 1;
            const maxGridY: number = (this.mapHeight - 1) / this.gridSizeY | 0 + 1;
            let added = 1;
            let newX1 = 0;
            let newY1 = 0;
            let newX2 = 0;
            let newY2 = 0;
            while (true) {
                newX1 = gridX + added;
                newY1 = gridY + added;
                newX2 = gridX - added;
                newY2 = gridY - added;
                let total = 8;
                if ((0 <= newX1 && newX1 < maxGridX) && (0 <= newY1 && newY1 < maxGridY)) {
                    total--;
                    if (obs.get(newX1, newY1) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX1, newY1);
                        break;
                    }
                }
                if ((0 <= newX1 && newX1 < maxGridX) && (0 <= newY2 && newY2 < maxGridY)) {
                    total--;

                    if (obs.get(newX1, newY2) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX1, newY2);
                        break;
                    }
                }
                if ((0 <= newX2 && newX2 < maxGridX) && (0 <= newY1 && newY1 < maxGridY)) {
                    total--;
                    if (obs.get(newX2, newY1) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX2, newY1);
                        break;
                    }
                }
                if ((0 <= newX2 && newX2 < maxGridX) && (0 <= newY2 && newY2 < maxGridY)) {
                    total--;
                    if (obs.get(newX2, newY2) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX2, newY2);
                        break;
                    }
                }
                if ((0 <= newX1 && newX1 < maxGridX)) {
                    total--;
                    if (obs.get(newX1, gridY) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX1, gridY);
                        break;
                    }
                }
                if ((0 <= newY1 && newY1 < maxGridY)) {
                    total--;

                    if (obs.get(gridX, newY1) === EMapCellFlag.Pass) {
                        p = new Laya.Point(gridX, newY1);
                        break;
                    }
                }
                if ((0 <= newX2 && newX2 < maxGridX)) {
                    total--;
                    if (obs.get(newX2, gridY) === EMapCellFlag.Pass) {
                        p = new Laya.Point(newX2, gridY);
                        break;
                    }
                }
                if ((0 <= newY2 && newY2 < maxGridY)) {
                    total--;
                    if (obs.get(gridX, newY2) === EMapCellFlag.Pass) {
                        p = new Laya.Point(gridX, newY2);
                        break;
                    }
                }

                if (total >= 8) {
                    break;
                }
                added++;
            }
            return p;
        }

        /**
         * 在给定目标点周围随机一个点,并返回寻路路径
         * @param sprite
         * @param p
         * @param offset
         */
        public findAPointIn4Direction(sprite: IMoveComponent, p: Laya.Point, offset: number): ANode[] {
            const start = this.toGridCoordFrom2D(sprite.Coordinate);
            let end = this.toGridCoordFrom2D(p);
            end = this.getAGridPointIn4Direction(end);

            return this.findPath(sprite, start, end);
        }

        /**
         * 查找路径点
         * @param sprite 指定寻路信息
         * @param start 起点(格子坐标系)
         * @param end 结束点(格子坐标系)
         */
        public findPath(sprite: IMoveComponent, start: CellCoord, end: CellCoord): ANode[] {
            if (!this.CanWalk(sprite.SpriteType, start)) {
                start = this.getAGridPointIn4Direction(start);
                if (!this.CanWalk(sprite.SpriteType, start)) {
                    return null;
                }
            }

            if (!this.CanWalk(sprite.SpriteType, end)) {
                const maxPoint = this.findLinearNoObsMaxPoint(start, end);
                if (maxPoint)
                    end = maxPoint;
            }

            // 格子状态需要重置,因为我们会复用它
            this.mPathGrid.reset();
            // 查找路径
            let rawPathNode = this.mPathFinder.findPath(start.x, start.y, end.x, end.y, this.mPathGrid);

            if (rawPathNode.length <= 0) {
                return null;    // 没有找到路径点
            }

            // 优化一下路径点
            rawPathNode = PathFinding.core.Util.smoothenPath(this.mPathGrid, rawPathNode);
            // rawPathNode = PathFinding.core.Util.compressPath(rawPathNode);

            // 把找到路径节点复制成我们需要的格式
            const retNodes = new Array<ANode>();
            rawPathNode.forEach((pathNode) => {
                retNodes.push(new ANode(pathNode[0], pathNode[1]));
            });

            return retNodes;
        }

        private CanWalk(objType: EActorType, node: CellCoord): Boolean {
            if (node.x >= this.fixedObstruction.xSize) {
                return false;
            }

            if (node.y >= this.fixedObstruction.ySize) {
                return false;
            }

            if (0 === this.fixedObstruction.get(node.x, node.y)) {
                return false;
            }
            return true;
        }

        /**
         * 判断是否在障碍物上
         * @param p                 坐标(2D坐标)
         */
        public onObstruction(p: Coord2D): boolean {

            let x: number = Math.max(0, p.x | 0);
            let y: number = Math.max(0, p.y | 0);
            x = Math.min(this.mapWidth, x);
            y = Math.min(this.mapHeight, y);

            const gridXNum: number = x | 0 / this.gridSizeX | 0;
            const gridYNum: number = y | 0 / this.gridSizeY | 0;
            return this.onObstructionByGrid(new Laya.Point(gridXNum, gridYNum));
        }

        /**
         * 判断是否在障碍物上
         * @param grid
         * @param currentMapData
         */
        public onObstructionByGrid(grid: CellCoord): boolean {
            const gridXNum: number = grid.x | 0;
            const gridYNum: number = grid.y | 0;
            if (EMapCellFlag.Obstacle === this.fixedObstruction.get(gridXNum, gridYNum)) {
                return true;
            }
            return false;
        }

        /**
         * ???? 
         * @param pt1
         * @param pt2
         * @param stepLength
         */
        public getAStepPoint(pt1: Laya.Point, pt2: Laya.Point, stepLength: number): Laya.Point {
            let pt: Laya.Point;
            if (pt1.x !== pt2.x && pt1.y !== pt2.y) {
                pt = Global.getExtensionPoint(pt1, pt2, stepLength);
                if (this.onObstruction(pt))
                    pt = this.getAPointIn4Direction(pt1, stepLength);
            }
            else {
                pt = new Laya.Point(pt1.x - stepLength, pt1.y - stepLength);
                if (this.onObstruction(pt)) {
                    pt = this.getAPointIn4Direction(pt1, stepLength);
                }
            }
            pt.x = pt.x < 0 ? 0 : pt.x;
            pt.x = pt.x > this.mapWidth ? this.mapWidth : pt.x;
            pt.y = pt.y < 0 ? 0 : pt.y;
            pt.y = pt.y > this.mapHeight ? this.mapHeight : pt.y;
            return pt;
        }

        /**
         * 设置指定坐标点周围为安全区
         * @param gridX 指定要设置成安全区的点的坐标X
         * @param gridY 指定要设置成安全区的点的坐标Y
         * @param gridNum 指定要设置成安全区的范围
         */
        public setPartialSafeRegion(gridX: number, gridY: number, gridNum: number) {
            const terrainWithTeleports = this.mTerrainWithTeleports;
            const startGridX = Math.max(0, gridX - gridNum);
            const startGridY = Math.max(0, gridY - gridNum);

            const endGridX = Math.min(this.mGridSizeXNum - 1, gridX + gridNum);
            const endGridY = Math.min(this.mGridSizeYNum - 1, gridY + gridNum);

            for (let x = startGridX; x <= endGridX; x++) {
                for (let y = startGridY; y <= endGridY; y++) {
                    terrainWithTeleports.set(x, y, EMapCellFlag.SafeRegion);
                }
            }
        }

        /**
         * 设置指定坐标点周围为障碍物区
         * @param gridX 指定要设置成障碍物区的点的坐标X
         * @param gridY 指定要设置成障碍物区的点的坐标Y
         * @param npcInfo 指定使用的NPC信息
         */
        public setPartialCollideRegion(gridX: number, gridY: number, npcInfo: tables.NPCInfoVO) {
            if (npcInfo.ObstacleX || npcInfo.ObstacleY) {
                const gridNumX = npcInfo.ObstacleX;
                const gridNumY = npcInfo.ObstacleY;

                const fixedObstruction = this.mFixedObstruction;

                const startGridX = Math.max(0, gridX - gridNumX);
                const startGridY = Math.max(0, gridY - gridNumY);

                const endGridX = Math.min(this.mGridSizeXNum - 1, gridX + gridNumX);
                const endGridY = Math.min(this.mGridSizeYNum - 1, gridY + gridNumY);

                for (let x = startGridX; x <= endGridX; x++) {
                    for (let y = startGridY; y <= endGridY; y++) {
                        fixedObstruction.set(x, y, EMapCellFlag.Obstacle);
                        this.mPathGrid.setWalkableAt(x, y, false);
                    }
                }
            }
        }
    }
}