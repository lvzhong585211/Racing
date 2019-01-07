var FBT;
(function (FBT) {
    /**
    * Represents time and state. Used to pass time values to behavior tree nodes.
    *
    * @property {number} deltaTime - The current time of this state representation(��)
    * @property {object} state     - Any state data you would like to pass to the nodes.
    */
    class StateData {
        constructor(deltaTime = 0) {
            this.deltaTime = deltaTime;
        }
    }
    FBT.StateData = StateData;
})(FBT || (FBT = {}));
//# sourceMappingURL=StateData.js.map