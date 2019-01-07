/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots.NetMsg || ($protobuf.roots.NetMsg = {});
    
    $root.CToGS_Login = (function() {
    
        /**
         * Properties of a CToGS_Login.
         * @exports ICToGS_Login
         * @interface ICToGS_Login
         * @property {string|null} [Info] CToGS_Login Info
         */
    
        /**
         * Constructs a new CToGS_Login.
         * @exports CToGS_Login
         * @classdesc Represents a CToGS_Login.
         * @implements ICToGS_Login
         * @constructor
         * @param {ICToGS_Login=} [properties] Properties to set
         */
        function CToGS_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CToGS_Login Info.
         * @member {string} Info
         * @memberof CToGS_Login
         * @instance
         */
        CToGS_Login.prototype.Info = "";
    
        /**
         * Encodes the specified CToGS_Login message. Does not implicitly {@link CToGS_Login.verify|verify} messages.
         * @function encode
         * @memberof CToGS_Login
         * @static
         * @param {ICToGS_Login} message CToGS_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CToGS_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Info != null && message.hasOwnProperty("Info"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Info);
            return writer;
        };
    
        /**
         * Decodes a CToGS_Login message from the specified reader or buffer.
         * @function decode
         * @memberof CToGS_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CToGS_Login} CToGS_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CToGS_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CToGS_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return CToGS_Login;
    })();
    
    $root.GoodsData = (function() {
    
        /**
         * Properties of a GoodsData.
         * @exports IGoodsData
         * @interface IGoodsData
         * @property {number|null} [Id] 数据库流水ID
         * @property {number|null} [GoodsID] 物品ID
         * @property {number|null} [Using] 是否正在使用
         * @property {number|null} [ForgeLevel] 锻造级别
         * @property {string|null} [Starttime] 开始使用的时间
         * @property {string|null} [Endtime] 物品使用截止时间
         * @property {number|null} [Site] 所在的位置(0: 包裹, 1:仓库)
         * @property {number|null} [Quality] 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来)
         * @property {string|null} [Props] 根据品质随机抽取的扩展属性的索引列表
         * @property {number|null} [GCount] 物品数量
         * @property {number|null} [Binding] 是否绑定的物品(绑定的物品不可交易, 不可摆摊)
         * @property {string|null} [Jewellist] 根据品质随机抽取的扩展属性的索引列表
         * @property {number|null} [BagIndex] 根据品质随机抽取的扩展属性的索引列表
         * @property {number|null} [SaleMoney1] 出售的金币价格
         * @property {number|null} [SaleYuanBao] 出售的钻石价格
         * @property {number|null} [SaleYinPiao] 出售的银两价格
         * @property {number|null} [AddPropIndex] 出售的银两价格
         * @property {number|null} [BornIndex] 增加一个天生属性的百分比
         * @property {number|null} [Lucky] 装备的幸运值
         * @property {number|null} [Strong] 装备的耐久度--如果是萌宠则表示羁当前经验
         * @property {number|null} [ExcellenceInfo] 卓越信息 -- 一个32位int32 每位代表一个卓越属性
         * @property {number|null} [AppendPropLev] 追加等级--如果是萌宠则表示羁绊的是哪个坐骑
         * @property {number|null} [ChangeLifeLevForEquip] 装备的重生级别
         * @property {Array.<number>|null} [WashProps] 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值...
         * @property {Array.<number>|null} [ElementhrtsProps] 元素之心的属性
         */
    
        /**
         * Constructs a new GoodsData.
         * @exports GoodsData
         * @classdesc 物品数据
         * @implements IGoodsData
         * @constructor
         * @param {IGoodsData=} [properties] Properties to set
         */
        function GoodsData(properties) {
            this.WashProps = [];
            this.ElementhrtsProps = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 数据库流水ID
         * @member {number} Id
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Id = 0;
    
        /**
         * 物品ID
         * @member {number} GoodsID
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.GoodsID = 0;
    
        /**
         * 是否正在使用
         * @member {number} Using
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Using = 0;
    
        /**
         * 锻造级别
         * @member {number} ForgeLevel
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.ForgeLevel = 0;
    
        /**
         * 开始使用的时间
         * @member {string} Starttime
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Starttime = "";
    
        /**
         * 物品使用截止时间
         * @member {string} Endtime
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Endtime = "";
    
        /**
         * 所在的位置(0: 包裹, 1:仓库)
         * @member {number} Site
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Site = 0;
    
        /**
         * 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来)
         * @member {number} Quality
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Quality = 0;
    
        /**
         * 根据品质随机抽取的扩展属性的索引列表
         * @member {string} Props
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Props = "";
    
        /**
         * 物品数量
         * @member {number} GCount
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.GCount = 0;
    
        /**
         * 是否绑定的物品(绑定的物品不可交易, 不可摆摊)
         * @member {number} Binding
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Binding = 0;
    
        /**
         * 根据品质随机抽取的扩展属性的索引列表
         * @member {string} Jewellist
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Jewellist = "";
    
        /**
         * 根据品质随机抽取的扩展属性的索引列表
         * @member {number} BagIndex
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.BagIndex = 0;
    
        /**
         * 出售的金币价格
         * @member {number} SaleMoney1
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.SaleMoney1 = 0;
    
        /**
         * 出售的钻石价格
         * @member {number} SaleYuanBao
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.SaleYuanBao = 0;
    
        /**
         * 出售的银两价格
         * @member {number} SaleYinPiao
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.SaleYinPiao = 0;
    
        /**
         * 出售的银两价格
         * @member {number} AddPropIndex
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.AddPropIndex = 0;
    
        /**
         * 增加一个天生属性的百分比
         * @member {number} BornIndex
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.BornIndex = 0;
    
        /**
         * 装备的幸运值
         * @member {number} Lucky
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Lucky = 0;
    
        /**
         * 装备的耐久度--如果是萌宠则表示羁当前经验
         * @member {number} Strong
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.Strong = 0;
    
        /**
         * 卓越信息 -- 一个32位int32 每位代表一个卓越属性
         * @member {number} ExcellenceInfo
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.ExcellenceInfo = 0;
    
        /**
         * 追加等级--如果是萌宠则表示羁绊的是哪个坐骑
         * @member {number} AppendPropLev
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.AppendPropLev = 0;
    
        /**
         * 装备的重生级别
         * @member {number} ChangeLifeLevForEquip
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.ChangeLifeLevForEquip = 0;
    
        /**
         * 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值...
         * @member {Array.<number>} WashProps
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.WashProps = $util.emptyArray;
    
        /**
         * 元素之心的属性
         * @member {Array.<number>} ElementhrtsProps
         * @memberof GoodsData
         * @instance
         */
        GoodsData.prototype.ElementhrtsProps = $util.emptyArray;
    
        /**
         * Encodes the specified GoodsData message. Does not implicitly {@link GoodsData.verify|verify} messages.
         * @function encode
         * @memberof GoodsData
         * @static
         * @param {IGoodsData} message GoodsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GoodsData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Id);
            if (message.GoodsID != null && message.hasOwnProperty("GoodsID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.GoodsID);
            if (message.Using != null && message.hasOwnProperty("Using"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Using);
            if (message.ForgeLevel != null && message.hasOwnProperty("ForgeLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ForgeLevel);
            if (message.Starttime != null && message.hasOwnProperty("Starttime"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.Starttime);
            if (message.Endtime != null && message.hasOwnProperty("Endtime"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.Endtime);
            if (message.Site != null && message.hasOwnProperty("Site"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.Site);
            if (message.Quality != null && message.hasOwnProperty("Quality"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.Quality);
            if (message.Props != null && message.hasOwnProperty("Props"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.Props);
            if (message.GCount != null && message.hasOwnProperty("GCount"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.GCount);
            if (message.Binding != null && message.hasOwnProperty("Binding"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.Binding);
            if (message.Jewellist != null && message.hasOwnProperty("Jewellist"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.Jewellist);
            if (message.BagIndex != null && message.hasOwnProperty("BagIndex"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.BagIndex);
            if (message.SaleMoney1 != null && message.hasOwnProperty("SaleMoney1"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.SaleMoney1);
            if (message.SaleYuanBao != null && message.hasOwnProperty("SaleYuanBao"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.SaleYuanBao);
            if (message.SaleYinPiao != null && message.hasOwnProperty("SaleYinPiao"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.SaleYinPiao);
            if (message.AddPropIndex != null && message.hasOwnProperty("AddPropIndex"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.AddPropIndex);
            if (message.BornIndex != null && message.hasOwnProperty("BornIndex"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.BornIndex);
            if (message.Lucky != null && message.hasOwnProperty("Lucky"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.Lucky);
            if (message.Strong != null && message.hasOwnProperty("Strong"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.Strong);
            if (message.ExcellenceInfo != null && message.hasOwnProperty("ExcellenceInfo"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.ExcellenceInfo);
            if (message.AppendPropLev != null && message.hasOwnProperty("AppendPropLev"))
                writer.uint32(/* id 22, wireType 0 =*/176).int32(message.AppendPropLev);
            if (message.ChangeLifeLevForEquip != null && message.hasOwnProperty("ChangeLifeLevForEquip"))
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.ChangeLifeLevForEquip);
            if (message.WashProps != null && message.WashProps.length) {
                writer.uint32(/* id 24, wireType 2 =*/194).fork();
                for (var i = 0; i < message.WashProps.length; ++i)
                    writer.int32(message.WashProps[i]);
                writer.ldelim();
            }
            if (message.ElementhrtsProps != null && message.ElementhrtsProps.length) {
                writer.uint32(/* id 25, wireType 2 =*/202).fork();
                for (var i = 0; i < message.ElementhrtsProps.length; ++i)
                    writer.int32(message.ElementhrtsProps[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes a GoodsData message from the specified reader or buffer.
         * @function decode
         * @memberof GoodsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GoodsData} GoodsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GoodsData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GoodsData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Id = reader.int32();
                    break;
                case 2:
                    message.GoodsID = reader.int32();
                    break;
                case 3:
                    message.Using = reader.int32();
                    break;
                case 4:
                    message.ForgeLevel = reader.int32();
                    break;
                case 5:
                    message.Starttime = reader.string();
                    break;
                case 6:
                    message.Endtime = reader.string();
                    break;
                case 7:
                    message.Site = reader.int32();
                    break;
                case 8:
                    message.Quality = reader.int32();
                    break;
                case 9:
                    message.Props = reader.string();
                    break;
                case 10:
                    message.GCount = reader.int32();
                    break;
                case 11:
                    message.Binding = reader.int32();
                    break;
                case 12:
                    message.Jewellist = reader.string();
                    break;
                case 13:
                    message.BagIndex = reader.int32();
                    break;
                case 14:
                    message.SaleMoney1 = reader.int32();
                    break;
                case 15:
                    message.SaleYuanBao = reader.int32();
                    break;
                case 16:
                    message.SaleYinPiao = reader.int32();
                    break;
                case 17:
                    message.AddPropIndex = reader.int32();
                    break;
                case 18:
                    message.BornIndex = reader.int32();
                    break;
                case 19:
                    message.Lucky = reader.int32();
                    break;
                case 20:
                    message.Strong = reader.int32();
                    break;
                case 21:
                    message.ExcellenceInfo = reader.int32();
                    break;
                case 22:
                    message.AppendPropLev = reader.int32();
                    break;
                case 23:
                    message.ChangeLifeLevForEquip = reader.int32();
                    break;
                case 24:
                    if (!(message.WashProps && message.WashProps.length))
                        message.WashProps = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.WashProps.push(reader.int32());
                    } else
                        message.WashProps.push(reader.int32());
                    break;
                case 25:
                    if (!(message.ElementhrtsProps && message.ElementhrtsProps.length))
                        message.ElementhrtsProps = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ElementhrtsProps.push(reader.int32());
                    } else
                        message.ElementhrtsProps.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return GoodsData;
    })();
    
    $root.WingData = (function() {
    
        /**
         * Properties of a WingData.
         * @exports IWingData
         * @interface IWingData
         * @property {number|null} [DbID] 翅膀的数据库ID
         * @property {number|null} [WingID] 翅膀ID
         * @property {number|null} [ForgeLevel] 翅膀强化的次数
         * @property {number|Long|null} [AddDateTime] 翅膀的领养时间
         * @property {number|null} [JinJieFailedNum] 本次进阶成功前失败的次数
         * @property {number|null} [Using] 是否使用
         * @property {number|null} [StarExp] 升星经验值
         * @property {number|null} [ZhuLingNum] 注灵次数
         * @property {number|null} [ZhuHunNum] 注魂次数
         */
    
        /**
         * Constructs a new WingData.
         * @exports WingData
         * @classdesc 翅膀数据
         * @implements IWingData
         * @constructor
         * @param {IWingData=} [properties] Properties to set
         */
        function WingData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 翅膀的数据库ID
         * @member {number} DbID
         * @memberof WingData
         * @instance
         */
        WingData.prototype.DbID = 0;
    
        /**
         * 翅膀ID
         * @member {number} WingID
         * @memberof WingData
         * @instance
         */
        WingData.prototype.WingID = 0;
    
        /**
         * 翅膀强化的次数
         * @member {number} ForgeLevel
         * @memberof WingData
         * @instance
         */
        WingData.prototype.ForgeLevel = 0;
    
        /**
         * 翅膀的领养时间
         * @member {number|Long} AddDateTime
         * @memberof WingData
         * @instance
         */
        WingData.prototype.AddDateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 本次进阶成功前失败的次数
         * @member {number} JinJieFailedNum
         * @memberof WingData
         * @instance
         */
        WingData.prototype.JinJieFailedNum = 0;
    
        /**
         * 是否使用
         * @member {number} Using
         * @memberof WingData
         * @instance
         */
        WingData.prototype.Using = 0;
    
        /**
         * 升星经验值
         * @member {number} StarExp
         * @memberof WingData
         * @instance
         */
        WingData.prototype.StarExp = 0;
    
        /**
         * 注灵次数
         * @member {number} ZhuLingNum
         * @memberof WingData
         * @instance
         */
        WingData.prototype.ZhuLingNum = 0;
    
        /**
         * 注魂次数
         * @member {number} ZhuHunNum
         * @memberof WingData
         * @instance
         */
        WingData.prototype.ZhuHunNum = 0;
    
        /**
         * Encodes the specified WingData message. Does not implicitly {@link WingData.verify|verify} messages.
         * @function encode
         * @memberof WingData
         * @static
         * @param {IWingData} message WingData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WingData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.DbID != null && message.hasOwnProperty("DbID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.DbID);
            if (message.WingID != null && message.hasOwnProperty("WingID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.WingID);
            if (message.ForgeLevel != null && message.hasOwnProperty("ForgeLevel"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.ForgeLevel);
            if (message.AddDateTime != null && message.hasOwnProperty("AddDateTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.AddDateTime);
            if (message.JinJieFailedNum != null && message.hasOwnProperty("JinJieFailedNum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.JinJieFailedNum);
            if (message.Using != null && message.hasOwnProperty("Using"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Using);
            if (message.StarExp != null && message.hasOwnProperty("StarExp"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.StarExp);
            if (message.ZhuLingNum != null && message.hasOwnProperty("ZhuLingNum"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ZhuLingNum);
            if (message.ZhuHunNum != null && message.hasOwnProperty("ZhuHunNum"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.ZhuHunNum);
            return writer;
        };
    
        /**
         * Decodes a WingData message from the specified reader or buffer.
         * @function decode
         * @memberof WingData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {WingData} WingData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WingData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WingData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.DbID = reader.int32();
                    break;
                case 2:
                    message.WingID = reader.int32();
                    break;
                case 3:
                    message.ForgeLevel = reader.int32();
                    break;
                case 4:
                    message.AddDateTime = reader.int64();
                    break;
                case 5:
                    message.JinJieFailedNum = reader.int32();
                    break;
                case 6:
                    message.Using = reader.int32();
                    break;
                case 7:
                    message.StarExp = reader.int32();
                    break;
                case 8:
                    message.ZhuLingNum = reader.int32();
                    break;
                case 9:
                    message.ZhuHunNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return WingData;
    })();
    
    $root.RoleData4Selector = (function() {
    
        /**
         * Properties of a RoleData4Selector.
         * @exports IRoleData4Selector
         * @interface IRoleData4Selector
         * @property {number|null} [RoleID] 当前的角色ID
         * @property {string|null} [RoleName] 当前的角色名称
         * @property {number|null} [RoleSex] 当前角色的性别
         * @property {number|null} [Occupation] 角色职业
         * @property {number|null} [Level] 角色级别
         * @property {number|null} [Faction] 角色所属的帮派
         * @property {string|null} [OtherName] 称号
         * @property {Array.<IGoodsData>|null} [GoodsDataList] 物品数据
         * @property {IWingData|null} [MyWingData] 翅膀数据列表
         * @property {number|null} [CombatForce] 战斗力
         * @property {number|null} [AdmiredCount] 被崇拜次数
         * @property {number|null} [FashionWingsID] 时装翅膀id
         * @property {number|Long|null} [SettingBitFlags] 二态功能设置，参考ESettingBitFlag
         */
    
        /**
         * Constructs a new RoleData4Selector.
         * @exports RoleData4Selector
         * @classdesc 选择角色的数据定义
         * @implements IRoleData4Selector
         * @constructor
         * @param {IRoleData4Selector=} [properties] Properties to set
         */
        function RoleData4Selector(properties) {
            this.GoodsDataList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的角色ID
         * @member {number} RoleID
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.RoleID = 0;
    
        /**
         * 当前的角色名称
         * @member {string} RoleName
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.RoleName = "";
    
        /**
         * 当前角色的性别
         * @member {number} RoleSex
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.RoleSex = 0;
    
        /**
         * 角色职业
         * @member {number} Occupation
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.Occupation = 0;
    
        /**
         * 角色级别
         * @member {number} Level
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.Level = 0;
    
        /**
         * 角色所属的帮派
         * @member {number} Faction
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.Faction = 0;
    
        /**
         * 称号
         * @member {string} OtherName
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.OtherName = "";
    
        /**
         * 物品数据
         * @member {Array.<IGoodsData>} GoodsDataList
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.GoodsDataList = $util.emptyArray;
    
        /**
         * 翅膀数据列表
         * @member {IWingData|null|undefined} MyWingData
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.MyWingData = null;
    
        /**
         * 战斗力
         * @member {number} CombatForce
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.CombatForce = 0;
    
        /**
         * 被崇拜次数
         * @member {number} AdmiredCount
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.AdmiredCount = 0;
    
        /**
         * 时装翅膀id
         * @member {number} FashionWingsID
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.FashionWingsID = 0;
    
        /**
         * 二态功能设置，参考ESettingBitFlag
         * @member {number|Long} SettingBitFlags
         * @memberof RoleData4Selector
         * @instance
         */
        RoleData4Selector.prototype.SettingBitFlags = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Encodes the specified RoleData4Selector message. Does not implicitly {@link RoleData4Selector.verify|verify} messages.
         * @function encode
         * @memberof RoleData4Selector
         * @static
         * @param {IRoleData4Selector} message RoleData4Selector message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleData4Selector.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.RoleName != null && message.hasOwnProperty("RoleName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.RoleName);
            if (message.RoleSex != null && message.hasOwnProperty("RoleSex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.RoleSex);
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Occupation);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Level);
            if (message.Faction != null && message.hasOwnProperty("Faction"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Faction);
            if (message.OtherName != null && message.hasOwnProperty("OtherName"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.OtherName);
            if (message.GoodsDataList != null && message.GoodsDataList.length)
                for (var i = 0; i < message.GoodsDataList.length; ++i)
                    $root.GoodsData.encode(message.GoodsDataList[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.MyWingData != null && message.hasOwnProperty("MyWingData"))
                $root.WingData.encode(message.MyWingData, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.CombatForce != null && message.hasOwnProperty("CombatForce"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.CombatForce);
            if (message.AdmiredCount != null && message.hasOwnProperty("AdmiredCount"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.AdmiredCount);
            if (message.FashionWingsID != null && message.hasOwnProperty("FashionWingsID"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.FashionWingsID);
            if (message.SettingBitFlags != null && message.hasOwnProperty("SettingBitFlags"))
                writer.uint32(/* id 13, wireType 0 =*/104).int64(message.SettingBitFlags);
            return writer;
        };
    
        /**
         * Decodes a RoleData4Selector message from the specified reader or buffer.
         * @function decode
         * @memberof RoleData4Selector
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoleData4Selector} RoleData4Selector
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleData4Selector.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoleData4Selector();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.RoleName = reader.string();
                    break;
                case 3:
                    message.RoleSex = reader.int32();
                    break;
                case 4:
                    message.Occupation = reader.int32();
                    break;
                case 5:
                    message.Level = reader.int32();
                    break;
                case 6:
                    message.Faction = reader.int32();
                    break;
                case 7:
                    message.OtherName = reader.string();
                    break;
                case 8:
                    if (!(message.GoodsDataList && message.GoodsDataList.length))
                        message.GoodsDataList = [];
                    message.GoodsDataList.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                case 9:
                    message.MyWingData = $root.WingData.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.CombatForce = reader.int32();
                    break;
                case 11:
                    message.AdmiredCount = reader.int32();
                    break;
                case 12:
                    message.FashionWingsID = reader.int32();
                    break;
                case 13:
                    message.SettingBitFlags = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return RoleData4Selector;
    })();
    
    $root.AwardsItemData = (function() {
    
        /**
         * Properties of an AwardsItemData.
         * @exports IAwardsItemData
         * @interface IAwardsItemData
         * @property {number|null} [Occupation] 职业标识
         * @property {number|null} [GoodsID] 物品ID
         * @property {number|null} [GoodsNum] 物品数量
         * @property {number|null} [Binding] 是否绑定物品
         * @property {number|null} [Level] 物品的级别
         * @property {number|null} [Quality] 物品的品质
         * @property {string|null} [EndTime] 物品的截止时间
         * @property {number|null} [BornIndex] 物品的天生
         * @property {number|null} [RoleSex] 性别标示
         * @property {number|null} [AppendLev] 物品追加等级
         * @property {number|null} [IsHaveLuckyProp] 是否有幸运
         * @property {number|null} [ExcellencePorpValue] 卓越属性值
         */
    
        /**
         * Constructs a new AwardsItemData.
         * @exports AwardsItemData
         * @classdesc 物品奖励数据
         * @implements IAwardsItemData
         * @constructor
         * @param {IAwardsItemData=} [properties] Properties to set
         */
        function AwardsItemData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 职业标识
         * @member {number} Occupation
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.Occupation = 0;
    
        /**
         * 物品ID
         * @member {number} GoodsID
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.GoodsID = 0;
    
        /**
         * 物品数量
         * @member {number} GoodsNum
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.GoodsNum = 0;
    
        /**
         * 是否绑定物品
         * @member {number} Binding
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.Binding = 0;
    
        /**
         * 物品的级别
         * @member {number} Level
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.Level = 0;
    
        /**
         * 物品的品质
         * @member {number} Quality
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.Quality = 0;
    
        /**
         * 物品的截止时间
         * @member {string} EndTime
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.EndTime = "";
    
        /**
         * 物品的天生
         * @member {number} BornIndex
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.BornIndex = 0;
    
        /**
         * 性别标示
         * @member {number} RoleSex
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.RoleSex = 0;
    
        /**
         * 物品追加等级
         * @member {number} AppendLev
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.AppendLev = 0;
    
        /**
         * 是否有幸运
         * @member {number} IsHaveLuckyProp
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.IsHaveLuckyProp = 0;
    
        /**
         * 卓越属性值
         * @member {number} ExcellencePorpValue
         * @memberof AwardsItemData
         * @instance
         */
        AwardsItemData.prototype.ExcellencePorpValue = 0;
    
        /**
         * Encodes the specified AwardsItemData message. Does not implicitly {@link AwardsItemData.verify|verify} messages.
         * @function encode
         * @memberof AwardsItemData
         * @static
         * @param {IAwardsItemData} message AwardsItemData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwardsItemData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Occupation);
            if (message.GoodsID != null && message.hasOwnProperty("GoodsID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.GoodsID);
            if (message.GoodsNum != null && message.hasOwnProperty("GoodsNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.GoodsNum);
            if (message.Binding != null && message.hasOwnProperty("Binding"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Binding);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Level);
            if (message.Quality != null && message.hasOwnProperty("Quality"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Quality);
            if (message.EndTime != null && message.hasOwnProperty("EndTime"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.EndTime);
            if (message.BornIndex != null && message.hasOwnProperty("BornIndex"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.BornIndex);
            if (message.RoleSex != null && message.hasOwnProperty("RoleSex"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.RoleSex);
            if (message.AppendLev != null && message.hasOwnProperty("AppendLev"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.AppendLev);
            if (message.IsHaveLuckyProp != null && message.hasOwnProperty("IsHaveLuckyProp"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.IsHaveLuckyProp);
            if (message.ExcellencePorpValue != null && message.hasOwnProperty("ExcellencePorpValue"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.ExcellencePorpValue);
            return writer;
        };
    
        /**
         * Decodes an AwardsItemData message from the specified reader or buffer.
         * @function decode
         * @memberof AwardsItemData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AwardsItemData} AwardsItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwardsItemData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AwardsItemData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Occupation = reader.int32();
                    break;
                case 2:
                    message.GoodsID = reader.int32();
                    break;
                case 3:
                    message.GoodsNum = reader.int32();
                    break;
                case 4:
                    message.Binding = reader.int32();
                    break;
                case 5:
                    message.Level = reader.int32();
                    break;
                case 6:
                    message.Quality = reader.int32();
                    break;
                case 7:
                    message.EndTime = reader.string();
                    break;
                case 8:
                    message.BornIndex = reader.int32();
                    break;
                case 9:
                    message.RoleSex = reader.int32();
                    break;
                case 10:
                    message.AppendLev = reader.int32();
                    break;
                case 11:
                    message.IsHaveLuckyProp = reader.int32();
                    break;
                case 12:
                    message.ExcellencePorpValue = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return AwardsItemData;
    })();
    
    $root.TaskAwardsData = (function() {
    
        /**
         * Properties of a TaskAwardsData.
         * @exports ITaskAwardsData
         * @interface ITaskAwardsData
         * @property {Array.<IAwardsItemData>|null} [TaskawardList] 任务奖励
         * @property {Array.<IAwardsItemData>|null} [OtherTaskawardList] 任务其他奖励
         * @property {number|null} [Moneyaward] 任务金币奖励
         * @property {number|Long|null} [Experienceaward] 任务经验奖励
         * @property {number|null} [YinLiangaward] 任务银两奖励
         * @property {number|null} [LingLiaward] 任务灵力奖励
         * @property {number|null} [BindYuanBaoaward] 任务绑定钻石奖励
         * @property {number|null} [ZhenQiaward] 真气奖励
         * @property {number|null} [LieShaaward] 猎杀值奖励
         * @property {number|null} [WuXingaward] 悟性值奖励
         * @property {number|null} [NeedYuanBao] 钻石完成需要消耗钻石
         * @property {number|null} [JunGongaward] 军功值奖励
         * @property {number|null} [RongYuaward] 荣誉奖励
         * @property {number|null} [AddExperienceForDailyCircleTask] 完成所有环额外经验奖励
         * @property {number|null} [AddMoJingForDailyCircleTask] 完成所有环额外斗气奖励
         * @property {string|null} [AddGoodsForDailyCircleTask] 完成所有环额外物品奖励
         * @property {number|null} [MoJingaward] 斗气奖励
         * @property {number|null} [XingHunaward] 星魂奖励
         * @property {number|null} [FenMoAward] 粉末奖励
         * @property {number|null} [ShengwangAward] 声望奖励
         * @property {number|null} [SAwardBHMoney] 帮会贡献值奖励
         */
    
        /**
         * Constructs a new TaskAwardsData.
         * @exports TaskAwardsData
         * @classdesc 任务奖励数据
         * @implements ITaskAwardsData
         * @constructor
         * @param {ITaskAwardsData=} [properties] Properties to set
         */
        function TaskAwardsData(properties) {
            this.TaskawardList = [];
            this.OtherTaskawardList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 任务奖励
         * @member {Array.<IAwardsItemData>} TaskawardList
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.TaskawardList = $util.emptyArray;
    
        /**
         * 任务其他奖励
         * @member {Array.<IAwardsItemData>} OtherTaskawardList
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.OtherTaskawardList = $util.emptyArray;
    
        /**
         * 任务金币奖励
         * @member {number} Moneyaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.Moneyaward = 0;
    
        /**
         * 任务经验奖励
         * @member {number|Long} Experienceaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.Experienceaward = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 任务银两奖励
         * @member {number} YinLiangaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.YinLiangaward = 0;
    
        /**
         * 任务灵力奖励
         * @member {number} LingLiaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.LingLiaward = 0;
    
        /**
         * 任务绑定钻石奖励
         * @member {number} BindYuanBaoaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.BindYuanBaoaward = 0;
    
        /**
         * 真气奖励
         * @member {number} ZhenQiaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.ZhenQiaward = 0;
    
        /**
         * 猎杀值奖励
         * @member {number} LieShaaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.LieShaaward = 0;
    
        /**
         * 悟性值奖励
         * @member {number} WuXingaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.WuXingaward = 0;
    
        /**
         * 钻石完成需要消耗钻石
         * @member {number} NeedYuanBao
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.NeedYuanBao = 0;
    
        /**
         * 军功值奖励
         * @member {number} JunGongaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.JunGongaward = 0;
    
        /**
         * 荣誉奖励
         * @member {number} RongYuaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.RongYuaward = 0;
    
        /**
         * 完成所有环额外经验奖励
         * @member {number} AddExperienceForDailyCircleTask
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.AddExperienceForDailyCircleTask = 0;
    
        /**
         * 完成所有环额外斗气奖励
         * @member {number} AddMoJingForDailyCircleTask
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.AddMoJingForDailyCircleTask = 0;
    
        /**
         * 完成所有环额外物品奖励
         * @member {string} AddGoodsForDailyCircleTask
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.AddGoodsForDailyCircleTask = "";
    
        /**
         * 斗气奖励
         * @member {number} MoJingaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.MoJingaward = 0;
    
        /**
         * 星魂奖励
         * @member {number} XingHunaward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.XingHunaward = 0;
    
        /**
         * 粉末奖励
         * @member {number} FenMoAward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.FenMoAward = 0;
    
        /**
         * 声望奖励
         * @member {number} ShengwangAward
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.ShengwangAward = 0;
    
        /**
         * 帮会贡献值奖励
         * @member {number} SAwardBHMoney
         * @memberof TaskAwardsData
         * @instance
         */
        TaskAwardsData.prototype.SAwardBHMoney = 0;
    
        /**
         * Encodes the specified TaskAwardsData message. Does not implicitly {@link TaskAwardsData.verify|verify} messages.
         * @function encode
         * @memberof TaskAwardsData
         * @static
         * @param {ITaskAwardsData} message TaskAwardsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TaskAwardsData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.TaskawardList != null && message.TaskawardList.length)
                for (var i = 0; i < message.TaskawardList.length; ++i)
                    $root.AwardsItemData.encode(message.TaskawardList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.OtherTaskawardList != null && message.OtherTaskawardList.length)
                for (var i = 0; i < message.OtherTaskawardList.length; ++i)
                    $root.AwardsItemData.encode(message.OtherTaskawardList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.Moneyaward != null && message.hasOwnProperty("Moneyaward"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Moneyaward);
            if (message.Experienceaward != null && message.hasOwnProperty("Experienceaward"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.Experienceaward);
            if (message.YinLiangaward != null && message.hasOwnProperty("YinLiangaward"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.YinLiangaward);
            if (message.LingLiaward != null && message.hasOwnProperty("LingLiaward"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.LingLiaward);
            if (message.BindYuanBaoaward != null && message.hasOwnProperty("BindYuanBaoaward"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.BindYuanBaoaward);
            if (message.ZhenQiaward != null && message.hasOwnProperty("ZhenQiaward"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ZhenQiaward);
            if (message.LieShaaward != null && message.hasOwnProperty("LieShaaward"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.LieShaaward);
            if (message.WuXingaward != null && message.hasOwnProperty("WuXingaward"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.WuXingaward);
            if (message.NeedYuanBao != null && message.hasOwnProperty("NeedYuanBao"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.NeedYuanBao);
            if (message.JunGongaward != null && message.hasOwnProperty("JunGongaward"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.JunGongaward);
            if (message.RongYuaward != null && message.hasOwnProperty("RongYuaward"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.RongYuaward);
            if (message.AddExperienceForDailyCircleTask != null && message.hasOwnProperty("AddExperienceForDailyCircleTask"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.AddExperienceForDailyCircleTask);
            if (message.AddMoJingForDailyCircleTask != null && message.hasOwnProperty("AddMoJingForDailyCircleTask"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.AddMoJingForDailyCircleTask);
            if (message.AddGoodsForDailyCircleTask != null && message.hasOwnProperty("AddGoodsForDailyCircleTask"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.AddGoodsForDailyCircleTask);
            if (message.MoJingaward != null && message.hasOwnProperty("MoJingaward"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.MoJingaward);
            if (message.XingHunaward != null && message.hasOwnProperty("XingHunaward"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.XingHunaward);
            if (message.FenMoAward != null && message.hasOwnProperty("FenMoAward"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.FenMoAward);
            if (message.ShengwangAward != null && message.hasOwnProperty("ShengwangAward"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.ShengwangAward);
            if (message.SAwardBHMoney != null && message.hasOwnProperty("SAwardBHMoney"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.SAwardBHMoney);
            return writer;
        };
    
        /**
         * Decodes a TaskAwardsData message from the specified reader or buffer.
         * @function decode
         * @memberof TaskAwardsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TaskAwardsData} TaskAwardsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TaskAwardsData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TaskAwardsData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.TaskawardList && message.TaskawardList.length))
                        message.TaskawardList = [];
                    message.TaskawardList.push($root.AwardsItemData.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.OtherTaskawardList && message.OtherTaskawardList.length))
                        message.OtherTaskawardList = [];
                    message.OtherTaskawardList.push($root.AwardsItemData.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.Moneyaward = reader.int32();
                    break;
                case 4:
                    message.Experienceaward = reader.int64();
                    break;
                case 5:
                    message.YinLiangaward = reader.int32();
                    break;
                case 6:
                    message.LingLiaward = reader.int32();
                    break;
                case 7:
                    message.BindYuanBaoaward = reader.int32();
                    break;
                case 8:
                    message.ZhenQiaward = reader.int32();
                    break;
                case 9:
                    message.LieShaaward = reader.int32();
                    break;
                case 10:
                    message.WuXingaward = reader.int32();
                    break;
                case 11:
                    message.NeedYuanBao = reader.int32();
                    break;
                case 12:
                    message.JunGongaward = reader.int32();
                    break;
                case 13:
                    message.RongYuaward = reader.int32();
                    break;
                case 14:
                    message.AddExperienceForDailyCircleTask = reader.int32();
                    break;
                case 15:
                    message.AddMoJingForDailyCircleTask = reader.int32();
                    break;
                case 16:
                    message.AddGoodsForDailyCircleTask = reader.string();
                    break;
                case 17:
                    message.MoJingaward = reader.int32();
                    break;
                case 18:
                    message.XingHunaward = reader.int32();
                    break;
                case 19:
                    message.FenMoAward = reader.int32();
                    break;
                case 20:
                    message.ShengwangAward = reader.int32();
                    break;
                case 21:
                    message.SAwardBHMoney = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TaskAwardsData;
    })();
    
    $root.TaskData = (function() {
    
        /**
         * Properties of a TaskData.
         * @exports ITaskData
         * @interface ITaskData
         * @property {number|null} [DbID] 数据库ID
         * @property {number|null} [DoingTaskID] 已经接受的任务列表
         * @property {number|null} [DoingTaskVal1] 已经接受的任务数值列表1
         * @property {number|null} [DoingTaskVal2] 已经接受的任务数值列表2
         * @property {number|null} [DoingTaskFocus] 已经接受的任务追踪列表
         * @property {number|Long|null} [AddDateTime] 任务添加的时间(单位秒)
         * @property {ITaskAwardsData|null} [TaskAwards] 任务奖励数据
         * @property {number|null} [DoneCount] 已经做过的次数
         * @property {number|null} [StarLevel] 任务星级信息
         */
    
        /**
         * Constructs a new TaskData.
         * @exports TaskData
         * @classdesc 任务数据
         * @implements ITaskData
         * @constructor
         * @param {ITaskData=} [properties] Properties to set
         */
        function TaskData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 数据库ID
         * @member {number} DbID
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DbID = 0;
    
        /**
         * 已经接受的任务列表
         * @member {number} DoingTaskID
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DoingTaskID = 0;
    
        /**
         * 已经接受的任务数值列表1
         * @member {number} DoingTaskVal1
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DoingTaskVal1 = 0;
    
        /**
         * 已经接受的任务数值列表2
         * @member {number} DoingTaskVal2
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DoingTaskVal2 = 0;
    
        /**
         * 已经接受的任务追踪列表
         * @member {number} DoingTaskFocus
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DoingTaskFocus = 0;
    
        /**
         * 任务添加的时间(单位秒)
         * @member {number|Long} AddDateTime
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.AddDateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 任务奖励数据
         * @member {ITaskAwardsData|null|undefined} TaskAwards
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.TaskAwards = null;
    
        /**
         * 已经做过的次数
         * @member {number} DoneCount
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.DoneCount = 0;
    
        /**
         * 任务星级信息
         * @member {number} StarLevel
         * @memberof TaskData
         * @instance
         */
        TaskData.prototype.StarLevel = 0;
    
        /**
         * Encodes the specified TaskData message. Does not implicitly {@link TaskData.verify|verify} messages.
         * @function encode
         * @memberof TaskData
         * @static
         * @param {ITaskData} message TaskData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TaskData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.DbID != null && message.hasOwnProperty("DbID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.DbID);
            if (message.DoingTaskID != null && message.hasOwnProperty("DoingTaskID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DoingTaskID);
            if (message.DoingTaskVal1 != null && message.hasOwnProperty("DoingTaskVal1"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.DoingTaskVal1);
            if (message.DoingTaskVal2 != null && message.hasOwnProperty("DoingTaskVal2"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.DoingTaskVal2);
            if (message.DoingTaskFocus != null && message.hasOwnProperty("DoingTaskFocus"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.DoingTaskFocus);
            if (message.AddDateTime != null && message.hasOwnProperty("AddDateTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.AddDateTime);
            if (message.TaskAwards != null && message.hasOwnProperty("TaskAwards"))
                $root.TaskAwardsData.encode(message.TaskAwards, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.DoneCount != null && message.hasOwnProperty("DoneCount"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.DoneCount);
            if (message.StarLevel != null && message.hasOwnProperty("StarLevel"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.StarLevel);
            return writer;
        };
    
        /**
         * Decodes a TaskData message from the specified reader or buffer.
         * @function decode
         * @memberof TaskData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TaskData} TaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TaskData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TaskData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.DbID = reader.int32();
                    break;
                case 2:
                    message.DoingTaskID = reader.int32();
                    break;
                case 3:
                    message.DoingTaskVal1 = reader.int32();
                    break;
                case 4:
                    message.DoingTaskVal2 = reader.int32();
                    break;
                case 5:
                    message.DoingTaskFocus = reader.int32();
                    break;
                case 6:
                    message.AddDateTime = reader.int64();
                    break;
                case 7:
                    message.TaskAwards = $root.TaskAwardsData.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.DoneCount = reader.int32();
                    break;
                case 9:
                    message.StarLevel = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TaskData;
    })();
    
    $root.SkillData = (function() {
    
        /**
         * Properties of a SkillData.
         * @exports ISkillData
         * @interface ISkillData
         * @property {number|null} [DbID] 数据库ID
         * @property {number|null} [SkillID] 技能类型ID
         * @property {number|null} [SkillLevel] 技能类型级别
         * @property {number|null} [UsedNum] 熟练度
         */
    
        /**
         * Constructs a new SkillData.
         * @exports SkillData
         * @classdesc 技能数据
         * @implements ISkillData
         * @constructor
         * @param {ISkillData=} [properties] Properties to set
         */
        function SkillData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 数据库ID
         * @member {number} DbID
         * @memberof SkillData
         * @instance
         */
        SkillData.prototype.DbID = 0;
    
        /**
         * 技能类型ID
         * @member {number} SkillID
         * @memberof SkillData
         * @instance
         */
        SkillData.prototype.SkillID = 0;
    
        /**
         * 技能类型级别
         * @member {number} SkillLevel
         * @memberof SkillData
         * @instance
         */
        SkillData.prototype.SkillLevel = 0;
    
        /**
         * 熟练度
         * @member {number} UsedNum
         * @memberof SkillData
         * @instance
         */
        SkillData.prototype.UsedNum = 0;
    
        /**
         * Encodes the specified SkillData message. Does not implicitly {@link SkillData.verify|verify} messages.
         * @function encode
         * @memberof SkillData
         * @static
         * @param {ISkillData} message SkillData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkillData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.DbID != null && message.hasOwnProperty("DbID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.DbID);
            if (message.SkillID != null && message.hasOwnProperty("SkillID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.SkillID);
            if (message.SkillLevel != null && message.hasOwnProperty("SkillLevel"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.SkillLevel);
            if (message.UsedNum != null && message.hasOwnProperty("UsedNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.UsedNum);
            return writer;
        };
    
        /**
         * Decodes a SkillData message from the specified reader or buffer.
         * @function decode
         * @memberof SkillData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SkillData} SkillData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkillData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SkillData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.DbID = reader.int32();
                    break;
                case 2:
                    message.SkillID = reader.int32();
                    break;
                case 3:
                    message.SkillLevel = reader.int32();
                    break;
                case 4:
                    message.UsedNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SkillData;
    })();
    
    $root.SkillDataList = (function() {
    
        /**
         * Properties of a SkillDataList.
         * @exports ISkillDataList
         * @interface ISkillDataList
         * @property {Array.<ISkillData>|null} [list] 技能列表
         */
    
        /**
         * Constructs a new SkillDataList.
         * @exports SkillDataList
         * @classdesc 技能列表数据
         * @implements ISkillDataList
         * @constructor
         * @param {ISkillDataList=} [properties] Properties to set
         */
        function SkillDataList(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 技能列表
         * @member {Array.<ISkillData>} list
         * @memberof SkillDataList
         * @instance
         */
        SkillDataList.prototype.list = $util.emptyArray;
    
        /**
         * Encodes the specified SkillDataList message. Does not implicitly {@link SkillDataList.verify|verify} messages.
         * @function encode
         * @memberof SkillDataList
         * @static
         * @param {ISkillDataList} message SkillDataList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkillDataList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.SkillData.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };
    
        /**
         * Decodes a SkillDataList message from the specified reader or buffer.
         * @function decode
         * @memberof SkillDataList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SkillDataList} SkillDataList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkillDataList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SkillDataList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.SkillData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SkillDataList;
    })();
    
    $root.SCSkillLevelUp = (function() {
    
        /**
         * Properties of a SCSkillLevelUp.
         * @exports ISCSkillLevelUp
         * @interface ISCSkillLevelUp
         * @property {number|null} [State] 升级结果
         * @property {number|null} [RoleID] 角色ID
         * @property {number|null} [SkillID] 技能DBID
         * @property {number|null} [SkillLevel] 技能等级
         * @property {number|null} [SkillUsedNum] 熟练度
         */
    
        /**
         * Constructs a new SCSkillLevelUp.
         * @exports SCSkillLevelUp
         * @classdesc 技能升级数据
         * @implements ISCSkillLevelUp
         * @constructor
         * @param {ISCSkillLevelUp=} [properties] Properties to set
         */
        function SCSkillLevelUp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 升级结果
         * @member {number} State
         * @memberof SCSkillLevelUp
         * @instance
         */
        SCSkillLevelUp.prototype.State = 0;
    
        /**
         * 角色ID
         * @member {number} RoleID
         * @memberof SCSkillLevelUp
         * @instance
         */
        SCSkillLevelUp.prototype.RoleID = 0;
    
        /**
         * 技能DBID
         * @member {number} SkillID
         * @memberof SCSkillLevelUp
         * @instance
         */
        SCSkillLevelUp.prototype.SkillID = 0;
    
        /**
         * 技能等级
         * @member {number} SkillLevel
         * @memberof SCSkillLevelUp
         * @instance
         */
        SCSkillLevelUp.prototype.SkillLevel = 0;
    
        /**
         * 熟练度
         * @member {number} SkillUsedNum
         * @memberof SCSkillLevelUp
         * @instance
         */
        SCSkillLevelUp.prototype.SkillUsedNum = 0;
    
        /**
         * Encodes the specified SCSkillLevelUp message. Does not implicitly {@link SCSkillLevelUp.verify|verify} messages.
         * @function encode
         * @memberof SCSkillLevelUp
         * @static
         * @param {ISCSkillLevelUp} message SCSkillLevelUp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCSkillLevelUp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.State);
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RoleID);
            if (message.SkillID != null && message.hasOwnProperty("SkillID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.SkillID);
            if (message.SkillLevel != null && message.hasOwnProperty("SkillLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.SkillLevel);
            if (message.SkillUsedNum != null && message.hasOwnProperty("SkillUsedNum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.SkillUsedNum);
            return writer;
        };
    
        /**
         * Decodes a SCSkillLevelUp message from the specified reader or buffer.
         * @function decode
         * @memberof SCSkillLevelUp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCSkillLevelUp} SCSkillLevelUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCSkillLevelUp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCSkillLevelUp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.State = reader.int32();
                    break;
                case 2:
                    message.RoleID = reader.int32();
                    break;
                case 3:
                    message.SkillID = reader.int32();
                    break;
                case 4:
                    message.SkillLevel = reader.int32();
                    break;
                case 5:
                    message.SkillUsedNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCSkillLevelUp;
    })();
    
    $root.NPCTaskState = (function() {
    
        /**
         * Properties of a NPCTaskState.
         * @exports INPCTaskState
         * @interface INPCTaskState
         * @property {number|null} [NPCID] NPC的ID
         * @property {number|null} [TaskState] 任务状态
         */
    
        /**
         * Constructs a new NPCTaskState.
         * @exports NPCTaskState
         * @classdesc NPC的任务状态
         * @implements INPCTaskState
         * @constructor
         * @param {INPCTaskState=} [properties] Properties to set
         */
        function NPCTaskState(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * NPC的ID
         * @member {number} NPCID
         * @memberof NPCTaskState
         * @instance
         */
        NPCTaskState.prototype.NPCID = 0;
    
        /**
         * 任务状态
         * @member {number} TaskState
         * @memberof NPCTaskState
         * @instance
         */
        NPCTaskState.prototype.TaskState = 0;
    
        /**
         * Encodes the specified NPCTaskState message. Does not implicitly {@link NPCTaskState.verify|verify} messages.
         * @function encode
         * @memberof NPCTaskState
         * @static
         * @param {INPCTaskState} message NPCTaskState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NPCTaskState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.NPCID != null && message.hasOwnProperty("NPCID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.NPCID);
            if (message.TaskState != null && message.hasOwnProperty("TaskState"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TaskState);
            return writer;
        };
    
        /**
         * Decodes a NPCTaskState message from the specified reader or buffer.
         * @function decode
         * @memberof NPCTaskState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NPCTaskState} NPCTaskState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NPCTaskState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NPCTaskState();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.NPCID = reader.int32();
                    break;
                case 2:
                    message.TaskState = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return NPCTaskState;
    })();
    
    $root.BufferData = (function() {
    
        /**
         * Properties of a BufferData.
         * @exports IBufferData
         * @interface IBufferData
         * @property {number|null} [BufferID] Buffer的ID
         * @property {number|Long|null} [StartTime] Buffer开始计时的时间
         * @property {number|null} [BufferSecs] Buffer计时秒数长度
         * @property {number|Long|null} [BufferVal] Buffer的动态值
         * @property {number|null} [BufferType] Buffer的类型（0:DBBuffer、1:临时Buffer）
         */
    
        /**
         * Constructs a new BufferData.
         * @exports BufferData
         * @classdesc Buffer数据
         * @implements IBufferData
         * @constructor
         * @param {IBufferData=} [properties] Properties to set
         */
        function BufferData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Buffer的ID
         * @member {number} BufferID
         * @memberof BufferData
         * @instance
         */
        BufferData.prototype.BufferID = 0;
    
        /**
         * Buffer开始计时的时间
         * @member {number|Long} StartTime
         * @memberof BufferData
         * @instance
         */
        BufferData.prototype.StartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer计时秒数长度
         * @member {number} BufferSecs
         * @memberof BufferData
         * @instance
         */
        BufferData.prototype.BufferSecs = 0;
    
        /**
         * Buffer的动态值
         * @member {number|Long} BufferVal
         * @memberof BufferData
         * @instance
         */
        BufferData.prototype.BufferVal = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer的类型（0:DBBuffer、1:临时Buffer）
         * @member {number} BufferType
         * @memberof BufferData
         * @instance
         */
        BufferData.prototype.BufferType = 0;
    
        /**
         * Encodes the specified BufferData message. Does not implicitly {@link BufferData.verify|verify} messages.
         * @function encode
         * @memberof BufferData
         * @static
         * @param {IBufferData} message BufferData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BufferData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BufferID != null && message.hasOwnProperty("BufferID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.BufferID);
            if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.StartTime);
            if (message.BufferSecs != null && message.hasOwnProperty("BufferSecs"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BufferSecs);
            if (message.BufferVal != null && message.hasOwnProperty("BufferVal"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.BufferVal);
            if (message.BufferType != null && message.hasOwnProperty("BufferType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.BufferType);
            return writer;
        };
    
        /**
         * Decodes a BufferData message from the specified reader or buffer.
         * @function decode
         * @memberof BufferData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BufferData} BufferData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BufferData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BufferData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BufferID = reader.int32();
                    break;
                case 2:
                    message.StartTime = reader.int64();
                    break;
                case 3:
                    message.BufferSecs = reader.int32();
                    break;
                case 4:
                    message.BufferVal = reader.int64();
                    break;
                case 5:
                    message.BufferType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BufferData;
    })();
    
    $root.OtherBufferData = (function() {
    
        /**
         * Properties of an OtherBufferData.
         * @exports IOtherBufferData
         * @interface IOtherBufferData
         * @property {number|null} [BufferID] Buffer的ID
         * @property {number|Long|null} [StartTime] Buffer开始计时的时间
         * @property {number|null} [BufferSecs] Buffer计时秒数长度
         * @property {number|Long|null} [BufferVal] Buffer的动态值
         * @property {number|null} [BufferType] Buffer的类型(0:DBBuffer 1:临时Buffer)
         * @property {number|null} [RoleID] buff所在对象的RoleID
         */
    
        /**
         * Constructs a new OtherBufferData.
         * @exports OtherBufferData
         * @classdesc Buffer数据
         * @implements IOtherBufferData
         * @constructor
         * @param {IOtherBufferData=} [properties] Properties to set
         */
        function OtherBufferData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Buffer的ID
         * @member {number} BufferID
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.BufferID = 0;
    
        /**
         * Buffer开始计时的时间
         * @member {number|Long} StartTime
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.StartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer计时秒数长度
         * @member {number} BufferSecs
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.BufferSecs = 0;
    
        /**
         * Buffer的动态值
         * @member {number|Long} BufferVal
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.BufferVal = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer的类型(0:DBBuffer 1:临时Buffer)
         * @member {number} BufferType
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.BufferType = 0;
    
        /**
         * buff所在对象的RoleID
         * @member {number} RoleID
         * @memberof OtherBufferData
         * @instance
         */
        OtherBufferData.prototype.RoleID = 0;
    
        /**
         * Encodes the specified OtherBufferData message. Does not implicitly {@link OtherBufferData.verify|verify} messages.
         * @function encode
         * @memberof OtherBufferData
         * @static
         * @param {IOtherBufferData} message OtherBufferData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OtherBufferData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BufferID != null && message.hasOwnProperty("BufferID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.BufferID);
            if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.StartTime);
            if (message.BufferSecs != null && message.hasOwnProperty("BufferSecs"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BufferSecs);
            if (message.BufferVal != null && message.hasOwnProperty("BufferVal"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.BufferVal);
            if (message.BufferType != null && message.hasOwnProperty("BufferType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.BufferType);
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.RoleID);
            return writer;
        };
    
        /**
         * Decodes an OtherBufferData message from the specified reader or buffer.
         * @function decode
         * @memberof OtherBufferData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {OtherBufferData} OtherBufferData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OtherBufferData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OtherBufferData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BufferID = reader.int32();
                    break;
                case 2:
                    message.StartTime = reader.int64();
                    break;
                case 3:
                    message.BufferSecs = reader.int32();
                    break;
                case 4:
                    message.BufferVal = reader.int64();
                    break;
                case 5:
                    message.BufferType = reader.int32();
                    break;
                case 6:
                    message.RoleID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return OtherBufferData;
    })();
    
    $root.BufferDataMini = (function() {
    
        /**
         * Properties of a BufferDataMini.
         * @exports IBufferDataMini
         * @interface IBufferDataMini
         * @property {number|null} [BufferID] Buffer的ID
         * @property {number|Long|null} [StartTime] Buffer开始计时的时间
         * @property {number|null} [BufferSecs] Buffer计时秒数长度
         * @property {number|Long|null} [BufferVal] Buffer的动态值
         * @property {number|null} [BufferType] Buffer的类型(0:DBBuffer 1:临时Buffer)
         */
    
        /**
         * Constructs a new BufferDataMini.
         * @exports BufferDataMini
         * @classdesc buffer mini 数据
         * @implements IBufferDataMini
         * @constructor
         * @param {IBufferDataMini=} [properties] Properties to set
         */
        function BufferDataMini(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Buffer的ID
         * @member {number} BufferID
         * @memberof BufferDataMini
         * @instance
         */
        BufferDataMini.prototype.BufferID = 0;
    
        /**
         * Buffer开始计时的时间
         * @member {number|Long} StartTime
         * @memberof BufferDataMini
         * @instance
         */
        BufferDataMini.prototype.StartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer计时秒数长度
         * @member {number} BufferSecs
         * @memberof BufferDataMini
         * @instance
         */
        BufferDataMini.prototype.BufferSecs = 0;
    
        /**
         * Buffer的动态值
         * @member {number|Long} BufferVal
         * @memberof BufferDataMini
         * @instance
         */
        BufferDataMini.prototype.BufferVal = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Buffer的类型(0:DBBuffer 1:临时Buffer)
         * @member {number} BufferType
         * @memberof BufferDataMini
         * @instance
         */
        BufferDataMini.prototype.BufferType = 0;
    
        /**
         * Encodes the specified BufferDataMini message. Does not implicitly {@link BufferDataMini.verify|verify} messages.
         * @function encode
         * @memberof BufferDataMini
         * @static
         * @param {IBufferDataMini} message BufferDataMini message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BufferDataMini.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BufferID != null && message.hasOwnProperty("BufferID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.BufferID);
            if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.StartTime);
            if (message.BufferSecs != null && message.hasOwnProperty("BufferSecs"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BufferSecs);
            if (message.BufferVal != null && message.hasOwnProperty("BufferVal"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.BufferVal);
            if (message.BufferType != null && message.hasOwnProperty("BufferType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.BufferType);
            return writer;
        };
    
        /**
         * Decodes a BufferDataMini message from the specified reader or buffer.
         * @function decode
         * @memberof BufferDataMini
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BufferDataMini} BufferDataMini
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BufferDataMini.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BufferDataMini();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BufferID = reader.int32();
                    break;
                case 2:
                    message.StartTime = reader.int64();
                    break;
                case 3:
                    message.BufferSecs = reader.int32();
                    break;
                case 4:
                    message.BufferVal = reader.int64();
                    break;
                case 5:
                    message.BufferType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BufferDataMini;
    })();
    
    $root.DailyTaskData = (function() {
    
        /**
         * Properties of a DailyTaskData.
         * @exports IDailyTaskData
         * @interface IDailyTaskData
         * @property {number|null} [HuanID] 环的ID
         * @property {string|null} [RecTime] 跑环的日子
         * @property {number|null} [RecNum] 跑环的次数
         * @property {number|null} [TaskClass] 跑环的任务类型
         * @property {number|null} [ExtDayID] 额外的次数天ID
         * @property {number|null} [ExtNum] 额外的次数
         */
    
        /**
         * Constructs a new DailyTaskData.
         * @exports DailyTaskData
         * @classdesc 公告消息数据
         * @implements IDailyTaskData
         * @constructor
         * @param {IDailyTaskData=} [properties] Properties to set
         */
        function DailyTaskData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 环的ID
         * @member {number} HuanID
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.HuanID = 0;
    
        /**
         * 跑环的日子
         * @member {string} RecTime
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.RecTime = "";
    
        /**
         * 跑环的次数
         * @member {number} RecNum
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.RecNum = 0;
    
        /**
         * 跑环的任务类型
         * @member {number} TaskClass
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.TaskClass = 0;
    
        /**
         * 额外的次数天ID
         * @member {number} ExtDayID
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.ExtDayID = 0;
    
        /**
         * 额外的次数
         * @member {number} ExtNum
         * @memberof DailyTaskData
         * @instance
         */
        DailyTaskData.prototype.ExtNum = 0;
    
        /**
         * Encodes the specified DailyTaskData message. Does not implicitly {@link DailyTaskData.verify|verify} messages.
         * @function encode
         * @memberof DailyTaskData
         * @static
         * @param {IDailyTaskData} message DailyTaskData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DailyTaskData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.HuanID != null && message.hasOwnProperty("HuanID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.HuanID);
            if (message.RecTime != null && message.hasOwnProperty("RecTime"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.RecTime);
            if (message.RecNum != null && message.hasOwnProperty("RecNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.RecNum);
            if (message.TaskClass != null && message.hasOwnProperty("TaskClass"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.TaskClass);
            if (message.ExtDayID != null && message.hasOwnProperty("ExtDayID"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ExtDayID);
            if (message.ExtNum != null && message.hasOwnProperty("ExtNum"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ExtNum);
            return writer;
        };
    
        /**
         * Decodes a DailyTaskData message from the specified reader or buffer.
         * @function decode
         * @memberof DailyTaskData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DailyTaskData} DailyTaskData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DailyTaskData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DailyTaskData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.HuanID = reader.int32();
                    break;
                case 2:
                    message.RecTime = reader.string();
                    break;
                case 3:
                    message.RecNum = reader.int32();
                    break;
                case 4:
                    message.TaskClass = reader.int32();
                    break;
                case 5:
                    message.ExtDayID = reader.int32();
                    break;
                case 6:
                    message.ExtNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return DailyTaskData;
    })();
    
    $root.DailyJingMaiData = (function() {
    
        /**
         * Properties of a DailyJingMaiData.
         * @exports IDailyJingMaiData
         * @interface IDailyJingMaiData
         * @property {string|null} [JmTime] 冲穴的日子
         * @property {number|null} [JmNum] 冲穴的次数
         */
    
        /**
         * Constructs a new DailyJingMaiData.
         * @exports DailyJingMaiData
         * @classdesc 每日的已经冲穴次数数据
         * @implements IDailyJingMaiData
         * @constructor
         * @param {IDailyJingMaiData=} [properties] Properties to set
         */
        function DailyJingMaiData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 冲穴的日子
         * @member {string} JmTime
         * @memberof DailyJingMaiData
         * @instance
         */
        DailyJingMaiData.prototype.JmTime = "";
    
        /**
         * 冲穴的次数
         * @member {number} JmNum
         * @memberof DailyJingMaiData
         * @instance
         */
        DailyJingMaiData.prototype.JmNum = 0;
    
        /**
         * Encodes the specified DailyJingMaiData message. Does not implicitly {@link DailyJingMaiData.verify|verify} messages.
         * @function encode
         * @memberof DailyJingMaiData
         * @static
         * @param {IDailyJingMaiData} message DailyJingMaiData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DailyJingMaiData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.JmTime != null && message.hasOwnProperty("JmTime"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.JmTime);
            if (message.JmNum != null && message.hasOwnProperty("JmNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.JmNum);
            return writer;
        };
    
        /**
         * Decodes a DailyJingMaiData message from the specified reader or buffer.
         * @function decode
         * @memberof DailyJingMaiData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DailyJingMaiData} DailyJingMaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DailyJingMaiData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DailyJingMaiData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.JmTime = reader.string();
                    break;
                case 2:
                    message.JmNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return DailyJingMaiData;
    })();
    
    $root.PortableBagData = (function() {
    
        /**
         * Properties of a PortableBagData.
         * @exports IPortableBagData
         * @interface IPortableBagData
         * @property {number|null} [ExtGridNum] 用户扩展的格子个数
         * @property {number|null} [GoodsUsedGridNum] 当前物品使用的格子的个数（不存数据库，每次加载后计算）
         */
    
        /**
         * Constructs a new PortableBagData.
         * @exports PortableBagData
         * @classdesc 随身仓库数据
         * @implements IPortableBagData
         * @constructor
         * @param {IPortableBagData=} [properties] Properties to set
         */
        function PortableBagData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 用户扩展的格子个数
         * @member {number} ExtGridNum
         * @memberof PortableBagData
         * @instance
         */
        PortableBagData.prototype.ExtGridNum = 0;
    
        /**
         * 当前物品使用的格子的个数（不存数据库，每次加载后计算）
         * @member {number} GoodsUsedGridNum
         * @memberof PortableBagData
         * @instance
         */
        PortableBagData.prototype.GoodsUsedGridNum = 0;
    
        /**
         * Encodes the specified PortableBagData message. Does not implicitly {@link PortableBagData.verify|verify} messages.
         * @function encode
         * @memberof PortableBagData
         * @static
         * @param {IPortableBagData} message PortableBagData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PortableBagData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ExtGridNum != null && message.hasOwnProperty("ExtGridNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ExtGridNum);
            if (message.GoodsUsedGridNum != null && message.hasOwnProperty("GoodsUsedGridNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.GoodsUsedGridNum);
            return writer;
        };
    
        /**
         * Decodes a PortableBagData message from the specified reader or buffer.
         * @function decode
         * @memberof PortableBagData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PortableBagData} PortableBagData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PortableBagData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PortableBagData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ExtGridNum = reader.int32();
                    break;
                case 2:
                    message.GoodsUsedGridNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return PortableBagData;
    })();
    
    $root.FuBenData = (function() {
    
        /**
         * Properties of a FuBenData.
         * @exports IFuBenData
         * @interface IFuBenData
         * @property {number|null} [FuBenID] 副本的ID
         * @property {number|null} [DayID] 日期ID
         * @property {number|null} [EnterNum] 当日进入的次数
         * @property {number|null} [QuickPassTimer] 最快通关时间
         * @property {number|null} [FinishNum] 今日完成次数
         */
    
        /**
         * Constructs a new FuBenData.
         * @exports FuBenData
         * @classdesc 副本数据
         * @implements IFuBenData
         * @constructor
         * @param {IFuBenData=} [properties] Properties to set
         */
        function FuBenData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 副本的ID
         * @member {number} FuBenID
         * @memberof FuBenData
         * @instance
         */
        FuBenData.prototype.FuBenID = 0;
    
        /**
         * 日期ID
         * @member {number} DayID
         * @memberof FuBenData
         * @instance
         */
        FuBenData.prototype.DayID = 0;
    
        /**
         * 当日进入的次数
         * @member {number} EnterNum
         * @memberof FuBenData
         * @instance
         */
        FuBenData.prototype.EnterNum = 0;
    
        /**
         * 最快通关时间
         * @member {number} QuickPassTimer
         * @memberof FuBenData
         * @instance
         */
        FuBenData.prototype.QuickPassTimer = 0;
    
        /**
         * 今日完成次数
         * @member {number} FinishNum
         * @memberof FuBenData
         * @instance
         */
        FuBenData.prototype.FinishNum = 0;
    
        /**
         * Encodes the specified FuBenData message. Does not implicitly {@link FuBenData.verify|verify} messages.
         * @function encode
         * @memberof FuBenData
         * @static
         * @param {IFuBenData} message FuBenData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FuBenData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.FuBenID != null && message.hasOwnProperty("FuBenID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.FuBenID);
            if (message.DayID != null && message.hasOwnProperty("DayID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DayID);
            if (message.EnterNum != null && message.hasOwnProperty("EnterNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.EnterNum);
            if (message.QuickPassTimer != null && message.hasOwnProperty("QuickPassTimer"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.QuickPassTimer);
            if (message.FinishNum != null && message.hasOwnProperty("FinishNum"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.FinishNum);
            return writer;
        };
    
        /**
         * Decodes a FuBenData message from the specified reader or buffer.
         * @function decode
         * @memberof FuBenData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FuBenData} FuBenData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FuBenData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FuBenData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.FuBenID = reader.int32();
                    break;
                case 2:
                    message.DayID = reader.int32();
                    break;
                case 3:
                    message.EnterNum = reader.int32();
                    break;
                case 4:
                    message.QuickPassTimer = reader.int32();
                    break;
                case 5:
                    message.FinishNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return FuBenData;
    })();
    
    $root.YaBiaoData = (function() {
    
        /**
         * Properties of a YaBiaoData.
         * @exports IYaBiaoData
         * @interface IYaBiaoData
         * @property {number|null} [YaBiaoID] 押镖ID
         * @property {number|Long|null} [StartTime] 开始时间
         * @property {number|null} [State] 押镖状态（0:正常, 1:失败）
         * @property {number|null} [LineID] 接镖时的线路ID
         * @property {number|null} [TouBao] 是否做了投保, 0: 没做 1:做了
         * @property {number|null} [YaBiaoDayID] 押镖的日ID
         * @property {number|null} [YaBiaoNum] 每日押镖的次数
         * @property {number|null} [TakeGoods] 是否取到了货物
         */
    
        /**
         * Constructs a new YaBiaoData.
         * @exports YaBiaoData
         * @classdesc 押镖数据
         * @implements IYaBiaoData
         * @constructor
         * @param {IYaBiaoData=} [properties] Properties to set
         */
        function YaBiaoData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 押镖ID
         * @member {number} YaBiaoID
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.YaBiaoID = 0;
    
        /**
         * 开始时间
         * @member {number|Long} StartTime
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.StartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 押镖状态（0:正常, 1:失败）
         * @member {number} State
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.State = 0;
    
        /**
         * 接镖时的线路ID
         * @member {number} LineID
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.LineID = 0;
    
        /**
         * 是否做了投保, 0: 没做 1:做了
         * @member {number} TouBao
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.TouBao = 0;
    
        /**
         * 押镖的日ID
         * @member {number} YaBiaoDayID
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.YaBiaoDayID = 0;
    
        /**
         * 每日押镖的次数
         * @member {number} YaBiaoNum
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.YaBiaoNum = 0;
    
        /**
         * 是否取到了货物
         * @member {number} TakeGoods
         * @memberof YaBiaoData
         * @instance
         */
        YaBiaoData.prototype.TakeGoods = 0;
    
        /**
         * Encodes the specified YaBiaoData message. Does not implicitly {@link YaBiaoData.verify|verify} messages.
         * @function encode
         * @memberof YaBiaoData
         * @static
         * @param {IYaBiaoData} message YaBiaoData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        YaBiaoData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.YaBiaoID != null && message.hasOwnProperty("YaBiaoID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.YaBiaoID);
            if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.StartTime);
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.State);
            if (message.LineID != null && message.hasOwnProperty("LineID"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.LineID);
            if (message.TouBao != null && message.hasOwnProperty("TouBao"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.TouBao);
            if (message.YaBiaoDayID != null && message.hasOwnProperty("YaBiaoDayID"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.YaBiaoDayID);
            if (message.YaBiaoNum != null && message.hasOwnProperty("YaBiaoNum"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.YaBiaoNum);
            if (message.TakeGoods != null && message.hasOwnProperty("TakeGoods"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.TakeGoods);
            return writer;
        };
    
        /**
         * Decodes a YaBiaoData message from the specified reader or buffer.
         * @function decode
         * @memberof YaBiaoData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {YaBiaoData} YaBiaoData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        YaBiaoData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.YaBiaoData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.YaBiaoID = reader.int32();
                    break;
                case 2:
                    message.StartTime = reader.int64();
                    break;
                case 3:
                    message.State = reader.int32();
                    break;
                case 4:
                    message.LineID = reader.int32();
                    break;
                case 5:
                    message.TouBao = reader.int32();
                    break;
                case 6:
                    message.YaBiaoDayID = reader.int32();
                    break;
                case 7:
                    message.YaBiaoNum = reader.int32();
                    break;
                case 8:
                    message.TakeGoods = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return YaBiaoData;
    })();
    
    $root.BangHuiLingDiItemData = (function() {
    
        /**
         * Properties of a BangHuiLingDiItemData.
         * @exports IBangHuiLingDiItemData
         * @interface IBangHuiLingDiItemData
         * @property {number|null} [LingDiID] 领地ID
         * @property {number|null} [BHID] 帮派的ID
         * @property {number|null} [ZoneID] 区的ID
         * @property {string|null} [BHName] 帮派的名称
         * @property {number|null} [LingDiTax] 领地税率
         * @property {string|null} [WarRequest] 帮会战争请求字段
         * @property {number|null} [AwardFetchDay] 领地每日奖励领取日
         */
    
        /**
         * Constructs a new BangHuiLingDiItemData.
         * @exports BangHuiLingDiItemData
         * @classdesc 领地占领数据（简单）
         * @implements IBangHuiLingDiItemData
         * @constructor
         * @param {IBangHuiLingDiItemData=} [properties] Properties to set
         */
        function BangHuiLingDiItemData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 领地ID
         * @member {number} LingDiID
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.LingDiID = 0;
    
        /**
         * 帮派的ID
         * @member {number} BHID
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.BHID = 0;
    
        /**
         * 区的ID
         * @member {number} ZoneID
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.ZoneID = 0;
    
        /**
         * 帮派的名称
         * @member {string} BHName
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.BHName = "";
    
        /**
         * 领地税率
         * @member {number} LingDiTax
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.LingDiTax = 0;
    
        /**
         * 帮会战争请求字段
         * @member {string} WarRequest
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.WarRequest = "";
    
        /**
         * 领地每日奖励领取日
         * @member {number} AwardFetchDay
         * @memberof BangHuiLingDiItemData
         * @instance
         */
        BangHuiLingDiItemData.prototype.AwardFetchDay = 0;
    
        /**
         * Encodes the specified BangHuiLingDiItemData message. Does not implicitly {@link BangHuiLingDiItemData.verify|verify} messages.
         * @function encode
         * @memberof BangHuiLingDiItemData
         * @static
         * @param {IBangHuiLingDiItemData} message BangHuiLingDiItemData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BangHuiLingDiItemData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.LingDiID != null && message.hasOwnProperty("LingDiID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.LingDiID);
            if (message.BHID != null && message.hasOwnProperty("BHID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.BHID);
            if (message.ZoneID != null && message.hasOwnProperty("ZoneID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.ZoneID);
            if (message.BHName != null && message.hasOwnProperty("BHName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.BHName);
            if (message.LingDiTax != null && message.hasOwnProperty("LingDiTax"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.LingDiTax);
            if (message.WarRequest != null && message.hasOwnProperty("WarRequest"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.WarRequest);
            if (message.AwardFetchDay != null && message.hasOwnProperty("AwardFetchDay"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.AwardFetchDay);
            return writer;
        };
    
        /**
         * Decodes a BangHuiLingDiItemData message from the specified reader or buffer.
         * @function decode
         * @memberof BangHuiLingDiItemData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BangHuiLingDiItemData} BangHuiLingDiItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BangHuiLingDiItemData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BangHuiLingDiItemData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.LingDiID = reader.int32();
                    break;
                case 2:
                    message.BHID = reader.int32();
                    break;
                case 3:
                    message.ZoneID = reader.int32();
                    break;
                case 4:
                    message.BHName = reader.string();
                    break;
                case 5:
                    message.LingDiTax = reader.int32();
                    break;
                case 6:
                    message.WarRequest = reader.string();
                    break;
                case 7:
                    message.AwardFetchDay = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BangHuiLingDiItemData;
    })();
    
    $root.TalentEffectInfo = (function() {
    
        /**
         * Properties of a TalentEffectInfo.
         * @exports ITalentEffectInfo
         * @interface ITalentEffectInfo
         * @property {number|null} [EffectType] 效果类型
         * @property {number|null} [EffectID] 效果id
         * @property {number|null} [EffectValue] 效果值
         */
    
        /**
         * Constructs a new TalentEffectInfo.
         * @exports TalentEffectInfo
         * @classdesc 效果数据
         * @implements ITalentEffectInfo
         * @constructor
         * @param {ITalentEffectInfo=} [properties] Properties to set
         */
        function TalentEffectInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 效果类型
         * @member {number} EffectType
         * @memberof TalentEffectInfo
         * @instance
         */
        TalentEffectInfo.prototype.EffectType = 0;
    
        /**
         * 效果id
         * @member {number} EffectID
         * @memberof TalentEffectInfo
         * @instance
         */
        TalentEffectInfo.prototype.EffectID = 0;
    
        /**
         * 效果值
         * @member {number} EffectValue
         * @memberof TalentEffectInfo
         * @instance
         */
        TalentEffectInfo.prototype.EffectValue = 0;
    
        /**
         * Encodes the specified TalentEffectInfo message. Does not implicitly {@link TalentEffectInfo.verify|verify} messages.
         * @function encode
         * @memberof TalentEffectInfo
         * @static
         * @param {ITalentEffectInfo} message TalentEffectInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TalentEffectInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.EffectType != null && message.hasOwnProperty("EffectType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.EffectType);
            if (message.EffectID != null && message.hasOwnProperty("EffectID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.EffectID);
            if (message.EffectValue != null && message.hasOwnProperty("EffectValue"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.EffectValue);
            return writer;
        };
    
        /**
         * Decodes a TalentEffectInfo message from the specified reader or buffer.
         * @function decode
         * @memberof TalentEffectInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TalentEffectInfo} TalentEffectInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TalentEffectInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TalentEffectInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.EffectType = reader.int32();
                    break;
                case 2:
                    message.EffectID = reader.int32();
                    break;
                case 3:
                    message.EffectValue = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TalentEffectInfo;
    })();
    
    $root.TalentEffectItem = (function() {
    
        /**
         * Properties of a TalentEffectItem.
         * @exports ITalentEffectItem
         * @interface ITalentEffectItem
         * @property {number|null} [ID] 效果id
         * @property {number|null} [Level] 效果等级
         * @property {number|null} [TalentType] 天赋类型
         * @property {Array.<ITalentEffectInfo>|null} [ItemEffectList] 效果
         */
    
        /**
         * Constructs a new TalentEffectItem.
         * @exports TalentEffectItem
         * @classdesc 效果项
         * @implements ITalentEffectItem
         * @constructor
         * @param {ITalentEffectItem=} [properties] Properties to set
         */
        function TalentEffectItem(properties) {
            this.ItemEffectList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 效果id
         * @member {number} ID
         * @memberof TalentEffectItem
         * @instance
         */
        TalentEffectItem.prototype.ID = 0;
    
        /**
         * 效果等级
         * @member {number} Level
         * @memberof TalentEffectItem
         * @instance
         */
        TalentEffectItem.prototype.Level = 0;
    
        /**
         * 天赋类型
         * @member {number} TalentType
         * @memberof TalentEffectItem
         * @instance
         */
        TalentEffectItem.prototype.TalentType = 0;
    
        /**
         * 效果
         * @member {Array.<ITalentEffectInfo>} ItemEffectList
         * @memberof TalentEffectItem
         * @instance
         */
        TalentEffectItem.prototype.ItemEffectList = $util.emptyArray;
    
        /**
         * Encodes the specified TalentEffectItem message. Does not implicitly {@link TalentEffectItem.verify|verify} messages.
         * @function encode
         * @memberof TalentEffectItem
         * @static
         * @param {ITalentEffectItem} message TalentEffectItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TalentEffectItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && message.hasOwnProperty("ID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ID);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Level);
            if (message.TalentType != null && message.hasOwnProperty("TalentType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.TalentType);
            if (message.ItemEffectList != null && message.ItemEffectList.length)
                for (var i = 0; i < message.ItemEffectList.length; ++i)
                    $root.TalentEffectInfo.encode(message.ItemEffectList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };
    
        /**
         * Decodes a TalentEffectItem message from the specified reader or buffer.
         * @function decode
         * @memberof TalentEffectItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TalentEffectItem} TalentEffectItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TalentEffectItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TalentEffectItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ID = reader.int32();
                    break;
                case 2:
                    message.Level = reader.int32();
                    break;
                case 3:
                    message.TalentType = reader.int32();
                    break;
                case 4:
                    if (!(message.ItemEffectList && message.ItemEffectList.length))
                        message.ItemEffectList = [];
                    message.ItemEffectList.push($root.TalentEffectInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TalentEffectItem;
    })();
    
    $root.TalentData = (function() {
    
        /**
         * Properties of a TalentData.
         * @exports ITalentData
         * @interface ITalentData
         * @property {boolean|null} [IsOpen] 是否开放
         * @property {number|null} [TotalCount] 已获取天赋点数
         * @property {number|Long|null} [Exp] 当前天赋点注入经验
         * @property {Object.<string,number>|null} [CountList] 效果分类加点数量
         * @property {Array.<ITalentEffectItem>|null} [EffectList] 效果列表（天赋类型，效果列表）
         * @property {Object.<string,number>|null} [SkillOneValue] 单个技能（技能id，技能等级）
         * @property {number|null} [SkillAllValue] 全部技能
         * @property {number|null} [State] 状态
         * @property {number|null} [Occupation] 职业
         */
    
        /**
         * Constructs a new TalentData.
         * @exports TalentData
         * @classdesc 天赋数据
         * @implements ITalentData
         * @constructor
         * @param {ITalentData=} [properties] Properties to set
         */
        function TalentData(properties) {
            this.CountList = {};
            this.EffectList = [];
            this.SkillOneValue = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 是否开放
         * @member {boolean} IsOpen
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.IsOpen = false;
    
        /**
         * 已获取天赋点数
         * @member {number} TotalCount
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.TotalCount = 0;
    
        /**
         * 当前天赋点注入经验
         * @member {number|Long} Exp
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.Exp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 效果分类加点数量
         * @member {Object.<string,number>} CountList
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.CountList = $util.emptyObject;
    
        /**
         * 效果列表（天赋类型，效果列表）
         * @member {Array.<ITalentEffectItem>} EffectList
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.EffectList = $util.emptyArray;
    
        /**
         * 单个技能（技能id，技能等级）
         * @member {Object.<string,number>} SkillOneValue
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.SkillOneValue = $util.emptyObject;
    
        /**
         * 全部技能
         * @member {number} SkillAllValue
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.SkillAllValue = 0;
    
        /**
         * 状态
         * @member {number} State
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.State = 0;
    
        /**
         * 职业
         * @member {number} Occupation
         * @memberof TalentData
         * @instance
         */
        TalentData.prototype.Occupation = 0;
    
        /**
         * Encodes the specified TalentData message. Does not implicitly {@link TalentData.verify|verify} messages.
         * @function encode
         * @memberof TalentData
         * @static
         * @param {ITalentData} message TalentData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TalentData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.IsOpen != null && message.hasOwnProperty("IsOpen"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.IsOpen);
            if (message.TotalCount != null && message.hasOwnProperty("TotalCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TotalCount);
            if (message.Exp != null && message.hasOwnProperty("Exp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.Exp);
            if (message.CountList != null && message.hasOwnProperty("CountList"))
                for (var keys = Object.keys(message.CountList), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.CountList[keys[i]]).ldelim();
            if (message.EffectList != null && message.EffectList.length)
                for (var i = 0; i < message.EffectList.length; ++i)
                    $root.TalentEffectItem.encode(message.EffectList[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.SkillOneValue != null && message.hasOwnProperty("SkillOneValue"))
                for (var keys = Object.keys(message.SkillOneValue), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.SkillOneValue[keys[i]]).ldelim();
            if (message.SkillAllValue != null && message.hasOwnProperty("SkillAllValue"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.SkillAllValue);
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.State);
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.Occupation);
            return writer;
        };
    
        /**
         * Decodes a TalentData message from the specified reader or buffer.
         * @function decode
         * @memberof TalentData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TalentData} TalentData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TalentData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TalentData(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.IsOpen = reader.bool();
                    break;
                case 2:
                    message.TotalCount = reader.int32();
                    break;
                case 3:
                    message.Exp = reader.int64();
                    break;
                case 4:
                    reader.skip().pos++;
                    if (message.CountList === $util.emptyObject)
                        message.CountList = {};
                    key = reader.int32();
                    reader.pos++;
                    message.CountList[key] = reader.int32();
                    break;
                case 5:
                    if (!(message.EffectList && message.EffectList.length))
                        message.EffectList = [];
                    message.EffectList.push($root.TalentEffectItem.decode(reader, reader.uint32()));
                    break;
                case 6:
                    reader.skip().pos++;
                    if (message.SkillOneValue === $util.emptyObject)
                        message.SkillOneValue = {};
                    key = reader.int32();
                    reader.pos++;
                    message.SkillOneValue[key] = reader.int32();
                    break;
                case 7:
                    message.SkillAllValue = reader.int32();
                    break;
                case 8:
                    message.State = reader.int32();
                    break;
                case 9:
                    message.Occupation = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TalentData;
    })();
    
    $root.FluorescentGemDataValue = (function() {
    
        /**
         * Properties of a FluorescentGemDataValue.
         * @exports IFluorescentGemDataValue
         * @interface IFluorescentGemDataValue
         * @property {Object.<string,IGoodsData>|null} [value] <宝石类型,宝石GoodsData>
         */
    
        /**
         * Constructs a new FluorescentGemDataValue.
         * @exports FluorescentGemDataValue
         * @classdesc protobufjs貌似不支持map嵌套，先这样写 /// TODO...
         * @implements IFluorescentGemDataValue
         * @constructor
         * @param {IFluorescentGemDataValue=} [properties] Properties to set
         */
        function FluorescentGemDataValue(properties) {
            this.value = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * <宝石类型,宝石GoodsData>
         * @member {Object.<string,IGoodsData>} value
         * @memberof FluorescentGemDataValue
         * @instance
         */
        FluorescentGemDataValue.prototype.value = $util.emptyObject;
    
        /**
         * Encodes the specified FluorescentGemDataValue message. Does not implicitly {@link FluorescentGemDataValue.verify|verify} messages.
         * @function encode
         * @memberof FluorescentGemDataValue
         * @static
         * @param {IFluorescentGemDataValue} message FluorescentGemDataValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FluorescentGemDataValue.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && message.hasOwnProperty("value"))
                for (var keys = Object.keys(message.value), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.GoodsData.encode(message.value[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };
    
        /**
         * Decodes a FluorescentGemDataValue message from the specified reader or buffer.
         * @function decode
         * @memberof FluorescentGemDataValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FluorescentGemDataValue} FluorescentGemDataValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FluorescentGemDataValue.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FluorescentGemDataValue(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.value === $util.emptyObject)
                        message.value = {};
                    key = reader.int32();
                    reader.pos++;
                    message.value[key] = $root.GoodsData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return FluorescentGemDataValue;
    })();
    
    $root.FluorescentGemData = (function() {
    
        /**
         * Properties of a FluorescentGemData.
         * @exports IFluorescentGemData
         * @interface IFluorescentGemData
         * @property {Object.<string,IFluorescentGemDataValue>|null} [GemInstalList] 宝石镶嵌列表 <部位id，<宝石类型,宝石GoodsData>>
         * @property {Object.<string,IGoodsData>|null} [GemStoreList] 宝石仓库列表 <格子索引,宝石GoodsData>
         */
    
        /**
         * Constructs a new FluorescentGemData.
         * @exports FluorescentGemData
         * @classdesc 荧光宝石数据
         * @implements IFluorescentGemData
         * @constructor
         * @param {IFluorescentGemData=} [properties] Properties to set
         */
        function FluorescentGemData(properties) {
            this.GemInstalList = {};
            this.GemStoreList = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 宝石镶嵌列表 <部位id，<宝石类型,宝石GoodsData>>
         * @member {Object.<string,IFluorescentGemDataValue>} GemInstalList
         * @memberof FluorescentGemData
         * @instance
         */
        FluorescentGemData.prototype.GemInstalList = $util.emptyObject;
    
        /**
         * 宝石仓库列表 <格子索引,宝石GoodsData>
         * @member {Object.<string,IGoodsData>} GemStoreList
         * @memberof FluorescentGemData
         * @instance
         */
        FluorescentGemData.prototype.GemStoreList = $util.emptyObject;
    
        /**
         * Encodes the specified FluorescentGemData message. Does not implicitly {@link FluorescentGemData.verify|verify} messages.
         * @function encode
         * @memberof FluorescentGemData
         * @static
         * @param {IFluorescentGemData} message FluorescentGemData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FluorescentGemData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.GemInstalList != null && message.hasOwnProperty("GemInstalList"))
                for (var keys = Object.keys(message.GemInstalList), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.FluorescentGemDataValue.encode(message.GemInstalList[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.GemStoreList != null && message.hasOwnProperty("GemStoreList"))
                for (var keys = Object.keys(message.GemStoreList), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.GoodsData.encode(message.GemStoreList[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };
    
        /**
         * Decodes a FluorescentGemData message from the specified reader or buffer.
         * @function decode
         * @memberof FluorescentGemData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FluorescentGemData} FluorescentGemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FluorescentGemData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FluorescentGemData(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.GemInstalList === $util.emptyObject)
                        message.GemInstalList = {};
                    key = reader.int32();
                    reader.pos++;
                    message.GemInstalList[key] = $root.FluorescentGemDataValue.decode(reader, reader.uint32());
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.GemStoreList === $util.emptyObject)
                        message.GemStoreList = {};
                    key = reader.int32();
                    reader.pos++;
                    message.GemStoreList[key] = $root.GoodsData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return FluorescentGemData;
    })();
    
    $root.SoulStoneData = (function() {
    
        /**
         * Properties of a SoulStoneData.
         * @exports ISoulStoneData
         * @interface ISoulStoneData
         * @property {Array.<IGoodsData>|null} [StonesInBag] 魂石背包栏
         * @property {Array.<IGoodsData>|null} [StonesInUsing] 魂石装备栏
         */
    
        /**
         * Constructs a new SoulStoneData.
         * @exports SoulStoneData
         * @classdesc 魂石数据
         * @implements ISoulStoneData
         * @constructor
         * @param {ISoulStoneData=} [properties] Properties to set
         */
        function SoulStoneData(properties) {
            this.StonesInBag = [];
            this.StonesInUsing = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 魂石背包栏
         * @member {Array.<IGoodsData>} StonesInBag
         * @memberof SoulStoneData
         * @instance
         */
        SoulStoneData.prototype.StonesInBag = $util.emptyArray;
    
        /**
         * 魂石装备栏
         * @member {Array.<IGoodsData>} StonesInUsing
         * @memberof SoulStoneData
         * @instance
         */
        SoulStoneData.prototype.StonesInUsing = $util.emptyArray;
    
        /**
         * Encodes the specified SoulStoneData message. Does not implicitly {@link SoulStoneData.verify|verify} messages.
         * @function encode
         * @memberof SoulStoneData
         * @static
         * @param {ISoulStoneData} message SoulStoneData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SoulStoneData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.StonesInBag != null && message.StonesInBag.length)
                for (var i = 0; i < message.StonesInBag.length; ++i)
                    $root.GoodsData.encode(message.StonesInBag[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.StonesInUsing != null && message.StonesInUsing.length)
                for (var i = 0; i < message.StonesInUsing.length; ++i)
                    $root.GoodsData.encode(message.StonesInUsing[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Decodes a SoulStoneData message from the specified reader or buffer.
         * @function decode
         * @memberof SoulStoneData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SoulStoneData} SoulStoneData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SoulStoneData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SoulStoneData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.StonesInBag && message.StonesInBag.length))
                        message.StonesInBag = [];
                    message.StonesInBag.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.StonesInUsing && message.StonesInUsing.length))
                        message.StonesInUsing = [];
                    message.StonesInUsing.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SoulStoneData;
    })();
    
    $root.RoleData = (function() {
    
        /**
         * Properties of a RoleData.
         * @exports IRoleData
         * @interface IRoleData
         * @property {number|null} [RoleID] 角色ID
         * @property {string|null} [RoleName] 角色名字
         * @property {number|null} [RoleSex] 性别
         * @property {number|null} [Occupation] 职业
         * @property {number|null} [Level] 角色级别
         * @property {number|null} [Faction] 角色所属的帮派
         * @property {number|null} [Money1] 绑定金币
         * @property {number|null} [Money2] 非绑定金币（绑定钻石）
         * @property {number|Long|null} [Experience] 当前的经验
         * @property {number|null} [PKMode] 当前的PK模式
         * @property {number|null} [PKValue] 当前的PK值
         * @property {number|null} [MapCode] 所在的地图的编号
         * @property {number|null} [PosX] 当前所在的位置X坐标
         * @property {number|null} [PosY] 当前所在的位置Y坐标
         * @property {number|null} [RoleDirection] 当前的方向
         * @property {number|null} [LifeV] 当前的生命值
         * @property {number|null} [MaxLifeV] 最大的生命值
         * @property {number|null} [MagicV] 当前的魔法值
         * @property {number|null} [MaxMagicV] 最大的魔法值
         * @property {number|null} [RolePic] 当前的头像
         * @property {number|null} [BagNum] 当前背包格子数（已解锁可用的格子）
         * @property {Array.<ITaskData>|null} [TaskDataList] 任务数据
         * @property {Array.<IGoodsData>|null} [GoodsDataList] 物品数据
         * @property {number|null} [BodyCode] 衣服代号
         * @property {number|null} [WeaponCode] 武器代号
         * @property {Array.<ISkillData>|null} [SkillDataList] 技能数据
         * @property {string|null} [OtherName] 称号
         * @property {Array.<INPCTaskState>|null} [NPCTaskStateList] NPC的任务状态
         * @property {string|null} [MainQuickBarKeys] 主快捷面板的映射
         * @property {string|null} [OtherQuickBarKeys] 辅助快捷面板的映射
         * @property {number|null} [LoginNum] 登陆的次数
         * @property {number|null} [UserMoney] 充值的钱数 => 钻石（非绑定钻石）
         * @property {string|null} [StallName] 摆摊的名称
         * @property {number|null} [TeamID] 组队的ID
         * @property {number|null} [LeftFightSeconds] 剩余的自动挂机时间
         * @property {number|null} [TotalHorseCount] 拥有的坐骑的数量
         * @property {number|null} [HorseDbID] 坐骑数据（当前骑乘）
         * @property {number|null} [TotalPetCount] 拥有的宠物的数量
         * @property {number|null} [PetDbID] 宠物数据（当前放出）
         * @property {number|null} [InterPower] 角色的内力值
         * @property {number|null} [TeamLeaderRoleID] 当前的组队中的队长ID
         * @property {number|null} [YinLiang] 系统绑定的银两 => 金币（非绑定金币）
         * @property {number|null} [JingMaiBodyLevel] 当前冲脉的重数
         * @property {number|null} [JingMaiXueWeiNum] 当前冲脉的累加穴位个数
         * @property {number|null} [LastHorseID] 上一次的坐骑ID
         * @property {number|null} [DefaultSkillID] 缺省的技能ID
         * @property {number|null} [AutoLifeV] 自动补血喝药的百分比
         * @property {number|null} [AutoMagicV] 自动补蓝喝药的百分比
         * @property {Array.<IBufferData>|null} [BufferDataList] Buffer的数据列表
         * @property {Array.<IDailyTaskData>|null} [MyDailyTaskDataList] 跑环的数据列表
         * @property {number|null} [JingMaiOkNum] 已经冲通的经脉的条数
         * @property {IDailyJingMaiData|null} [MyDailyJingMaiData] 每日冲穴的次数数据
         * @property {number|null} [NumSkillID] 自动增加熟练度的被动技能ID
         * @property {IPortableBagData|null} [MyPortableBagData] 随身仓库数据
         * @property {number|null} [NewStep] 见面有礼领取步骤
         * @property {number|Long|null} [StepTime] 领取上一个见面有礼步骤的时间
         * @property {number|null} [BigAwardID] 大奖活动ID
         * @property {number|null} [SongLiID] 送礼活动ID
         * @property {Array.<IFuBenData>|null} [FuBenDataList] 副本数据
         * @property {number|null} [TotalLearnedSkillLevelCount] 总共学习技能的级别
         * @property {number|null} [CompletedMainTaskID] 当前已经完成的主线任务ID
         * @property {number|null} [PKPoint] 当前的PK点
         * @property {number|null} [LianZhan] 最高连斩数
         * @property {number|Long|null} [StartPurpleNameTicks] 紫名的开始时间
         * @property {IYaBiaoData|null} [MyYaBiaoData] 押镖的数据
         * @property {number|Long|null} [BattleNameStart] 角斗场荣誉称号开始时间
         * @property {number|null} [BattleNameIndex] 角斗场荣誉称号
         * @property {number|null} [CZTaskID] 充值TaskID
         * @property {number|null} [HeroIndex] 英雄逐擂的层数
         * @property {number|null} [AllQualityIndex] 全套品质的级别
         * @property {number|null} [AllForgeLevelIndex] 全套锻造级别
         * @property {number|null} [AllJewelLevelIndex] 全套宝石级别
         * @property {number|null} [HalfYinLiangPeriod] 银两折半优惠
         * @property {number|null} [ZoneID] 区ID
         * @property {string|null} [BHName] 帮会名称
         * @property {number|null} [BHVerify] 被邀请加入帮会时是否验证
         * @property {number|null} [BHZhiWu] 帮会职务
         * @property {number|null} [BangGong] 帮会帮贡
         * @property {Object.<string,IBangHuiLingDiItemData>|null} [BangHuiLingDiItemsDict] 内存领地帮会分布字典
         * @property {number|null} [HuangDiRoleID] 当前服的皇帝的ID
         * @property {number|null} [HuangHou] 是否皇后
         * @property {Object.<string,number>|null} [PaiHangPosDict] 自己在排行中的位置字典
         * @property {number|null} [AutoFightingProtect] 是否进入了挂机保护状态
         * @property {number|Long|null} [FSHuDunStart] 法师的护盾开始的时间
         * @property {number|null} [BattleWhichSide] 大乱斗中的阵营ID
         * @property {number|null} [LastMailID] 上次的mailID
         * @property {number|null} [IsVIP] 上次的mailID
         * @property {number|Long|null} [OnceAwardFlag] 单次奖励记录标志位
         * @property {number|null} [Gold] 系统绑定的金币 => 绑定钻石
         * @property {number|Long|null} [DSHideStart] 道术隐身的时间
         * @property {Array.<number>|null} [RoleCommonUseIntPamams] 角色常用整形参数值列表
         * @property {number|null} [FSHuDunSeconds] 法师的护盾持续的秒数
         * @property {number|Long|null} [ZhongDuStart] 中毒开始的时间
         * @property {number|null} [ZhongDuSeconds] 中毒持续的秒数
         * @property {string|null} [KaiFuStartDay] 开服日期
         * @property {string|null} [RegTime] 注册日期
         * @property {string|null} [JieriStartDay] 节日活动开始日期
         * @property {number|null} [JieriDaysNum] 节日活动持续天数
         * @property {string|null} [HefuStartDay] 合区活动开始时间
         * @property {number|null} [JieriChengHao] 节日称号
         * @property {string|null} [BuChangStartDay] 补偿开始时间
         * @property {number|Long|null} [DongJieStart] 冻结开始的时间
         * @property {number|null} [DongJieSeconds] 冻结持续的秒数
         * @property {string|null} [YueduDazhunpanStartDay] 月度抽奖活动开始日期
         * @property {number|null} [YueduDazhunpanStartDayNum] 月度抽奖活动持续天数
         * @property {number|null} [RoleStrength] 力量
         * @property {number|null} [RoleIntelligence] 智力
         * @property {number|null} [RoleDexterity] 敏捷
         * @property {number|null} [RoleConstitution] 体力
         * @property {number|null} [ChangeLifeCount] 重生计数
         * @property {number|null} [TotalPropPoint] 总属性点
         * @property {number|null} [IsFlashPlayer] 新人标记
         * @property {number|null} [AdmiredCount] 被崇拜计数
         * @property {number|null} [CombatForce] 战斗力
         * @property {number|null} [AdorationCount] 崇拜计数
         * @property {number|null} [DayOnlineSecond] 每日在线时长（秒）
         * @property {number|null} [SeriesLoginNum] 连续登陆天数（1-7）
         * @property {number|null} [AutoAssignPropertyPoint] 自动分配属性点
         * @property {number|null} [OnLineTotalTime] 总在线时间
         * @property {number|null} [AllZhuoYueNum] 全套卓越属性装备个数
         * @property {number|null} [VIPLevel] VIP等级
         * @property {number|null} [OpenGridTime] 开启背包个格子计时
         * @property {number|null} [OpenPortableGridTime] 开启移动背包格子计时
         * @property {IWingData|null} [MyWingData] 翅膀数据列表
         * @property {Object.<string,number>|null} [PictureJudgeReferInfo] 山海全书提交信息
         * @property {number|null} [StarSoulValue] 星魂值
         * @property {number|Long|null} [StoreYinLiang] 仓库金币
         * @property {number|Long|null} [StoreMoney] 仓库绑定金币
         * @property {string|null} [PlayerRecallStartDay] 节日活动开始日期
         * @property {string|null} [PlayerRecallDaysNum] 节日活动持续天数
         * @property {ITalentData|null} [MyTalentData] 天赋数据
         * @property {number|null} [TianTiRongYao] 天梯荣耀值
         * @property {IFluorescentGemData|null} [FluorescentDiamondData] 荧光宝石数据
         * @property {number|null} [GMAuth] 是否gm
         * @property {ISoulStoneData|null} [soulStoneData] 魂石石数据
         * @property {number|Long|null} [SettingBitFlags] 二态功能设置，参考ESettingBitFlag
         * @property {number|null} [SpouseId] 配偶id
         * @property {string|null} [sSpouseName] 配偶的名称
         * @property {number|null} [nJunXianLevel] 军衔等级
         * @property {number|null} [nIsOnJiJia] 是否骑乘机甲
         * @property {number|null} [weekBhMoney] 每周帮会资金贡献
         * @property {Array.<number>|null} [funOpenflagList] 功能开启提示奖励领取列表
         * @property {Array.<IGoodsData>|null} [MengChongsInBag] 萌宠栏数据
         * @property {number|null} [MengchongBagNum] 当前萌宠背包的页数（总个数 - 1）
         * @property {number|null} [OpenMengchongGridTime] 萌宠背包格子开启时间
         * @property {number|null} [QiRiLoginActFinished] 七日登陆活动是否完成
         * @property {Object.<string,string>|null} [MengchongNameList] 萌宠命名列表
         * @property {Array.<ITotemNetItem>|null} [activatedTotemList] 当前的开启的图腾List
         */
    
        /**
         * Constructs a new RoleData.
         * @exports RoleData
         * @classdesc 游戏中角色的数据定义
         * @implements IRoleData
         * @constructor
         * @param {IRoleData=} [properties] Properties to set
         */
        function RoleData(properties) {
            this.TaskDataList = [];
            this.GoodsDataList = [];
            this.SkillDataList = [];
            this.NPCTaskStateList = [];
            this.BufferDataList = [];
            this.MyDailyTaskDataList = [];
            this.FuBenDataList = [];
            this.BangHuiLingDiItemsDict = {};
            this.PaiHangPosDict = {};
            this.RoleCommonUseIntPamams = [];
            this.PictureJudgeReferInfo = {};
            this.funOpenflagList = [];
            this.MengChongsInBag = [];
            this.MengchongNameList = {};
            this.activatedTotemList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色ID
         * @member {number} RoleID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleID = 0;
    
        /**
         * 角色名字
         * @member {string} RoleName
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleName = "";
    
        /**
         * 性别
         * @member {number} RoleSex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleSex = 0;
    
        /**
         * 职业
         * @member {number} Occupation
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Occupation = 0;
    
        /**
         * 角色级别
         * @member {number} Level
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Level = 0;
    
        /**
         * 角色所属的帮派
         * @member {number} Faction
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Faction = 0;
    
        /**
         * 绑定金币
         * @member {number} Money1
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Money1 = 0;
    
        /**
         * 非绑定金币（绑定钻石）
         * @member {number} Money2
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Money2 = 0;
    
        /**
         * 当前的经验
         * @member {number|Long} Experience
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Experience = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 当前的PK模式
         * @member {number} PKMode
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PKMode = 0;
    
        /**
         * 当前的PK值
         * @member {number} PKValue
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PKValue = 0;
    
        /**
         * 所在的地图的编号
         * @member {number} MapCode
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MapCode = 0;
    
        /**
         * 当前所在的位置X坐标
         * @member {number} PosX
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PosX = 0;
    
        /**
         * 当前所在的位置Y坐标
         * @member {number} PosY
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PosY = 0;
    
        /**
         * 当前的方向
         * @member {number} RoleDirection
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleDirection = 0;
    
        /**
         * 当前的生命值
         * @member {number} LifeV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LifeV = 0;
    
        /**
         * 最大的生命值
         * @member {number} MaxLifeV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MaxLifeV = 0;
    
        /**
         * 当前的魔法值
         * @member {number} MagicV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MagicV = 0;
    
        /**
         * 最大的魔法值
         * @member {number} MaxMagicV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MaxMagicV = 0;
    
        /**
         * 当前的头像
         * @member {number} RolePic
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RolePic = 0;
    
        /**
         * 当前背包格子数（已解锁可用的格子）
         * @member {number} BagNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BagNum = 0;
    
        /**
         * 任务数据
         * @member {Array.<ITaskData>} TaskDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TaskDataList = $util.emptyArray;
    
        /**
         * 物品数据
         * @member {Array.<IGoodsData>} GoodsDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.GoodsDataList = $util.emptyArray;
    
        /**
         * 衣服代号
         * @member {number} BodyCode
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BodyCode = 0;
    
        /**
         * 武器代号
         * @member {number} WeaponCode
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.WeaponCode = 0;
    
        /**
         * 技能数据
         * @member {Array.<ISkillData>} SkillDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.SkillDataList = $util.emptyArray;
    
        /**
         * 称号
         * @member {string} OtherName
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OtherName = "";
    
        /**
         * NPC的任务状态
         * @member {Array.<INPCTaskState>} NPCTaskStateList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.NPCTaskStateList = $util.emptyArray;
    
        /**
         * 主快捷面板的映射
         * @member {string} MainQuickBarKeys
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MainQuickBarKeys = "";
    
        /**
         * 辅助快捷面板的映射
         * @member {string} OtherQuickBarKeys
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OtherQuickBarKeys = "";
    
        /**
         * 登陆的次数
         * @member {number} LoginNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LoginNum = 0;
    
        /**
         * 充值的钱数 => 钻石（非绑定钻石）
         * @member {number} UserMoney
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.UserMoney = 0;
    
        /**
         * 摆摊的名称
         * @member {string} StallName
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StallName = "";
    
        /**
         * 组队的ID
         * @member {number} TeamID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TeamID = 0;
    
        /**
         * 剩余的自动挂机时间
         * @member {number} LeftFightSeconds
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LeftFightSeconds = 0;
    
        /**
         * 拥有的坐骑的数量
         * @member {number} TotalHorseCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TotalHorseCount = 0;
    
        /**
         * 坐骑数据（当前骑乘）
         * @member {number} HorseDbID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HorseDbID = 0;
    
        /**
         * 拥有的宠物的数量
         * @member {number} TotalPetCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TotalPetCount = 0;
    
        /**
         * 宠物数据（当前放出）
         * @member {number} PetDbID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PetDbID = 0;
    
        /**
         * 角色的内力值
         * @member {number} InterPower
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.InterPower = 0;
    
        /**
         * 当前的组队中的队长ID
         * @member {number} TeamLeaderRoleID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TeamLeaderRoleID = 0;
    
        /**
         * 系统绑定的银两 => 金币（非绑定金币）
         * @member {number} YinLiang
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.YinLiang = 0;
    
        /**
         * 当前冲脉的重数
         * @member {number} JingMaiBodyLevel
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JingMaiBodyLevel = 0;
    
        /**
         * 当前冲脉的累加穴位个数
         * @member {number} JingMaiXueWeiNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JingMaiXueWeiNum = 0;
    
        /**
         * 上一次的坐骑ID
         * @member {number} LastHorseID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LastHorseID = 0;
    
        /**
         * 缺省的技能ID
         * @member {number} DefaultSkillID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.DefaultSkillID = 0;
    
        /**
         * 自动补血喝药的百分比
         * @member {number} AutoLifeV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AutoLifeV = 0;
    
        /**
         * 自动补蓝喝药的百分比
         * @member {number} AutoMagicV
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AutoMagicV = 0;
    
        /**
         * Buffer的数据列表
         * @member {Array.<IBufferData>} BufferDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BufferDataList = $util.emptyArray;
    
        /**
         * 跑环的数据列表
         * @member {Array.<IDailyTaskData>} MyDailyTaskDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyDailyTaskDataList = $util.emptyArray;
    
        /**
         * 已经冲通的经脉的条数
         * @member {number} JingMaiOkNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JingMaiOkNum = 0;
    
        /**
         * 每日冲穴的次数数据
         * @member {IDailyJingMaiData|null|undefined} MyDailyJingMaiData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyDailyJingMaiData = null;
    
        /**
         * 自动增加熟练度的被动技能ID
         * @member {number} NumSkillID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.NumSkillID = 0;
    
        /**
         * 随身仓库数据
         * @member {IPortableBagData|null|undefined} MyPortableBagData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyPortableBagData = null;
    
        /**
         * 见面有礼领取步骤
         * @member {number} NewStep
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.NewStep = 0;
    
        /**
         * 领取上一个见面有礼步骤的时间
         * @member {number|Long} StepTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StepTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 大奖活动ID
         * @member {number} BigAwardID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BigAwardID = 0;
    
        /**
         * 送礼活动ID
         * @member {number} SongLiID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.SongLiID = 0;
    
        /**
         * 副本数据
         * @member {Array.<IFuBenData>} FuBenDataList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.FuBenDataList = $util.emptyArray;
    
        /**
         * 总共学习技能的级别
         * @member {number} TotalLearnedSkillLevelCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TotalLearnedSkillLevelCount = 0;
    
        /**
         * 当前已经完成的主线任务ID
         * @member {number} CompletedMainTaskID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.CompletedMainTaskID = 0;
    
        /**
         * 当前的PK点
         * @member {number} PKPoint
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PKPoint = 0;
    
        /**
         * 最高连斩数
         * @member {number} LianZhan
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LianZhan = 0;
    
        /**
         * 紫名的开始时间
         * @member {number|Long} StartPurpleNameTicks
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StartPurpleNameTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 押镖的数据
         * @member {IYaBiaoData|null|undefined} MyYaBiaoData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyYaBiaoData = null;
    
        /**
         * 角斗场荣誉称号开始时间
         * @member {number|Long} BattleNameStart
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BattleNameStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 角斗场荣誉称号
         * @member {number} BattleNameIndex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BattleNameIndex = 0;
    
        /**
         * 充值TaskID
         * @member {number} CZTaskID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.CZTaskID = 0;
    
        /**
         * 英雄逐擂的层数
         * @member {number} HeroIndex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HeroIndex = 0;
    
        /**
         * 全套品质的级别
         * @member {number} AllQualityIndex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AllQualityIndex = 0;
    
        /**
         * 全套锻造级别
         * @member {number} AllForgeLevelIndex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AllForgeLevelIndex = 0;
    
        /**
         * 全套宝石级别
         * @member {number} AllJewelLevelIndex
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AllJewelLevelIndex = 0;
    
        /**
         * 银两折半优惠
         * @member {number} HalfYinLiangPeriod
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HalfYinLiangPeriod = 0;
    
        /**
         * 区ID
         * @member {number} ZoneID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.ZoneID = 0;
    
        /**
         * 帮会名称
         * @member {string} BHName
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BHName = "";
    
        /**
         * 被邀请加入帮会时是否验证
         * @member {number} BHVerify
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BHVerify = 0;
    
        /**
         * 帮会职务
         * @member {number} BHZhiWu
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BHZhiWu = 0;
    
        /**
         * 帮会帮贡
         * @member {number} BangGong
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BangGong = 0;
    
        /**
         * 内存领地帮会分布字典
         * @member {Object.<string,IBangHuiLingDiItemData>} BangHuiLingDiItemsDict
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BangHuiLingDiItemsDict = $util.emptyObject;
    
        /**
         * 当前服的皇帝的ID
         * @member {number} HuangDiRoleID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HuangDiRoleID = 0;
    
        /**
         * 是否皇后
         * @member {number} HuangHou
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HuangHou = 0;
    
        /**
         * 自己在排行中的位置字典
         * @member {Object.<string,number>} PaiHangPosDict
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PaiHangPosDict = $util.emptyObject;
    
        /**
         * 是否进入了挂机保护状态
         * @member {number} AutoFightingProtect
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AutoFightingProtect = 0;
    
        /**
         * 法师的护盾开始的时间
         * @member {number|Long} FSHuDunStart
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.FSHuDunStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 大乱斗中的阵营ID
         * @member {number} BattleWhichSide
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BattleWhichSide = 0;
    
        /**
         * 上次的mailID
         * @member {number} LastMailID
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.LastMailID = 0;
    
        /**
         * 上次的mailID
         * @member {number} IsVIP
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.IsVIP = 0;
    
        /**
         * 单次奖励记录标志位
         * @member {number|Long} OnceAwardFlag
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OnceAwardFlag = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 系统绑定的金币 => 绑定钻石
         * @member {number} Gold
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.Gold = 0;
    
        /**
         * 道术隐身的时间
         * @member {number|Long} DSHideStart
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.DSHideStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 角色常用整形参数值列表
         * @member {Array.<number>} RoleCommonUseIntPamams
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleCommonUseIntPamams = $util.emptyArray;
    
        /**
         * 法师的护盾持续的秒数
         * @member {number} FSHuDunSeconds
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.FSHuDunSeconds = 0;
    
        /**
         * 中毒开始的时间
         * @member {number|Long} ZhongDuStart
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.ZhongDuStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 中毒持续的秒数
         * @member {number} ZhongDuSeconds
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.ZhongDuSeconds = 0;
    
        /**
         * 开服日期
         * @member {string} KaiFuStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.KaiFuStartDay = "";
    
        /**
         * 注册日期
         * @member {string} RegTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RegTime = "";
    
        /**
         * 节日活动开始日期
         * @member {string} JieriStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JieriStartDay = "";
    
        /**
         * 节日活动持续天数
         * @member {number} JieriDaysNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JieriDaysNum = 0;
    
        /**
         * 合区活动开始时间
         * @member {string} HefuStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.HefuStartDay = "";
    
        /**
         * 节日称号
         * @member {number} JieriChengHao
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.JieriChengHao = 0;
    
        /**
         * 补偿开始时间
         * @member {string} BuChangStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.BuChangStartDay = "";
    
        /**
         * 冻结开始的时间
         * @member {number|Long} DongJieStart
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.DongJieStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 冻结持续的秒数
         * @member {number} DongJieSeconds
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.DongJieSeconds = 0;
    
        /**
         * 月度抽奖活动开始日期
         * @member {string} YueduDazhunpanStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.YueduDazhunpanStartDay = "";
    
        /**
         * 月度抽奖活动持续天数
         * @member {number} YueduDazhunpanStartDayNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.YueduDazhunpanStartDayNum = 0;
    
        /**
         * 力量
         * @member {number} RoleStrength
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleStrength = 0;
    
        /**
         * 智力
         * @member {number} RoleIntelligence
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleIntelligence = 0;
    
        /**
         * 敏捷
         * @member {number} RoleDexterity
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleDexterity = 0;
    
        /**
         * 体力
         * @member {number} RoleConstitution
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.RoleConstitution = 0;
    
        /**
         * 重生计数
         * @member {number} ChangeLifeCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.ChangeLifeCount = 0;
    
        /**
         * 总属性点
         * @member {number} TotalPropPoint
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TotalPropPoint = 0;
    
        /**
         * 新人标记
         * @member {number} IsFlashPlayer
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.IsFlashPlayer = 0;
    
        /**
         * 被崇拜计数
         * @member {number} AdmiredCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AdmiredCount = 0;
    
        /**
         * 战斗力
         * @member {number} CombatForce
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.CombatForce = 0;
    
        /**
         * 崇拜计数
         * @member {number} AdorationCount
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AdorationCount = 0;
    
        /**
         * 每日在线时长（秒）
         * @member {number} DayOnlineSecond
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.DayOnlineSecond = 0;
    
        /**
         * 连续登陆天数（1-7）
         * @member {number} SeriesLoginNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.SeriesLoginNum = 0;
    
        /**
         * 自动分配属性点
         * @member {number} AutoAssignPropertyPoint
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AutoAssignPropertyPoint = 0;
    
        /**
         * 总在线时间
         * @member {number} OnLineTotalTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OnLineTotalTime = 0;
    
        /**
         * 全套卓越属性装备个数
         * @member {number} AllZhuoYueNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.AllZhuoYueNum = 0;
    
        /**
         * VIP等级
         * @member {number} VIPLevel
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.VIPLevel = 0;
    
        /**
         * 开启背包个格子计时
         * @member {number} OpenGridTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OpenGridTime = 0;
    
        /**
         * 开启移动背包格子计时
         * @member {number} OpenPortableGridTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OpenPortableGridTime = 0;
    
        /**
         * 翅膀数据列表
         * @member {IWingData|null|undefined} MyWingData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyWingData = null;
    
        /**
         * 山海全书提交信息
         * @member {Object.<string,number>} PictureJudgeReferInfo
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PictureJudgeReferInfo = $util.emptyObject;
    
        /**
         * 星魂值
         * @member {number} StarSoulValue
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StarSoulValue = 0;
    
        /**
         * 仓库金币
         * @member {number|Long} StoreYinLiang
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StoreYinLiang = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 仓库绑定金币
         * @member {number|Long} StoreMoney
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.StoreMoney = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 节日活动开始日期
         * @member {string} PlayerRecallStartDay
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PlayerRecallStartDay = "";
    
        /**
         * 节日活动持续天数
         * @member {string} PlayerRecallDaysNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.PlayerRecallDaysNum = "";
    
        /**
         * 天赋数据
         * @member {ITalentData|null|undefined} MyTalentData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MyTalentData = null;
    
        /**
         * 天梯荣耀值
         * @member {number} TianTiRongYao
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.TianTiRongYao = 0;
    
        /**
         * 荧光宝石数据
         * @member {IFluorescentGemData|null|undefined} FluorescentDiamondData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.FluorescentDiamondData = null;
    
        /**
         * 是否gm
         * @member {number} GMAuth
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.GMAuth = 0;
    
        /**
         * 魂石石数据
         * @member {ISoulStoneData|null|undefined} soulStoneData
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.soulStoneData = null;
    
        /**
         * 二态功能设置，参考ESettingBitFlag
         * @member {number|Long} SettingBitFlags
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.SettingBitFlags = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 配偶id
         * @member {number} SpouseId
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.SpouseId = 0;
    
        /**
         * 配偶的名称
         * @member {string} sSpouseName
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.sSpouseName = "";
    
        /**
         * 军衔等级
         * @member {number} nJunXianLevel
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.nJunXianLevel = 0;
    
        /**
         * 是否骑乘机甲
         * @member {number} nIsOnJiJia
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.nIsOnJiJia = 0;
    
        /**
         * 每周帮会资金贡献
         * @member {number} weekBhMoney
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.weekBhMoney = 0;
    
        /**
         * 功能开启提示奖励领取列表
         * @member {Array.<number>} funOpenflagList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.funOpenflagList = $util.emptyArray;
    
        /**
         * 萌宠栏数据
         * @member {Array.<IGoodsData>} MengChongsInBag
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MengChongsInBag = $util.emptyArray;
    
        /**
         * 当前萌宠背包的页数（总个数 - 1）
         * @member {number} MengchongBagNum
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MengchongBagNum = 0;
    
        /**
         * 萌宠背包格子开启时间
         * @member {number} OpenMengchongGridTime
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.OpenMengchongGridTime = 0;
    
        /**
         * 七日登陆活动是否完成
         * @member {number} QiRiLoginActFinished
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.QiRiLoginActFinished = 0;
    
        /**
         * 萌宠命名列表
         * @member {Object.<string,string>} MengchongNameList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.MengchongNameList = $util.emptyObject;
    
        /**
         * 当前的开启的图腾List
         * @member {Array.<ITotemNetItem>} activatedTotemList
         * @memberof RoleData
         * @instance
         */
        RoleData.prototype.activatedTotemList = $util.emptyArray;
    
        /**
         * Encodes the specified RoleData message. Does not implicitly {@link RoleData.verify|verify} messages.
         * @function encode
         * @memberof RoleData
         * @static
         * @param {IRoleData} message RoleData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.RoleName != null && message.hasOwnProperty("RoleName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.RoleName);
            if (message.RoleSex != null && message.hasOwnProperty("RoleSex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.RoleSex);
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Occupation);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Level);
            if (message.Faction != null && message.hasOwnProperty("Faction"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Faction);
            if (message.Money1 != null && message.hasOwnProperty("Money1"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.Money1);
            if (message.Money2 != null && message.hasOwnProperty("Money2"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.Money2);
            if (message.Experience != null && message.hasOwnProperty("Experience"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.Experience);
            if (message.PKMode != null && message.hasOwnProperty("PKMode"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.PKMode);
            if (message.PKValue != null && message.hasOwnProperty("PKValue"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.PKValue);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.MapCode);
            if (message.PosX != null && message.hasOwnProperty("PosX"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.PosX);
            if (message.PosY != null && message.hasOwnProperty("PosY"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.PosY);
            if (message.RoleDirection != null && message.hasOwnProperty("RoleDirection"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.RoleDirection);
            if (message.LifeV != null && message.hasOwnProperty("LifeV"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.LifeV);
            if (message.MaxLifeV != null && message.hasOwnProperty("MaxLifeV"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.MaxLifeV);
            if (message.MagicV != null && message.hasOwnProperty("MagicV"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.MagicV);
            if (message.MaxMagicV != null && message.hasOwnProperty("MaxMagicV"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.MaxMagicV);
            if (message.RolePic != null && message.hasOwnProperty("RolePic"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.RolePic);
            if (message.BagNum != null && message.hasOwnProperty("BagNum"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.BagNum);
            if (message.TaskDataList != null && message.TaskDataList.length)
                for (var i = 0; i < message.TaskDataList.length; ++i)
                    $root.TaskData.encode(message.TaskDataList[i], writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.GoodsDataList != null && message.GoodsDataList.length)
                for (var i = 0; i < message.GoodsDataList.length; ++i)
                    $root.GoodsData.encode(message.GoodsDataList[i], writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
            if (message.BodyCode != null && message.hasOwnProperty("BodyCode"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.BodyCode);
            if (message.WeaponCode != null && message.hasOwnProperty("WeaponCode"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.WeaponCode);
            if (message.SkillDataList != null && message.SkillDataList.length)
                for (var i = 0; i < message.SkillDataList.length; ++i)
                    $root.SkillData.encode(message.SkillDataList[i], writer.uint32(/* id 26, wireType 2 =*/210).fork()).ldelim();
            if (message.OtherName != null && message.hasOwnProperty("OtherName"))
                writer.uint32(/* id 27, wireType 2 =*/218).string(message.OtherName);
            if (message.NPCTaskStateList != null && message.NPCTaskStateList.length)
                for (var i = 0; i < message.NPCTaskStateList.length; ++i)
                    $root.NPCTaskState.encode(message.NPCTaskStateList[i], writer.uint32(/* id 28, wireType 2 =*/226).fork()).ldelim();
            if (message.MainQuickBarKeys != null && message.hasOwnProperty("MainQuickBarKeys"))
                writer.uint32(/* id 29, wireType 2 =*/234).string(message.MainQuickBarKeys);
            if (message.OtherQuickBarKeys != null && message.hasOwnProperty("OtherQuickBarKeys"))
                writer.uint32(/* id 30, wireType 2 =*/242).string(message.OtherQuickBarKeys);
            if (message.LoginNum != null && message.hasOwnProperty("LoginNum"))
                writer.uint32(/* id 31, wireType 0 =*/248).int32(message.LoginNum);
            if (message.UserMoney != null && message.hasOwnProperty("UserMoney"))
                writer.uint32(/* id 32, wireType 0 =*/256).int32(message.UserMoney);
            if (message.StallName != null && message.hasOwnProperty("StallName"))
                writer.uint32(/* id 33, wireType 2 =*/266).string(message.StallName);
            if (message.TeamID != null && message.hasOwnProperty("TeamID"))
                writer.uint32(/* id 34, wireType 0 =*/272).int32(message.TeamID);
            if (message.LeftFightSeconds != null && message.hasOwnProperty("LeftFightSeconds"))
                writer.uint32(/* id 35, wireType 0 =*/280).int32(message.LeftFightSeconds);
            if (message.TotalHorseCount != null && message.hasOwnProperty("TotalHorseCount"))
                writer.uint32(/* id 36, wireType 0 =*/288).int32(message.TotalHorseCount);
            if (message.HorseDbID != null && message.hasOwnProperty("HorseDbID"))
                writer.uint32(/* id 37, wireType 0 =*/296).int32(message.HorseDbID);
            if (message.TotalPetCount != null && message.hasOwnProperty("TotalPetCount"))
                writer.uint32(/* id 38, wireType 0 =*/304).int32(message.TotalPetCount);
            if (message.PetDbID != null && message.hasOwnProperty("PetDbID"))
                writer.uint32(/* id 39, wireType 0 =*/312).int32(message.PetDbID);
            if (message.InterPower != null && message.hasOwnProperty("InterPower"))
                writer.uint32(/* id 40, wireType 0 =*/320).int32(message.InterPower);
            if (message.TeamLeaderRoleID != null && message.hasOwnProperty("TeamLeaderRoleID"))
                writer.uint32(/* id 41, wireType 0 =*/328).int32(message.TeamLeaderRoleID);
            if (message.YinLiang != null && message.hasOwnProperty("YinLiang"))
                writer.uint32(/* id 42, wireType 0 =*/336).int32(message.YinLiang);
            if (message.JingMaiBodyLevel != null && message.hasOwnProperty("JingMaiBodyLevel"))
                writer.uint32(/* id 43, wireType 0 =*/344).int32(message.JingMaiBodyLevel);
            if (message.JingMaiXueWeiNum != null && message.hasOwnProperty("JingMaiXueWeiNum"))
                writer.uint32(/* id 44, wireType 0 =*/352).int32(message.JingMaiXueWeiNum);
            if (message.LastHorseID != null && message.hasOwnProperty("LastHorseID"))
                writer.uint32(/* id 45, wireType 0 =*/360).int32(message.LastHorseID);
            if (message.DefaultSkillID != null && message.hasOwnProperty("DefaultSkillID"))
                writer.uint32(/* id 46, wireType 0 =*/368).int32(message.DefaultSkillID);
            if (message.AutoLifeV != null && message.hasOwnProperty("AutoLifeV"))
                writer.uint32(/* id 47, wireType 0 =*/376).int32(message.AutoLifeV);
            if (message.AutoMagicV != null && message.hasOwnProperty("AutoMagicV"))
                writer.uint32(/* id 48, wireType 0 =*/384).int32(message.AutoMagicV);
            if (message.BufferDataList != null && message.BufferDataList.length)
                for (var i = 0; i < message.BufferDataList.length; ++i)
                    $root.BufferData.encode(message.BufferDataList[i], writer.uint32(/* id 49, wireType 2 =*/394).fork()).ldelim();
            if (message.MyDailyTaskDataList != null && message.MyDailyTaskDataList.length)
                for (var i = 0; i < message.MyDailyTaskDataList.length; ++i)
                    $root.DailyTaskData.encode(message.MyDailyTaskDataList[i], writer.uint32(/* id 50, wireType 2 =*/402).fork()).ldelim();
            if (message.JingMaiOkNum != null && message.hasOwnProperty("JingMaiOkNum"))
                writer.uint32(/* id 51, wireType 0 =*/408).int32(message.JingMaiOkNum);
            if (message.MyDailyJingMaiData != null && message.hasOwnProperty("MyDailyJingMaiData"))
                $root.DailyJingMaiData.encode(message.MyDailyJingMaiData, writer.uint32(/* id 52, wireType 2 =*/418).fork()).ldelim();
            if (message.NumSkillID != null && message.hasOwnProperty("NumSkillID"))
                writer.uint32(/* id 53, wireType 0 =*/424).int32(message.NumSkillID);
            if (message.MyPortableBagData != null && message.hasOwnProperty("MyPortableBagData"))
                $root.PortableBagData.encode(message.MyPortableBagData, writer.uint32(/* id 54, wireType 2 =*/434).fork()).ldelim();
            if (message.NewStep != null && message.hasOwnProperty("NewStep"))
                writer.uint32(/* id 55, wireType 0 =*/440).int32(message.NewStep);
            if (message.StepTime != null && message.hasOwnProperty("StepTime"))
                writer.uint32(/* id 56, wireType 0 =*/448).int64(message.StepTime);
            if (message.BigAwardID != null && message.hasOwnProperty("BigAwardID"))
                writer.uint32(/* id 57, wireType 0 =*/456).int32(message.BigAwardID);
            if (message.SongLiID != null && message.hasOwnProperty("SongLiID"))
                writer.uint32(/* id 58, wireType 0 =*/464).int32(message.SongLiID);
            if (message.FuBenDataList != null && message.FuBenDataList.length)
                for (var i = 0; i < message.FuBenDataList.length; ++i)
                    $root.FuBenData.encode(message.FuBenDataList[i], writer.uint32(/* id 59, wireType 2 =*/474).fork()).ldelim();
            if (message.TotalLearnedSkillLevelCount != null && message.hasOwnProperty("TotalLearnedSkillLevelCount"))
                writer.uint32(/* id 60, wireType 0 =*/480).int32(message.TotalLearnedSkillLevelCount);
            if (message.CompletedMainTaskID != null && message.hasOwnProperty("CompletedMainTaskID"))
                writer.uint32(/* id 61, wireType 0 =*/488).int32(message.CompletedMainTaskID);
            if (message.PKPoint != null && message.hasOwnProperty("PKPoint"))
                writer.uint32(/* id 62, wireType 0 =*/496).int32(message.PKPoint);
            if (message.LianZhan != null && message.hasOwnProperty("LianZhan"))
                writer.uint32(/* id 63, wireType 0 =*/504).int32(message.LianZhan);
            if (message.StartPurpleNameTicks != null && message.hasOwnProperty("StartPurpleNameTicks"))
                writer.uint32(/* id 64, wireType 0 =*/512).int64(message.StartPurpleNameTicks);
            if (message.MyYaBiaoData != null && message.hasOwnProperty("MyYaBiaoData"))
                $root.YaBiaoData.encode(message.MyYaBiaoData, writer.uint32(/* id 65, wireType 2 =*/522).fork()).ldelim();
            if (message.BattleNameStart != null && message.hasOwnProperty("BattleNameStart"))
                writer.uint32(/* id 66, wireType 0 =*/528).int64(message.BattleNameStart);
            if (message.BattleNameIndex != null && message.hasOwnProperty("BattleNameIndex"))
                writer.uint32(/* id 67, wireType 0 =*/536).int32(message.BattleNameIndex);
            if (message.CZTaskID != null && message.hasOwnProperty("CZTaskID"))
                writer.uint32(/* id 68, wireType 0 =*/544).int32(message.CZTaskID);
            if (message.HeroIndex != null && message.hasOwnProperty("HeroIndex"))
                writer.uint32(/* id 69, wireType 0 =*/552).int32(message.HeroIndex);
            if (message.AllQualityIndex != null && message.hasOwnProperty("AllQualityIndex"))
                writer.uint32(/* id 70, wireType 0 =*/560).int32(message.AllQualityIndex);
            if (message.AllForgeLevelIndex != null && message.hasOwnProperty("AllForgeLevelIndex"))
                writer.uint32(/* id 71, wireType 0 =*/568).int32(message.AllForgeLevelIndex);
            if (message.AllJewelLevelIndex != null && message.hasOwnProperty("AllJewelLevelIndex"))
                writer.uint32(/* id 72, wireType 0 =*/576).int32(message.AllJewelLevelIndex);
            if (message.HalfYinLiangPeriod != null && message.hasOwnProperty("HalfYinLiangPeriod"))
                writer.uint32(/* id 73, wireType 0 =*/584).int32(message.HalfYinLiangPeriod);
            if (message.ZoneID != null && message.hasOwnProperty("ZoneID"))
                writer.uint32(/* id 74, wireType 0 =*/592).int32(message.ZoneID);
            if (message.BHName != null && message.hasOwnProperty("BHName"))
                writer.uint32(/* id 75, wireType 2 =*/602).string(message.BHName);
            if (message.BHVerify != null && message.hasOwnProperty("BHVerify"))
                writer.uint32(/* id 76, wireType 0 =*/608).int32(message.BHVerify);
            if (message.BHZhiWu != null && message.hasOwnProperty("BHZhiWu"))
                writer.uint32(/* id 77, wireType 0 =*/616).int32(message.BHZhiWu);
            if (message.BangGong != null && message.hasOwnProperty("BangGong"))
                writer.uint32(/* id 78, wireType 0 =*/624).int32(message.BangGong);
            if (message.BangHuiLingDiItemsDict != null && message.hasOwnProperty("BangHuiLingDiItemsDict"))
                for (var keys = Object.keys(message.BangHuiLingDiItemsDict), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 79, wireType 2 =*/634).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.BangHuiLingDiItemData.encode(message.BangHuiLingDiItemsDict[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            if (message.HuangDiRoleID != null && message.hasOwnProperty("HuangDiRoleID"))
                writer.uint32(/* id 80, wireType 0 =*/640).int32(message.HuangDiRoleID);
            if (message.HuangHou != null && message.hasOwnProperty("HuangHou"))
                writer.uint32(/* id 81, wireType 0 =*/648).int32(message.HuangHou);
            if (message.PaiHangPosDict != null && message.hasOwnProperty("PaiHangPosDict"))
                for (var keys = Object.keys(message.PaiHangPosDict), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 82, wireType 2 =*/658).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.PaiHangPosDict[keys[i]]).ldelim();
            if (message.AutoFightingProtect != null && message.hasOwnProperty("AutoFightingProtect"))
                writer.uint32(/* id 83, wireType 0 =*/664).int32(message.AutoFightingProtect);
            if (message.FSHuDunStart != null && message.hasOwnProperty("FSHuDunStart"))
                writer.uint32(/* id 84, wireType 0 =*/672).int64(message.FSHuDunStart);
            if (message.BattleWhichSide != null && message.hasOwnProperty("BattleWhichSide"))
                writer.uint32(/* id 85, wireType 0 =*/680).int32(message.BattleWhichSide);
            if (message.LastMailID != null && message.hasOwnProperty("LastMailID"))
                writer.uint32(/* id 86, wireType 0 =*/688).int32(message.LastMailID);
            if (message.IsVIP != null && message.hasOwnProperty("IsVIP"))
                writer.uint32(/* id 87, wireType 0 =*/696).int32(message.IsVIP);
            if (message.OnceAwardFlag != null && message.hasOwnProperty("OnceAwardFlag"))
                writer.uint32(/* id 88, wireType 0 =*/704).int64(message.OnceAwardFlag);
            if (message.Gold != null && message.hasOwnProperty("Gold"))
                writer.uint32(/* id 89, wireType 0 =*/712).int32(message.Gold);
            if (message.DSHideStart != null && message.hasOwnProperty("DSHideStart"))
                writer.uint32(/* id 90, wireType 0 =*/720).int64(message.DSHideStart);
            if (message.RoleCommonUseIntPamams != null && message.RoleCommonUseIntPamams.length) {
                writer.uint32(/* id 91, wireType 2 =*/730).fork();
                for (var i = 0; i < message.RoleCommonUseIntPamams.length; ++i)
                    writer.int32(message.RoleCommonUseIntPamams[i]);
                writer.ldelim();
            }
            if (message.FSHuDunSeconds != null && message.hasOwnProperty("FSHuDunSeconds"))
                writer.uint32(/* id 92, wireType 0 =*/736).int32(message.FSHuDunSeconds);
            if (message.ZhongDuStart != null && message.hasOwnProperty("ZhongDuStart"))
                writer.uint32(/* id 93, wireType 0 =*/744).int64(message.ZhongDuStart);
            if (message.ZhongDuSeconds != null && message.hasOwnProperty("ZhongDuSeconds"))
                writer.uint32(/* id 94, wireType 0 =*/752).int32(message.ZhongDuSeconds);
            if (message.KaiFuStartDay != null && message.hasOwnProperty("KaiFuStartDay"))
                writer.uint32(/* id 95, wireType 2 =*/762).string(message.KaiFuStartDay);
            if (message.RegTime != null && message.hasOwnProperty("RegTime"))
                writer.uint32(/* id 96, wireType 2 =*/770).string(message.RegTime);
            if (message.JieriStartDay != null && message.hasOwnProperty("JieriStartDay"))
                writer.uint32(/* id 97, wireType 2 =*/778).string(message.JieriStartDay);
            if (message.JieriDaysNum != null && message.hasOwnProperty("JieriDaysNum"))
                writer.uint32(/* id 98, wireType 0 =*/784).int32(message.JieriDaysNum);
            if (message.HefuStartDay != null && message.hasOwnProperty("HefuStartDay"))
                writer.uint32(/* id 99, wireType 2 =*/794).string(message.HefuStartDay);
            if (message.JieriChengHao != null && message.hasOwnProperty("JieriChengHao"))
                writer.uint32(/* id 100, wireType 0 =*/800).int32(message.JieriChengHao);
            if (message.BuChangStartDay != null && message.hasOwnProperty("BuChangStartDay"))
                writer.uint32(/* id 101, wireType 2 =*/810).string(message.BuChangStartDay);
            if (message.DongJieStart != null && message.hasOwnProperty("DongJieStart"))
                writer.uint32(/* id 102, wireType 0 =*/816).int64(message.DongJieStart);
            if (message.DongJieSeconds != null && message.hasOwnProperty("DongJieSeconds"))
                writer.uint32(/* id 103, wireType 0 =*/824).int32(message.DongJieSeconds);
            if (message.YueduDazhunpanStartDay != null && message.hasOwnProperty("YueduDazhunpanStartDay"))
                writer.uint32(/* id 104, wireType 2 =*/834).string(message.YueduDazhunpanStartDay);
            if (message.YueduDazhunpanStartDayNum != null && message.hasOwnProperty("YueduDazhunpanStartDayNum"))
                writer.uint32(/* id 105, wireType 0 =*/840).int32(message.YueduDazhunpanStartDayNum);
            if (message.RoleStrength != null && message.hasOwnProperty("RoleStrength"))
                writer.uint32(/* id 106, wireType 0 =*/848).int32(message.RoleStrength);
            if (message.RoleIntelligence != null && message.hasOwnProperty("RoleIntelligence"))
                writer.uint32(/* id 107, wireType 0 =*/856).int32(message.RoleIntelligence);
            if (message.RoleDexterity != null && message.hasOwnProperty("RoleDexterity"))
                writer.uint32(/* id 108, wireType 0 =*/864).int32(message.RoleDexterity);
            if (message.RoleConstitution != null && message.hasOwnProperty("RoleConstitution"))
                writer.uint32(/* id 109, wireType 0 =*/872).int32(message.RoleConstitution);
            if (message.ChangeLifeCount != null && message.hasOwnProperty("ChangeLifeCount"))
                writer.uint32(/* id 110, wireType 0 =*/880).int32(message.ChangeLifeCount);
            if (message.TotalPropPoint != null && message.hasOwnProperty("TotalPropPoint"))
                writer.uint32(/* id 111, wireType 0 =*/888).int32(message.TotalPropPoint);
            if (message.IsFlashPlayer != null && message.hasOwnProperty("IsFlashPlayer"))
                writer.uint32(/* id 112, wireType 0 =*/896).int32(message.IsFlashPlayer);
            if (message.AdmiredCount != null && message.hasOwnProperty("AdmiredCount"))
                writer.uint32(/* id 113, wireType 0 =*/904).int32(message.AdmiredCount);
            if (message.CombatForce != null && message.hasOwnProperty("CombatForce"))
                writer.uint32(/* id 114, wireType 0 =*/912).int32(message.CombatForce);
            if (message.AdorationCount != null && message.hasOwnProperty("AdorationCount"))
                writer.uint32(/* id 115, wireType 0 =*/920).int32(message.AdorationCount);
            if (message.DayOnlineSecond != null && message.hasOwnProperty("DayOnlineSecond"))
                writer.uint32(/* id 116, wireType 0 =*/928).int32(message.DayOnlineSecond);
            if (message.SeriesLoginNum != null && message.hasOwnProperty("SeriesLoginNum"))
                writer.uint32(/* id 117, wireType 0 =*/936).int32(message.SeriesLoginNum);
            if (message.AutoAssignPropertyPoint != null && message.hasOwnProperty("AutoAssignPropertyPoint"))
                writer.uint32(/* id 118, wireType 0 =*/944).int32(message.AutoAssignPropertyPoint);
            if (message.OnLineTotalTime != null && message.hasOwnProperty("OnLineTotalTime"))
                writer.uint32(/* id 119, wireType 0 =*/952).int32(message.OnLineTotalTime);
            if (message.AllZhuoYueNum != null && message.hasOwnProperty("AllZhuoYueNum"))
                writer.uint32(/* id 120, wireType 0 =*/960).int32(message.AllZhuoYueNum);
            if (message.VIPLevel != null && message.hasOwnProperty("VIPLevel"))
                writer.uint32(/* id 121, wireType 0 =*/968).int32(message.VIPLevel);
            if (message.OpenGridTime != null && message.hasOwnProperty("OpenGridTime"))
                writer.uint32(/* id 122, wireType 0 =*/976).int32(message.OpenGridTime);
            if (message.OpenPortableGridTime != null && message.hasOwnProperty("OpenPortableGridTime"))
                writer.uint32(/* id 123, wireType 0 =*/984).int32(message.OpenPortableGridTime);
            if (message.MyWingData != null && message.hasOwnProperty("MyWingData"))
                $root.WingData.encode(message.MyWingData, writer.uint32(/* id 124, wireType 2 =*/994).fork()).ldelim();
            if (message.PictureJudgeReferInfo != null && message.hasOwnProperty("PictureJudgeReferInfo"))
                for (var keys = Object.keys(message.PictureJudgeReferInfo), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 125, wireType 2 =*/1002).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.PictureJudgeReferInfo[keys[i]]).ldelim();
            if (message.StarSoulValue != null && message.hasOwnProperty("StarSoulValue"))
                writer.uint32(/* id 126, wireType 0 =*/1008).int32(message.StarSoulValue);
            if (message.StoreYinLiang != null && message.hasOwnProperty("StoreYinLiang"))
                writer.uint32(/* id 127, wireType 0 =*/1016).int64(message.StoreYinLiang);
            if (message.StoreMoney != null && message.hasOwnProperty("StoreMoney"))
                writer.uint32(/* id 128, wireType 0 =*/1024).int64(message.StoreMoney);
            if (message.PlayerRecallStartDay != null && message.hasOwnProperty("PlayerRecallStartDay"))
                writer.uint32(/* id 129, wireType 2 =*/1034).string(message.PlayerRecallStartDay);
            if (message.PlayerRecallDaysNum != null && message.hasOwnProperty("PlayerRecallDaysNum"))
                writer.uint32(/* id 130, wireType 2 =*/1042).string(message.PlayerRecallDaysNum);
            if (message.MyTalentData != null && message.hasOwnProperty("MyTalentData"))
                $root.TalentData.encode(message.MyTalentData, writer.uint32(/* id 131, wireType 2 =*/1050).fork()).ldelim();
            if (message.TianTiRongYao != null && message.hasOwnProperty("TianTiRongYao"))
                writer.uint32(/* id 132, wireType 0 =*/1056).int32(message.TianTiRongYao);
            if (message.FluorescentDiamondData != null && message.hasOwnProperty("FluorescentDiamondData"))
                $root.FluorescentGemData.encode(message.FluorescentDiamondData, writer.uint32(/* id 133, wireType 2 =*/1066).fork()).ldelim();
            if (message.GMAuth != null && message.hasOwnProperty("GMAuth"))
                writer.uint32(/* id 134, wireType 0 =*/1072).int32(message.GMAuth);
            if (message.soulStoneData != null && message.hasOwnProperty("soulStoneData"))
                $root.SoulStoneData.encode(message.soulStoneData, writer.uint32(/* id 135, wireType 2 =*/1082).fork()).ldelim();
            if (message.SettingBitFlags != null && message.hasOwnProperty("SettingBitFlags"))
                writer.uint32(/* id 136, wireType 0 =*/1088).int64(message.SettingBitFlags);
            if (message.SpouseId != null && message.hasOwnProperty("SpouseId"))
                writer.uint32(/* id 137, wireType 0 =*/1096).int32(message.SpouseId);
            if (message.sSpouseName != null && message.hasOwnProperty("sSpouseName"))
                writer.uint32(/* id 138, wireType 2 =*/1106).string(message.sSpouseName);
            if (message.nJunXianLevel != null && message.hasOwnProperty("nJunXianLevel"))
                writer.uint32(/* id 139, wireType 0 =*/1112).int32(message.nJunXianLevel);
            if (message.nIsOnJiJia != null && message.hasOwnProperty("nIsOnJiJia"))
                writer.uint32(/* id 140, wireType 0 =*/1120).int32(message.nIsOnJiJia);
            if (message.weekBhMoney != null && message.hasOwnProperty("weekBhMoney"))
                writer.uint32(/* id 141, wireType 0 =*/1128).int32(message.weekBhMoney);
            if (message.funOpenflagList != null && message.funOpenflagList.length) {
                writer.uint32(/* id 142, wireType 2 =*/1138).fork();
                for (var i = 0; i < message.funOpenflagList.length; ++i)
                    writer.int32(message.funOpenflagList[i]);
                writer.ldelim();
            }
            if (message.MengChongsInBag != null && message.MengChongsInBag.length)
                for (var i = 0; i < message.MengChongsInBag.length; ++i)
                    $root.GoodsData.encode(message.MengChongsInBag[i], writer.uint32(/* id 143, wireType 2 =*/1146).fork()).ldelim();
            if (message.MengchongBagNum != null && message.hasOwnProperty("MengchongBagNum"))
                writer.uint32(/* id 144, wireType 0 =*/1152).int32(message.MengchongBagNum);
            if (message.OpenMengchongGridTime != null && message.hasOwnProperty("OpenMengchongGridTime"))
                writer.uint32(/* id 145, wireType 0 =*/1160).int32(message.OpenMengchongGridTime);
            if (message.QiRiLoginActFinished != null && message.hasOwnProperty("QiRiLoginActFinished"))
                writer.uint32(/* id 146, wireType 0 =*/1168).int32(message.QiRiLoginActFinished);
            if (message.MengchongNameList != null && message.hasOwnProperty("MengchongNameList"))
                for (var keys = Object.keys(message.MengchongNameList), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 147, wireType 2 =*/1178).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.MengchongNameList[keys[i]]).ldelim();
            if (message.activatedTotemList != null && message.activatedTotemList.length)
                for (var i = 0; i < message.activatedTotemList.length; ++i)
                    $root.TotemNetItem.encode(message.activatedTotemList[i], writer.uint32(/* id 148, wireType 2 =*/1186).fork()).ldelim();
            return writer;
        };
    
        /**
         * Decodes a RoleData message from the specified reader or buffer.
         * @function decode
         * @memberof RoleData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoleData} RoleData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoleData(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.RoleName = reader.string();
                    break;
                case 3:
                    message.RoleSex = reader.int32();
                    break;
                case 4:
                    message.Occupation = reader.int32();
                    break;
                case 5:
                    message.Level = reader.int32();
                    break;
                case 6:
                    message.Faction = reader.int32();
                    break;
                case 7:
                    message.Money1 = reader.int32();
                    break;
                case 8:
                    message.Money2 = reader.int32();
                    break;
                case 9:
                    message.Experience = reader.int64();
                    break;
                case 10:
                    message.PKMode = reader.int32();
                    break;
                case 11:
                    message.PKValue = reader.int32();
                    break;
                case 12:
                    message.MapCode = reader.int32();
                    break;
                case 13:
                    message.PosX = reader.int32();
                    break;
                case 14:
                    message.PosY = reader.int32();
                    break;
                case 15:
                    message.RoleDirection = reader.int32();
                    break;
                case 16:
                    message.LifeV = reader.int32();
                    break;
                case 17:
                    message.MaxLifeV = reader.int32();
                    break;
                case 18:
                    message.MagicV = reader.int32();
                    break;
                case 19:
                    message.MaxMagicV = reader.int32();
                    break;
                case 20:
                    message.RolePic = reader.int32();
                    break;
                case 21:
                    message.BagNum = reader.int32();
                    break;
                case 22:
                    if (!(message.TaskDataList && message.TaskDataList.length))
                        message.TaskDataList = [];
                    message.TaskDataList.push($root.TaskData.decode(reader, reader.uint32()));
                    break;
                case 23:
                    if (!(message.GoodsDataList && message.GoodsDataList.length))
                        message.GoodsDataList = [];
                    message.GoodsDataList.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                case 24:
                    message.BodyCode = reader.int32();
                    break;
                case 25:
                    message.WeaponCode = reader.int32();
                    break;
                case 26:
                    if (!(message.SkillDataList && message.SkillDataList.length))
                        message.SkillDataList = [];
                    message.SkillDataList.push($root.SkillData.decode(reader, reader.uint32()));
                    break;
                case 27:
                    message.OtherName = reader.string();
                    break;
                case 28:
                    if (!(message.NPCTaskStateList && message.NPCTaskStateList.length))
                        message.NPCTaskStateList = [];
                    message.NPCTaskStateList.push($root.NPCTaskState.decode(reader, reader.uint32()));
                    break;
                case 29:
                    message.MainQuickBarKeys = reader.string();
                    break;
                case 30:
                    message.OtherQuickBarKeys = reader.string();
                    break;
                case 31:
                    message.LoginNum = reader.int32();
                    break;
                case 32:
                    message.UserMoney = reader.int32();
                    break;
                case 33:
                    message.StallName = reader.string();
                    break;
                case 34:
                    message.TeamID = reader.int32();
                    break;
                case 35:
                    message.LeftFightSeconds = reader.int32();
                    break;
                case 36:
                    message.TotalHorseCount = reader.int32();
                    break;
                case 37:
                    message.HorseDbID = reader.int32();
                    break;
                case 38:
                    message.TotalPetCount = reader.int32();
                    break;
                case 39:
                    message.PetDbID = reader.int32();
                    break;
                case 40:
                    message.InterPower = reader.int32();
                    break;
                case 41:
                    message.TeamLeaderRoleID = reader.int32();
                    break;
                case 42:
                    message.YinLiang = reader.int32();
                    break;
                case 43:
                    message.JingMaiBodyLevel = reader.int32();
                    break;
                case 44:
                    message.JingMaiXueWeiNum = reader.int32();
                    break;
                case 45:
                    message.LastHorseID = reader.int32();
                    break;
                case 46:
                    message.DefaultSkillID = reader.int32();
                    break;
                case 47:
                    message.AutoLifeV = reader.int32();
                    break;
                case 48:
                    message.AutoMagicV = reader.int32();
                    break;
                case 49:
                    if (!(message.BufferDataList && message.BufferDataList.length))
                        message.BufferDataList = [];
                    message.BufferDataList.push($root.BufferData.decode(reader, reader.uint32()));
                    break;
                case 50:
                    if (!(message.MyDailyTaskDataList && message.MyDailyTaskDataList.length))
                        message.MyDailyTaskDataList = [];
                    message.MyDailyTaskDataList.push($root.DailyTaskData.decode(reader, reader.uint32()));
                    break;
                case 51:
                    message.JingMaiOkNum = reader.int32();
                    break;
                case 52:
                    message.MyDailyJingMaiData = $root.DailyJingMaiData.decode(reader, reader.uint32());
                    break;
                case 53:
                    message.NumSkillID = reader.int32();
                    break;
                case 54:
                    message.MyPortableBagData = $root.PortableBagData.decode(reader, reader.uint32());
                    break;
                case 55:
                    message.NewStep = reader.int32();
                    break;
                case 56:
                    message.StepTime = reader.int64();
                    break;
                case 57:
                    message.BigAwardID = reader.int32();
                    break;
                case 58:
                    message.SongLiID = reader.int32();
                    break;
                case 59:
                    if (!(message.FuBenDataList && message.FuBenDataList.length))
                        message.FuBenDataList = [];
                    message.FuBenDataList.push($root.FuBenData.decode(reader, reader.uint32()));
                    break;
                case 60:
                    message.TotalLearnedSkillLevelCount = reader.int32();
                    break;
                case 61:
                    message.CompletedMainTaskID = reader.int32();
                    break;
                case 62:
                    message.PKPoint = reader.int32();
                    break;
                case 63:
                    message.LianZhan = reader.int32();
                    break;
                case 64:
                    message.StartPurpleNameTicks = reader.int64();
                    break;
                case 65:
                    message.MyYaBiaoData = $root.YaBiaoData.decode(reader, reader.uint32());
                    break;
                case 66:
                    message.BattleNameStart = reader.int64();
                    break;
                case 67:
                    message.BattleNameIndex = reader.int32();
                    break;
                case 68:
                    message.CZTaskID = reader.int32();
                    break;
                case 69:
                    message.HeroIndex = reader.int32();
                    break;
                case 70:
                    message.AllQualityIndex = reader.int32();
                    break;
                case 71:
                    message.AllForgeLevelIndex = reader.int32();
                    break;
                case 72:
                    message.AllJewelLevelIndex = reader.int32();
                    break;
                case 73:
                    message.HalfYinLiangPeriod = reader.int32();
                    break;
                case 74:
                    message.ZoneID = reader.int32();
                    break;
                case 75:
                    message.BHName = reader.string();
                    break;
                case 76:
                    message.BHVerify = reader.int32();
                    break;
                case 77:
                    message.BHZhiWu = reader.int32();
                    break;
                case 78:
                    message.BangGong = reader.int32();
                    break;
                case 79:
                    reader.skip().pos++;
                    if (message.BangHuiLingDiItemsDict === $util.emptyObject)
                        message.BangHuiLingDiItemsDict = {};
                    key = reader.int32();
                    reader.pos++;
                    message.BangHuiLingDiItemsDict[key] = $root.BangHuiLingDiItemData.decode(reader, reader.uint32());
                    break;
                case 80:
                    message.HuangDiRoleID = reader.int32();
                    break;
                case 81:
                    message.HuangHou = reader.int32();
                    break;
                case 82:
                    reader.skip().pos++;
                    if (message.PaiHangPosDict === $util.emptyObject)
                        message.PaiHangPosDict = {};
                    key = reader.int32();
                    reader.pos++;
                    message.PaiHangPosDict[key] = reader.int32();
                    break;
                case 83:
                    message.AutoFightingProtect = reader.int32();
                    break;
                case 84:
                    message.FSHuDunStart = reader.int64();
                    break;
                case 85:
                    message.BattleWhichSide = reader.int32();
                    break;
                case 86:
                    message.LastMailID = reader.int32();
                    break;
                case 87:
                    message.IsVIP = reader.int32();
                    break;
                case 88:
                    message.OnceAwardFlag = reader.int64();
                    break;
                case 89:
                    message.Gold = reader.int32();
                    break;
                case 90:
                    message.DSHideStart = reader.int64();
                    break;
                case 91:
                    if (!(message.RoleCommonUseIntPamams && message.RoleCommonUseIntPamams.length))
                        message.RoleCommonUseIntPamams = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.RoleCommonUseIntPamams.push(reader.int32());
                    } else
                        message.RoleCommonUseIntPamams.push(reader.int32());
                    break;
                case 92:
                    message.FSHuDunSeconds = reader.int32();
                    break;
                case 93:
                    message.ZhongDuStart = reader.int64();
                    break;
                case 94:
                    message.ZhongDuSeconds = reader.int32();
                    break;
                case 95:
                    message.KaiFuStartDay = reader.string();
                    break;
                case 96:
                    message.RegTime = reader.string();
                    break;
                case 97:
                    message.JieriStartDay = reader.string();
                    break;
                case 98:
                    message.JieriDaysNum = reader.int32();
                    break;
                case 99:
                    message.HefuStartDay = reader.string();
                    break;
                case 100:
                    message.JieriChengHao = reader.int32();
                    break;
                case 101:
                    message.BuChangStartDay = reader.string();
                    break;
                case 102:
                    message.DongJieStart = reader.int64();
                    break;
                case 103:
                    message.DongJieSeconds = reader.int32();
                    break;
                case 104:
                    message.YueduDazhunpanStartDay = reader.string();
                    break;
                case 105:
                    message.YueduDazhunpanStartDayNum = reader.int32();
                    break;
                case 106:
                    message.RoleStrength = reader.int32();
                    break;
                case 107:
                    message.RoleIntelligence = reader.int32();
                    break;
                case 108:
                    message.RoleDexterity = reader.int32();
                    break;
                case 109:
                    message.RoleConstitution = reader.int32();
                    break;
                case 110:
                    message.ChangeLifeCount = reader.int32();
                    break;
                case 111:
                    message.TotalPropPoint = reader.int32();
                    break;
                case 112:
                    message.IsFlashPlayer = reader.int32();
                    break;
                case 113:
                    message.AdmiredCount = reader.int32();
                    break;
                case 114:
                    message.CombatForce = reader.int32();
                    break;
                case 115:
                    message.AdorationCount = reader.int32();
                    break;
                case 116:
                    message.DayOnlineSecond = reader.int32();
                    break;
                case 117:
                    message.SeriesLoginNum = reader.int32();
                    break;
                case 118:
                    message.AutoAssignPropertyPoint = reader.int32();
                    break;
                case 119:
                    message.OnLineTotalTime = reader.int32();
                    break;
                case 120:
                    message.AllZhuoYueNum = reader.int32();
                    break;
                case 121:
                    message.VIPLevel = reader.int32();
                    break;
                case 122:
                    message.OpenGridTime = reader.int32();
                    break;
                case 123:
                    message.OpenPortableGridTime = reader.int32();
                    break;
                case 124:
                    message.MyWingData = $root.WingData.decode(reader, reader.uint32());
                    break;
                case 125:
                    reader.skip().pos++;
                    if (message.PictureJudgeReferInfo === $util.emptyObject)
                        message.PictureJudgeReferInfo = {};
                    key = reader.int32();
                    reader.pos++;
                    message.PictureJudgeReferInfo[key] = reader.int32();
                    break;
                case 126:
                    message.StarSoulValue = reader.int32();
                    break;
                case 127:
                    message.StoreYinLiang = reader.int64();
                    break;
                case 128:
                    message.StoreMoney = reader.int64();
                    break;
                case 129:
                    message.PlayerRecallStartDay = reader.string();
                    break;
                case 130:
                    message.PlayerRecallDaysNum = reader.string();
                    break;
                case 131:
                    message.MyTalentData = $root.TalentData.decode(reader, reader.uint32());
                    break;
                case 132:
                    message.TianTiRongYao = reader.int32();
                    break;
                case 133:
                    message.FluorescentDiamondData = $root.FluorescentGemData.decode(reader, reader.uint32());
                    break;
                case 134:
                    message.GMAuth = reader.int32();
                    break;
                case 135:
                    message.soulStoneData = $root.SoulStoneData.decode(reader, reader.uint32());
                    break;
                case 136:
                    message.SettingBitFlags = reader.int64();
                    break;
                case 137:
                    message.SpouseId = reader.int32();
                    break;
                case 138:
                    message.sSpouseName = reader.string();
                    break;
                case 139:
                    message.nJunXianLevel = reader.int32();
                    break;
                case 140:
                    message.nIsOnJiJia = reader.int32();
                    break;
                case 141:
                    message.weekBhMoney = reader.int32();
                    break;
                case 142:
                    if (!(message.funOpenflagList && message.funOpenflagList.length))
                        message.funOpenflagList = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.funOpenflagList.push(reader.int32());
                    } else
                        message.funOpenflagList.push(reader.int32());
                    break;
                case 143:
                    if (!(message.MengChongsInBag && message.MengChongsInBag.length))
                        message.MengChongsInBag = [];
                    message.MengChongsInBag.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                case 144:
                    message.MengchongBagNum = reader.int32();
                    break;
                case 145:
                    message.OpenMengchongGridTime = reader.int32();
                    break;
                case 146:
                    message.QiRiLoginActFinished = reader.int32();
                    break;
                case 147:
                    reader.skip().pos++;
                    if (message.MengchongNameList === $util.emptyObject)
                        message.MengchongNameList = {};
                    key = reader.int32();
                    reader.pos++;
                    message.MengchongNameList[key] = reader.string();
                    break;
                case 148:
                    if (!(message.activatedTotemList && message.activatedTotemList.length))
                        message.activatedTotemList = [];
                    message.activatedTotemList.push($root.TotemNetItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return RoleData;
    })();
    
    $root.NPCRole = (function() {
    
        /**
         * Properties of a NPCRole.
         * @exports INPCRole
         * @interface INPCRole
         * @property {number|null} [NpcID] NPC的角色ID
         * @property {number|null} [PosX] 格子X坐标
         * @property {number|null} [PosY] 格子Y坐标
         * @property {number|null} [MapCode] 地图编码
         * @property {string|null} [RoleString] NPC角色基础配置数据
         * @property {number|null} [Dir] npc的方向
         */
    
        /**
         * Constructs a new NPCRole.
         * @exports NPCRole
         * @classdesc NPC角色的数据,主要用于九宫格移动时客户端动态创建NPC使用
         * @implements INPCRole
         * @constructor
         * @param {INPCRole=} [properties] Properties to set
         */
        function NPCRole(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * NPC的角色ID
         * @member {number} NpcID
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.NpcID = 0;
    
        /**
         * 格子X坐标
         * @member {number} PosX
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.PosX = 0;
    
        /**
         * 格子Y坐标
         * @member {number} PosY
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.PosY = 0;
    
        /**
         * 地图编码
         * @member {number} MapCode
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.MapCode = 0;
    
        /**
         * NPC角色基础配置数据
         * @member {string} RoleString
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.RoleString = "";
    
        /**
         * npc的方向
         * @member {number} Dir
         * @memberof NPCRole
         * @instance
         */
        NPCRole.prototype.Dir = 0;
    
        /**
         * Encodes the specified NPCRole message. Does not implicitly {@link NPCRole.verify|verify} messages.
         * @function encode
         * @memberof NPCRole
         * @static
         * @param {INPCRole} message NPCRole message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NPCRole.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.NpcID != null && message.hasOwnProperty("NpcID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.NpcID);
            if (message.PosX != null && message.hasOwnProperty("PosX"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.PosX);
            if (message.PosY != null && message.hasOwnProperty("PosY"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.PosY);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.MapCode);
            if (message.RoleString != null && message.hasOwnProperty("RoleString"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.RoleString);
            if (message.Dir != null && message.hasOwnProperty("Dir"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Dir);
            return writer;
        };
    
        /**
         * Decodes a NPCRole message from the specified reader or buffer.
         * @function decode
         * @memberof NPCRole
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NPCRole} NPCRole
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NPCRole.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NPCRole();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.NpcID = reader.int32();
                    break;
                case 2:
                    message.PosX = reader.int32();
                    break;
                case 3:
                    message.PosY = reader.int32();
                    break;
                case 4:
                    message.MapCode = reader.int32();
                    break;
                case 5:
                    message.RoleString = reader.string();
                    break;
                case 6:
                    message.Dir = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return NPCRole;
    })();
    
    $root.MarriageData = (function() {
    
        /**
         * Properties of a MarriageData.
         * @exports IMarriageData
         * @interface IMarriageData
         * @property {number|null} [nSpouseID] 配偶的ID
         * @property {number|null} [byMarrytype] 类型 -1 = 未结婚 1 = 丈夫 2 = 妻子  // TODO... 原始数据类型为sbyte
         * @property {number|null} [nRingID] 婚戒ID
         * @property {number|null} [nGoodwillexp] 亲密度
         * @property {number|null} [byGoodwillstar] 亲密星级
         * @property {number|null} [byGoodwilllevel] 亲密阶数
         * @property {number|null} [nGivenrose] 已收玫瑰数量
         * @property {string|null} [strLovemessage] 爱情宣言
         * @property {number|null} [byAutoReject] 自动拒绝求婚
         */
    
        /**
         * Constructs a new MarriageData.
         * @exports MarriageData
         * @classdesc 结婚数据
         * @implements IMarriageData
         * @constructor
         * @param {IMarriageData=} [properties] Properties to set
         */
        function MarriageData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 配偶的ID
         * @member {number} nSpouseID
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.nSpouseID = 0;
    
        /**
         * 类型 -1 = 未结婚 1 = 丈夫 2 = 妻子  // TODO... 原始数据类型为sbyte
         * @member {number} byMarrytype
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.byMarrytype = 0;
    
        /**
         * 婚戒ID
         * @member {number} nRingID
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.nRingID = 0;
    
        /**
         * 亲密度
         * @member {number} nGoodwillexp
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.nGoodwillexp = 0;
    
        /**
         * 亲密星级
         * @member {number} byGoodwillstar
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.byGoodwillstar = 0;
    
        /**
         * 亲密阶数
         * @member {number} byGoodwilllevel
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.byGoodwilllevel = 0;
    
        /**
         * 已收玫瑰数量
         * @member {number} nGivenrose
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.nGivenrose = 0;
    
        /**
         * 爱情宣言
         * @member {string} strLovemessage
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.strLovemessage = "";
    
        /**
         * 自动拒绝求婚
         * @member {number} byAutoReject
         * @memberof MarriageData
         * @instance
         */
        MarriageData.prototype.byAutoReject = 0;
    
        /**
         * Encodes the specified MarriageData message. Does not implicitly {@link MarriageData.verify|verify} messages.
         * @function encode
         * @memberof MarriageData
         * @static
         * @param {IMarriageData} message MarriageData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarriageData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nSpouseID != null && message.hasOwnProperty("nSpouseID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nSpouseID);
            if (message.byMarrytype != null && message.hasOwnProperty("byMarrytype"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.byMarrytype);
            if (message.nRingID != null && message.hasOwnProperty("nRingID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.nRingID);
            if (message.nGoodwillexp != null && message.hasOwnProperty("nGoodwillexp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.nGoodwillexp);
            if (message.byGoodwillstar != null && message.hasOwnProperty("byGoodwillstar"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.byGoodwillstar);
            if (message.byGoodwilllevel != null && message.hasOwnProperty("byGoodwilllevel"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.byGoodwilllevel);
            if (message.nGivenrose != null && message.hasOwnProperty("nGivenrose"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.nGivenrose);
            if (message.strLovemessage != null && message.hasOwnProperty("strLovemessage"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.strLovemessage);
            if (message.byAutoReject != null && message.hasOwnProperty("byAutoReject"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.byAutoReject);
            return writer;
        };
    
        /**
         * Decodes a MarriageData message from the specified reader or buffer.
         * @function decode
         * @memberof MarriageData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MarriageData} MarriageData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarriageData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarriageData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nSpouseID = reader.int32();
                    break;
                case 2:
                    message.byMarrytype = reader.int32();
                    break;
                case 3:
                    message.nRingID = reader.int32();
                    break;
                case 4:
                    message.nGoodwillexp = reader.int32();
                    break;
                case 5:
                    message.byGoodwillstar = reader.int32();
                    break;
                case 6:
                    message.byGoodwilllevel = reader.int32();
                    break;
                case 7:
                    message.nGivenrose = reader.int32();
                    break;
                case 8:
                    message.strLovemessage = reader.string();
                    break;
                case 9:
                    message.byAutoReject = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MarriageData;
    })();
    
    $root.MarriageData_EX = (function() {
    
        /**
         * Properties of a MarriageData_EX.
         * @exports IMarriageData_EX
         * @interface IMarriageData_EX
         * @property {IMarriageData|null} [myMarriageData] 结婚数据
         * @property {string|null} [roleName] 玩家名称
         * @property {number|null} [occupationId] 角色职业
         */
    
        /**
         * Constructs a new MarriageData_EX.
         * @exports MarriageData_EX
         * @classdesc 结婚数据
         * @implements IMarriageData_EX
         * @constructor
         * @param {IMarriageData_EX=} [properties] Properties to set
         */
        function MarriageData_EX(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 结婚数据
         * @member {IMarriageData|null|undefined} myMarriageData
         * @memberof MarriageData_EX
         * @instance
         */
        MarriageData_EX.prototype.myMarriageData = null;
    
        /**
         * 玩家名称
         * @member {string} roleName
         * @memberof MarriageData_EX
         * @instance
         */
        MarriageData_EX.prototype.roleName = "";
    
        /**
         * 角色职业
         * @member {number} occupationId
         * @memberof MarriageData_EX
         * @instance
         */
        MarriageData_EX.prototype.occupationId = 0;
    
        /**
         * Encodes the specified MarriageData_EX message. Does not implicitly {@link MarriageData_EX.verify|verify} messages.
         * @function encode
         * @memberof MarriageData_EX
         * @static
         * @param {IMarriageData_EX} message MarriageData_EX message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarriageData_EX.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.myMarriageData != null && message.hasOwnProperty("myMarriageData"))
                $root.MarriageData.encode(message.myMarriageData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.roleName != null && message.hasOwnProperty("roleName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roleName);
            if (message.occupationId != null && message.hasOwnProperty("occupationId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.occupationId);
            return writer;
        };
    
        /**
         * Decodes a MarriageData_EX message from the specified reader or buffer.
         * @function decode
         * @memberof MarriageData_EX
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MarriageData_EX} MarriageData_EX
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarriageData_EX.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarriageData_EX();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.myMarriageData = $root.MarriageData.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.roleName = reader.string();
                    break;
                case 3:
                    message.occupationId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MarriageData_EX;
    })();
    
    $root.MallSaleData = (function() {
    
        /**
         * Properties of a MallSaleData.
         * @exports IMallSaleData
         * @interface IMallSaleData
         * @property {string|null} [MallXmlString] Mall.xml 字符串
         * @property {string|null} [MallTabXmlString] MallTab.xml 字符串
         * @property {string|null} [QiangGouXmlString] QiangGou.xml 字符串 => 这个xml内部最多有需要的三条数据
         */
    
        /**
         * Constructs a new MallSaleData.
         * @exports MallSaleData
         * @classdesc 商城销售数据
         * @implements IMallSaleData
         * @constructor
         * @param {IMallSaleData=} [properties] Properties to set
         */
        function MallSaleData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Mall.xml 字符串
         * @member {string} MallXmlString
         * @memberof MallSaleData
         * @instance
         */
        MallSaleData.prototype.MallXmlString = "";
    
        /**
         * MallTab.xml 字符串
         * @member {string} MallTabXmlString
         * @memberof MallSaleData
         * @instance
         */
        MallSaleData.prototype.MallTabXmlString = "";
    
        /**
         * QiangGou.xml 字符串 => 这个xml内部最多有需要的三条数据
         * @member {string} QiangGouXmlString
         * @memberof MallSaleData
         * @instance
         */
        MallSaleData.prototype.QiangGouXmlString = "";
    
        /**
         * Encodes the specified MallSaleData message. Does not implicitly {@link MallSaleData.verify|verify} messages.
         * @function encode
         * @memberof MallSaleData
         * @static
         * @param {IMallSaleData} message MallSaleData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallSaleData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.MallXmlString != null && message.hasOwnProperty("MallXmlString"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.MallXmlString);
            if (message.MallTabXmlString != null && message.hasOwnProperty("MallTabXmlString"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.MallTabXmlString);
            if (message.QiangGouXmlString != null && message.hasOwnProperty("QiangGouXmlString"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.QiangGouXmlString);
            return writer;
        };
    
        /**
         * Decodes a MallSaleData message from the specified reader or buffer.
         * @function decode
         * @memberof MallSaleData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MallSaleData} MallSaleData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallSaleData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MallSaleData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.MallXmlString = reader.string();
                    break;
                case 2:
                    message.MallTabXmlString = reader.string();
                    break;
                case 3:
                    message.QiangGouXmlString = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MallSaleData;
    })();
    
    $root.SpriteMoveData = (function() {
    
        /**
         * Properties of a SpriteMoveData.
         * @exports ISpriteMoveData
         * @interface ISpriteMoveData
         * @property {number|null} [roleID] 要开始移动的角色的Id
         * @property {number|null} [mapCode] 角色所在的关卡Id
         * @property {number|null} [action] 角色在移动过程中的行为(跑步?走跳?)
         * @property {number|null} [toX] 目标点坐标(服务器坐标系)
         * @property {number|null} [toY] 目标点坐标(服务器坐标系)
         * @property {number|null} [extAction] 寻路结束后的行为
         * @property {number|null} [fromX] 起始坐标点(服务器坐标系)
         * @property {number|null} [fromY] 起始坐标点(服务器坐标系)
         * @property {number|Long|null} [startMoveTicks] 暂时没有用了,为了兼容性留着
         * @property {string|null} [pathString] 寻路使用的路径点
         */
    
        /**
         * Constructs a new SpriteMoveData.
         * @exports SpriteMoveData
         * @classdesc 向指定目标点移动的消息
         * @implements ISpriteMoveData
         * @constructor
         * @param {ISpriteMoveData=} [properties] Properties to set
         */
        function SpriteMoveData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 要开始移动的角色的Id
         * @member {number} roleID
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.roleID = 0;
    
        /**
         * 角色所在的关卡Id
         * @member {number} mapCode
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.mapCode = 0;
    
        /**
         * 角色在移动过程中的行为(跑步?走跳?)
         * @member {number} action
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.action = 0;
    
        /**
         * 目标点坐标(服务器坐标系)
         * @member {number} toX
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.toX = 0;
    
        /**
         * 目标点坐标(服务器坐标系)
         * @member {number} toY
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.toY = 0;
    
        /**
         * 寻路结束后的行为
         * @member {number} extAction
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.extAction = 0;
    
        /**
         * 起始坐标点(服务器坐标系)
         * @member {number} fromX
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.fromX = 0;
    
        /**
         * 起始坐标点(服务器坐标系)
         * @member {number} fromY
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.fromY = 0;
    
        /**
         * 暂时没有用了,为了兼容性留着
         * @member {number|Long} startMoveTicks
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.startMoveTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 寻路使用的路径点
         * @member {string} pathString
         * @memberof SpriteMoveData
         * @instance
         */
        SpriteMoveData.prototype.pathString = "";
    
        /**
         * Encodes the specified SpriteMoveData message. Does not implicitly {@link SpriteMoveData.verify|verify} messages.
         * @function encode
         * @memberof SpriteMoveData
         * @static
         * @param {ISpriteMoveData} message SpriteMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteMoveData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.mapCode != null && message.hasOwnProperty("mapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapCode);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.action);
            if (message.toX != null && message.hasOwnProperty("toX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.toX);
            if (message.toY != null && message.hasOwnProperty("toY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.toY);
            if (message.extAction != null && message.hasOwnProperty("extAction"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.extAction);
            if (message.fromX != null && message.hasOwnProperty("fromX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.fromX);
            if (message.fromY != null && message.hasOwnProperty("fromY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.fromY);
            if (message.startMoveTicks != null && message.hasOwnProperty("startMoveTicks"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.startMoveTicks);
            if (message.pathString != null && message.hasOwnProperty("pathString"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.pathString);
            return writer;
        };
    
        /**
         * Decodes a SpriteMoveData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteMoveData} SpriteMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteMoveData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteMoveData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.mapCode = reader.int32();
                    break;
                case 3:
                    message.action = reader.int32();
                    break;
                case 4:
                    message.toX = reader.int32();
                    break;
                case 5:
                    message.toY = reader.int32();
                    break;
                case 6:
                    message.extAction = reader.int32();
                    break;
                case 7:
                    message.fromX = reader.int32();
                    break;
                case 8:
                    message.fromY = reader.int32();
                    break;
                case 9:
                    message.startMoveTicks = reader.int64();
                    break;
                case 10:
                    message.pathString = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteMoveData;
    })();
    
    $root.CS_ClickOn = (function() {
    
        /**
         * Properties of a CS_ClickOn.
         * @exports ICS_ClickOn
         * @interface ICS_ClickOn
         * @property {number|null} [RoleId] 要与NPC对话的角色Id(应该是本地玩家的角色Id)
         * @property {number|null} [MapCode] 本地角色所在的关卡Id
         * @property {number|null} [NpcId] 要与之对话的NPC的角色Id
         * @property {number|null} [ExtId] 要与之对话的NPC的数据表Id
         */
    
        /**
         * Constructs a new CS_ClickOn.
         * @exports CS_ClickOn
         * @classdesc 点击NPC的消息(与NPC对话?)
         * @implements ICS_ClickOn
         * @constructor
         * @param {ICS_ClickOn=} [properties] Properties to set
         */
        function CS_ClickOn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 要与NPC对话的角色Id(应该是本地玩家的角色Id)
         * @member {number} RoleId
         * @memberof CS_ClickOn
         * @instance
         */
        CS_ClickOn.prototype.RoleId = 0;
    
        /**
         * 本地角色所在的关卡Id
         * @member {number} MapCode
         * @memberof CS_ClickOn
         * @instance
         */
        CS_ClickOn.prototype.MapCode = 0;
    
        /**
         * 要与之对话的NPC的角色Id
         * @member {number} NpcId
         * @memberof CS_ClickOn
         * @instance
         */
        CS_ClickOn.prototype.NpcId = 0;
    
        /**
         * 要与之对话的NPC的数据表Id
         * @member {number} ExtId
         * @memberof CS_ClickOn
         * @instance
         */
        CS_ClickOn.prototype.ExtId = 0;
    
        /**
         * Encodes the specified CS_ClickOn message. Does not implicitly {@link CS_ClickOn.verify|verify} messages.
         * @function encode
         * @memberof CS_ClickOn
         * @static
         * @param {ICS_ClickOn} message CS_ClickOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CS_ClickOn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleId != null && message.hasOwnProperty("RoleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleId);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MapCode);
            if (message.NpcId != null && message.hasOwnProperty("NpcId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.NpcId);
            if (message.ExtId != null && message.hasOwnProperty("ExtId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ExtId);
            return writer;
        };
    
        /**
         * Decodes a CS_ClickOn message from the specified reader or buffer.
         * @function decode
         * @memberof CS_ClickOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CS_ClickOn} CS_ClickOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CS_ClickOn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CS_ClickOn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleId = reader.int32();
                    break;
                case 2:
                    message.MapCode = reader.int32();
                    break;
                case 3:
                    message.NpcId = reader.int32();
                    break;
                case 4:
                    message.ExtId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return CS_ClickOn;
    })();
    
    $root.NPCData = (function() {
    
        /**
         * Properties of a NPCData.
         * @exports INPCData
         * @interface INPCData
         * @property {number|null} [MapCode] 当前的地图编号
         * @property {number|null} [RoleID] 主角的角色ID
         * @property {number|null} [NPCID] NPC的唯一ID
         * @property {Array.<number>|null} [NewTaskIDs] 尚未接受的任务列表
         * @property {Array.<number>|null} [OperationIDs] 系统功能列表
         * @property {Array.<number>|null} [ScriptIDs] NPC功能脚本列表
         * @property {number|null} [ExtensionID] 扩展ID（NPC表中的模板ID）
         * @property {Array.<number>|null} [NewTaskIDsDoneCount] 尚未接受的任务列表已经完成的次数
         */
    
        /**
         * Constructs a new NPCData.
         * @exports NPCData
         * @classdesc NPC角色的数据定义
         * @implements INPCData
         * @constructor
         * @param {INPCData=} [properties] Properties to set
         */
        function NPCData(properties) {
            this.NewTaskIDs = [];
            this.OperationIDs = [];
            this.ScriptIDs = [];
            this.NewTaskIDsDoneCount = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的地图编号
         * @member {number} MapCode
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.MapCode = 0;
    
        /**
         * 主角的角色ID
         * @member {number} RoleID
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.RoleID = 0;
    
        /**
         * NPC的唯一ID
         * @member {number} NPCID
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.NPCID = 0;
    
        /**
         * 尚未接受的任务列表
         * @member {Array.<number>} NewTaskIDs
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.NewTaskIDs = $util.emptyArray;
    
        /**
         * 系统功能列表
         * @member {Array.<number>} OperationIDs
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.OperationIDs = $util.emptyArray;
    
        /**
         * NPC功能脚本列表
         * @member {Array.<number>} ScriptIDs
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.ScriptIDs = $util.emptyArray;
    
        /**
         * 扩展ID（NPC表中的模板ID）
         * @member {number} ExtensionID
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.ExtensionID = 0;
    
        /**
         * 尚未接受的任务列表已经完成的次数
         * @member {Array.<number>} NewTaskIDsDoneCount
         * @memberof NPCData
         * @instance
         */
        NPCData.prototype.NewTaskIDsDoneCount = $util.emptyArray;
    
        /**
         * Encodes the specified NPCData message. Does not implicitly {@link NPCData.verify|verify} messages.
         * @function encode
         * @memberof NPCData
         * @static
         * @param {INPCData} message NPCData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NPCData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.MapCode);
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RoleID);
            if (message.NPCID != null && message.hasOwnProperty("NPCID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.NPCID);
            if (message.NewTaskIDs != null && message.NewTaskIDs.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.NewTaskIDs.length; ++i)
                    writer.int32(message.NewTaskIDs[i]);
                writer.ldelim();
            }
            if (message.OperationIDs != null && message.OperationIDs.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (var i = 0; i < message.OperationIDs.length; ++i)
                    writer.int32(message.OperationIDs[i]);
                writer.ldelim();
            }
            if (message.ScriptIDs != null && message.ScriptIDs.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.ScriptIDs.length; ++i)
                    writer.int32(message.ScriptIDs[i]);
                writer.ldelim();
            }
            if (message.ExtensionID != null && message.hasOwnProperty("ExtensionID"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.ExtensionID);
            if (message.NewTaskIDsDoneCount != null && message.NewTaskIDsDoneCount.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (var i = 0; i < message.NewTaskIDsDoneCount.length; ++i)
                    writer.int32(message.NewTaskIDsDoneCount[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes a NPCData message from the specified reader or buffer.
         * @function decode
         * @memberof NPCData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NPCData} NPCData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NPCData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NPCData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.MapCode = reader.int32();
                    break;
                case 2:
                    message.RoleID = reader.int32();
                    break;
                case 3:
                    message.NPCID = reader.int32();
                    break;
                case 4:
                    if (!(message.NewTaskIDs && message.NewTaskIDs.length))
                        message.NewTaskIDs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.NewTaskIDs.push(reader.int32());
                    } else
                        message.NewTaskIDs.push(reader.int32());
                    break;
                case 5:
                    if (!(message.OperationIDs && message.OperationIDs.length))
                        message.OperationIDs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.OperationIDs.push(reader.int32());
                    } else
                        message.OperationIDs.push(reader.int32());
                    break;
                case 6:
                    if (!(message.ScriptIDs && message.ScriptIDs.length))
                        message.ScriptIDs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ScriptIDs.push(reader.int32());
                    } else
                        message.ScriptIDs.push(reader.int32());
                    break;
                case 7:
                    message.ExtensionID = reader.int32();
                    break;
                case 8:
                    if (!(message.NewTaskIDsDoneCount && message.NewTaskIDsDoneCount.length))
                        message.NewTaskIDsDoneCount = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.NewTaskIDsDoneCount.push(reader.int32());
                    } else
                        message.NewTaskIDsDoneCount.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return NPCData;
    })();
    
    $root.CS_SprUseGoods = (function() {
    
        /**
         * Properties of a CS_SprUseGoods.
         * @exports ICS_SprUseGoods
         * @interface ICS_SprUseGoods
         * @property {number|null} [RoleId] 角色id
         * @property {number|null} [DbId] 物品dbId
         * @property {number|null} [GoodsId] 物品类型Id
         * @property {number|null} [UseNum] 使用个数
         */
    
        /**
         * Constructs a new CS_SprUseGoods.
         * @exports CS_SprUseGoods
         * @classdesc 使用道具数据
         * @implements ICS_SprUseGoods
         * @constructor
         * @param {ICS_SprUseGoods=} [properties] Properties to set
         */
        function CS_SprUseGoods(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色id
         * @member {number} RoleId
         * @memberof CS_SprUseGoods
         * @instance
         */
        CS_SprUseGoods.prototype.RoleId = 0;
    
        /**
         * 物品dbId
         * @member {number} DbId
         * @memberof CS_SprUseGoods
         * @instance
         */
        CS_SprUseGoods.prototype.DbId = 0;
    
        /**
         * 物品类型Id
         * @member {number} GoodsId
         * @memberof CS_SprUseGoods
         * @instance
         */
        CS_SprUseGoods.prototype.GoodsId = 0;
    
        /**
         * 使用个数
         * @member {number} UseNum
         * @memberof CS_SprUseGoods
         * @instance
         */
        CS_SprUseGoods.prototype.UseNum = 0;
    
        /**
         * Encodes the specified CS_SprUseGoods message. Does not implicitly {@link CS_SprUseGoods.verify|verify} messages.
         * @function encode
         * @memberof CS_SprUseGoods
         * @static
         * @param {ICS_SprUseGoods} message CS_SprUseGoods message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CS_SprUseGoods.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleId != null && message.hasOwnProperty("RoleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleId);
            if (message.DbId != null && message.hasOwnProperty("DbId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DbId);
            if (message.GoodsId != null && message.hasOwnProperty("GoodsId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.GoodsId);
            if (message.UseNum != null && message.hasOwnProperty("UseNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.UseNum);
            return writer;
        };
    
        /**
         * Decodes a CS_SprUseGoods message from the specified reader or buffer.
         * @function decode
         * @memberof CS_SprUseGoods
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CS_SprUseGoods} CS_SprUseGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CS_SprUseGoods.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CS_SprUseGoods();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleId = reader.int32();
                    break;
                case 2:
                    message.DbId = reader.int32();
                    break;
                case 3:
                    message.GoodsId = reader.int32();
                    break;
                case 4:
                    message.UseNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return CS_SprUseGoods;
    })();
    
    $root.EquipPropsData = (function() {
    
        /**
         * Properties of an EquipPropsData.
         * @exports IEquipPropsData
         * @interface IEquipPropsData
         * @property {number|null} [RoleID] EquipPropsData RoleID
         * @property {number|null} [Strength] EquipPropsData Strength
         * @property {number|null} [Intelligence] EquipPropsData Intelligence
         * @property {number|null} [Dexterity] EquipPropsData Dexterity
         * @property {number|null} [Constitution] EquipPropsData Constitution
         * @property {number|null} [MinAttack] EquipPropsData MinAttack
         * @property {number|null} [MaxAttack] EquipPropsData MaxAttack
         * @property {number|null} [MinDefense] EquipPropsData MinDefense
         * @property {number|null} [MaxDefense] EquipPropsData MaxDefense
         * @property {number|null} [MagicSkillIncrease] EquipPropsData MagicSkillIncrease
         * @property {number|null} [MinMAttack] EquipPropsData MinMAttack
         * @property {number|null} [MaxMAttack] EquipPropsData MaxMAttack
         * @property {number|null} [MinMDefense] EquipPropsData MinMDefense
         * @property {number|null} [MaxMDefense] EquipPropsData MaxMDefense
         * @property {number|null} [PhySkillIncrease] EquipPropsData PhySkillIncrease
         * @property {number|null} [MaxHP] EquipPropsData MaxHP
         * @property {number|null} [MaxMP] EquipPropsData MaxMP
         * @property {number|null} [AttackSpeed] EquipPropsData AttackSpeed
         * @property {number|null} [Hit] EquipPropsData Hit
         * @property {number|null} [Dodge] EquipPropsData Dodge
         * @property {number|null} [TotalPropPoint] EquipPropsData TotalPropPoint
         * @property {number|null} [ChangeLifeCount] EquipPropsData ChangeLifeCount
         * @property {number|null} [CombatForce] EquipPropsData CombatForce
         * @property {number|null} [TEMPStrength] EquipPropsData TEMPStrength
         * @property {number|null} [TEMPIntelligsence] EquipPropsData TEMPIntelligsence
         * @property {number|null} [TEMPDexterity] EquipPropsData TEMPDexterity
         * @property {number|null} [TEMPConstitution] EquipPropsData TEMPConstitution
         */
    
        /**
         * Constructs a new EquipPropsData.
         * @exports EquipPropsData
         * @classdesc 角色属性数据
         * @implements IEquipPropsData
         * @constructor
         * @param {IEquipPropsData=} [properties] Properties to set
         */
        function EquipPropsData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * EquipPropsData RoleID.
         * @member {number} RoleID
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.RoleID = 0;
    
        /**
         * EquipPropsData Strength.
         * @member {number} Strength
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Strength = 0;
    
        /**
         * EquipPropsData Intelligence.
         * @member {number} Intelligence
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Intelligence = 0;
    
        /**
         * EquipPropsData Dexterity.
         * @member {number} Dexterity
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Dexterity = 0;
    
        /**
         * EquipPropsData Constitution.
         * @member {number} Constitution
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Constitution = 0;
    
        /**
         * EquipPropsData MinAttack.
         * @member {number} MinAttack
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MinAttack = 0;
    
        /**
         * EquipPropsData MaxAttack.
         * @member {number} MaxAttack
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxAttack = 0;
    
        /**
         * EquipPropsData MinDefense.
         * @member {number} MinDefense
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MinDefense = 0;
    
        /**
         * EquipPropsData MaxDefense.
         * @member {number} MaxDefense
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxDefense = 0;
    
        /**
         * EquipPropsData MagicSkillIncrease.
         * @member {number} MagicSkillIncrease
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MagicSkillIncrease = 0;
    
        /**
         * EquipPropsData MinMAttack.
         * @member {number} MinMAttack
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MinMAttack = 0;
    
        /**
         * EquipPropsData MaxMAttack.
         * @member {number} MaxMAttack
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxMAttack = 0;
    
        /**
         * EquipPropsData MinMDefense.
         * @member {number} MinMDefense
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MinMDefense = 0;
    
        /**
         * EquipPropsData MaxMDefense.
         * @member {number} MaxMDefense
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxMDefense = 0;
    
        /**
         * EquipPropsData PhySkillIncrease.
         * @member {number} PhySkillIncrease
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.PhySkillIncrease = 0;
    
        /**
         * EquipPropsData MaxHP.
         * @member {number} MaxHP
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxHP = 0;
    
        /**
         * EquipPropsData MaxMP.
         * @member {number} MaxMP
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.MaxMP = 0;
    
        /**
         * EquipPropsData AttackSpeed.
         * @member {number} AttackSpeed
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.AttackSpeed = 0;
    
        /**
         * EquipPropsData Hit.
         * @member {number} Hit
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Hit = 0;
    
        /**
         * EquipPropsData Dodge.
         * @member {number} Dodge
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.Dodge = 0;
    
        /**
         * EquipPropsData TotalPropPoint.
         * @member {number} TotalPropPoint
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.TotalPropPoint = 0;
    
        /**
         * EquipPropsData ChangeLifeCount.
         * @member {number} ChangeLifeCount
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.ChangeLifeCount = 0;
    
        /**
         * EquipPropsData CombatForce.
         * @member {number} CombatForce
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.CombatForce = 0;
    
        /**
         * EquipPropsData TEMPStrength.
         * @member {number} TEMPStrength
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.TEMPStrength = 0;
    
        /**
         * EquipPropsData TEMPIntelligsence.
         * @member {number} TEMPIntelligsence
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.TEMPIntelligsence = 0;
    
        /**
         * EquipPropsData TEMPDexterity.
         * @member {number} TEMPDexterity
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.TEMPDexterity = 0;
    
        /**
         * EquipPropsData TEMPConstitution.
         * @member {number} TEMPConstitution
         * @memberof EquipPropsData
         * @instance
         */
        EquipPropsData.prototype.TEMPConstitution = 0;
    
        /**
         * Encodes the specified EquipPropsData message. Does not implicitly {@link EquipPropsData.verify|verify} messages.
         * @function encode
         * @memberof EquipPropsData
         * @static
         * @param {IEquipPropsData} message EquipPropsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EquipPropsData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.Strength != null && message.hasOwnProperty("Strength"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.Strength);
            if (message.Intelligence != null && message.hasOwnProperty("Intelligence"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.Intelligence);
            if (message.Dexterity != null && message.hasOwnProperty("Dexterity"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.Dexterity);
            if (message.Constitution != null && message.hasOwnProperty("Constitution"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.Constitution);
            if (message.MinAttack != null && message.hasOwnProperty("MinAttack"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.MinAttack);
            if (message.MaxAttack != null && message.hasOwnProperty("MaxAttack"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.MaxAttack);
            if (message.MinDefense != null && message.hasOwnProperty("MinDefense"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.MinDefense);
            if (message.MaxDefense != null && message.hasOwnProperty("MaxDefense"))
                writer.uint32(/* id 9, wireType 1 =*/73).double(message.MaxDefense);
            if (message.MagicSkillIncrease != null && message.hasOwnProperty("MagicSkillIncrease"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.MagicSkillIncrease);
            if (message.MinMAttack != null && message.hasOwnProperty("MinMAttack"))
                writer.uint32(/* id 11, wireType 1 =*/89).double(message.MinMAttack);
            if (message.MaxMAttack != null && message.hasOwnProperty("MaxMAttack"))
                writer.uint32(/* id 12, wireType 1 =*/97).double(message.MaxMAttack);
            if (message.MinMDefense != null && message.hasOwnProperty("MinMDefense"))
                writer.uint32(/* id 13, wireType 1 =*/105).double(message.MinMDefense);
            if (message.MaxMDefense != null && message.hasOwnProperty("MaxMDefense"))
                writer.uint32(/* id 14, wireType 1 =*/113).double(message.MaxMDefense);
            if (message.PhySkillIncrease != null && message.hasOwnProperty("PhySkillIncrease"))
                writer.uint32(/* id 15, wireType 1 =*/121).double(message.PhySkillIncrease);
            if (message.MaxHP != null && message.hasOwnProperty("MaxHP"))
                writer.uint32(/* id 16, wireType 1 =*/129).double(message.MaxHP);
            if (message.MaxMP != null && message.hasOwnProperty("MaxMP"))
                writer.uint32(/* id 17, wireType 1 =*/137).double(message.MaxMP);
            if (message.AttackSpeed != null && message.hasOwnProperty("AttackSpeed"))
                writer.uint32(/* id 18, wireType 1 =*/145).double(message.AttackSpeed);
            if (message.Hit != null && message.hasOwnProperty("Hit"))
                writer.uint32(/* id 19, wireType 1 =*/153).double(message.Hit);
            if (message.Dodge != null && message.hasOwnProperty("Dodge"))
                writer.uint32(/* id 20, wireType 1 =*/161).double(message.Dodge);
            if (message.TotalPropPoint != null && message.hasOwnProperty("TotalPropPoint"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.TotalPropPoint);
            if (message.ChangeLifeCount != null && message.hasOwnProperty("ChangeLifeCount"))
                writer.uint32(/* id 22, wireType 0 =*/176).int32(message.ChangeLifeCount);
            if (message.CombatForce != null && message.hasOwnProperty("CombatForce"))
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.CombatForce);
            if (message.TEMPStrength != null && message.hasOwnProperty("TEMPStrength"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.TEMPStrength);
            if (message.TEMPIntelligsence != null && message.hasOwnProperty("TEMPIntelligsence"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.TEMPIntelligsence);
            if (message.TEMPDexterity != null && message.hasOwnProperty("TEMPDexterity"))
                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.TEMPDexterity);
            if (message.TEMPConstitution != null && message.hasOwnProperty("TEMPConstitution"))
                writer.uint32(/* id 27, wireType 0 =*/216).int32(message.TEMPConstitution);
            return writer;
        };
    
        /**
         * Decodes an EquipPropsData message from the specified reader or buffer.
         * @function decode
         * @memberof EquipPropsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {EquipPropsData} EquipPropsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EquipPropsData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EquipPropsData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.Strength = reader.double();
                    break;
                case 3:
                    message.Intelligence = reader.double();
                    break;
                case 4:
                    message.Dexterity = reader.double();
                    break;
                case 5:
                    message.Constitution = reader.double();
                    break;
                case 6:
                    message.MinAttack = reader.double();
                    break;
                case 7:
                    message.MaxAttack = reader.double();
                    break;
                case 8:
                    message.MinDefense = reader.double();
                    break;
                case 9:
                    message.MaxDefense = reader.double();
                    break;
                case 10:
                    message.MagicSkillIncrease = reader.double();
                    break;
                case 11:
                    message.MinMAttack = reader.double();
                    break;
                case 12:
                    message.MaxMAttack = reader.double();
                    break;
                case 13:
                    message.MinMDefense = reader.double();
                    break;
                case 14:
                    message.MaxMDefense = reader.double();
                    break;
                case 15:
                    message.PhySkillIncrease = reader.double();
                    break;
                case 16:
                    message.MaxHP = reader.double();
                    break;
                case 17:
                    message.MaxMP = reader.double();
                    break;
                case 18:
                    message.AttackSpeed = reader.double();
                    break;
                case 19:
                    message.Hit = reader.double();
                    break;
                case 20:
                    message.Dodge = reader.double();
                    break;
                case 21:
                    message.TotalPropPoint = reader.int32();
                    break;
                case 22:
                    message.ChangeLifeCount = reader.int32();
                    break;
                case 23:
                    message.CombatForce = reader.int32();
                    break;
                case 24:
                    message.TEMPStrength = reader.int32();
                    break;
                case 25:
                    message.TEMPIntelligsence = reader.int32();
                    break;
                case 26:
                    message.TEMPDexterity = reader.int32();
                    break;
                case 27:
                    message.TEMPConstitution = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return EquipPropsData;
    })();
    
    $root.AddGoodsData = (function() {
    
        /**
         * Properties of an AddGoodsData.
         * @exports IAddGoodsData
         * @interface IAddGoodsData
         * @property {number|null} [roleID] 道具属于的角色Id
         * @property {number|null} [id] 数据库流水ID
         * @property {number|null} [goodsID] 物品ID
         * @property {number|null} [forgeLevel] 锻造级别
         * @property {number|null} [quality] 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来)
         * @property {number|null} [goodsNum] 物品数量
         * @property {number|null} [binding] 是否绑定的物品(绑定的物品不可交易, 不可摆摊)
         * @property {number|null} [site] 所在的位置(0: 包裹, 1:仓库)
         * @property {string|null} [jewellist] 根据品质随机抽取的扩展属性的索引列表
         * @property {number|null} [newHint] AddGoodsData newHint
         * @property {string|null} [newEndTime] AddGoodsData newEndTime
         * @property {number|null} [addPropIndex] 出售的银两价格
         * @property {number|null} [bornIndex] 增加一个天生属性的百分比
         * @property {number|null} [lucky] 装备的幸运值
         * @property {number|null} [strong] 装备的耐久度--如果是萌宠则表示羁当前经验
         * @property {number|null} [ExcellenceProperty] 卓越信息 -- 一个32位int32 每位代表一个卓越属性
         * @property {number|null} [nAppendPropLev] 追加等级--如果是萌宠则表示羁绊的是哪个坐骑
         * @property {number|null} [ChangeLifeLevForEquip] 装备的重生级别
         * @property {number|null} [bagIndex] 根据品质随机抽取的扩展属性的索引列表
         * @property {Array.<number>|null} [washProps] 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值...
         * @property {Array.<number>|null} [ElementhrtsProps] AddGoodsData ElementhrtsProps
         */
    
        /**
         * Constructs a new AddGoodsData.
         * @exports AddGoodsData
         * @classdesc 通知客户端添加新物品的数据
         * @implements IAddGoodsData
         * @constructor
         * @param {IAddGoodsData=} [properties] Properties to set
         */
        function AddGoodsData(properties) {
            this.washProps = [];
            this.ElementhrtsProps = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 道具属于的角色Id
         * @member {number} roleID
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.roleID = 0;
    
        /**
         * 数据库流水ID
         * @member {number} id
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.id = 0;
    
        /**
         * 物品ID
         * @member {number} goodsID
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.goodsID = 0;
    
        /**
         * 锻造级别
         * @member {number} forgeLevel
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.forgeLevel = 0;
    
        /**
         * 物品的品质(某些装备会分品质，不同的品质属性不同，用户改变属性后要记录下来)
         * @member {number} quality
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.quality = 0;
    
        /**
         * 物品数量
         * @member {number} goodsNum
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.goodsNum = 0;
    
        /**
         * 是否绑定的物品(绑定的物品不可交易, 不可摆摊)
         * @member {number} binding
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.binding = 0;
    
        /**
         * 所在的位置(0: 包裹, 1:仓库)
         * @member {number} site
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.site = 0;
    
        /**
         * 根据品质随机抽取的扩展属性的索引列表
         * @member {string} jewellist
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.jewellist = "";
    
        /**
         * AddGoodsData newHint.
         * @member {number} newHint
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.newHint = 0;
    
        /**
         * AddGoodsData newEndTime.
         * @member {string} newEndTime
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.newEndTime = "";
    
        /**
         * 出售的银两价格
         * @member {number} addPropIndex
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.addPropIndex = 0;
    
        /**
         * 增加一个天生属性的百分比
         * @member {number} bornIndex
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.bornIndex = 0;
    
        /**
         * 装备的幸运值
         * @member {number} lucky
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.lucky = 0;
    
        /**
         * 装备的耐久度--如果是萌宠则表示羁当前经验
         * @member {number} strong
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.strong = 0;
    
        /**
         * 卓越信息 -- 一个32位int32 每位代表一个卓越属性
         * @member {number} ExcellenceProperty
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.ExcellenceProperty = 0;
    
        /**
         * 追加等级--如果是萌宠则表示羁绊的是哪个坐骑
         * @member {number} nAppendPropLev
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.nAppendPropLev = 0;
    
        /**
         * 装备的重生级别
         * @member {number} ChangeLifeLevForEquip
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.ChangeLifeLevForEquip = 0;
    
        /**
         * 根据品质随机抽取的扩展属性的索引列表
         * @member {number} bagIndex
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.bagIndex = 0;
    
        /**
         * 装备洗炼属性 结构: 属性ID|属性值|属性ID|属性值|属性ID|属性值...
         * @member {Array.<number>} washProps
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.washProps = $util.emptyArray;
    
        /**
         * AddGoodsData ElementhrtsProps.
         * @member {Array.<number>} ElementhrtsProps
         * @memberof AddGoodsData
         * @instance
         */
        AddGoodsData.prototype.ElementhrtsProps = $util.emptyArray;
    
        /**
         * Encodes the specified AddGoodsData message. Does not implicitly {@link AddGoodsData.verify|verify} messages.
         * @function encode
         * @memberof AddGoodsData
         * @static
         * @param {IAddGoodsData} message AddGoodsData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddGoodsData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.goodsID != null && message.hasOwnProperty("goodsID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.goodsID);
            if (message.forgeLevel != null && message.hasOwnProperty("forgeLevel"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.forgeLevel);
            if (message.quality != null && message.hasOwnProperty("quality"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.quality);
            if (message.goodsNum != null && message.hasOwnProperty("goodsNum"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.goodsNum);
            if (message.binding != null && message.hasOwnProperty("binding"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.binding);
            if (message.site != null && message.hasOwnProperty("site"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.site);
            if (message.jewellist != null && message.hasOwnProperty("jewellist"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.jewellist);
            if (message.newHint != null && message.hasOwnProperty("newHint"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.newHint);
            if (message.newEndTime != null && message.hasOwnProperty("newEndTime"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.newEndTime);
            if (message.addPropIndex != null && message.hasOwnProperty("addPropIndex"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.addPropIndex);
            if (message.bornIndex != null && message.hasOwnProperty("bornIndex"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.bornIndex);
            if (message.lucky != null && message.hasOwnProperty("lucky"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.lucky);
            if (message.strong != null && message.hasOwnProperty("strong"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.strong);
            if (message.ExcellenceProperty != null && message.hasOwnProperty("ExcellenceProperty"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.ExcellenceProperty);
            if (message.nAppendPropLev != null && message.hasOwnProperty("nAppendPropLev"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.nAppendPropLev);
            if (message.ChangeLifeLevForEquip != null && message.hasOwnProperty("ChangeLifeLevForEquip"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.ChangeLifeLevForEquip);
            if (message.bagIndex != null && message.hasOwnProperty("bagIndex"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.bagIndex);
            if (message.washProps != null && message.washProps.length) {
                writer.uint32(/* id 20, wireType 2 =*/162).fork();
                for (var i = 0; i < message.washProps.length; ++i)
                    writer.int32(message.washProps[i]);
                writer.ldelim();
            }
            if (message.ElementhrtsProps != null && message.ElementhrtsProps.length) {
                writer.uint32(/* id 21, wireType 2 =*/170).fork();
                for (var i = 0; i < message.ElementhrtsProps.length; ++i)
                    writer.int32(message.ElementhrtsProps[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes an AddGoodsData message from the specified reader or buffer.
         * @function decode
         * @memberof AddGoodsData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AddGoodsData} AddGoodsData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddGoodsData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddGoodsData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.goodsID = reader.int32();
                    break;
                case 4:
                    message.forgeLevel = reader.int32();
                    break;
                case 5:
                    message.quality = reader.int32();
                    break;
                case 6:
                    message.goodsNum = reader.int32();
                    break;
                case 7:
                    message.binding = reader.int32();
                    break;
                case 8:
                    message.site = reader.int32();
                    break;
                case 9:
                    message.jewellist = reader.string();
                    break;
                case 10:
                    message.newHint = reader.int32();
                    break;
                case 11:
                    message.newEndTime = reader.string();
                    break;
                case 12:
                    message.addPropIndex = reader.int32();
                    break;
                case 13:
                    message.bornIndex = reader.int32();
                    break;
                case 14:
                    message.lucky = reader.int32();
                    break;
                case 15:
                    message.strong = reader.int32();
                    break;
                case 16:
                    message.ExcellenceProperty = reader.int32();
                    break;
                case 17:
                    message.nAppendPropLev = reader.int32();
                    break;
                case 18:
                    message.ChangeLifeLevForEquip = reader.int32();
                    break;
                case 19:
                    message.bagIndex = reader.int32();
                    break;
                case 20:
                    if (!(message.washProps && message.washProps.length))
                        message.washProps = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.washProps.push(reader.int32());
                    } else
                        message.washProps.push(reader.int32());
                    break;
                case 21:
                    if (!(message.ElementhrtsProps && message.ElementhrtsProps.length))
                        message.ElementhrtsProps = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.ElementhrtsProps.push(reader.int32());
                    } else
                        message.ElementhrtsProps.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return AddGoodsData;
    })();
    
    $root.SCCompTask = (function() {
    
        /**
         * Properties of a SCCompTask.
         * @exports ISCCompTask
         * @interface ISCCompTask
         * @property {number|null} [roleID] 完成任务的角色Id,应该是本地玩家角色Id
         * @property {number|null} [npcID] 任务对应的Npc的角色Id
         * @property {number|null} [taskID] 任务Id
         * @property {number|null} [state] 任务状态
         */
    
        /**
         * Constructs a new SCCompTask.
         * @exports SCCompTask
         * @classdesc 快速接受并完成任务
         * @implements ISCCompTask
         * @constructor
         * @param {ISCCompTask=} [properties] Properties to set
         */
        function SCCompTask(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 完成任务的角色Id,应该是本地玩家角色Id
         * @member {number} roleID
         * @memberof SCCompTask
         * @instance
         */
        SCCompTask.prototype.roleID = 0;
    
        /**
         * 任务对应的Npc的角色Id
         * @member {number} npcID
         * @memberof SCCompTask
         * @instance
         */
        SCCompTask.prototype.npcID = 0;
    
        /**
         * 任务Id
         * @member {number} taskID
         * @memberof SCCompTask
         * @instance
         */
        SCCompTask.prototype.taskID = 0;
    
        /**
         * 任务状态
         * @member {number} state
         * @memberof SCCompTask
         * @instance
         */
        SCCompTask.prototype.state = 0;
    
        /**
         * Encodes the specified SCCompTask message. Does not implicitly {@link SCCompTask.verify|verify} messages.
         * @function encode
         * @memberof SCCompTask
         * @static
         * @param {ISCCompTask} message SCCompTask message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCCompTask.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.npcID != null && message.hasOwnProperty("npcID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.npcID);
            if (message.taskID != null && message.hasOwnProperty("taskID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.taskID);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.state);
            return writer;
        };
    
        /**
         * Decodes a SCCompTask message from the specified reader or buffer.
         * @function decode
         * @memberof SCCompTask
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCCompTask} SCCompTask
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCCompTask.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCCompTask();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.npcID = reader.int32();
                    break;
                case 3:
                    message.taskID = reader.int32();
                    break;
                case 4:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCCompTask;
    })();
    
    $root.SCModGoods = (function() {
    
        /**
         * Properties of a SCModGoods.
         * @exports ISCModGoods
         * @interface ISCModGoods
         * @property {number|null} [State] 结果
         * @property {number|null} [ModType] 修改类型
         * @property {number|null} [ID] 道具DBID
         * @property {number|null} [IsUsing] 是否正在使用
         * @property {number|null} [Site] 位置（背包、仓库...）
         * @property {number|null} [Count] 个数
         * @property {number|null} [BagIndex] 所在包里位置索引
         * @property {number|null} [NewHint] 新提示
         * @property {string|null} [sParam] 参数
         */
    
        /**
         * Constructs a new SCModGoods.
         * @exports SCModGoods
         * @classdesc 修改道具返回
         * @implements ISCModGoods
         * @constructor
         * @param {ISCModGoods=} [properties] Properties to set
         */
        function SCModGoods(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 结果
         * @member {number} State
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.State = 0;
    
        /**
         * 修改类型
         * @member {number} ModType
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.ModType = 0;
    
        /**
         * 道具DBID
         * @member {number} ID
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.ID = 0;
    
        /**
         * 是否正在使用
         * @member {number} IsUsing
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.IsUsing = 0;
    
        /**
         * 位置（背包、仓库...）
         * @member {number} Site
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.Site = 0;
    
        /**
         * 个数
         * @member {number} Count
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.Count = 0;
    
        /**
         * 所在包里位置索引
         * @member {number} BagIndex
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.BagIndex = 0;
    
        /**
         * 新提示
         * @member {number} NewHint
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.NewHint = 0;
    
        /**
         * 参数
         * @member {string} sParam
         * @memberof SCModGoods
         * @instance
         */
        SCModGoods.prototype.sParam = "";
    
        /**
         * Encodes the specified SCModGoods message. Does not implicitly {@link SCModGoods.verify|verify} messages.
         * @function encode
         * @memberof SCModGoods
         * @static
         * @param {ISCModGoods} message SCModGoods message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCModGoods.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.State);
            if (message.ModType != null && message.hasOwnProperty("ModType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ModType);
            if (message.ID != null && message.hasOwnProperty("ID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.ID);
            if (message.IsUsing != null && message.hasOwnProperty("IsUsing"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.IsUsing);
            if (message.Site != null && message.hasOwnProperty("Site"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Site);
            if (message.Count != null && message.hasOwnProperty("Count"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Count);
            if (message.BagIndex != null && message.hasOwnProperty("BagIndex"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.BagIndex);
            if (message.NewHint != null && message.hasOwnProperty("NewHint"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.NewHint);
            if (message.sParam != null && message.hasOwnProperty("sParam"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.sParam);
            return writer;
        };
    
        /**
         * Decodes a SCModGoods message from the specified reader or buffer.
         * @function decode
         * @memberof SCModGoods
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCModGoods} SCModGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCModGoods.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCModGoods();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.State = reader.int32();
                    break;
                case 2:
                    message.ModType = reader.int32();
                    break;
                case 3:
                    message.ID = reader.int32();
                    break;
                case 4:
                    message.IsUsing = reader.int32();
                    break;
                case 5:
                    message.Site = reader.int32();
                    break;
                case 6:
                    message.Count = reader.int32();
                    break;
                case 7:
                    message.BagIndex = reader.int32();
                    break;
                case 8:
                    message.NewHint = reader.int32();
                    break;
                case 9:
                    message.sParam = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCModGoods;
    })();
    
    $root.S2CResetBag = (function() {
    
        /**
         * Properties of a S2CResetBag.
         * @exports IS2CResetBag
         * @interface IS2CResetBag
         * @property {Array.<IGoodsData>|null} [GoodsDataList] 物品数据列表
         */
    
        /**
         * Constructs a new S2CResetBag.
         * @exports S2CResetBag
         * @classdesc 整理背包返回
         * @implements IS2CResetBag
         * @constructor
         * @param {IS2CResetBag=} [properties] Properties to set
         */
        function S2CResetBag(properties) {
            this.GoodsDataList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 物品数据列表
         * @member {Array.<IGoodsData>} GoodsDataList
         * @memberof S2CResetBag
         * @instance
         */
        S2CResetBag.prototype.GoodsDataList = $util.emptyArray;
    
        /**
         * Encodes the specified S2CResetBag message. Does not implicitly {@link S2CResetBag.verify|verify} messages.
         * @function encode
         * @memberof S2CResetBag
         * @static
         * @param {IS2CResetBag} message S2CResetBag message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CResetBag.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.GoodsDataList != null && message.GoodsDataList.length)
                for (var i = 0; i < message.GoodsDataList.length; ++i)
                    $root.GoodsData.encode(message.GoodsDataList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };
    
        /**
         * Decodes a S2CResetBag message from the specified reader or buffer.
         * @function decode
         * @memberof S2CResetBag
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {S2CResetBag} S2CResetBag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CResetBag.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.S2CResetBag();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.GoodsDataList && message.GoodsDataList.length))
                        message.GoodsDataList = [];
                    message.GoodsDataList.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return S2CResetBag;
    })();
    
    $root.MonsterData = (function() {
    
        /**
         * Properties of a MonsterData.
         * @exports IMonsterData
         * @interface IMonsterData
         * @property {number|null} [RoleID] 当前的角色ID
         * @property {string|null} [RoleName] 当前的角色ID
         * @property {number|null} [RoleSex] 当前角色的性别
         * @property {number|null} [Level] 角色级别
         * @property {number|null} [Experience] 当前的经验
         * @property {number|null} [PosX] 当前所在的位置X坐标
         * @property {number|null} [PosY] 当前所在的位置Y坐标
         * @property {number|null} [RoleDirection] 当前的方向
         * @property {number|null} [LifeV] 当前的生命值
         * @property {number|null} [MaxLifeV] 当前的生命值
         * @property {number|null} [MagicV] 当前的魔法值
         * @property {number|null} [MaxMagicV] 当前的魔法值
         * @property {number|null} [EquipmentBody] 获取或设置精灵当前衣服代码
         * @property {number|null} [ExtensionID] 扩展ID
         * @property {number|null} [MonsterType] 怪物的类型
         * @property {number|null} [MasterRoleID] 怪物主人的角色ID 必须是玩家角色
         * @property {number|null} [AiControlType] 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用
         * @property {string|null} [AnimalSound] 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用
         * @property {number|null} [MonsterLevel] 怪物的级别
         * @property {number|Long|null} [ZhongDuStart] 中毒开始的时间
         * @property {number|null} [ZhongDuSeconds] 中毒持续的秒数
         * @property {number|Long|null} [FaintStart] 昏迷开始时间
         * @property {number|null} [FaintSeconds] 昏迷持续的秒数
         * @property {number|null} [BattleWitchSide] 所属阵营
         * @property {number|null} [PlayBirthAni] 是否播放出生动作 0 不播放  1 播放
         * @property {number|null} [FallBelongToRoleID] 掉落归属者名称
         * @property {string|null} [FallBelongToName] 掉落归属者RoleID
         */
    
        /**
         * Constructs a new MonsterData.
         * @exports MonsterData
         * @classdesc 创建怪物的消息包
         * @implements IMonsterData
         * @constructor
         * @param {IMonsterData=} [properties] Properties to set
         */
        function MonsterData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的角色ID
         * @member {number} RoleID
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.RoleID = 0;
    
        /**
         * 当前的角色ID
         * @member {string} RoleName
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.RoleName = "";
    
        /**
         * 当前角色的性别
         * @member {number} RoleSex
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.RoleSex = 0;
    
        /**
         * 角色级别
         * @member {number} Level
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.Level = 0;
    
        /**
         * 当前的经验
         * @member {number} Experience
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.Experience = 0;
    
        /**
         * 当前所在的位置X坐标
         * @member {number} PosX
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.PosX = 0;
    
        /**
         * 当前所在的位置Y坐标
         * @member {number} PosY
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.PosY = 0;
    
        /**
         * 当前的方向
         * @member {number} RoleDirection
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.RoleDirection = 0;
    
        /**
         * 当前的生命值
         * @member {number} LifeV
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.LifeV = 0;
    
        /**
         * 当前的生命值
         * @member {number} MaxLifeV
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MaxLifeV = 0;
    
        /**
         * 当前的魔法值
         * @member {number} MagicV
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MagicV = 0;
    
        /**
         * 当前的魔法值
         * @member {number} MaxMagicV
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MaxMagicV = 0;
    
        /**
         * 获取或设置精灵当前衣服代码
         * @member {number} EquipmentBody
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.EquipmentBody = 0;
    
        /**
         * 扩展ID
         * @member {number} ExtensionID
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.ExtensionID = 0;
    
        /**
         * 怪物的类型
         * @member {number} MonsterType
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MonsterType = 0;
    
        /**
         * 怪物主人的角色ID 必须是玩家角色
         * @member {number} MasterRoleID
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MasterRoleID = 0;
    
        /**
         * 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用
         * @member {number} AiControlType
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.AiControlType = 0;
    
        /**
         * 宠物怪的ai类型 默认1 自由攻击 只对道士的宠物怪才有用
         * @member {string} AnimalSound
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.AnimalSound = "";
    
        /**
         * 怪物的级别
         * @member {number} MonsterLevel
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.MonsterLevel = 0;
    
        /**
         * 中毒开始的时间
         * @member {number|Long} ZhongDuStart
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.ZhongDuStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 中毒持续的秒数
         * @member {number} ZhongDuSeconds
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.ZhongDuSeconds = 0;
    
        /**
         * 昏迷开始时间
         * @member {number|Long} FaintStart
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.FaintStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 昏迷持续的秒数
         * @member {number} FaintSeconds
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.FaintSeconds = 0;
    
        /**
         * 所属阵营
         * @member {number} BattleWitchSide
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.BattleWitchSide = 0;
    
        /**
         * 是否播放出生动作 0 不播放  1 播放
         * @member {number} PlayBirthAni
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.PlayBirthAni = 0;
    
        /**
         * 掉落归属者名称
         * @member {number} FallBelongToRoleID
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.FallBelongToRoleID = 0;
    
        /**
         * 掉落归属者RoleID
         * @member {string} FallBelongToName
         * @memberof MonsterData
         * @instance
         */
        MonsterData.prototype.FallBelongToName = "";
    
        /**
         * Encodes the specified MonsterData message. Does not implicitly {@link MonsterData.verify|verify} messages.
         * @function encode
         * @memberof MonsterData
         * @static
         * @param {IMonsterData} message MonsterData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonsterData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.RoleName != null && message.hasOwnProperty("RoleName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.RoleName);
            if (message.RoleSex != null && message.hasOwnProperty("RoleSex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.RoleSex);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Level);
            if (message.Experience != null && message.hasOwnProperty("Experience"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Experience);
            if (message.PosX != null && message.hasOwnProperty("PosX"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.PosX);
            if (message.PosY != null && message.hasOwnProperty("PosY"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.PosY);
            if (message.RoleDirection != null && message.hasOwnProperty("RoleDirection"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.RoleDirection);
            if (message.LifeV != null && message.hasOwnProperty("LifeV"))
                writer.uint32(/* id 9, wireType 1 =*/73).double(message.LifeV);
            if (message.MaxLifeV != null && message.hasOwnProperty("MaxLifeV"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.MaxLifeV);
            if (message.MagicV != null && message.hasOwnProperty("MagicV"))
                writer.uint32(/* id 11, wireType 1 =*/89).double(message.MagicV);
            if (message.MaxMagicV != null && message.hasOwnProperty("MaxMagicV"))
                writer.uint32(/* id 12, wireType 1 =*/97).double(message.MaxMagicV);
            if (message.EquipmentBody != null && message.hasOwnProperty("EquipmentBody"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.EquipmentBody);
            if (message.ExtensionID != null && message.hasOwnProperty("ExtensionID"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.ExtensionID);
            if (message.MonsterType != null && message.hasOwnProperty("MonsterType"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.MonsterType);
            if (message.MasterRoleID != null && message.hasOwnProperty("MasterRoleID"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.MasterRoleID);
            if (message.AiControlType != null && message.hasOwnProperty("AiControlType"))
                writer.uint32(/* id 17, wireType 0 =*/136).uint32(message.AiControlType);
            if (message.AnimalSound != null && message.hasOwnProperty("AnimalSound"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.AnimalSound);
            if (message.MonsterLevel != null && message.hasOwnProperty("MonsterLevel"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.MonsterLevel);
            if (message.ZhongDuStart != null && message.hasOwnProperty("ZhongDuStart"))
                writer.uint32(/* id 20, wireType 0 =*/160).int64(message.ZhongDuStart);
            if (message.ZhongDuSeconds != null && message.hasOwnProperty("ZhongDuSeconds"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.ZhongDuSeconds);
            if (message.FaintStart != null && message.hasOwnProperty("FaintStart"))
                writer.uint32(/* id 22, wireType 0 =*/176).int64(message.FaintStart);
            if (message.FaintSeconds != null && message.hasOwnProperty("FaintSeconds"))
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.FaintSeconds);
            if (message.BattleWitchSide != null && message.hasOwnProperty("BattleWitchSide"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.BattleWitchSide);
            if (message.PlayBirthAni != null && message.hasOwnProperty("PlayBirthAni"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.PlayBirthAni);
            if (message.FallBelongToRoleID != null && message.hasOwnProperty("FallBelongToRoleID"))
                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.FallBelongToRoleID);
            if (message.FallBelongToName != null && message.hasOwnProperty("FallBelongToName"))
                writer.uint32(/* id 27, wireType 2 =*/218).string(message.FallBelongToName);
            return writer;
        };
    
        /**
         * Decodes a MonsterData message from the specified reader or buffer.
         * @function decode
         * @memberof MonsterData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MonsterData} MonsterData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonsterData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonsterData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.RoleName = reader.string();
                    break;
                case 3:
                    message.RoleSex = reader.int32();
                    break;
                case 4:
                    message.Level = reader.int32();
                    break;
                case 5:
                    message.Experience = reader.int32();
                    break;
                case 6:
                    message.PosX = reader.int32();
                    break;
                case 7:
                    message.PosY = reader.int32();
                    break;
                case 8:
                    message.RoleDirection = reader.int32();
                    break;
                case 9:
                    message.LifeV = reader.double();
                    break;
                case 10:
                    message.MaxLifeV = reader.double();
                    break;
                case 11:
                    message.MagicV = reader.double();
                    break;
                case 12:
                    message.MaxMagicV = reader.double();
                    break;
                case 13:
                    message.EquipmentBody = reader.int32();
                    break;
                case 14:
                    message.ExtensionID = reader.int32();
                    break;
                case 15:
                    message.MonsterType = reader.int32();
                    break;
                case 16:
                    message.MasterRoleID = reader.int32();
                    break;
                case 17:
                    message.AiControlType = reader.uint32();
                    break;
                case 18:
                    message.AnimalSound = reader.string();
                    break;
                case 19:
                    message.MonsterLevel = reader.int32();
                    break;
                case 20:
                    message.ZhongDuStart = reader.int64();
                    break;
                case 21:
                    message.ZhongDuSeconds = reader.int32();
                    break;
                case 22:
                    message.FaintStart = reader.int64();
                    break;
                case 23:
                    message.FaintSeconds = reader.int32();
                    break;
                case 24:
                    message.BattleWitchSide = reader.int32();
                    break;
                case 25:
                    message.PlayBirthAni = reader.int32();
                    break;
                case 26:
                    message.FallBelongToRoleID = reader.int32();
                    break;
                case 27:
                    message.FallBelongToName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MonsterData;
    })();
    
    $root.SpriteNotifyOtherMoveData = (function() {
    
        /**
         * Properties of a SpriteNotifyOtherMoveData.
         * @exports ISpriteNotifyOtherMoveData
         * @interface ISpriteNotifyOtherMoveData
         * @property {number|null} [roleID] SpriteNotifyOtherMoveData roleID
         * @property {number|null} [mapCode] SpriteNotifyOtherMoveData mapCode
         * @property {number|null} [action] SpriteNotifyOtherMoveData action
         * @property {number|null} [toX] SpriteNotifyOtherMoveData toX
         * @property {number|null} [toY] SpriteNotifyOtherMoveData toY
         * @property {number|null} [extAction] SpriteNotifyOtherMoveData extAction
         * @property {number|null} [fromX] SpriteNotifyOtherMoveData fromX
         * @property {number|null} [fromY] SpriteNotifyOtherMoveData fromY
         * @property {number|Long|null} [startMoveTicks] SpriteNotifyOtherMoveData startMoveTicks
         * @property {string|null} [pathString] SpriteNotifyOtherMoveData pathString
         * @property {number|null} [moveCost] SpriteNotifyOtherMoveData moveCost
         */
    
        /**
         * Constructs a new SpriteNotifyOtherMoveData.
         * @exports SpriteNotifyOtherMoveData
         * @classdesc 寻路信息, 通知他人自己开始移动
         * @implements ISpriteNotifyOtherMoveData
         * @constructor
         * @param {ISpriteNotifyOtherMoveData=} [properties] Properties to set
         */
        function SpriteNotifyOtherMoveData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SpriteNotifyOtherMoveData roleID.
         * @member {number} roleID
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.roleID = 0;
    
        /**
         * SpriteNotifyOtherMoveData mapCode.
         * @member {number} mapCode
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.mapCode = 0;
    
        /**
         * SpriteNotifyOtherMoveData action.
         * @member {number} action
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.action = 0;
    
        /**
         * SpriteNotifyOtherMoveData toX.
         * @member {number} toX
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.toX = 0;
    
        /**
         * SpriteNotifyOtherMoveData toY.
         * @member {number} toY
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.toY = 0;
    
        /**
         * SpriteNotifyOtherMoveData extAction.
         * @member {number} extAction
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.extAction = 0;
    
        /**
         * SpriteNotifyOtherMoveData fromX.
         * @member {number} fromX
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.fromX = 0;
    
        /**
         * SpriteNotifyOtherMoveData fromY.
         * @member {number} fromY
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.fromY = 0;
    
        /**
         * SpriteNotifyOtherMoveData startMoveTicks.
         * @member {number|Long} startMoveTicks
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.startMoveTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * SpriteNotifyOtherMoveData pathString.
         * @member {string} pathString
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.pathString = "";
    
        /**
         * SpriteNotifyOtherMoveData moveCost.
         * @member {number} moveCost
         * @memberof SpriteNotifyOtherMoveData
         * @instance
         */
        SpriteNotifyOtherMoveData.prototype.moveCost = 0;
    
        /**
         * Encodes the specified SpriteNotifyOtherMoveData message. Does not implicitly {@link SpriteNotifyOtherMoveData.verify|verify} messages.
         * @function encode
         * @memberof SpriteNotifyOtherMoveData
         * @static
         * @param {ISpriteNotifyOtherMoveData} message SpriteNotifyOtherMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteNotifyOtherMoveData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.mapCode != null && message.hasOwnProperty("mapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapCode);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.action);
            if (message.toX != null && message.hasOwnProperty("toX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.toX);
            if (message.toY != null && message.hasOwnProperty("toY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.toY);
            if (message.extAction != null && message.hasOwnProperty("extAction"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.extAction);
            if (message.fromX != null && message.hasOwnProperty("fromX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.fromX);
            if (message.fromY != null && message.hasOwnProperty("fromY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.fromY);
            if (message.startMoveTicks != null && message.hasOwnProperty("startMoveTicks"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.startMoveTicks);
            if (message.pathString != null && message.hasOwnProperty("pathString"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.pathString);
            if (message.moveCost != null && message.hasOwnProperty("moveCost"))
                writer.uint32(/* id 11, wireType 1 =*/89).double(message.moveCost);
            return writer;
        };
    
        /**
         * Decodes a SpriteNotifyOtherMoveData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteNotifyOtherMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteNotifyOtherMoveData} SpriteNotifyOtherMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteNotifyOtherMoveData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteNotifyOtherMoveData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.mapCode = reader.int32();
                    break;
                case 3:
                    message.action = reader.int32();
                    break;
                case 4:
                    message.toX = reader.int32();
                    break;
                case 5:
                    message.toY = reader.int32();
                    break;
                case 6:
                    message.extAction = reader.int32();
                    break;
                case 7:
                    message.fromX = reader.int32();
                    break;
                case 8:
                    message.fromY = reader.int32();
                    break;
                case 9:
                    message.startMoveTicks = reader.int64();
                    break;
                case 10:
                    message.pathString = reader.string();
                    break;
                case 11:
                    message.moveCost = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteNotifyOtherMoveData;
    })();
    
    $root.SCClientHeart = (function() {
    
        /**
         * Properties of a SCClientHeart.
         * @exports ISCClientHeart
         * @interface ISCClientHeart
         * @property {number|null} [RoleID] 玩家的角色Id
         * @property {number|null} [RandToken] 此次登录的令牌
         * @property {number|null} [Ticks] 无效字段,兼容用
         * @property {number|Long|null} [ReportCliRealTick] 客户端上报现实中的tick
         */
    
        /**
         * Constructs a new SCClientHeart.
         * @exports SCClientHeart
         * @classdesc 发送给服务器的心跳消息(每分钟一次?)
         * @implements ISCClientHeart
         * @constructor
         * @param {ISCClientHeart=} [properties] Properties to set
         */
        function SCClientHeart(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 玩家的角色Id
         * @member {number} RoleID
         * @memberof SCClientHeart
         * @instance
         */
        SCClientHeart.prototype.RoleID = 0;
    
        /**
         * 此次登录的令牌
         * @member {number} RandToken
         * @memberof SCClientHeart
         * @instance
         */
        SCClientHeart.prototype.RandToken = 0;
    
        /**
         * 无效字段,兼容用
         * @member {number} Ticks
         * @memberof SCClientHeart
         * @instance
         */
        SCClientHeart.prototype.Ticks = 0;
    
        /**
         * 客户端上报现实中的tick
         * @member {number|Long} ReportCliRealTick
         * @memberof SCClientHeart
         * @instance
         */
        SCClientHeart.prototype.ReportCliRealTick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Encodes the specified SCClientHeart message. Does not implicitly {@link SCClientHeart.verify|verify} messages.
         * @function encode
         * @memberof SCClientHeart
         * @static
         * @param {ISCClientHeart} message SCClientHeart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCClientHeart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.RandToken != null && message.hasOwnProperty("RandToken"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RandToken);
            if (message.Ticks != null && message.hasOwnProperty("Ticks"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Ticks);
            if (message.ReportCliRealTick != null && message.hasOwnProperty("ReportCliRealTick"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.ReportCliRealTick);
            return writer;
        };
    
        /**
         * Decodes a SCClientHeart message from the specified reader or buffer.
         * @function decode
         * @memberof SCClientHeart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCClientHeart} SCClientHeart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCClientHeart.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCClientHeart();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.RandToken = reader.int32();
                    break;
                case 3:
                    message.Ticks = reader.int32();
                    break;
                case 4:
                    message.ReportCliRealTick = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCClientHeart;
    })();
    
    $root.MgiacCodeData = (function() {
    
        /**
         * Properties of a MgiacCodeData.
         * @exports IMgiacCodeData
         * @interface IMgiacCodeData
         * @property {number|null} [RoleID] 玩家的角色Id
         * @property {number|null} [mapCode] 场景id
         * @property {number|null} [magicCode] 技能id
         * @property {number|null} [targetRoleID] 目标id
         */
    
        /**
         * Constructs a new MgiacCodeData.
         * @exports MgiacCodeData
         * @classdesc Represents a MgiacCodeData.
         * @implements IMgiacCodeData
         * @constructor
         * @param {IMgiacCodeData=} [properties] Properties to set
         */
        function MgiacCodeData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 玩家的角色Id
         * @member {number} RoleID
         * @memberof MgiacCodeData
         * @instance
         */
        MgiacCodeData.prototype.RoleID = 0;
    
        /**
         * 场景id
         * @member {number} mapCode
         * @memberof MgiacCodeData
         * @instance
         */
        MgiacCodeData.prototype.mapCode = 0;
    
        /**
         * 技能id
         * @member {number} magicCode
         * @memberof MgiacCodeData
         * @instance
         */
        MgiacCodeData.prototype.magicCode = 0;
    
        /**
         * 目标id
         * @member {number} targetRoleID
         * @memberof MgiacCodeData
         * @instance
         */
        MgiacCodeData.prototype.targetRoleID = 0;
    
        /**
         * Encodes the specified MgiacCodeData message. Does not implicitly {@link MgiacCodeData.verify|verify} messages.
         * @function encode
         * @memberof MgiacCodeData
         * @static
         * @param {IMgiacCodeData} message MgiacCodeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MgiacCodeData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.mapCode != null && message.hasOwnProperty("mapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapCode);
            if (message.magicCode != null && message.hasOwnProperty("magicCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.magicCode);
            if (message.targetRoleID != null && message.hasOwnProperty("targetRoleID"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.targetRoleID);
            return writer;
        };
    
        /**
         * Decodes a MgiacCodeData message from the specified reader or buffer.
         * @function decode
         * @memberof MgiacCodeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MgiacCodeData} MgiacCodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MgiacCodeData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MgiacCodeData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.mapCode = reader.int32();
                    break;
                case 3:
                    message.magicCode = reader.int32();
                    break;
                case 4:
                    message.targetRoleID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MgiacCodeData;
    })();
    
    $root.RoleAction = (function() {
    
        /**
         * Properties of a RoleAction.
         * @exports IRoleAction
         * @interface IRoleAction
         * @property {number|null} [RoleID] 玩家的角色Id
         * @property {number|null} [mapCode] 场景id
         * @property {number|null} [direction] 方向id
         * @property {number|null} [action] 行为id
         * @property {number|null} [toX] 坐标
         * @property {number|null} [toY] 坐标
         * @property {number|null} [targetX] 目标坐标
         * @property {number|null} [targetY] 目标坐标
         * @property {number|null} [yAngel] yAnge
         * @property {number|null} [moveToX] RoleAction moveToX
         * @property {number|null} [moveToY] RoleAction moveToY
         * @property {number|null} [ClientTicks] RoleAction ClientTicks
         */
    
        /**
         * Constructs a new RoleAction.
         * @exports RoleAction
         * @classdesc Represents a RoleAction.
         * @implements IRoleAction
         * @constructor
         * @param {IRoleAction=} [properties] Properties to set
         */
        function RoleAction(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 玩家的角色Id
         * @member {number} RoleID
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.RoleID = 0;
    
        /**
         * 场景id
         * @member {number} mapCode
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.mapCode = 0;
    
        /**
         * 方向id
         * @member {number} direction
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.direction = 0;
    
        /**
         * 行为id
         * @member {number} action
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.action = 0;
    
        /**
         * 坐标
         * @member {number} toX
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.toX = 0;
    
        /**
         * 坐标
         * @member {number} toY
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.toY = 0;
    
        /**
         * 目标坐标
         * @member {number} targetX
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.targetX = 0;
    
        /**
         * 目标坐标
         * @member {number} targetY
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.targetY = 0;
    
        /**
         * yAnge
         * @member {number} yAngel
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.yAngel = 0;
    
        /**
         * RoleAction moveToX.
         * @member {number} moveToX
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.moveToX = 0;
    
        /**
         * RoleAction moveToY.
         * @member {number} moveToY
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.moveToY = 0;
    
        /**
         * RoleAction ClientTicks.
         * @member {number} ClientTicks
         * @memberof RoleAction
         * @instance
         */
        RoleAction.prototype.ClientTicks = 0;
    
        /**
         * Encodes the specified RoleAction message. Does not implicitly {@link RoleAction.verify|verify} messages.
         * @function encode
         * @memberof RoleAction
         * @static
         * @param {IRoleAction} message RoleAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.mapCode != null && message.hasOwnProperty("mapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapCode);
            if (message.direction != null && message.hasOwnProperty("direction"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.direction);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.action);
            if (message.toX != null && message.hasOwnProperty("toX"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.toX);
            if (message.toY != null && message.hasOwnProperty("toY"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.toY);
            if (message.targetX != null && message.hasOwnProperty("targetX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.targetX);
            if (message.targetY != null && message.hasOwnProperty("targetY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.targetY);
            if (message.yAngel != null && message.hasOwnProperty("yAngel"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.yAngel);
            if (message.moveToX != null && message.hasOwnProperty("moveToX"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.moveToX);
            if (message.moveToY != null && message.hasOwnProperty("moveToY"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.moveToY);
            if (message.ClientTicks != null && message.hasOwnProperty("ClientTicks"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.ClientTicks);
            return writer;
        };
    
        /**
         * Decodes a RoleAction message from the specified reader or buffer.
         * @function decode
         * @memberof RoleAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoleAction} RoleAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoleAction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.mapCode = reader.int32();
                    break;
                case 3:
                    message.direction = reader.int32();
                    break;
                case 4:
                    message.action = reader.int32();
                    break;
                case 5:
                    message.toX = reader.int32();
                    break;
                case 6:
                    message.toY = reader.int32();
                    break;
                case 7:
                    message.targetX = reader.int32();
                    break;
                case 8:
                    message.targetY = reader.int32();
                    break;
                case 9:
                    message.yAngel = reader.int32();
                    break;
                case 10:
                    message.moveToX = reader.int32();
                    break;
                case 11:
                    message.moveToY = reader.int32();
                    break;
                case 12:
                    message.ClientTicks = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return RoleAction;
    })();
    
    $root.AttackData = (function() {
    
        /**
         * Properties of an AttackData.
         * @exports IAttackData
         * @interface IAttackData
         * @property {number|null} [roleID] 玩家的角色Id
         * @property {number|null} [roleX] 攻击者的x
         * @property {number|null} [roleY] 攻击者的y
         * @property {number|null} [enemy] 受攻击的id
         * @property {number|null} [enemyX] 受攻击者的x
         * @property {number|null} [enemyY] 受攻击者的y
         * @property {number|null} [realEnemyX] 受攻击者服务器位置x
         * @property {number|null} [realEnemyY] 受攻击者服务器位置y
         * @property {number|null} [magicCode] 技能id
         * @property {number|Long|null} [clientTicks] 客户端上报现实中的tick
         */
    
        /**
         * Constructs a new AttackData.
         * @exports AttackData
         * @classdesc Represents an AttackData.
         * @implements IAttackData
         * @constructor
         * @param {IAttackData=} [properties] Properties to set
         */
        function AttackData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 玩家的角色Id
         * @member {number} roleID
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.roleID = 0;
    
        /**
         * 攻击者的x
         * @member {number} roleX
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.roleX = 0;
    
        /**
         * 攻击者的y
         * @member {number} roleY
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.roleY = 0;
    
        /**
         * 受攻击的id
         * @member {number} enemy
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.enemy = 0;
    
        /**
         * 受攻击者的x
         * @member {number} enemyX
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.enemyX = 0;
    
        /**
         * 受攻击者的y
         * @member {number} enemyY
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.enemyY = 0;
    
        /**
         * 受攻击者服务器位置x
         * @member {number} realEnemyX
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.realEnemyX = 0;
    
        /**
         * 受攻击者服务器位置y
         * @member {number} realEnemyY
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.realEnemyY = 0;
    
        /**
         * 技能id
         * @member {number} magicCode
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.magicCode = 0;
    
        /**
         * 客户端上报现实中的tick
         * @member {number|Long} clientTicks
         * @memberof AttackData
         * @instance
         */
        AttackData.prototype.clientTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Encodes the specified AttackData message. Does not implicitly {@link AttackData.verify|verify} messages.
         * @function encode
         * @memberof AttackData
         * @static
         * @param {IAttackData} message AttackData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.roleX != null && message.hasOwnProperty("roleX"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roleX);
            if (message.roleY != null && message.hasOwnProperty("roleY"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.roleY);
            if (message.enemy != null && message.hasOwnProperty("enemy"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enemy);
            if (message.enemyX != null && message.hasOwnProperty("enemyX"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.enemyX);
            if (message.enemyY != null && message.hasOwnProperty("enemyY"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.enemyY);
            if (message.realEnemyX != null && message.hasOwnProperty("realEnemyX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.realEnemyX);
            if (message.realEnemyY != null && message.hasOwnProperty("realEnemyY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.realEnemyY);
            if (message.magicCode != null && message.hasOwnProperty("magicCode"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.magicCode);
            if (message.clientTicks != null && message.hasOwnProperty("clientTicks"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.clientTicks);
            return writer;
        };
    
        /**
         * Decodes an AttackData message from the specified reader or buffer.
         * @function decode
         * @memberof AttackData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AttackData} AttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AttackData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.roleX = reader.int32();
                    break;
                case 3:
                    message.roleY = reader.int32();
                    break;
                case 4:
                    message.enemy = reader.int32();
                    break;
                case 5:
                    message.enemyX = reader.int32();
                    break;
                case 6:
                    message.enemyY = reader.int32();
                    break;
                case 7:
                    message.realEnemyX = reader.int32();
                    break;
                case 8:
                    message.realEnemyY = reader.int32();
                    break;
                case 9:
                    message.magicCode = reader.int32();
                    break;
                case 10:
                    message.clientTicks = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return AttackData;
    })();
    
    $root.SpriteRelifeData = (function() {
    
        /**
         * Properties of a SpriteRelifeData.
         * @exports ISpriteRelifeData
         * @interface ISpriteRelifeData
         * @property {number|null} [roleID] SpriteRelifeData roleID
         * @property {number|null} [x] SpriteRelifeData x
         * @property {number|null} [y] SpriteRelifeData y
         * @property {number|null} [direction] SpriteRelifeData direction
         * @property {number|null} [lifeV] SpriteRelifeData lifeV
         * @property {number|null} [magicV] SpriteRelifeData magicV
         * @property {number|null} [force] SpriteRelifeData force
         */
    
        /**
         * Constructs a new SpriteRelifeData.
         * @exports SpriteRelifeData
         * @classdesc 精灵回血数据
         * @implements ISpriteRelifeData
         * @constructor
         * @param {ISpriteRelifeData=} [properties] Properties to set
         */
        function SpriteRelifeData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SpriteRelifeData roleID.
         * @member {number} roleID
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.roleID = 0;
    
        /**
         * SpriteRelifeData x.
         * @member {number} x
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.x = 0;
    
        /**
         * SpriteRelifeData y.
         * @member {number} y
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.y = 0;
    
        /**
         * SpriteRelifeData direction.
         * @member {number} direction
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.direction = 0;
    
        /**
         * SpriteRelifeData lifeV.
         * @member {number} lifeV
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.lifeV = 0;
    
        /**
         * SpriteRelifeData magicV.
         * @member {number} magicV
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.magicV = 0;
    
        /**
         * SpriteRelifeData force.
         * @member {number} force
         * @memberof SpriteRelifeData
         * @instance
         */
        SpriteRelifeData.prototype.force = 0;
    
        /**
         * Encodes the specified SpriteRelifeData message. Does not implicitly {@link SpriteRelifeData.verify|verify} messages.
         * @function encode
         * @memberof SpriteRelifeData
         * @static
         * @param {ISpriteRelifeData} message SpriteRelifeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteRelifeData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.direction != null && message.hasOwnProperty("direction"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.direction);
            if (message.lifeV != null && message.hasOwnProperty("lifeV"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.lifeV);
            if (message.magicV != null && message.hasOwnProperty("magicV"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.magicV);
            if (message.force != null && message.hasOwnProperty("force"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.force);
            return writer;
        };
    
        /**
         * Decodes a SpriteRelifeData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteRelifeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteRelifeData} SpriteRelifeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteRelifeData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteRelifeData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.x = reader.int32();
                    break;
                case 3:
                    message.y = reader.int32();
                    break;
                case 4:
                    message.direction = reader.int32();
                    break;
                case 5:
                    message.lifeV = reader.double();
                    break;
                case 6:
                    message.magicV = reader.double();
                    break;
                case 7:
                    message.force = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteRelifeData;
    })();
    
    $root.SpriteAttackResultData = (function() {
    
        /**
         * Properties of a SpriteAttackResultData.
         * @exports ISpriteAttackResultData
         * @interface ISpriteAttackResultData
         * @property {number|null} [enemy] 敌人ID
         * @property {number|null} [burst] 伤害类型
         * @property {number|null} [injure] 伤害值
         * @property {number|null} [enemyLife] 敌人生命值
         * @property {number|Long|null} [newExperience] 获得的经验？
         * @property {number|Long|null} [experience] 主角的当前经验值
         * @property {number|null} [newLevel] 主角的新等级
         * @property {number|null} [MerlinInjuer] 梅林伤害值
         * @property {number|null} [MerlinType] 梅林伤害类型
         */
    
        /**
         * Constructs a new SpriteAttackResultData.
         * @exports SpriteAttackResultData
         * @classdesc 精灵攻击结果
         * @implements ISpriteAttackResultData
         * @constructor
         * @param {ISpriteAttackResultData=} [properties] Properties to set
         */
        function SpriteAttackResultData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 敌人ID
         * @member {number} enemy
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.enemy = 0;
    
        /**
         * 伤害类型
         * @member {number} burst
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.burst = 0;
    
        /**
         * 伤害值
         * @member {number} injure
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.injure = 0;
    
        /**
         * 敌人生命值
         * @member {number} enemyLife
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.enemyLife = 0;
    
        /**
         * 获得的经验？
         * @member {number|Long} newExperience
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.newExperience = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 主角的当前经验值
         * @member {number|Long} experience
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.experience = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 主角的新等级
         * @member {number} newLevel
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.newLevel = 0;
    
        /**
         * 梅林伤害值
         * @member {number} MerlinInjuer
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.MerlinInjuer = 0;
    
        /**
         * 梅林伤害类型
         * @member {number} MerlinType
         * @memberof SpriteAttackResultData
         * @instance
         */
        SpriteAttackResultData.prototype.MerlinType = 0;
    
        /**
         * Encodes the specified SpriteAttackResultData message. Does not implicitly {@link SpriteAttackResultData.verify|verify} messages.
         * @function encode
         * @memberof SpriteAttackResultData
         * @static
         * @param {ISpriteAttackResultData} message SpriteAttackResultData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteAttackResultData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.enemy != null && message.hasOwnProperty("enemy"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enemy);
            if (message.burst != null && message.hasOwnProperty("burst"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.burst);
            if (message.injure != null && message.hasOwnProperty("injure"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.injure);
            if (message.enemyLife != null && message.hasOwnProperty("enemyLife"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.enemyLife);
            if (message.newExperience != null && message.hasOwnProperty("newExperience"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.newExperience);
            if (message.experience != null && message.hasOwnProperty("experience"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.experience);
            if (message.newLevel != null && message.hasOwnProperty("newLevel"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.newLevel);
            if (message.MerlinInjuer != null && message.hasOwnProperty("MerlinInjuer"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.MerlinInjuer);
            if (message.MerlinType != null && message.hasOwnProperty("MerlinType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.MerlinType);
            return writer;
        };
    
        /**
         * Decodes a SpriteAttackResultData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteAttackResultData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteAttackResultData} SpriteAttackResultData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteAttackResultData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteAttackResultData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.enemy = reader.int32();
                    break;
                case 2:
                    message.burst = reader.int32();
                    break;
                case 3:
                    message.injure = reader.int32();
                    break;
                case 4:
                    message.enemyLife = reader.double();
                    break;
                case 5:
                    message.newExperience = reader.int64();
                    break;
                case 6:
                    message.experience = reader.int64();
                    break;
                case 7:
                    message.newLevel = reader.int32();
                    break;
                case 8:
                    message.MerlinInjuer = reader.int32();
                    break;
                case 9:
                    message.MerlinType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteAttackResultData;
    })();
    
    $root.SpriteInjuredData = (function() {
    
        /**
         * Properties of a SpriteInjuredData.
         * @exports ISpriteInjuredData
         * @interface ISpriteInjuredData
         * @property {number|null} [attackerRoleID] SpriteInjuredData attackerRoleID
         * @property {number|null} [injuredRoleID] SpriteInjuredData injuredRoleID
         * @property {number|null} [burst] SpriteInjuredData burst
         * @property {number|null} [injure] SpriteInjuredData injure
         * @property {number|null} [injuredRoleLife] SpriteInjuredData injuredRoleLife
         * @property {number|null} [attackerLevel] SpriteInjuredData attackerLevel
         * @property {number|null} [injuredRoleMaxLifeV] SpriteInjuredData injuredRoleMaxLifeV
         * @property {number|null} [injuredRoleMagic] SpriteInjuredData injuredRoleMagic
         * @property {number|null} [injuredRoleMaxMagicV] SpriteInjuredData injuredRoleMaxMagicV
         * @property {number|null} [hitToGridX] SpriteInjuredData hitToGridX
         * @property {number|null} [hitToGridY] SpriteInjuredData hitToGridY
         * @property {number|null} [MerlinInjuer] 梅林伤害值
         * @property {number|null} [MerlinType] 梅林伤害类型  // TODO... 原始数据类型为sbyte
         */
    
        /**
         * Constructs a new SpriteInjuredData.
         * @exports SpriteInjuredData
         * @classdesc 精灵伤害数据
         * @implements ISpriteInjuredData
         * @constructor
         * @param {ISpriteInjuredData=} [properties] Properties to set
         */
        function SpriteInjuredData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SpriteInjuredData attackerRoleID.
         * @member {number} attackerRoleID
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.attackerRoleID = 0;
    
        /**
         * SpriteInjuredData injuredRoleID.
         * @member {number} injuredRoleID
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injuredRoleID = 0;
    
        /**
         * SpriteInjuredData burst.
         * @member {number} burst
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.burst = 0;
    
        /**
         * SpriteInjuredData injure.
         * @member {number} injure
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injure = 0;
    
        /**
         * SpriteInjuredData injuredRoleLife.
         * @member {number} injuredRoleLife
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injuredRoleLife = 0;
    
        /**
         * SpriteInjuredData attackerLevel.
         * @member {number} attackerLevel
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.attackerLevel = 0;
    
        /**
         * SpriteInjuredData injuredRoleMaxLifeV.
         * @member {number} injuredRoleMaxLifeV
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injuredRoleMaxLifeV = 0;
    
        /**
         * SpriteInjuredData injuredRoleMagic.
         * @member {number} injuredRoleMagic
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injuredRoleMagic = 0;
    
        /**
         * SpriteInjuredData injuredRoleMaxMagicV.
         * @member {number} injuredRoleMaxMagicV
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.injuredRoleMaxMagicV = 0;
    
        /**
         * SpriteInjuredData hitToGridX.
         * @member {number} hitToGridX
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.hitToGridX = 0;
    
        /**
         * SpriteInjuredData hitToGridY.
         * @member {number} hitToGridY
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.hitToGridY = 0;
    
        /**
         * 梅林伤害值
         * @member {number} MerlinInjuer
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.MerlinInjuer = 0;
    
        /**
         * 梅林伤害类型  // TODO... 原始数据类型为sbyte
         * @member {number} MerlinType
         * @memberof SpriteInjuredData
         * @instance
         */
        SpriteInjuredData.prototype.MerlinType = 0;
    
        /**
         * Encodes the specified SpriteInjuredData message. Does not implicitly {@link SpriteInjuredData.verify|verify} messages.
         * @function encode
         * @memberof SpriteInjuredData
         * @static
         * @param {ISpriteInjuredData} message SpriteInjuredData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteInjuredData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.attackerRoleID != null && message.hasOwnProperty("attackerRoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.attackerRoleID);
            if (message.injuredRoleID != null && message.hasOwnProperty("injuredRoleID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.injuredRoleID);
            if (message.burst != null && message.hasOwnProperty("burst"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.burst);
            if (message.injure != null && message.hasOwnProperty("injure"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.injure);
            if (message.injuredRoleLife != null && message.hasOwnProperty("injuredRoleLife"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.injuredRoleLife);
            if (message.attackerLevel != null && message.hasOwnProperty("attackerLevel"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.attackerLevel);
            if (message.injuredRoleMaxLifeV != null && message.hasOwnProperty("injuredRoleMaxLifeV"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.injuredRoleMaxLifeV);
            if (message.injuredRoleMagic != null && message.hasOwnProperty("injuredRoleMagic"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.injuredRoleMagic);
            if (message.injuredRoleMaxMagicV != null && message.hasOwnProperty("injuredRoleMaxMagicV"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.injuredRoleMaxMagicV);
            if (message.hitToGridX != null && message.hasOwnProperty("hitToGridX"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.hitToGridX);
            if (message.hitToGridY != null && message.hasOwnProperty("hitToGridY"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.hitToGridY);
            if (message.MerlinInjuer != null && message.hasOwnProperty("MerlinInjuer"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.MerlinInjuer);
            if (message.MerlinType != null && message.hasOwnProperty("MerlinType"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.MerlinType);
            return writer;
        };
    
        /**
         * Decodes a SpriteInjuredData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteInjuredData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteInjuredData} SpriteInjuredData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteInjuredData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteInjuredData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.attackerRoleID = reader.int32();
                    break;
                case 2:
                    message.injuredRoleID = reader.int32();
                    break;
                case 3:
                    message.burst = reader.int32();
                    break;
                case 4:
                    message.injure = reader.int32();
                    break;
                case 5:
                    message.injuredRoleLife = reader.double();
                    break;
                case 6:
                    message.attackerLevel = reader.int32();
                    break;
                case 7:
                    message.injuredRoleMaxLifeV = reader.int32();
                    break;
                case 8:
                    message.injuredRoleMagic = reader.int32();
                    break;
                case 9:
                    message.injuredRoleMaxMagicV = reader.int32();
                    break;
                case 10:
                    message.hitToGridX = reader.int32();
                    break;
                case 11:
                    message.hitToGridY = reader.int32();
                    break;
                case 12:
                    message.MerlinInjuer = reader.int32();
                    break;
                case 13:
                    message.MerlinType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteInjuredData;
    })();
    
    $root.SpriteHitedData = (function() {
    
        /**
         * Properties of a SpriteHitedData.
         * @exports ISpriteHitedData
         * @interface ISpriteHitedData
         * @property {number|null} [roleId] SpriteHitedData roleId
         * @property {number|null} [enemy] SpriteHitedData enemy
         * @property {number|null} [enemyX] SpriteHitedData enemyX
         * @property {number|null} [enemyY] SpriteHitedData enemyY
         * @property {number|null} [magicAttackID] SpriteHitedData magicAttackID
         * @property {number|null} [yAngle] SpriteHitedData yAngle
         */
    
        /**
         * Constructs a new SpriteHitedData.
         * @exports SpriteHitedData
         * @classdesc 精灵受击
         * @implements ISpriteHitedData
         * @constructor
         * @param {ISpriteHitedData=} [properties] Properties to set
         */
        function SpriteHitedData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SpriteHitedData roleId.
         * @member {number} roleId
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.roleId = 0;
    
        /**
         * SpriteHitedData enemy.
         * @member {number} enemy
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.enemy = 0;
    
        /**
         * SpriteHitedData enemyX.
         * @member {number} enemyX
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.enemyX = 0;
    
        /**
         * SpriteHitedData enemyY.
         * @member {number} enemyY
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.enemyY = 0;
    
        /**
         * SpriteHitedData magicAttackID.
         * @member {number} magicAttackID
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.magicAttackID = 0;
    
        /**
         * SpriteHitedData yAngle.
         * @member {number} yAngle
         * @memberof SpriteHitedData
         * @instance
         */
        SpriteHitedData.prototype.yAngle = 0;
    
        /**
         * Encodes the specified SpriteHitedData message. Does not implicitly {@link SpriteHitedData.verify|verify} messages.
         * @function encode
         * @memberof SpriteHitedData
         * @static
         * @param {ISpriteHitedData} message SpriteHitedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteHitedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleId != null && message.hasOwnProperty("roleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleId);
            if (message.enemy != null && message.hasOwnProperty("enemy"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.enemy);
            if (message.enemyX != null && message.hasOwnProperty("enemyX"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.enemyX);
            if (message.enemyY != null && message.hasOwnProperty("enemyY"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enemyY);
            if (message.magicAttackID != null && message.hasOwnProperty("magicAttackID"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.magicAttackID);
            if (message.yAngle != null && message.hasOwnProperty("yAngle"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.yAngle);
            return writer;
        };
    
        /**
         * Decodes a SpriteHitedData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteHitedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteHitedData} SpriteHitedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteHitedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteHitedData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleId = reader.int32();
                    break;
                case 2:
                    message.enemy = reader.int32();
                    break;
                case 3:
                    message.enemyX = reader.int32();
                    break;
                case 4:
                    message.enemyY = reader.int32();
                    break;
                case 5:
                    message.magicAttackID = reader.int32();
                    break;
                case 6:
                    message.yAngle = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteHitedData;
    })();
    
    $root.SpriteMagicAttackData = (function() {
    
        /**
         * Properties of a SpriteMagicAttackData.
         * @exports ISpriteMagicAttackData
         * @interface ISpriteMagicAttackData
         * @property {number|null} [attackerRoleID] 攻击者
         * @property {number|null} [magicAttackID] 招式ID
         */
    
        /**
         * Constructs a new SpriteMagicAttackData.
         * @exports SpriteMagicAttackData
         * @classdesc 精灵招式攻击数据
         * @implements ISpriteMagicAttackData
         * @constructor
         * @param {ISpriteMagicAttackData=} [properties] Properties to set
         */
        function SpriteMagicAttackData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 攻击者
         * @member {number} attackerRoleID
         * @memberof SpriteMagicAttackData
         * @instance
         */
        SpriteMagicAttackData.prototype.attackerRoleID = 0;
    
        /**
         * 招式ID
         * @member {number} magicAttackID
         * @memberof SpriteMagicAttackData
         * @instance
         */
        SpriteMagicAttackData.prototype.magicAttackID = 0;
    
        /**
         * Encodes the specified SpriteMagicAttackData message. Does not implicitly {@link SpriteMagicAttackData.verify|verify} messages.
         * @function encode
         * @memberof SpriteMagicAttackData
         * @static
         * @param {ISpriteMagicAttackData} message SpriteMagicAttackData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteMagicAttackData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.attackerRoleID != null && message.hasOwnProperty("attackerRoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.attackerRoleID);
            if (message.magicAttackID != null && message.hasOwnProperty("magicAttackID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.magicAttackID);
            return writer;
        };
    
        /**
         * Decodes a SpriteMagicAttackData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteMagicAttackData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteMagicAttackData} SpriteMagicAttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteMagicAttackData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteMagicAttackData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.attackerRoleID = reader.int32();
                    break;
                case 2:
                    message.magicAttackID = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteMagicAttackData;
    })();
    
    $root.SpriteLifeChangeData = (function() {
    
        /**
         * Properties of a SpriteLifeChangeData.
         * @exports ISpriteLifeChangeData
         * @interface ISpriteLifeChangeData
         * @property {number|null} [roleID] 角色ID
         * @property {number|null} [lifeV] 最大血值
         * @property {number|null} [magicV] 最大蓝值
         * @property {number|null} [currentLifeV] 当前血值
         * @property {number|null} [currentMagicV] 当前蓝值
         * @property {number|null} [moveSpeed] 加入移动速度变化时的同步
         */
    
        /**
         * Constructs a new SpriteLifeChangeData.
         * @exports SpriteLifeChangeData
         * @classdesc 精灵生命变化
         * @implements ISpriteLifeChangeData
         * @constructor
         * @param {ISpriteLifeChangeData=} [properties] Properties to set
         */
        function SpriteLifeChangeData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色ID
         * @member {number} roleID
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.roleID = 0;
    
        /**
         * 最大血值
         * @member {number} lifeV
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.lifeV = 0;
    
        /**
         * 最大蓝值
         * @member {number} magicV
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.magicV = 0;
    
        /**
         * 当前血值
         * @member {number} currentLifeV
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.currentLifeV = 0;
    
        /**
         * 当前蓝值
         * @member {number} currentMagicV
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.currentMagicV = 0;
    
        /**
         * 加入移动速度变化时的同步
         * @member {number} moveSpeed
         * @memberof SpriteLifeChangeData
         * @instance
         */
        SpriteLifeChangeData.prototype.moveSpeed = 0;
    
        /**
         * Encodes the specified SpriteLifeChangeData message. Does not implicitly {@link SpriteLifeChangeData.verify|verify} messages.
         * @function encode
         * @memberof SpriteLifeChangeData
         * @static
         * @param {ISpriteLifeChangeData} message SpriteLifeChangeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteLifeChangeData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.lifeV != null && message.hasOwnProperty("lifeV"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.lifeV);
            if (message.magicV != null && message.hasOwnProperty("magicV"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.magicV);
            if (message.currentLifeV != null && message.hasOwnProperty("currentLifeV"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentLifeV);
            if (message.currentMagicV != null && message.hasOwnProperty("currentMagicV"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentMagicV);
            if (message.moveSpeed != null && message.hasOwnProperty("moveSpeed"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.moveSpeed);
            return writer;
        };
    
        /**
         * Decodes a SpriteLifeChangeData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteLifeChangeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteLifeChangeData} SpriteLifeChangeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteLifeChangeData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteLifeChangeData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.lifeV = reader.int32();
                    break;
                case 3:
                    message.magicV = reader.int32();
                    break;
                case 4:
                    message.currentLifeV = reader.int32();
                    break;
                case 5:
                    message.currentMagicV = reader.int32();
                    break;
                case 6:
                    message.moveSpeed = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteLifeChangeData;
    })();
    
    $root.LoadAlreadyData = (function() {
    
        /**
         * Properties of a LoadAlreadyData.
         * @exports ILoadAlreadyData
         * @interface ILoadAlreadyData
         * @property {number|null} [RoleID] LoadAlreadyData RoleID
         * @property {number|null} [MapCode] LoadAlreadyData MapCode
         * @property {number|Long|null} [StartMoveTicks] LoadAlreadyData StartMoveTicks
         * @property {number|null} [CurrentX] LoadAlreadyData CurrentX
         * @property {number|null} [CurrentY] LoadAlreadyData CurrentY
         * @property {number|null} [CurrentDirection] LoadAlreadyData CurrentDirection
         * @property {number|null} [Action] LoadAlreadyData Action
         * @property {number|null} [ToX] LoadAlreadyData ToX
         * @property {number|null} [ToY] LoadAlreadyData ToY
         * @property {number|null} [MoveCost] LoadAlreadyData MoveCost
         * @property {number|null} [ExtAction] LoadAlreadyData ExtAction
         * @property {string|null} [PathString] LoadAlreadyData PathString
         * @property {number|null} [CurrentPathIndex] LoadAlreadyData CurrentPathIndex
         */
    
        /**
         * Constructs a new LoadAlreadyData.
         * @exports LoadAlreadyData
         * @classdesc 角色加载完毕的数据
         * @implements ILoadAlreadyData
         * @constructor
         * @param {ILoadAlreadyData=} [properties] Properties to set
         */
        function LoadAlreadyData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * LoadAlreadyData RoleID.
         * @member {number} RoleID
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.RoleID = 0;
    
        /**
         * LoadAlreadyData MapCode.
         * @member {number} MapCode
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.MapCode = 0;
    
        /**
         * LoadAlreadyData StartMoveTicks.
         * @member {number|Long} StartMoveTicks
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.StartMoveTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * LoadAlreadyData CurrentX.
         * @member {number} CurrentX
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.CurrentX = 0;
    
        /**
         * LoadAlreadyData CurrentY.
         * @member {number} CurrentY
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.CurrentY = 0;
    
        /**
         * LoadAlreadyData CurrentDirection.
         * @member {number} CurrentDirection
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.CurrentDirection = 0;
    
        /**
         * LoadAlreadyData Action.
         * @member {number} Action
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.Action = 0;
    
        /**
         * LoadAlreadyData ToX.
         * @member {number} ToX
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.ToX = 0;
    
        /**
         * LoadAlreadyData ToY.
         * @member {number} ToY
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.ToY = 0;
    
        /**
         * LoadAlreadyData MoveCost.
         * @member {number} MoveCost
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.MoveCost = 0;
    
        /**
         * LoadAlreadyData ExtAction.
         * @member {number} ExtAction
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.ExtAction = 0;
    
        /**
         * LoadAlreadyData PathString.
         * @member {string} PathString
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.PathString = "";
    
        /**
         * LoadAlreadyData CurrentPathIndex.
         * @member {number} CurrentPathIndex
         * @memberof LoadAlreadyData
         * @instance
         */
        LoadAlreadyData.prototype.CurrentPathIndex = 0;
    
        /**
         * Encodes the specified LoadAlreadyData message. Does not implicitly {@link LoadAlreadyData.verify|verify} messages.
         * @function encode
         * @memberof LoadAlreadyData
         * @static
         * @param {ILoadAlreadyData} message LoadAlreadyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoadAlreadyData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MapCode);
            if (message.StartMoveTicks != null && message.hasOwnProperty("StartMoveTicks"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.StartMoveTicks);
            if (message.CurrentX != null && message.hasOwnProperty("CurrentX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.CurrentX);
            if (message.CurrentY != null && message.hasOwnProperty("CurrentY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.CurrentY);
            if (message.CurrentDirection != null && message.hasOwnProperty("CurrentDirection"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.CurrentDirection);
            if (message.Action != null && message.hasOwnProperty("Action"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.Action);
            if (message.ToX != null && message.hasOwnProperty("ToX"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ToX);
            if (message.ToY != null && message.hasOwnProperty("ToY"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.ToY);
            if (message.MoveCost != null && message.hasOwnProperty("MoveCost"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.MoveCost);
            if (message.ExtAction != null && message.hasOwnProperty("ExtAction"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.ExtAction);
            if (message.PathString != null && message.hasOwnProperty("PathString"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.PathString);
            if (message.CurrentPathIndex != null && message.hasOwnProperty("CurrentPathIndex"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.CurrentPathIndex);
            return writer;
        };
    
        /**
         * Decodes a LoadAlreadyData message from the specified reader or buffer.
         * @function decode
         * @memberof LoadAlreadyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {LoadAlreadyData} LoadAlreadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoadAlreadyData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LoadAlreadyData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.MapCode = reader.int32();
                    break;
                case 3:
                    message.StartMoveTicks = reader.int64();
                    break;
                case 4:
                    message.CurrentX = reader.int32();
                    break;
                case 5:
                    message.CurrentY = reader.int32();
                    break;
                case 6:
                    message.CurrentDirection = reader.int32();
                    break;
                case 7:
                    message.Action = reader.int32();
                    break;
                case 8:
                    message.ToX = reader.int32();
                    break;
                case 9:
                    message.ToY = reader.int32();
                    break;
                case 10:
                    message.MoveCost = reader.double();
                    break;
                case 11:
                    message.ExtAction = reader.int32();
                    break;
                case 12:
                    message.PathString = reader.string();
                    break;
                case 13:
                    message.CurrentPathIndex = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return LoadAlreadyData;
    })();
    
    $root.RoleDataMini = (function() {
    
        /**
         * Properties of a RoleDataMini.
         * @exports IRoleDataMini
         * @interface IRoleDataMini
         * @property {number|null} [RoleID] 当前的角色ID
         * @property {string|null} [RoleName] 当前的角色ID
         * @property {number|null} [RoleSex] 当前角色的性别
         * @property {number|null} [Occupation] 角色职业
         * @property {number|null} [Level] 角色级别
         * @property {number|null} [Faction] 角色所属的帮派
         * @property {number|null} [PKMode] 当前的PK模式
         * @property {number|null} [PKValue] 当前的PK值
         * @property {number|null} [MapCode] 所在的地图的编号
         * @property {number|null} [PosX] 当前所在的位置X坐标
         * @property {number|null} [PosY] 当前所在的位置Y坐标
         * @property {number|null} [RoleDirection] 当前的方向
         * @property {number|null} [LifeV] 当前的生命值
         * @property {number|null} [MaxLifeV] 最大的生命值
         * @property {number|null} [MagicV] 当前的魔法值
         * @property {number|null} [MaxMagicV] 最大的魔法值
         * @property {number|null} [BodyCode] 衣服代号
         * @property {number|null} [WeaponCode] 武器代号
         * @property {string|null} [OtherName] 称号
         * @property {number|null} [TeamID] 组队的ID
         * @property {number|null} [TeamLeaderRoleID] 当前的组队中的队长ID
         * @property {number|null} [PKPoint] 当前的PK点
         * @property {number|Long|null} [StartPurpleNameTicks] 紫名的开始时间
         * @property {number|Long|null} [BattleNameStart] 角斗场荣誉称号开始时间
         * @property {number|null} [BattleNameIndex] 角斗场荣誉称号
         * @property {number|null} [ZoneID] 区ID
         * @property {string|null} [BHName] 帮会名称
         * @property {number|null} [BHVerify] 被邀请加入帮会时是否验证
         * @property {number|null} [BHZhiWu] 帮会职务
         * @property {number|Long|null} [FSHuDunStart] 法师的护盾开始的时间
         * @property {number|null} [BattleWhichSide] 大乱斗中的阵营ID
         * @property {number|null} [IsVIP] 上次的mailID
         * @property {number|Long|null} [DSHideStart] 道术隐身的时间
         * @property {Array.<number>|null} [RoleCommonUseIntPamams] 角色常用整形参数值列表
         * @property {number|null} [FSHuDunSeconds] 法师的护盾持续的秒数
         * @property {number|Long|null} [ZhongDuStart] 中毒开始的时间
         * @property {number|null} [ZhongDuSeconds] 中毒持续的秒数
         * @property {number|null} [JieriChengHao] 节日称号
         * @property {number|Long|null} [DongJieStart] 冻结开始的时间
         * @property {number|null} [DongJieSeconds] 冻结持续的秒数
         * @property {Array.<IGoodsData>|null} [GoodsDataList] 物品数据
         * @property {number|null} [ChangeLifeLev] 重生级别
         * @property {number|null} [ChangeLifeCount] 重生计数
         * @property {string|null} [StallName] 摆摊的名称
         * @property {Array.<IBufferDataMini>|null} [BufferMiniInfo] Buffer Mini数据
         * @property {IWingData|null} [MyWingData] 翅膀数据列表
         * @property {number|null} [VIPLevel] VIP等级
         * @property {number|null} [GMAuth] 是否gm
         * @property {number|Long|null} [SettingBitFlags] 二态功能设置，参考ESettingBitFlag
         * @property {number|null} [SpouseId] 配偶id, >0 表示有
         * @property {number|null} [HorseRideState] 骑乘状态， >0 表示在骑乘中
         * @property {number|null} [nIsOnJiJia] 骑乘机甲状态， >0 表示在骑乘中
         */
    
        /**
         * Constructs a new RoleDataMini.
         * @exports RoleDataMini
         * @classdesc 精简的角色数据（主要用于通知角色用）
         * @implements IRoleDataMini
         * @constructor
         * @param {IRoleDataMini=} [properties] Properties to set
         */
        function RoleDataMini(properties) {
            this.RoleCommonUseIntPamams = [];
            this.GoodsDataList = [];
            this.BufferMiniInfo = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的角色ID
         * @member {number} RoleID
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.RoleID = 0;
    
        /**
         * 当前的角色ID
         * @member {string} RoleName
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.RoleName = "";
    
        /**
         * 当前角色的性别
         * @member {number} RoleSex
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.RoleSex = 0;
    
        /**
         * 角色职业
         * @member {number} Occupation
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.Occupation = 0;
    
        /**
         * 角色级别
         * @member {number} Level
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.Level = 0;
    
        /**
         * 角色所属的帮派
         * @member {number} Faction
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.Faction = 0;
    
        /**
         * 当前的PK模式
         * @member {number} PKMode
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.PKMode = 0;
    
        /**
         * 当前的PK值
         * @member {number} PKValue
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.PKValue = 0;
    
        /**
         * 所在的地图的编号
         * @member {number} MapCode
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.MapCode = 0;
    
        /**
         * 当前所在的位置X坐标
         * @member {number} PosX
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.PosX = 0;
    
        /**
         * 当前所在的位置Y坐标
         * @member {number} PosY
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.PosY = 0;
    
        /**
         * 当前的方向
         * @member {number} RoleDirection
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.RoleDirection = 0;
    
        /**
         * 当前的生命值
         * @member {number} LifeV
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.LifeV = 0;
    
        /**
         * 最大的生命值
         * @member {number} MaxLifeV
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.MaxLifeV = 0;
    
        /**
         * 当前的魔法值
         * @member {number} MagicV
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.MagicV = 0;
    
        /**
         * 最大的魔法值
         * @member {number} MaxMagicV
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.MaxMagicV = 0;
    
        /**
         * 衣服代号
         * @member {number} BodyCode
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BodyCode = 0;
    
        /**
         * 武器代号
         * @member {number} WeaponCode
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.WeaponCode = 0;
    
        /**
         * 称号
         * @member {string} OtherName
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.OtherName = "";
    
        /**
         * 组队的ID
         * @member {number} TeamID
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.TeamID = 0;
    
        /**
         * 当前的组队中的队长ID
         * @member {number} TeamLeaderRoleID
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.TeamLeaderRoleID = 0;
    
        /**
         * 当前的PK点
         * @member {number} PKPoint
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.PKPoint = 0;
    
        /**
         * 紫名的开始时间
         * @member {number|Long} StartPurpleNameTicks
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.StartPurpleNameTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 角斗场荣誉称号开始时间
         * @member {number|Long} BattleNameStart
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BattleNameStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 角斗场荣誉称号
         * @member {number} BattleNameIndex
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BattleNameIndex = 0;
    
        /**
         * 区ID
         * @member {number} ZoneID
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.ZoneID = 0;
    
        /**
         * 帮会名称
         * @member {string} BHName
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BHName = "";
    
        /**
         * 被邀请加入帮会时是否验证
         * @member {number} BHVerify
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BHVerify = 0;
    
        /**
         * 帮会职务
         * @member {number} BHZhiWu
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BHZhiWu = 0;
    
        /**
         * 法师的护盾开始的时间
         * @member {number|Long} FSHuDunStart
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.FSHuDunStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 大乱斗中的阵营ID
         * @member {number} BattleWhichSide
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BattleWhichSide = 0;
    
        /**
         * 上次的mailID
         * @member {number} IsVIP
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.IsVIP = 0;
    
        /**
         * 道术隐身的时间
         * @member {number|Long} DSHideStart
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.DSHideStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 角色常用整形参数值列表
         * @member {Array.<number>} RoleCommonUseIntPamams
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.RoleCommonUseIntPamams = $util.emptyArray;
    
        /**
         * 法师的护盾持续的秒数
         * @member {number} FSHuDunSeconds
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.FSHuDunSeconds = 0;
    
        /**
         * 中毒开始的时间
         * @member {number|Long} ZhongDuStart
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.ZhongDuStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 中毒持续的秒数
         * @member {number} ZhongDuSeconds
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.ZhongDuSeconds = 0;
    
        /**
         * 节日称号
         * @member {number} JieriChengHao
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.JieriChengHao = 0;
    
        /**
         * 冻结开始的时间
         * @member {number|Long} DongJieStart
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.DongJieStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 冻结持续的秒数
         * @member {number} DongJieSeconds
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.DongJieSeconds = 0;
    
        /**
         * 物品数据
         * @member {Array.<IGoodsData>} GoodsDataList
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.GoodsDataList = $util.emptyArray;
    
        /**
         * 重生级别
         * @member {number} ChangeLifeLev
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.ChangeLifeLev = 0;
    
        /**
         * 重生计数
         * @member {number} ChangeLifeCount
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.ChangeLifeCount = 0;
    
        /**
         * 摆摊的名称
         * @member {string} StallName
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.StallName = "";
    
        /**
         * Buffer Mini数据
         * @member {Array.<IBufferDataMini>} BufferMiniInfo
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.BufferMiniInfo = $util.emptyArray;
    
        /**
         * 翅膀数据列表
         * @member {IWingData|null|undefined} MyWingData
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.MyWingData = null;
    
        /**
         * VIP等级
         * @member {number} VIPLevel
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.VIPLevel = 0;
    
        /**
         * 是否gm
         * @member {number} GMAuth
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.GMAuth = 0;
    
        /**
         * 二态功能设置，参考ESettingBitFlag
         * @member {number|Long} SettingBitFlags
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.SettingBitFlags = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 配偶id, >0 表示有
         * @member {number} SpouseId
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.SpouseId = 0;
    
        /**
         * 骑乘状态， >0 表示在骑乘中
         * @member {number} HorseRideState
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.HorseRideState = 0;
    
        /**
         * 骑乘机甲状态， >0 表示在骑乘中
         * @member {number} nIsOnJiJia
         * @memberof RoleDataMini
         * @instance
         */
        RoleDataMini.prototype.nIsOnJiJia = 0;
    
        /**
         * Encodes the specified RoleDataMini message. Does not implicitly {@link RoleDataMini.verify|verify} messages.
         * @function encode
         * @memberof RoleDataMini
         * @static
         * @param {IRoleDataMini} message RoleDataMini message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleDataMini.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.RoleName != null && message.hasOwnProperty("RoleName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.RoleName);
            if (message.RoleSex != null && message.hasOwnProperty("RoleSex"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.RoleSex);
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Occupation);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Level);
            if (message.Faction != null && message.hasOwnProperty("Faction"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Faction);
            if (message.PKMode != null && message.hasOwnProperty("PKMode"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.PKMode);
            if (message.PKValue != null && message.hasOwnProperty("PKValue"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.PKValue);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.MapCode);
            if (message.PosX != null && message.hasOwnProperty("PosX"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.PosX);
            if (message.PosY != null && message.hasOwnProperty("PosY"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.PosY);
            if (message.RoleDirection != null && message.hasOwnProperty("RoleDirection"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.RoleDirection);
            if (message.LifeV != null && message.hasOwnProperty("LifeV"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.LifeV);
            if (message.MaxLifeV != null && message.hasOwnProperty("MaxLifeV"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.MaxLifeV);
            if (message.MagicV != null && message.hasOwnProperty("MagicV"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.MagicV);
            if (message.MaxMagicV != null && message.hasOwnProperty("MaxMagicV"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.MaxMagicV);
            if (message.BodyCode != null && message.hasOwnProperty("BodyCode"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.BodyCode);
            if (message.WeaponCode != null && message.hasOwnProperty("WeaponCode"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.WeaponCode);
            if (message.OtherName != null && message.hasOwnProperty("OtherName"))
                writer.uint32(/* id 19, wireType 2 =*/154).string(message.OtherName);
            if (message.TeamID != null && message.hasOwnProperty("TeamID"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.TeamID);
            if (message.TeamLeaderRoleID != null && message.hasOwnProperty("TeamLeaderRoleID"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.TeamLeaderRoleID);
            if (message.PKPoint != null && message.hasOwnProperty("PKPoint"))
                writer.uint32(/* id 22, wireType 0 =*/176).int32(message.PKPoint);
            if (message.StartPurpleNameTicks != null && message.hasOwnProperty("StartPurpleNameTicks"))
                writer.uint32(/* id 23, wireType 0 =*/184).int64(message.StartPurpleNameTicks);
            if (message.BattleNameStart != null && message.hasOwnProperty("BattleNameStart"))
                writer.uint32(/* id 24, wireType 0 =*/192).int64(message.BattleNameStart);
            if (message.BattleNameIndex != null && message.hasOwnProperty("BattleNameIndex"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.BattleNameIndex);
            if (message.ZoneID != null && message.hasOwnProperty("ZoneID"))
                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.ZoneID);
            if (message.BHName != null && message.hasOwnProperty("BHName"))
                writer.uint32(/* id 27, wireType 2 =*/218).string(message.BHName);
            if (message.BHVerify != null && message.hasOwnProperty("BHVerify"))
                writer.uint32(/* id 28, wireType 0 =*/224).int32(message.BHVerify);
            if (message.BHZhiWu != null && message.hasOwnProperty("BHZhiWu"))
                writer.uint32(/* id 29, wireType 0 =*/232).int32(message.BHZhiWu);
            if (message.FSHuDunStart != null && message.hasOwnProperty("FSHuDunStart"))
                writer.uint32(/* id 30, wireType 0 =*/240).int64(message.FSHuDunStart);
            if (message.BattleWhichSide != null && message.hasOwnProperty("BattleWhichSide"))
                writer.uint32(/* id 31, wireType 0 =*/248).int32(message.BattleWhichSide);
            if (message.IsVIP != null && message.hasOwnProperty("IsVIP"))
                writer.uint32(/* id 32, wireType 0 =*/256).int32(message.IsVIP);
            if (message.DSHideStart != null && message.hasOwnProperty("DSHideStart"))
                writer.uint32(/* id 33, wireType 0 =*/264).int64(message.DSHideStart);
            if (message.RoleCommonUseIntPamams != null && message.RoleCommonUseIntPamams.length) {
                writer.uint32(/* id 34, wireType 2 =*/274).fork();
                for (var i = 0; i < message.RoleCommonUseIntPamams.length; ++i)
                    writer.int32(message.RoleCommonUseIntPamams[i]);
                writer.ldelim();
            }
            if (message.FSHuDunSeconds != null && message.hasOwnProperty("FSHuDunSeconds"))
                writer.uint32(/* id 35, wireType 0 =*/280).int32(message.FSHuDunSeconds);
            if (message.ZhongDuStart != null && message.hasOwnProperty("ZhongDuStart"))
                writer.uint32(/* id 36, wireType 0 =*/288).int64(message.ZhongDuStart);
            if (message.ZhongDuSeconds != null && message.hasOwnProperty("ZhongDuSeconds"))
                writer.uint32(/* id 37, wireType 0 =*/296).int32(message.ZhongDuSeconds);
            if (message.JieriChengHao != null && message.hasOwnProperty("JieriChengHao"))
                writer.uint32(/* id 38, wireType 0 =*/304).int32(message.JieriChengHao);
            if (message.DongJieStart != null && message.hasOwnProperty("DongJieStart"))
                writer.uint32(/* id 39, wireType 0 =*/312).int64(message.DongJieStart);
            if (message.DongJieSeconds != null && message.hasOwnProperty("DongJieSeconds"))
                writer.uint32(/* id 40, wireType 0 =*/320).int32(message.DongJieSeconds);
            if (message.GoodsDataList != null && message.GoodsDataList.length)
                for (var i = 0; i < message.GoodsDataList.length; ++i)
                    $root.GoodsData.encode(message.GoodsDataList[i], writer.uint32(/* id 41, wireType 2 =*/330).fork()).ldelim();
            if (message.ChangeLifeLev != null && message.hasOwnProperty("ChangeLifeLev"))
                writer.uint32(/* id 42, wireType 0 =*/336).int32(message.ChangeLifeLev);
            if (message.ChangeLifeCount != null && message.hasOwnProperty("ChangeLifeCount"))
                writer.uint32(/* id 43, wireType 0 =*/344).int32(message.ChangeLifeCount);
            if (message.StallName != null && message.hasOwnProperty("StallName"))
                writer.uint32(/* id 44, wireType 2 =*/354).string(message.StallName);
            if (message.BufferMiniInfo != null && message.BufferMiniInfo.length)
                for (var i = 0; i < message.BufferMiniInfo.length; ++i)
                    $root.BufferDataMini.encode(message.BufferMiniInfo[i], writer.uint32(/* id 45, wireType 2 =*/362).fork()).ldelim();
            if (message.MyWingData != null && message.hasOwnProperty("MyWingData"))
                $root.WingData.encode(message.MyWingData, writer.uint32(/* id 46, wireType 2 =*/370).fork()).ldelim();
            if (message.VIPLevel != null && message.hasOwnProperty("VIPLevel"))
                writer.uint32(/* id 47, wireType 0 =*/376).int32(message.VIPLevel);
            if (message.GMAuth != null && message.hasOwnProperty("GMAuth"))
                writer.uint32(/* id 48, wireType 0 =*/384).int32(message.GMAuth);
            if (message.SettingBitFlags != null && message.hasOwnProperty("SettingBitFlags"))
                writer.uint32(/* id 49, wireType 0 =*/392).int64(message.SettingBitFlags);
            if (message.SpouseId != null && message.hasOwnProperty("SpouseId"))
                writer.uint32(/* id 50, wireType 0 =*/400).int32(message.SpouseId);
            if (message.HorseRideState != null && message.hasOwnProperty("HorseRideState"))
                writer.uint32(/* id 51, wireType 0 =*/408).int32(message.HorseRideState);
            if (message.nIsOnJiJia != null && message.hasOwnProperty("nIsOnJiJia"))
                writer.uint32(/* id 52, wireType 0 =*/416).int32(message.nIsOnJiJia);
            return writer;
        };
    
        /**
         * Decodes a RoleDataMini message from the specified reader or buffer.
         * @function decode
         * @memberof RoleDataMini
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoleDataMini} RoleDataMini
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleDataMini.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoleDataMini();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.RoleName = reader.string();
                    break;
                case 3:
                    message.RoleSex = reader.int32();
                    break;
                case 4:
                    message.Occupation = reader.int32();
                    break;
                case 5:
                    message.Level = reader.int32();
                    break;
                case 6:
                    message.Faction = reader.int32();
                    break;
                case 7:
                    message.PKMode = reader.int32();
                    break;
                case 8:
                    message.PKValue = reader.int32();
                    break;
                case 9:
                    message.MapCode = reader.int32();
                    break;
                case 10:
                    message.PosX = reader.int32();
                    break;
                case 11:
                    message.PosY = reader.int32();
                    break;
                case 12:
                    message.RoleDirection = reader.int32();
                    break;
                case 13:
                    message.LifeV = reader.int32();
                    break;
                case 14:
                    message.MaxLifeV = reader.int32();
                    break;
                case 15:
                    message.MagicV = reader.int32();
                    break;
                case 16:
                    message.MaxMagicV = reader.int32();
                    break;
                case 17:
                    message.BodyCode = reader.int32();
                    break;
                case 18:
                    message.WeaponCode = reader.int32();
                    break;
                case 19:
                    message.OtherName = reader.string();
                    break;
                case 20:
                    message.TeamID = reader.int32();
                    break;
                case 21:
                    message.TeamLeaderRoleID = reader.int32();
                    break;
                case 22:
                    message.PKPoint = reader.int32();
                    break;
                case 23:
                    message.StartPurpleNameTicks = reader.int64();
                    break;
                case 24:
                    message.BattleNameStart = reader.int64();
                    break;
                case 25:
                    message.BattleNameIndex = reader.int32();
                    break;
                case 26:
                    message.ZoneID = reader.int32();
                    break;
                case 27:
                    message.BHName = reader.string();
                    break;
                case 28:
                    message.BHVerify = reader.int32();
                    break;
                case 29:
                    message.BHZhiWu = reader.int32();
                    break;
                case 30:
                    message.FSHuDunStart = reader.int64();
                    break;
                case 31:
                    message.BattleWhichSide = reader.int32();
                    break;
                case 32:
                    message.IsVIP = reader.int32();
                    break;
                case 33:
                    message.DSHideStart = reader.int64();
                    break;
                case 34:
                    if (!(message.RoleCommonUseIntPamams && message.RoleCommonUseIntPamams.length))
                        message.RoleCommonUseIntPamams = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.RoleCommonUseIntPamams.push(reader.int32());
                    } else
                        message.RoleCommonUseIntPamams.push(reader.int32());
                    break;
                case 35:
                    message.FSHuDunSeconds = reader.int32();
                    break;
                case 36:
                    message.ZhongDuStart = reader.int64();
                    break;
                case 37:
                    message.ZhongDuSeconds = reader.int32();
                    break;
                case 38:
                    message.JieriChengHao = reader.int32();
                    break;
                case 39:
                    message.DongJieStart = reader.int64();
                    break;
                case 40:
                    message.DongJieSeconds = reader.int32();
                    break;
                case 41:
                    if (!(message.GoodsDataList && message.GoodsDataList.length))
                        message.GoodsDataList = [];
                    message.GoodsDataList.push($root.GoodsData.decode(reader, reader.uint32()));
                    break;
                case 42:
                    message.ChangeLifeLev = reader.int32();
                    break;
                case 43:
                    message.ChangeLifeCount = reader.int32();
                    break;
                case 44:
                    message.StallName = reader.string();
                    break;
                case 45:
                    if (!(message.BufferMiniInfo && message.BufferMiniInfo.length))
                        message.BufferMiniInfo = [];
                    message.BufferMiniInfo.push($root.BufferDataMini.decode(reader, reader.uint32()));
                    break;
                case 46:
                    message.MyWingData = $root.WingData.decode(reader, reader.uint32());
                    break;
                case 47:
                    message.VIPLevel = reader.int32();
                    break;
                case 48:
                    message.GMAuth = reader.int32();
                    break;
                case 49:
                    message.SettingBitFlags = reader.int64();
                    break;
                case 50:
                    message.SpouseId = reader.int32();
                    break;
                case 51:
                    message.HorseRideState = reader.int32();
                    break;
                case 52:
                    message.nIsOnJiJia = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return RoleDataMini;
    })();
    
    $root.PositionData = (function() {
    
        /**
         * Properties of a PositionData.
         * @exports IPositionData
         * @interface IPositionData
         * @property {number|null} [RoleID] PositionData RoleID
         * @property {number|null} [MapCode] PositionData MapCode
         * @property {number|null} [toX] PositionData toX
         * @property {number|null} [toY] PositionData toY
         * @property {number|Long|null} [currentPosTicks] PositionData currentPosTicks
         */
    
        /**
         * Constructs a new PositionData.
         * @exports PositionData
         * @classdesc Represents a PositionData.
         * @implements IPositionData
         * @constructor
         * @param {IPositionData=} [properties] Properties to set
         */
        function PositionData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * PositionData RoleID.
         * @member {number} RoleID
         * @memberof PositionData
         * @instance
         */
        PositionData.prototype.RoleID = 0;
    
        /**
         * PositionData MapCode.
         * @member {number} MapCode
         * @memberof PositionData
         * @instance
         */
        PositionData.prototype.MapCode = 0;
    
        /**
         * PositionData toX.
         * @member {number} toX
         * @memberof PositionData
         * @instance
         */
        PositionData.prototype.toX = 0;
    
        /**
         * PositionData toY.
         * @member {number} toY
         * @memberof PositionData
         * @instance
         */
        PositionData.prototype.toY = 0;
    
        /**
         * PositionData currentPosTicks.
         * @member {number|Long} currentPosTicks
         * @memberof PositionData
         * @instance
         */
        PositionData.prototype.currentPosTicks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Encodes the specified PositionData message. Does not implicitly {@link PositionData.verify|verify} messages.
         * @function encode
         * @memberof PositionData
         * @static
         * @param {IPositionData} message PositionData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PositionData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MapCode);
            if (message.toX != null && message.hasOwnProperty("toX"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.toX);
            if (message.toY != null && message.hasOwnProperty("toY"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.toY);
            if (message.currentPosTicks != null && message.hasOwnProperty("currentPosTicks"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.currentPosTicks);
            return writer;
        };
    
        /**
         * Decodes a PositionData message from the specified reader or buffer.
         * @function decode
         * @memberof PositionData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PositionData} PositionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PositionData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PositionData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.MapCode = reader.int32();
                    break;
                case 3:
                    message.toX = reader.int32();
                    break;
                case 4:
                    message.toY = reader.int32();
                    break;
                case 5:
                    message.currentPosTicks = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return PositionData;
    })();
    
    $root.MonsterRealiveData = (function() {
    
        /**
         * Properties of a MonsterRealiveData.
         * @exports IMonsterRealiveData
         * @interface IMonsterRealiveData
         * @property {number|null} [RoleID] 当前的角色ID
         * @property {number|null} [PosX] 当前的角色X坐标
         * @property {number|null} [PosY] 当前的角色Y坐标
         * @property {number|null} [Direction] 当前的角色方向
         */
    
        /**
         * Constructs a new MonsterRealiveData.
         * @exports MonsterRealiveData
         * @classdesc 怪的复活数据定义（人和怪物都使用这个数据）
         * @implements IMonsterRealiveData
         * @constructor
         * @param {IMonsterRealiveData=} [properties] Properties to set
         */
        function MonsterRealiveData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的角色ID
         * @member {number} RoleID
         * @memberof MonsterRealiveData
         * @instance
         */
        MonsterRealiveData.prototype.RoleID = 0;
    
        /**
         * 当前的角色X坐标
         * @member {number} PosX
         * @memberof MonsterRealiveData
         * @instance
         */
        MonsterRealiveData.prototype.PosX = 0;
    
        /**
         * 当前的角色Y坐标
         * @member {number} PosY
         * @memberof MonsterRealiveData
         * @instance
         */
        MonsterRealiveData.prototype.PosY = 0;
    
        /**
         * 当前的角色方向
         * @member {number} Direction
         * @memberof MonsterRealiveData
         * @instance
         */
        MonsterRealiveData.prototype.Direction = 0;
    
        /**
         * Encodes the specified MonsterRealiveData message. Does not implicitly {@link MonsterRealiveData.verify|verify} messages.
         * @function encode
         * @memberof MonsterRealiveData
         * @static
         * @param {IMonsterRealiveData} message MonsterRealiveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MonsterRealiveData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.PosX != null && message.hasOwnProperty("PosX"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.PosX);
            if (message.PosY != null && message.hasOwnProperty("PosY"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.PosY);
            if (message.Direction != null && message.hasOwnProperty("Direction"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Direction);
            return writer;
        };
    
        /**
         * Decodes a MonsterRealiveData message from the specified reader or buffer.
         * @function decode
         * @memberof MonsterRealiveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MonsterRealiveData} MonsterRealiveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MonsterRealiveData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonsterRealiveData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.PosX = reader.int32();
                    break;
                case 3:
                    message.PosY = reader.int32();
                    break;
                case 4:
                    message.Direction = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return MonsterRealiveData;
    })();
    
    $root.CSPropAddPoint = (function() {
    
        /**
         * Properties of a CSPropAddPoint.
         * @exports ICSPropAddPoint
         * @interface ICSPropAddPoint
         * @property {number|null} [RoleID] CSPropAddPoint RoleID
         * @property {number|null} [Strength] 力量
         * @property {number|null} [Intelligence] 智力
         * @property {number|null} [Dexterity] 敏捷
         * @property {number|null} [Constitution] 体力
         */
    
        /**
         * Constructs a new CSPropAddPoint.
         * @exports CSPropAddPoint
         * @classdesc 属性加点操作
         * @implements ICSPropAddPoint
         * @constructor
         * @param {ICSPropAddPoint=} [properties] Properties to set
         */
        function CSPropAddPoint(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CSPropAddPoint RoleID.
         * @member {number} RoleID
         * @memberof CSPropAddPoint
         * @instance
         */
        CSPropAddPoint.prototype.RoleID = 0;
    
        /**
         * 力量
         * @member {number} Strength
         * @memberof CSPropAddPoint
         * @instance
         */
        CSPropAddPoint.prototype.Strength = 0;
    
        /**
         * 智力
         * @member {number} Intelligence
         * @memberof CSPropAddPoint
         * @instance
         */
        CSPropAddPoint.prototype.Intelligence = 0;
    
        /**
         * 敏捷
         * @member {number} Dexterity
         * @memberof CSPropAddPoint
         * @instance
         */
        CSPropAddPoint.prototype.Dexterity = 0;
    
        /**
         * 体力
         * @member {number} Constitution
         * @memberof CSPropAddPoint
         * @instance
         */
        CSPropAddPoint.prototype.Constitution = 0;
    
        /**
         * Encodes the specified CSPropAddPoint message. Does not implicitly {@link CSPropAddPoint.verify|verify} messages.
         * @function encode
         * @memberof CSPropAddPoint
         * @static
         * @param {ICSPropAddPoint} message CSPropAddPoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CSPropAddPoint.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.Strength != null && message.hasOwnProperty("Strength"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Strength);
            if (message.Intelligence != null && message.hasOwnProperty("Intelligence"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Intelligence);
            if (message.Dexterity != null && message.hasOwnProperty("Dexterity"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Dexterity);
            if (message.Constitution != null && message.hasOwnProperty("Constitution"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.Constitution);
            return writer;
        };
    
        /**
         * Decodes a CSPropAddPoint message from the specified reader or buffer.
         * @function decode
         * @memberof CSPropAddPoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CSPropAddPoint} CSPropAddPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CSPropAddPoint.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CSPropAddPoint();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.Strength = reader.int32();
                    break;
                case 3:
                    message.Intelligence = reader.int32();
                    break;
                case 4:
                    message.Dexterity = reader.int32();
                    break;
                case 5:
                    message.Constitution = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return CSPropAddPoint;
    })();
    
    $root.ActivityIconStateData = (function() {
    
        /**
         * Properties of an ActivityIconStateData.
         * @exports IActivityIconStateData
         * @interface IActivityIconStateData
         * @property {Array.<number>|null} [arrIconState] 前15位表示功能状态编号，后一位表示图标状态（0为不显示感叹号、1为显示） // TODO... 原始数据类型为ushort
         */
    
        /**
         * Constructs a new ActivityIconStateData.
         * @exports ActivityIconStateData
         * @classdesc 刷新图标状态数据
         * @implements IActivityIconStateData
         * @constructor
         * @param {IActivityIconStateData=} [properties] Properties to set
         */
        function ActivityIconStateData(properties) {
            this.arrIconState = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 前15位表示功能状态编号，后一位表示图标状态（0为不显示感叹号、1为显示） // TODO... 原始数据类型为ushort
         * @member {Array.<number>} arrIconState
         * @memberof ActivityIconStateData
         * @instance
         */
        ActivityIconStateData.prototype.arrIconState = $util.emptyArray;
    
        /**
         * Encodes the specified ActivityIconStateData message. Does not implicitly {@link ActivityIconStateData.verify|verify} messages.
         * @function encode
         * @memberof ActivityIconStateData
         * @static
         * @param {IActivityIconStateData} message ActivityIconStateData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivityIconStateData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.arrIconState != null && message.arrIconState.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.arrIconState.length; ++i)
                    writer.uint32(message.arrIconState[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes an ActivityIconStateData message from the specified reader or buffer.
         * @function decode
         * @memberof ActivityIconStateData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ActivityIconStateData} ActivityIconStateData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivityIconStateData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ActivityIconStateData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.arrIconState && message.arrIconState.length))
                        message.arrIconState = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.arrIconState.push(reader.uint32());
                    } else
                        message.arrIconState.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return ActivityIconStateData;
    })();
    
    $root.SpriteActionData = (function() {
    
        /**
         * Properties of a SpriteActionData.
         * @exports ISpriteActionData
         * @interface ISpriteActionData
         * @property {number|null} [roleID] 角色Id
         * @property {number|null} [mapCode] 做动作时所在场景的Id
         * @property {number|null} [direction] 做动作时面向的方向(8方向?).兼容用!
         * @property {number|null} [action] 角色做出的动作. GActions之一
         * @property {number|null} [toX] 角色做出动作时,客户端所在的坐标X(服务器系坐标系)
         * @property {number|null} [toY] 角色做出动作时,客户端所在的坐标Y(服务器系坐标系)
         * @property {number|null} [targetX] 目标坐标X(服务器系坐标系),如技能释放点
         * @property {number|null} [targetY] 目标坐标Y(服务器系坐标系),如技能释放点
         * @property {number|null} [yAngle] 做动作时面向的方向(360方向?).
         */
    
        /**
         * Constructs a new SpriteActionData.
         * @exports SpriteActionData
         * @classdesc 同步角色的动作(如释放技能,笑等)
         * @implements ISpriteActionData
         * @constructor
         * @param {ISpriteActionData=} [properties] Properties to set
         */
        function SpriteActionData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色Id
         * @member {number} roleID
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.roleID = 0;
    
        /**
         * 做动作时所在场景的Id
         * @member {number} mapCode
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.mapCode = 0;
    
        /**
         * 做动作时面向的方向(8方向?).兼容用!
         * @member {number} direction
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.direction = 0;
    
        /**
         * 角色做出的动作. GActions之一
         * @member {number} action
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.action = 0;
    
        /**
         * 角色做出动作时,客户端所在的坐标X(服务器系坐标系)
         * @member {number} toX
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.toX = 0;
    
        /**
         * 角色做出动作时,客户端所在的坐标Y(服务器系坐标系)
         * @member {number} toY
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.toY = 0;
    
        /**
         * 目标坐标X(服务器系坐标系),如技能释放点
         * @member {number} targetX
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.targetX = 0;
    
        /**
         * 目标坐标Y(服务器系坐标系),如技能释放点
         * @member {number} targetY
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.targetY = 0;
    
        /**
         * 做动作时面向的方向(360方向?).
         * @member {number} yAngle
         * @memberof SpriteActionData
         * @instance
         */
        SpriteActionData.prototype.yAngle = 0;
    
        /**
         * Encodes the specified SpriteActionData message. Does not implicitly {@link SpriteActionData.verify|verify} messages.
         * @function encode
         * @memberof SpriteActionData
         * @static
         * @param {ISpriteActionData} message SpriteActionData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteActionData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.mapCode != null && message.hasOwnProperty("mapCode"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mapCode);
            if (message.direction != null && message.hasOwnProperty("direction"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.direction);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.action);
            if (message.toX != null && message.hasOwnProperty("toX"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.toX);
            if (message.toY != null && message.hasOwnProperty("toY"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.toY);
            if (message.targetX != null && message.hasOwnProperty("targetX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.targetX);
            if (message.targetY != null && message.hasOwnProperty("targetY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.targetY);
            if (message.yAngle != null && message.hasOwnProperty("yAngle"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.yAngle);
            return writer;
        };
    
        /**
         * Decodes a SpriteActionData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteActionData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteActionData} SpriteActionData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteActionData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteActionData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.mapCode = reader.int32();
                    break;
                case 3:
                    message.direction = reader.int32();
                    break;
                case 4:
                    message.action = reader.int32();
                    break;
                case 5:
                    message.toX = reader.int32();
                    break;
                case 6:
                    message.toY = reader.int32();
                    break;
                case 7:
                    message.targetX = reader.int32();
                    break;
                case 8:
                    message.targetY = reader.int32();
                    break;
                case 9:
                    message.yAngle = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteActionData;
    })();
    
    $root.SpriteAttackData = (function() {
    
        /**
         * Properties of a SpriteAttackData.
         * @exports ISpriteAttackData
         * @interface ISpriteAttackData
         * @property {number|null} [roleID] 发动伤害的角色Id
         * @property {number|null} [roleX] 角色的位置坐标X(服务器坐标系)
         * @property {number|null} [roleY] 角色的位置坐标Y(服务器坐标系)
         * @property {number|null} [enemy] 目标的角色Id(可以没有-1)
         * @property {number|null} [enemyX] 目标的位置坐标X(服务器坐标系).enemy有效时才有效
         * @property {number|null} [enemyY] 目标的位置坐标Y(服务器坐标系).enemy有效时才有效
         * @property {number|null} [realEnemyX] 目标点位置坐标X(服务器坐标系)
         * @property {number|null} [realEnemyY] 目标点位置坐标Y(服务器坐标系)
         * @property {number|null} [magicCode] 使用的技能Id
         */
    
        /**
         * Constructs a new SpriteAttackData.
         * @exports SpriteAttackData
         * @classdesc 一次伤害相关的信息
         * @implements ISpriteAttackData
         * @constructor
         * @param {ISpriteAttackData=} [properties] Properties to set
         */
        function SpriteAttackData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 发动伤害的角色Id
         * @member {number} roleID
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.roleID = 0;
    
        /**
         * 角色的位置坐标X(服务器坐标系)
         * @member {number} roleX
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.roleX = 0;
    
        /**
         * 角色的位置坐标Y(服务器坐标系)
         * @member {number} roleY
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.roleY = 0;
    
        /**
         * 目标的角色Id(可以没有-1)
         * @member {number} enemy
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.enemy = 0;
    
        /**
         * 目标的位置坐标X(服务器坐标系).enemy有效时才有效
         * @member {number} enemyX
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.enemyX = 0;
    
        /**
         * 目标的位置坐标Y(服务器坐标系).enemy有效时才有效
         * @member {number} enemyY
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.enemyY = 0;
    
        /**
         * 目标点位置坐标X(服务器坐标系)
         * @member {number} realEnemyX
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.realEnemyX = 0;
    
        /**
         * 目标点位置坐标Y(服务器坐标系)
         * @member {number} realEnemyY
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.realEnemyY = 0;
    
        /**
         * 使用的技能Id
         * @member {number} magicCode
         * @memberof SpriteAttackData
         * @instance
         */
        SpriteAttackData.prototype.magicCode = 0;
    
        /**
         * Encodes the specified SpriteAttackData message. Does not implicitly {@link SpriteAttackData.verify|verify} messages.
         * @function encode
         * @memberof SpriteAttackData
         * @static
         * @param {ISpriteAttackData} message SpriteAttackData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteAttackData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roleID != null && message.hasOwnProperty("roleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleID);
            if (message.roleX != null && message.hasOwnProperty("roleX"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roleX);
            if (message.roleY != null && message.hasOwnProperty("roleY"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.roleY);
            if (message.enemy != null && message.hasOwnProperty("enemy"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enemy);
            if (message.enemyX != null && message.hasOwnProperty("enemyX"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.enemyX);
            if (message.enemyY != null && message.hasOwnProperty("enemyY"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.enemyY);
            if (message.realEnemyX != null && message.hasOwnProperty("realEnemyX"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.realEnemyX);
            if (message.realEnemyY != null && message.hasOwnProperty("realEnemyY"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.realEnemyY);
            if (message.magicCode != null && message.hasOwnProperty("magicCode"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.magicCode);
            return writer;
        };
    
        /**
         * Decodes a SpriteAttackData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteAttackData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteAttackData} SpriteAttackData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteAttackData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteAttackData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roleID = reader.int32();
                    break;
                case 2:
                    message.roleX = reader.int32();
                    break;
                case 3:
                    message.roleY = reader.int32();
                    break;
                case 4:
                    message.enemy = reader.int32();
                    break;
                case 5:
                    message.enemyX = reader.int32();
                    break;
                case 6:
                    message.enemyY = reader.int32();
                    break;
                case 7:
                    message.realEnemyX = reader.int32();
                    break;
                case 8:
                    message.realEnemyY = reader.int32();
                    break;
                case 9:
                    message.magicCode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteAttackData;
    })();
    
    $root.SCAutoFight = (function() {
    
        /**
         * Properties of a SCAutoFight.
         * @exports ISCAutoFight
         * @interface ISCAutoFight
         * @property {number|null} [State] 返回客户端挂机指令的执行结果. 0 - 成功, -1 - 已经处于对应的挂机状态,忽略此指令, -2 - 其它错误
         * @property {number|null} [RoleID] 发出指令的角色的角色Id
         * @property {number|null} [FightType] 自动挂机的类型.为 AutoFightCmds 之一
         * @property {number|null} [Tag] 自动挂机相关的标识, 为 GetThingsIndexes 标识的组合
         */
    
        /**
         * Constructs a new SCAutoFight.
         * @exports SCAutoFight
         * @classdesc 挂机(自动战斗)的信息
         * @implements ISCAutoFight
         * @constructor
         * @param {ISCAutoFight=} [properties] Properties to set
         */
        function SCAutoFight(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 返回客户端挂机指令的执行结果. 0 - 成功, -1 - 已经处于对应的挂机状态,忽略此指令, -2 - 其它错误
         * @member {number} State
         * @memberof SCAutoFight
         * @instance
         */
        SCAutoFight.prototype.State = 0;
    
        /**
         * 发出指令的角色的角色Id
         * @member {number} RoleID
         * @memberof SCAutoFight
         * @instance
         */
        SCAutoFight.prototype.RoleID = 0;
    
        /**
         * 自动挂机的类型.为 AutoFightCmds 之一
         * @member {number} FightType
         * @memberof SCAutoFight
         * @instance
         */
        SCAutoFight.prototype.FightType = 0;
    
        /**
         * 自动挂机相关的标识, 为 GetThingsIndexes 标识的组合
         * @member {number} Tag
         * @memberof SCAutoFight
         * @instance
         */
        SCAutoFight.prototype.Tag = 0;
    
        /**
         * Encodes the specified SCAutoFight message. Does not implicitly {@link SCAutoFight.verify|verify} messages.
         * @function encode
         * @memberof SCAutoFight
         * @static
         * @param {ISCAutoFight} message SCAutoFight message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCAutoFight.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.State);
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RoleID);
            if (message.FightType != null && message.hasOwnProperty("FightType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.FightType);
            if (message.Tag != null && message.hasOwnProperty("Tag"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Tag);
            return writer;
        };
    
        /**
         * Decodes a SCAutoFight message from the specified reader or buffer.
         * @function decode
         * @memberof SCAutoFight
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCAutoFight} SCAutoFight
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCAutoFight.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCAutoFight();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.State = reader.int32();
                    break;
                case 2:
                    message.RoleID = reader.int32();
                    break;
                case 3:
                    message.FightType = reader.int32();
                    break;
                case 4:
                    message.Tag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCAutoFight;
    })();
    
    $root.SCFindMonster = (function() {
    
        /**
         * Properties of a SCFindMonster.
         * @exports ISCFindMonster
         * @interface ISCFindMonster
         * @property {number|null} [RoleID] 客户端的角色Id
         * @property {number|null} [X] 目标点X(服务器坐标系)
         * @property {number|null} [Y] 目标点Y(服务器坐标系)
         * @property {number|null} [radiusGridNum] 查找半径(格子坐标系)
         * @property {number|null} [ExcludeBoss] 是否排除Boss
         * @property {Array.<number>|null} [excludeMonsterIDs] 需要排除的怪物角色Id
         */
    
        /**
         * Constructs a new SCFindMonster.
         * @exports SCFindMonster
         * @classdesc 通过服务器查找目标点周围的怪物
         * @implements ISCFindMonster
         * @constructor
         * @param {ISCFindMonster=} [properties] Properties to set
         */
        function SCFindMonster(properties) {
            this.excludeMonsterIDs = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 客户端的角色Id
         * @member {number} RoleID
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.RoleID = 0;
    
        /**
         * 目标点X(服务器坐标系)
         * @member {number} X
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.X = 0;
    
        /**
         * 目标点Y(服务器坐标系)
         * @member {number} Y
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.Y = 0;
    
        /**
         * 查找半径(格子坐标系)
         * @member {number} radiusGridNum
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.radiusGridNum = 0;
    
        /**
         * 是否排除Boss
         * @member {number} ExcludeBoss
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.ExcludeBoss = 0;
    
        /**
         * 需要排除的怪物角色Id
         * @member {Array.<number>} excludeMonsterIDs
         * @memberof SCFindMonster
         * @instance
         */
        SCFindMonster.prototype.excludeMonsterIDs = $util.emptyArray;
    
        /**
         * Encodes the specified SCFindMonster message. Does not implicitly {@link SCFindMonster.verify|verify} messages.
         * @function encode
         * @memberof SCFindMonster
         * @static
         * @param {ISCFindMonster} message SCFindMonster message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCFindMonster.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.X != null && message.hasOwnProperty("X"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.X);
            if (message.Y != null && message.hasOwnProperty("Y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Y);
            if (message.radiusGridNum != null && message.hasOwnProperty("radiusGridNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.radiusGridNum);
            if (message.ExcludeBoss != null && message.hasOwnProperty("ExcludeBoss"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ExcludeBoss);
            if (message.excludeMonsterIDs != null && message.excludeMonsterIDs.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.excludeMonsterIDs.length; ++i)
                    writer.int32(message.excludeMonsterIDs[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes a SCFindMonster message from the specified reader or buffer.
         * @function decode
         * @memberof SCFindMonster
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCFindMonster} SCFindMonster
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCFindMonster.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCFindMonster();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.X = reader.int32();
                    break;
                case 3:
                    message.Y = reader.int32();
                    break;
                case 4:
                    message.radiusGridNum = reader.int32();
                    break;
                case 5:
                    message.ExcludeBoss = reader.int32();
                    break;
                case 6:
                    if (!(message.excludeMonsterIDs && message.excludeMonsterIDs.length))
                        message.excludeMonsterIDs = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.excludeMonsterIDs.push(reader.int32());
                    } else
                        message.excludeMonsterIDs.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCFindMonster;
    })();
    
    $root.SCMapChange = (function() {
    
        /**
         * Properties of a SCMapChange.
         * @exports ISCMapChange
         * @interface ISCMapChange
         * @property {number|null} [RoleID] 角色ID
         * @property {number|null} [TeleportID] 传送点ID
         * @property {number|null} [NewMapCode] 新地图ID
         * @property {number|null} [ToNewMapX] 新地图坐标X
         * @property {number|null} [ToNewMapY] 新地图坐标Y
         * @property {number|null} [ToNewDiection] 新地图角色方向
         * @property {number|null} [State] 结果
         */
    
        /**
         * Constructs a new SCMapChange.
         * @exports SCMapChange
         * @classdesc 切换地图数据
         * @implements ISCMapChange
         * @constructor
         * @param {ISCMapChange=} [properties] Properties to set
         */
        function SCMapChange(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色ID
         * @member {number} RoleID
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.RoleID = 0;
    
        /**
         * 传送点ID
         * @member {number} TeleportID
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.TeleportID = 0;
    
        /**
         * 新地图ID
         * @member {number} NewMapCode
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.NewMapCode = 0;
    
        /**
         * 新地图坐标X
         * @member {number} ToNewMapX
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.ToNewMapX = 0;
    
        /**
         * 新地图坐标Y
         * @member {number} ToNewMapY
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.ToNewMapY = 0;
    
        /**
         * 新地图角色方向
         * @member {number} ToNewDiection
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.ToNewDiection = 0;
    
        /**
         * 结果
         * @member {number} State
         * @memberof SCMapChange
         * @instance
         */
        SCMapChange.prototype.State = 0;
    
        /**
         * Encodes the specified SCMapChange message. Does not implicitly {@link SCMapChange.verify|verify} messages.
         * @function encode
         * @memberof SCMapChange
         * @static
         * @param {ISCMapChange} message SCMapChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SCMapChange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.TeleportID != null && message.hasOwnProperty("TeleportID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TeleportID);
            if (message.NewMapCode != null && message.hasOwnProperty("NewMapCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.NewMapCode);
            if (message.ToNewMapX != null && message.hasOwnProperty("ToNewMapX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ToNewMapX);
            if (message.ToNewMapY != null && message.hasOwnProperty("ToNewMapY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.ToNewMapY);
            if (message.ToNewDiection != null && message.hasOwnProperty("ToNewDiection"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ToNewDiection);
            if (message.State != null && message.hasOwnProperty("State"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.State);
            return writer;
        };
    
        /**
         * Decodes a SCMapChange message from the specified reader or buffer.
         * @function decode
         * @memberof SCMapChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SCMapChange} SCMapChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SCMapChange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SCMapChange();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.TeleportID = reader.int32();
                    break;
                case 3:
                    message.NewMapCode = reader.int32();
                    break;
                case 4:
                    message.ToNewMapX = reader.int32();
                    break;
                case 5:
                    message.ToNewMapY = reader.int32();
                    break;
                case 6:
                    message.ToNewDiection = reader.int32();
                    break;
                case 7:
                    message.State = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SCMapChange;
    })();
    
    $root.SpriteTransportToPosData = (function() {
    
        /**
         * Properties of a SpriteTransportToPosData.
         * @exports ISpriteTransportToPosData
         * @interface ISpriteTransportToPosData
         * @property {number|null} [RoleID] 角色ID
         * @property {number|null} [TeleportID] 传送点ID
         * @property {number|null} [MapCode] 地图ID
         * @property {number|null} [TransportToX] 坐标X
         * @property {number|null} [TransportToY] 坐标Y
         * @property {number|null} [ToNewDiection] 角色方向
         */
    
        /**
         * Constructs a new SpriteTransportToPosData.
         * @exports SpriteTransportToPosData
         * @classdesc 瞬移的数据
         * @implements ISpriteTransportToPosData
         * @constructor
         * @param {ISpriteTransportToPosData=} [properties] Properties to set
         */
        function SpriteTransportToPosData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色ID
         * @member {number} RoleID
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.RoleID = 0;
    
        /**
         * 传送点ID
         * @member {number} TeleportID
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.TeleportID = 0;
    
        /**
         * 地图ID
         * @member {number} MapCode
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.MapCode = 0;
    
        /**
         * 坐标X
         * @member {number} TransportToX
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.TransportToX = 0;
    
        /**
         * 坐标Y
         * @member {number} TransportToY
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.TransportToY = 0;
    
        /**
         * 角色方向
         * @member {number} ToNewDiection
         * @memberof SpriteTransportToPosData
         * @instance
         */
        SpriteTransportToPosData.prototype.ToNewDiection = 0;
    
        /**
         * Encodes the specified SpriteTransportToPosData message. Does not implicitly {@link SpriteTransportToPosData.verify|verify} messages.
         * @function encode
         * @memberof SpriteTransportToPosData
         * @static
         * @param {ISpriteTransportToPosData} message SpriteTransportToPosData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SpriteTransportToPosData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.TeleportID != null && message.hasOwnProperty("TeleportID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.TeleportID);
            if (message.MapCode != null && message.hasOwnProperty("MapCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.MapCode);
            if (message.TransportToX != null && message.hasOwnProperty("TransportToX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.TransportToX);
            if (message.TransportToY != null && message.hasOwnProperty("TransportToY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.TransportToY);
            if (message.ToNewDiection != null && message.hasOwnProperty("ToNewDiection"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ToNewDiection);
            return writer;
        };
    
        /**
         * Decodes a SpriteTransportToPosData message from the specified reader or buffer.
         * @function decode
         * @memberof SpriteTransportToPosData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SpriteTransportToPosData} SpriteTransportToPosData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SpriteTransportToPosData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpriteTransportToPosData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.TeleportID = reader.int32();
                    break;
                case 3:
                    message.MapCode = reader.int32();
                    break;
                case 4:
                    message.TransportToX = reader.int32();
                    break;
                case 5:
                    message.TransportToY = reader.int32();
                    break;
                case 6:
                    message.ToNewDiection = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SpriteTransportToPosData;
    })();
    
    $root.ChangeEquipData = (function() {
    
        /**
         * Properties of a ChangeEquipData.
         * @exports IChangeEquipData
         * @interface IChangeEquipData
         * @property {number|null} [RoleID] 角色ID
         * @property {IGoodsData|null} [EquipGoodsData] 换装GoodsData
         * @property {IWingData|null} [UsingWinData] 翅膀数据
         * @property {number|null} [nChangeType] 变化类型
         */
    
        /**
         * Constructs a new ChangeEquipData.
         * @exports ChangeEquipData
         * @classdesc 更换装备的消息数据
         * @implements IChangeEquipData
         * @constructor
         * @param {IChangeEquipData=} [properties] Properties to set
         */
        function ChangeEquipData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 角色ID
         * @member {number} RoleID
         * @memberof ChangeEquipData
         * @instance
         */
        ChangeEquipData.prototype.RoleID = 0;
    
        /**
         * 换装GoodsData
         * @member {IGoodsData|null|undefined} EquipGoodsData
         * @memberof ChangeEquipData
         * @instance
         */
        ChangeEquipData.prototype.EquipGoodsData = null;
    
        /**
         * 翅膀数据
         * @member {IWingData|null|undefined} UsingWinData
         * @memberof ChangeEquipData
         * @instance
         */
        ChangeEquipData.prototype.UsingWinData = null;
    
        /**
         * 变化类型
         * @member {number} nChangeType
         * @memberof ChangeEquipData
         * @instance
         */
        ChangeEquipData.prototype.nChangeType = 0;
    
        /**
         * Encodes the specified ChangeEquipData message. Does not implicitly {@link ChangeEquipData.verify|verify} messages.
         * @function encode
         * @memberof ChangeEquipData
         * @static
         * @param {IChangeEquipData} message ChangeEquipData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChangeEquipData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleID);
            if (message.EquipGoodsData != null && message.hasOwnProperty("EquipGoodsData"))
                $root.GoodsData.encode(message.EquipGoodsData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.UsingWinData != null && message.hasOwnProperty("UsingWinData"))
                $root.WingData.encode(message.UsingWinData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.nChangeType != null && message.hasOwnProperty("nChangeType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.nChangeType);
            return writer;
        };
    
        /**
         * Decodes a ChangeEquipData message from the specified reader or buffer.
         * @function decode
         * @memberof ChangeEquipData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ChangeEquipData} ChangeEquipData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChangeEquipData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChangeEquipData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleID = reader.int32();
                    break;
                case 2:
                    message.EquipGoodsData = $root.GoodsData.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.UsingWinData = $root.WingData.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.nChangeType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return ChangeEquipData;
    })();
    
    $root.SevenDayItemData = (function() {
    
        /**
         * Properties of a SevenDayItemData.
         * @exports ISevenDayItemData
         * @interface ISevenDayItemData
         * @property {number|null} [AwardFlag] 领奖标识 1.七日登录：1 == 已领取, 否则为未领取 2.七日目标：1 == 已领取, 否则为未领取 3.七日抢购：不使用此字段 4.七日充值：1 == 已领取, 否则为未领取
         * @property {number|null} [Params1] 附加参数 1.七日登录：1 == 当天登录了，否则表示未登录 2.七日目标：表示该项已经达成的总和 3.七日抢购：该项已购买个数 4.七日充值：该项充值金额
         * @property {number|null} [Params2] 暂时不明白干啥的
         */
    
        /**
         * Constructs a new SevenDayItemData.
         * @exports SevenDayItemData
         * @classdesc 七日活动每个活动的每个子项的信息
         * @implements ISevenDayItemData
         * @constructor
         * @param {ISevenDayItemData=} [properties] Properties to set
         */
        function SevenDayItemData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 领奖标识 1.七日登录：1 == 已领取, 否则为未领取 2.七日目标：1 == 已领取, 否则为未领取 3.七日抢购：不使用此字段 4.七日充值：1 == 已领取, 否则为未领取
         * @member {number} AwardFlag
         * @memberof SevenDayItemData
         * @instance
         */
        SevenDayItemData.prototype.AwardFlag = 0;
    
        /**
         * 附加参数 1.七日登录：1 == 当天登录了，否则表示未登录 2.七日目标：表示该项已经达成的总和 3.七日抢购：该项已购买个数 4.七日充值：该项充值金额
         * @member {number} Params1
         * @memberof SevenDayItemData
         * @instance
         */
        SevenDayItemData.prototype.Params1 = 0;
    
        /**
         * 暂时不明白干啥的
         * @member {number} Params2
         * @memberof SevenDayItemData
         * @instance
         */
        SevenDayItemData.prototype.Params2 = 0;
    
        /**
         * Encodes the specified SevenDayItemData message. Does not implicitly {@link SevenDayItemData.verify|verify} messages.
         * @function encode
         * @memberof SevenDayItemData
         * @static
         * @param {ISevenDayItemData} message SevenDayItemData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SevenDayItemData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.AwardFlag != null && message.hasOwnProperty("AwardFlag"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.AwardFlag);
            if (message.Params1 != null && message.hasOwnProperty("Params1"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Params1);
            if (message.Params2 != null && message.hasOwnProperty("Params2"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Params2);
            return writer;
        };
    
        /**
         * Decodes a SevenDayItemData message from the specified reader or buffer.
         * @function decode
         * @memberof SevenDayItemData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SevenDayItemData} SevenDayItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SevenDayItemData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SevenDayItemData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.AwardFlag = reader.int32();
                    break;
                case 2:
                    message.Params1 = reader.int32();
                    break;
                case 3:
                    message.Params2 = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SevenDayItemData;
    })();
    
    $root.SevenDayActQueryData = (function() {
    
        /**
         * Properties of a SevenDayActQueryData.
         * @exports ISevenDayActQueryData
         * @interface ISevenDayActQueryData
         * @property {number|null} [ActivityType] 查询的那一个活动  SevenDayActivityType.xml
         * @property {Object.<string,ISevenDayItemData>|null} [ItemDict] 活动的具体信息 key：每一个活动配置文件中的id字段
         */
    
        /**
         * Constructs a new SevenDayActQueryData.
         * @exports SevenDayActQueryData
         * @classdesc 客户端查询七日活动信息
         * @implements ISevenDayActQueryData
         * @constructor
         * @param {ISevenDayActQueryData=} [properties] Properties to set
         */
        function SevenDayActQueryData(properties) {
            this.ItemDict = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 查询的那一个活动  SevenDayActivityType.xml
         * @member {number} ActivityType
         * @memberof SevenDayActQueryData
         * @instance
         */
        SevenDayActQueryData.prototype.ActivityType = 0;
    
        /**
         * 活动的具体信息 key：每一个活动配置文件中的id字段
         * @member {Object.<string,ISevenDayItemData>} ItemDict
         * @memberof SevenDayActQueryData
         * @instance
         */
        SevenDayActQueryData.prototype.ItemDict = $util.emptyObject;
    
        /**
         * Encodes the specified SevenDayActQueryData message. Does not implicitly {@link SevenDayActQueryData.verify|verify} messages.
         * @function encode
         * @memberof SevenDayActQueryData
         * @static
         * @param {ISevenDayActQueryData} message SevenDayActQueryData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SevenDayActQueryData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ActivityType != null && message.hasOwnProperty("ActivityType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ActivityType);
            if (message.ItemDict != null && message.hasOwnProperty("ItemDict"))
                for (var keys = Object.keys(message.ItemDict), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.SevenDayItemData.encode(message.ItemDict[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };
    
        /**
         * Decodes a SevenDayActQueryData message from the specified reader or buffer.
         * @function decode
         * @memberof SevenDayActQueryData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SevenDayActQueryData} SevenDayActQueryData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SevenDayActQueryData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SevenDayActQueryData(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ActivityType = reader.int32();
                    break;
                case 2:
                    reader.skip().pos++;
                    if (message.ItemDict === $util.emptyObject)
                        message.ItemDict = {};
                    key = reader.int32();
                    reader.pos++;
                    message.ItemDict[key] = $root.SevenDayItemData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SevenDayActQueryData;
    })();
    
    $root.HuodongData = (function() {
    
        /**
         * Properties of a HuodongData.
         * @exports IHuodongData
         * @interface IHuodongData
         * @property {string|null} [LastWeekID] 登录周ID
         * @property {string|null} [LastDayID] 登录日ID
         * @property {number|null} [LoginNum] 周连续登录次数
         * @property {number|null} [NewStep] 见面有礼领取步骤
         * @property {number|Long|null} [StepTime] 领取上一个见面有礼步骤的时间
         * @property {number|null} [LastMTime] 上个月的在线时长
         * @property {string|null} [CurMID] 本月的标记ID
         * @property {number|null} [CurMTime] 本月的在线时长
         * @property {number|null} [SongLiID] 已经领取的送礼活动ID
         * @property {number|null} [LoginGiftState] 登录有礼的领取状态
         * @property {number|null} [OnlineGiftState] 在线有礼的领取状态
         * @property {number|null} [LastLimitTimeHuoDongID] 限时登录活动ID
         * @property {number|null} [LastLimitTimeDayID] 限时登录日ID
         * @property {number|null} [LimitTimeLoginNum] 限时登录日累计登录次数
         * @property {number|null} [LimitTimeGiftState] 限时登录日累计领取状态
         * @property {number|null} [EveryDayOnLineAwardStep] 每日在线奖励的领取到了第几步
         * @property {number|null} [GetEveryDayOnLineAwardDayID] 领取上一个每日在线奖励的日期
         * @property {number|null} [SeriesLoginGetAwardStep] 连续登陆奖励领取到第几步了
         * @property {number|null} [SeriesLoginAwardDayID] 连续登陆领取奖励的日期
         * @property {string|null} [SeriesLoginAwardGoodsID] 连续登陆领取奖励的列表
         * @property {string|null} [EveryDayOnLineAwardGoodsID] 每日在线领取奖励的列表
         */
    
        /**
         * Constructs a new HuodongData.
         * @exports HuodongData
         * @classdesc 活动送礼相关数据
         * @implements IHuodongData
         * @constructor
         * @param {IHuodongData=} [properties] Properties to set
         */
        function HuodongData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 登录周ID
         * @member {string} LastWeekID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LastWeekID = "";
    
        /**
         * 登录日ID
         * @member {string} LastDayID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LastDayID = "";
    
        /**
         * 周连续登录次数
         * @member {number} LoginNum
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LoginNum = 0;
    
        /**
         * 见面有礼领取步骤
         * @member {number} NewStep
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.NewStep = 0;
    
        /**
         * 领取上一个见面有礼步骤的时间
         * @member {number|Long} StepTime
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.StepTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 上个月的在线时长
         * @member {number} LastMTime
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LastMTime = 0;
    
        /**
         * 本月的标记ID
         * @member {string} CurMID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.CurMID = "";
    
        /**
         * 本月的在线时长
         * @member {number} CurMTime
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.CurMTime = 0;
    
        /**
         * 已经领取的送礼活动ID
         * @member {number} SongLiID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.SongLiID = 0;
    
        /**
         * 登录有礼的领取状态
         * @member {number} LoginGiftState
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LoginGiftState = 0;
    
        /**
         * 在线有礼的领取状态
         * @member {number} OnlineGiftState
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.OnlineGiftState = 0;
    
        /**
         * 限时登录活动ID
         * @member {number} LastLimitTimeHuoDongID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LastLimitTimeHuoDongID = 0;
    
        /**
         * 限时登录日ID
         * @member {number} LastLimitTimeDayID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LastLimitTimeDayID = 0;
    
        /**
         * 限时登录日累计登录次数
         * @member {number} LimitTimeLoginNum
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LimitTimeLoginNum = 0;
    
        /**
         * 限时登录日累计领取状态
         * @member {number} LimitTimeGiftState
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.LimitTimeGiftState = 0;
    
        /**
         * 每日在线奖励的领取到了第几步
         * @member {number} EveryDayOnLineAwardStep
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.EveryDayOnLineAwardStep = 0;
    
        /**
         * 领取上一个每日在线奖励的日期
         * @member {number} GetEveryDayOnLineAwardDayID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.GetEveryDayOnLineAwardDayID = 0;
    
        /**
         * 连续登陆奖励领取到第几步了
         * @member {number} SeriesLoginGetAwardStep
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.SeriesLoginGetAwardStep = 0;
    
        /**
         * 连续登陆领取奖励的日期
         * @member {number} SeriesLoginAwardDayID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.SeriesLoginAwardDayID = 0;
    
        /**
         * 连续登陆领取奖励的列表
         * @member {string} SeriesLoginAwardGoodsID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.SeriesLoginAwardGoodsID = "";
    
        /**
         * 每日在线领取奖励的列表
         * @member {string} EveryDayOnLineAwardGoodsID
         * @memberof HuodongData
         * @instance
         */
        HuodongData.prototype.EveryDayOnLineAwardGoodsID = "";
    
        /**
         * Encodes the specified HuodongData message. Does not implicitly {@link HuodongData.verify|verify} messages.
         * @function encode
         * @memberof HuodongData
         * @static
         * @param {IHuodongData} message HuodongData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HuodongData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.LastWeekID != null && message.hasOwnProperty("LastWeekID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.LastWeekID);
            if (message.LastDayID != null && message.hasOwnProperty("LastDayID"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.LastDayID);
            if (message.LoginNum != null && message.hasOwnProperty("LoginNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.LoginNum);
            if (message.NewStep != null && message.hasOwnProperty("NewStep"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.NewStep);
            if (message.StepTime != null && message.hasOwnProperty("StepTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.StepTime);
            if (message.LastMTime != null && message.hasOwnProperty("LastMTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.LastMTime);
            if (message.CurMID != null && message.hasOwnProperty("CurMID"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.CurMID);
            if (message.CurMTime != null && message.hasOwnProperty("CurMTime"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.CurMTime);
            if (message.SongLiID != null && message.hasOwnProperty("SongLiID"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.SongLiID);
            if (message.LoginGiftState != null && message.hasOwnProperty("LoginGiftState"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.LoginGiftState);
            if (message.OnlineGiftState != null && message.hasOwnProperty("OnlineGiftState"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.OnlineGiftState);
            if (message.LastLimitTimeHuoDongID != null && message.hasOwnProperty("LastLimitTimeHuoDongID"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.LastLimitTimeHuoDongID);
            if (message.LastLimitTimeDayID != null && message.hasOwnProperty("LastLimitTimeDayID"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.LastLimitTimeDayID);
            if (message.LimitTimeLoginNum != null && message.hasOwnProperty("LimitTimeLoginNum"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.LimitTimeLoginNum);
            if (message.LimitTimeGiftState != null && message.hasOwnProperty("LimitTimeGiftState"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.LimitTimeGiftState);
            if (message.EveryDayOnLineAwardStep != null && message.hasOwnProperty("EveryDayOnLineAwardStep"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.EveryDayOnLineAwardStep);
            if (message.GetEveryDayOnLineAwardDayID != null && message.hasOwnProperty("GetEveryDayOnLineAwardDayID"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.GetEveryDayOnLineAwardDayID);
            if (message.SeriesLoginGetAwardStep != null && message.hasOwnProperty("SeriesLoginGetAwardStep"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.SeriesLoginGetAwardStep);
            if (message.SeriesLoginAwardDayID != null && message.hasOwnProperty("SeriesLoginAwardDayID"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.SeriesLoginAwardDayID);
            if (message.SeriesLoginAwardGoodsID != null && message.hasOwnProperty("SeriesLoginAwardGoodsID"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.SeriesLoginAwardGoodsID);
            if (message.EveryDayOnLineAwardGoodsID != null && message.hasOwnProperty("EveryDayOnLineAwardGoodsID"))
                writer.uint32(/* id 21, wireType 2 =*/170).string(message.EveryDayOnLineAwardGoodsID);
            return writer;
        };
    
        /**
         * Decodes a HuodongData message from the specified reader or buffer.
         * @function decode
         * @memberof HuodongData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {HuodongData} HuodongData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HuodongData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.HuodongData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.LastWeekID = reader.string();
                    break;
                case 2:
                    message.LastDayID = reader.string();
                    break;
                case 3:
                    message.LoginNum = reader.int32();
                    break;
                case 4:
                    message.NewStep = reader.int32();
                    break;
                case 5:
                    message.StepTime = reader.int64();
                    break;
                case 6:
                    message.LastMTime = reader.int32();
                    break;
                case 7:
                    message.CurMID = reader.string();
                    break;
                case 8:
                    message.CurMTime = reader.int32();
                    break;
                case 9:
                    message.SongLiID = reader.int32();
                    break;
                case 10:
                    message.LoginGiftState = reader.int32();
                    break;
                case 11:
                    message.OnlineGiftState = reader.int32();
                    break;
                case 12:
                    message.LastLimitTimeHuoDongID = reader.int32();
                    break;
                case 13:
                    message.LastLimitTimeDayID = reader.int32();
                    break;
                case 14:
                    message.LimitTimeLoginNum = reader.int32();
                    break;
                case 15:
                    message.LimitTimeGiftState = reader.int32();
                    break;
                case 16:
                    message.EveryDayOnLineAwardStep = reader.int32();
                    break;
                case 17:
                    message.GetEveryDayOnLineAwardDayID = reader.int32();
                    break;
                case 18:
                    message.SeriesLoginGetAwardStep = reader.int32();
                    break;
                case 19:
                    message.SeriesLoginAwardDayID = reader.int32();
                    break;
                case 20:
                    message.SeriesLoginAwardGoodsID = reader.string();
                    break;
                case 21:
                    message.EveryDayOnLineAwardGoodsID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return HuodongData;
    })();
    
    $root.GradeRewardData = (function() {
    
        /**
         * Properties of a GradeRewardData.
         * @exports IGradeRewardData
         * @interface IGradeRewardData
         * @property {Array.<number>|null} [flags] 等级奖励标识列表
         */
    
        /**
         * Constructs a new GradeRewardData.
         * @exports GradeRewardData
         * @classdesc 等级奖励数据
         * @implements IGradeRewardData
         * @constructor
         * @param {IGradeRewardData=} [properties] Properties to set
         */
        function GradeRewardData(properties) {
            this.flags = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 等级奖励标识列表
         * @member {Array.<number>} flags
         * @memberof GradeRewardData
         * @instance
         */
        GradeRewardData.prototype.flags = $util.emptyArray;
    
        /**
         * Encodes the specified GradeRewardData message. Does not implicitly {@link GradeRewardData.verify|verify} messages.
         * @function encode
         * @memberof GradeRewardData
         * @static
         * @param {IGradeRewardData} message GradeRewardData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradeRewardData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.flags != null && message.flags.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.flags.length; ++i)
                    writer.int32(message.flags[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes a GradeRewardData message from the specified reader or buffer.
         * @function decode
         * @memberof GradeRewardData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GradeRewardData} GradeRewardData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradeRewardData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GradeRewardData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.flags && message.flags.length))
                        message.flags = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.flags.push(reader.int32());
                    } else
                        message.flags.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return GradeRewardData;
    })();
    
    $root.SC_SprUseGoods = (function() {
    
        /**
         * Properties of a SC_SprUseGoods.
         * @exports ISC_SprUseGoods
         * @interface ISC_SprUseGoods
         * @property {number|null} [Error] 使用结果
         * @property {number|null} [DbId] 道具DbId
         * @property {number|null} [Cnt] 使用个数
         */
    
        /**
         * Constructs a new SC_SprUseGoods.
         * @exports SC_SprUseGoods
         * @classdesc 道具使用数据
         * @implements ISC_SprUseGoods
         * @constructor
         * @param {ISC_SprUseGoods=} [properties] Properties to set
         */
        function SC_SprUseGoods(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 使用结果
         * @member {number} Error
         * @memberof SC_SprUseGoods
         * @instance
         */
        SC_SprUseGoods.prototype.Error = 0;
    
        /**
         * 道具DbId
         * @member {number} DbId
         * @memberof SC_SprUseGoods
         * @instance
         */
        SC_SprUseGoods.prototype.DbId = 0;
    
        /**
         * 使用个数
         * @member {number} Cnt
         * @memberof SC_SprUseGoods
         * @instance
         */
        SC_SprUseGoods.prototype.Cnt = 0;
    
        /**
         * Encodes the specified SC_SprUseGoods message. Does not implicitly {@link SC_SprUseGoods.verify|verify} messages.
         * @function encode
         * @memberof SC_SprUseGoods
         * @static
         * @param {ISC_SprUseGoods} message SC_SprUseGoods message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SC_SprUseGoods.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Error != null && message.hasOwnProperty("Error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Error);
            if (message.DbId != null && message.hasOwnProperty("DbId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DbId);
            if (message.Cnt != null && message.hasOwnProperty("Cnt"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Cnt);
            return writer;
        };
    
        /**
         * Decodes a SC_SprUseGoods message from the specified reader or buffer.
         * @function decode
         * @memberof SC_SprUseGoods
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SC_SprUseGoods} SC_SprUseGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SC_SprUseGoods.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SC_SprUseGoods();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Error = reader.int32();
                    break;
                case 2:
                    message.DbId = reader.int32();
                    break;
                case 3:
                    message.Cnt = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SC_SprUseGoods;
    })();
    
    $root.SecondaryAttributeData = (function() {
    
        /**
         * Properties of a SecondaryAttributeData.
         * @exports ISecondaryAttributeData
         * @interface ISecondaryAttributeData
         * @property {Array.<number>|null} [attrList] 属性列表
         */
    
        /**
         * Constructs a new SecondaryAttributeData.
         * @exports SecondaryAttributeData
         * @classdesc 二级属性数据
         * @implements ISecondaryAttributeData
         * @constructor
         * @param {ISecondaryAttributeData=} [properties] Properties to set
         */
        function SecondaryAttributeData(properties) {
            this.attrList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 属性列表
         * @member {Array.<number>} attrList
         * @memberof SecondaryAttributeData
         * @instance
         */
        SecondaryAttributeData.prototype.attrList = $util.emptyArray;
    
        /**
         * Encodes the specified SecondaryAttributeData message. Does not implicitly {@link SecondaryAttributeData.verify|verify} messages.
         * @function encode
         * @memberof SecondaryAttributeData
         * @static
         * @param {ISecondaryAttributeData} message SecondaryAttributeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecondaryAttributeData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.attrList != null && message.attrList.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.attrList.length; ++i)
                    writer.double(message.attrList[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Decodes a SecondaryAttributeData message from the specified reader or buffer.
         * @function decode
         * @memberof SecondaryAttributeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SecondaryAttributeData} SecondaryAttributeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecondaryAttributeData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SecondaryAttributeData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.attrList && message.attrList.length))
                        message.attrList = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.attrList.push(reader.double());
                    } else
                        message.attrList.push(reader.double());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return SecondaryAttributeData;
    })();
    
    $root.TotemNetItem = (function() {
    
        /**
         * Properties of a TotemNetItem.
         * @exports ITotemNetItem
         * @interface ITotemNetItem
         * @property {number|null} [ToTemID] 当前的图腾ID
         * @property {number|null} [ToTemStute] 当前的图腾状态（1可激活， 2已激活）
         * @property {string|null} [sOpenTime] 日志中可能会用到
         */
    
        /**
         * Constructs a new TotemNetItem.
         * @exports TotemNetItem
         * @classdesc 玩家已经开启的图腾单个数据定义
         * @implements ITotemNetItem
         * @constructor
         * @param {ITotemNetItem=} [properties] Properties to set
         */
        function TotemNetItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 当前的图腾ID
         * @member {number} ToTemID
         * @memberof TotemNetItem
         * @instance
         */
        TotemNetItem.prototype.ToTemID = 0;
    
        /**
         * 当前的图腾状态（1可激活， 2已激活）
         * @member {number} ToTemStute
         * @memberof TotemNetItem
         * @instance
         */
        TotemNetItem.prototype.ToTemStute = 0;
    
        /**
         * 日志中可能会用到
         * @member {string} sOpenTime
         * @memberof TotemNetItem
         * @instance
         */
        TotemNetItem.prototype.sOpenTime = "";
    
        /**
         * Encodes the specified TotemNetItem message. Does not implicitly {@link TotemNetItem.verify|verify} messages.
         * @function encode
         * @memberof TotemNetItem
         * @static
         * @param {ITotemNetItem} message TotemNetItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TotemNetItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ToTemID != null && message.hasOwnProperty("ToTemID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ToTemID);
            if (message.ToTemStute != null && message.hasOwnProperty("ToTemStute"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ToTemStute);
            if (message.sOpenTime != null && message.hasOwnProperty("sOpenTime"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sOpenTime);
            return writer;
        };
    
        /**
         * Decodes a TotemNetItem message from the specified reader or buffer.
         * @function decode
         * @memberof TotemNetItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {TotemNetItem} TotemNetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TotemNetItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TotemNetItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ToTemID = reader.int32();
                    break;
                case 2:
                    message.ToTemStute = reader.int32();
                    break;
                case 3:
                    message.sOpenTime = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return TotemNetItem;
    })();
    
    $root.BangHuiDetailData = (function() {
    
        /**
         * Properties of a BangHuiDetailData.
         * @exports IBangHuiDetailData
         * @interface IBangHuiDetailData
         * @property {number|null} [BHID] 帮派的ID
         * @property {string|null} [BHName] 帮派的名称
         * @property {number|null} [ZoneID] 区ID
         * @property {number|null} [BZRoleID] 首领的ID
         * @property {string|null} [BZRoleName] 首领的名称
         * @property {number|null} [BZOccupation] 首领的职业
         * @property {number|null} [TotalNum] 帮成员总的个数
         * @property {number|null} [TotalLevel] 帮成员总的级别
         * @property {string|null} [BHBulletin] 帮会公告
         * @property {string|null} [BuildTime] 建立时间
         * @property {string|null} [QiName] 战旗名称
         * @property {number|null} [QiLevel] 帮成员总的级别
         * @property {Array.<IBangHuiMgrItemData>|null} [MgrItemList] 管理成员列表
         * @property {number|null} [IsVerify] 是否验证
         * @property {number|null} [TotalMoney] 帮会资金
         * @property {number|null} [TodayZhanGongForGold] 玩家今日获得帮贡值
         * @property {number|null} [TodayZhanGongForDiamond] 玩家今日获得帮贡值
         * @property {number|null} [JiTan] 祭坛
         * @property {number|null} [JunXie] 军械
         * @property {number|null} [GuangHuan] 光环
         * @property {number|null} [CanModNameTimes] 剩余允许改名次数
         * @property {string|null} [BHXuanyan] 帮会宣言
         * @property {number|null} [bhLevel] 帮会等级
         * @property {number|null} [TotalCombatForce] 帮会成员总战斗力
         * @property {string|null} [sBHBuff] 帮会buff
         */
    
        /**
         * Constructs a new BangHuiDetailData.
         * @exports BangHuiDetailData
         * @classdesc 帮会详细数据
         * @implements IBangHuiDetailData
         * @constructor
         * @param {IBangHuiDetailData=} [properties] Properties to set
         */
        function BangHuiDetailData(properties) {
            this.MgrItemList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 帮派的ID
         * @member {number} BHID
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BHID = 0;
    
        /**
         * 帮派的名称
         * @member {string} BHName
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BHName = "";
    
        /**
         * 区ID
         * @member {number} ZoneID
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.ZoneID = 0;
    
        /**
         * 首领的ID
         * @member {number} BZRoleID
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BZRoleID = 0;
    
        /**
         * 首领的名称
         * @member {string} BZRoleName
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BZRoleName = "";
    
        /**
         * 首领的职业
         * @member {number} BZOccupation
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BZOccupation = 0;
    
        /**
         * 帮成员总的个数
         * @member {number} TotalNum
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TotalNum = 0;
    
        /**
         * 帮成员总的级别
         * @member {number} TotalLevel
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TotalLevel = 0;
    
        /**
         * 帮会公告
         * @member {string} BHBulletin
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BHBulletin = "";
    
        /**
         * 建立时间
         * @member {string} BuildTime
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BuildTime = "";
    
        /**
         * 战旗名称
         * @member {string} QiName
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.QiName = "";
    
        /**
         * 帮成员总的级别
         * @member {number} QiLevel
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.QiLevel = 0;
    
        /**
         * 管理成员列表
         * @member {Array.<IBangHuiMgrItemData>} MgrItemList
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.MgrItemList = $util.emptyArray;
    
        /**
         * 是否验证
         * @member {number} IsVerify
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.IsVerify = 0;
    
        /**
         * 帮会资金
         * @member {number} TotalMoney
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TotalMoney = 0;
    
        /**
         * 玩家今日获得帮贡值
         * @member {number} TodayZhanGongForGold
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TodayZhanGongForGold = 0;
    
        /**
         * 玩家今日获得帮贡值
         * @member {number} TodayZhanGongForDiamond
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TodayZhanGongForDiamond = 0;
    
        /**
         * 祭坛
         * @member {number} JiTan
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.JiTan = 0;
    
        /**
         * 军械
         * @member {number} JunXie
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.JunXie = 0;
    
        /**
         * 光环
         * @member {number} GuangHuan
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.GuangHuan = 0;
    
        /**
         * 剩余允许改名次数
         * @member {number} CanModNameTimes
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.CanModNameTimes = 0;
    
        /**
         * 帮会宣言
         * @member {string} BHXuanyan
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.BHXuanyan = "";
    
        /**
         * 帮会等级
         * @member {number} bhLevel
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.bhLevel = 0;
    
        /**
         * 帮会成员总战斗力
         * @member {number} TotalCombatForce
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.TotalCombatForce = 0;
    
        /**
         * 帮会buff
         * @member {string} sBHBuff
         * @memberof BangHuiDetailData
         * @instance
         */
        BangHuiDetailData.prototype.sBHBuff = "";
    
        /**
         * Encodes the specified BangHuiDetailData message. Does not implicitly {@link BangHuiDetailData.verify|verify} messages.
         * @function encode
         * @memberof BangHuiDetailData
         * @static
         * @param {IBangHuiDetailData} message BangHuiDetailData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BangHuiDetailData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BHID != null && message.hasOwnProperty("BHID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.BHID);
            if (message.BHName != null && message.hasOwnProperty("BHName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.BHName);
            if (message.ZoneID != null && message.hasOwnProperty("ZoneID"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.ZoneID);
            if (message.BZRoleID != null && message.hasOwnProperty("BZRoleID"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.BZRoleID);
            if (message.BZRoleName != null && message.hasOwnProperty("BZRoleName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.BZRoleName);
            if (message.BZOccupation != null && message.hasOwnProperty("BZOccupation"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.BZOccupation);
            if (message.TotalNum != null && message.hasOwnProperty("TotalNum"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.TotalNum);
            if (message.TotalLevel != null && message.hasOwnProperty("TotalLevel"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.TotalLevel);
            if (message.BHBulletin != null && message.hasOwnProperty("BHBulletin"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.BHBulletin);
            if (message.BuildTime != null && message.hasOwnProperty("BuildTime"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.BuildTime);
            if (message.QiName != null && message.hasOwnProperty("QiName"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.QiName);
            if (message.QiLevel != null && message.hasOwnProperty("QiLevel"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.QiLevel);
            if (message.MgrItemList != null && message.MgrItemList.length)
                for (var i = 0; i < message.MgrItemList.length; ++i)
                    $root.BangHuiMgrItemData.encode(message.MgrItemList[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.IsVerify != null && message.hasOwnProperty("IsVerify"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.IsVerify);
            if (message.TotalMoney != null && message.hasOwnProperty("TotalMoney"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.TotalMoney);
            if (message.TodayZhanGongForGold != null && message.hasOwnProperty("TodayZhanGongForGold"))
                writer.uint32(/* id 16, wireType 0 =*/128).int32(message.TodayZhanGongForGold);
            if (message.TodayZhanGongForDiamond != null && message.hasOwnProperty("TodayZhanGongForDiamond"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.TodayZhanGongForDiamond);
            if (message.JiTan != null && message.hasOwnProperty("JiTan"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.JiTan);
            if (message.JunXie != null && message.hasOwnProperty("JunXie"))
                writer.uint32(/* id 19, wireType 0 =*/152).int32(message.JunXie);
            if (message.GuangHuan != null && message.hasOwnProperty("GuangHuan"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.GuangHuan);
            if (message.CanModNameTimes != null && message.hasOwnProperty("CanModNameTimes"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.CanModNameTimes);
            if (message.BHXuanyan != null && message.hasOwnProperty("BHXuanyan"))
                writer.uint32(/* id 22, wireType 2 =*/178).string(message.BHXuanyan);
            if (message.bhLevel != null && message.hasOwnProperty("bhLevel"))
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.bhLevel);
            if (message.TotalCombatForce != null && message.hasOwnProperty("TotalCombatForce"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.TotalCombatForce);
            if (message.sBHBuff != null && message.hasOwnProperty("sBHBuff"))
                writer.uint32(/* id 25, wireType 2 =*/202).string(message.sBHBuff);
            return writer;
        };
    
        /**
         * Decodes a BangHuiDetailData message from the specified reader or buffer.
         * @function decode
         * @memberof BangHuiDetailData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BangHuiDetailData} BangHuiDetailData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BangHuiDetailData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BangHuiDetailData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BHID = reader.int32();
                    break;
                case 2:
                    message.BHName = reader.string();
                    break;
                case 3:
                    message.ZoneID = reader.int32();
                    break;
                case 4:
                    message.BZRoleID = reader.int32();
                    break;
                case 5:
                    message.BZRoleName = reader.string();
                    break;
                case 6:
                    message.BZOccupation = reader.int32();
                    break;
                case 7:
                    message.TotalNum = reader.int32();
                    break;
                case 8:
                    message.TotalLevel = reader.int32();
                    break;
                case 9:
                    message.BHBulletin = reader.string();
                    break;
                case 10:
                    message.BuildTime = reader.string();
                    break;
                case 11:
                    message.QiName = reader.string();
                    break;
                case 12:
                    message.QiLevel = reader.int32();
                    break;
                case 13:
                    if (!(message.MgrItemList && message.MgrItemList.length))
                        message.MgrItemList = [];
                    message.MgrItemList.push($root.BangHuiMgrItemData.decode(reader, reader.uint32()));
                    break;
                case 14:
                    message.IsVerify = reader.int32();
                    break;
                case 15:
                    message.TotalMoney = reader.int32();
                    break;
                case 16:
                    message.TodayZhanGongForGold = reader.int32();
                    break;
                case 17:
                    message.TodayZhanGongForDiamond = reader.int32();
                    break;
                case 18:
                    message.JiTan = reader.int32();
                    break;
                case 19:
                    message.JunXie = reader.int32();
                    break;
                case 20:
                    message.GuangHuan = reader.int32();
                    break;
                case 21:
                    message.CanModNameTimes = reader.int32();
                    break;
                case 22:
                    message.BHXuanyan = reader.string();
                    break;
                case 23:
                    message.bhLevel = reader.int32();
                    break;
                case 24:
                    message.TotalCombatForce = reader.int32();
                    break;
                case 25:
                    message.sBHBuff = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BangHuiDetailData;
    })();
    
    $root.BangHuiMgrItemData = (function() {
    
        /**
         * Properties of a BangHuiMgrItemData.
         * @exports IBangHuiMgrItemData
         * @interface IBangHuiMgrItemData
         * @property {number|null} [ZoneID] 区ID
         * @property {number|null} [RoleID] 角色的ID
         * @property {string|null} [RoleName] 角色的名称
         * @property {number|null} [Occupation] 角色的职业
         * @property {number|null} [BHZhiwu] 帮中职务
         * @property {string|null} [ChengHao] 帮中称号
         * @property {number|null} [BangGong] 帮会公告
         * @property {number|null} [Level] 角色的级别
         * @property {number|null} [CLevel] 角色的重生级别
         * @property {number|null} [CombatForce] 角色的战斗力
         * @property {number|Long|null} [LogoutTime] 角色的登出时间
         * @property {number|null} [weekBhMoney] 帮会资金贡献(每周的)
         * @property {string|null} [sPosition] 位置信息(mapID:x:y:z)
         */
    
        /**
         * Constructs a new BangHuiMgrItemData.
         * @exports BangHuiMgrItemData
         * @classdesc 帮会管理成员数据
         * @implements IBangHuiMgrItemData
         * @constructor
         * @param {IBangHuiMgrItemData=} [properties] Properties to set
         */
        function BangHuiMgrItemData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 区ID
         * @member {number} ZoneID
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.ZoneID = 0;
    
        /**
         * 角色的ID
         * @member {number} RoleID
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.RoleID = 0;
    
        /**
         * 角色的名称
         * @member {string} RoleName
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.RoleName = "";
    
        /**
         * 角色的职业
         * @member {number} Occupation
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.Occupation = 0;
    
        /**
         * 帮中职务
         * @member {number} BHZhiwu
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.BHZhiwu = 0;
    
        /**
         * 帮中称号
         * @member {string} ChengHao
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.ChengHao = "";
    
        /**
         * 帮会公告
         * @member {number} BangGong
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.BangGong = 0;
    
        /**
         * 角色的级别
         * @member {number} Level
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.Level = 0;
    
        /**
         * 角色的重生级别
         * @member {number} CLevel
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.CLevel = 0;
    
        /**
         * 角色的战斗力
         * @member {number} CombatForce
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.CombatForce = 0;
    
        /**
         * 角色的登出时间
         * @member {number|Long} LogoutTime
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.LogoutTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * 帮会资金贡献(每周的)
         * @member {number} weekBhMoney
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.weekBhMoney = 0;
    
        /**
         * 位置信息(mapID:x:y:z)
         * @member {string} sPosition
         * @memberof BangHuiMgrItemData
         * @instance
         */
        BangHuiMgrItemData.prototype.sPosition = "";
    
        /**
         * Encodes the specified BangHuiMgrItemData message. Does not implicitly {@link BangHuiMgrItemData.verify|verify} messages.
         * @function encode
         * @memberof BangHuiMgrItemData
         * @static
         * @param {IBangHuiMgrItemData} message BangHuiMgrItemData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BangHuiMgrItemData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ZoneID != null && message.hasOwnProperty("ZoneID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ZoneID);
            if (message.RoleID != null && message.hasOwnProperty("RoleID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.RoleID);
            if (message.RoleName != null && message.hasOwnProperty("RoleName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.RoleName);
            if (message.Occupation != null && message.hasOwnProperty("Occupation"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.Occupation);
            if (message.BHZhiwu != null && message.hasOwnProperty("BHZhiwu"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.BHZhiwu);
            if (message.ChengHao != null && message.hasOwnProperty("ChengHao"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ChengHao);
            if (message.BangGong != null && message.hasOwnProperty("BangGong"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.BangGong);
            if (message.Level != null && message.hasOwnProperty("Level"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.Level);
            if (message.CLevel != null && message.hasOwnProperty("CLevel"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.CLevel);
            if (message.CombatForce != null && message.hasOwnProperty("CombatForce"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.CombatForce);
            if (message.LogoutTime != null && message.hasOwnProperty("LogoutTime"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.LogoutTime);
            if (message.weekBhMoney != null && message.hasOwnProperty("weekBhMoney"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.weekBhMoney);
            if (message.sPosition != null && message.hasOwnProperty("sPosition"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.sPosition);
            return writer;
        };
    
        /**
         * Decodes a BangHuiMgrItemData message from the specified reader or buffer.
         * @function decode
         * @memberof BangHuiMgrItemData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BangHuiMgrItemData} BangHuiMgrItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BangHuiMgrItemData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BangHuiMgrItemData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ZoneID = reader.int32();
                    break;
                case 2:
                    message.RoleID = reader.int32();
                    break;
                case 3:
                    message.RoleName = reader.string();
                    break;
                case 4:
                    message.Occupation = reader.int32();
                    break;
                case 5:
                    message.BHZhiwu = reader.int32();
                    break;
                case 6:
                    message.ChengHao = reader.string();
                    break;
                case 7:
                    message.BangGong = reader.int32();
                    break;
                case 8:
                    message.Level = reader.int32();
                    break;
                case 9:
                    message.CLevel = reader.int32();
                    break;
                case 10:
                    message.CombatForce = reader.int32();
                    break;
                case 11:
                    message.LogoutTime = reader.int64();
                    break;
                case 12:
                    message.weekBhMoney = reader.int32();
                    break;
                case 13:
                    message.sPosition = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BangHuiMgrItemData;
    })();
    
    $root.BusinessDuiHuan = (function() {
    
        /**
         * Properties of a BusinessDuiHuan.
         * @exports IBusinessDuiHuan
         * @interface IBusinessDuiHuan
         * @property {Object.<string,number>|null} [Dict] 商人兑换数据字典
         */
    
        /**
         * Constructs a new BusinessDuiHuan.
         * @exports BusinessDuiHuan
         * @classdesc 商人兑换数据
         * @implements IBusinessDuiHuan
         * @constructor
         * @param {IBusinessDuiHuan=} [properties] Properties to set
         */
        function BusinessDuiHuan(properties) {
            this.Dict = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * 商人兑换数据字典
         * @member {Object.<string,number>} Dict
         * @memberof BusinessDuiHuan
         * @instance
         */
        BusinessDuiHuan.prototype.Dict = $util.emptyObject;
    
        /**
         * Encodes the specified BusinessDuiHuan message. Does not implicitly {@link BusinessDuiHuan.verify|verify} messages.
         * @function encode
         * @memberof BusinessDuiHuan
         * @static
         * @param {IBusinessDuiHuan} message BusinessDuiHuan message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BusinessDuiHuan.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Dict != null && message.hasOwnProperty("Dict"))
                for (var keys = Object.keys(message.Dict), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.Dict[keys[i]]).ldelim();
            return writer;
        };
    
        /**
         * Decodes a BusinessDuiHuan message from the specified reader or buffer.
         * @function decode
         * @memberof BusinessDuiHuan
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BusinessDuiHuan} BusinessDuiHuan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BusinessDuiHuan.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BusinessDuiHuan(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.Dict === $util.emptyObject)
                        message.Dict = {};
                    key = reader.int32();
                    reader.pos++;
                    message.Dict[key] = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return BusinessDuiHuan;
    })();
    
    $root.CS_QueryFuBen = (function() {
    
        /**
         * Properties of a CS_QueryFuBen.
         * @exports ICS_QueryFuBen
         * @interface ICS_QueryFuBen
         * @property {number|null} [RoleId] CS_QueryFuBen RoleId
         * @property {number|null} [MapId] CS_QueryFuBen MapId
         * @property {number|null} [FuBenId] CS_QueryFuBen FuBenId
         */
    
        /**
         * Constructs a new CS_QueryFuBen.
         * @exports CS_QueryFuBen
         * @classdesc 装备副本请求数据
         * @implements ICS_QueryFuBen
         * @constructor
         * @param {ICS_QueryFuBen=} [properties] Properties to set
         */
        function CS_QueryFuBen(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CS_QueryFuBen RoleId.
         * @member {number} RoleId
         * @memberof CS_QueryFuBen
         * @instance
         */
        CS_QueryFuBen.prototype.RoleId = 0;
    
        /**
         * CS_QueryFuBen MapId.
         * @member {number} MapId
         * @memberof CS_QueryFuBen
         * @instance
         */
        CS_QueryFuBen.prototype.MapId = 0;
    
        /**
         * CS_QueryFuBen FuBenId.
         * @member {number} FuBenId
         * @memberof CS_QueryFuBen
         * @instance
         */
        CS_QueryFuBen.prototype.FuBenId = 0;
    
        /**
         * Encodes the specified CS_QueryFuBen message. Does not implicitly {@link CS_QueryFuBen.verify|verify} messages.
         * @function encode
         * @memberof CS_QueryFuBen
         * @static
         * @param {ICS_QueryFuBen} message CS_QueryFuBen message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CS_QueryFuBen.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.RoleId != null && message.hasOwnProperty("RoleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.RoleId);
            if (message.MapId != null && message.hasOwnProperty("MapId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MapId);
            if (message.FuBenId != null && message.hasOwnProperty("FuBenId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.FuBenId);
            return writer;
        };
    
        /**
         * Decodes a CS_QueryFuBen message from the specified reader or buffer.
         * @function decode
         * @memberof CS_QueryFuBen
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CS_QueryFuBen} CS_QueryFuBen
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CS_QueryFuBen.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CS_QueryFuBen();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.RoleId = reader.int32();
                    break;
                case 2:
                    message.MapId = reader.int32();
                    break;
                case 3:
                    message.FuBenId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        return CS_QueryFuBen;
    })();

    return $root;
})(protobuf);
