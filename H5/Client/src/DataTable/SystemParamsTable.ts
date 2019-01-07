namespace tables {
	/**
	 * 定义一个系统配置项
	 */
	interface SystemParam {
		Name: string;
		Value: string;
	}
	/**
	 * 系统参数表
	 */
	export class SystemParamsTable extends DataTable<SystemParam, string> {
		constructor() {
			super("SystemParams", "Name");
		}

		/**
		 * 获取参数名字对应的参数值
		 * @param sName 
		 */
		public getParam(sName: string): string {
			const findParam = super.Find(sName);
			if (findParam) {
				return findParam.Value;
			}
			return null;
		}

		/**
		 * 获取参数名字对应的浮点型数字
		 * @param sName 
		 */
		public getParamDouble(sName: string): number {
			const sParam = this.getParam(sName);
			if (Global.String.IsNullOrWhiteSpace(sParam)) {
				return 0;
			}
			return parseFloat(sParam);
		}

	    /**
           * 获取参数名字对应的整数型数字
           * @param sName 
           */
		public getParamInt(sName: string): number {
			const sParam = this.getParam(sName);
			if (Global.String.IsNullOrWhiteSpace(sParam)) {
				return 0;
			}
			return parseInt(sParam);
		}

		/**
		 * 获取参数名字对应的整数数组
		 * @param sName 
		 * @param sSplitChar 
		 */
		public getParamIntArray(sName: string, sSplitChar: string = ","): number[] {
			let sParam = this.getParam(sName);
			if (Global.String.IsNullOrWhiteSpace(sParam)) {
				return null;
			}

			sParam = sParam.trim();
			const aInt: number[] = [];
			const aParam = sParam.split(sSplitChar);
			aParam.forEach((element) => {
				aInt.push(parseInt(element));
			});
			return aInt;
		}

		/**
		 * 获取参数名字对应的浮点型数字数组
		 * @param sName 
		 * @param sSplitChar 
		 */
		public getParamDoubleArray(sName: string, sSplitChar: string = ","): number[] {
			let sParam = this.getParam(sName);
			if (Global.String.IsNullOrWhiteSpace(sParam)) {
				return null;
			}

			sParam = sParam.trim();
			const aDouble: number[] = [];
			const aParam = sParam.split(sSplitChar);
			aParam.forEach((element) => {
				aDouble.push(parseFloat(element));
			});
			return aDouble;
		}
	}
}