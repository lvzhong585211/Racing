namespace Logic {
    /**
     * 调试接口类型，方便调试Actor的模型显示位置等
     */
    export interface IDebugInnerID {
        getInnerId(): number;
        getCoordinate(): Laya.Point;
        getPosition(): Laya.Vector3;
    }

    /**
     * 是否实现了调试Actor的接口
     */
    export function isDebugInnerID(value: any): value is IDebugInnerID {
        return value.getInnerId !== undefined
            && value.getCoordinate !== undefined
            && value.getPosition !== undefined;
    }

    /**
     * 包含图形显示对象的Actor接口
     */
    export interface IViewActor {
        getView(): Laya.Sprite3D;
        /** 返回角色Id */
        getRoleID(): number;
        /** 返回二维平台坐标（对应服务器上的坐标位置） */
        getCoordinateRef(outCoord: Laya.Point): void;
    }

    /**
     * 指定的对象是否实现了IViewActor接口
     */
    export function isViewActor(value: any): value is IViewActor {
        return value.getView !== undefined
            && value.getRoleID !== undefined
            && value.getCoordinateRef !== undefined;
    }

    /**
     * 定义所有世界对象的基类,如NPC,玩家,掉落道具,机关等
     */
    export class AActor extends ECS.Entity {
        private static mAllocId: number = 0;    // 记录总共分配的Actor的个数
        private mInnerId: number = -1;          // 只在本实例唯一的ID,方便调试用

        protected mType: EActorType = EActorType.Invalid;   // 类型
        protected mLevel: Level = null;			// 保存Actor所属于的level

        /**
         * 返回当前已经分配的Actor的个数
         */
        public static getAllocId(): number {
            return AActor.mAllocId;
        }

        /**
         * @param type 指定本对象的类型
         */
        public constructor(type: EActorType) {
            super();
            this.mType = type;
            this.mInnerId = AActor.mAllocId++; // 分配一个唯一的Id,方便调试与查找
        }

        /**
		 * [只读]是否已经销毁。对象销毁后不能再使用。
		 * @return 
		 */
        public get destroyed(): Boolean { return this.mInnerId === -2; } // -2表示释放过了

        /**
         * 获取内部的唯一Id,仅供调试用
         */
        public getInnerId(): number {
            return this.mInnerId;
        }

        /**
         * 返回角色的类型
         */
        public getType(): EActorType {
            return this.mType;
        }

        /**
         * 返回是否是NPC
         */
        public isNPC(): boolean {
            return this.mType === EActorType.NPC;
        }

        /** 
         * 返回是否是怪物
         */
        public isMonster(): boolean {
            return this.mType === EActorType.Monster;
        }

        /**
         * 返回是否是一个玩家,包含本地玩家与网络玩家
         */
        public isPlayer(): boolean {
            return this.mType === EActorType.LocalPlayer || this.mType === EActorType.NetPlayer;
        }

        /**
         * 返回是否是一个本地玩家
         */
        public isLocalPlayer(): boolean {
            return this.mType === EActorType.LocalPlayer;
        }

        /**
         * 返回是否是一个网络玩家
         */
        public isNetPlayer(): boolean {
            return this.mType === EActorType.NetPlayer;
        }

        /**
        * 添加自己到指定的场景
        * @param scene 指定要添加到场景
        * 注: 只有添加到场景后,角色才会显示
        */
        public addToLevel(level: Logic.Level) {
            this.mLevel = level;
        }

        /**
         * 从关卡中移除自己
         */
        protected removeFromLevel() {
            this.mLevel = null;
        }

        /**
         * 返回角色所属于的Level
         */
        public getLevel(): Level {
            return this.mLevel;
        }

        /**
         * 返回绑定的控制器.注:派生类会重载此函数
         */
        public getController(): AController {
            return null;
        }

        /**
         * 释放占用的资源
         */
        public destroy() {
            this.mInnerId = -2;     // -2表示释放过了
            this.removeFromLevel();
        }
    }
}