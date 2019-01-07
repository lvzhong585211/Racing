/**
* name ，用efc动画来模拟伤害数字显示
*/
namespace MyUI {
	export class HurtShow extends Laya.Sprite {

		private mLable = new Laya.Label;															// 需要显示的label
		private ani = null;																							// 保存动画数据													
		private mCurPlayFrame: number = -1;														// 当前正在循环的帧数
		private mBegin = false;																			  	// 是否开始播放了
		private mPosInScreen = new Laya.Vector3();											// 保存一个屏幕坐标位置
		private mKeyNum: string[] = null;													// 取出来当前节点修改的属性信息。例如：sacle，x，y，alpha等 
		private mNodeCount = 0;																				// 当前动画帧数数量
		private mFrames: number[] = null;													// 保存的节点信息
		constructor() {
			super();
			this.initInfo();
		}

		private initInfo() {
			const efc = new ui.Components.HudTextUI;

			// 读出来当前动画需要的信息
			this.ani = efc;
			this.mKeyNum = this.ani._animationData.nodes[0].keys;
			this.mNodeCount = this.ani._animationData.count;
			this.mFrames = this.ani._animationData.nodes[0].frames;

			// 初始化labl信息
			this.mLable.strokeColor = "#000000";
			this.mLable.stroke = 2;

			this.frameLoop(1, this, () => this.updateAnimationData());
		}

		/**
		 * 显示伤害数字
		 * @param beAttackBodyId 受伤者id
		 * @param injure 伤害量
		 */
		public ShowHudText(beAttackBodyId: number, injure: number) {
			this.mLable.text = "-" + injure.toString();
			const level = GameMode.getMainLevel();
			const beAttackBody: Logic.Character<Logic.ActorState.CharacterBase> = level.findCharacter(beAttackBodyId) as Logic.Character<Logic.ActorState.CharacterBase>;
			if (beAttackBody == null) {
				// 如果为空就不显示了
				return;
			}
			// 如果受伤的是主角
			if (beAttackBody.isLocalPlayer() === true) {
				this.mLable.color = "#d93634";
			}
			else {
				this.mLable.color = "#e5e5e5";
			}
			const ShowPos = beAttackBody.getPosition();
			const camera = GameMode.PlayingMode.getMainCamera();
			// 变换到屏幕坐标系
			camera.worldToViewportPoint(ShowPos, this.mPosInScreen);
			this.mLable.visible = true;
			this.mLable.pos(this.mPosInScreen.x, this.mPosInScreen.y);
			uiMgr.addChild(this.mLable, UILayer.Hurt);
			this.mBegin = true;
		}

		/**
		 * 是否空闲状态
		 */
		public isFree(): boolean {
			return this.mBegin === false;
		}

		/**
		 * 逻辑帧函数
		 */
		private updateAnimationData() {
			if (this.mBegin === false)
				return;
			let CurFrame = this.mCurPlayFrame++;
			if (this.mCurPlayFrame > this.mNodeCount) {
				// 当亲帧数不再动画帧数范围内
				// Global.Log.Assert(this.mCurPlayFrame <=  nodeCount,"frame is undefine" );
				this.mCurPlayFrame = 0;
				this.mBegin = false;
				uiMgr.removeChild(this.mLable, UILayer.Hurt);
				return;
			}
			for (let i = 0; i < this.mKeyNum.length; i++) {
				// 取出需要变换的子节点名称
				const keyName: string = this.mKeyNum[i];
				// 通过子节点名称获得子节点属性数组
				const childFrames: number[] = this.mFrames[keyName];
				// 如果当前的帧数超过了数组大小，用数组最后一个元素代替现在的值
				if (CurFrame > childFrames.length) {
					CurFrame = childFrames.length;
				}
				const framesValue = childFrames[CurFrame];
				this.setPropertyInfo(keyName, framesValue);
			}
		}

		/**
		 * 设置当前label得属性值
		 * @param strPropertyName 属性名字
		 * @param value 属性值
		 */
		private setPropertyInfo(strPropertyName: string, value: number) {
			switch (strPropertyName) {
				case "alpha":
					this.mLable.alpha = value;
					break;
				case "scaleX":
					this.mLable.scaleX = value;
					break;
				case "scaleY":
					this.mLable.scaleY = value;
					break;
				case "x":
					this.mLable.x += value;
					break;
				case "y":
					this.mLable.y += value;
					break;
				case "anchorX":
				case "anchorY":
					break;
			}
		}
	}
}