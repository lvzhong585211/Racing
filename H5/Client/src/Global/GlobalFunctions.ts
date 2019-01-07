/** 定义一些全局访问的公共函数 */
namespace Global {
    /**
     * 计算原始的职业ID
     * (现有职业+1)*10 + 转职次数
     * @param Occupation 要计算原始职业ID的ID
     */
    export function CalcOriginalOccupationID(Occupation: number): number {
        // 如果还没转过职
        const nCurOcc = Occupation;
        if (nCurOcc < 10) return nCurOcc;

        // 取得转职次数
        const nCount = nCurOcc % 10;

        return (nCurOcc - nCount) / 10 - 1;
    }

    /**
     * 根据职业获取对应角色的骨架资源的名称
     * @param occupation 指定要获取骨架资源名称的职业
     */
    export function getSkeletonNameByOccupation(occupation: number): string {
        let skeletonName = null;
        occupation = CalcOriginalOccupationID(occupation);

        if (EnumOccupation.LongDan === occupation) {
            skeletonName = "ZS_Skeleton";
        } else if (EnumOccupation.HuaLing === occupation) {
            skeletonName = "FS_Skeleton";
        } else if (EnumOccupation.QiaoGong === occupation) {
            skeletonName = "GS_Skeleton";
        } else if (EnumOccupation.DouXian === occupation) {
            skeletonName = "DouXian_Skeleton";
        } else {
            Global.Log.Assert(false);
        }

        return skeletonName;
    }

    /**
     * 获取裸模的部件名称列表.它必须与BodyPartIDs枚举的有效部位相符
     */
    export function getNakePartsList(occupation: EnumOccupation): string[] {
        switch (occupation) {
            case EnumOccupation.LongDan:
                return ["ZS_Head_01", "ZS_chest_01"];

            case EnumOccupation.HuaLing:
                return ["FS_Head_01", "FS_chest_01"];

            case EnumOccupation.QiaoGong:
                return ["DouXian_head_01", "DouXian_chest_01"];
            case EnumOccupation.DouXian:
                return ["DouXian_head_01", "DouXian_chest_01"];

            default:
                Global.Log.Assert(false);
        }
        return [];
    }

    /**
     *  * 给指定的玩家模型更换装备.注:此函数会考虑时装,即时装的模型会覆盖穿戴的其它装备
     * @param playerView 用来加载显示装备的玩家视图
     * @param equipDataList 指定要更换的装备列表,它应该包含了玩家身上所有的装备,包含武器
     * @param CalcSlotTypeFun 回调函数(做武器挂点判断，因为可能会有多种武器不同位置放置，所以在函数里做判断，不在换装的底层判断)
     */
    export function changePlayerEquip(playerView: Logic.CharacterView, equipDataList: NetMsg.IGoodsData[], CalcSlotTypeFun: Function) {
        // to do ... 如果装备中有时装,则获取时装的道具列表.

        playerView.changeEquip(equipDataList, CalcSlotTypeFun);
    }

    /**
     * 从身体部位到物品类型的转换
     * @param bodyPartId
     */
    export function getItemCategoriyByBodyPartId(bodyPartId: number): ItemCategories {
        return bodyPartId as ItemCategories;
    }

    /**
     * 由物品类型转换成对应的身体装配位
     * @param itemCategoriy 指定要转换的物品类型
     */
    export function getBodySlotByItemCategoriy(itemCategoriy: number): BodyPartIDs {
        if (
            itemCategoriy <= BodyPartIDs.Invalid ||
            itemCategoriy >= BodyPartIDs.Max
        )
            return BodyPartIDs.Invalid;
        return itemCategoriy as BodyPartIDs;
    }

    /**
     * 由物品的类型来判定是否属于武器
     * @param itemCategoriy
     */
    export function isWeapon(itemCategoriy: ItemCategories) {
        if (
            itemCategoriy >= ItemCategories.WeaponStart &&
            itemCategoriy <= ItemCategories.WeaponEnd
        )
            return true;
        return false;
    }

    import Quaternion = Laya.Quaternion;

    /**
     *  将dir转换成Quaternion
     * @param dir 指定要转换成弧度的度数(服务器坐标系)
     */
    export function GetQuaternionByDir(dir: number): Laya.Quaternion {
        let dirInDegree = 0;
        if (0 === dir) {
            dirInDegree = 0;
        } else if (1 === dir) {
            dirInDegree = 45;
        } else if (2 === dir) {
            dirInDegree = 90;
        } else if (3 === dir) {
            dirInDegree = 135;
        } else if (4 === dir) {
            dirInDegree = 180;
        } else if (5 === dir) {
            dirInDegree = -135;
        } else if (6 === dir) {
            dirInDegree = -90;
        } else if (7 === dir) {
            dirInDegree = -45;
        }

        dirInDegree = Global.GSAngle2Laya(dirInDegree); // 转换到Laya坐标系

        const target = new Quaternion();
        Quaternion.createFromYawPitchRoll(
            Laya.Utils.toRadian(dirInDegree),
            0,
            0,
            target,
        );
        return target;
    }

    /**
     * 把GS坐标系的角度转换成Laya坐标系的角度
     * @param angle GS坐标系的角度(度)
     */
    export function GSAngle2Laya(angle: number): number {
        return 360 - angle + 180;   // 服务器的x轴与Layabox的坐标轴相反的
    }

    /**
     * 把GameServer的x轴坐标转换成Laya的. 注:GameServer(Unity3D)是左手坐标系,LayaBox是右手坐标系
     * @param posX 指定要转换的U3D坐标x
     */
    export function GSCoordX2Laya(posX: number): number {
        return -posX / 100;
    }

    /**
     * 把GameServer的y轴坐标转换成Laya的. 注:GameServer(Unity3D)是左手坐标系,LayaBox是右手坐标系
     * @param posY 指定要转换的U3D坐标y
     */
    export function GSCoordY2Laya(posY: number): number {
        return posY / 100;
    }

    /**
     * 把给定的限定在给定的范围内
     * @param value 要限定的值
     * @param min 最小值
     * @param max 最大值
     */
    export function clamp(value: number, min: number, max: number): number {
        if (value > max) {
            return max;
        } else if (value < min) return min;
        return value;
    }

    /**
     * 返回帧间隔(秒)
     */
    export function getDeltaTime(): number {
        return Laya.timer.delta * 0.001;
    }

    /// <summary>
    ///   <para>Returns a copy of vector with its magnitude clamped to maxLength.</para>
    /// </summary>
    /// <param name="vector"></param>
    /// <param name="maxLength"></param>
    export function ClampMagnitude(vector: Vector3, maxLength: number): Vector3 {
        if (Vector3.scalarLengthSquared(vector) > maxLength * maxLength) {
            return vector.normalizedClone().multiply(maxLength);
        } else {
            return vector;
        }
    }

    // 功能:		随着时间的推移,把一个位置向目标位置改变
    // 参数:		current - 当前的位置
    // 			target - 我们试图到达的位置
    // 			currentVelocity - 当前速度,这个值在每次调用本函数时会被修改
    // 			smoothTime - 到达目标的近似时间,越小越快到达目标
    // 			maxSpeed - 可选参数,允许你限制最大速度
    // 			deltaTime - 上次调用本函数以来经过的时间,默认时表示使用Vision.GetTimer()->GetTimeDifference()
    // 注:	本函数会使用一些弹簧阻尼的函数来平滑变量,永远不会超过目标变量,常见是用来平滑跟随相机
    export function SmoothDamp(
        current: Vector3,
        target: Vector3,
        currentVelocity: Vector3,
        smoothTime: number,
        maxSpeed: number = 999,
        deltaTime: number = getDeltaTime(),
    ): Vector3 {
        // 从Unity3D中抄来的算法
        smoothTime = Math.max(0.0001, smoothTime);
        const num = 2.0 / smoothTime;
        const num2 = num * deltaTime;
        const d =
            1.0 / (1.0 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);

        // let vector = current - target;
        let vector = current.subtractClone(target);
        const vector2 = target.cloneEx();
        const maxLength = maxSpeed * smoothTime;
        vector = ClampMagnitude(vector, maxLength);

        // let vTarget = current - vector;
        const vTarget = current.subtractClone(vector);

        // let vector3 = (currentVelocity + num * vector) * deltaTime;
        const vector3 = currentVelocity
            .addClone(vector.multiplyClone(num))
            .multiplyClone(deltaTime);

        // currentVelocity = (currentVelocity - num * vector3) * d;
        currentVelocity.subtract(vector3.multiplyClone(num)).multiply(d);

        // hkvVec3 vector4 = vTarget + (vector + vector3) * d;
        let vector4 = vTarget.addClone(vector.addClone(vector3).multiplyClone(d));

        // if ((vector2 - current).dot(vector4 - vector2) > 0)
        if (
            Vector3.dot(
                vector2.subtractClone(current),
                vector4.subtractClone(vector2),
            ) > 0
        ) {
            // vector4 = vector2;
            vector4 = vector2.cloneEx();
            // currentVelocity = (vector4 - vector2) / deltaTime;
            vector4
                .subtractClone(vector2)
                .multiply(1.0 / deltaTime)
                .cloneTo(currentVelocity);
        }
        return vector4;
    }

    /**
     * 根据两点间的方向和限定角度，求360度范围内的夹角(重新理解注释：就是身前的视角） </br>
     * 注意：该方法与原始方法不同的地方是第一个参数从方向变成了角度，调用的时候注意下
     * @param angleRotation 旋转角度
     * @param angleLimit 角度限制
     * @return { loAngle: number, hiAngle: number } loAngle=角度范围下限值、hiAngle=角度范围上限值
     */
    export function GetAngleRangeByDirection(/*direction: number*/angleRotation: number, angleLimit: number): { loAngle: number, hiAngle: number } {
        let nLoAngle = 0;
        let nHiAngle = 360;
        if (angleLimit <= 0 || angleLimit >= 360.0) {
            return { loAngle: nLoAngle, hiAngle: nHiAngle };
        }

        const centerAngle = angleRotation; // 45 * direction;
        nHiAngle = centerAngle + (angleLimit / 2);
        if (nHiAngle >= 360) nHiAngle = nHiAngle - 360;
        nLoAngle = centerAngle - (angleLimit / 2);
        if (nLoAngle < 0) nLoAngle = 360 + nLoAngle;
        return { loAngle: nLoAngle, hiAngle: nHiAngle };
    }

    /**
     * 判断点是否在圆内(非常适合计算扇形攻击内的目标), 这个是以中心点的面向作为y轴正方向？？？
     * @param target 目标点坐标
     * @param center 圆心坐标
     * @param radius 圆半径
     * @param loAngle 角度范围下限值
     * @param hiAngle 角度范围上限值
     */
    export function InCircleByAngle(target: Laya.Point, center: Laya.Point, radius: number, loAngle: number, hiAngle: number): boolean {
        const angle = GetCircleAngle(center, target);
        if (!InAngleRange(angle, loAngle, hiAngle)) {
            return false;
        }
        return Math.pow(target.x - center.x, 2) + Math.pow(target.y - center.y, 2) <= Math.pow(radius, 2) ? true : false;
    }

    /**
     * 射线p0->p1相对于Y轴负向顺时针旋转角度
     * @param p0 p0点
     * @param p1 p1点
     */
    export function GetCircleAngle(p0: Laya.Point, p1: Laya.Point): number {
        if (p0.x === p1.x && p0.y === p1.y) {
            return 0;
        }
        let rotateDegree = Math.atan2(Math.abs(p1.y - p0.y), Math.abs(p1.x - p0.x)) * 180 / Math.PI;
        if (p1.x >= p0.x && p0.y < p1.y) { // 第一象限
            rotateDegree = 90 - rotateDegree;
        } else if (p1.x >= p0.x && p0.y >= p1.y) { // 第二象限
            rotateDegree = 90 + rotateDegree;
        } else if (p1.x < p0.x && p0.y >= p1.y) { // 第三象限
            rotateDegree = 270 - rotateDegree;
        } else if (p1.x < p0.x && p0.y < p1.y) { // 第四象限
            rotateDegree = 270 + rotateDegree;
        }
        return rotateDegree;
    }

    /**
     * 求角度是否在某个角度范围内
     * @param angle 指定的角度
     * @param loAngle 角度范围下限值
     * @param hiAngle 角度范围上限值
     */
    export function InAngleRange(angle: number, loAngle: number, hiAngle: number): boolean {
        if (hiAngle > loAngle) {
            return (angle >= loAngle && angle <= hiAngle);
        }
        return (angle >= loAngle && angle < 360) || (angle >= 0 && angle <= hiAngle);
    }

    /**
     * 求两点间的距离
     * @param start 开始的点
     * @param end 结束的点
     */
    export function GetTwoPointDistance(start: Laya.Point, end: Laya.Point): number {
        return start.distance(end.x, end.y);
    }

    /**
     * 格式化带战区的角色名称
     * @param zoneID 指定战区Id
     * @param roleName 指定角色名称
     */
    export function formatRoleNameZoneid(zoneID: number, roleName: string): string {
        if (zoneID) {
            return String.Format(Loca.getLang("[{0}区]{1}"), zoneID, roleName);
        }
        return roleName;
    }

    export function ParsePropNameInfo(
        propName: string,
        goodsName: string,
        forge_level: number,
        quality: number,
    ): void {
        goodsName = propName;
        forge_level = 0;
        quality = 0;

        if (String.IsNullOrWhiteSpace(propName)) {
            return;
        }

        const fields: string[] = propName.split("|");
        if (null == fields || fields.length < 3) {
            return;
        }

        goodsName = fields[0];

        forge_level = parseInt(fields[1]);
        quality = parseInt(fields[2]);
    }

    /**
     * 以Html的形式来格式化给定的参数: 参数依次是颜色，字符串，颜色，字符串
     * @param _args 传入要格式化的颜色与字符串
     */
    export function GetColorStringForNGUIText(...args): string {
        let retString = "";
        for (let index = 1; index < args.length; index = index + 2) {
            retString += `<font color='#${args[index - 1]}'>${args[index]}</font>`; // 如 <font color='#f2b308'>[主]前往城外</font>去[皇都原]找<font color='#49bd1b'>王云</font>对话<font color='#e73722'>(0/1)<br/></font>
        }
        return retString;
    }

    /**
     * 获取NPC或怪物的地图Id
     * @param mapCode 指定原始地图ID,如果不存在,则使用玩家所在的地图Id
     */
    export function getNPCOrMonsterMapCodeByID(mapCode: number): number {
        if (mapCode < 0) {
            return gameIns.gameState.roleData.MapCode;
        }

        return mapCode;
    }

    /**
     * 根据关卡ID和怪物ID获取怪物所在的位置
     * @param mapCode 指定关卡
     * @param monsterID 指定要获取位置的怪物Id
     * 注: 此函数是异步的,要注意!!!
     */
    export async function GetMonsterPointByID(
        mapCode: number,
        monsterID: number,
    ): Promise<Laya.Point> {
        const table = await tableMgr.getLevelMonstersTable(mapCode);
        if (!table) {
            return null;
        }

        // 在指定的怪物中随机找一个作为返回的坐标点
        const allCoord: Laya.Point[] = [];
        table.AllRows().forEach(monsterInfo => {
            if (monsterInfo.Code === monsterID) {
                allCoord.push(new Laya.Point(monsterInfo.X, monsterInfo.Y));
            }
        });

        if (allCoord.length > 0) {
            const index = Math.random() * (allCoord.length - 1) | 0;
            return allCoord[index];
        }

        return null;
    }

    /**
     * 根据关卡Id和npcID获取所在的位置
     * @param mapCode 指定关卡
     * @param npcID 指定要获取位置的NPC
     * 注: 此函数是异步的,一定要注意!!!
     */
    export async function getNPCPointByID(mapCode: number, npcID: number): Promise<Laya.Point> {
        const table = await tableMgr.getLevelNpcTable(mapCode);
        if (table) {
            const npcInfo = table.Find(npcID);
            if (npcInfo) {
                return new Laya.Point(npcInfo.X, npcInfo.Y);
            }
        }
        return new Laya.Point(-1, -1);
    }

    /**
     * 获取系统配置参数中的整型参数
     * @param name
     * @returns {}
     */
    export function GetSystemParamIntByName(name: string): number {
        Global.Log.Assert(false);   // to do ...
        return 1;
        /**
         * TODO:
         */
        /**
                let value:string = GetSystemParamByName(name);
                if (String.IsNullOrWhiteSpace(value))
                {
                    return -1;
                }
                try
                {
                    return ConvertExt.SafeToInt64(value);
                }
                catch (Exception e)
                {
                    GError.AddErrMsg(string.Format(Loca.getLang("将系统配置参数转为整型时异常, {0}=>{1}"), name, value));
                    Debug.LogException(e);
                }
                return -1; */
    }

    /**
     * 把给定的限定在给定的范围内
     * @param target 目标点
     * @param center 圆心坐标
     * @param radius 圆半径
     */
    export function inCircle(target: Laya.Point, center: Laya.Point, radius: number): boolean {
        // const lenght1: number = Math.pow(target.x - center.x, 2) + Math.pow(target.y - center.y, 2);
        // const lenght2: number = Math.pow(radius, 2);
        // return lenght1 <= lenght2;

        // 寻路开始时是通过两点距离（平方根）和偏移位置的结果计算是否需要寻路的，所以判断寻路结束也是用平方根的方式。
        // 不然会导致寻路是否结束的判断不准确（在区域地图点击“人族守卫·王云”，第二次之后如果使用上面的结算结果返回的就是错误的）。
        const lenght1: number = target.distance(center.x, center.y) | 0;
        return lenght1 <= radius;
    }

    /**
     * 根据两点及延伸长度获取延伸后的点
     * @param start         起点
     * @param end           终点
     * @param length        距离
     */
    export function getExtensionPoint(start: Laya.Point, end: Laya.Point, length: number): Laya.Point {
        const scale: number = start.distance(end.x, end.y) / length;
        // return new Laya.Point((start.x + (end.x - start.x) / scale) | 0, (start.y + (end.y - start.y) / scale) | 0);

        // 让start.x和start.y加减的都是整数，不然加减完之后再取整会出现多1和少1的情况，导致位置不准备
        return new Laya.Point(start.x + ((end.x - start.x) / scale | 0), start.y + ((end.y - start.y) / scale | 0));
    }

    /**
     * 通过正切值获取精灵的朝向代号
     * @param targetX   目标点的X值
     * @param targetY   目标点的Y值
     * @param currentX  当前点的X值
     * @param currentY  当前点的Y值
     * 精灵朝向代号(以北为0顺时针依次1,2,3,4,5,6,7)
     */
    export function getDirectionByTan(targetX: number, targetY: number, currentX: number, currentY: number): number {
        let direction: number = 0;
        if (targetX < currentX) {
            if (targetY < currentY) {
                direction = 5;
            }
            else if (targetY === currentY) {
                direction = 6;
            }
            else if (targetY > currentY) {
                direction = 7;
            }
        }
        else if (targetX === currentX) {
            if (targetY < currentY) {
                direction = 4;
            }
            else if (targetY > currentY) {
                direction = 0;
            }
        }
        else if (targetX > currentX) {
            if (targetY < currentY) {
                direction = 3;
            }
            else if (targetY === currentY) {
                direction = 2;
            }
            else if (targetY > currentY) {
                direction = 1;
            }
        }
        return direction;
    }

    /**
     * 获取道具类型名称
     * @param value 道具分类
     */
    export function GetGoodsType(value: ItemCategories) {
        if (isWeapon(value)) {
            return ConfigLoca.UI_GOODS_TYPE_WEAPON; // "武器";
        }
        if (value >= ItemCategories.HeartStart && value <= ItemCategories.HeartEnd) {
            return ConfigLoca.UI_GOODS_TYPE_ELEMENT_HEART; // "元素之心";
        }
        if (value >= ItemCategories.SoulCometStoneStart && value <= ItemCategories.SoulCometStoneEnd) {
            return ConfigLoca.UI_GOODS_TYPE_SOUL_STONE; // "魂石";
        }

        switch (value) {
            case ItemCategories.TouKui: return ConfigLoca.UI_GOODS_TYPE_HELMET; // "头盔";
            case ItemCategories.KaiJia: return ConfigLoca.UI_GOODS_TYPE_ARMOUR; // "铠甲";
            case ItemCategories.HuShou: return ConfigLoca.UI_GOODS_TYPE_HANDGUARD; // "护手";
            case ItemCategories.HuTui: return ConfigLoca.UI_GOODS_TYPE_LEGGUARD; // "护腿";
            case ItemCategories.XueZi: return ConfigLoca.UI_GOODS_TYPE_SHOES; // "靴子";
            case ItemCategories.JieZhi: return ConfigLoca.UI_GOODS_TYPE_RING; // "戒指";
            case ItemCategories.JieHunJieZhi: return ConfigLoca.UI_GOODS_TYPE_WEDDINGRING; // "婚戒";
            case ItemCategories.Fashion_Wing:
            case ItemCategories.ChiBang: return ConfigLoca.UI_GOODS_TYPE_WING; // "翅膀";
            case ItemCategories.ChongWu:
            case ItemCategories.ShouHuChong: return ConfigLoca.UI_GOODS_TYPE_RIDING; // "骑宠";
            case ItemCategories.MengChongWu: return ConfigLoca.UI_GOODS_TYPE_PET; // "萌宠";
            case ItemCategories.ItemMengchongEgg: return ConfigLoca.UI_GOODS_TYPE_PET_EGG; // "萌宠蛋";
            case ItemCategories.ItemTask: return ConfigLoca.UI_GOODS_TYPE_TASK_ITEM; // "任务道具";
            case ItemCategories.ItemHorsePet: return ConfigLoca.UI_GOODS_TYPE_RIDING_ITEM; // "骑宠道具";
            case ItemCategories.ItemBook: return ConfigLoca.UI_GOODS_TYPE_BOOK; // "书籍";
            case ItemCategories.ItemOther: return ConfigLoca.UI_GOODS_TYPE_SUNDRY; // "杂物";
            case ItemCategories.ItemJewel: return ConfigLoca.UI_GOODS_TYPE_GEM; // "宝石";
            case ItemCategories.ItemMagic: return ConfigLoca.UI_GOODS_TYPE_SCROLL; // "卷轴";
            case ItemCategories.ItemMakings: return ConfigLoca.UI_GOODS_TYPE_COMPOSITE; // "合成材料";
            case ItemCategories.ItemMaterial:
            case ItemCategories.MoneyPack: return ConfigLoca.UI_GOODS_TYPE_CONSUMABLE; // "消耗材料";
            case ItemCategories.ItemDrug: return ConfigLoca.UI_GOODS_TYPE_DRUG; // "药品";
            case ItemCategories.ItemAddVal: return ConfigLoca.UI_GOODS_TYPE_PANACEA; // "灵丹";
            case ItemCategories.ItemBuffer: return ConfigLoca.UI_GOODS_TYPE_BUFFER; // "Buffer类";
            case ItemCategories.ItemNormalPack: return ConfigLoca.UI_GOODS_TYPE_NORMAL_PACK; // "普通包裹";
            case ItemCategories.ItemUpPack: return ConfigLoca.UI_GOODS_TYPE_UP_PACK; // "升级包裹";
            case ItemCategories.YinLiangPack: return ConfigLoca.UI_GOODS_TYPE_GOLD_PACKAGE; // "金币包";
            case ItemCategories.TreasureBox: return ConfigLoca.UI_GOODS_TYPE_TREASURE; // "宝箱";
            case ItemCategories.JingMai: return ConfigLoca.UI_GOODS_TYPE_VEIN; // "经脉";
            case ItemCategories.WuXue: return ConfigLoca.UI_GOODS_TYPE_WUXUE; // "武学";
            case ItemCategories.ChengJiu: return ConfigLoca.UI_GOODS_TYPE_ACHIEVEMENT; // "成就";
            case ItemCategories.BindMoneyFu: return ConfigLoca.UI_GOODS_TYPE_FORTUNE_CAT; // "招财符";
            case ItemCategories.RongYuHuTi: return ConfigLoca.UI_GOODS_TYPE_HONOR_CARE; // "荣耀护体";
            case ItemCategories.ZhanHunHuTi: return ConfigLoca.UI_GOODS_TYPE_SOUL_CARE; // "战魂护体";
            case ItemCategories.BangQiHuTi: return ConfigLoca.UI_GOODS_TYPE_FLAG_CARE; // "战旗护体";
            case ItemCategories.HuFu: return ConfigLoca.UI_GOODS_TYPE_AMULET; // "护符";
            case ItemCategories.XiangLian: return ConfigLoca.UI_GOODS_TYPE_NECKLACE; // "项链";
            case ItemCategories.Fashion_Title: return ConfigLoca.UI_GOODS_TYPE_TITLE; // "称号";
            case ItemCategories.Decoration: return ConfigLoca.UI_GOODS_TYPE_DECORATION; // "饰品";
            case ItemCategories.Fashion: ConfigLoca.UI_GOODS_TYPE_FASHION; // return "时装";
            case ItemCategories.FluorescentDiamond: return ConfigLoca.UI_GOODS_TYPE_FLUOR_STONE; // "荧光宝石";
        }
        return "";
    }

    /**
     * 获取职业名称
     * @param nOccu 职业ID
     */
    export function getOccupationStr(nOccu: EnumOccupation) {
        switch (nOccu) {
            case EnumOccupation.LongDan:
                return ConfigLoca.UI_OCCUPATION_LongDan;
            case EnumOccupation.HuaLing:
                return ConfigLoca.UI_OCCUPATION_HuaLing;
            case EnumOccupation.QiaoGong:
                return ConfigLoca.UI_OCCUPATION_QiaoGong;
            case EnumOccupation.DouXian:
                return ConfigLoca.UI_OCCUPATION_DouXian;
        }
        return "";
    }

    /**
     * 获取道具限制职业
     * @param occup 职业ID
     */
    export function GetOccupationStrByGoods(occup: number) {
        const aOccupation: string[] = [];
        if (0 !== (1 & occup)) {
            aOccupation.push(ConfigLoca.UI_OCCUPATION_LongDan);
        }
        if (0 !== (2 & occup)) {
            aOccupation.push(ConfigLoca.UI_OCCUPATION_HuaLing);
        }
        if (0 !== (4 & occup)) {
            aOccupation.push(ConfigLoca.UI_OCCUPATION_QiaoGong);
        }
        if (0 !== (8 & occup)) {
            aOccupation.push(ConfigLoca.UI_OCCUPATION_XingZhe);
        }
        if (0 !== (16 & occup)) {
            aOccupation.push(ConfigLoca.UI_OCCUPATION_DouXian);
        }
        return aOccupation.join(",");
    }

    /**
     * 根据货币类型返回主角拥有的数量
     * @param type 货币类型
     */
    export function GetRoleOwnNumByMoneyType(type: MoneyTypes): number {
        let hasNum = 0;
        switch (type) {
            case MoneyTypes.TongQian:
                hasNum = gameIns.gameState.roleData.Money1;
                break;
            case MoneyTypes.YinLiang:
                hasNum = gameIns.gameState.roleData.YinLiang;
                break;
            case MoneyTypes.BindYuanBao:
                hasNum = gameIns.gameState.roleData.Gold;
                break;
            case MoneyTypes.YuanBao:
                hasNum = gameIns.gameState.roleData.UserMoney;
                break;
            case MoneyTypes.JingYuanZhi:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.TianDiJingYuan);
                break;
            case MoneyTypes.JunGongZhi:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.JunGong);
                break;
            case MoneyTypes.LieShaZhi:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.LieShaZhi);
                break;
            case MoneyTypes.JiFenZhi:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ZhuangBeiJiFen);
                break;
            case MoneyTypes.ZhanHun:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.ZhanHun);
                break;
            case MoneyTypes.KingOfBattlePoint:
                hasNum = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.KingOfBattlePoint);
                break;
            case MoneyTypes.BangGong:
                hasNum = gameIns.gameState.roleData.BangGong;
                break;
        }
        return hasNum;
    }

    /**
     * 取整数的某一位，返回某一位的值（0或者1）
     * @param resource 要取某一位的整数
     * @param mask 要取的位置索引，自右至左为0-7
     */
    export function GetIntSomeBit(resource: number, mask: number): number {
        return resource >> mask & 1;
    }

    /**
     * 得到物品的类型
     * @param goodsID
     */
    export function GetCategoriyByGoodsID(goodsID: number): number {
        return tableMgr.goodsTable.getCategoriy(goodsID);
    }

    /**
     * 获取道具与人物身上装备对比后各项属性的差值
     * @param gd 装备数据
     * @param CompareType 武器的手持状态
     */
    export function GetCompareAttributeInfo(gd: NetMsg.IGoodsData, CompareType: HandTypes = HandTypes.None): Map<number, number> {
        let AttributeInfoDic = new Map<number, number>();
        const gdAttributeDic = GetGoodsBasicAttribute(gd);
        const unGoodsList: NetMsg.IGoodsData[] = [];
        let iHandType = HandTypes.None;
        const equipCategory = GetCategoriyByGoodsID(gd.GoodsID);
        if (equipCategory >= ItemCategories.WuQi_Jian && equipCategory <= ItemCategories.WuQi_NuJianTong) { // 判断要佩戴的道具否是武器
            const actionType = GetGoodsActionNameByID(gd.GoodsID);
            const gdLeft = Super.FindUsingEuip(equipCategory, HandTypes.ZuoShou); // 0为左手佩戴-右侧武器栏 1为右手佩戴-左侧武器栏
            const gdRight = Super.FindUsingEuip(equipCategory, HandTypes.YouShou); // 0为左手佩戴-右侧武器栏 1为右手佩戴-左侧武器栏
            const iLeftAttributegDic = GetGoodsBasicAttribute(gdLeft);
            const iRightAttributegDic = GetGoodsBasicAttribute(gdRight);
            // 如果要佩戴的是剑\斧\槌\矛\刀
            if (equipCategory === <number>ItemCategories.WuQi_Jian || equipCategory === <number>ItemCategories.WuQi_Fu
                || equipCategory === <number>ItemCategories.WuQi_Chui || equipCategory === <number>ItemCategories.WuQi_Mao
                || equipCategory === <number>ItemCategories.WuQi_Dao) {
                if (actionType === WeaponStates.D) { // 如果是单手武器
                    if (gdRight == null || gdLeft == null) {
                        if (gdRight != null) {
                            const rGoodVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                            const iRightCategoriy = rGoodVO.Categoriy;
                            const iRightHandType = rGoodVO.HandType;
                            const iRightActionType = rGoodVO.ActionType;
                            if (iRightActionType === WeaponStates.S || iRightActionType === WeaponStates.MJ) { // 如果右手是双手武器就卸
                                AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                            } else {
                                AttributeInfoDic = gdAttributeDic;
                            }
                        } else {
                            AttributeInfoDic = gdAttributeDic;
                        }
                    } else if (CompareType === HandTypes.ZuoShou) {
                        const goodVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
                        const iLeftCategoriy = goodVO.Categoriy;
                        const iLeftHandType = goodVO.HandType;
                        if (iLeftCategoriy !== <number>ItemCategories.WuQi_Jian || iLeftCategoriy !== <number>ItemCategories.WuQi_Fu
                            || iLeftCategoriy !== <number>ItemCategories.WuQi_Chui || iLeftCategoriy !== <number>ItemCategories.WuQi_Mao
                            || iLeftCategoriy !== <number>ItemCategories.WuQi_Dao) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                            iHandType = HandTypes.ZuoShou;
                        }
                    } else if (CompareType === HandTypes.YouShou) {
                        const rGoodVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                        const iRightCategoriy = rGoodVO.Categoriy;
                        const iRightHandType = rGoodVO.HandType;
                        const iRightActionType = rGoodVO.ActionType;
                        if (iRightActionType === WeaponStates.S || iRightActionType === WeaponStates.MJ) { // 如果右手是双手武器就卸
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        } else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                            iHandType = HandTypes.YouShou;
                        }
                    } else if (CompareType === HandTypes.None) { // 走到这一步说明武器两边都有装备，并且没有通过TIPS指定对比哪一边的属性，（因此默认对比右手并且设置可以切换）
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        iHandType = HandTypes.YouShou;
                    }
                } else if (actionType === WeaponStates.S || actionType === WeaponStates.C || actionType === WeaponStates.MJ) { // 如果是双手或长柄武器
                    AttributeInfoDic = CalculatAttribute(iLeftAttributegDic, iRightAttributegDic, "JIA");
                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, AttributeInfoDic, "JIAN");
                }
            } else if (equipCategory === ItemCategories.WuQi_Fu) { // 武器-斧

            } else if (equipCategory === ItemCategories.WuQi_Chui) { // 武器-槌

            } else if (equipCategory === ItemCategories.WuQi_Gong) { // 武器-弓
                if (actionType === WeaponStates.G) {
                    if (gdLeft != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                    }
                    if (gdRight != null) {
                        const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                        const iRightCategoriy = gdRightVO.Categoriy;
                        if (iRightCategoriy !== <number>ItemCategories.WuQi_GongJianTong) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        }
                    }
                }
            } else if (equipCategory === ItemCategories.WuQi_Nu) { // 武器-弩
                if (actionType === WeaponStates.N) {
                    if (gdLeft != null) {
                        const iLeftCategoriy = tableMgr.goodsTable.Find(gdLeft.GoodsID).Categoriy;
                        if (iLeftCategoriy !== <number>ItemCategories.WuQi_NuJianTong) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                        }
                    }
                    if (gdRight != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                    }
                }
            } else if (equipCategory === ItemCategories.WuQi_Mao) { // 武器-矛

            } else if (equipCategory === ItemCategories.WuQi_Zhang) { // 武器-杖
                if ((3 === Global.Data.roleData.Occupation) && (actionType === WeaponStates.D)) { // 魔剑士做特殊处理
                    if (gdRight == null || gdLeft == null) {
                        if (gdRight != null) {
                            const rGoodVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                            const iRightCategoriy = rGoodVO.Categoriy;
                            const iRightHandType = rGoodVO.HandType;
                            const iRightActionType = rGoodVO.ActionType;
                            if (iRightActionType === <number>WeaponStates.S || iRightActionType === <number>WeaponStates.MJ) { // 如果右手是双手武器就比较
                                AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                            } else {
                                AttributeInfoDic = gdAttributeDic;
                            }
                        } else {
                            AttributeInfoDic = gdAttributeDic;
                        }
                    } else if (CompareType === HandTypes.ZuoShou) {
                        const goodVO = tableMgr.goodsTable.Find(gdLeft.GoodsID);
                        const iLeftCategoriy = goodVO.Categoriy;
                        const iLeftHandType = goodVO.HandType;
                        if (iLeftCategoriy !== <number>ItemCategories.WuQi_Jian || iLeftCategoriy !== <number>ItemCategories.WuQi_Fu
                            || iLeftCategoriy !== <number>ItemCategories.WuQi_Chui || iLeftCategoriy !== <number>ItemCategories.WuQi_Mao
                            || iLeftCategoriy !== <number>ItemCategories.WuQi_Dao) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                            iHandType = HandTypes.ZuoShou;
                        }
                    } else if (CompareType === HandTypes.YouShou) {
                        const rGoodVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                        const iRightCategoriy = rGoodVO.Categoriy;
                        const iRightHandType = rGoodVO.HandType;
                        const iRightActionType = rGoodVO.ActionType;
                        if (iRightActionType === <number>WeaponStates.S || iRightActionType === <number>WeaponStates.MJ) { // 如果右手是双手武器就比较
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        } else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                            iHandType = HandTypes.YouShou;
                        }
                    } else if (CompareType === HandTypes.None) { // 走到这一步说明武器两边都有装备，并且没有通过TIPS指定对比哪一边的属性，（因此默认对比右手并且设置可以切换）
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        iHandType = HandTypes.YouShou;
                    }
                } else if (actionType === WeaponStates.D) { // 如果是单手武器
                    if (gdLeft != null) {
                        const iLeftCategoriy = tableMgr.goodsTable.Find(gdLeft.GoodsID).Categoriy;
                        if (iLeftCategoriy !== <number>ItemCategories.WuQi_Dun) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                        }
                    }
                    if (gdRight != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                    }
                } else if (actionType === <number>WeaponStates.S || actionType === <number>WeaponStates.C || actionType === <number>WeaponStates.MJ) { // 如果是双手或长柄武器
                    AttributeInfoDic = CalculatAttribute(iLeftAttributegDic, iRightAttributegDic, "JIA");
                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, AttributeInfoDic, "JIAN");
                }
            } else if (equipCategory === ItemCategories.WuQi_Dun) { // 武器-盾
                if (actionType === WeaponStates.D) { // 如果是单手武器
                    if (gdLeft != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                    }
                    if (gdRight != null) {
                        const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                        const iRightCategoriy = gdRightVO.Categoriy;
                        const iRightHandType = gdRightVO.HandType;
                        const iRightActionType = gdRightVO.ActionType;
                        if (iRightActionType === <number>WeaponStates.S || iRightActionType === <number>WeaponStates.MJ) { // 如果右手是双手武器就卸
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        } else if (iRightCategoriy !== <number>ItemCategories.WuQi_Jian || iRightCategoriy !== <number>ItemCategories.WuQi_Fu
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Chui || iRightCategoriy !== <number>ItemCategories.WuQi_Mao
                            || iRightCategoriy !== <number>ItemCategories.WuQi_Dao) {
                            if (iRightCategoriy !== ItemCategories.WuQi_Zhang) {
                                if (iRightHandType !== HandTypes.ZuoYouShou) { // 如果不是上述装备并且 HandType类型不是左右手
                                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                                }
                            }
                        }
                    }
                }
            } else if (equipCategory === ItemCategories.WuQi_Dao) { // 武器-刀

            } else if (equipCategory === ItemCategories.WuQi_GongJianTong) { // 武器-弓箭筒
                if (actionType === WeaponStates.D) {
                    if (gdLeft != null) {
                        const iLeftCategoriy = tableMgr.goodsTable.Find(gdLeft.GoodsID).Categoriy;
                        if (iLeftCategoriy !== ItemCategories.WuQi_Gong) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                        }
                    }
                    if (gdRight != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                    }
                }
            } else if (equipCategory === ItemCategories.WuQi_NuJianTong) { // 武器-弩箭筒
                if (actionType === WeaponStates.D) {
                    if (gdLeft != null) {
                        AttributeInfoDic = CalculatAttribute(gdAttributeDic, iLeftAttributegDic, "JIAN");
                    }
                    if (gdRight != null) {
                        const gdRightVO = tableMgr.goodsTable.Find(gdRight.GoodsID);
                        const iRightCategoriy = gdRightVO.Categoriy;
                        const iRightActionType = gdRightVO.ActionType;
                        if (iRightActionType === <number>WeaponStates.S || iRightActionType === <number>WeaponStates.MJ) { // 如果右手是双手武器就卸
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        } else if (iRightCategoriy !== ItemCategories.WuQi_Nu) {
                            AttributeInfoDic = CalculatAttribute(gdAttributeDic, iRightAttributegDic, "JIAN");
                        }
                    }
                }
            }
        } else if (equipCategory === ItemCategories.JieZhi) { // 戒指
            const gdLeft = Super.FindUsingEuip(equipCategory, HandTypes.YouShou); // 戒指1为左手佩戴-右侧武器栏 0为右手佩戴-左侧武器栏
            const gdRight = Super.FindUsingEuip(equipCategory, HandTypes.ZuoShou); // 戒指1为左手佩戴-右侧武器栏 0为右手佩戴-左侧武器栏
            if (gdRight == null || gdLeft == null) {
                AttributeInfoDic = gdAttributeDic;
            } else {
                if (CompareType === HandTypes.ZuoShou) {
                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, GetGoodsBasicAttribute(gdLeft), "JIAN");
                    iHandType = HandTypes.ZuoShou;
                } else if (CompareType === HandTypes.YouShou) {
                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, GetGoodsBasicAttribute(gdRight), "JIAN");
                    iHandType = HandTypes.YouShou;
                } else if (CompareType === HandTypes.None) { // 走到这一步说明武器两边都有装备，并且没有通过TIPS指定对比哪一边的属性，（因此默认对比右手并且设置可以切换）
                    AttributeInfoDic = CalculatAttribute(gdAttributeDic, GetGoodsBasicAttribute(gdRight), "JIAN");
                    iHandType = HandTypes.YouShou;
                }
            }
        } else if (equipCategory === ItemCategories.ChongWu || equipCategory === ItemCategories.ShouHuChong) {
            const goodsData = Super.FindUsingEuip(ItemCategories.ShouHuChong, HandTypes.None); // 守护宠和宠物共占同一个位置，同时只能佩戴一种
            if (goodsData != null) {
                const iAttributegDic = GetGoodsBasicAttribute(goodsData);
                AttributeInfoDic = CalculatAttribute(gdAttributeDic, iAttributegDic, "JIAN");
            }
        } else { // 其它装备
            const goodsData = Super.FindUsingEuip(equipCategory, HandTypes.None);
            if (goodsData != null) {
                const iAttributegDic = GetGoodsBasicAttribute(goodsData);
                AttributeInfoDic = CalculatAttribute(gdAttributeDic, iAttributegDic, "JIAN");
            }
        }
        AttributeInfoDic[ExtPropIndexes.Max + 3] = iHandType; // 记录当前所比较的装备位置
        return AttributeInfoDic;
    }

    /**
     * 获取装备上面基本属性+强化\追加\重生\卓越等信息相加值
     * @param gd 装备数据
     */
    function GetGoodsBasicAttribute(gd: NetMsg.IGoodsData): Map<number, number> {
        if (null == gd) {
            return null;
        }
        const basicAttributeDic = new Map<number, number>();
        const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
        if (!goodVO) {
            return basicAttributeDic;
        }
        const equipFields_1: number[] = [];
        goodVO.EquipProps.forEach(element => {
            equipFields_1.push(Math.floor(element));
        });
        if (equipFields_1.length === ExtPropIndexes.Max) {
            // 攻防计算
            for (let index = ExtPropIndexes.AttackSpeed; index < ExtPropIndexes.Max; index++) {
                basicAttributeDic[index] = GetAttributeAddBaseValue(gd, equipFields_1, index);
            }

            basicAttributeDic[ExtPropIndexes.Strong] = GetGoodsDataZhanLi(gd); // 战斗力
            basicAttributeDic[ExtPropIndexes.Max] = gd.Lucky; // 幸运
            basicAttributeDic[ExtPropIndexes.Max + 1] = 0; // 存放佩戴后卓越属性增加的值
            basicAttributeDic[ExtPropIndexes.Max + 2] = gd.ExcellenceInfo; // 存放佩戴后卓越属性减少的值         
            if (gd.WashProps != null) {
                for (let i = 0; i < gd.WashProps.length; i += 2) {
                    const key = gd.WashProps[i];
                    const value = gd.WashProps[i + 1];
                    if (basicAttributeDic.has(key)) {
                        basicAttributeDic[key] += value;
                    }
                }
            }
        }
        return basicAttributeDic;
    }

    /**
     * 获取装备上面基本属性+强化\追加\重生\卓越等信息相加值
     * @param gd 装备数据
     * @param da 装备属性列表
     * @param extPropIndex 属性索引
     */
    function GetAttributeAddBaseValue(gd: NetMsg.IGoodsData, da: number[], extPropIndex: number): number {
        // 直接返回原属性
        let value = da[extPropIndex];
        if (value <= 0) {
            return 0;
        }

        // 攻击属性=装备基础攻击属性*(1+卓越提升攻击比例)*（1+强化提升比例+追加提升比例+重生提升比例）
        // 防御属性=装备基础防御属性*(1+卓越提升防御比例)*（1+强化提升比例+重生提升比例）
        // 生命属性=装备基础生命上限*（1+强化提升比例 + 追加提升比例）
        let zhuoyueRates = 0;
        const categoriy = GetCategoriyByGoodsID(gd.GoodsID);
        if (ItemCategories.ChongWu !== categoriy && ItemCategories.ShouHuChong !== categoriy && ItemCategories.MengChongWu !== categoriy) {
            zhuoyueRates = (gd.ExcellenceInfo > 0) ? GetZhuoYueAddAttackRates(gd.ExcellenceInfo) : 0;
        } else {
            zhuoyueRates = 0;
        }
        let qianghuaRates = GetEquipForgeAddBaseValue(gd, extPropIndex);
        let zhuijiaRates = GetEquipZhuijiaAddBaseValue(gd, extPropIndex);
        const zhuanshengRates = GetEquipZhuanshengAddBaseValue(gd, extPropIndex);

        // 结婚戒指的处理
        if (categoriy === ItemCategories.JieHunJieZhi) {
            if (gd.ForgeLevel <= 0) {
                gd.ForgeLevel = 1;
                gd.AppendPropLev = 0;
            }
            const xiShu = tableMgr.sysParamsTable.getParamDouble("GoodWillXiShu");
            // 生命属性=装备基础生命上限*（1+强化提升比例 + 追加提升比例）
            // 戒指最终属性=基础属性*（1+(锻造-1）*2+追加*系数）
            // equipFields_1[i] = equipFields_1[i] * (1 + (goodsData.Forge_level - 1) * 2 + goodsData.AppendPropLev * xiShu);
            qianghuaRates = (gd.ForgeLevel - 1) * 2;
            zhuijiaRates = gd.AppendPropLev * xiShu;
        }

        if (extPropIndex >= ExtPropIndexes.MinDefense && extPropIndex <= ExtPropIndexes.MaxMDefense) { // 防御 // 攻击
            // value = da[extPropIndex] * (1 + zhuoyueRates) * (1 + qianghuaRates + zhuijiaRates + zhuanshengRates);
            let qianghua = 0;
            if (gd.ForgeLevel > 0) { // 如果没有强化不走此公式
                qianghua = da[extPropIndex] * qianghuaRates;
                qianghua = qianghua < 3 ? 3 : qianghua; // 强化属性加成保底+3
            }
            value = da[extPropIndex] * (1 + zhuoyueRates) * (1 + zhuanshengRates);
            value = value + qianghua;
        } else if (extPropIndex >= ExtPropIndexes.MinAttack && extPropIndex <= ExtPropIndexes.MaxMAttack) {
            // value = da[extPropIndex] * (1 + zhuoyueRates) * (1 + qianghuaRates + zhuijiaRates + zhuanshengRates);
            let qianghua = 0;
            if (gd.ForgeLevel > 0) { // 如果没有强化不走此公式
                qianghua = da[extPropIndex] * qianghuaRates;
                qianghua = qianghua < 3 ? 3 : qianghua; // 强化属性加成保底+3
            }
            value = da[extPropIndex] * (1 + zhuoyueRates) * (1 + zhuijiaRates + zhuanshengRates);
            value = value + qianghua;
        } else if (extPropIndex === ExtPropIndexes.MaxLifeV) { // 生命上限
            value = da[extPropIndex] * (1 + qianghuaRates + zhuijiaRates);
        }
        return Math.floor(value); // 向上取整
    }

    /**
     * 计算装备战力
     * @param gd 装备数据
     */
    export function GetGoodsDataZhanLi(gd: NetMsg.IGoodsData): number {
        let iGoodsZhanLi = 0;
        const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
        if (!goodVO) {
            return iGoodsZhanLi;
        }

        if (goodVO.Categoriy === ItemCategories.MengChongWu) {
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.MaxLifeV) / CombatForceInfo.LifeV;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.MaxMagicV) / CombatForceInfo.MagicV;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.HitV) / CombatForceInfo.HitV;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.Dodge) / CombatForceInfo.Dodge;
            iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxDefense) / CombatForceInfo.MaxDefenseV + GetGoodsWashProps(gd, ExtPropIndexes.MinDefense) / CombatForceInfo.MaxDefenseV) / 2;
            iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxMDefense) / CombatForceInfo.MaxMDefenseV + GetGoodsWashProps(gd, ExtPropIndexes.MinMDefense) / CombatForceInfo.MinMDefenseV) / 2;
            iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxAttack) / CombatForceInfo.MaxAttackV + GetGoodsWashProps(gd, ExtPropIndexes.MinAttack) / CombatForceInfo.MinAttackV) / 2;
            iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxMAttack) / CombatForceInfo.MaxMAttackV + GetGoodsWashProps(gd, ExtPropIndexes.MinMAttack) / CombatForceInfo.MinMAttackV) / 2;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddAttackInjure) / CombatForceInfo.AddAttackInjure;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.DecreaseInjureValue) / CombatForceInfo.DecreaseInjureValue;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.LifeSteal) / CombatForceInfo.LifeSteal;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddAttack) / CombatForceInfo.AddAttack;
            iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddDefense) / CombatForceInfo.AddDefense;
            iGoodsZhanLi = iGoodsZhanLi / 100;  // 由于萌宠washProps计算时乘了100,防止有些小数被忽略
            return Math.round(iGoodsZhanLi);
        }

        const equipFields = goodVO.EquipProps;
        if (equipFields != null) {
            const equipFields_1: number[] = [];
            goodVO.EquipProps.forEach(element => {
                equipFields_1.push(Math.floor(element));
            });
            if (equipFields.length === ExtPropIndexes.Max) {
                // 生命上限
                if (equipFields_1[ExtPropIndexes.MaxLifeV] !== 0.0 && CombatForceInfo.LifeV > 0.0) {
                    iGoodsZhanLi += GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MaxLifeV) / CombatForceInfo.LifeV;
                }
                // 魔法上限
                if (equipFields_1[ExtPropIndexes.MaxMagicV] !== 0.0 && CombatForceInfo.MagicV > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.MaxMagicV] / CombatForceInfo.MagicV;
                }
                // 最大物防
                if (equipFields_1[ExtPropIndexes.MaxDefense] !== 0.0 && CombatForceInfo.MaxDefenseV > 0.0) {
                    const iMaxDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MaxDefense);
                    const iMinDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MinDefense);
                    iGoodsZhanLi += ((iMaxDefense / CombatForceInfo.MaxDefenseV) + (iMinDefense / CombatForceInfo.MinDefenseV)) / 2;
                }
                // 最大魔防
                if (equipFields_1[ExtPropIndexes.MaxMDefense] !== 0.0 && CombatForceInfo.MaxMDefenseV > 0.0) {
                    const iMaxDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MaxMDefense);
                    const iMinDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MinMDefense);
                    iGoodsZhanLi += ((iMaxDefense / CombatForceInfo.MaxMDefenseV) + (iMinDefense / CombatForceInfo.MinMDefenseV)) / 2;
                    iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.MaxMDefense) + GetGoodsWashProps(gd, ExtPropIndexes.MinMDefense);
                }
                // 最大物攻
                if (equipFields_1[ExtPropIndexes.MaxAttack] !== 0.0 && CombatForceInfo.MaxAttackV > 0.0) {
                    const iMaxDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MaxAttack);
                    const iMinDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MinAttack);
                    iGoodsZhanLi += ((iMaxDefense / CombatForceInfo.MaxAttackV) + (iMinDefense / CombatForceInfo.MinAttackV)) / 2;
                }
                // 最大魔攻
                if (equipFields_1[ExtPropIndexes.MaxMAttack] !== 0.0 && CombatForceInfo.MaxMAttackV > 0.0) {
                    const iMaxDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MaxMAttack);
                    const iMinDefense = GetAttributeAddBaseValue(gd, equipFields_1, ExtPropIndexes.MinMAttack);
                    iGoodsZhanLi += ((iMaxDefense / CombatForceInfo.MaxMAttackV) + (iMinDefense / CombatForceInfo.MinMAttackV)) / 2;
                }
                // 准确
                if (equipFields_1[ExtPropIndexes.HitV] !== 0.0 && CombatForceInfo.HitV > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.HitV] / CombatForceInfo.HitV;
                }
                // 闪避
                if (equipFields_1[ExtPropIndexes.Dodge] !== 0.0 && CombatForceInfo.Dodge > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.Dodge] / CombatForceInfo.Dodge;
                }
                // 伤害加成固定值
                if (equipFields_1[ExtPropIndexes.AddAttackInjure] !== 0.0 && CombatForceInfo.AddAttackInjure > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.AddAttackInjure] / CombatForceInfo.AddAttackInjure;
                }
                // 伤害减少固定值
                if (equipFields_1[ExtPropIndexes.DecreaseInjureValue] !== 0.0 && CombatForceInfo.DecreaseInjureValue > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.DecreaseInjureValue] / CombatForceInfo.DecreaseInjureValue;
                }
                // 击中恢复(固定值)
                if (equipFields_1[ExtPropIndexes.LifeSteal] !== 0.0 && CombatForceInfo.LifeSteal > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.LifeSteal] / CombatForceInfo.LifeSteal;
                }
                // 攻击力(固定值)
                if (equipFields_1[ExtPropIndexes.AddAttack] !== 0.0 && CombatForceInfo.AddAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.AddAttack] / CombatForceInfo.AddAttack;
                }
                // 防御力(固定值)
                if (equipFields_1[ExtPropIndexes.AddDefense] !== 0.0 && CombatForceInfo.AddDefense > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.AddDefense] / CombatForceInfo.AddDefense;
                }
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.MaxLifeV) / CombatForceInfo.LifeV;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.MaxMagicV) / CombatForceInfo.MagicV;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.HitV) / CombatForceInfo.HitV;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.Dodge) / CombatForceInfo.Dodge;
                iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxDefense) / CombatForceInfo.MaxDefenseV + GetGoodsWashProps(gd, ExtPropIndexes.MinDefense) / CombatForceInfo.MaxDefenseV) / 2;
                iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxMDefense) / CombatForceInfo.MaxMDefenseV + GetGoodsWashProps(gd, ExtPropIndexes.MinMDefense) / CombatForceInfo.MinMDefenseV) / 2;
                iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxAttack) / CombatForceInfo.MaxAttackV + GetGoodsWashProps(gd, ExtPropIndexes.MinAttack) / CombatForceInfo.MinAttackV) / 2;
                iGoodsZhanLi += (GetGoodsWashProps(gd, ExtPropIndexes.MaxMAttack) / CombatForceInfo.MaxMAttackV + GetGoodsWashProps(gd, ExtPropIndexes.MinMAttack) / CombatForceInfo.MinMAttackV) / 2;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddAttackInjure) / CombatForceInfo.AddAttackInjure;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.DecreaseInjureValue) / CombatForceInfo.DecreaseInjureValue;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.LifeSteal) / CombatForceInfo.LifeSteal;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddAttack) / CombatForceInfo.AddAttack;
                iGoodsZhanLi += GetGoodsWashProps(gd, ExtPropIndexes.AddDefense) / CombatForceInfo.AddDefense;

                // 荧光宝石属性
                // 火系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.FireAttack] !== 0.0 && CombatForceInfo.FireAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.FireAttack] / CombatForceInfo.FireAttack;
                }
                // 水系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.WaterAttack] !== 0.0 && CombatForceInfo.WaterAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.WaterAttack] / CombatForceInfo.WaterAttack;
                }
                // 雷系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.LightningAttack] !== 0.0 && CombatForceInfo.LightningAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.LightningAttack] / CombatForceInfo.LightningAttack;
                }
                // 土系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.SoilAttack] !== 0.0 && CombatForceInfo.SoilAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.SoilAttack] / CombatForceInfo.SoilAttack;
                }
                // 冰系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.IceAttack] !== 0.0 && CombatForceInfo.IceAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.IceAttack] / CombatForceInfo.IceAttack;
                }
                // 风系伤害(固定值)
                if (equipFields_1[ExtPropIndexes.WindAttack] !== 0.0 && CombatForceInfo.WindAttack > 0.0) {
                    iGoodsZhanLi += equipFields_1[ExtPropIndexes.WindAttack] / CombatForceInfo.WindAttack;
                }
            }
        }
        return Math.round(iGoodsZhanLi);
    }

    /**
     * 获取GoodsData指定索引的WashProps属性
     * @param gd 装备数据
     * @param extPropIndexes 属性索引
     */
    function GetGoodsWashProps(gd: NetMsg.IGoodsData, extPropIndexes: number): number {
        let propV = 0;
        if (gd.WashProps != null) {
            for (let i = 0; i < gd.WashProps.length;) {
                if (gd.WashProps[i] === extPropIndexes) {
                    propV += gd.WashProps[i + 1];
                }
                i += 2;
            }
        }
        return propV;
    }

    /**
     * 获取武器对应的动作扩展名称
     * @param goodsID 道具ID
     */
    export function GetGoodsActionNameByID(goodsID: number): WeaponStates {
        const goodVO = tableMgr.goodsTable.Find(goodsID);
        if (!goodVO) return WeaponStates.K;
        return goodVO.ActionType;
    }

    /**
     * 计算对比装备的属性差值
     * @param addDtc 
     * @param beaddDtc 
     * @param type 
     */
    function CalculatAttribute(addDtc: Map<number, number>, beaddDtc: Map<number, number>, type: string = "JIAN"): Map<number, number> {
        if (!addDtc || !beaddDtc) {
            return !addDtc ? beaddDtc : addDtc;
        }
        if (addDtc.size !== ExtPropIndexes.Max + 3 || beaddDtc.size !== ExtPropIndexes.Max + 3) {
            return addDtc.size !== (ExtPropIndexes.Max + 3) ? beaddDtc : addDtc;
        }
        const ResultDic = new Map<number, number>();
        if ("JIA" === type) {
            for (let index = ExtPropIndexes.Strong; index < ExtPropIndexes.Max + 3; index++) {
                if (index === ExtPropIndexes.Max + 2) {
                    ResultDic[index] = addDtc[index] ^ beaddDtc[index];
                } else {
                    ResultDic[index] = addDtc[index] + beaddDtc[index];
                }
            }
        } else if ("JIAN" === type) {
            for (let index = ExtPropIndexes.Strong; index < ExtPropIndexes.Max + 3; index++) {
                if (index === ExtPropIndexes.Max + 1) { // 卓越属性减少值
                    ResultDic[index] = (addDtc[ExtPropIndexes.Max + 2] ^ beaddDtc[ExtPropIndexes.Max + 2]) & beaddDtc[ExtPropIndexes.Max + 2];
                } else if (index === ExtPropIndexes.Max + 2) { // 卓越属性增加值
                    ResultDic[index] = (addDtc[index] ^ beaddDtc[index]) & addDtc[index];
                } else {
                    ResultDic[index] = addDtc[index] - beaddDtc[index];
                }
            }
        }
        return ResultDic;
    }

    /**
     * 尝试推荐属性加点
     */
    export function tryAddRecommendPoint() {
        if (gameIns.gameState.roleData.AutoAssignPropertyPoint === 0) {
            return; // 人物设置为不自动加点
        }

        // 当前人物的点数情况        
        const nTotalPoint = Global.GetCurrentRoleProp(0, 0);
        const nStrengthPoint = Global.GetCurrentRoleProp(1, UnitPropIndexes.Strength);
        const nIntelligencePoint = Global.GetCurrentRoleProp(1, UnitPropIndexes.Intelligence);
        const nDexterityPoint = Global.GetCurrentRoleProp(1, UnitPropIndexes.Dexterity);
        const nConstitutionPoint = Global.GetCurrentRoleProp(1, UnitPropIndexes.Constitution);
        const nUsedPoint = nStrengthPoint + nIntelligencePoint + nDexterityPoint + nConstitutionPoint;
        const nRemainPoint = nTotalPoint - nUsedPoint; // 剩余未加的点数
        if (nRemainPoint <= 0) {
            return; // 没有剩余点数，不需要加
        }

        // 各个属性加多少点        
        let addStrengthPoint = 0;
        let addIntelligencePoint = 0;
        let addDexterityPoint = 0;
        let addConstitutionPoint = 0;

        // 加点的权重（不同职业权重不同）
        let addStrengthWeight = 0;
        let addIntelligenceWeight = 0;
        let addDexterityWeight = 2;
        let addConstitutionWeight = 3;
        const nOccu = Global.CalcOriginalOccupationID(Global.Data.roleData.Occupation);
        switch (nOccu) {
            case EnumOccupation.LongDan: // 龙胆
            case EnumOccupation.QiaoGong: // 巧工
                addStrengthWeight = 5;
                break;
            case EnumOccupation.HuaLing: // 花灵
            case EnumOccupation.DouXian: // 斗仙
                addIntelligenceWeight = 5;
                break;
            default:
                if (Global.currentMJSType === MJSSkillType.Strength_Sword) addStrengthWeight = 5; // 力剑士
                else addIntelligenceWeight = 5; // 魔剑士
                break;
        }

        do {
            let nTotalWeight = nRemainPoint; // 参与计算权重的点数（只有未达到推荐点数的属性才参与计算）
            if (addStrengthWeight > 0) nTotalWeight += nStrengthPoint;
            if (addIntelligenceWeight > 0) nTotalWeight += nIntelligencePoint;
            if (addDexterityWeight > 0) nTotalWeight += nDexterityPoint;
            if (addConstitutionWeight > 0) nTotalWeight += nConstitutionPoint;
            if (addConstitutionWeight > 0 && nTotalWeight * addConstitutionWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) <= nConstitutionPoint) {
                addConstitutionWeight = 0;
                continue;
            }
            if (addStrengthWeight > 0 && nTotalWeight * addStrengthWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) <= nStrengthPoint) {
                addStrengthWeight = 0;
                continue;
            }
            if (addIntelligenceWeight > 0 && nTotalWeight * addIntelligenceWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) <= nIntelligencePoint) {
                addIntelligenceWeight = 0;
                continue;
            }
            if (addDexterityWeight > 0 && nTotalWeight * addDexterityWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) <= nDexterityPoint) {
                addDexterityWeight = 0;
                continue;
            }
            if (addStrengthWeight > 0) addStrengthPoint = Math.floor(nTotalWeight * addStrengthWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) - nStrengthPoint);
            if (addIntelligenceWeight > 0) addIntelligencePoint = Math.floor(nTotalWeight * addIntelligenceWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) - nIntelligencePoint);
            if (addDexterityWeight > 0) addDexterityPoint = Math.floor(nTotalWeight * addDexterityWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) - nDexterityPoint);
            if (addConstitutionWeight > 0) addConstitutionPoint = Math.floor(nTotalWeight * addConstitutionWeight / (addConstitutionWeight + addStrengthWeight + addIntelligenceWeight + addDexterityWeight) - nConstitutionPoint);

            // 剩余尾数,按优先级（代码顺序）分配
            const nFinalRemain = nRemainPoint - (addStrengthPoint + addIntelligencePoint + addDexterityPoint + addConstitutionPoint);
            if (addConstitutionWeight > 0) addConstitutionPoint += nFinalRemain;
            else if (addStrengthWeight > 0) addStrengthPoint += nFinalRemain;
            else if (addIntelligenceWeight > 0) addIntelligencePoint += nFinalRemain;
            else if (addDexterityWeight > 0) addDexterityPoint += nFinalRemain;
            break;
        } while (true);

        // 发送推荐加点消息
        Net.sendRecommendPoint(addStrengthPoint, addIntelligencePoint, addDexterityPoint, addConstitutionPoint);
    }

    /**
     * 获取角色属性
     * @param level 几级属性（一级属性/扩展属性）
     * @param index 属性索引
     */
    export function GetCurrentRoleProp(level: number, index: number): number {
        let result = 0;
        if (null == Global.Data.CurrentRolePropFields || Global.Data.CurrentRolePropFields.length < 20) {
            return -1;
        }

        if (level === 0) {
            if (index === 0) { // 总属性点
                result = Global.Data.CurrentRolePropFields[20];
            } else if (index === 1) { // 可分配属性点
                result = Global.Data.CurrentRolePropFields[20];
                for (let i = 1; i < 5; i++) {
                    result -= Global.Data.CurrentRolePropFields[i];
                }
            }
        } else if (level === 1) {
            if (index < UnitPropIndexes.Max) {
                result = Global.Data.CurrentRolePropFields[index + 1];
            }
        } else if (level === 2) {
            if (index < ExtPropIndexes.Max) {
                switch (index) {
                    case ExtPropIndexes.MinAttack:
                        result = Global.Data.CurrentRolePropFields[5];
                        break;
                    case ExtPropIndexes.MaxAttack:
                        result = Global.Data.CurrentRolePropFields[6];
                        break;
                    case ExtPropIndexes.MinDefense:
                        result = Global.Data.CurrentRolePropFields[7];
                        break;
                    case ExtPropIndexes.MaxDefense:
                        result = Global.Data.CurrentRolePropFields[8];
                        break;
                    case ExtPropIndexes.MagicSkillIncreasePercent: // 魔法技能增幅百分比
                        result = Global.Data.CurrentRolePropFields[9];
                        break;
                    case ExtPropIndexes.MinMAttack:
                        result = Global.Data.CurrentRolePropFields[10];
                        break;
                    case ExtPropIndexes.MaxMAttack:
                        result = Global.Data.CurrentRolePropFields[11];
                        break;
                    case ExtPropIndexes.MinMDefense:
                        result = Global.Data.CurrentRolePropFields[12];
                        break;
                    case ExtPropIndexes.MaxMDefense:
                        result = Global.Data.CurrentRolePropFields[13];
                        break;
                    case ExtPropIndexes.PhySkillIncreasePercent:
                        result = Global.Data.CurrentRolePropFields[14];
                        break;
                    case ExtPropIndexes.MaxLifeV:
                        result = Global.Data.CurrentRolePropFields[15];
                        break;
                    case ExtPropIndexes.MaxMagicV:
                        result = Global.Data.CurrentRolePropFields[16];
                        break;
                    case ExtPropIndexes.AttackSpeed:
                        result = Global.Data.CurrentRolePropFields[17];
                        break;
                    case ExtPropIndexes.HitV:
                        result = Global.Data.CurrentRolePropFields[18];
                        break;
                    case ExtPropIndexes.Dodge:
                        result = Global.Data.CurrentRolePropFields[19];
                        break;
                }
            }
        } else if (level === 3) { // 获取灵丹增加的属性值
            result = Global.Data.CurrentRolePropFields[index];
        }
        return result;
    }

    /**
     * 根据宠物数据获取宠物属性值
     * @param goodData 宠物数据
     */
    export function GetPetAttribute(goodData: NetMsg.IGoodsData): [number[], string[]] {
        const lJibanState: number[] = [];
        const attrList: string[] = [];
        const goodVO = tableMgr.goodsTable.Find(goodData.GoodsID);
        if (goodVO != null) {
            const dJibanAttr = new Map<number, number>();
            const gMengchong = GetJibanMengchong(goodData.Id);
            if (gMengchong) {
                for (let i = 0; i < gMengchong.WashProps.length; i += 2) {
                    const nAttrIndex = gMengchong.WashProps[i];
                    const dValue = gMengchong.WashProps[i + 1] / 100;
                    dJibanAttr[nAttrIndex] = dValue;
                }
            }
            // 物品的装备属性
            const equipFieldsDouble = goodVO.EquipProps;
            const value = tableMgr.sysParamsTable.getParam("PetQiangHuaProps");
            const valueArr = value.split("|");
            for (let index = ExtPropIndexes.AttackSpeed; index < ExtPropIndexes.Max; index++) {
                if (0 !== equipFieldsDouble[index]) {
                    let Temp = "";
                    let percent: number;
                    for (let i = 0; i < valueArr.length; i++) {
                        const attribAttr = valueArr[i].split(",");
                        const attribIndex = parseInt(attribAttr[0]);
                        if (index === attribIndex) {
                            Temp = Loca.getLang(ExtPropIndexes.ExtPropIndexChineseNames[index]) + ": ";
                            percent = parseFloat(attribAttr[1]);
                            let dJibanValue = 0;
                            if (dJibanAttr.has(attribIndex)) {
                                dJibanValue = dJibanAttr.get(attribIndex);
                            }
                            let dBaseValue = equipFieldsDouble[index] + dJibanValue;
                            let dExtraValue = dBaseValue * (goodData.ForgeLevel) * percent;
                            if (ExtPropIndexes.ExtPropIndexPercents[attribIndex] === 1) {
                                dBaseValue *= 100;
                                dExtraValue *= 100;
                                const sBaseAttr = `${dBaseValue}%`;
                                if (dJibanValue > 0) {
                                    Temp += Global.GetColorStringForNGUIText("e87f0f", sBaseAttr);
                                    if (dExtraValue > 0) {
                                        const sExtraAttr = ` (+${dExtraValue}%)`;
                                        Temp += Global.GetColorStringForNGUIText("e87f0f", sExtraAttr);
                                    }
                                } else {
                                    Temp += sBaseAttr;
                                    if (dExtraValue > 0) {
                                        const sExtraAttr = ` (+${dExtraValue}%)`;
                                        Temp += Global.GetColorStringForNGUIText("6c9e52", sExtraAttr);
                                    }
                                }
                            } else {
                                const sBaseAttr = `${dBaseValue}`;
                                if (dJibanValue > 0) {
                                    Temp += Global.GetColorStringForNGUIText("e87f0f", sBaseAttr);
                                    if (dExtraValue > 0) {
                                        const sExtraAttr = ` (+${dExtraValue})`;
                                        Temp += Global.GetColorStringForNGUIText("e87f0f", sExtraAttr);
                                    }
                                } else {
                                    Temp += sBaseAttr;
                                    if (dExtraValue > 0) {
                                        const sExtraAttr = ` (+${dExtraValue})`;
                                        Temp += Global.GetColorStringForNGUIText("6c9e52", sExtraAttr);
                                    }
                                }
                            }
                            if (dJibanValue > 0) {
                                lJibanState.push(1);
                            } else {
                                lJibanState.push(0);
                            }
                        }
                    }

                    if ("" !== Temp) {
                        attrList.push(Temp);
                    }
                }
            }
        }
        return [lJibanState, attrList];
    }

    /**
     * 获取对应ID的萌宠
     * @param nQichongDBID 
     */
    function GetJibanMengchong(nQichongDBID: number): NetMsg.IGoodsData {
        const lst = Data.roleData.MengChongsInBag;
        return lst.find(element => element.AppendPropLev === nQichongDBID);
    }

    /**
     * 获取精灵回收奖励（单个）
     * @param gd 
     */
    export function GetJingLingRecoverAward(gd: NetMsg.IGoodsData): number[] {
        const all = [0, 0, 0];
        if (gd) {
            const goodVO = tableMgr.goodsTable.Find(gd.GoodsID);
            const ZhanHunPrice = goodVO.ZhanHunPrice;
            all[0] = ZhanHunPrice;
            const aVO = tableMgr.petLevelUpTable.AllRows();
            for (let nIdx = 0; nIdx < aVO.length; nIdx++) {
                const vo = aVO[nIdx];
                if (vo.Level <= (gd.ForgeLevel + 1)) {
                    all[1] += vo.NeedExp;
                } else {
                    break;
                }
            }
            if (gd.ElementhrtsProps) {
                for (let i = 0; i < gd.ElementhrtsProps.length; ++i) {
                    if (1 === i % 3) {
                        const levskill = gd.ElementhrtsProps[i];
                        for (let j = 1; j <= levskill; ++j) {
                            const vo = tableMgr.petSkillLevelUpTable.Find(j);
                            if (vo) all[2] += vo.Cost;
                        }
                    }
                }
            }
        }
        return all;
    }

    let _LastMoveData: NetMsg.ISpriteMoveData = null;
    let _LastSendMoveTick: number = 0;
    const _SendMoveInterval: number = 200;

    /**
     * 清空移动数据
     */
    export function ClearLastMoveData() {
        _LastMoveData = null;
        _LastSendMoveTick = 0;
    }
    // 屏蔽部分主界面的图标，保留功能，以待有变
    // let gbHideUnUseIcon = true;
	/**
	 * 返回激活的最大索引值,界面显示的时候小于等于这个值的各个子系统都被认为是激活的
	 * @returns {} 
	 */
    export function getMaxActiveSystemIndex(): number {
        let indexMax = 0;
        for (let i = 1; i <= 31; i++) {
            if (isSystemOpen(i)) {
                indexMax++;
            }
        }
        return indexMax;
    }
	/**
	 * 判断某项系统是否激活，通过配置文件SystemOpen.Xml中配置，这儿采用服务器的数据进行判断
	 * @param sytemIndex 
	 * @returns {} 
	 */
    export function isSystemOpen(sytemIndex: number): boolean {
        const valueSystem = GetRoleCommonUseParamsValue(RoleCommonUseIntParamsIndexs.SystemOpenValue);
        return (valueSystem & (1 << sytemIndex)) > 0;
    }

	/**
	 * 根据输入数值获取位的设置值
	 * @param whichOne 
	 * @returns {} 
	 */
    export function getBitValue(whichOne: number): number {
        return Math.pow(2, whichOne - 1);
    }
    /**
     * 判断是否是装备
     * @param goodsId     物品Id
     */
    export function goodsIsEquip(goodsId: number): boolean {
        const categoriy = TableUtils.getFieldNumber(Global.GetCategoriyByGoodsID(goodsId));
        if (categoriy >= ItemCategories.TouKui && categoriy < ItemCategories.EquipMax && categoriy !== ItemCategories.JieHunJieZhi && categoriy !== ItemCategories.ShouHuChong) {
            return true;
        }
        return false;
    }
    /**
     * 获取系统配置参数中的整数数组参数,Key为每项的首个数字
     * @param name 字符串
     * @param splitChar1 拆分符|
     * @param splitChar2 拆分符，
     */
    export function getSystemParamIntDict1ByName(name: string, splitChar1: string = "|", splitChar2: string = ","): Map<number, number> {
        const dict: Map<number, number> = new Map<number, number>();
        let str = "";
        try {
            let intArray = null;
            str = Global.getSystemParamByName(name);
            if (Global.String.IsNullOrEmpty(str)) {
                return dict;
            }
            str = str.trim();
            if (!Global.String.IsNullOrEmpty(str)) {
                let fields = str.split(splitChar1);
                for (let i = 0; i < fields.length; ++i) {
                    let fields2 = fields[i].split(splitChar2);
                    let key = parseInt(fields2[0]);
                    intArray = new Array<number>(fields2.length);
                    for (let j = 0; j < fields2.length; j++) {
                        intArray[j] = parseInt(fields2[j]);
                    }
                    dict.set(key, intArray);
                }
            }
            return dict;
        }
        catch (e) {

        }
    }
    /**
     * 获取系统配置参数中的字符串参数
     * @param name SystemParams表中的key
     */
    export function getSystemParamByName(name: string): string {
        return tableMgr.sysParamsTable.getParam(name);
    }
}