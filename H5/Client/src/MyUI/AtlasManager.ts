namespace MyUI {
	import Loader = laya.net.Loader;
	import Handler = laya.utils.Handler;

	/** 图集信息类 */
	class AtlasInfo {
		/** 图集url */
		private _url: string;
		/** 图集隶属于的模块（可以属于多个模块，使用移位操作符定义），用于切换模块时加载和删除图集 */
		belongs: number;

		/**
		 * 图集信息构造函数
		 * @param sAtlasName 图集名字
		 * @param nBelongs 隶属于的模块（可以属于多个模块，使用移位操作符定义）
		 */
		constructor(sAtlasName: string, nBelongs: number) {
			this.url = sAtlasName;
			this.belongs = nBelongs;
		}

		/** 获取图集url */
		public get url() { return this._url; }
		/**
		 * 设置图集url
		 * @param sAtlasName 图集名字
		 */
		public set url(sAtlasName: string) {
			this._url = Global.getAtlasPath(sAtlasName);
		}
	}

	/**
	 * 图集管理类
	 * --Add-后期或许可以考虑扩展成资源管理类，统一管理音频、视频、图片等资源
	 * --Add-暂时没理清楚，所以先只管理图集的删除和加载吧
	 */
	export class AtlasManager {
		private m_lstAtlasInfos: AtlasInfo[]; // 图集信息列表

		constructor() {
			this.createChildren();
		}

		private createChildren() {
			// 初始化图集信息列表
			this.m_lstAtlasInfos = [
				// this._("loading", 1 << EnumGameMode.Loading), // loading图集由LoadingView界面负责加载
				// this._("netwaiting", 1 << EnumGameMode.Login | 1 << EnumGameMode.Playing), // Login界面开始都需要的图集
				this._("login", 1 << EnumGameMode.Login),
				this._("main"),
				this._("common"),
				this._("occupation"),
				this._("welfare")
			];
		}

		/**
		 * 生成图集信息类
		 * @param sAtlasName 图集名字
		 * @param nBelongs 隶属于的模块（可以属于多个模块，使用移位操作符定义），默认值为游戏中模块（PlayingMode）
		 */
		private _(sAtlasName: string, nBelongs: number = 1 << EnumGameMode.Playing) {
			return new AtlasInfo(sAtlasName, nBelongs);
		}

		/**
		 * 检查图集资源
		 * @param eNewMode 新模块
		 */
		public async checkAtlasAssets(eNewMode: EnumGameMode) {
			// 选择角色和创建角色模块和登录模块共用同一个图集，所以检查图集的时候认为是同一个模块
			if (eNewMode === EnumGameMode.Selector || eNewMode === EnumGameMode.Creator) {
				eNewMode = EnumGameMode.Login;
			}

			const aWaitingDels: string[] = []; // 等待删除的图集
			const aWaitingLoads: LoadConfig[] = []; // 等待加载的图集
			// 初始化需要加载和卸载的图集
			this.m_lstAtlasInfos.forEach(element => {
				if (element.belongs >> eNewMode & 1) {
					if (!Loader.getAtlas(element.url)) {
						aWaitingLoads.push({ url: element.url, type: Loader.ATLAS });
					}
				} else {
					if (Loader.getAtlas(element.url)) {
						aWaitingDels.push(element.url);
					}
				}
			});

			// 卸载新模块不需要的图集
			aWaitingDels.forEach(element => {
				Loader.clearRes(element);
			});

			if (aWaitingLoads.length === 0) return;
			// 加载新模块需要的图集
			await MyUI.LoadingView.Show();
			await Global.Utils.LoadRes(
				aWaitingLoads,
				Handler.create(MyUI.LoadingView, MyUI.LoadingView.updateProgress, undefined, false)
			);
			MyUI.LoadingView.Hide();
		}
	}
}