var tables;
(function (tables) {
    /**
     * 物品表数据，对应Goods.json
     */
    class GoodsVO {
    }
    tables.GoodsVO = GoodsVO;
    /**
     * 物品表
     */
    class GoodsTable extends tables.DataTable {
        constructor() {
            super("Goods", "ID", 1);
            this.mRowConverter = this.json2GoodsVO;
        }
        /**
         * 把json数据转换成GoodsVO
         * @param jsonRowData 要转换的json数据
         */
        json2GoodsVO(jsonRowData) {
            const rowRet = jsonRowData;
            if (jsonRowData.PiLiangUse) {
                rowRet.PiLiangUse = parseInt(jsonRowData.PiLiangUse) > 0;
            }
            else {
                rowRet.PiLiangUse = false;
            }
            return rowRet;
        }
        /**
         * 获取道具名称
         * @param goodsID 道具ID
         * @param bColor 是否包含品质颜色
         */
        getName(goodsID, bColor = false) {
            const vo = super.Find(goodsID);
            if (vo) {
                if (bColor)
                    return Global.GetColorStringForNGUIText(vo.GoodsColor, Loca.getLang(vo.Title));
                else
                    return Loca.getLang(vo.Title);
            }
            return ConfigLoca.UI_LITERAL_NONE;
        }
        /**
         * 获取道具描述
         * @param goodsID 道具ID
         */
        getDesc(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.Description;
            return "";
        }
        /**
         * 获取道具分类
         * @param goodsID 道具ID
         */
        getCategoriy(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.Categoriy;
            return ItemCategories.Invalid;
        }
        /**
         * 获取道具的3d资源名称
         * @param goodsID 道具ID
         */
        getGoods3DResNameByID(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.ResName;
            return null;
        }
        /**
         * 获取道具品质
         * @param goodsID 道具ID
         */
        getQuality(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.ItemQuality;
            return GoodsQuality.White;
        }
        /**
         * 获取道具再造点
         * @param goodsID 道具ID
         */
        getZaiZaoDian(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.ChangeZaiZao;
            return 0;
        }
        /**
         * 获取道具可以叠加的值
         * @param goodsID 道具ID
         */
        getGridNum(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.GridNum;
            return 1;
        }
        /**
         * 获取道具的职业
         * @param goodsID 道具ID
         */
        getOccupation(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.ToOccupation;
            return -1;
        }
        /**
         * 获取道具图片
         * @param goodsID 道具ID
         */
        getIconCode(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return parseInt(vo.IconCode);
            return -1;
        }
        /**
         * 获取道具声音
         * @param goodsID 道具ID
         */
        getSound(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.Sound;
            return "";
        }
        /**
         * 获取掉落音效
         * @param goodsID 道具ID
         */
        getDropSound(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.DropSound;
            return "";
        }
        /**
         * 获取拾取音效
         * @param goodsID 道具ID
         */
        getGetSound(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.GetSound;
            return "";
        }
        /**
         * 道具字符串颜色
         * @param goodsID 道具ID
         */
        getGoodsColor(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.GoodsColor;
            return "ffffff";
        }
        /**
         * 获取道具的使用模式(是否允许双击使用)
         * @param goodsID 道具ID
         */
        getUsingMode(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.UsingMode;
            return 0;
        }
        /**
         * 获取道具针对的性别
         * @param goodsID 道具ID
         */
        getToSex(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.ToSex; // 0男 1女
            return -1;
        }
        /**
         * 获取掉落道具的3d资源名称
         * @param goodsID 道具ID
         */
        getFallGoods3DResName(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.FallGoodsIcon;
            return "";
        }
        /**
         * 是否是贵重的物品
         * @param goodsID 道具ID
         */
        isValuable(goodsID) {
            const vo = super.Find(goodsID);
            if (vo)
                return vo.Valuables === 1;
            return false;
        }
    }
    tables.GoodsTable = GoodsTable;
})(tables || (tables = {}));
//# sourceMappingURL=GoodsTable.js.map