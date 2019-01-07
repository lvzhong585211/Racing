namespace Base {
    import Handler = laya.utils.Handler;
    import Utils = Global.Utils;
    import Log = Global.Log;

    // @desc 封装一个管理资源加载与卸载的基类.
    export class ResourceObject {
        readonly resGroup: string;           // 保存加载的资源所属的组,方便一会卸载资源用.
        private static groupIndex = 1000;    // 我们需要一个数来唯一标识资源所在的组.

        /**
         * @param resGroupPrefix 资源组的前缀,方便调试
         */
        constructor(resGroupPrefix?: string) {
            this.resGroup =
                resGroupPrefix
                    ? resGroupPrefix + "_" + ResourceObject.groupIndex.toString()
                    : ResourceObject.groupIndex.toString();

            ResourceObject.groupIndex++;
        }

        /**
        * @desc 加载指定的资源,具体参数与返回值见: Laya.loader.load()函数
        * 注: 这里是对Laya.loader.load()函数支持async的封装,方便上层使用
        */
        public async Load(url: any, progress?: Handler, type?: string, priority?: number): Promise<any> {
            return Utils.LoadRes(url, progress, type, priority, this.resGroup);
        }

        /**
         * @desc 调用此函数清除本对象加载的资源
         */
        public ClearRes() {
            Global.Log.Info(`-> 清除资源组${this.resGroup}`);
            Laya.loader.clearResByGroup(this.resGroup);
        }
    }
}