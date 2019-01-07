var Logic;
(function (Logic) {
    /**
     * 定义角色状态
     */
    let EControllerStateId;
    (function (EControllerStateId) {
        EControllerStateId[EControllerStateId["StateNone"] = -1] = "StateNone";
        EControllerStateId[EControllerStateId["NotBeingControlled"] = 0] = "NotBeingControlled";
        EControllerStateId[EControllerStateId["Idling"] = 1] = "Idling";
        EControllerStateId[EControllerStateId["Dead"] = 2] = "Dead";
        EControllerStateId[EControllerStateId["KnockDown"] = 3] = "KnockDown";
        EControllerStateId[EControllerStateId["KnockBacking"] = 4] = "KnockBacking";
        EControllerStateId[EControllerStateId["ShowTime"] = 5] = "ShowTime";
        EControllerStateId[EControllerStateId["SkillAttacking"] = 6] = "SkillAttacking";
        EControllerStateId[EControllerStateId["Fleeing"] = 7] = "Fleeing";
        EControllerStateId[EControllerStateId["AutoPath"] = 8] = "AutoPath";
        EControllerStateId[EControllerStateId["AutoPathForTask"] = 9] = "AutoPathForTask";
        EControllerStateId[EControllerStateId["StateDizzy"] = 10] = "StateDizzy";
        EControllerStateId[EControllerStateId["Frozen"] = 11] = "Frozen";
        EControllerStateId[EControllerStateId["StateMountUp"] = 12] = "StateMountUp";
        EControllerStateId[EControllerStateId["StateMountDown"] = 13] = "StateMountDown";
        EControllerStateId[EControllerStateId["ServerRunAction"] = 14] = "ServerRunAction";
        EControllerStateId[EControllerStateId["NumStates"] = 15] = "NumStates";
    })(EControllerStateId = Logic.EControllerStateId || (Logic.EControllerStateId = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=ControllerStateId.js.map