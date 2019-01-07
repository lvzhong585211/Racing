var FBT;
(function (FBT) {
    class Errors {
    }
    Errors.NO_NODES = "Cannot create a behavior tree with zero nodes.";
    Errors.SPLICE_UNNESTED_TREE = "Cannot splice an unnested sub-tree. There must be a parent-tree.";
    Errors.INVERTER_NO_CHILDREN = "InverterNode must have a child node!";
    Errors.INVERTER_MULTIPLE_CHILDREN = "Can't add more than a single child to InverterNode!";
    Errors.UNNESTED_ACTION_NODE = "Can't create an unnested ActionNode. It must be a leaf node.";
    Errors.NO_RETURN_VALUE = "Node must return a BehaviorTreeStatus";
    FBT.Errors = Errors;
})(FBT || (FBT = {}));
//# sourceMappingURL=Errors.js.map