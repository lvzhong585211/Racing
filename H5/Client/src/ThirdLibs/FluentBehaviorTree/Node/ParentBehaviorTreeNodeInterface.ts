namespace FBT {
    export abstract class ParentBehaviorTreeNodeInterface extends BehaviorTreeNodeInterface {
        /**
         * Add a child node to the selector.
         *
         * @param {BehaviorTreeNodeInterface} child
         */
        abstract addChild(child: BehaviorTreeNodeInterface): void;
    }
}