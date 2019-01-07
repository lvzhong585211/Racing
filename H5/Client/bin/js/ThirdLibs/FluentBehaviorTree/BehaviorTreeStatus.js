/**
 * The return type when invoking behavior tree nodes.
 */
var BehaviorTreeStatus;
(function (BehaviorTreeStatus) {
    BehaviorTreeStatus[BehaviorTreeStatus["Success"] = 1] = "Success";
    BehaviorTreeStatus[BehaviorTreeStatus["Failure"] = 2] = "Failure";
    BehaviorTreeStatus[BehaviorTreeStatus["Running"] = 3] = "Running";
})(BehaviorTreeStatus || (BehaviorTreeStatus = {}));
//# sourceMappingURL=BehaviorTreeStatus.js.map