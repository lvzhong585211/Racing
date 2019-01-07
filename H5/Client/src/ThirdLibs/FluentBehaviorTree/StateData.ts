
namespace FBT {
    /**
    * Represents time and state. Used to pass time values to behavior tree nodes.
    *
    * @property {number} deltaTime - The current time of this state representation(√Î)
    * @property {object} state     - Any state data you would like to pass to the nodes.
    */
    export class StateData {
        public constructor(public deltaTime: number = 0) {
        }
    }
}