namespace Global {
    export const PI2: number = Math.PI * 2;

    /**
     * 根据3d的旋转计算圆周角度(度)
     * @param rotation 计算用的四元数 
     */
    export function GetYAngle(rotation: Laya.Quaternion): number {
        const yawPitchRoll = new Laya.Vector3();
        rotation.getYawPitchRoll(yawPitchRoll);
        let angle = Laya.Utils.toAngle(yawPitchRoll.x);
        if (angle < 0) {
            angle = 360 + angle;
        }
        angle = 360 - angle + 180;    // 转换到服务器坐标系(服务器的x轴与Layabox相反的)
        return angle;
    }

    export class Vector3 extends Laya.Vector3 {
        public constructor(x?: number, y?: number, z?: number) {
            super(x, y, z);
        }

        public multiply(other: number | Vector3): Vector3 {
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

        public cloneEx(): Vector3 {
            return new Vector3(this.x, this.y, this.z);
        }

        public multiplyClone(other: number | Vector3): Vector3 {
            return this.cloneEx().multiply(other);
        }

        public add(other: Vector3): Vector3 {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
            return this;
        }

        public addClone(other: Vector3): Vector3 {
            return this.cloneEx().add(other);
        }

        public subtract(other: Vector3): Vector3 {
            this.x -= other.x;
            this.y -= other.y;
            this.z -= other.z;
            return this;
        }

        public subtractClone(other: Vector3): Vector3 {
            return this.cloneEx().subtract(other);
        }

        public normalized(): Vector3 {
            Vector3.normalize(this, this);
            return this;
        }

        public normalizedClone(): Vector3 {
            return this.cloneEx().normalized();
        }
    }
}