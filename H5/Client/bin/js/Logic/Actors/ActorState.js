var Logic;
(function (Logic) {
    /**
     * 在这里定义与角色相关的状态数据
     * 注: 尽量把每个状态数据都按类来划分,方便合并组合,以方便维护,理解及减少内存占用.
     * 注: 状态类只包含数据定义,不能包含方法
     * 注: 这些状态数据应该只包含运行时会发生改变的数据,不应该保存运行前就可以确定的数据,如对于怪物来讲,怪物出生时需要播放的音效就是固定的,所以这种数据就不应该保存在状态数据中,以免浪费内存.
     */
    let ActorState;
    (function (ActorState) {
        /** 角色状态的基础数据 */
        class CharacterBase {
        }
        ActorState.CharacterBase = CharacterBase;
        /** 玩家状态的基础数据 */
        class PlayerBase {
        }
        ActorState.PlayerBase = PlayerBase;
        /** NPC的基础状态数据 */
        class NpcBase {
        }
        ActorState.NpcBase = NpcBase;
        /** Monster 的基础状态数据 */
        class MonsterBase {
        }
        ActorState.MonsterBase = MonsterBase;
        /*** 注: 一些在不同的类之间可能共享的数据组件放在下面,如生命,魔法等. 方便扩展.
         * 这些数据并不是所有的角色都有,如功能NPC就不存在生命值,所以也就不可以被攻击!
         */
        /** 角色的生命组件 */
        class Life {
            constructor(VLife, // 当前生命值
            VLifeMax // 获取最大生命值
            ) {
                this.VLife = VLife;
                this.VLifeMax = VLifeMax;
            }
        }
        ActorState.Life = Life;
        /** 角色的魔法数据相关 */
        class Magic {
            constructor(VMagic, // 当前蓝值
            VMagicMax) {
                this.VMagic = VMagic;
                this.VMagicMax = VMagicMax;
            }
        }
        ActorState.Magic = Magic;
        /** 等级相关的组件 */
        class Level {
            constructor(VLevel, // 等级
            ChangeLifeCount = 0 // 重生次数
            ) {
                this.VLevel = VLevel;
                this.ChangeLifeCount = ChangeLifeCount;
            }
        }
        ActorState.Level = Level;
        /** 碰撞组件 */
        class Collider {
            constructor(center, // 碰撞盒位置
            size // 碰撞盒尺寸
            ) {
                this.center = center;
                this.size = size;
            }
        }
        ActorState.Collider = Collider;
        /** 头顶名字组件 */
        class VisualName {
            constructor(title, // 名称文本
            initHeight, // 初始的高度（Player、NPC默认的高度）
            extraHeight = 0, // 额外的高度（骑马等增加的高度）
            color = "#ffffff", // 名称文本颜色
            outWorldPos = new Laya.Vector3() // 输出名字所在的世界坐标，该值在初始化的时候不用赋值
            ) {
                this.title = title;
                this.initHeight = initHeight;
                this.extraHeight = extraHeight;
                this.color = color;
                this.outWorldPos = outWorldPos;
            }
        }
        ActorState.VisualName = VisualName;
    })(ActorState = Logic.ActorState || (Logic.ActorState = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=ActorState.js.map