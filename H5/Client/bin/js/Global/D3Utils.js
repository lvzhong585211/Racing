/***************************************************************************************
 ********************************** 一些3D相关的工具函数 *********************************
 ***************************************************************************************/
var Global;
(function (Global) {
    /**
     * 获取指定模型的包围盒
     * @param model
     */
    function getMeshBoundBox(model) {
        if (!model) {
            return new Laya.BoundBox(new Global.Vector3(0, 0, 0), new Global.Vector3(0, 0, 0));
        }
        let childBound = null;
        let outBound = null;
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
    Global.getMeshBoundBox = getMeshBoundBox;
})(Global || (Global = {}));
//# sourceMappingURL=D3Utils.js.map