var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MyUI;
(function (MyUI) {
    var role;
    (function (role) {
        /**
         * 角色装备界面
         */
        class EquipPart extends ui.PlayerBag.EquipPartUI {
            constructor() {
                super();
                this._txtName.changeText(gameIns.gameState.RoleName);
                this._txtCombat.changeText(ConfigLoca.UI_COMMON_ZhanliTitle + gameIns.gameState.roleData.CombatForce);
            }
            createChildren() {
                super.createChildren();
                this.equipIcon = new Map();
                this.equipIcon.set(ItemCategories.HuFu, this._iconAmulet);
                this.equipIcon.set(ItemCategories.XiangLian, this._iconNecklace);
                this.equipIcon.set(ItemCategories.JieZhi, this._iconLeftRing);
                this.equipIcon.set((ItemCategories.EquipMax + ItemCategories.JieZhi), this._iconRightRing);
                this.equipIcon.set(ItemCategories.WeaponStart, this._iconWeapon);
                this.equipIcon.set(ItemCategories.TouKui, this._iconHelmet);
                this.equipIcon.set(ItemCategories.KaiJia, this._iconArmour);
                this.equipIcon.set(ItemCategories.HuShou, this._iconGloves);
                this.equipIcon.set(ItemCategories.HuTui, this._iconLegs);
                this.equipIcon.set(ItemCategories.XueZi, this._iconShoes);
                this.equipIcon.forEach(value => value.ownerType = GoodsOwnerTypes.SelfBag);
                // 事件注册
                gameEventBus.equipLoad.on(this, this._onEquipLoad);
                gameEventBus.equipUnload.on(this, this._onEquipUnload);
                gameEventBus.combatForceChange.on(this, this._updateCombatForce);
                this._updateCharacterView();
            }
            destroy(destroyChild) {
                gameEventBus.equipLoad.off(this, this._onEquipLoad);
                gameEventBus.equipUnload.off(this, this._onEquipUnload);
                gameEventBus.combatForceChange.off(this, this._updateCombatForce);
                if (this.m_characterView)
                    this.m_characterView.destroy(destroyChild);
                if (this.m_uiScene)
                    this.m_uiScene.destroy(destroyChild);
                super.destroy(destroyChild);
            }
            /** @implements */
            enterPart() {
                this._updateAllEquips();
                this._updateCombatForce();
            }
            /**
             * 更新角色模型
             */
            _updateCharacterView() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this.m_characterView) {
                        this.m_uiScene = Laya.Scene.load(Global.getMapPath("ui_character"));
                        this.addChild(this.m_uiScene);
                        const dtRole = Global.Data.roleData;
                        const sklResName = Global.getSkeletonNameByOccupation(dtRole.Occupation);
                        const sklUrl = Global.getSkeletonResPath(sklResName);
                        const nakeBodyRes = Global.getNakePartsList(dtRole.Occupation);
                        this.m_characterView = new Logic.CharacterView(sklUrl, undefined, nakeBodyRes);
                        this.m_characterView.setDefaultAni(Logic.Player.aniName_Stand); // 设置默认的动作为站立
                        this.m_uiScene.addChild(this.m_characterView);
                    }
                    this.m_characterView.changeEquip(Global.Data.roleData.GoodsDataList);
                });
            }
            /**
             * 更新所有装备显示
             */
            _updateAllEquips() {
                if (Super.GData.RoleUsingGoodsDataList.size <= 0) {
                    Global.GetUsingGoodsDataList(); // 获取所有已装备在身上的物品
                }
                this.equipIcon.forEach((value, key) => {
                    const dtGoods = this._getUsingGoodsDataByCategory(key);
                    value.updateByGoodsData(dtGoods);
                    value.visible = (dtGoods != null);
                });
            }
            /**
             * 更新战斗力显示
             */
            _updateCombatForce() {
                this._txtCombat.text = Global.String.Format(Loca.getLang("战斗力:{0}"), Global.Data.roleData.CombatForce);
            }
            /**
             * 佩戴装备回调
             * @param value
             */
            _onEquipLoad(dtGoods) {
                if (!this.visible)
                    return; // 隐藏的时候不刷新，节省性能
                const voGoods = tableMgr.goodsTable.Find(dtGoods.GoodsID);
                let nCategory = voGoods.Categoriy;
                if (nCategory === ItemCategories.JieZhi) {
                    // 戒指穿戴时BagIndex会变为0=左手、1=右手
                    if (dtGoods.BagIndex === HandTypes.ZuoShou)
                        nCategory = ItemCategories.JieZhi;
                    else if (dtGoods.BagIndex === HandTypes.YouShou)
                        nCategory = (ItemCategories.EquipMax + ItemCategories.JieZhi);
                }
                else if (nCategory >= ItemCategories.WeaponStart && nCategory <= ItemCategories.WeaponEnd) {
                    nCategory = ItemCategories.WeaponStart;
                }
                const icon = this.equipIcon.get(nCategory);
                if (dtGoods.Using > 0) {
                    icon.updateByGoodsData(dtGoods);
                    icon.visible = true;
                }
                else {
                    icon.updateByGoodsData(null);
                    icon.visible = false;
                }
                this._updateCharacterView();
            }
            /**
             * 卸下装备回调
             * @param value
             */
            _onEquipUnload(dtGoods) {
                if (!this.visible)
                    return; // 隐藏的时候不刷新，节省性能
                for (const [key, value] of this.equipIcon) {
                    if (value && value.goodsData && value.goodsData.Id === dtGoods.Id) {
                        value.updateByGoodsData(null);
                        value.visible = false;
                        if (key >= ItemCategories.WeaponStart && key <= ItemCategories.WeaponEnd) {
                            // TODO: 去掉人物模型中武器
                        }
                        break;
                    }
                }
                this._updateCharacterView();
            }
            /**
             * 根据类型获取正在使用的装备数据
             * @param nCategory 道具类型
             */
            _getUsingGoodsDataByCategory(nCategory) {
                const dic = Super.GData.RoleUsingGoodsDataList;
                for (const [key, value] of dic) {
                    const voGoods = tableMgr.goodsTable.Find(value.GoodsID);
                    if (nCategory === ItemCategories.WeaponStart) {
                        if (voGoods.Categoriy >= ItemCategories.WeaponStart
                            && voGoods.Categoriy <= ItemCategories.WeaponEnd) {
                            return value;
                        }
                    }
                    else if (nCategory === ItemCategories.JieZhi) { // 戒指穿戴时BagIndex会变为0=左手、1=右手
                        if (voGoods.Categoriy === ItemCategories.JieZhi
                            && value.BagIndex === HandTypes.ZuoShou) {
                            return value;
                        }
                    }
                    else if (nCategory === (ItemCategories.JieZhi + ItemCategories.EquipMax)) {
                        if (voGoods.Categoriy === ItemCategories.JieZhi
                            && value.BagIndex === HandTypes.YouShou) {
                            return value;
                        }
                    }
                    else if (nCategory === voGoods.Categoriy) {
                        return value;
                    }
                }
                return null;
            }
        }
        role.EquipPart = EquipPart;
    })(role = MyUI.role || (MyUI.role = {}));
})(MyUI || (MyUI = {}));
//# sourceMappingURL=EquipPart.js.map