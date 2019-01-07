namespace GameMode {
	/**
	 * PlayingMode的消息处理
	 */
	// tslint:disable-next-line:class-name
	export class PlayingMode_NetMsg {
		private mPlayingMode: PlayingMode = null; // PlayingMode引用
		private mMsgHandler = {}; // 定义消息处理的映射.注:理论上这样做比switch速度快,且方便维护

		constructor() {

		}

		public destroy() {
			this.mMsgHandler = null;
			this.mPlayingMode = null;
		}

		/**
		 * 处理来自GameServer的消息
		 * @param uMsgtype 指定要处理的消息类型
		 * @param msgReader 指定消息包数据
		 * @return 如果消息处理过了,返回true,否则返回false
		 */
		public processNetMsgHandler(uMsgtype: EMessageType, msgReader: protobuf.Reader): boolean {
			const msgHandler: (msgReader: protobuf.Reader) => void = this.mMsgHandler[uMsgtype];
			if (msgHandler) {
				// msgHandler(msgReader);
				msgHandler.call(this, msgReader);
				return true;
			}
			return false;
		}

		/**
		 * 注册网络消息处理
		 * @param value PlayingMode
		 */
		public registerNetMsgHandler(value: PlayingMode) {
			this.mPlayingMode = value;
			const msgHandler = this.mMsgHandler;

			// --------------------
			// 处理NPC任务状态
			// --------------------
			msgHandler[EMessageType.CMD_SPR_NPCSTATELIST] = (msgReader: protobuf.Reader) => {
				const npcTaskStateList = msgReader.array<NetMsg.NPCTaskState>(NetMsg.NPCTaskState.decode);
				const roleData = gameIns.gameState.roleData;
				roleData.NPCTaskStateList = npcTaskStateList;

				// 刷新NPC的任务显示
				npcTaskStateList.forEach((task) => {
					this.mPlayingMode.mainLevel.serverUpdateNPCTaskState(SpriteBaseIds.calcNpcRoleId(task.NPCID), task.TaskState);
				});
			};

			// --------------------
			// 更新NPC身上的任务状态
			// --------------------
			msgHandler[EMessageType.CMD_SPR_UPDATENPCSTATE] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				this.mPlayingMode.mainLevel.serverUpdateNPCTaskState(parseInt(fields[0]), parseInt(fields[1]));
			};

			// --------------------
			// 添加一个NPC
			// --------------------
			msgHandler[EMessageType.CMD_SPR_NEWNPC] = (msgReader: protobuf.Reader) => {
				const npcRole = NetMsg.NPCRole.decode(msgReader);
				this.mPlayingMode.mainLevel.addNpc(npcRole);
			};

			// --------------------
			// 删除一个NPC
			// --------------------
			msgHandler[EMessageType.CMD_SPR_DELNPC] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const npcID = parseInt(fields[0]);
				const mapCode = parseInt(fields[1]);
				this.mPlayingMode.mainLevel.delNPC(npcID, mapCode);
			};

			// --------------------
			// 回血回蓝消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_RELIFE] = (msgReader: protobuf.Reader) => {
				const datReverted = NetMsg.SpriteRelifeData.decode(msgReader);
				this._updateActorLife(datReverted.roleID, datReverted.lifeV, datReverted.magicV);
			};

			// --------------------
			// 添加一个Monster
			// --------------------
			msgHandler[EMessageType.CMD_SYSTEM_MONSTER] = (msgReader: protobuf.Reader) => {
				const datMonster = NetMsg.MonsterData.decode(msgReader);
				if (datMonster && datMonster.LifeV > 0) {
					const tLevel = this.mPlayingMode.mainLevel;
					if (tLevel && !tLevel.findMonster(datMonster.RoleID)) {
						tLevel.addMonster(datMonster);
					}
				}
			};

			// --------------------
			// 删除指定的Monster或角色
			// --------------------
			msgHandler[EMessageType.CMD_SPR_LEAVE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nActorID = parseInt(aFields[0]);
				const tLevel = this.mPlayingMode.mainLevel;
				tLevel && tLevel.delActor(nActorID);
			};

			// --------------------
			// 处理与NPC对话的消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_CLICKON] = (msgReader: protobuf.Reader) => {
				const npcData = NetMsg.NPCData.decode(msgReader);
				// to do ... 弹出与NPC对话的界面,处理数据的显示
				this.processNpcClickonResult(npcData);
				// to do ... 切换玩家的状态到与NPC对话状态(不可以移动?)
				this.mPlayingMode.localPlayerController.SetState(Logic.EControllerStateId.Idling);
			};

			// --------------------
			// 处理接受新任务后,身上任务的状态更新
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MODTASK] = this.handleModTask;

			// --------------------
			// 开始游戏
			// --------------------
			msgHandler[EMessageType.CMD_PLAY_GAME] = (msgReader: protobuf.Reader) => {
				gameIns.gameState.PlayGame = true;
				// TODO: 其他数据待处理
			};

			// --------------------
			// 添加新的任务
			// --------------------
			msgHandler[EMessageType.CMD_SPR_NEWTASK] = this.handleNewTask;

			// --------------------
			// 获取属性消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_GETATTRIB2] = this.handleGetAttribute;

			// --------------------
			// 添加一个道具到背包
			// --------------------
			msgHandler[EMessageType.CMD_SPR_ADD_GOODS] = this.handleAddGoods;

			// --------------------
			// 金钱改变
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MONEYCHANGE] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const roleData = gameIns.gameState.roleData;
				if (parseInt(fields[0]) !== roleData.RoleID) {
					Global.Log.Error("不是我的(roldId:%d)金钱改变,竟然发给了我(roleId)?", parseInt(fields[0]), roleData.RoleID);
					return;
				}
				const oldMoney1 = roleData.Money1;
				roleData.Money1 = parseInt(fields[1]);
				const subMoney1 = roleData.Money1 - oldMoney1;
				roleData.Money2 = parseInt(fields[2]);
				// 银币改变
				gameEventBus.huoBiNumsRefresh.event(MoneyTypes.TongQian);
				// 通知金钱改变
				// gameEventBus.money1Changed.event(subMoney1);

                /* to do ... 刷新界面. 应该监听 gameEventBus.money1Changed 事件,而不是直接在这里调用
                 if (subMoney1 > 0)
                {
                    Super.HintMainText(StringUtil.substitute(Loca.getLang("绑定金币 +{0}"), subMoney1));
                }
                 */
			};

			// --------------------
			// 确定任务完成的消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_COMPTASK] = this.handleCompleteTask;

			// --------------------
			// 经验改变消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_EXPCHANGE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nNewExp = parseInt(aFields[1]);
				const nNewLv = parseInt(aFields[2]);
				const nAddExp = parseInt(aFields[3]);
				const datLeader = Global.Data.roleData;
				let nChangeLife = datLeader.ChangeLifeCount;
				if (aFields.length >= 5) nChangeLife = parseInt(aFields[4]);
				const nOldLv = datLeader.Level;
				datLeader.ChangeLifeCount = nChangeLife;
				datLeader.Level = nNewLv;
				datLeader.Experience = nNewExp;
				if (nAddExp > 0) {
					uiMgr.hintText(Global.String.Format(Loca.getLang("1632"), nAddExp)); // 经验 +{0}
					gameEventBus.expChange.event(nAddExp, nNewExp);
				}
				const bLevelChange = nOldLv !== nNewLv;
				if (bLevelChange) {
					gameEventBus.levelChange.event(nOldLv, nNewLv);
					if (gameIns.gameState.roleData.AutoAssignPropertyPoint !== 0) {
						Global.tryAddRecommendPoint();
					}
					const newGongNengId = GongnengYugaoMgr.getNewIconOnLevelUp(nOldLv, datLeader.Level);
					if (newGongNengId >= 0) {
						this.processImgAnimation(newGongNengId);
					}
					// TODO: 一堆系统的更新，待补充
				}
			};

			/**
             * 自动战斗消息处理
             */
			msgHandler[EMessageType.CMD_SPR_AUTOFIGHT] = this.handleAutoFight;

            /**
             * 技能消息同步
             */
			msgHandler[EMessageType.CMD_SPR_MAGICCODE] = this.handleMagicCode;

			/** 更新角色数据 */
			msgHandler[EMessageType.CMD_SPR_UPDATE_ROLEDATA] = (msgReader: protobuf.Reader) => {
				const datRole = NetMsg.SpriteLifeChangeData.decode(msgReader);
				if (datRole) {
					this._updateActorLife(datRole.roleID, datRole.currentLifeV, datRole.currentMagicV, datRole.lifeV, datRole.magicV);
					// TODO: 更新移动速度
				}
			};

			/**
             * 技能cd移除处理
             */
			msgHandler[EMessageType.CMD_SPR_REMOVE_COOLDOWN] = this.handleSkillCoolDown;

			// --------------------
			// 背包整理
			// --------------------
			msgHandler[EMessageType.CMD_SPR_RESETBAG] = (msgReader: protobuf.Reader) => {
				const lstGoodsData = NetMsg.S2CResetBag.decode(msgReader).GoodsDataList;
				if (lstGoodsData && lstGoodsData.length > 0) {
					const dtGoods = lstGoodsData[0];
					if (dtGoods.Site === SaleGoodsConsts.NormalBag) {
						Global.Data.roleData.GoodsDataList = lstGoodsData;
						gameEventBus.updateParcel.event(null);
					} else if (dtGoods.Site === SaleGoodsConsts.MengchongStoneBag) {
						Global.Data.roleData.MengChongsInBag = lstGoodsData;
						// TODO: 更新
					}
				}
			};

			// --------------------
			// 道具修改
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MOD_GOODS] = this.handleModGoods;

			// --------------------
			// 换装消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_CHGCODE] = (msgReader: protobuf.Reader) => {
				const changeEquipData = NetMsg.ChangeEquipData.decode(msgReader);
				// 自己换装也会走这里，判断一下，不走，在外面会执行
				if (changeEquipData.RoleID !== gameIns.gameState.RoleID) {
					const tLevel = this.mPlayingMode.mainLevel;
					tLevel && tLevel.ServerChangeCode(changeEquipData);
				}
			};

			// --------------------
			// 开始寻路消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MOVE] = (msgReader: protobuf.Reader) => {
				const moveData = NetMsg.SpriteNotifyOtherMoveData.decode(msgReader);
				const localPlayerRoleId = this.mPlayingMode.localPlayer.getRoleID();
				if (localPlayerRoleId === moveData.roleID) {
					// 本地玩家的移动数据,只考虑移动速度缩放即可
					const localPlayerStoreBoard = this.mPlayingMode.mainLevel.findStoryBoard(localPlayerRoleId);
					if (localPlayerStoreBoard) {
						localPlayerStoreBoard.setMovingScale(moveData.moveCost);
					}
					return;
				}

				// 其它角色的移动
				this.mPlayingMode.mainLevel.ServerLinearMove(moveData);
			};

			// --------------------
			// 技能列表消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_GETSKILLINFO] = (msgReader: protobuf.Reader) => {
				const dtMsg = NetMsg.SkillDataList.decode(msgReader);
				if (!dtMsg) return;
				const lstSkillData = dtMsg.list;
				if (!lstSkillData) return;
				Global.Data.roleData.SkillDataList = lstSkillData;
				gameEventBus.updateSkillList.event();
				// TODO: 主界面提示队列（GameHintQueueIcon）
			};

			// --------------------
			// 玩家请求VIP信息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_GETVIPINFO] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const levelExp = parseInt(fields[0]);
				const rewardFlag = parseInt((fields[1]));
				// Vip界面数据刷新
				gameEventBus.vipPartRefresh.event(levelExp, rewardFlag);
			};

			// --------------------
			// 玩家领取VIP等级奖励
			// --------------------
			msgHandler[EMessageType.CMD_SPR_GETVIPLEVELAWARD] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const result = parseInt(fields[0]);
				const rewardFlag = parseInt((fields[1]));
				if (result >= 1) {
					// Vip界面奖励领取结果
					gameEventBus.vipRewardResult.event(rewardFlag);
				}
				switch (result) {
					case -1: uiMgr.hintText(ConfigLoca.UI_VIP_贵族等级不够无法领取); break;
					case -2: uiMgr.hintText(ConfigLoca.UI_VIP_RewardAlwaysGet); break;
					case -3: uiMgr.hintText(ConfigLoca.UI_VIP_GetLose); break;
					case -4: uiMgr.hintText(ConfigLoca.UI_COMMON_背包已满请清理背包后再领取); break;
				}
			};

			// --------------------
			// 玩家VIP等级升级
			// --------------------
			msgHandler[EMessageType.CMD_SPR_VIPLEVELUP] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const vipLevel = parseInt(fields[1]);
				Global.Data.roleData.VIPLevel = vipLevel;
				// Vip等级改变
				gameEventBus.vipLevelChange.event();
			};

			// --------------------
			// 行为同步
			// --------------------
			msgHandler[EMessageType.CMD_SPR_ACTTION] = this.handlePlayerAction;

			// --------------------
			// 攻击同步
			// --------------------
			msgHandler[EMessageType.CMD_SPR_ATTACK] = (msgReader: protobuf.Reader) => {
				const datAttack = NetMsg.SpriteAttackResultData.decode(msgReader);
				if (!datAttack) return;
				const datLeader = Global.Data.roleData;
				const nOldLv = datLeader.Level;
				const nNewLv = datAttack.newLevel;
				datLeader.Experience = datAttack.experience;
				datLeader.Level = nNewLv;

				const enemyCharacter = this.mPlayingMode.mainLevel.findCharacter(datAttack.enemy);
				if (!enemyCharacter)
					return;

				// 受伤害者飘字
				MyUI.DamageHudManager.instance().showDamage(enemyCharacter.getPositionRef(), datAttack.injure, datAttack.burst);

				this._updateActorLife(datAttack.enemy, datAttack.enemyLife);
				if (datAttack.burst > 0) {
					// TODO: 震屏
				}
				if (nNewLv !== nOldLv) { // 人物等级变化通知
					gameEventBus.levelChange.event(nOldLv, nNewLv);
				}
			};

			// --------------------
			// 伤害消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_INJURE] = (msgReader: protobuf.Reader) => {
				const datInjured = NetMsg.SpriteInjuredData.decode(msgReader);
				if (!datInjured) return;
				this._updateActorLife(datInjured.injuredRoleID, datInjured.injuredRoleLife);
				this.mPlayingMode.mainLevel.serverInjured(datInjured);
			};

			// --------------------
			// 技能升级消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_UPSKILLLEVEL] = (msgReader: protobuf.Reader) => {
				const dtMsg = NetMsg.SCSkillLevelUp.decode(msgReader);
				if (!dtMsg) return;
				if (dtMsg.RoleID !== Global.Data.roleData.RoleID) return;
				switch (dtMsg.State) {
					case -1: uiMgr.hintText(Loca.getLang("升级失败，还没有学习该技能！")); break;
					case -2: uiMgr.hintText(Loca.getLang("升级失败，静态数据读取错误！")); break;
					case -3: uiMgr.hintText(Loca.getLang("升级失败，已经是最高级了！")); break;
					case -4: uiMgr.hintText(Loca.getLang("升级失败，重生等级没有达到需求等级！")); break;
					case -5: uiMgr.hintText(Loca.getLang("升级失败，角色等级没有达到需求等级！")); break;
					case -6: uiMgr.hintText(Loca.getLang("升级失败，该技能训练度不够！")); break;
					case -7:
						uiMgr.hintText(Loca.getLang("升级失败，金币不足！"));
						// Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedJinbi, null);
						break;
					case -8:
						uiMgr.hintText(Loca.getLang("升级失败，斗气值不足！"));
						// Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedMojing, CloseGamePayerRoleWindow);
						break;
					case -9: uiMgr.hintText(Loca.getLang("升级失败，熟练度不够无法升级！")); break;
				}
				if (dtMsg.State < 0) return;
				// TODO: 主界面提示队列（GameHintQueueIcon）
				// GameHintQueueIcon.OnSkillUsedNumFull(-1);
				gameEventBus.skillUpLevel.event(dtMsg);
			};
			// --------------------
			// 角色添加了新技能通知(只通知自己)
			// --------------------
			msgHandler[EMessageType.CMD_SPR_ADD_SKILL] = (msgReader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(fields[0]);
				if (roleId === gameIns.gameState.RoleID) {
					const skillID = parseInt(fields[2]);
					Global.AddSkillData(parseInt(fields[1]), skillID, parseInt(fields[3]));
					gameEventBus.skillAdd.event(skillID);
				}
			};
			// --------------------
			// 角色参数变化消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_ROLEPARAMSCHANGE] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(fields[0]);
				const index = parseInt(fields[1]);
				const newValue = parseInt(fields[2]);
				if (roleId === Global.Data.roleData.RoleID) {
					if (index >= 0 && index < Global.Data.roleData.RoleCommonUseIntPamams.length) {
						const oldValue = Global.Data.roleData.RoleCommonUseIntPamams[index];
						Global.Data.roleData.RoleCommonUseIntPamams[index] = newValue; // 更新相应值
						// OnRoleCommonUseParamsValueChange(index, oldValue, newValue);
						gameEventBus.huoBiNumsRefresh.event(MoneyTypes.JingYuanZhi);
					}
					// TODO: updateUI
				} else {
					const otherRoleData = Global.Data.OtherRoles.get(roleId);
					if (otherRoleData) {
						if (index >= 0 && index < otherRoleData.RoleCommonUseIntPamams.length) {
							const oldValue = otherRoleData.RoleCommonUseIntPamams[index];
							otherRoleData.RoleCommonUseIntPamams[index] = newValue; // 更新相应值
							// OnRoleCommonUseParamsValueChange(index, oldValue, newValue, true, roleId);
						}
					}
				}
			};

			// --------------------
			// 修改快捷使用配置
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MODKEYS] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				if (fields[1] === "0") {
					Global.Data.roleData.MainQuickBarKeys = fields[2];
					Super.ParseMainQuickKeys(Global.Data.roleData.MainQuickBarKeys);
					gameEventBus.quickKeyChange.event();
				} else {
					Global.Data.roleData.OtherQuickBarKeys = fields[2];
					Super.ParseOtherQuickKeys(Global.Data.roleData.OtherQuickBarKeys);
				}
			};

			// --------------------
			// 受击消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_HITED] = (msgReader: protobuf.Reader) => {
				const datHited = NetMsg.SpriteHitedData.decode(msgReader);
				if (datHited) {
					this.mPlayingMode.mainLevel.serverHited(datHited);
				}
			};

			// --------------------
			// 同步释放招式消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_MAGIC_ATTACK] = (msgReader: protobuf.Reader) => {
				const datAttack = NetMsg.SpriteMagicAttackData.decode(msgReader);
				if (datAttack) {
					this.mPlayingMode.mainLevel.serverMagicAttack(datAttack);
				}
			};

			// --------------------
			// 角色加载完毕的消息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_LOADALREADY] = (msgReader: protobuf.Reader) => {
				const datLoad = NetMsg.LoadAlreadyData.decode(msgReader);
				if (datLoad) {

				}
			};

			/**
			 * 角色移动数据封装
			 */
			msgHandler[EMessageType.CMD_SPR_CHANGEPOS] = (msgReader: protobuf.Reader) => {
				const fields = gameIns.getStringMsgFields(msgReader);
				const nRoleID = parseInt(fields[0]);
				const toMapX = parseInt(fields[1]);
				const toMapY = parseInt(fields[2]);
				const toMapDirection = parseInt(fields[3]);
				const animation = parseInt(fields[4]);
				this.mPlayingMode.mainLevel.serverChangePos(nRoleID, toMapX, toMapY, toMapDirection, animation);
			};

			// --------------------
			// 其他玩家的消息
			// --------------------
			msgHandler[EMessageType.CMD_OTHER_ROLE] = (msgReader: protobuf.Reader) => {
				const datMiniRole = NetMsg.RoleDataMini.decode(msgReader);
				let datRole: NetMsg.RoleData = null;
				if (datMiniRole) datRole = Global.ClientDataToRoleDataMini(datMiniRole);
				else datRole = NetMsg.RoleData.decode(msgReader);
				if (!datRole) {
					return;
				}
				Global.Data.OtherRoles.set(datRole.RoleID, datRole);
				Global.Data.OtherRolesByName.set(datRole.RoleName, datRole);
				if (datRole.MapCode === Global.Data.roleData.MapCode) {
					this.mPlayingMode.mainLevel.addNetPlayer(datRole);
				}
			};

			// --------------------
			// 查询七日活动信息(七日狂欢登录/七日狂欢充值/七日狂欢目标/七日狂欢抢购 活动领取都走这个)
			// --------------------
			msgHandler[EMessageType.CMD_SPR_SEVEN_DAY_ACT_QUERY] = (msgReader: protobuf.Reader) => {
				const sevenDayData = NetMsg.SevenDayActQueryData.decode(msgReader);
				switch (sevenDayData.ActivityType) {
					case FuLiActivityEnum.QiRiKuangHuanLogin:
						// 7日登陆信息 
						gameEventBus.sevenDayLoginInfo.event(sevenDayData);
						break;
				}
			};

			// --------------------
			// 领取七日活动奖励返回数据(七日狂欢登录/七日狂欢充值/七日狂欢目标/七日狂欢抢购 活动领取都走这个)
			// --------------------
			msgHandler[EMessageType.CMD_SPR_SEVEN_DAY_ACT_GET_AWARD] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const code = parseInt(aFields[0]);      // 返回领取结果
				const actType = parseInt(aFields[1]);   // 活动的类型
				const position = parseInt(aFields[2]);  // 领取的位置(第几天)
				if (code > 0) {
					switch (code) {
						case 1: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_NoActTimes); break;	// 不在活动时间
						case 2: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_ServerConfigError); break;	// 服务器配置出错
						case 3: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_BagNoHas); break;	// 背包不足
						case 4: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_DataBaseError); break;	// 数据库异常
						case 5: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_不满足领奖条件); break;	// 不满足领奖条件
						case 6: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_客户端访问参数错误); break;	// 客户端访问参数错误
						case 7: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_DiamondNoHas); break;	// 钻石不足		
						case 8: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_可抢购数量不足); break;	// 可抢购数量不足
						default: uiMgr.hintText(ConfigLoca.UI_SEVENDAYLOGIN_GetRewardError.replace("{0}", code.toString())); break;
					}
				} else {
					// 对应的活动发对应的事件
					switch (actType) {
						case FuLiActivityEnum.QiRiKuangHuanLogin: gameEventBus.sevenDayLoginRewardGet.event(position); break;  // 7日登陆奖励领取
					}
				}
			};

			// --------------------
			// 同步怪物掉落拥有者信息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_UPDATE_MONSTER_BELONGTO_INFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleID = parseInt(aFields[0]);
				const nLockObject = parseInt(aFields[1]);
				const nFallBelongToRoleID = parseInt(aFields[2]);
				const sFallBelongToRoleName = aFields[3];
				const datMonster = Global.Data.SystemMonsters.get(nRoleID);
				if (datMonster) {
					datMonster.FallBelongToRoleID = nFallBelongToRoleID;
					datMonster.FallBelongToName = sFallBelongToRoleName;
					// TODO: updateUI
				}
			};
			/**
			 * 功能开启提示
			 */
			msgHandler[EMessageType.CMD_SPR_ClientFunOpenTiShi] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const openId = parseInt(aFields[0]);
				const taskNums = parseInt(aFields[1]);
				const pickUpState = !(aFields[2] === "0");
				if (openId !== -1) {
					// 即将开放的功能
					gameEventBus.funOpenTiShi.event(openId, taskNums, pickUpState);
				}
				else {
					// 已无开放的功能
					gameEventBus.funOpenTiShiShowState.event(false);
				}
			};
			/**
			 * 功能开启功能领取
			 */
			msgHandler[EMessageType.CMD_SPR_ClientFunOpenTiShiRewardPickUp] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const code = parseInt(aFields[0]);
				if (code === 1)                  // 已领取过
					uiMgr.hintText(ConfigLoca.UI_COMMON_奖励已领取过);
				else if (code === 2)          // 背包已满
					uiMgr.hintText(ConfigLoca.UI_COMMON_背包已满);
				gameEventBus.funOpenTiShiGetReward.event();
			};
			// --------------------
			// 停止移动
			// --------------------
			msgHandler[EMessageType.CMD_SPR_STOPMOVE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleID = parseInt(aFields[0]);
				const nStopIndex = parseInt(aFields[1]);
				this.mPlayingMode.mainLevel.stopOnNextGrid(nRoleID, nStopIndex);
			};

			// --------------------
			// 复活消息（人/怪物）
			// --------------------
			msgHandler[EMessageType.CMD_SPR_REALIVE] = (msgReader: protobuf.Reader) => {
				const datRealive = NetMsg.MonsterRealiveData.decode(msgReader);
				if (datRealive) {
					const tLevel = this.mPlayingMode.mainLevel;
					tLevel && tLevel.serverRealive(datRealive.RoleID, datRealive.PosX, datRealive.PosY, datRealive.Direction);
				}
			};

			// --------------------
			// 自动分配加点
			// --------------------
			msgHandler[EMessageType.CMD_SPR_SETAUTOASSIGNPROPERTYPOINT] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleID = parseInt(aFields[0]);
				const nFlag = parseInt(aFields[1]);
				if (nRoleID === gameIns.gameState.RoleID) {
					gameIns.gameState.roleData.AutoAssignPropertyPoint = nFlag;
					// TODO: updateUI
				}
			};

			// --------------------
			// 推荐属性加点
			// --------------------
			msgHandler[EMessageType.CMD_SPR_EXECUTERECOMMENDPROPADDPOINT] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRet = parseInt(aFields[0]);
				const nRoleID = parseInt(aFields[1]);
				// TODO: updateUI
			};

			// --------------------
			// 全套加成属性值更新
			// --------------------
			msgHandler[EMessageType.CMD_UPDATEALLTHINGINDEXS] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleID = parseInt(aFields[0]);
				if (nRoleID === gameIns.gameState.RoleID) {
					const allQualityIndex = parseInt(aFields[1]);
					const allForgeLevelIndex = parseInt(aFields[2]);
					const allJevelLevelIndex = parseInt(aFields[3]);
					const allZhuoYueNum = parseInt(aFields[4]);
					Global.Data.roleData.AllQualityIndex = allQualityIndex;
					Global.Data.roleData.AllForgeLevelIndex = allForgeLevelIndex;
					Global.Data.roleData.AllJewelLevelIndex = allJevelLevelIndex;
					Global.Data.roleData.AllZhuoYueNum = allZhuoYueNum;
				}
			};

			// --------------------
			// Buff数据
			// --------------------
			msgHandler[EMessageType.CMD_SPR_BUFFERDATA] = (msgReader: protobuf.Reader) => {
				const datBuff = NetMsg.BufferData.decode(msgReader);
				if (!datBuff) return;
				let aBuffDatas = gameIns.gameState.roleData.BufferDataList;
				if (!aBuffDatas) {
					aBuffDatas = [];
					gameIns.gameState.roleData.BufferDataList = aBuffDatas;
				}
				const nFindIdx = aBuffDatas.findIndex(element => element.BufferID === datBuff.BufferID);
				if (nFindIdx < 0) aBuffDatas.push(datBuff);
				else aBuffDatas[nFindIdx] = datBuff;
				// TODO: updateUI
			};

			// --------------------
			// 刷新图标状态信息
			// --------------------
			msgHandler[EMessageType.CMD_SPR_REFRESH_ICON_STATE] = (msgReader: protobuf.Reader) => {
				const datState = NetMsg.ActivityIconStateData.decode(msgReader);
				if (datState) {
					MyUI.ActivityTipManager.ServerUpdateIconStateData(datState);
				}
			};

			/** 地图切换 */
			msgHandler[EMessageType.CMD_SPR_MAPCHANGE] = this.handleMapChange;

			/** 通知切换地图 */
			msgHandler[EMessageType.CMD_SPR_NOTIFYCHGMAP] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nToMapId = parseInt(aFields[1]);
				const nToPosX = parseInt(aFields[2]);
				const nToPosY = parseInt(aFields[3]);
				const nDir = parseInt(aFields[4]);
				const nRelife = parseInt(aFields[5]);
				this.mPlayingMode.mainLevel.toMapConversionByMapCode(nToMapId, nToPosX, nToPosY, nDir, nRelife);
			};

			/** 获取活动数据 */
			msgHandler[EMessageType.CMD_SPR_GETHUODONGDATA] = (msgReader: protobuf.Reader) => {
				const datHuoDong = NetMsg.HuodongData.decode(msgReader);
				if (!datHuoDong) return;
				const datLastHuoDong = Global.Data.MyHuoDongData;
				const nLastRewardStep = datLastHuoDong ? datLastHuoDong.EveryDayOnLineAwardStep : -1;
				Global.Data.MyHuoDongData = datHuoDong;
				if (nLastRewardStep !== -1 && nLastRewardStep !== datHuoDong.EveryDayOnLineAwardStep) {
					gameEventBus.onlineRewardInfo.event();
				}
			};

			/** 在线奖励信息 */
			msgHandler[EMessageType.CMD_SPR_UPDATEEVERYDAYONLINEAWARDGIFTINFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nOnlineSecs = parseInt(aFields[1]); // 每日在线时间（秒）
				const nRewardStep = parseInt(aFields[2]); // 每日在线奖励到了第几步
				const sGoodsId = aFields[3]; // 抽中的物品

				gameIns.gameState.roleData.DayOnlineSecond = nOnlineSecs;
				const datHuoDong = Global.Data.MyHuoDongData;
				datHuoDong.EveryDayOnLineAwardStep = nRewardStep;
				datHuoDong.EveryDayOnLineAwardGoodsID = sGoodsId;
				gameEventBus.onlineRewardInfo.event();
			};

			/** 领取每日在线奖励 */
			msgHandler[EMessageType.CMD_SPR_GETEVERYDAYONLINEAWARDGIFT] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nRet = parseInt(aFields[1]); // 成功与否
				const nRewardStep = parseInt(aFields[2]); // 抽奖到了第几步
				const nOnlineSecs = parseInt(aFields[3]); // 每日在线时间（秒）
				// index的4-10都是道具Id（注意：道具Id列表包含的是从上次步数到本次抽到的步数，只包含了新抽到的几个）
				const aGoodsIds = [parseInt(aFields[4]), parseInt(aFields[5]),
				parseInt(aFields[6]), parseInt(aFields[7]), parseInt(aFields[8]),
				parseInt(aFields[9]), parseInt(aFields[10])];

				gameIns.gameState.roleData.DayOnlineSecond = nOnlineSecs;
				gameEventBus.onlineRewardGet.event(nRet, nRewardStep, aGoodsIds);
				switch (nRet) {
					case -1: uiMgr.hintText(ConfigLoca.UI_Online_Get_Failure_AllHadExtract); break;
					case -2: uiMgr.hintText(ConfigLoca.UI_Error_ConfigError); break;
					case -3: uiMgr.hintText(ConfigLoca.UI_Online_Get_Failure_TimeNotEnough); break;
					default: break;
				}
			};

			/** 等级奖励信息 */
			msgHandler[EMessageType.CMD_SPR_QUERYUPLEVELGIFTINFO] = (msgReader: protobuf.Reader) => {
				const datReward = NetMsg.GradeRewardData.decode(msgReader);
				if (datReward) {
					gameEventBus.gradeRewardInfo.event(datReward.flags);
				}
			};

			/** 领取等级奖励 */
			msgHandler[EMessageType.CMD_SPR_GETUPLEVELGIFTAWARD] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRet = parseInt(aFields[0]); // 领取结果
				const nItemId = parseInt(aFields[1]); // 奖励Id
				if (nRet === 1) {
					gameEventBus.gradeRewardGet.event(nItemId);
				} else {
					switch (nRet) {
						case -20: uiMgr.hintText(ConfigLoca.UI_Welfare_Get_Failure_GridNotEnough); break;
						case -101: uiMgr.hintText(ConfigLoca.UI_Grade_Get_Failure_LevelNotEnough); break;
						case -103: uiMgr.hintText(ConfigLoca.UI_Grade_Get_Failure_GradeHadGet); break;
						default: break;
					}
				}
			};

			/** 查询商城数据 */
			msgHandler[EMessageType.CMD_SPR_FETCHMALLDATA] = (msgReader: protobuf.Reader) => {
				const mSaleData = NetMsg.MallSaleData.decode(msgReader);
				// 抢购数据由服务器传过来，用来判断是否有抢购数据
				if (Global.Data.MallData === null) {
					Global.Data.MallData = mSaleData;
				} else {
					Global.Data.MallData.MallXmlString = mSaleData.MallXmlString;
					Global.Data.MallData.MallTabXmlString = mSaleData.MallTabXmlString;
					Global.Data.MallData.QiangGouXmlString = mSaleData.QiangGouXmlString;
				}
				// 商城商品数据
				gameEventBus.mallData.event();
			};

			/** 抢购商城购买物品 */
			msgHandler[EMessageType.CMD_SPR_MALLQIANGGOUBUYGOODS] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const result = parseInt(aFields[0]);            // 购买结果
				const qiangGouId = parseInt(aFields[1]);        // 抢购Id
				const buyNums = parseInt(aFields[2]);			// 购买的数量
				const saleNums = parseInt(aFields[3]);			// 出售的数量
				if (result < 0) {
					switch (result) {
						case -1: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyGoodsAlwaysXiaJia); break;
						case -2: uiMgr.hintText("钻石余额不足，无法购买物品\nTODO:产出链接"); break;
						case -3: uiMgr.hintText(ConfigLoca.UI_COMMON_BagFull_请清理出空格后再购买); break;
						case -20003: uiMgr.hintText(ConfigLoca.UI_COMMON_GoodsAlwaysSoldOver); break;
						case -20004: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyNumsMoreThan); break;
						case -20005: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyNumsMoreThan1); break;
						case -20006: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyNumsMoreThan2); break;
						default:
							uiMgr.hintText(ConfigLoca.UI_COMMON_BuyMallGoodsFailure.replace("{0}", result.toString()));
							break;
					}
				} else {
					// 抢购物品购买结果
					gameEventBus.qiangGouGoodsBuyResult.event(qiangGouId, buyNums, saleNums);
				}
			};
			/** 钻石货币数量改变 */
			msgHandler[EMessageType.CMD_SPR_USERMONEYCHANGE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(aFields[0]);
				const diamondNums = parseInt(aFields[1]);
				if (roleId === gameIns.gameState.RoleID) {
					// 差值(增加、减少多少)
					const addNums = diamondNums - gameIns.gameState.roleData.UserMoney;
					gameIns.gameState.roleData.UserMoney = diamondNums;
					if (addNums > 0)
						uiMgr.hintText(ConfigLoca.UI_COMMON_DiamondAddX.replace("{0}", addNums.toString()));
					gameEventBus.huoBiNumsRefresh.event(MoneyTypes.YuanBao);
				}
			};
			/** 金币数量改变 */
			msgHandler[EMessageType.CMD_SPR_USERYINLIANGCHANGE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(aFields[0]);
				const jinBiNums = parseInt(aFields[1]);
				if (roleId === gameIns.gameState.RoleID) {
					// 差值(增加、减少多少)
					const addNums = jinBiNums - gameIns.gameState.roleData.YinLiang;
					gameIns.gameState.roleData.YinLiang = jinBiNums;
					if (addNums > 0)
						uiMgr.hintText(ConfigLoca.UI_COMMON_JinBiAddX.replace("{0}", addNums.toString()));
					gameEventBus.huoBiNumsRefresh.event(MoneyTypes.YinLiang);
				}
			};
			/** 绑钻数量改变 */
			msgHandler[EMessageType.CMD_SPR_USERGOLDCHANGE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(aFields[0]);
				const bingDiamondNums = parseInt(aFields[1]);
				if (roleId === gameIns.gameState.RoleID) {
					// 差值(增加、减少多少)
					const addNums = bingDiamondNums - gameIns.gameState.roleData.Gold;
					gameIns.gameState.roleData.Gold = bingDiamondNums;
					if (addNums > 0)
						uiMgr.hintText(ConfigLoca.UI_COMMON_BindDiamondAddX + addNums);
					gameEventBus.huoBiNumsRefresh.event(MoneyTypes.BindYuanBao);
				}
			};
			/** 钻石、银币商城商品购买 */
			msgHandler[EMessageType.CMD_SPR_MALL_BUY] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const result = parseInt(aFields[0]);
				if (result < 0) {
					switch (result) {
						case -1: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyGoodsXiaJia); break;
						case -2: // 钻石余额不足，无法购买物品 
							// TODO:钻石途径	
							break;
						case -3: uiMgr.hintText(ConfigLoca.UI_COMMON_背包已满); break;
						case -102: break;
						default:
							uiMgr.hintText(ConfigLoca.UI_COMMON_BuyMallGoodsFailure.replace("{0}", `${result}`));
							break;
					}
				} else {
					windowMgr.closeWindow(WindowID.GoodsTip);
				}
			};
			/** 绑钻商城商品购买 */
			msgHandler[EMessageType.CMD_SPR_MALLZHENQIBUY] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const result = parseInt(aFields[0]);
				if (result < 0) {
					switch (result) {
						case -1: uiMgr.hintText(ConfigLoca.UI_COMMON_BuyGoodsXiaJia); break;
						case -2: break;
						case -3: uiMgr.hintText(ConfigLoca.UI_COMMON_背包已满); break;
						case -102: break;
						default:
							uiMgr.hintText(ConfigLoca.UI_COMMON_BuyMallGoodsFailure.replace("{0}", `${result}`));
							break;
					}
				} else {
					windowMgr.closeWindow(WindowID.GoodsTip);
				}
			};

			/** 开始潜心修炼 */
			msgHandler[EMessageType.CMD_SPR_STARTMEDITATE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nMeditationState = parseInt(aFields[1]); // 修炼状态
				if (gameIns.gameState.RoleID !== nRoleId || Global.Data.MeditateState === nMeditationState) {
					return;
				}
				Global.Data.MeditateState = nMeditationState;
				if (nMeditationState <= 0) {
					uiMgr.hintText(ConfigLoca.UI_Meditation_End_Meditation);
				}
				const vewMain = this.mPlayingMode.mainView;
				vewMain && vewMain.toggleMeditation(nMeditationState > 0);
			};

			/** 获取潜心修炼时间信息 */
			msgHandler[EMessageType.CMD_SPR_GETMEDITATETIMEINFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRoleId = parseInt(aFields[0]);
				const nSecs1 = parseInt(aFields[1]); // 安全区潜心修炼时间（秒）
				const nSecs2 = parseInt(aFields[2]); // 非安全区潜心修炼时间（秒）
				Global.Data.MeditateSecs1 = nSecs1;
				Global.Data.MeditateSecs2 = nSecs2;
				// 潜心修炼时间更新通知
				gameEventBus.meditationSecsNotify.event();
				// 更新小红点显示
				const nActiveCount = nSecs1 + nSecs2 >= Global.Data.MeditateMaxTime ? 1 : 0;
				MyUI.ActivityTipManager.OnChangeItemCountValue(ActivityTipTypes.MainMingXiangIcon, nActiveCount);
				// TODO: 领取提示
			};

			/** 获取潜心修炼经验 */
			msgHandler[EMessageType.CMD_SPR_GETMEDITATEEXP] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const nRet = parseInt(aFields[0]); // 领取结果
				const nExp = parseInt(aFields[1]); // 领取的经验
				if (nRet === 1) {
					Global.Data.MeditateSecs1 = 0;
					Global.Data.MeditateSecs2 = 0;
					// 潜心修炼时间更新通知
					gameEventBus.meditationSecsNotify.event();
					// 更新小红点显示
					MyUI.ActivityTipManager.OnChangeItemCountValue(ActivityTipTypes.MainMingXiangIcon, 0);
					// TODO: 领取提示
				} else {
					switch (nRet) {
						case -1:
							// TODO: 金币获取途径
							uiMgr.hintText(ConfigLoca.UI_Get_Failure_GoldNotEnough);
							break;
						case -2:
							// TODO: 钻石获取途径
							uiMgr.hintText(ConfigLoca.UI_Get_Failure_DiamondNotEnough);
							break;
						case -10: uiMgr.hintText(ConfigLoca.UI_Get_Failure_VipLevelNotEnough); break;
						case -11: uiMgr.hintText(ConfigLoca.UI_Get_Failure_VipLevelNotEnough); break;
					}
				}
			};

			/** 充值回馈 查询充值奖励信息 */
			msgHandler[EMessageType.CMD_SPR_QUERY_REPAYACTIVEINFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const state = aFields[0];  // 活动状态
				const type = parseInt(aFields[2]);  // 活动类型
				switch (type) {
					case FuLiActivityEnum.HeFuDaLiBao:  // 合服VIP大回馈   
						break;
					case FuLiActivityEnum.HeFuTotalLogin:  // 合服累计登陆
						break;
					case FuLiActivityEnum.HeFuCZFanLi:   // 合服充值返利
						break;
					case FuLiActivityEnum.HeFuPKKing:   // 合服PK王
						break;
					case FuLiActivityEnum.HefuLuolanZhengba:   // 合服龙城争霸
						break;
					case FuLiActivityEnum.MeiRiChongZhiNew:   // 每日充值（新1元、3元、6元）
						break;
					case FuLiActivityEnum.InputFirst:    // 首充大礼
						gameEventBus.firstChongZhiStateRefresh.event(parseInt(state));
						break;
					case FuLiActivityEnum.MeiRiChongZhiHaoLi:   // 每日充值豪礼
						gameEventBus.chargeWelfareGetStateRefresh.event(state);
						break;
					case FuLiActivityEnum.TotalCharge:    // 累计充值   回馈
						gameEventBus.leiJiChargeGetStateRefresh.event(state);
						break;
					case FuLiActivityEnum.TotalConsume:    // 累计消费  回馈
						gameEventBus.leiJiConsumeGetStateRefresh.event(state);
						break;
				}
			};

			/** 充值回馈 获取充值奖励信息 */
			msgHandler[EMessageType.CMD_SPR_GET_REPAYACTIVEAWARD] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const result = parseInt(aFields[0]);  // 返回结果
				const type = parseInt(aFields[1]);  // 活动类型
				const state = aFields[2];  // 活动状态
				switch (type) {
					case FuLiActivityEnum.HeFuDaLiBao:  // 合服VIP大回馈   
						break;
					case FuLiActivityEnum.HeFuTotalLogin:  // 合服累计登陆
						break;
					case FuLiActivityEnum.HeFuCZFanLi:   // 合服充值返利
						break;
					case FuLiActivityEnum.HeFuPKKing:   // 合服PK王
						break;
					case FuLiActivityEnum.HefuLuolanZhengba:   // 合服龙城争霸
						break;
					case FuLiActivityEnum.MeiRiChongZhiNew:   // 每日充值（新1元、3元、6元）
						break;
					// 充值相关
					case FuLiActivityEnum.InputFirst:    // 首充大礼
						gameEventBus.firstChongZhiStateRefresh.event(parseInt(state));
						break;
					case FuLiActivityEnum.MeiRiChongZhiHaoLi:   // 每日充值豪礼
						gameEventBus.chargeWelfareGetStateRefresh.event(state);
						break;
					case FuLiActivityEnum.TotalCharge:    // 累计充值   回馈
						gameEventBus.leiJiChargeGetStateRefresh.event(state);
						break;
					case FuLiActivityEnum.TotalConsume:    // 累计消费  回馈
						gameEventBus.leiJiConsumeGetStateRefresh.event(state);
						break;
				}
			};
			/** 获取所有回馈信息，充值和消费值 */
			msgHandler[EMessageType.CMD_SPR_QUERY_ALLREPAYACTIVEINFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const chargeNums = parseInt(aFields[2]);
				const consumeNums = parseInt(aFields[3]);
				gameEventBus.leiJiNumsStateRefresh.event(chargeNums, consumeNums);
			}

			/** 使用道具返回 */
			msgHandler[EMessageType.CMD_SPR_USEGOODS] = (msgReader: protobuf.Reader) => {
				const datGoods = NetMsg.SC_SprUseGoods.decode(msgReader);
				if (!datGoods) return;

			};

			/** 角色二级属性 */
			msgHandler[EMessageType.CMD_SPR_GETATTRIBALL] = (msgReader: protobuf.Reader) => {
				const datSecondary = NetMsg.SecondaryAttributeData.decode(msgReader);
				Global.Log.Assert(datSecondary && datSecondary.attrList.length === ExtPropIndexes.Max, "CMD_SPR_GETATTRIBALL attribute is error!!!");
				MyUI.Role.PropertyWindow.openRoleAttribute(datSecondary);
			};

			/*圣龙图腾数据同步*/
			msgHandler[EMessageType.CMD_SPR_DRAGONTOTEMDATA] = (msgReader: protobuf.Reader) => {
				const totemNetItem = NetMsg.TotemNetItem.decode(msgReader);
				const totemMgr: MyUI.ToTemManager = MyUI.ToTemManager.getInstance();
				if (!totemMgr.setTotemNetItem(totemNetItem)) {
					MyUI.ToTemManager.getNewTotemStatus[totemNetItem.ToTemID] = true;
					gameEventBus.totemRefresh.event(totemNetItem.ToTemID);
					gameEventBus.mainTaskTotemRefresh.event(true);
				}
			};
			/** 获取抽奖的积分 */
			msgHandler[EMessageType.CMD_SPR_ZJDJIFEN] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const jiFen = parseInt(aFields[0]);
				const bits = parseInt(aFields[1]);
				gameEventBus.qiFuJiFenRefresh.event(jiFen);
			};
			/** 斗气和祈福兑换 */
			msgHandler[EMessageType.CMD_SPR_EXCHANGEMOJINGANDQIFU] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const duiHuanType = parseInt(aFields[1]);
				switch (duiHuanType) {
					case -1: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_DouQiNotEnough);	//TODO  魔晶不足
						break;
					case -2: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_NoJiFen);
						break;
					case -3: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_NoBagGoods);
						break;
					case -4: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_GoodsKouChu);
						break;
					case -5: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_NoBagGird);
						break;
					case -10: uiMgr.hintText(ConfigLoca.UI_Bussiness_DuiHuanLose_ToDayNums);
						break;
					default:
						gameEventBus.businessDuiHuanRefresh.event(duiHuanType);
						break;
				}
			};
			/** 帮派信息 */
			msgHandler[EMessageType.CMD_SPR_QUERYBANGHUIDETAIL] = (msgReader: protobuf.Reader) => {
				const bangHuiDetailData = NetMsg.BangHuiDetailData.decode(msgReader);
				gameEventBus.bangHuiDataRefresh.event(bangHuiDetailData);
			};

			/** 客户端请求商人兑换信息 */
			msgHandler[EMessageType.CMD_SPR_GETMOJINGEXCHANGEINFO] = (msgReader: protobuf.Reader) => {
				const busDuiHuanData = NetMsg.BusinessDuiHuan.decode(msgReader);
				gameEventBus.businessDuiHuanNumsRefresh.event(busDuiHuanData.Dict);
			};

			/** 帮贡值改变 */
			msgHandler[EMessageType.CMD_SPR_BANGGONGCHANGE] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const roleId = parseInt(aFields[0]);
				const bangGong = parseInt(aFields[1]);
				if (roleId === gameIns.gameState.RoleID) {
					const oldBangGong = gameIns.gameState.roleData.BangGong;
					gameIns.gameState.roleData.BangGong = bangGong;
					const chaZhi = bangGong - oldBangGong;
					gameEventBus.huoBiNumsRefresh.event(MoneyTypes.BangGong);
					// TODO   帮贡值变动
				}
			};

			/** 副本数据 */
			msgHandler[EMessageType.CMD_SPR_FUBENDATA] = (msgReader: protobuf.Reader) => {
				const fuBenData = NetMsg.FuBenData.decode(msgReader);
				Global.UpdateFuBenData(fuBenData.FuBenID, fuBenData.DayID, fuBenData.EnterNum, fuBenData.FinishNum);
				Global.OnQueryFuBenInfoResult(fuBenData, null, -1);
				//TODO  ActivityTipManager.OnQueryFuBenInfoResult(fuBenData.FuBenID, fuBenData.QuickPassTimer, fuBenData.EnterNum, null, -1, fuBenData.FinishNum, fuBenData.DayID);
				//TODO 刷新了副本数据(界面内)，实际要看看是不是需要
			}

			/** 客户端请求副本信息 */
			msgHandler[EMessageType.CMD_SPR_QUERYFUBENINFO] = (msgReader: protobuf.Reader) => {
				const aFields = gameIns.getStringMsgFields(msgReader);
				const eFuBenServerData = new MyUI.EquipFuBenServerData();
				eFuBenServerData.copyID = parseInt(aFields[0]);	// 副本Id
				eFuBenServerData.nClientSec = parseInt(aFields[1]);	// 我的速度通关时间
				eFuBenServerData.nEnterNum = parseInt(aFields[2]);	// 副本进入次数
				eFuBenServerData.strName = aFields[3];	// 最快通关玩家名称(全服)
				eFuBenServerData.nBestTimer = parseInt(aFields[4]);	// 最快通关时间(全服)
				eFuBenServerData.nFinishNum = parseInt(aFields[5]);	// 完成次数
				eFuBenServerData.bIsOpen = eval(aFields[6].toLowerCase());		// 是否开启
				eFuBenServerData.nHighestKillMonster = parseInt(aFields[7]);	// 金币副本最高杀怪数量的记录
				eFuBenServerData.sHighestKillMonsterPlayer = aFields[8];	// 金币副本最高杀怪数量的记录的获得者
				eFuBenServerData.nMyHighestKillCount = parseInt(aFields[9]);	// 金币副本我的杀怪的最高记录
				gameEventBus.equipFuBenDataRefresh.event(eFuBenServerData);
			}
			// to do ... 继续添加其它的消息处理
		}

		/**
         * 处理与NPC对话的消息
         * @param npcData 包含了要与之对话的NPC的信息
         */
		private processNpcClickonResult(npcData: NetMsg.NPCData) {
			let showNpcDialog = true;
			let mainTaskID = -1;
			let taskID = 0;

			const roleData = Global.Data.roleData;
			const taskDataList = roleData.TaskDataList;
			if (null != taskDataList && taskDataList.length > 0) {
				// to do ... 日常任务?
				// if (npcData.ExtensionID == Global.ConstRiChangTaskNPCID) {
				// ....
				// }
				// else
				{
					// 查找当前正在做的任务Id
					for (let i = 0; i < taskDataList.length; i++) {
						const taskVO = tableMgr.tasksTable.getTaskVo(taskDataList[i].DoingTaskID);
						if (null != taskVO) {
							if ((npcData.ExtensionID) !== taskVO.DestNPC) {
								continue;
							}

							const taskPaoHuan = { recNum: 0, dailyTaskMaxNum: 0 };

							const taskClass = TableUtils.getFieldNumber(taskVO.TaskClass);
							if (TaskClasses.Main === taskClass) { // 如果是主线
								mainTaskID = taskDataList[i].DoingTaskID;
								showNpcDialog = false;
								break;
							}
							else if (taskClass === TaskClasses.PriceTask && Task.canDoPaoHuanTask(taskClass, taskPaoHuan)) {
								const TempID = taskDataList[i].DoingTaskID;
								taskID = TempID;
								showNpcDialog = false;
							}
						}
					}
				}

				// 确保主线任务优先处理
				if (mainTaskID > 0) {
					taskID = mainTaskID;
				}
			}

			// 如果点击的是日常任务的NPC,进行特殊处理: 检查如果有新日常任务,直接接取
			// if (mainTaskID <= 0 && npcData.ExtensionID == Global.ConstRiChangTaskNPCID)
			{
				// to do ...
			}

			// 如果点击的是讨伐任务的NPC,进行特殊处理: 检查如果有新讨伐任务,直接接取
			// if (mainTaskID <= 0 && npcData.ExtensionID == Global.ConstTaofaTaskNPCID)
			{
				// to do ...  
			}

			if (showNpcDialog) {
				if (npcData.MapCode === 1 && (npcData.ExtensionID === 130 || npcData.ExtensionID === 131
					|| npcData.ExtensionID === 134 || npcData.ExtensionID === 136 || npcData.ExtensionID === 137)) {
					// TODO: 雕像膜拜窗口
				} else {
					MyUI.NPCDialogPart.open(npcData);
				}
			} else {
				let taskClass = 0;
				let isTaskComplete = false;
				let isTriggerTaskPlatOK = false;
				const taskData = Task.getTaskDataById(taskID);
				if (taskData) {
					const taskVO = tableMgr.tasksTable.getTaskVo(taskID);
					if (taskVO) {
						taskClass = taskVO.TaskClass;

						isTaskComplete = Task.jugeTaskComplete(taskVO, taskData.DoingTaskVal1, taskData.DoingTaskVal2);
						if (isTaskComplete) {
							isTriggerTaskPlatOK = this.triggerTaskPlot(SystemHelpModes.BeforeCompTask, taskID, (s, e) => {
								// to do ...
								// StopSystemTalk();
								// ShowNPCDoingTaskWindow(npcData.NPCID, taskID, npcData.ExtensionID, false);
							});
						}
					}
				}

				if (!isTriggerTaskPlatOK || roleData.IsFlashPlayer <= 0) { // 如果是非新手场景，则立刻显示交任务对话框
					if (taskClass === TaskClasses.DailyTask) {
						// to do ... 显示日常任务界面?
						// ShowRiChangTaskPart(npcData.NPCID, taskID, npcData.ExtensionID, npcData.MapCode, false);
					}
					else if (TaskClasses.PriceTask === taskClass) {
						// to do ... 显示讨伐任务界面
						// ShowTaskPart(npcData.NPCID, taskID, npcData.ExtensionID, npcData.MapCode, false, 3);
					}
					else {
						// to do ...
						// if (isTaskComplete)
						//    StopSystemTalk();

						this.showNPCDoingTaskWindow(npcData.NPCID, taskID, npcData.ExtensionID, false);
					}
				}
			}
		}

        /**
         * 显示正在做的任务的对话框
         * @param npcRoleId 指定任务NPC的角色Id
         * @param taskID 指定任务Id
         * @param npcExenstionID 指定任务NPC的数据表Id
         * @param caching
         * @param newTask
         */
		private showNPCDoingTaskWindow(npcRoleId: number,
			taskID: number,
			npcExenstionID: number,
			caching = false,
			newTask = false): void {

			// 暂时直接返回交取任务,以便进行测试
			// AutoTest.submitAndAskTask(npcRoleId, taskID, npcExenstionID)

			// 显示与NPC对话的界面
			MyUI.NpcDoingTaskPart.Open(taskID, npcExenstionID, newTask);
		}

        /**
         * 处理任务更新消息(包含任务完成的检测及自动接取下一个任务的处理)
         * @param msgReader 消息包
         */
		private handleModTask(msgReader: protobuf.Reader): void {
			const fields = gameIns.getStringMsgFields(msgReader);
			const dbID = parseInt(fields[0]);
			const taskID = parseInt(fields[1]);
			const findTaskIndex = { index: -1 };
			const taskData = Task.getTaskDataById(taskID, findTaskIndex);
			const taskVo = tableMgr.tasksTable.getTaskVo(taskID);
			if (!taskVo) {
				return;
			}

			let val1Changed = false;
			if (dbID >= 0) { // 更新现有任务的数据
				val1Changed = taskData.DoingTaskVal1 !== parseInt(fields[2]);
				taskData.DoingTaskVal1 = parseInt(fields[2]);
				taskData.DoingTaskVal2 = parseInt(fields[3]);
				taskData.DoingTaskFocus = parseInt(fields[4]);
			} else {    // 任务不再需要了, 删除掉
				gameIns.gameState.roleData.TaskDataList.splice(findTaskIndex.index, 1);
			}

			// 派发任务更新事件,以便界面等刷新数据
			gameEventBus.taskUpdate.event(taskID);

			if (dbID > 0 && taskVo.TargetType1 === TaskTypes.KillMonster) { // 目前只有杀怪任务才需要每次任务数据更新都判定是否杀够了足够的怪物,其它类型的任务会在界面上自动完成
				const isTaskComplete = Task.jugeTaskComplete(taskVo, taskData.DoingTaskVal1, taskData.DoingTaskVal2);
				if (isTaskComplete) {
					// 杀怪任务完成了,自动继续下一个任务
					LogicTask.TaskBoxMini.prccessAutoTaskFindRoad(taskID);

					// 杀怪任务完成,偿试触发NPC的系统对话
					if (taskVo.SystemTalkTriggerList.length > 0) {
						taskVo.SystemTalkTriggerList.forEach(systemTalk => {
							if (systemTalk.TriggerType === SystemTalkTriggerType.KillMonsterComplete) {
								// TODO: 实现对显示系统喊话界面的调用
							}
						});
					}
				}
			}
		}

        /**
         * 自动战斗的处理
         */
		private handleAutoFight(msgReader: protobuf.Reader): void {
			const autoFight = NetMsg.SCAutoFight.decode(msgReader);
			const gameState = gameIns.gameState;
			if (autoFight.RoleID !== gameState.RoleID) {
				Global.Log.Assert(false);
				return; // 不是本地玩家,忽略此消息
			}

			const ret = autoFight.State;
			if (autoFight.FightType === AutoFightCmds.Start || autoFight.FightType === AutoFightCmds.PlayerClickStart) {
				// 开始挂机
				if (ret < 0) {
					if (autoFight.FightType === AutoFightCmds.PlayerClickStart) {
						Global.Data.AutoFightData.Fighting = false;	// 关闭自动挂机选项
					}

					// 开始挂机失败
					if (-2 === ret) {
						// 地图中禁止挂机
						uiMgr.hintText(ConfigLoca.AUTO_FIGHT_NOT_ALLOWED,
							TableUtils.getMapNameByCodeEx(gameState.roleData.MapCode));
					} else {
						// 开始挂机
						getLocalPlayerController().serverStartAutoFight();
					}
				} else {
					if (autoFight.FightType === AutoFightCmds.PlayerClickStart) {
						Global.Data.AutoFightData.Fighting = true;	// 开启自动挂机选项.
					}
					// 开始挂机
					getLocalPlayerController().serverStartAutoFight();
				}
			}
			else if (autoFight.FightType === AutoFightCmds.Update) {
				// TODO: 更新自动挂机的界面显示
			}
			else if (autoFight.FightType === AutoFightCmds.End || autoFight.FightType === AutoFightCmds.PlayerClickEnd) {
				// 挂机结束
				if (autoFight.FightType === AutoFightCmds.PlayerClickEnd) {
					Global.Data.AutoFightData.Fighting = false;	// 关闭自动挂机选项.
				}
				getLocalPlayerController().serverEndAutoFight();
			}
		}

		/**
		 * 技能信息同步回调
		 *依照之前的逻辑，此消息只是对主角和怪物做处理
		 */
		private handleMagicCode(msgReader: protobuf.Reader) {
			const magicCodeData = NetMsg.MgiacCodeData.decode(msgReader);
			const magicCode = magicCodeData.magicCode;
			const RoleId = magicCodeData.RoleID;
			if (RoleId === Global.Data.roleData.RoleID) {// 如果是本地玩家，则需要更新技能cd
				Global.AddSkillCoolDown(magicCode);
				if (Global.Data.roleData.LifeV <= 0) {
					return;
				}
				return;
			}
			else {
				const level = getMainLevel();
				const attackerSprite = level.findMonster(RoleId);
				if (attackerSprite) {
					// todo更新怪物的攻击目标
				}
			}
		}

		/**
		 * 移除技能冷却
		 */
		private handleSkillCoolDown(msgReader: protobuf.Reader) {
			const fields = gameIns.getStringMsgFields(msgReader);
			const roleId = parseInt(fields[0]);
			const type = parseInt(fields[1]);
			const code = parseInt(fields[2]);
			if (roleId === Global.Data.roleData.RoleID) {
				if (0 === type) {
					Global.RemoveSkillCoolDownTicks(code);
				}
			}
		}

        /**
         * 处理新的任务
         * @param msgReader 消息包
         */
		private handleNewTask(msgReader: protobuf.Reader): void {
			const taskData = NetMsg.TaskData.decode(msgReader);
			if (taskData.DbID < 0) { // 任务接受失败
				const reason = taskData.DbID;
				const taskTitile = Task.getTaskTitleByID(taskData.DoingTaskID);
				if (reason === -1000) {
					uiMgr.hintText(ConfigLoca.UI_NEWTASK_Failed_BagFull, taskTitile);
				} else {
					uiMgr.hintText(ConfigLoca.UI_NEWTASK_Failed_Other, taskTitile);
				}

				return;
			}

			const roleData = gameIns.gameState.roleData;
			roleData.TaskDataList.push(taskData);

			// 触发任务添加事件
			gameEventBus.newTask.event(taskData);

			// 日常任务(8)自动接取,接取时不自动寻路
			const taskClass = tableMgr.tasksTable.getTaskClassById(taskData.DoingTaskID);
			if (taskClass !== TaskClasses.DailyTask && taskClass !== TaskClasses.PriceTask) {
				LogicTask.TaskBoxMini.prccessAutoTaskFindRoad(taskData.DoingTaskID, true);
			}

			/** 根据图腾激活列表中的数据 * 刷新界面显示，并设置正确进度 */
			// LogicTask.TaskBoxMini.refreshToTemInfo(true);
			gameEventBus.mainTaskTotemRefresh.event(true);

            /* to do ... 各个界面的刷新. 应该监听 gameEventBus.money1Changed 事件,而不是直接在这里调用
             
            if (null != NpcDoingTasksPart)
            {
                NpcDoingTasksPart.RefreshTaskData();
            }

            if (taskData.DoingTaskID == 100)
            {
                //引导音效 xinshouyindao1.mp3
                Super.PlayYinDaoSound("xinshouyindao1.mp3");
            }

            // 触发系统喊话功能
            var taskVO = ConfigTasks.GetTaskXmlNodeByID(taskData.DoingTaskID);
            if (taskVO.SystemTalkTriggerList.Count > 0)
            {
                for (int i = 0; i < taskVO.SystemTalkTriggerList.Count; i++)
                {
                    var taskTriggerInfo = taskVO.SystemTalkTriggerList[i];
                    if (taskTriggerInfo.TriggerType == (int)SystemTalkTriggerType.AcceptTask)
                    {
                        AddSystemTalk(taskTriggerInfo.SystemTalkID);
                    }
                }
            }
            */
		}

        /**
         * 处理任务完成消息
         * @param msgReader 消息包
         */
		private handleCompleteTask(msgReader: protobuf.Reader): void {
			const completeTask = NetMsg.SCCompTask.decode(msgReader);
			const taskVO = tableMgr.tasksTable.getTaskVo(completeTask.taskID);
			const taskTitle = Loca.getLang(taskVO.Title);
			if (completeTask.state < 0) {// 任务提交失败
				if (Task.ETaskCompleteState.BagFull === completeTask.state) { // 背包满了
					uiMgr.hintText(ConfigLoca.UI_TASK_Failed_BagFull, taskTitle);
				}
				else if (Task.ETaskCompleteState.NotInRiding === completeTask.state) { // 不是骑乘状态
					uiMgr.hintText(ConfigLoca.UI_TASK_Failed_NotInRiding, taskTitle);
				}
				else if (Task.ETaskCompleteState.JinbiNotEnough === completeTask.state) { // 金币不足
					// to do ... 显示引导购买金币窗口
					Global.Log.Assert(false);
					// Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedJinbi, null);
				}
				else if (Task.ETaskCompleteState.ZuanshiNotEnough === completeTask.state) { // 钻石不足
					// to do ... 显示引导购买钻石窗口
					Global.Log.Assert(false);
					// Super.ShowGuideWindow(BaodianGuidePart.GuideType.NeedZuanshi, null);
				} else { // 任务失败,其它原因
					uiMgr.hintText(ConfigLoca.UI_TASK_Failed_Other, taskTitle);
				}

				return;
			}

			const taskID = completeTask.taskID;

			// 任务成功后的处理
			if (106 === taskID) {
				Global.Data.roleData.IsFlashPlayer = 0;
				// to do ...
				// UICtrlBar.singleton.ResetSkillBar(); // 恢复默认的技能
			}

			if (TableUtils.getFieldNumber(taskVO.TaskClass) === TaskClasses.Main) { // 更新已经完成的主线任务Id
				gameIns.gameState.roleData.CompletedMainTaskID = taskID;
			}

			// 触发任务完成事件
			gameEventBus.taskCompleted.event(completeTask);

			// to do ... 刷新小红点?
			// ActivityTipManager.OnCompleteTask();

            /* to do ... 各个界面的刷新. 应该监听 gameEventBus.money1Changed 事件,而不是直接在这里调用
            if (null != NpcDoingTasksPart) {
                NpcDoingTasksPart.RefreshTaskData();
            }

            if (null != _RiChangTaskPart && _RiChangTaskPart.IsActive) {
                _RiChangTaskPart.NotifySubmitResult(cmdState, npcID, taskID);
            }

            //引导任务完成后刷新
            if (taskVO.TaskClass == (int)TaskClasses.GuideTask && null != _GuideTaskPart && _GuideTaskPart.IsActive)
            {
                _GuideTaskPart.RefreshTask();
            }

            if (null != _RiChangTaskSubmitPart && _RiChangTaskSubmitPart.IsActive) {
                if (!_RiChangTaskSubmitPart.NotifySubmitResult(cmdState, npcID, taskID)) {
                    HideRiChangTaskSubmitPart();
                }
            }

            if (null != _TaoFaTaskPart && _TaoFaTaskPart.IsActive) {
                _TaoFaTaskPart.NotifySubmitResult(cmdState, npcID, taskID);
            }

            ShowNextPaoHuanTaskWizard(taskID);*/

			// 新功能开启
			const newGongNengId = GongnengYugaoMgr.getNewIconOnCompleteTask(taskID);
			if (newGongNengId >= 0) {
				GongnengYugaoMgr.updateIcons();
				this.processImgAnimation(newGongNengId);
				// if (newGongNengId === GongNengIDs.RiChangRenWu || newGongNengId === GongNengIDs.TaoFaRenWu || newGongNengId === GongNengIDs.JingYanFuBen)//经验副本开启时，刷新日常任务信息栏内容
				// {
				//     GongnengYugaoMgr.UpdateIcons();
				//     if (null != GameTaskBoxMini)
				//     {
				//        GameTaskBoxMini.RefreshTasks();
				//     }
				// }
			}

			// 章节完成提示?
            /*if (null != taskVO)
            {
                if (Global.CompleteTaskZhangJieByTask(taskVO, out zhangjieID))
                {
                    if (!Global.IsDemoVersion)
                        UIHelper.DelayInvoke(1, (s, e1) => ShowTaskOverPart(zhangjieID));
                }
            }
            */

		}

        /**
         * 任务点的帮助触发时机
         * @param mode
         * @param timeParameters
         * @param extCallBack
         */
		private triggerTaskPlot(mode: SystemHelpModes, timeParameters: number, extCallBack?: Function) {
			// to do ... 继续实现
			return false;
		}

        /**
         * 处理获取属性消息
         * @param msgReader 
         */
		private handleGetAttribute(msgReader: protobuf.Reader): void {
			const equipPropsData = NetMsg.EquipPropsData.decode(msgReader);
			if (!equipPropsData) return;

			const newPropFiles: number[] = [
				equipPropsData.RoleID,          // 0
				equipPropsData.Strength,        // 1
				equipPropsData.Intelligence,    // 2
				equipPropsData.Dexterity,       // 3
				equipPropsData.Constitution,    // 4
				equipPropsData.MinAttack,       // 5
				equipPropsData.MaxAttack,       // 6
				equipPropsData.MinDefense,      // 7
				equipPropsData.MaxDefense,      // 8
				equipPropsData.MagicSkillIncrease, // 9
				equipPropsData.MinMAttack,      // 10
				equipPropsData.MaxMAttack,      // 11
				equipPropsData.MinMDefense,     // 12
				equipPropsData.MaxMDefense,     // 13
				equipPropsData.PhySkillIncrease,  // 14
				equipPropsData.MaxHP,           // 15
				equipPropsData.MaxMP,           // 16
				equipPropsData.AttackSpeed,     // 17
				equipPropsData.Hit,             // 18
				equipPropsData.Dodge,           // 19
				equipPropsData.TotalPropPoint,  // 20
				equipPropsData.ChangeLifeCount, // 21
				equipPropsData.CombatForce,     // 22
				equipPropsData.TEMPStrength,    // 23
				equipPropsData.TEMPIntelligsence, // 24
				equipPropsData.TEMPDexterity,   // 25
				equipPropsData.TEMPConstitution // 26
			];

			if (equipPropsData.RoleID === gameIns.gameState.RoleID) {
				const datRole = gameIns.gameState.roleData;
				const oldPoints = new Array<number>(UnitPropIndexes.Max);
				for (let i = 0; i < UnitPropIndexes.Max; i++) {
					oldPoints[i] = Global.GetCurrentRoleProp(1, i);
				}
				Super.CalcRolePropsText(newPropFiles);
				Global.Data.CurrentRolePropFields = newPropFiles;
				// 通知战力变化
				if (equipPropsData.CombatForce !== datRole.CombatForce) {
					datRole.CombatForce = equipPropsData.CombatForce;
					gameEventBus.combatForceChange.event();
				}
				// 通知等级变化
				if (equipPropsData.ChangeLifeCount !== datRole.ChangeLifeCount) {
					datRole.ChangeLifeCount = equipPropsData.ChangeLifeCount;
					gameEventBus.levelChange.event();
				}
				if (datRole.AutoAssignPropertyPoint !== 0) {
					Global.tryAddRecommendPoint();
				}
				// 通知属性变化
				gameEventBus.roleAttributeNotify.event();
				// TODO: 更新相关界面逻辑
			} else {
				// TODO: 更新相关界面逻辑
			}
		}

		/** 处理道具添加消息 */
		private handleAddGoods(msgReader: protobuf.Reader): void {
			const addGoodData = NetMsg.AddGoodsData.decode(msgReader);
			if (addGoodData.roleID !== gameIns.gameState.RoleID) {
				Global.Log.Error("添加道具(id:%d, roleId:%d)时,角色竟然不是本地玩家(roleId:%d)?", addGoodData.id, addGoodData.roleID, gameIns.gameState.RoleID);
				return;
			}

			switch (addGoodData.site) {
				case SaleGoodsConsts.NormalBag: {
					// 普通背包
					let endTime = addGoodData.newEndTime;
					endTime = endTime.replace(/\$/g, ":");
					const goodsData = new NetMsg.GoodsData({
						Id: addGoodData.id,
						GoodsID: addGoodData.goodsID,
						Using: 0,
						ForgeLevel: addGoodData.forgeLevel,
						Starttime: "1900-01-01 12:00:00",
						Endtime: endTime,
						Site: addGoodData.site,
						Quality: addGoodData.quality,
						Props: "",
						GCount: addGoodData.goodsNum,
						Binding: addGoodData.binding,
						Jewellist: addGoodData.jewellist,
						AddPropIndex: addGoodData.addPropIndex,
						BornIndex: addGoodData.bornIndex,
						Lucky: addGoodData.lucky,
						Strong: addGoodData.strong,
						ExcellenceInfo: addGoodData.ExcellenceProperty,
						AppendPropLev: addGoodData.nAppendPropLev,
						ChangeLifeLevForEquip: addGoodData.ChangeLifeLevForEquip,
						BagIndex: addGoodData.bagIndex,
						WashProps: addGoodData.washProps,
					});

					Global.AddGoodsData(goodsData);
					this.processFirstGoods(goodsData.Id, goodsData.GoodsID, false);
					const hint = addGoodData.newHint;
					// 获得物品提示
					if (hint > 0) {
						const goodsCount = addGoodData.goodsNum;
						// Super.HintNewGoodsText(goodsData, goodsCount);
						UIHelper.hintNewGoodsText(goodsData, goodsCount);
						// ProcessNewGoodsAnimation(addGoodsData.goodsID);    新获得物品动画
					}
                    /* to do ... 各种界面的刷新. 注: 这里应该放到 EventBus.addGood 监听中去处理,而不是直接在这里调用,以简化及减少代码耦合度
                    int hint = addGoodsData.newHint;
                    if (hint > 0)
                    {
                        int goodsCount = addGoodsData.goodsNum;
                        Super.HintNewGoodsText(goodsData, goodsCount);
                        ProcessNewGoodsAnimation(addGoodsData.goodsID);
                    }

                    if (null != Super._ParcelPart)
                    {
                        Super._ParcelPart.RefreshGoods2(goodsData);
                    }
                    if (MainQuickBar)
                    {
                        MainQuickBar.RefreshGoodsCount(addGoodsData.goodsID);
                        MainQuickBar.AddGoodsToQuickKeyBar(addGoodsData.goodsID);
                    }
                    RefreshChildWindowsGoodsCount();
                    ProcessFirstGoods(ret, addGoodsData.goodsID, firstGoods);

                    //获取当前获得的物品是否是精魄，如果是精魄，去刷新山海全书，可提交精魄状态（山海全书的小红点及子界面的一键提交按钮动画）
                    int goodCategoriy = Global.GetCategoriyByGoodsID(goodsData.GoodsID);
                    if (goodCategoriy == (int)ItemCategories.MonsterSoul)
                    {
                        RefreshShanHaiBookCommitState(goodsData.GoodsID);
                        //刷新山海全书的精魄状态
                    }
                    */
					break;
				}

				default:
					Global.Log.Assert(false, "这个包(%d)还没有实现", addGoodData.site);
					break;
			}
		}

		/**
		* 播放来自服务器的表演行为
		* 注: 一般来讲,应该不包含本地玩家
		*/
		private handlePlayerAction(msgReader: protobuf.Reader): void {
			const actionData = NetMsg.SpriteActionData.decode(msgReader);
			const curLevel = GameMode.getLocalPlayer().getLevel();
			const character = curLevel.findCharacter(actionData.roleID) as Logic.CharacterBaseActor;
			if (character && curLevel.levelId === actionData.mapCode) {
				const controller = character.getController() as Logic.ACharacterController;
				controller.serverRunAction(actionData.action, actionData.targetX, actionData.targetY, actionData.yAngle);
			}
		}

        /**
         * 处理道具修改
         * @param msgReader 
         */
		private handleModGoods(msgReader: protobuf.Reader): void {
			const ModGoods = NetMsg.SCModGoods.decode(msgReader);
			switch (ModGoods.State) {
				case -3:
				case -1000: uiMgr.hintText(Loca.getLang("背包已满，请先清理出空闲位置后，再卸载装备...")); return;
				case -4: uiMgr.hintText(Loca.getLang("当前骑宠栏位已被占满")); return;
				case -5: uiMgr.hintText(Loca.getLang("当前萌宠栏位已被占满")); return;
				case -1: uiMgr.hintText(Loca.getLang("服务器配置错误或数据库操作失败")); return;
			}
			if (ModGoods.State < 0) return;

			// TODO: 未填充内容的条件判断，需要以后用到的时候填充内容
			if (ModGoods.Site === SaleGoodsConsts.FashionGoodsID) {
			} else if (ModGoods.Site === SaleGoodsConsts.FluorescentDiamondGoodsID) {
			} else if (ModGoods.Site === SaleGoodsConsts.SoulStoneBag || ModGoods.Site === SaleGoodsConsts.SoulStoneEquip) {
			} else {
				const goodsData = Global.GetGoodsDataByDbID(ModGoods.ID);
				if (goodsData) {
					const oldGCount = goodsData.GCount;
					const oldBagIndex = goodsData.BagIndex;
					if (ModGoods.Count > 0) {
						goodsData.Using = ModGoods.IsUsing;
						goodsData.Site = ModGoods.Site;
						goodsData.GCount = ModGoods.Count;
						goodsData.BagIndex = ModGoods.BagIndex;
						const newHint = ModGoods.NewHint;
						if (goodsData.Site === SaleGoodsConsts.PortableGoodsID) {
						} else if (SaleGoodsConsts.MengchongStoneBag === goodsData.Site) { // 萌宠背包类型
						} else if (SaleGoodsConsts.UsingDemonGoodsID === goodsData.Site) {
						} else {
							// 获得物品提示
							if (newHint > 0 && goodsData.GCount > oldGCount) {
								const goodsCount = goodsData.GCount - oldGCount;
								UIHelper.hintNewGoodsText(goodsData, goodsCount);
								// TODO:动画
							}
						}
					} else {
						goodsData.GCount = 0;
						Global.RemoveGoodsData(goodsData);
					}
					const modType = ModGoods.ModType;
					if (modType === ModGoodsTypes.Abandon || modType === ModGoodsTypes.ModValue || modType === ModGoodsTypes.Destroy || modType === ModGoodsTypes.SaleToNpc) {
					} else {
						if (modType === ModGoodsTypes.EquipLoad) {
							Super.GData.RoleUsingGoodsDataList.set(goodsData.Id, goodsData);
							gameEventBus.equipLoad.event(goodsData, gameIns.gameState.RoleID);
							gameEventBus.updateParcel.event(goodsData);
							// TODO: 更新战力箭头标识、精灵装备、场景中主角
						} else if (modType === ModGoodsTypes.EquipUnload) {
							if (Super.GData.RoleUsingGoodsDataList.has(goodsData.Id)) {
								if (Global.GetFashionInfo() != null && Global.GetFashionInfo().has(goodsData.Id)) {
									goodsData.Using = 0;
								}
								Super.GData.RoleUsingGoodsDataList.delete(goodsData.Id);
							}
							gameEventBus.equipUnload.event(goodsData, gameIns.gameState.RoleID);
							gameEventBus.updateParcel.event(null);
							// TODO: 更新战力箭头标识、精灵装备、场景中主角
						}
					}
				} else {
				}
			}
		}

        /**
         * 更新角色血量值
         * @param nActorID 角色ID
         * @param nLifeV 当前血值
         * @param nMagicV 当前蓝值
         * @param nMaxLifeV 最大血值
         * @param nMaxMagicV 最大蓝值
         */
		private _updateActorLife(nActorID: number, nLifeV?: number, nMagicV?: number, nMaxLifeV?: number, nMaxMagicV?: number) {
			const datRole = gameIns.gameState.roleData;
			if (nActorID === datRole.RoleID) {
				const nAddedVal = nLifeV - datRole.LifeV;
				if (nAddedVal > 0) {
					// TODO: 飘字（加血的量）
				}
			} else {
				gameEventBus.focusedActorChanged.event(nActorID);
			}
			const tLevel = this.mPlayingMode.mainLevel;
			tLevel && tLevel.updateActorLifeAndMagic(nActorID, nLifeV, nMaxLifeV, nMagicV, nMaxMagicV);
		}

		/**
		 * 处理切换地图
		 * @param msgReader 
		 */
		private handleMapChange(msgReader: protobuf.Reader): void {
			const datMsg = NetMsg.SCMapChange.decode(msgReader);
			uiMgr.hideNetWaiting();
			if (datMsg.State >= 0) {
				// TODO: UI界面处理
				if (gameIns.gameState.RoleID === datMsg.RoleID) {
					windowMgr.closeWindowsWhenChangeLevel(); // 关闭打开的界面
					Global.nLastMapCode = gameIns.gameState.roleData.MapCode;
					gameIns.gameState.roleData.MapCode = datMsg.NewMapCode;
					gameIns.gameState.roleData.PosX = datMsg.ToNewMapX;
					gameIns.gameState.roleData.PosY = datMsg.ToNewMapY;
					gameIns.gameState.roleData.RoleDirection = datMsg.ToNewDiection;
					this.mPlayingMode.startChangeLevel(datMsg.NewMapCode, true);
				}
				// TODO: 更新场景相关UI显示
				// if (null != GameTaskBoxMini) {
				// 	GameTaskBoxMini.EnterMapScene();
				// }
			} else {
				Global.Data.WaitingForMapChange = false;
				switch (datMsg.State) {
					case -1001: uiMgr.hintText(Loca.getLang("4479")); break; // 角色重生次数不够，无法切换地图
					case -1002: uiMgr.hintText(Loca.getLang("4480")); break; // 角色级别不够，无法切换地图
					case -1003: break;
					case -10010: break; // 原地图切换,不需要提示信息
					default:
						uiMgr.hintText(Global.String.Format(Loca.getLang("4481"), datMsg.State)); // 切换地图时错误: {0}
						break;
				}

				// TODO: 服务器发送的时序 先发送的队伍信息 后发送的地图信息 导致队伍信息刷新不正确，在这里再刷新一次
				// if (null != GameTaskBoxMini) {
				// 	GameTaskBoxMini.NotifyTeamState();
				// }
			}
		}
		/**
		 * 判断物品是否弹出系统引导(快捷道具使用)
		 * @param dID 
		 * @param goodsID 
		 * @param fristState 
		 */
		private processFirstGoods(dId: number, goodsId: number, fristState: Boolean) {
			const cInfo = Super.canHintEquipGoods(dId, goodsId);
			const cState = cInfo[0];			// 是否可以装备
			const cZhanLi = cInfo[1];		// 提升战力
			if (cState === true) {
				// 新物品数据(装备)
				const nEquipData = new NewEquipGoodsInfo();
				nEquipData.goodsDbID = dId;
				nEquipData.zhanLiUp = cZhanLi;
				// 加入缓存
				Super.GData.NewEquipInfoList.push(nEquipData);
				uiMgr.retrieveNewEquipSystemWizard();
			}
		}
		/**
		 * 移动图标的动画
		 * @param systemOpenId      //功能ID
		 * @returns {} 
		 */
		private processImgAnimation(systemOpenId: number) {
			Super.GData.waitingForSystemHelp = GongnengYugaoMgr.readyFlyingImgAnimation(systemOpenId);
		}
	}
}