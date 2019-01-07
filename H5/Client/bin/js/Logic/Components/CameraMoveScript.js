class CameraMoveScript extends Laya.Script {
    constructor() {
        super();
        this.yawPitchRoll = new Laya.Vector3();
        this.resultRotation = new Laya.Quaternion();
        this.tempRotationZ = new Laya.Quaternion();
        this.tempRotationX = new Laya.Quaternion();
        this.tempRotationY = new Laya.Quaternion();
        this.rotaionSpeed = 0.00006;
    }
    _initialize(owner) {
        super._initialize(owner);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        this.camera = owner;
    }
    _update(state) {
        super._update(state);
        this.updateCamera(state.elapsedTime);
    }
    mouseDown(e) {
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }
    mouseUp(e) {
        this.isMouseDown = false;
    }
    mouseOut(e) {
        this.isMouseDown = false;
    }
    updateCamera(elapsedTime) {
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
            // var scene = this.owner.scene;
            Laya.KeyBoardManager.hasKeyDown(87) && this.camera.moveForward(-0.002 * elapsedTime); // W
            Laya.KeyBoardManager.hasKeyDown(83) && this.camera.moveForward(0.002 * elapsedTime); // S
            Laya.KeyBoardManager.hasKeyDown(65) && this.camera.moveRight(-0.002 * elapsedTime); // A
            Laya.KeyBoardManager.hasKeyDown(68) && this.camera.moveRight(0.002 * elapsedTime); // D
            Laya.KeyBoardManager.hasKeyDown(81) && this.camera.moveVertical(0.002 * elapsedTime); // Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.camera.moveVertical(-0.002 * elapsedTime); // E
            if (this.isMouseDown) {
                const offsetX = Laya.stage.mouseX - this.lastMouseX;
                const offsetY = Laya.stage.mouseY - this.lastMouseY;
                const yprElem = this.yawPitchRoll.elements;
                yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
                yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
                this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    }
    updateRotation() {
        const yprElem = this.yawPitchRoll.elements;
        if (Math.abs(yprElem[1]) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
            this.camera.transform.localRotation = this.tempRotationZ;
        }
    }
}
//# sourceMappingURL=CameraMoveScript.js.map