namespace FBT {
    export class Errors {
        static readonly NO_NODES = "Cannot create a behavior tree with zero nodes.";
        static readonly SPLICE_UNNESTED_TREE = "Cannot splice an unnested sub-tree. There must be a parent-tree.";
        static readonly INVERTER_NO_CHILDREN = "InverterNode must have a child node!";
        static readonly INVERTER_MULTIPLE_CHILDREN = "Can't add more than a single child to InverterNode!";
        static readonly UNNESTED_ACTION_NODE = "Can't create an unnested ActionNode. It must be a leaf node.";
        static readonly NO_RETURN_VALUE = "Node must return a BehaviorTreeStatus";
    }
}