/**
 * @desc 定义网络消息Id.
 * 注: 消息Id的值不可以大于65536.只支持uint16的值,以节省带宽
 */
enum EMessageType {
    CMD_SOCKET_DEFAULT = -3,        // 用于接收所有网络消息的消息. 不管有没有其它的监听处理,只要有消息都会触发此监听.
    CMD_SOCKET_DISCONNECT = -2,     // 网络断开

    CMD_INVALID = -1,               // 无效值

    LS_LOGIN_ON = 1,                // LoginServer登录消息
    LS_LOGIN_SPEEDY_LOGIN = 2,      // 快速登录

    CMD_SPR_CLIENTHEART = 23,       // 发送给服务器的心跳

    CMD_PREREMOVE_ROLE = 98,       // 预删除角色消息
    CMD_UNREMOVE_ROLE = 99,       // 恢复预删除的角色
    CMD_LOGIN = 100,      // GameServer的登录消息
    CMD_ROLE_LIST = 101,      // 角色列表消息
    CMD_CREATE_ROLE = 102,      // 创建角色
    CMD_REMOVE_ROLE = 103,      // 删除角色
    CMD_INIT_GAME = 104,      // 初始化游戏
    CMD_SYNC_TIME = 105,      // 同步时间
    CMD_PLAY_GAME = 106,      // 场景与主角加载完成,通知服务器可以开始游戏逻辑了
    CMD_SPR_MOVE = 107,      // 移动消息

    CMD_OTHER_ROLE = 110,      // netplayer的同步
    CMD_SPR_POSITION = 112,      // 位置同步消息
    CMD_SPR_ACTTION = 114,      // 行为同步
    CMD_SPR_MAGICCODE = 116,      // 攻击消息
    CMD_SPR_ATTACK = 117,      // 一次攻击消息
    CMD_SPR_INJURE = 118,      // 伤害消息
    CMD_SPR_REALIVE = 119,      // 复活消息（人/怪物）
    CMD_SPR_RELIFE = 120,      // 回血回蓝消息
    CMD_SPR_CLICKON = 121,      // 点击Npc,与它对话?
    CMD_SYSTEM_MONSTER = 122,      // 创建一个Monster
    CMD_SPR_MAPCHANGE = 123,      // 切换地图
    CMD_SPR_NEWTASK = 125,      // 接受新的任务
    CMD_SPR_GETATTRIB2 = 126,      // 获取属性消息
    CMD_SPR_LEAVE = 127,      // 删除指定的Npc或角色?

    CMD_SPR_ADD_GOODS = 130,      // 服务器通知添加一个道具到背包
    CMD_SPR_MOD_GOODS = 131,      // 修改道具信息
    CMD_SPR_CHGCODE = 137,              // 换装
    CMD_SPR_MONEYCHANGE = 138,      // 金钱改变
    CMD_SPR_MODTASK = 139,      // 更新任务的数据
    CMD_SPR_COMPTASK = 140,      // 确定任务完成的消息
    CMD_SPR_EXPCHANGE = 141,      // 经验改变消息

    CMD_SPR_UPDATENPCSTATE = 151,   // 更新NPC身上的任务状态
    CMD_SPR_NPCSTATELIST = 152,     // 更新玩家在各个NPC上的任务状态

    CMD_SPR_HITED = 155,      // 受击消息
    CMD_SPR_MODKEYS = 156,      // 修改快捷使用配置
    CMD_SPR_CHAT = 157,      //  聊天消息
    CMD_SPR_USEGOODS = 158,      // 使用道具

    CMD_SPR_CHANGEPOS = 159,        // 位置改变
    CMD_SPR_NOTIFYCHGMAP = 160,     // 通知切换地图

    CMD_SPR_UPDATE_ROLEDATA = 164,  // 更新角色数据
    CMD_SPR_REMOVE_COOLDOWN = 165,  // 通知主角技能cd结束了
    CMD_SPR_MALL_BUY = 166, // 商城商品购买(钻石、银币)
    CMD_SPR_USERMONEYCHANGE = 168,  //  钻石货币数量改变
    CMD_SPR_USERYINLIANGCHANGE = 169,  // 金币数量改变

    CMD_SPR_AUTOFIGHT = 182,     // 自动战斗

    CMD_SPR_GOTOMAP = 193,          // 到指定的关卡去

    CMD_SPR_LOADALREADY = 209,     // 角色加载完毕的消息

    CMD_SPR_UPSKILLLEVEL = 216,     // 升级技能
    CMD_SPR_ADD_SKILL = 217,        // 添加了新技能通知(只通知自己)

    CMD_SPR_BUFFERDATA = 230,      // Buff数据
    CMD_SPR_RESETBAG = 235,      // 背包整理

    CMD_SPR_GETHUODONGDATA = 245,   // 活动数据
    CMD_SPR_FUBENDATA = 252,    // 副本数据
    CMD_SPR_ENTERFUBEN = 253,  // 进入副本

    CMD_SPR_FINDMONSTER = 262,      // 查找怪物的位置

    CMD_UPDATEALLTHINGINDEXS = 292, // 全套加成属性值更新
    CMD_SPR_QUERYBANGHUIDETAIL = 297,   // 帮派信息
    CMD_SPR_BANGGONGCHANGE = 316,   // 帮贡值改变
    CMD_SPR_TASKTRANSPORT = 353,    // 地图跳转
    CMD_SPR_MALLZHENQIBUY = 387,  // 商城商品购买(绑钻)
    CMD_SPR_USERGOLDCHANGE = 397,  // 绑钻数量改变

    CMD_SPR_NEWNPC = 406,      // 创建一个NPC
    CMD_SPR_DELNPC = 407,      // 删除一个NPC

    CMD_SPR_STOPMOVE = 411,      // 停止移动

    CMD_SPR_ROLEPARAMSCHANGE = 427, // 角色参数变化

    CMD_SPR_TASKTRANSPORT2 = 433,      // 任务需要,传送到NPC处

    CMD_SPR_TRANSFERSOMETHING = 438,		// 提交任务物品
    CMD_SPR_FETCHMALLDATA = 440,            // 查询商城数据
    CMD_SPR_MALLQIANGGOUBUYGOODS = 441,    // 抢购商城购买物品
    CMD_SPR_ENTERTASKFUBEN = 444,		// 进入副本
    CMD_SPR_GETTASKAWARDS = 447,		// 获得任务信息
    CMD_SPR_ZJDJIFEN = 499,     // 获取抽奖的积分
    CMD_SPR_GETROLEUSINGGOODSDATALIST = 512,  // 角色使用的物品列表
    CMD_SPR_EXECUTERECOMMENDPROPADDPOINT = 514, // 推荐属性加点
    CMD_SPR_FUBENCLEANOUT = 520,  // 扫荡副本
    CMD_SPR_QUERYFUBENINFO = 522,  // 客户端请求副本信息,获得副本次数
    CMD_SPR_UPDATEEVERYDAYONLINEAWARDGIFTINFO = 539, // 更新玩家的每日在线信息
    CMD_SPR_GETEVERYDAYONLINEAWARDGIFT = 540,        // 领取每日在线奖励
    CMD_SPR_EXCHANGEMOJINGANDQIFU = 548,        // 斗气和祈福兑换
    CMD_SPR_GETMEDITATEEXP = 549,             // 获取潜心修炼经验
    CMD_SPR_GETMEDITATETIMEINFO = 550,        // 获取潜心修炼时间信息

    CMD_SPR_SETAUTOASSIGNPROPERTYPOINT = 560, // 设置自动分配点设置

    CMD_SPR_GETSKILLINFO = 564,      // 请求技能信息

    CMD_SPR_GETVIPINFO = 593,               // 玩家请求VIP信息
    CMD_SPR_GETVIPLEVELAWARD = 594,     // 玩家领取VIP等级奖励
    CMD_SPR_VIPLEVELUP = 595,           // 玩家VIP等级升级

    CMD_SPR_STARTMEDITATE = 600,         // 开始潜心修炼
    CMD_SPR_GETMOJINGEXCHANGEINFO = 613,        // 客户端请求商人兑换信息
    CMD_SPR_REFRESH_ICON_STATE = 614,    // 刷新图标状态信息

    CMD_SPR_QUERYUPLEVELGIFTINFO = 632,  // 请求等级奖励领取信息
    CMD_SPR_GETUPLEVELGIFTAWARD = 633,   // 领取等级奖励奖励
    CMD_SPR_QUERY_REPAYACTIVEINFO = 635,   // 充值回馈 查询充值奖励信息
    CMD_SPR_GET_REPAYACTIVEAWARD = 636,   // 获取回馈活动奖励
    CMD_SPR_QUERY_ALLREPAYACTIVEINFO = 637,    // 获取所有回馈信息，充值和消费值
    CMD_SPR_PUSH_VERSION = 673,    // 报告客户端代码版本号
    CMD_SPR_DRAGONTOTEMDATA = 695,      //圣龙图腾数据同步
    CMD_SECOND_PASSWORD_CHECK_STATE = 860,  // 登录时请求账号下所有角色的二级密码

    CMD_SPR_SEVEN_DAY_ACT_QUERY = 1310, // 查询七日活动信息  客户端访问参数：角色ID (roleid)    

    CMD_SPR_SEVEN_DAY_ACT_GET_AWARD = 1311, // 领取七日活动奖励 (七日登录，七日充值，七日目标)   客户端访问参数：roleid:actType:id	角色id：活动类型：领取的那一项的ID

    CMD_SPR_FASHION_ACTIVE = 1611,  // 时装激活

    CMD_SPR_MAGIC_ATTACK = 2002,    // 同步释放招式消息

    CMD_SPR_UPDATE_MONSTER_BELONGTO_INFO = 2010,  // 同步怪物掉落拥有者信息

    CMD_SPR_GETATTRIBALL = 30100, // 获取装备二级属性

    CMD_SPR_ClientFunOpenTiShi = 30103, // 功能开启提示
    CMD_SPR_ClientFunOpenTiShiRewardPickUp = 30104, // 功能开启功能领取
}