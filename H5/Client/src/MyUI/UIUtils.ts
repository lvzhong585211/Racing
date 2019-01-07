/**
* name 相当于”GUIUtils“
*/
namespace MyUI {
	export let DefaultFont = "Microsoft YaHei";			// 默认字体中不可以带大小,否则html的字体大小就不正确了
	export let DebugFont = "14px Microsoft YaHei";		// 用于输出调试信息的字体

	/**
	 * 定义常用的颜色
	 */
	export class ColorCode {
		// ARGB颜色值
		public static readonly Orange: number = 0xffff9d08;
		public static readonly Green: number = 0xff49bd1b;
		public static readonly Gray: number = 0xff999999;
		public static readonly White: number = 0xffffffff;
		public static readonly Red: number = 0xffe73722;
		public static readonly White2: number = 0xffdac7ae;
		public static readonly Yellow: number = 0xfff2b308;
		public static readonly Yellow2: number = 0xffffd460;
		public static readonly Yellow3: number = 0xffc39550;
		public static readonly Blue1: number = 0xff73dcff;
		public static readonly Blue2: number = 0xffACF6FF;
		public static readonly Blue3: number = 0xff4997bc;
		public static readonly Green2: number = 0xff3aab1f;
		public static readonly Cyan: number = 0xff00b9c5;
		public static readonly Gray2: number = 0xff5e5e5e;
		public static readonly Cyan2: number = 0xff4997bc;

		public static readonly Blue: number = 0xff53bdec;
		public static readonly Purple: number = 0xffdc76d6;

		public static readonly Normal: number = 0xff99a2b1;
		public static readonly Value: number = 0xffdae8f5;
		public static readonly Value1: number = 0xffafbacd;
		public static readonly No: number = 0xffc62e29;

		public static readonly TabColor: number = 0xff737991;
		public static readonly TabColor1: number = 0xffd4dee9;
		public static readonly Title: number = 0xffd6dfe8;
		public static readonly Name: number = 0xffa7b9ce;
		public static readonly Button: number = 0xfffcfafd;

		public static readonly ZhuoYue0: number = 0xffa5a9b2;
		public static readonly ZhuoYue1: number = 0xff749a29;
		public static readonly ZhuoYue2: number = 0xff3574bd;
		public static readonly ZhuoYue3: number = 0xff9b49db;

		public static readonly blue_string: number = 0x53bdec;

		// NGUI颜色代码字符串值
		public static readonly black: string = "000000";          // 黑色
		public static readonly orange: string = "ff9d08";
		public static readonly orange2: string = "e3b36c";
		public static readonly green: string = "49bd1b";
		public static readonly gray: string = "666666";
		public static readonly red: string = "e73722";
		public static readonly red2: string = "d21616";
		public static readonly white: string = "fffffe";
		public static readonly white2: string = "edecea";
		public static readonly white3: string = "ffffff";
		public static readonly yellow: string = "f2b308";
		public static readonly yellow2: string = "ffd460";
		public static readonly yellow3: string = "c39550";
		public static readonly yellow4: string = "F2E2BD";
		public static readonly yellow5: string = "ffeb65";
		public static readonly blue1: string = "73dcff";
		public static readonly blue2: string = "ACF6FF";
		public static readonly blue3: string = "4997bc";
		public static readonly green2: string = "3aab1f";
		public static readonly cyan: string = "00b9c5";
		public static readonly gray2: string = "5e5e5e";
		public static readonly cyan2: string = "4997bc";

		public static readonly blue: string = "53bdec";
		public static readonly purple: string = "dc76d6";

		public static readonly normal: string = "99a2b1";
		public static readonly normalH: string = `#${ColorCode.normal}`;
		public static readonly value: string = "dae8f5";
		public static readonly valueH: string = `#${ColorCode.value}`;
		public static readonly no: string = "c62e29";
		public static readonly noH: string = `#${ColorCode.no}`;
		public static readonly tabColor: string = "737991";
		public static readonly tabColor1: string = "d4dee9";
		public static readonly title: string = "d6dfe8";
		public static readonly name_string: string = "a7b9ce";
		public static readonly button: string = "fcfafd";

		public static readonly value1: string = "afbacd";
		public static readonly zhuoYue0: string = "a5a9b2";
		public static readonly zhuoYue0H: string = `#${ColorCode.zhuoYue0}`;
		public static readonly zhuoYue1: string = "749a29";
		public static readonly zhuoYue1H: string = `#${ColorCode.zhuoYue1}`;
		public static readonly zhuoYue2: string = "3574bd";
		public static readonly zhuoYue2H: string = `#${ColorCode.zhuoYue2}`;
		public static readonly zhuoYue3: string = "9b49db";
		public static readonly zhuoYue3H: string = `#${ColorCode.zhuoYue3}`;
		public static readonly friendLineGrey: string = "7f7f7f";          // 好友界面离线灰色
		public static readonly friendLineBlue: string = "337ed7";          // 好友界面在线蓝色
		public static readonly sevenDayNoActive: string = "475c6c";        // 7日天数文本不可领取
		public static readonly sevenDayActive: string = "8fb8d8";          // 7日天数文本可领取
		public static readonly totemDescTitle: string = "97caf1";          // 图腾描述Title

		// NGUI颜色代码关闭符
		public static readonly close: string = "-";

        /**
         * 用给定的颜色格式化文本
         * @param text 指定要格式化的文本
         * @param color 要使用的颜色
         */
		public static encodingText(text: string, color = ColorCode.green): string {
			return `<font color='#${color}'>${text}</font>`;
		}
	}

	/**
	 * 显示或隐藏所有子对象
	 * @param parent 
	 * @param bState 
	 */
	export function setActiveChildren(parent: laya.display.Sprite, bState: boolean) {
		const nCnt = parent.numChildren;
		for (let nIdx = 0; nIdx < nCnt; nIdx++) {
			const node = parent.getChildAt(nIdx) as laya.display.Sprite;
			if (bState) showNodeWithLayout(node);
			else hideNodeWithLayout(node);
		}
	}

	/**
	 * 显示/隐藏节点
	 * @param node 
	 * @param bState 
	 */
	export function toggleNodeWithLayout(node: laya.display.Sprite, bState: boolean) {
		if (bState) {
			showNodeWithLayout(node);
		} else {
			hideNodeWithLayout(node);
		}
	}

	/**
	 * 显示节点，如果是Component启用布局
	 * @param node
	 */
	export function showNodeWithLayout(node: laya.display.Sprite) {
		if (node instanceof laya.ui.Component) {
			node.layoutEnabled = node.visible = true;
		} else {
			node.visible = true;
		}
	}

	/**
	 * 隐藏节点，如果是Component不启用布局
	 * @param node
	 */
	export function hideNodeWithLayout(node: laya.display.Sprite) {
		if (node instanceof laya.ui.Component) {
			node.layoutEnabled = node.visible = false;
		} else {
			node.visible = false;
		}
	}

	/**
	 * 附加一个小红点到指定的对象上 </br>
	 * 注意：如果对象上已经有小红点了，则会重新设置一下小红点的布局数据
	 * @param parent 要附加小红点的对象
	 * @param left 小红点在对象上距左边的距离，默认值119
	 * @param top 小红点在对象上距上边的距离，默认值6
	 */
	export function attachRedDotToSprite(parent: Laya.Sprite, left = 119, top = 6): RedDot {
		Global.Log.Assert(parent && !parent.destroyed, `red dot parent not existed!!!`);
		let dot = parent.getChildByName(RedDot.name) as RedDot;
		if (!dot) {
			dot = new RedDot();
			dot.name = RedDot.name;
			parent.addChild(dot);
		}
		dot.left = left;
		dot.top = top;
		return dot;
	}

	/**
	 * 扩大指定对象的点击区域
	 * @param spr 对象
	 * @param nHitW 点击区域宽
	 * @param nHitH 点击区域高
	 */
	export function enlargeHitArea(spr: laya.display.Sprite, nHitW: number, nHitH: number) {
		if (!spr) return;
		const nOffsetX = (nHitW - spr.width) / 2;
		const nOffsetY = (nHitH - spr.height) / 2;
		spr.hitArea = new Laya.Rectangle(-nOffsetX, -nOffsetY, nHitW, nHitH);

		// // Debug...
		// let debugSp = new Laya.Sprite();
		// debugSp.graphics.drawRect(-nOffsetX, -nOffsetY, nHitW, nHitH, "#ffff00");
		// debugSp.alpha = 0.2;
		// spr.addChild(debugSp);
	}

	//#region ======================== class的定义可以放到这里 ========================

	/**
     * 有操作间隔的Handler（操作太快会进行提示）
	 * 注意：该类型的Handler不能通过Handler.create创建
     */
	export class OpIntervalHandler extends Laya.Handler {
		private m_nOpInterval = 0; // 操作间隔时间（毫秒）
		private m_bHint = true; // 是否需要进行提示
		private m_nLastOpTime = 0; // 上次操作时间

        /**
         * 有操作间隔的Handler（操作太快会进行提示）
         * @param nInterval 允许的操作间隔时间（毫秒）
         * @param caller 执行域
         * @param method 处理函数
         * @param args 函数参数
         * @param once 是否只执行一次
         */
		constructor(nInterval: number, caller?: any, method?: Function, args?: any[], once?: boolean, bHint: boolean = true) {
			super(caller, method, args, once);
			this.m_nOpInterval = nInterval;
			this.m_bHint = bHint;
		}

		/**
         * 执行处理器。
         */
		public run(): any {
			if (this.isValid()) {
				super.run();
			}
		}

        /**
         * 执行处理器，携带额外数据。
         * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
         */
		public runWith(data: any): any {
			if (this.isValid()) {
				super.runWith(data);
			}
		}

		/**
		 * 操作是否有效
		 */
		private isValid(): boolean {
			const nCurTime = Date.now();
			if (nCurTime - this.m_nLastOpTime >= this.m_nOpInterval) {
				this.m_nLastOpTime = nCurTime;
				return true;
			}
			uiMgr.hintText(Loca.getLang("12810")); // 您的操作太快，请稍后再试
			return false;
		}
	}

	//#endregion ====================================================================
}