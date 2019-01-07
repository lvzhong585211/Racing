/***************************************************************************************
 ********************************** 一些3D相关的工具函数 *********************************
 ***************************************************************************************/

namespace Global {

	/**
	 * 获取指定模型的包围盒
	 * @param model 
	 */
	export function getMeshBoundBox(model: Laya.Sprite3D): Laya.BoundBox {
		if (!model) {
			return new Laya.BoundBox(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
		}

		let childBound: Laya.BoundBox = null;
		let outBound: Laya.BoundBox = null;
		const numChildren = model.numChildren;
		for (let nIdx = 0; nIdx < numChildren; nIdx++) {
			const child = model.getChildAt(nIdx);
			if (child instanceof Laya.SkinnedMeshSprite3D) {
				if (!outBound) {
					outBound = child.skinnedMeshRender.boundingBox;
					continue;
				}
				childBound = child.skinnedMeshRender.boundingBox;
				Laya.BoundBox.merge(outBound, childBound, outBound);
			}
		}
		return outBound;
	}

}