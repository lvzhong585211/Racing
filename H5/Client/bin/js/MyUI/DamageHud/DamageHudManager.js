/**
* 伤害数字的管理器
*/
var MyUI;
(function (MyUI) {
    const DamageFontHeight = 48; // 伤害字体的大小
    const DamageFontHalfHeight = DamageFontHeight * 0.5;
    /**
     * 保存一次伤害信息
     */
    class DamageInfo {
        constructor() {
            this.mCachedMatrix = new Laya.Matrix(); // 用于提升性能,减少内存分配的缓冲矩阵.		
        }
    }
    /**
     * 双向列表的元素
     */
    class ListElement {
        /**
         * @param mData 真正的数据对象
         */
        constructor(mData, prev = null, next = null) {
            this.mData = mData;
            this.prev = prev;
            this.next = next;
        }
    }
    /**
     * 封装动画操作类
     */
    class InfoAniTargetWrap {
        constructor(graphics) {
            this.matTranform = new Laya.Matrix(); // 保存变换矩阵
            this.mGraphics = graphics;
        }
        set x(value) {
            this.mX = value;
        }
        set y(value) {
            this.mY = value;
        }
        set scaleX(value) {
            this.mScaleX = value;
        }
        set scaleY(value) {
            this.mScaleY = value;
        }
        set alpha(value) {
            this.mAlpha = value;
        }
        on() {
        }
        /**
         * 应用设定的数据
         * @param posX 指定输出的x坐标(屏幕坐标系)
         * @param posY 指定输出的y坐标(屏幕坐标系)
         * @param mat4Cache 用于提升性能,减少内存分配的缓冲的变换矩阵
         */
        apply(posX, posY, mat4Cache) {
            mat4Cache.identity(); // 注: 矩阵在调用 this.mGraphics.transform() 函数传递给底层后会被Layabox继续使用,所以不可以直接销毁,必须复用!
            mat4Cache.scale(this.mScaleX, this.mScaleY);
            mat4Cache.setTranslate(posX + this.mX, posY + this.mY - DamageFontHeight); // 需要减少字体的高度.因为输出字体时,以上边界为参考坐标
            this.mGraphics.transform(mat4Cache, 0, DamageFontHalfHeight); // 需要以字体高度的一半为缩放中心点. x 轴不需要,因为底层会处理距中.
            this.mGraphics.setAlpha(this.mAlpha);
        }
    }
    /**
     * 派生处理我们自己的动画数据.因为Layabox底层不支持这个功能,而我们只想使用动画数据
     */
    class HurtNumberUIEx extends ui.Animations.HurtNumberUI {
        constructor(owner) {
            super();
            this.mAnimationDatas = [];
            this.mAniLength = 0; // 动画长度(毫秒)
            // 生成一下第二个动画的帧数据
            const aniData = HurtNumberUIEx.uiView["animations"];
            if (aniData && aniData[1]) {
                this._setUp({}, aniData[1]);
            }
            // this.mAniLength = this._count * this._interval;	// 只记一个动画的长度即可,我们假设两个动画的长度是一致的
            this.mAniLength = 300; // 只记一个动画的长度即可,我们假设两个动画的长度是一致的
            this._interval = this.mAniLength / this._count;
            this.mTarget = new InfoAniTargetWrap(owner.graphics);
            this.mAnimationDatas = aniData;
        }
        /**
         * 返回动画的数量
         */
        getAniCount() {
            return this.mAnimationDatas ? this.mAnimationDatas.length : 0;
        }
        /**
         * 返回动画的帧间隔(多个动画的帧间隔应该相同)
         */
        getInterval() {
            return this._interval;
        }
        /**
         * 返回动画的长度(毫秒). 注: (多个动画的长度应该相同)
         */
        getAniLength() {
            return this.mAniLength;
        }
        /**
         * 使用指定帧的数据来更新对象
         * @param posX 指定输出坐标X(屏幕坐标系)
         * @param posY 指定输出坐标Y(屏幕坐标系)
         * @param aniIndex 使用的动画索引
         * @param frameIndex 指定使用第几帧的数据来更新显示
         * @param cachedMatrix 提升性能,减少内存分配的缓冲矩阵
         */
        displayToIndex(posX, posY, aniIndex, frameIndex, cachedMatrix) {
            const aniData = this.mAnimationDatas[aniIndex];
            const nodes = aniData.nodes;
            const len = nodes.length;
            for (let i = 0; i < len; i++) {
                this.displayNodeToFrame(nodes[i], frameIndex);
            }
            // 应该变换
            this.mTarget.apply(posX, posY, cachedMatrix);
        }
        /**
         * 把指定节点的动画数据刷新到目标对象
         * @param node 指定动画所在的节点
         * @param frame 指定动画帧
         */
        displayNodeToFrame(node, frame) {
            const frames = node.frames;
            let value;
            const keys = node.keys;
            for (let i = 0, len = keys.length; i < len; i++) {
                const key = keys[i];
                const propFrames = frames[key];
                if (propFrames.length > frame) {
                    value = propFrames[frame];
                }
                else {
                    value = propFrames[propFrames.length - 1];
                }
                this.mTarget[key] = value;
            }
        }
    }
    class DamageHudManager extends Laya.Sprite {
        constructor() {
            super();
            this.mTextArray = new Array(); // 当前显示的伤害数字的信息
            // 注: 改用LinkedList是为了提升添加与删除性能,减少内存分配
            this.mHead = null; // 保存首节点
            this.mTail = null; // 保存尾节点
            this.mFreeList = null; // 空闲的首节点
            this.mFontName = `${DamageFontHeight}px Microsoft YaHei`; // 伤害数字的字体
            this.mUsedAniIndex = 0; // 当前使用的动画的索引
            this.mTempScreenPos = new Laya.Vector3(); // 缓冲临时屏幕位置,减少内存分配
            this.mTempPos = new Laya.Vector3(); // 缓冲目标坐标,减少内存分配
            Global.Log.Assert(!DamageHudManager.mInstance);
            DamageHudManager.mInstance = this;
            this.mAnimations = new HurtNumberUIEx(this);
            const fontColors = DamageHudManager.fontColors;
            fontColors.set(DamageType.DAMAGETYPE_DEFAULT, "#ffffff");
            fontColors.set(DamageType.DAMAGETYPE_IGNOREDEFENCE, "#00fafa");
            fontColors.set(DamageType.DAMAGETYPE_DOUBLEATTACK, "#ffed04");
            fontColors.set(DamageType.DAMAGETYPE_EXCELLENCEATTACK, "#ffa901");
            fontColors.set(DamageType.DAMAGETYPE_LUCKYATTACK, "#0096fa");
            fontColors.set(DamageType.DAMAGETYPE_THORNDAMAGE, "#dc00dc");
            fontColors.set(DamageType.DAMAGETYPE_RUTHLESS, "#ffb400");
            fontColors.set(DamageType.DAMAGETYPE_COLD, "#ffb400");
            fontColors.set(DamageType.DAMAGETYPE_SAVAGE, "#ffb400");
            fontColors.set(DamageType.DAMAGETYPE_IGNOREPHY, "#ffffff");
            fontColors.set(DamageType.DAMAGETYPE_IGNOREMAGIC, "#ffffff");
        }
        /**
         * 返回本管理器的实例
         */
        static instance() {
            return DamageHudManager.mInstance;
        }
        /**
         * 实例化本管理器
         */
        static create() {
            // 实例化伤害数字的管理器
            uiMgr.addChild(new MyUI.DamageHudManager(), UILayer.Hurt);
        }
        /**
         * 销毁本管理器
         */
        static destroy() {
            uiMgr.removeChild(DamageHudManager.mInstance, UILayer.Hurt);
            DamageHudManager.mInstance = null;
        }
        /**
         * 申请一个 List 节点
         */
        getListElement() {
            if (this.mFreeList == null) {
                return new ListElement(new DamageInfo());
            }
            const retInfo = this.mFreeList; // 返回首部指针
            this.mFreeList = this.mFreeList.next; // 指向下一个节点
            retInfo.next = null;
            retInfo.prev = null;
            return retInfo;
        }
        /**
         * 把指定的List 节点还回到池子中,以便复用,减少内存分配
         * @param listElement 指定要还回池子的List节点
         */
        returnListElement(listElement) {
            // 从列表中移除
            if (this.mHead === listElement) {
                this.mHead = listElement.next;
                listElement.next = null;
                if (this.mHead) {
                    this.mHead.prev = null;
                }
            }
            else {
                if (listElement.prev) {
                    listElement.prev.next = listElement.next;
                }
                if (listElement.next) {
                    listElement.next.prev = listElement.prev;
                }
            }
            // 移除到空闲列表中			
            listElement.next = this.mFreeList;
            this.mFreeList = listElement;
            listElement.prev = null;
        }
        /**
         * 显示伤害数字
         * @param hudPos 指定伤害数字在Laya坐标系中的位置
         * @param damage 伤害数字
         * @param damageType 伤害类型
         */
        showDamage(hudPos, damage, damageType) {
            const listElement = this.getListElement();
            const damageInfo = listElement.mData;
            damageInfo.mDamage = damage.toFixed(0);
            damageInfo.mColor = DamageHudManager.fontColors.get(damageType);
            damageInfo.mShowTime = 0;
            // 交替使用多个动画
            damageInfo.mAniIndex = this.mUsedAniIndex++;
            if (this.mUsedAniIndex >= this.mAnimations.getAniCount()) {
                this.mUsedAniIndex = 0;
            }
            if (!DamageHudManager.followOwner) {
                // 不跟随伤害产生者,提前计算屏幕坐标
                const camera = GameMode.PlayingMode.getMainCamera();
                damageInfo.mPos = new Laya.Vector3();
                const pos3D = this.mTempPos;
                hudPos.cloneTo(pos3D);
                pos3D.y += DamageHudManager.hudOffset; // 加上点偏移量(米)
                camera.worldToViewportPoint(pos3D, damageInfo.mPos);
            }
            else {
                damageInfo.mPos = hudPos; // 注意: 这里是位置引用
            }
            // 如果还没开始帧逻辑,开启它,以便更新数字的显示
            if (this.mHead == null) {
                this.frameLoop(1, this, this.onFrameLoop);
            }
            this.pushListElement(listElement);
        }
        /**
         * 添加到节点到列表中
         * @param listElement 指定要添加的节点
         */
        pushListElement(listElement) {
            if (this.mHead == null) {
                this.mHead = listElement;
                this.mTail = listElement;
            }
            else { // 加到尾部
                this.mTail.next = listElement;
                listElement.prev = this.mTail;
                listElement.next = null;
                this.mTail = listElement;
            }
        }
        /**
         * 每帧调用,以便更新伤害数字的位置及显示
         */
        onFrameLoop() {
            const camera = GameMode.PlayingMode.getMainCamera();
            const graphics = this.graphics;
            graphics.clear();
            const deltaTime = Laya.timer.delta;
            const animations = this.mAnimations;
            const aniLength = animations.getAniLength();
            const interval = animations.getInterval();
            let listElement = this.mHead;
            while (listElement != null) {
                const nextElement = listElement.next;
                const info = listElement.mData;
                info.mShowTime += deltaTime;
                if (info.mShowTime >= aniLength) {
                    // 已经结束了,不再显示了
                    this.returnListElement(listElement);
                }
                else {
                    // 更新动画
                    const frameIndex = Math.floor(info.mShowTime / interval);
                    let pos2D;
                    if (DamageHudManager.followOwner) {
                        // 变换到屏幕坐标系, 计算显示位置
                        pos2D = this.mTempScreenPos;
                        const pos3D = this.mTempPos;
                        info.mPos.cloneTo(pos3D);
                        pos3D.y += DamageHudManager.hudOffset; // 加上点偏移量(米)
                        camera.worldToViewportPoint(pos3D, pos2D);
                    }
                    else {
                        pos2D = info.mPos;
                    }
                    // 应用动画.
                    graphics.save(); // 需要保存当前状态,否则变换矩阵会不正确!
                    animations.displayToIndex(pos2D.x, pos2D.y, info.mAniIndex, frameIndex, info.mCachedMatrix);
                    graphics.fillBorderText(info.mDamage, 0, 0, this.mFontName, info.mColor, "#131313", 1, "center");
                    graphics.restore(); // 需要恢复上面保存的状态,否则变换矩阵会不正确
                }
                listElement = nextElement;
            }
            if (this.mHead == null) { // 没有节点了,停止帧逻辑
                this.clearTimer(this, this.onFrameLoop);
            }
        }
    }
    DamageHudManager.mInstance = null; // 全局实例
    DamageHudManager.followOwner = true; // 伤害数字是否跟随产生伤害的对象.注: 开启会提升效果,但带来性能开销.如果伤害的产生对象不经常移动,建议关闭此项
    DamageHudManager.hudOffset = 2; // 伤害数字的偏移量(米),统一定义,简单
    DamageHudManager.fontColors = new Map(); // 字体颜色对象
    MyUI.DamageHudManager = DamageHudManager;
})(MyUI || (MyUI = {}));
//# sourceMappingURL=DamageHudManager.js.map