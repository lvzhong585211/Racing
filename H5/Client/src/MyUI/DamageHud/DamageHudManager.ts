/**
* 伤害数字的管理器
*/
namespace MyUI {

	const DamageFontHeight = 48;	// 伤害字体的大小
	const DamageFontHalfHeight = DamageFontHeight * 0.5;

	/**
	 * 保存一次伤害信息
	 */
	class DamageInfo {
		public mDamage: string;		// 伤害数字.当然也可以用作治疗等数字
		public mColor: string;		// 数字的颜色
		public mPos: Laya.Vector3;	// 显示数字的Laya3D坐标
		public mShowTime: number;	// 剩余的显示时间(豪秒)
		public mAniIndex: number;	// 使用的动画索引
		public mCachedMatrix = new Laya.Matrix();	// 用于提升性能,减少内存分配的缓冲矩阵.		
	}

	/**
	 * 双向列表的元素
	 */
	class ListElement<T> {
		/**
		 * @param mData 真正的数据对象
		 */
		constructor(public mData: T, public prev: ListElement<T> | null = null, public next: ListElement<T> | null = null) {
		}
	}

	/**
	 * 封装动画操作类
	 */
	class InfoAniTargetWrap {
		private mGraphics: Laya.Graphics;
		private matTranform = new Laya.Matrix();	// 保存变换矩阵
		private mX: number;	// 相对坐标X(屏幕坐标系)
		private mY: number;	// 相对坐标Y(屏幕坐标系)
		private mScaleX: number;	// 缩放X
		private mScaleY: number;	// 缩放Y
		private mAlpha: number;	// Alpha值

		public constructor(graphics: Laya.Graphics) {
			this.mGraphics = graphics;
		}

		private set x(value: number) {
			this.mX = value;
		}

		private set y(value: number) {
			this.mY = value;
		}

		private set scaleX(value: number) {
			this.mScaleX = value;
		}

		private set scaleY(value: number) {
			this.mScaleY = value;
		}

		private set alpha(value: number) {
			this.mAlpha = value;
		}

		private on() {
		}

		/**
		 * 应用设定的数据
		 * @param posX 指定输出的x坐标(屏幕坐标系)
		 * @param posY 指定输出的y坐标(屏幕坐标系)
		 * @param mat4Cache 用于提升性能,减少内存分配的缓冲的变换矩阵
		 */
		public apply(posX: number, posY: number, mat4Cache: Laya.Matrix) {
			mat4Cache.identity();	// 注: 矩阵在调用 this.mGraphics.transform() 函数传递给底层后会被Layabox继续使用,所以不可以直接销毁,必须复用!
			mat4Cache.scale(this.mScaleX, this.mScaleY);
			mat4Cache.setTranslate(posX + this.mX, posY + this.mY - DamageFontHeight);	// 需要减少字体的高度.因为输出字体时,以上边界为参考坐标
			this.mGraphics.transform(mat4Cache, 0, DamageFontHalfHeight);	// 需要以字体高度的一半为缩放中心点. x 轴不需要,因为底层会处理距中.
			this.mGraphics.setAlpha(this.mAlpha);
		}
	}

	/**
	 * 派生处理我们自己的动画数据.因为Layabox底层不支持这个功能,而我们只想使用动画数据
	 */
	class HurtNumberUIEx extends ui.Animations.HurtNumberUI {
		private mAnimationDatas = [];
		private mAniLength: number = 0;			// 动画长度(毫秒)
		private mTarget: InfoAniTargetWrap;		// 动画目标
		public constructor(owner: DamageHudManager) {
			super();

			// 生成一下第二个动画的帧数据
			const aniData = HurtNumberUIEx.uiView["animations"];
			if (aniData && aniData[1]) {
				this._setUp({}, aniData[1]);
			}
			// this.mAniLength = this._count * this._interval;	// 只记一个动画的长度即可,我们假设两个动画的长度是一致的
			this.mAniLength = 300;	// 只记一个动画的长度即可,我们假设两个动画的长度是一致的
			this._interval = this.mAniLength / this._count;

			this.mTarget = new InfoAniTargetWrap(owner.graphics);
			this.mAnimationDatas = aniData;
		}

		/**
		 * 返回动画的数量
		 */
		public getAniCount(): number {
			return this.mAnimationDatas ? this.mAnimationDatas.length : 0;
		}

		/**
		 * 返回动画的帧间隔(多个动画的帧间隔应该相同)
		 */
		public getInterval(): number {
			return this._interval;
		}

		/**
		 * 返回动画的长度(毫秒). 注: (多个动画的长度应该相同)
		 */
		public getAniLength(): number {
			return this.mAniLength;
		}

		/**
		 * 使用指定帧的数据来更新对象
		 * @param posX 指定输出坐标X(屏幕坐标系)
		 * @param posY 指定输出坐标Y(屏幕坐标系)
		 * @param aniIndex 使用的动画索引
		 * @param frameIndex 指定使用第几帧的数据来更新显示
		 * @param cachedMatrix 提升性能,减少内存分配的缓冲矩阵
		 */
		public displayToIndex(posX: number, posY: number, aniIndex: number, frameIndex: number, cachedMatrix: Laya.Matrix): void {
			const aniData = this.mAnimationDatas[aniIndex];
			const nodes = aniData.nodes;
			const len = nodes.length;
			for (let i = 0; i < len; i++) {
				this.displayNodeToFrame(nodes[i], frameIndex);
			}

			// 应该变换
			this.mTarget.apply(posX, posY, cachedMatrix);
		}

		/**
		 * 把指定节点的动画数据刷新到目标对象
		 * @param node 指定动画所在的节点
		 * @param frame 指定动画帧
		 */
		private displayNodeToFrame(node: any, frame: number): void {
			const frames = node.frames;
			let value;
			const keys = node.keys;
			for (let i = 0, len = keys.length; i < len; i++) {
				const key = keys[i];
				const propFrames = frames[key];
				if (propFrames.length > frame) {
					value = propFrames[frame];
				} else {
					value = propFrames[propFrames.length - 1];
				}
				this.mTarget[key] = value;
			}
		}
	}

	export class DamageHudManager extends Laya.Sprite {
		private static mInstance: DamageHudManager = null;	// 全局实例
		private mTextArray = new Array<DamageInfo>();		// 当前显示的伤害数字的信息

		// 注: 改用LinkedList是为了提升添加与删除性能,减少内存分配
		private mHead: ListElement<DamageInfo> | null = null;	// 保存首节点
		private mTail: ListElement<DamageInfo> | null = null;	// 保存尾节点
		private mFreeList: ListElement<DamageInfo> = null;		// 空闲的首节点
		private readonly mFontName = `${DamageFontHeight}px Microsoft YaHei`; // 伤害数字的字体
		private readonly mAnimations: HurtNumberUIEx;			// 动画数据
		private mUsedAniIndex: number = 0;						// 当前使用的动画的索引

		private static followOwner = true;						// 伤害数字是否跟随产生伤害的对象.注: 开启会提升效果,但带来性能开销.如果伤害的产生对象不经常移动,建议关闭此项
		private static hudOffset = 2;							// 伤害数字的偏移量(米),统一定义,简单
		private static fontColors = new Map<DamageType, string>();	// 字体颜色对象

		private constructor() {
			super();
			Global.Log.Assert(!DamageHudManager.mInstance);
			DamageHudManager.mInstance = this;

			this.mAnimations = new HurtNumberUIEx(this);
			const fontColors = DamageHudManager.fontColors;
			fontColors.set(DamageType.DAMAGETYPE_DEFAULT, "#ffffff");
			fontColors.set(DamageType.DAMAGETYPE_IGNOREDEFENCE, "#00fafa");
			fontColors.set(DamageType.DAMAGETYPE_DOUBLEATTACK, "#ffed04");
			fontColors.set(DamageType.DAMAGETYPE_EXCELLENCEATTACK, "#ffa901");
			fontColors.set(DamageType.DAMAGETYPE_LUCKYATTACK, "#0096fa");
			fontColors.set(DamageType.DAMAGETYPE_THORNDAMAGE, "#dc00dc");
			fontColors.set(DamageType.DAMAGETYPE_RUTHLESS, "#ffb400");
			fontColors.set(DamageType.DAMAGETYPE_COLD, "#ffb400");
			fontColors.set(DamageType.DAMAGETYPE_SAVAGE, "#ffb400");
			fontColors.set(DamageType.DAMAGETYPE_IGNOREPHY, "#ffffff");
			fontColors.set(DamageType.DAMAGETYPE_IGNOREMAGIC, "#ffffff");
		}

		/**
		 * 返回本管理器的实例
		 */
		public static instance(): DamageHudManager {
			return DamageHudManager.mInstance;
		}

		/**
		 * 实例化本管理器
		 */
		public static create(): void {
			// 实例化伤害数字的管理器
			uiMgr.addChild(new MyUI.DamageHudManager(), UILayer.Hurt);
		}

		/**
		 * 销毁本管理器
		 */
		public static destroy(): void {
			uiMgr.removeChild(DamageHudManager.mInstance, UILayer.Hurt);
			DamageHudManager.mInstance = null;
		}

		/**
		 * 申请一个 List 节点
		 */
		private getListElement(): ListElement<DamageInfo> {
			if (this.mFreeList == null) {
				return new ListElement<DamageInfo>(new DamageInfo());
			}

			const retInfo = this.mFreeList;			// 返回首部指针
			this.mFreeList = this.mFreeList.next;	// 指向下一个节点
			retInfo.next = null;
			retInfo.prev = null;
			return retInfo;
		}

		/**
		 * 把指定的List 节点还回到池子中,以便复用,减少内存分配
		 * @param listElement 指定要还回池子的List节点
		 */
		private returnListElement(listElement: ListElement<DamageInfo>): void {
			// 从列表中移除
			if (this.mHead === listElement) {
				this.mHead = listElement.next;
				listElement.next = null;
				if (this.mHead) {
					this.mHead.prev = null;
				}
			}
			else {
				if (listElement.prev) {
					listElement.prev.next = listElement.next;
				}
				if (listElement.next) {
					listElement.next.prev = listElement.prev;
				}
			}

			// 移除到空闲列表中			
			listElement.next = this.mFreeList;
			this.mFreeList = listElement;
			listElement.prev = null;
		}

		/**
		 * 显示伤害数字
		 * @param hudPos 指定伤害数字在Laya坐标系中的位置
		 * @param damage 伤害数字
		 * @param damageType 伤害类型
		 */
		public showDamage(hudPos: Laya.Vector3, damage: number, damageType: DamageType): void {
			const listElement = this.getListElement();
			const damageInfo = listElement.mData;
			damageInfo.mDamage = damage.toFixed(0);
			damageInfo.mColor = DamageHudManager.fontColors.get(damageType);
			damageInfo.mShowTime = 0;

			// 交替使用多个动画
			damageInfo.mAniIndex = this.mUsedAniIndex++;
			if (this.mUsedAniIndex >= this.mAnimations.getAniCount()) {
				this.mUsedAniIndex = 0;
			}

			if (!DamageHudManager.followOwner) {
				// 不跟随伤害产生者,提前计算屏幕坐标
				const camera = GameMode.PlayingMode.getMainCamera();
				damageInfo.mPos = new Laya.Vector3();
				const pos3D = this.mTempPos;
				hudPos.cloneTo(pos3D);
				pos3D.y += DamageHudManager.hudOffset;	// 加上点偏移量(米)
				camera.worldToViewportPoint(pos3D, damageInfo.mPos);
			}
			else {
				damageInfo.mPos = hudPos;	// 注意: 这里是位置引用
			}

			// 如果还没开始帧逻辑,开启它,以便更新数字的显示
			if (this.mHead == null) {
				this.frameLoop(1, this, this.onFrameLoop);
			}

			this.pushListElement(listElement);
		}

		/**
		 * 添加到节点到列表中
		 * @param listElement 指定要添加的节点
		 */
		private pushListElement(listElement: ListElement<DamageInfo>): void {
			if (this.mHead == null) {
				this.mHead = listElement;
				this.mTail = listElement;
			}
			else {	// 加到尾部
				this.mTail.next = listElement;
				listElement.prev = this.mTail;
				listElement.next = null;
				this.mTail = listElement;
			}
		}

		private mTempScreenPos = new Laya.Vector3();	// 缓冲临时屏幕位置,减少内存分配
		private mTempPos = new Laya.Vector3();			// 缓冲目标坐标,减少内存分配

		/**
		 * 每帧调用,以便更新伤害数字的位置及显示
		 */
		private onFrameLoop(): void {
			const camera = GameMode.PlayingMode.getMainCamera();
			const graphics = this.graphics;
			graphics.clear();

			const deltaTime = Laya.timer.delta;
			const animations = this.mAnimations;
			const aniLength = animations.getAniLength();
			const interval = animations.getInterval();
			let listElement = this.mHead;

			while (listElement != null) {
				const nextElement = listElement.next;
				const info = listElement.mData;
				info.mShowTime += deltaTime;
				if (info.mShowTime >= aniLength) {
					// 已经结束了,不再显示了
					this.returnListElement(listElement);
				}
				else {
					// 更新动画
					const frameIndex = Math.floor(info.mShowTime / interval);

					let pos2D: Laya.Vector3;
					if (DamageHudManager.followOwner) {
						// 变换到屏幕坐标系, 计算显示位置
						pos2D = this.mTempScreenPos;
						const pos3D = this.mTempPos;
						info.mPos.cloneTo(pos3D);
						pos3D.y += DamageHudManager.hudOffset;	// 加上点偏移量(米)
						camera.worldToViewportPoint(pos3D, pos2D);
					}
					else {
						pos2D = info.mPos;
					}

					// 应用动画.
					graphics.save();	// 需要保存当前状态,否则变换矩阵会不正确!
					animations.displayToIndex(pos2D.x, pos2D.y, info.mAniIndex, frameIndex, info.mCachedMatrix);
					graphics.fillBorderText(info.mDamage, 0, 0, this.mFontName, info.mColor, "#131313", 1, "center");
					graphics.restore();	// 需要恢复上面保存的状态,否则变换矩阵会不正确
				}

				listElement = nextElement;
			}

			if (this.mHead == null) { // 没有节点了,停止帧逻辑
				this.clearTimer(this, this.onFrameLoop);
			}
		}
	}
}