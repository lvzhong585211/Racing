var Global;
(function (Global) {
    Global.PI2 = Math.PI * 2;
    /**
     * 根据3d的旋转计算圆周角度(度)
     * @param rotation 计算用的四元数
     */
    function GetYAngle(rotation) {
        const yawPitchRoll = new Laya.Vector3();
        rotation.getYawPitchRoll(yawPitchRoll);
        let angle = Laya.Utils.toAngle(yawPitchRoll.x);
        if (angle < 0) {
            angle = 360 + angle;
        }
        angle = 360 - angle + 180; // 转换到服务器坐标系(服务器的x轴与Layabox相反的)
        return angle;
    }
    Global.GetYAngle = GetYAngle;
    class Vector3 extends Laya.Vector3 {
        constructor(x, y, z) {
            super(x, y, z);
        }
        multiply(other) {
            if (other instanceof Vector3) {
                this.x *= other.x;
                this.y *= other.y;
                this.z *= other.z;
            }
            else {
                this.x *= other;
                this.y *= other;
                this.z *= other;
            }
            return this;
        }
        cloneEx() {
            return new Vector3(this.x, this.y, this.z);
        }
        multiplyClone(other) {
            return this.cloneEx().multiply(other);
        }
        add(other) {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
            return this;
        }
        addClone(other) {
            return this.cloneEx().add(other);
        }
        subtract(other) {
            this.x -= other.x;
            this.y -= other.y;
            this.z -= other.z;
            return this;
        }
        subtractClone(other) {
            return this.cloneEx().subtract(other);
        }
        normalized() {
            Vector3.normalize(this, this);
            return this;
        }
        normalizedClone() {
            return this.cloneEx().normalized();
        }
    }
    Global.Vector3 = Vector3;
})(Global || (Global = {}));
//# sourceMappingURL=MathUtils.js.map