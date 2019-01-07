/**
* 普通攻击3段时间 
*/
namespace SetupPuGong3DuanTime {
	export let damageTimes = [0.2, 0.12, 0.2];  // 普攻的伤害时间点(秒). 从技能释放开始计算
	export let lockTimes = [0.6, 0.425, 0.445]; // 普攻的硬值时间点(秒). 从技能释放开始计算,之后动作可以被下一个技能释放或行走打断
	export let attackTimes = [0.667, 0.5, 0.5];  // 普攻的动作总长度(秒). 即如果动作不被打断,会等待这么长时间以便动作播放完成. 从技能释放开始计算.

}