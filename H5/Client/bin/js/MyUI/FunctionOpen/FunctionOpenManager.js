/**
* 游戏中需求开启管理
*/
var MyUI;
(function (MyUI) {
    class FunctionOpenManager {
        // 需求是否开启
        static functionOpenState(fId) {
            const oState = this.funOpenDict.get(fId);
            if (Number.isNaN(oState) || oState === undefined) {
                return false;
            }
            if (oState === 0) // 需求未开启
                return false;
            else // 需求开启
                return true;
        }
        // 解析服务器发的数据
        static saveServerData(sData) {
            const sDataList = sData.split(",");
            const count = sDataList.length / 2;
            for (let i = 0; i < count; i++) {
                const key = Number.parseInt(sDataList[i * 2]);
                const value = Number.parseInt(sDataList[i * 2 + 1]);
                this.funOpenDict.set(key, value);
                // if (key == 1000)
                // Global.Log.Error("key = " + key + "   value = " + value);
            }
        }
    }
    /********************  根据FunctionalOpen.xml表定义   *********************/
    FunctionOpenManager.chongZhi = 1000; // 充值相关：充值相关的一系列屏蔽
    FunctionOpenManager.kaiFuHuoDong = 1010; // 开服活动 
    FunctionOpenManager.heFuHuoDong = 1020; // 合服活动
    FunctionOpenManager.jieRiHuoDong = 1030; // 节日活动
    FunctionOpenManager.yueKa = 1040; // 月卡：福利-月卡页签
    FunctionOpenManager.chengZhangJiJin = 1050; // 成长基金：福利-成长基金
    FunctionOpenManager.juBaoPen = 1060; // 福利：聚宝盆页签
    FunctionOpenManager.qiRiDengLu = 1070; // 七日登录页签屏蔽，七日登录红点屏蔽
    FunctionOpenManager.shanHaiShuLing = 2000; // 山海书灵：山海全书系统中的山海书灵养成玩法
    FunctionOpenManager.tianQiZhiLun = 2010; // 天启之轮
    FunctionOpenManager.longHai = 2020; // 龙骸
    FunctionOpenManager.zhuFuBang = 2030; // 祝福榜：姻缘-祝福榜按钮
    FunctionOpenManager.songZhuFu = 2031; // 人物头像-送TA祝福按钮
    FunctionOpenManager.yinYuan = 2032; // 姻缘系统
    FunctionOpenManager.rankHunJie = 2033; // 排行榜婚戒
    FunctionOpenManager.biYiTingYuan = 2034; // 比翼庭院
    FunctionOpenManager.chiBangHuanYu = 2040; // 翅膀幻羽：翅膀系统的幻羽玩法
    FunctionOpenManager.chiBangYangLingYinLing = 2050; // 翅膀阳灵、阴灵：翅膀界面图标
    FunctionOpenManager.hunLiZhiYu = 2060; // 合成-魂力之羽页签
    FunctionOpenManager.chengJiuWenZhang = 2070; // 成就纹章：成就系统的纹章玩法
    FunctionOpenManager.junXianXunZhang = 2080; // 军衔勋章：军衔系统的勋章玩法
    FunctionOpenManager.yinGuangBaoShi = 2090; // 荧光宝石
    FunctionOpenManager.guaShi = 2100; // 卦石：荧光宝石系统的卦石玩法
    FunctionOpenManager.bangHuiShenDian = 2120; // 帮会神殿页签
    FunctionOpenManager.siKuDao = 3000; // 死骷岛：已完成副本，等待版本开启
    FunctionOpenManager.longJingKuangChang = 3010; // 龙晶矿场：已完成副本，等待版本开启
    FunctionOpenManager.douZhenZhengBa = 3020; // 斗阵争霸：已完成副本，等待版本开启
    FunctionOpenManager.tianTiSai = 3030; // 天梯赛：已完成副本，等待版本开启
    FunctionOpenManager.tianShaZhiZhan = 3040; // 天煞之战：已完成副本，等待版本开启
    FunctionOpenManager.jueSiZhanChang = 3050; // 决死战场：已完成副本，等待版本开启
    FunctionOpenManager.baiLianZhanChang = 3060; // 百炼战场：已完成副本，等待版本开启
    FunctionOpenManager.lingGeXuLian = 3070; // 灵格修炼：已完成副本，等待版本开启
    FunctionOpenManager.qingLvJingJi = 3110; // 情侣竞技：还未制作的系统
    FunctionOpenManager.miZhenBaGua = 3120; // 迷阵八卦：战场-迷阵八卦入口
    FunctionOpenManager.kuaFuZhanChang = 3130; // 战场-跨服战场页签
    FunctionOpenManager.jiaoYiHangZuanShi = 4000; // 交易行钻石交易：屏蔽交易行中钻石交易的相关操作
    FunctionOpenManager.daoJuTiShiZiDongPeiDai = 4010; // 道具提示面板XX秒后自动佩戴提示
    FunctionOpenManager.tianFuBtn = 4020; // 人物头像-查看天赋按钮
    FunctionOpenManager.taskAutoFinish = 4030; // 任务自动倒计时接取、完成
    FunctionOpenManager.chongZhiKeyGetAll = 4040; // 充值福利一键领取按钮
    FunctionOpenManager.tuiKuanXuZhi = 4050; // 购买退款须知
    FunctionOpenManager.yongHuZhongXin = 4060; // 用户中心
    FunctionOpenManager.liaoTian = 5000; // 聊天语音按钮显示
    FunctionOpenManager.funOpenDict = new Map();
    FunctionOpenManager.china = "China";
    FunctionOpenManager.korea = "Korea";
    MyUI.FunctionOpenManager = FunctionOpenManager;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=FunctionOpenManager.js.map