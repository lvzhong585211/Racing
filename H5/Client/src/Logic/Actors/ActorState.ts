namespace Logic {
    /**
     * 在这里定义与角色相关的状态数据
     * 注: 尽量把每个状态数据都按类来划分,方便合并组合,以方便维护,理解及减少内存占用.
     * 注: 状态类只包含数据定义,不能包含方法
     * 注: 这些状态数据应该只包含运行时会发生改变的数据,不应该保存运行前就可以确定的数据,如对于怪物来讲,怪物出生时需要播放的音效就是固定的,所以这种数据就不应该保存在状态数据中,以免浪费内存.
     */
    export namespace ActorState {
        /** 角色状态的基础数据 */
        export class CharacterBase {
            Name: string;       // 角色的名称(内部调试用?)
            VSName: string;     // 头顶显示的名称？
            RoleID: number;     // 角色的ID
        }

        /** 玩家状态的基础数据 */
        export class PlayerBase {
            public Occupation: number;  // 职业
            // public RoleSex: number;     // 角色性别
        }

        /** NPC的基础状态数据 */
        export class NpcBase {
            npcID: number;           // npc的模板Id，对应 npcs.json 文件中的Id列            
            RoleSex: EnumSex;        // 角色的性别
        }

        /** Monster 的基础状态数据 */
        export class MonsterBase {
            monsterID: number;          // 怪物的模板Id,即应 datatables/Monsters.json 文件中的 Id 列
            MonsterType: MonsterTypes;  // 怪物的类型
            BattleWitchSide;            // 所属阵营
        }

        /*** 注: 一些在不同的类之间可能共享的数据组件放在下面,如生命,魔法等. 方便扩展.
         * 这些数据并不是所有的角色都有,如功能NPC就不存在生命值,所以也就不可以被攻击!
         */
        /** 角色的生命组件 */
        export class Life {
            constructor(
                public VLife: number,     // 当前生命值
                public VLifeMax: number   // 获取最大生命值
            ) { }
        }

        /** 角色的魔法数据相关 */
        export class Magic {
            constructor(
                public VMagic: number,     // 当前蓝值
                public VMagicMax: number,  // 最大蓝值
            ) {
            }
        }

        /** 等级相关的组件 */
        export class Level {
            constructor(
                public VLevel: number, // 等级
                public ChangeLifeCount: number = 0 // 重生次数
            ) {
            }
        }

        /** 碰撞组件 */
        export class Collider {
            constructor(
                public center: Laya.Vector3, // 碰撞盒位置
                public size: Laya.Vector3 // 碰撞盒尺寸
            ) {
            }
        }

        /** 头顶名字组件 */
        export class VisualName {
            constructor(
                public title: string, // 名称文本
                public initHeight: number, // 初始的高度（Player、NPC默认的高度）
                public extraHeight: number = 0, // 额外的高度（骑马等增加的高度）
                public color: string = "#ffffff", // 名称文本颜色
                public outWorldPos: Laya.Vector3 = new Laya.Vector3() // 输出名字所在的世界坐标，该值在初始化的时候不用赋值
            ) {
            }
        }
    }

    // NPC的状态数据
    export type NPCState = ActorState.CharacterBase & ActorState.NpcBase;

    // 怪物的状态数据
    export type MonsterState = ActorState.CharacterBase & ActorState.MonsterBase;

    // 玩家的状态数据
    export type PlayerState = ActorState.CharacterBase & ActorState.PlayerBase;
}