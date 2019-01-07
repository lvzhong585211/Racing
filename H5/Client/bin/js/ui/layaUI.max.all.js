var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var EffectAnimation = laya.display.EffectAnimation;
var ui;
(function (ui) {
    var ActivityPart;
    (function (ActivityPart) {
        class ActivityPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.ActivityItemRender", MyUI.ActivityItemRender);
                super.createChildren();
                this.createView(ui.ActivityPart.ActivityPartUI.uiView);
            }
        }
        ActivityPartUI.uiView = { "type": "View", "props": { "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 90, "x": 225, "width": 985, "skin": "ui/common/vew_bg_biaoqian.png", "height": 603 } }, { "type": "Image", "props": { "y": 99, "x": 232, "width": 622, "skin": "ui/common/activity_rightbg.png", "sizeGrid": "5,5,5,5", "height": 540 } }, { "type": "Image", "props": { "y": 102, "x": 887, "width": 316, "skin": "ui/common/activity_rightbg.png", "sizeGrid": "5,5,5,5", "height": 588 } }, { "type": "Image", "props": { "y": 99, "x": 883, "skin": "ui/common/activity_biaotou.png" } }, { "type": "List", "props": { "y": 107, "x": 240, "width": 607, "var": "_mxActivityItemRenderList", "spaceY": 5, "spaceX": 5, "repeatX": 2, "renderType": "render", "height": 530 }, "child": [{ "type": "ActivityItemRender", "props": { "runtime": "MyUI.ActivityItemRender", "renderType": "render" } }] }, { "type": "List", "props": { "y": 107, "x": 240, "width": 607, "var": "_zcActivityItemRenderList", "spaceY": 5, "spaceX": 5, "repeatX": 2, "renderType": "render", "height": 530 }, "child": [{ "type": "ActivityItemRender", "props": { "runtime": "MyUI.ActivityItemRender", "renderType": "render" } }] }, { "type": "List", "props": { "y": 161, "x": 896.5, "width": 300, "var": "_xsActivityItemRenderList", "spaceY": 5, "renderType": "render", "height": 525 }, "child": [{ "type": "ActivityItemRender", "props": { "runtime": "MyUI.ActivityItemRender", "renderType": "render" } }] }, { "type": "Label", "props": { "y": 112, "x": 993, "width": 100, "text": "活动提醒", "fontSize": 24, "color": "#BCDDFF", "align": "center" } }] };
        ActivityPart.ActivityPartUI = ActivityPartUI;
    })(ActivityPart = ui.ActivityPart || (ui.ActivityPart = {}));
})(ui || (ui = {}));
(function (ui) {
    var Animations;
    (function (Animations) {
        class HurtNumberUI extends EffectAnimation {
            constructor() { super(); this.effectData = ui.Animations.HurtNumberUI.uiView; }
        }
        HurtNumberUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Text", "props": { "y": 0, "x": 0, "width": 120, "text": "100.5万", "pivotY": 16, "pivotX": 60, "height": 32, "fontSize": 32, "color": "#ffe000", "align": "center" }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": -16, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": -6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 8 }, { "value": -8, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 0 }, { "value": 2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 8 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 0 }, { "value": 2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 8 }], "alpha": [{ "value": 0.6, "tweenMethod": "strongOut", "tween": true, "target": 2, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 8 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 13 }] } }], "name": "Left", "id": 1, "frameRate": 60, "action": 0 }, { "nodes": [{ "target": 2, "keyframes": { "y": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 3 }, { "value": -16, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 8 }, { "value": -6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "y", "index": 13 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 3 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 8 }, { "value": 8, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 13 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 0 }, { "value": 2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 8 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 0 }, { "value": 2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 8 }], "alpha": [{ "value": 0.6, "tweenMethod": "strongOut", "tween": true, "target": 2, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 3 }, { "value": 0.6, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 8 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 13 }] } }], "name": "right", "id": 1, "frameRate": 60, "action": 0 }] };
        Animations.HurtNumberUI = HurtNumberUI;
    })(Animations = ui.Animations || (ui.Animations = {}));
})(ui || (ui = {}));
(function (ui) {
    class BaseWindowUI extends Dialog {
        constructor() { super(); }
        createChildren() {
            View.regComponent("MyUI.TabItemRender", MyUI.TabItemRender);
            super.createChildren();
            this.createView(ui.BaseWindowUI.uiView);
        }
    }
    BaseWindowUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 1280, "popupCenter": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 20, "x": 55, "width": 1170, "skin": "ui/common/vew_bg_diban.png", "height": 678, "sizeGrid": "4,4,4,4" } }, { "type": "Image", "props": { "y": 20, "x": 55, "width": 1170, "skin": "ui/common/vew_bg_title.png", "height": 58 } }, { "type": "Image", "props": { "y": 85, "x": 56, "width": 160, "skin": "ui/common/vew_bg_biaoqian.png", "height": 612 } }, { "type": "Button", "props": { "y": 35, "x": 1177, "var": "_btnClose", "stateNum": 1, "skin": "ui/common/btn_close.png", "name": "close" } }, { "type": "Label", "props": { "y": 34, "x": 515, "width": 250, "var": "_txtTitle", "height": 30, "fontSize": 30, "color": "#d6dfe8", "align": "center" } }, { "type": "List", "props": { "y": 85, "x": 56, "width": 160, "var": "_lstTab", "spaceY": 2, "height": 610 }, "child": [{ "type": "TabItemRender", "props": { "runtime": "MyUI.TabItemRender", "renderType": "render" } }] }] };
    ui.BaseWindowUI = BaseWindowUI;
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class ActivityItemRenderUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Components.ActivityItemRenderUI.uiView); }
            createUI(uiData) {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        ActivityItemRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 0, "renderType": "render", "height": 0 }, "child": [{ "type": "Image", "props": { "width": 302, "skin": "ui/common/activity_renderbg.png", "height": 139 } }, { "type": "Label", "props": { "y": 10, "x": 10, "var": "_activityName", "fontSize": 18, "color": "#9AAAC4" } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 10, "width": 200, "var": "_text1", "innerHTML": "htmlText", "height": 20 } }, { "type": "HTMLDivElement", "props": { "y": 58, "x": 10, "width": 200, "var": "_text2", "innerHTML": "htmlText", "height": 20 } }, { "type": "List", "props": { "y": 87, "x": 10, "var": "_giftsListBox" } }, { "type": "Button", "props": { "y": 92, "x": 193, "width": 96, "var": "_enterBtn", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "labelSize": 16, "labelColors": "#DAE8F5", "height": 32, "sizeGrid": "8,10,8,10", "labelBold": "false" } }, { "type": "Image", "props": { "y": 0, "x": 253, "width": 47, "var": "_fuBenTypeSpr", "skin": "ui/common/activity_bangpai_zi.png", "height": 35 } }, { "type": "Label", "props": { "y": 3, "x": 254, "width": 45, "var": "_fuBenType2Name", "text": "必做", "fontSize": 16, "color": "#ffffff", "align": "center" } }] };
        Components.ActivityItemRenderUI = ActivityItemRenderUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class GoodsIconUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Components.GoodsIconUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        GoodsIconUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 81, "height": 81 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 1, "skin": "ui/common/icon_bg_grid.png" } }, { "type": "Image", "props": { "y": 8, "x": 8, "width": 64, "var": "_imgIcon", "height": 64 } }, { "type": "Image", "props": { "y": 1, "x": 1, "width": 81, "var": "_imgQuality", "skin": "ui/common/icon_quality_lan.png", "height": 81 } }, { "type": "Image", "props": { "y": 2, "x": 2, "var": "_imgTime", "skin": "ui/common/icon_state_time.png" } }, { "type": "Image", "props": { "y": 56, "x": 2, "var": "_imgBinding", "skin": "ui/common/icon_state_binding.png" } }, { "type": "Image", "props": { "y": 60, "x": 59, "var": "_imgComparison", "skin": "ui/common/icon_state_up.png" } }, { "type": "Label", "props": { "y": 4, "x": 6, "width": 70, "var": "_txtContent", "overflow": "hidden", "height": 14, "fontSize": 14, "color": "#dae8f5", "align": "right" } }, { "type": "Label", "props": { "y": 60, "x": 6, "width": 70, "var": "_txtCount", "overflow": "hidden", "height": 16, "fontSize": 16, "color": "#dae8f5", "align": "right" } }, { "type": "Image", "props": { "width": 81, "var": "_imgState", "height": 81 } }] };
        Components.GoodsIconUI = GoodsIconUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class HudTextUI extends EffectAnimation {
            constructor() { super(); this.effectData = ui.Components.HudTextUI.uiView; }
        }
        HudTextUI.uiView = { "type": "View", "props": {}, "compId": 1, "child": [{ "type": "Image", "props": { "y": -4, "x": 0, "skin": "ui/common/money_lingjing.png", "scaleY": 1.4, "scaleX": 1.4, "blendMode": "", "alpha": 1 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 23, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }, { "value": -2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 2 }, { "value": -4, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 4 }, { "value": 19, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 10 }], "x": [{ "value": 23, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 10 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 2 }, { "value": 1.4, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 4 }, { "value": 3, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 7 }, { "value": 5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 2 }, { "value": 1.4, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 4 }, { "value": 3, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 7 }, { "value": 5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 10 }], "blendMode": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "blendMode", "index": 0 }], "anchorY": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorY", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorY", "index": 10 }], "anchorX": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorX", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorX", "index": 10 }], "alpha": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "alpha", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "alpha", "index": 10 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "alpha", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "alpha", "index": 30 }] } }, { "target": 1, "keyframes": { "sceneColor": [{ "value": "#000000", "tweenMethod": "linearNone", "tween": false, "target": 1, "key": "sceneColor", "index": 0 }, { "value": "#d93634", "tweenMethod": "linearNone", "tween": false, "target": 1, "key": "sceneColor", "index": 20 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
        Components.HudTextUI = HudTextUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class HuoBiItemUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Components.HuoBiItemUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        HuoBiItemUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 196, "renderType": "render", "height": 30 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 196, "skin": "ui/common/money_bg.png", "height": 30, "sizeGrid": "10,10,10,10" } }, { "type": "Image", "props": { "y": -8, "x": -17, "width": 46, "var": "_imageHuoBi", "skin": "ui/common/money_diamond.png", "height": 47 } }, { "type": "Label", "props": { "y": 4, "x": 3, "width": 180, "var": "_textHuoBiNums", "text": "label", "height": 22, "fontSize": 22, "color": "#A7B9CE", "align": "center" } }, { "type": "Button", "props": { "y": -2, "x": 166, "width": 32, "var": "_btnJump", "stateNum": 2, "skin": "ui/common/btn_jiahao.png", "height": 32 } }] };
        Components.HuoBiItemUI = HuoBiItemUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class MapPointUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Components.MapPointUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MapPointUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 10, "height": 10 }, "child": [{ "type": "Label", "props": { "y": -15, "x": 0, "var": "_txtName", "text": "label", "fontSize": 16, "color": "#dae8f5", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "_imgPoint", "skin": "ui/common/map_point_monster.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
        Components.MapPointUI = MapPointUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class RoleCreatorItemUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.RoleCreatorItem", MyUI.RoleCreatorItem);
                super.createChildren();
                this.createView(ui.Components.RoleCreatorItemUI.uiView);
            }
        }
        RoleCreatorItemUI.uiView = { "type": "View", "props": { "width": 376, "runtime": "MyUI.RoleCreatorItem", "height": 73 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "var": "_btnRole", "toggle": true, "stateNum": 2, "skin": "ui/login/btn_avatar.png", "mouseEnabled": false, "labelSize": 24, "labelPadding": "0,0,0,130", "labelColors": "#797879,#ffffff,#ffffff,#797879", "labelBold": true, "labelAlign": "left", "label": "职业名称" }, "child": [{ "type": "Button", "props": { "y": 9, "x": 43, "width": 54, "var": "_btnAvatar", "toggle": true, "stateNum": 2, "mouseEnabled": false, "height": 54 } }] }] };
        Components.RoleCreatorItemUI = RoleCreatorItemUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class RoleSelectorItemUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.Components.RoleSelectorItemUI.uiView);
            }
        }
        RoleSelectorItemUI.uiView = { "type": "View", "props": { "width": 376, "height": 73 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "var": "_btnRole", "toggle": true, "stateNum": 2, "skin": "ui/login/btn_avatar.png", "mouseEnabled": false, "labelSize": 22, "labelPadding": "12,0,0,130", "labelColors": "#797879,#ffffff,#ffffff,#797879", "labelBold": true, "labelAlign": "left", "label": "label" } }, { "type": "Button", "props": { "y": 22, "x": 310, "var": "_btnDelete", "stateNum": 2, "skin": "ui/login/btn_shanchu.png" } }, { "type": "Label", "props": { "y": 14, "x": 131, "var": "_txtLevel", "text": "label", "fontSize": 18, "color": "#ffd460", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 24, "x": 130, "var": "_txtStatCreate", "text": "? 创建角色", "fontSize": 24, "color": "#989393", "bold": true } }, { "type": "Button", "props": { "y": 9, "x": 43, "width": 54, "var": "_btnAvatar", "toggle": true, "stateNum": 2, "mouseEnabled": false, "height": 54 } }] };
        Components.RoleSelectorItemUI = RoleSelectorItemUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var Components;
    (function (Components) {
        class TabItemRenderUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Components.TabItemRenderUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        TabItemRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 160, "height": 86 }, "child": [{ "type": "Button", "props": { "var": "_btnTab", "top": 0, "skin": "ui/common/btn_biaoqian.png", "right": 0, "mouseEnabled": false, "left": 0, "label": "label", "bottom": 0, "stateNum": 2, "labelColors": "#737991,#d4dee9,#737991,#737991", "labelSize": 24, "toggle": "true", "width": 160, "height": 86 } }, { "type": "Box", "props": { "top": 6, "right": 14 }, "child": [{ "type": "Animation", "props": { "y": 8, "x": 8, "width": 0, "var": "_aniRedMark", "source": "Components/AniRedMark.ani", "height": 0 } }] }] };
        Components.TabItemRenderUI = TabItemRenderUI;
    })(Components = ui.Components || (ui.Components = {}));
})(ui || (ui = {}));
(function (ui) {
    var FristRecharge;
    (function (FristRecharge) {
        class FristRechargePartUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.FristRecharge.FristRechargePartUI.uiView);
            }
        }
        FristRechargePartUI.uiView = { "type": "Dialog", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 44, "x": 79, "skin": "ui/background/frist_chongzhi_bg.png" } }, { "type": "Image", "props": { "y": 536, "x": 245, "width": 274, "skin": "ui/background/frist_chongzhi_zhandouli.png", "height": 48 } }, { "type": "Button", "props": { "y": 148, "x": 1027, "width": 77, "stateNum": 2, "skin": "ui/common/btn_frist_chongzhi.png", "height": 82 } }, { "type": "Button", "props": { "y": 542, "x": 692, "width": 181, "stateNum": 2, "skin": "ui/common/btn_frist_chongzhi_lingqu.png", "height": 60 } }] };
        FristRecharge.FristRechargePartUI = FristRechargePartUI;
    })(FristRecharge = ui.FristRecharge || (ui.FristRecharge = {}));
})(ui || (ui = {}));
(function (ui) {
    var FunOpenTiShi;
    (function (FunOpenTiShi) {
        class FunOpenTiShiPartUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                super.createChildren();
                this.createView(ui.FunOpenTiShi.FunOpenTiShiPartUI.uiView);
            }
        }
        FunOpenTiShiPartUI.uiView = { "type": "Dialog", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 196, "x": 280, "width": 722, "skin": "ui/background/funopen_ditu.png", "sizeGrid": "0,10,0,382", "height": 323 } }, { "type": "Image", "props": { "y": 286, "x": 254, "width": 459, "skin": "ui/common/funopentishi_xian.png", "sizeGrid": "0,10,0,382", "height": 2 } }, { "type": "Image", "props": { "y": 217, "x": 359, "width": 250, "var": "_textImage", "height": 62 } }, { "type": "Label", "props": { "y": 297, "x": 303, "wordWrap": true, "width": 380, "var": "_textDesc", "height": 50, "fontSize": 20, "color": "#9dd0fd" } }, { "type": "Label", "props": { "y": 470, "x": 374, "width": 230, "var": "_textFinish", "fontSize": 20, "color": "#aab7cc", "align": "center" } }, { "type": "GoodsIcon", "props": { "y": 363, "x": 444, "var": "_getGoodIcon", "runtime": "MyUI.GoodsIcon" } }, { "type": "Button", "props": { "y": 460, "x": 426, "width": 120, "var": "_getRewardBtn", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "labelSize": 20, "height": 40, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelBold": "false" } }, { "type": "Image", "props": { "y": 199, "x": 689, "width": 316, "var": "_showImage", "height": 323 } }, { "type": "Button", "props": { "y": 203, "x": 980, "width": 20, "var": "_btnClose", "stateNum": 1, "skin": "ui/common/btn_close.png", "height": 20 } }] };
        FunOpenTiShi.FunOpenTiShiPartUI = FunOpenTiShiPartUI;
    })(FunOpenTiShi = ui.FunOpenTiShi || (ui.FunOpenTiShi = {}));
})(ui || (ui = {}));
(function (ui) {
    class LoadingViewUI extends View {
        constructor() { super(); }
        createChildren() {
            super.createChildren();
            this.createView(ui.LoadingViewUI.uiView);
        }
    }
    LoadingViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "imgBg", "top": 0, "skin": "ui/background/img_loading_bg.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "ProgressBar", "props": { "width": 960, "var": "compProgress", "value": 0, "skin": "ui/loading/progress_loading.png", "sizeGrid": "4,8,4,8", "height": 16, "centerX": 0, "bottom": 70 }, "child": [{ "type": "Label", "props": { "y": 26, "x": 0, "text": "游戏载入中", "fontSize": 28, "color": "#fdffff", "bold": true } }, { "type": "Label", "props": { "y": 30, "x": 138, "text": "（此过程不消耗流量）", "fontSize": 24, "color": "#99a2b1", "bold": true } }, { "type": "Label", "props": { "y": 24, "x": 860, "width": 100, "var": "txtProgress", "text": "0%", "height": 32, "fontSize": 28, "color": "#fdffff", "bold": true, "align": "right" } }] }] };
    ui.LoadingViewUI = LoadingViewUI;
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        class LoginViewUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.login.LoginViewUI.uiView);
            }
        }
        LoginViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "imgBg", "top": 0, "skin": "ui/background/img_denglu_bg.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Box", "props": { "width": 1042, "renderType": "render", "height": 540, "centerY": 1, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 264, "x": 310, "width": 478, "skin": "ui/login/input_256x52.png", "name": "账号", "height": 52 }, "child": [{ "type": "TextInput", "props": { "y": -4, "x": 105, "width": 431, "var": "textAccount", "type": "text", "multiline": false, "mouseEnabled": true, "maxChars": 32, "height": 60, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 10, "x": 34, "width": 93, "text": "账号:", "mouseEnabled": false, "height": 37, "fontSize": 26, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }] }, { "type": "Image", "props": { "y": 328, "x": 310, "width": 478, "skin": "ui/login/input_256x52.png", "name": "密码", "height": 52 }, "child": [{ "type": "TextInput", "props": { "y": -4, "x": 104, "width": 429, "var": "textPassward", "type": "password", "multiline": false, "mouseEnabled": true, "height": 60, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 10, "x": 34, "width": 93, "text": "密码:", "height": 37, "fontSize": 26, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }] }, { "type": "Button", "props": { "y": 459, "x": 0, "width": 310, "var": "btnRegister", "stateNum": 2, "skin": "ui/login/btn_anniu_lan.png", "labelStrokeColor": "#7d7d7d", "labelStroke": 0, "labelSize": 26, "labelPadding": "0", "labelFont": "Microsoft YaHei", "labelColors": "#ffffff,#ffffff,#ffffff,#7d7d7d", "labelBold": true, "label": "注册账号", "height": 72, "disabled": true } }, { "type": "Button", "props": { "y": 459, "x": 366, "width": 310, "var": "btnSpeedy", "stateNum": 2, "skin": "ui/login/btn_anniu_lan.png", "labelStrokeColor": "#000000", "labelStroke": 0, "labelSize": 26, "labelPadding": "0", "labelFont": "Microsoft YaHei", "labelColors": "#ffffff,#ffffff,#ffffff", "labelBold": true, "label": "快速登录", "height": 72 } }, { "type": "Button", "props": { "y": 459, "x": 731, "width": 310, "var": "btnLogin", "stateNum": 2, "skin": "ui/login/btn_anniu_lan.png", "labelStrokeColor": "#000000", "labelStroke": 0, "labelSize": 26, "labelPadding": "0", "labelFont": "Microsoft YaHei", "labelColors": "#ffffff,#ffffff,#ffffff", "labelBold": true, "label": "登录游戏", "height": 72 } }, { "type": "Image", "props": { "y": 0, "x": 291, "skin": "ui/background/logo.png", "name": "龙图标" } }] }, { "type": "Label", "props": { "text": "抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防受骗上当  适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活", "fontSize": 16, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bottom": 13, "bold": true, "align": "center" } }] };
        login.LoginViewUI = LoginViewUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        class RoleCreatorUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.RoleCreatorItem", MyUI.RoleCreatorItem);
                super.createChildren();
                this.createView(ui.login.RoleCreatorUI.uiView);
            }
        }
        RoleCreatorUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Button", "props": { "width": 187, "var": "_btnReturn", "top": 10, "stateNum": 1, "skin": "ui/login/btn_fanhui.png", "left": 16, "labelSize": 28, "labelFont": "Microsoft YaHei", "labelColors": "#e2e8ee,#e2e8ee,#e2e8ee,#e2e8ee", "labelBold": true, "labelAlign": "right", "label": "选择角色", "height": 43, "sizeGrid": "0,0,0,56" } }, { "type": "TextInput", "props": { "width": 310, "var": "_inputName", "type": "text", "skin": "ui/login/input_300x50.png", "promptColor": "#3e3e3e", "prompt": "输入角色名称", "padding": "0,60,0,10", "overflow": "hidden", "height": 56, "fontSize": 24, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bottom": 46, "bold": true, "align": "left", "sizeGrid": "14,16,14,16" }, "child": [{ "type": "Button", "props": { "y": 8, "x": 257, "var": "_btnRandom", "stateNum": 1, "skin": "ui/login/btn_dice.png" } }] }, { "type": "Box", "props": { "right": 66, "bottom": 40 }, "child": [{ "type": "Button", "props": { "y": 230, "x": 6, "var": "_btnCreate", "stateNum": 2, "skin": "ui/login/btn_anniu_lv.png", "labelSize": 30, "labelColors": "#ffffff,#ffffff,#ffffff,#ffffff", "labelBold": true, "label": "创建角色" } }, { "type": "Image", "props": { "y": -276, "x": 47, "width": 228, "var": "_imgBadge", "height": 262 } }, { "type": "Label", "props": { "y": 0, "x": 0, "width": 109, "var": "_txtOccuName", "text": "龙胆", "height": 45, "fontSize": 30, "font": "Microsoft YaHei", "color": "#987139", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 49, "wordWrap": true, "width": 321, "var": "_txtOccuInfo", "text": "夸父族的勇士，拥有无与伦比的强大力量.无人可在力量愤怒的释放下逃生，他们手中的拒付手中的拒付手中的拒付", "leading": 4, "height": 130, "fontSize": 20, "font": "Microsoft YaHei", "color": "#a0a8ac", "bold": true, "align": "left" } }] }, { "type": "VBox", "props": { "var": "_boxOccu", "top": 120, "space": 40, "left": 0 }, "child": [{ "type": "RoleCreatorItem", "props": { "var": "comLongDan", "runtime": "MyUI.RoleCreatorItem" } }, { "type": "RoleCreatorItem", "props": { "var": "comHuaLing", "runtime": "MyUI.RoleCreatorItem" } }, { "type": "RoleCreatorItem", "props": { "var": "comQiaoGong", "runtime": "MyUI.RoleCreatorItem" } }] }] };
        login.RoleCreatorUI = RoleCreatorUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var login;
    (function (login) {
        class RoleSelectorUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.RoleSelectorItem", MyUI.RoleSelectorItem);
                super.createChildren();
                this.createView(ui.login.RoleSelectorUI.uiView);
            }
        }
        RoleSelectorUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Button", "props": { "width": 184, "var": "_btnReturn", "top": 10, "stateNum": 1, "skin": "ui/login/btn_fanhui.png", "left": 16, "labelSize": 28, "labelColors": "#e2e8ee,#e2e8ee,#e2e8ee,#e2e8ee", "labelBold": true, "labelAlign": "right", "label": "返回登录", "height": 43, "sizeGrid": "0,0,0,56" } }, { "type": "Box", "props": { "right": 66, "bottom": 40 }, "child": [{ "type": "Button", "props": { "y": 230, "x": 6, "var": "_btnEnter", "stateNum": 2, "skin": "ui/login/btn_anniu_lv.png", "labelSize": 30, "labelColors": "#ffffff,#ffffff,#ffffff,#ffffff", "labelBold": true, "label": "进入游戏" } }, { "type": "Label", "props": { "var": "_txtOccuName", "text": "龙胆", "fontSize": 30, "color": "#987139", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 49, "wordWrap": true, "width": 321, "var": "_txtOccuInfo", "text": "夸父族的勇士，拥有无与伦比的强大力量.无人可在力量愤怒的释放下逃生，他们手中的拒付手中的拒付手中的拒付", "leading": 4, "height": 130, "fontSize": 20, "color": "#a0a8ac", "bold": true, "align": "left" } }, { "type": "Label", "props": { "y": 257, "x": 17, "width": 288, "var": "_txtDelRemainingSec", "text": "删除中...", "height": 18, "fontSize": 20, "color": "#ec0000", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": -276, "x": 47, "width": 228, "var": "_imgBadge", "height": 262 } }] }, { "type": "VBox", "props": { "var": "_boxOccu", "top": 120, "space": 40, "left": 0 }, "child": [{ "type": "RoleSelectorItem", "props": { "var": "_itmRole0", "runtime": "MyUI.RoleSelectorItem" } }, { "type": "RoleSelectorItem", "props": { "var": "_itmRole1", "runtime": "MyUI.RoleSelectorItem" } }, { "type": "RoleSelectorItem", "props": { "y": 113, "x": 0, "var": "_itmRole2", "runtime": "MyUI.RoleSelectorItem" } }, { "type": "RoleSelectorItem", "props": { "y": 113, "x": 0, "var": "_itmRole3", "runtime": "MyUI.RoleSelectorItem" } }] }] };
        login.RoleSelectorUI = RoleSelectorUI;
    })(login = ui.login || (ui.login = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class MainFunOpenTiShiUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.MainFunOpenTiShiUI.uiView); }
            createUI(uiData) {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MainFunOpenTiShiUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 294, "renderType": "render", "height": 58 }, "child": [{ "type": "Image", "props": { "width": 294, "skin": "ui/common/funopentishi_tishidi.png", "sizeGrid": "5,5,5,5", "height": 58 } }, { "type": "HTMLDivElement", "props": { "y": 10, "x": 35, "width": 200, "var": "_tishiName", "height": 39 } }, { "type": "Image", "props": { "y": 8, "x": 243, "width": 42, "var": "_tiShiImage", "height": 42 } }] };
        MainUI.MainFunOpenTiShiUI = MainFunOpenTiShiUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class MainSkillIconUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.MainSkillIconUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MainSkillIconUI.uiView = { "type": "Box", "props": { "y": 42, "x": 42, "width": 84, "height": 84, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 42, "x": 42, "width": 78, "var": "_imgIcon", "height": 78, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 42, "x": 42, "var": "_imgBg", "skin": "ui/main/img_bg_skill.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 18, "x": 21, "var": "_imgLock", "skin": "ui/common/skill_suo_liang.png" } }, { "type": "Label", "props": { "y": 42, "x": 41, "width": 60, "var": "_txtCooldown", "strokeColor": "#000000", "stroke": 1, "height": 30, "fontSize": 30, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] };
        MainUI.MainSkillIconUI = MainSkillIconUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class MainViewUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.RadarMap", MyUI.RadarMap);
                View.regComponent("MyUI.MainFunOpenTiShi", MyUI.MainFunOpenTiShi);
                View.regComponent("MyUI.MainSkillIcon", MyUI.MainSkillIcon);
                View.regComponent("LogicTask.TaskBoxMini", LogicTask.TaskBoxMini);
                View.regComponent("MyUI.RoleHeadPart", MyUI.RoleHeadPart);
                View.regComponent("MyUI.MonsterHeadPart", MyUI.MonsterHeadPart);
                View.regComponent("MyUI.ObjectRoleFacePart", MyUI.ObjectRoleFacePart);
                super.createChildren();
                this.createView(ui.MainUI.MainViewUI.uiView);
            }
        }
        MainViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Box", "props": { "y": 17, "x": 1118, "top": 17, "right": 12, "name": "GroupTop" }, "child": [{ "type": "RadarMap", "props": { "y": -10, "x": -14, "var": "_radarMap", "runtime": "MyUI.RadarMap" } }, { "type": "Button", "props": { "y": 32, "x": -34, "stateNum": 1, "skin": "ui/main/btn_func_setting.png" } }, { "type": "Button", "props": { "y": 89, "x": -31, "stateNum": 1, "skin": "ui/main/btn_func_email.png" } }, { "type": "Button", "props": { "y": 133, "x": 6, "toggle": true, "stateNum": 2, "skin": "ui/main/btn_func_pingbi.png" } }, { "type": "HBox", "props": { "y": -12, "x": -112, "var": "_topGroup1", "space": -142 }, "child": [{ "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_fuli.png", "name": "btnFunc_12" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_mall.png", "name": "btnFunc_15" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_trade.png" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_lottery.png" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_dailycharge.png" } }] }, { "type": "HBox", "props": { "y": 70, "x": -112, "var": "_topGroup2", "space": -142 }, "child": [{ "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_adventure.png", "name": "btnFunc_8" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_battle.png" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_bianqiang.png" } }, { "type": "Button", "props": { "stateNum": 1, "skin": "ui/main/btn_func_jieri.png" } }] }, { "type": "MainFunOpenTiShi", "props": { "y": 212, "x": -118, "var": "_funOpenTiShiBox", "runtime": "MyUI.MainFunOpenTiShi" } }] }, { "type": "Box", "props": { "y": 314, "width": 60, "right": 5, "name": "GroupFunction", "height": 227 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "var": "_btnSwitch", "toggle": true, "stateNum": 1, "skin": "ui/main/btn_func_qiehuan.png" } }, { "type": "Button", "props": { "y": -10, "x": -82, "stateNum": 1, "skin": "ui/main/btn_func_parcel.png", "name": "btnFunc_1000" } }, { "type": "Box", "props": { "y": 73, "x": -10, "var": "_rightGroup1" }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "stateNum": 1, "skin": "ui/main/btn_func_role.png", "name": "btnFunc_1" } }, { "type": "Button", "props": { "y": 0, "x": -72, "stateNum": 1, "skin": "ui/main/btn_func_qichong.png", "name": "btnFunc_13" } }, { "type": "Button", "props": { "y": 0, "x": -144, "stateNum": 1, "skin": "ui/main/btn_func_zuntianlu.png", "name": "btnFunc_5" } }, { "type": "Button", "props": { "y": 84, "x": 0, "stateNum": 1, "skin": "ui/main/btn_func_fengyunzhi.png" } }] }] }, { "type": "Box", "props": { "name": "GroupChat", "centerX": 0, "bottom": 7 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 450, "skin": "ui/main/img_bg_chat.png", "height": 121 } }, { "type": "Button", "props": { "y": 0, "x": -76, "toggle": true, "stateNum": 2, "skin": "ui/main/btn_guaji.png" } }, { "type": "Button", "props": { "y": 60, "x": -76, "stateNum": 1, "skin": "ui/main/btn_audio.png" } }, { "type": "Button", "props": { "y": 1, "x": 412, "stateNum": 1, "skin": "ui/main/btn_chat.png" } }] }, { "type": "Box", "props": { "y": 0, "right": 0, "name": "GroupExp", "left": 0, "bottom": 0 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "stateNum": 1, "skin": "ui/main/btn_horse.png" } }, { "type": "Image", "props": { "y": 48, "x": 0, "width": 312, "skin": "ui/main/img_bg_battery.png", "height": 26, "sizeGrid": "0,20,0,6" } }, { "type": "Image", "props": { "y": 51, "x": 11, "var": "_imgNet", "skin": "ui/main/img_net_wifi_3.png" } }, { "type": "ProgressBar", "props": { "y": 54, "x": 152, "var": "_progBarBattery", "skin": "ui/main/progress_battery.png", "sizeGrid": "6,8,6,8" } }, { "type": "ProgressBar", "props": { "y": 74, "var": "_progBarExp", "skin": "ui/main/progress_exp.png", "sizeGrid": "0,4,0,4", "right": 0, "left": 0, "height": 6 } }, { "type": "Label", "props": { "y": 70, "width": 188, "var": "_txtExp", "height": 10, "fontSize": 10, "color": "#ffffff", "centerX": 0, "align": "center" } }] }, { "type": "Box", "props": { "width": 300, "var": "_bottomRightGroup", "right": 24, "height": 276, "bottom": 24 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 300, "var": "_groupSkill", "height": 276 }, "child": [{ "type": "Button", "props": { "y": 214, "x": 251, "var": "_btnPage", "stateNum": 1, "skin": "ui/main/btn_skill_qiehuan.png", "labelSize": 16, "labelPadding": "5,6,0,0", "labelAlign": "right", "label": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "Image", "props": { "y": 101, "x": 103, "skin": "ui/main/img_skill_huadong.png" } }, { "type": "MainSkillIcon", "props": { "y": 223, "x": 42, "var": "_skillIcon0", "runtime": "MyUI.MainSkillIcon" } }, { "type": "MainSkillIcon", "props": { "y": 189, "x": 191, "var": "_skillIcon1", "scaleY": 1.5, "scaleX": 1.5, "runtime": "MyUI.MainSkillIcon" } }, { "type": "MainSkillIcon", "props": { "y": 119, "x": 55, "var": "_skillIcon2", "runtime": "MyUI.MainSkillIcon" } }, { "type": "MainSkillIcon", "props": { "y": 45, "x": 127, "var": "_skillIcon3", "runtime": "MyUI.MainSkillIcon" } }, { "type": "MainSkillIcon", "props": { "y": 42, "x": 232, "var": "_skillIcon4", "runtime": "MyUI.MainSkillIcon" } }] }, { "type": "Button", "props": { "y": 131, "x": 133, "var": "_btnNpcTalk", "stateNum": 1, "skin": "ui/main/btn_npc_talk.png" } }] }, { "type": "Box", "props": { "width": 596, "var": "_meditationHint", "height": 85, "centerX": 0, "bottom": 180 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 6.000000375128451, "width": 583, "skin": "ui/main/img_xiulian_bak.png", "height": 85 } }, { "type": "Image", "props": { "y": 44, "x": 504.0000003751285, "skin": "ui/main/img_xiulian_huawen.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 44, "x": 91.00000037512845, "skin": "ui/main/img_xiulian_huawen.png", "rotation": 180, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 21, "x": 206.00000037512845, "skin": "ui/main/img_xiulian_text.png" } }] }, { "type": "TaskBoxMini", "props": { "y": 212, "x": 0, "var": "_miniTask", "runtime": "LogicTask.TaskBoxMini" } }, { "type": "RoleHeadInfo", "props": { "y": 5, "x": 5, "var": "_headLeader", "runtime": "MyUI.RoleHeadPart" } }, { "type": "MonsterHeadPart", "props": { "y": 34, "x": 340, "var": "_headMonster", "runtime": "MyUI.MonsterHeadPart" } }, { "type": "ObjectRoleFacePart", "props": { "y": 32, "x": 362, "var": "_headNetPlayer", "runtime": "MyUI.ObjectRoleFacePart" } }] };
        MainUI.MainViewUI = MainViewUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class MeditationUIUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.MeditationUIUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MeditationUIUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 286, "height": 308 }, "child": [{ "type": "Image", "props": { "y": 112, "x": 35, "width": 220, "skin": "ui/main/img_xiulian_prog_bak.png", "height": 177 } }, { "type": "Box", "props": { "y": 132, "x": 86 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 116, "skin": "ui/common/img_circle_mask.png", "renderType": "mask", "height": 116 } }, { "type": "Image", "props": { "y": 116, "x": 0, "width": 118, "var": "_imgWater", "skin": "ui/main/img_xiulian_water.png", "height": 0, "anchorY": 1 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 116, "skin": "ui/main/img_xiulian_water_bak.png", "height": 116 } }, { "type": "Image", "props": { "y": 116, "x": 0, "width": 118, "var": "_imgWaterLevel", "skin": "ui/main/img_xiulian_water_level.png", "height": 60, "anchorY": 0.3 } }] }, { "type": "Image", "props": { "y": 131, "x": 85, "width": 117, "var": "_evtRegion", "skin": "ui/main/img_xiulian_touming.png", "height": 117 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 286, "skin": "ui/main/img_xiulian_info_bak.png", "height": 114 } }, { "type": "Label", "props": { "y": 14, "x": 22, "width": 92, "var": "_txtTimeTitle", "text": "label", "height": 18, "fontSize": 18, "color": "#97a4b8" } }, { "type": "Label", "props": { "y": 44, "x": 22, "width": 92, "var": "_txtExpTitle", "text": "label", "height": 18, "fontSize": 18, "color": "#97a4b8" } }, { "type": "Label", "props": { "y": 75, "x": 23, "width": 92, "var": "_txtXingHunTitle", "text": "label", "height": 18, "fontSize": 18, "color": "#5ebfcd" } }, { "type": "Label", "props": { "y": 14, "x": 122, "width": 86, "var": "_txtTime", "text": "label", "height": 18, "fontSize": 18, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 44, "x": 122, "width": 86, "var": "_txtExp", "text": "label", "height": 18, "fontSize": 18, "color": "#9dd0fb" } }, { "type": "Label", "props": { "y": 75, "x": 122, "width": 86, "var": "_txtXingHun", "text": "label", "height": 18, "fontSize": 18, "color": "#5ebfcd" } }, { "type": "Label", "props": { "y": 178, "x": 111, "width": 65, "var": "_txtPercent", "text": "label", "height": 22, "fontSize": 22, "color": "#ffffff", "align": "center" } }] };
        MainUI.MeditationUIUI = MeditationUIUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class MonsterHeadPartUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.MonsterHeadPartUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MonsterHeadPartUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 258, "height": 60 }, "child": [{ "type": "ProgressBar", "props": { "y": 31, "x": 51, "var": "_progBarLife", "skin": "ui/main/progress_monster.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "_imgHead", "skin": "ui/main/img_head_monster.png" } }, { "type": "Label", "props": { "y": 9, "x": 67, "var": "_txtName", "text": "label", "fontSize": 16, "color": "#efefef" } }, { "type": "Label", "props": { "y": 46, "x": 4, "width": 50, "var": "_txtLevel", "text": "label", "height": 14, "fontSize": 14, "color": "#efefef", "align": "center" } }] };
        MainUI.MonsterHeadPartUI = MonsterHeadPartUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class NetWaitingViewUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.MainUI.NetWaitingViewUI.uiView);
            }
        }
        NetWaitingViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "top": 0, "right": 0, "left": 0, "height": 720, "bottom": 0 }, "child": [{ "type": "Box", "props": { "centerY": 0, "centerX": 39 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/netwaiting/netwaiting_frame.png" } }, { "type": "Image", "props": { "y": 78, "x": 78, "skin": "ui/netwaiting/netwaiting_bar.png", "rotation": 360, "name": "bar", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }] }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "rotation", "index": 0 }, { "value": 360, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "rotation", "index": 30 }] } }], "name": "ani1", "id": 1, "frameRate": 20, "action": 2 }] };
        MainUI.NetWaitingViewUI = NetWaitingViewUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class ObjectRoleFacePartUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.ObjectRoleFacePartUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        ObjectRoleFacePartUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 287, "height": 78 }, "child": [{ "type": "ProgressBar", "props": { "y": 27, "x": 61, "var": "_progBarLife", "skin": "ui/main/progress_netplayer_hp.png", "sizeGrid": "0,10,0,10" } }, { "type": "ProgressBar", "props": { "y": 46, "x": 61, "var": "_progBarMagic", "skin": "ui/main/progress_netplayer_mp.png", "sizeGrid": "0,10,0,10" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "_imgHead", "skin": "ui/occupation/occu_avatar_0.png" } }, { "type": "Label", "props": { "y": 14, "x": 176, "var": "_txtName", "text": "label", "fontSize": 16, "color": "#6bdaea", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 64, "x": 37, "var": "_txtLevel", "text": "label", "fontSize": 14, "color": "#fdf7dd", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 34, "x": 176, "var": "_txtLife", "text": "label", "fontSize": 12, "color": "#fdf7dd", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 53, "x": 176, "var": "_txtMagic", "text": "label", "fontSize": 12, "color": "#fdf7dd", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] };
        MainUI.ObjectRoleFacePartUI = ObjectRoleFacePartUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class RadarMapUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.RadarMapUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        RadarMapUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 180, "height": 158 }, "child": [{ "type": "Image", "props": { "y": 8, "x": 15, "var": "_imgBak", "skin": "ui/main/img_bg_map.png" } }, { "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 83, "x": 90, "width": 142, "skin": "ui/common/img_circle_mask.png", "renderType": "mask", "height": 142, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 90, "x": 89, "width": 512, "var": "_imgMap", "height": 512, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 256, "x": 256, "width": 22, "var": "_imgLeader", "skin": "ui/common/map_point_leader.png", "height": 30, "anchorY": 0.12, "anchorX": 0.46 } }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 180, "skin": "ui/main/img_bg_map_name.png", "height": 28 } }, { "type": "Label", "props": { "y": 14, "x": 89, "var": "_txtName", "text": "label", "fontSize": 18, "color": "#f9f9f9", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 37, "x": 89, "var": "_txtPosition", "text": "label", "fontSize": 16, "color": "#f9f9f9", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] };
        MainUI.RadarMapUI = RadarMapUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class RockerUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.MainUI.RockerUI.uiView);
            }
        }
        RockerUI.uiView = { "type": "View", "props": { "y": 4, "x": 42, "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 286, "x": 8, "var": "back", "skin": "ui/main/Joystick_back.png" } }, { "type": "Image", "props": { "y": 273, "x": 4, "var": "knob", "skin": "ui/main/Joystick.png" } }] };
        MainUI.RockerUI = RockerUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MainUI;
    (function (MainUI) {
        class RoleHeadInfoUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MainUI.RoleHeadInfoUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        RoleHeadInfoUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 320, "height": 89 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 0, "width": 320, "skin": "ui/main/img_bg_avatar.png", "height": 88 } }, { "type": "Image", "props": { "y": 12, "x": 11, "width": 68, "var": "_imgHead", "height": 68 } }, { "type": "Button", "props": { "y": 9, "x": 255, "var": "_imgVIPLevel", "stateNum": 1, "skin": "ui/main/btn_vip_0.png" } }, { "type": "ProgressBar", "props": { "y": 46, "x": 87, "width": 226, "var": "_progBarLife", "skin": "ui/main/progress_hp.png", "height": 16, "sizeGrid": "0,4,0,4" } }, { "type": "ProgressBar", "props": { "y": 64, "x": 87, "width": 226, "var": "_progBarMagic", "skin": "ui/main/progress_mp.png", "height": 16, "sizeGrid": "0,4,0,4" } }, { "type": "Label", "props": { "y": 2, "x": 2, "width": 78, "var": "_txtLevel", "height": 16, "fontSize": 16, "color": "#dee7f2" } }, { "type": "Label", "props": { "y": 15, "x": 89, "width": 30, "var": "_txtTitleCombat", "text": "战", "height": 22, "fontSize": 22, "color": "#dee7f2" } }, { "type": "Label", "props": { "y": 9, "x": 118, "var": "_txtCombat", "text": "0", "fontSize": 30, "color": "#c5fd32" } }, { "type": "Label", "props": { "y": 48, "x": 180, "width": 56, "var": "_txtLife", "text": "label", "height": 12, "fontSize": 12, "color": "#f7ddff" } }, { "type": "Label", "props": { "y": 66, "x": 180, "width": 56, "var": "_txtMagic", "text": "label", "fontSize": 12, "color": "#f7ddff" } }] };
        MainUI.RoleHeadInfoUI = RoleHeadInfoUI;
    })(MainUI = ui.MainUI || (ui.MainUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var Mall;
    (function (Mall) {
        var Components;
        (function (Components) {
            class MallBuyLimitGoodsRenderUI extends Laya.Box {
                constructor() { super(); this.createUI(ui.Mall.Components.MallBuyLimitGoodsRenderUI.uiView); }
                createUI(uiData) {
                    View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                    View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                    laya.utils.ClassUtils.createByJson(uiData, this, this);
                }
            }
            MallBuyLimitGoodsRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 365, "height": 170 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 365, "skin": "ui/common/window_tab_bak.png", "height": 168, "sizeGrid": "0,10,0,10" } }, { "type": "Image", "props": { "y": 102, "x": 2, "width": 360, "skin": "ui/common/item_bak.png", "sizeGrid": "5,5,5,5", "height": 65 } }, { "type": "HTMLDivElement", "props": { "y": 7, "x": 0, "width": 180, "var": "_textGoodsName", "height": 24 } }, { "type": "GoodsIcon", "props": { "y": 10, "x": 10, "var": "_goodsIcon", "runtime": "MyUI.GoodsIcon" } }, { "type": "Button", "props": { "y": 115, "x": 204, "width": 148, "var": "_btnBuy", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "labelSize": 22, "label": "对对对", "height": 40, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelBold": "false" } }, { "type": "Label", "props": { "y": 22, "x": 105, "width": 80, "var": "_textYuanJiaTitle", "text": "label", "fontSize": 20, "color": "#747D8E" } }, { "type": "Label", "props": { "y": 61, "x": 105, "width": 80, "var": "_textXianJiaTitle", "text": "label", "fontSize": 20, "color": "#BBDAF9" } }, { "type": "Label", "props": { "y": 23, "x": 221, "width": 80, "var": "_textYuanJiaNums", "text": "label", "fontSize": 20, "color": "#1BA0E1" } }, { "type": "Label", "props": { "y": 62, "x": 221, "width": 80, "var": "_textXianJiaNums", "text": "label", "fontSize": 20, "color": "#BBDAF9" } }, { "type": "Image", "props": { "y": 18, "x": 169, "width": 185, "skin": "ui/common/item_bak.png", "sizeGrid": "5,5,5,5", "height": 32 } }, { "type": "Image", "props": { "y": 58, "x": 169, "width": 185, "skin": "ui/common/item_bak.png", "sizeGrid": "5,5,5,5", "height": 32 } }, { "type": "Image", "props": { "y": 17, "x": 179, "width": 35, "skin": "ui/common/money_diamond.png", "height": 35 } }, { "type": "Image", "props": { "y": 57, "x": 179, "width": 35, "skin": "ui/common/money_diamond.png", "height": 35 } }, { "type": "Image", "props": { "y": 34, "x": 180, "width": 94, "skin": "ui/common/mall_qianggou_hengtiao.png", "height": 2 } }, { "type": "Label", "props": { "y": 113, "x": 15, "width": 50, "var": "_textShengYuTitle", "text": "label", "fontSize": 20, "color": "#AFC0D1" } }, { "type": "Label", "props": { "y": 113, "x": 70, "width": 50, "var": "_textShengYuNums", "text": "100", "fontSize": 20, "color": "#AFC0D1" } }, { "type": "Label", "props": { "y": 136, "x": 15, "width": 50, "var": "_textXianGouTitle", "text": "label", "fontSize": 20, "color": "#E2E298" } }, { "type": "Label", "props": { "y": 136, "x": 70, "width": 50, "var": "_textXianGouNums", "text": "100", "fontSize": 20, "color": "#E2E298" } }] };
            Components.MallBuyLimitGoodsRenderUI = MallBuyLimitGoodsRenderUI;
        })(Components = Mall.Components || (Mall.Components = {}));
    })(Mall = ui.Mall || (ui.Mall = {}));
})(ui || (ui = {}));
(function (ui) {
    var Mall;
    (function (Mall) {
        var Components;
        (function (Components) {
            class MallGoodsRenderUI extends Laya.Box {
                constructor() { super(); this.createUI(ui.Mall.Components.MallGoodsRenderUI.uiView); }
                createUI(uiData) {
                    View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                    View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                    laya.utils.ClassUtils.createByJson(uiData, this, this);
                }
            }
            MallGoodsRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 180, "height": 200 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 180, "skin": "ui/common/window_tab_bak.png", "height": 200, "sizeGrid": "0,10,0,10" } }, { "type": "HTMLDivElement", "props": { "y": 7, "x": 0, "width": 180, "var": "_textGoodsName", "height": 24 } }, { "type": "GoodsIcon", "props": { "y": 50, "x": 48, "var": "_goodsIcon", "runtime": "MyUI.GoodsIcon" } }, { "type": "Button", "props": { "y": 150, "x": 10, "width": 160, "var": "_btnBuy", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "labelSize": 24, "height": 40, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelBold": "false" } }, { "type": "Image", "props": { "y": 147, "x": 18, "width": 46, "var": "_imageMoneyType", "mouseThrough": true, "height": 47 } }, { "type": "Label", "props": { "y": 157, "x": 55, "width": 110, "var": "_textGoodsPrice", "text": "label", "mouseThrough": true, "height": 24, "fontSize": 24, "color": "#DAE8F5", "align": "center" } }] };
            Components.MallGoodsRenderUI = MallGoodsRenderUI;
        })(Components = Mall.Components || (Mall.Components = {}));
    })(Mall = ui.Mall || (ui.Mall = {}));
})(ui || (ui = {}));
(function (ui) {
    var Mall;
    (function (Mall) {
        class MallGoodsPartUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.Mall.MallGoodsPartUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        MallGoodsPartUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 756, "height": 415 }, "child": [{ "type": "List", "props": { "y": 0, "x": 0, "width": 756, "var": "_listgoods", "spaceY": 9, "spaceX": 9, "renderType": "render", "height": 415 } }] };
        Mall.MallGoodsPartUI = MallGoodsPartUI;
    })(Mall = ui.Mall || (ui.Mall = {}));
})(ui || (ui = {}));
(function (ui) {
    var Mall;
    (function (Mall) {
        class MallpartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.TabItemRender", MyUI.TabItemRender);
                View.regComponent("MyUI.HuoBiItem", MyUI.HuoBiItem);
                super.createChildren();
                this.createView(ui.Mall.MallpartUI.uiView);
            }
        }
        MallpartUI.uiView = { "type": "View", "props": { "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "HBox", "props": { "y": 94, "x": 227 }, "child": [{ "type": "TabItemRender", "props": { "width": 200, "var": "_tabBuyLimit", "runtime": "MyUI.TabItemRender", "height": 56 } }, { "type": "TabItemRender", "props": { "width": 200, "var": "_tabDiamond", "runtime": "MyUI.TabItemRender", "height": 56 } }, { "type": "TabItemRender", "props": { "width": 200, "var": "_tabBindingDiamond", "runtime": "MyUI.TabItemRender", "height": 56 } }, { "type": "TabItemRender", "props": { "width": 200, "var": "_tabSilver", "runtime": "MyUI.TabItemRender", "height": 56 } }] }, { "type": "Image", "props": { "y": 163, "x": 225, "width": 988, "skin": "ui/background/vip_youkuang.png", "sizeGrid": "5,5,5,5", "height": 540 } }, { "type": "Image", "props": { "y": 173, "x": 235, "width": 198, "skin": "ui/background/mall_haibao.png", "height": 525 } }, { "type": "Image", "props": { "y": 210, "x": 440, "width": 765, "skin": "ui/common/vip_dikuang.png", "sizeGrid": "5,5,5,5", "height": 415 } }, { "type": "Button", "props": { "y": 641, "x": 244, "width": 180, "var": "_btnViewDetails", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "label": "label", "height": 45, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Label", "props": { "y": 645, "x": 442, "width": 120, "var": "_labBuyTimeTitle", "text": "抢购倒计时", "fontSize": 20, "color": "#99A2B1", "align": "left" } }, { "type": "Label", "props": { "y": 645, "x": 558, "width": 200, "var": "_labBuyTimes", "fontSize": 20, "color": "#49BD1B", "align": "left" } }, { "type": "Box", "props": { "y": 218, "x": 449, "var": "_mallGoodsBox" } }, { "type": "Image", "props": { "y": 255, "x": 687, "width": 268, "var": "_imageNoHas", "skin": "ui/common/common_gantanhao.png", "height": 268 } }, { "type": "Label", "props": { "y": 469, "x": 621, "width": 400, "var": "_textNoHas", "text": "暂无抢购商品", "fontSize": 28, "color": "#82A7CC", "align": "center" } }, { "type": "Box", "props": { "y": 172, "x": 455 }, "child": [{ "type": "HuoBiItem", "props": { "var": "_itemHuoBiDiamond", "runtime": "MyUI.HuoBiItem" } }, { "type": "HuoBiItem", "props": { "y": 0, "x": 240, "var": "_itemHuoBiBindDiamond", "runtime": "MyUI.HuoBiItem" } }, { "type": "HuoBiItem", "props": { "x": 480, "var": "_itemHuoYinBi", "runtime": "MyUI.HuoBiItem" } }] }] };
        Mall.MallpartUI = MallpartUI;
    })(Mall = ui.Mall || (ui.Mall = {}));
})(ui || (ui = {}));
(function (ui) {
    var MapUI;
    (function (MapUI) {
        class MapWindowUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                View.regComponent("MyUI.MapUI.WorldMapPiece", MyUI.MapUI.WorldMapPiece);
                super.createChildren();
                this.createView(ui.MapUI.MapWindowUI.uiView);
            }
        }
        MapWindowUI.uiView = { "type": "Dialog", "props": {}, "child": [{ "type": "Image", "props": { "var": "_imgBak", "top": 0, "skin": "ui/background/map_bak.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Box", "props": { "width": 1280, "var": "_groupLocal", "height": 720, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 72, "x": 30, "width": 464, "skin": "ui/common/vew_bg_right.png", "height": 630, "sizeGrid": "8,8,8,8" } }, { "type": "Button", "props": { "y": 72, "x": 32, "width": 462, "var": "_chckNPC", "stateNum": 2, "skin": "ui/common/btn_map_chk_type.png", "label": "label", "height": 58, "labelColors": "#afc0d1,#afc0d1,#afc0d1,#afc0d1", "labelSize": 20, "toggle": "true" } }, { "type": "Button", "props": { "y": 134, "x": 32, "width": 462, "var": "_chckMonster", "stateNum": 2, "skin": "ui/common/btn_map_chk_type.png", "label": "label", "height": 58, "labelColors": "#afc0d1,#afc0d1,#afc0d1,#afc0d1", "labelSize": 20, "toggle": "true" } }, { "type": "Button", "props": { "y": 196, "x": 31, "width": 462, "var": "_chckTeleport", "stateNum": 2, "skin": "ui/common/btn_map_chk_type.png", "label": "label", "height": 58, "labelColors": "#afc0d1,#afc0d1,#afc0d1,#afc0d1", "labelSize": 20, "toggle": "true" } }, { "type": "Image", "props": { "y": 636, "x": 30, "width": 464, "skin": "ui/common/tip_bg_money.png", "height": 66 } }, { "type": "Label", "props": { "y": 669, "x": 262, "var": "_txtTransferTip", "text": "label", "fontSize": 18, "color": "#d8d9dc", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "List", "props": { "y": 259, "x": 31, "width": 462, "var": "_transferList", "height": 374 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 460, "renderType": "render", "height": 58 }, "child": [{ "type": "Image", "props": { "y": 21, "x": 57, "skin": "ui/common/map_trans_item_dot.png" } }, { "type": "Image", "props": { "y": 0, "x": 10, "skin": "ui/common/map_trans_item_selected.png", "name": "selectBox" } }, { "type": "Label", "props": { "y": 20, "x": 100, "text": "label", "name": "label", "fontSize": 18, "color": "#afc0d1", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 288, "x": 870, "width": 512, "var": "_imgLocal", "height": 512, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 256, "x": 256, "width": 30, "var": "_imgLeader", "skin": "ui/common/map_point_leader.png", "height": 40, "anchorY": 0.12, "anchorX": 0.46 } }] }, { "type": "Image", "props": { "y": 545, "x": 748, "skin": "ui/common/map_name_bak.png" } }, { "type": "Image", "props": { "y": 582, "x": 834, "width": 48, "var": "_imgLocalIcon", "height": 30, "anchorY": 1, "anchorX": 1 } }, { "type": "Label", "props": { "y": 568, "x": 870, "var": "_txtLocalName", "text": "label", "fontSize": 24, "color": "#d8d9dc", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 601, "x": 522, "width": 622, "skin": "ui/common/vew_bg_di.png", "height": 99 } }, { "type": "Label", "props": { "y": 640, "x": 537, "var": "_txtDropTip", "text": "label", "fontSize": 22, "color": "#99a2b1" } }, { "type": "Image", "props": { "y": 650, "x": 662, "skin": "ui/common/map_scroll_arrow.png", "rotation": 180, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 650, "x": 1115, "skin": "ui/common/map_scroll_arrow.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "List", "props": { "y": 609, "x": 686, "width": 405, "var": "_goodsList", "spaceX": 10, "height": 84 }, "child": [{ "type": "GoodsIcon", "props": { "runtime": "MyUI.GoodsIcon", "renderType": "render" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 1514, "var": "_groupWorld", "name": "groupWorld", "height": 1052 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1514, "skin": "ui/background/map_bak_diwen.png", "height": 1052 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1514, "skin": "ui/background/map_bak_guang.png", "height": 1052 } }, { "type": "WorldMapPiece", "props": { "y": 219, "x": 265, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_1.png", "name": "piece_1", "mapID": 1 } }, { "type": "WorldMapPiece", "props": { "y": 244, "x": 132, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_2.png", "name": "piece_2", "mapID": 2 } }, { "type": "WorldMapPiece", "props": { "y": 358, "x": 438, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_3.png", "name": "piece_3", "mapID": 3 } }, { "type": "WorldMapPiece", "props": { "y": 532, "x": 473, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_4.png", "name": "piece_4", "mapID": 4 } }, { "type": "WorldMapPiece", "props": { "y": 424, "x": 159, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_5.png", "name": "piece_5", "mapID": 5 } }, { "type": "WorldMapPiece", "props": { "y": 632, "x": 341, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_6.png", "name": "piece_6", "mapID": 6 } }, { "type": "WorldMapPiece", "props": { "y": 405, "x": 899, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_9.png", "name": "piece_9", "mapID": 9 } }, { "type": "WorldMapPiece", "props": { "y": 141, "x": 787, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_30.png", "name": "piece_30", "mapID": 30 } }, { "type": "WorldMapPiece", "props": { "y": 97, "x": 390, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_40.png", "name": "piece_40", "mapID": 40 } }, { "type": "WorldMapPiece", "props": { "y": 605, "x": 808, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceSkin": "ui/map/50_2.png", "name": "piece_50", "mapID": -1 } }, { "type": "WorldMapPiece", "props": { "y": 577, "x": 1000, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceSkin": "ui/map/60_2.png", "name": "piece_60", "mapID": -1 } }, { "type": "WorldMapPiece", "props": { "y": 465, "x": 1074, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceSkin": "ui/map/70_2.png", "name": "piece_70", "mapID": -1 } }, { "type": "WorldMapPiece", "props": { "y": 413, "x": 808, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_7.png", "name": "piece_7", "mapID": 7 } }, { "type": "WorldMapPiece", "props": { "y": 567, "x": 853, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_8.png", "name": "piece_8", "mapID": 8 } }, { "type": "WorldMapPiece", "props": { "y": 194, "x": 662, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_20.png", "name": "piece_20", "mapID": 20 } }, { "type": "WorldMapPiece", "props": { "y": 404, "x": 1101, "runtime": "MyUI.MapUI.WorldMapPiece", "pieceIcon": "ui/common/map_icon_10.png", "name": "piece_10", "mapID": 10 } }, { "type": "Box", "props": { "y": 241, "x": 156, "var": "_groupPlace", "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 8, "x": 9, "width": 42, "var": "_imgOccu", "height": 42 } }, { "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/map_location.png" } }] }] }, { "type": "Panel", "props": { "var": "_panelWorld", "top": 0, "right": 0, "name": "panelWorld", "left": 0, "bottom": 0 } }, { "type": "Button", "props": { "width": 190, "var": "_btnBack", "top": 10, "stateNum": 1, "skin": "ui/common/btn_fanhui.png", "left": 16, "labelSize": 28, "labelPadding": "0,0,0,33", "labelColors": "#d4dee9,#d4dee9,#d4dee9,#d4dee9", "label": "区域地图", "sizeGrid": "0,0,0,56" } }, { "type": "Button", "props": { "var": "_btnGoto", "stateNum": 1, "skin": "ui/common/btn_map_local.png", "right": 32, "bottom": 30 } }] };
        MapUI.MapWindowUI = MapWindowUI;
    })(MapUI = ui.MapUI || (ui.MapUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var MapUI;
    (function (MapUI) {
        class WorldMapPieceUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.MapUI.WorldMapPieceUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        WorldMapPieceUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 180, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "_imgPiece", "mouseEnabled": false } }, { "type": "Box", "props": { "y": 40, "x": 60, "width": 120, "var": "_evtRegion", "height": 80, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 60, "var": "_iconPiece", "anchorY": 1, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 32, "x": 60, "width": 160, "var": "_txtPiece", "fontSize": 22, "color": "#dae8f5", "anchorX": 0.5, "align": "center" } }] }] };
        MapUI.WorldMapPieceUI = WorldMapPieceUI;
    })(MapUI = ui.MapUI || (ui.MapUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PlayerBag;
    (function (PlayerBag) {
        class EquipPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                super.createChildren();
                this.createView(ui.PlayerBag.EquipPartUI.uiView);
            }
        }
        EquipPartUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 176, "x": 245, "skin": "ui/background/role_equip_left.png" } }, { "type": "Image", "props": { "y": 176, "x": 627, "skin": "ui/background/role_equip_right.png" } }, { "type": "Image", "props": { "y": 140, "x": 737, "width": 462, "skin": "ui/common/vew_bg_right.png", "height": 556, "sizeGrid": "8,8,8,8" } }, { "type": "Label", "props": { "y": 146, "x": 476, "width": 210, "var": "_txtName", "text": "Name", "height": 24, "fontSize": 24, "color": "#a7b9ce", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 641, "x": 476, "width": 210, "var": "_txtCombat", "text": "Combat", "height": 24, "fontSize": 24, "color": "#d6dfe8", "anchorX": 0.5, "align": "center" } }, { "type": "GoodsIcon", "props": { "y": 176, "x": 245, "var": "_iconAmulet", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 277, "x": 245, "var": "_iconNecklace", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 377, "x": 245, "var": "_iconLeftRing", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 478, "x": 245, "var": "_iconRightRing", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 578, "x": 245, "var": "_iconWeapon", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 176, "x": 627, "var": "_iconHelmet", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 277, "x": 627, "var": "_iconArmour", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 378, "x": 627, "var": "_iconGloves", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 478, "x": 627, "var": "_iconLegs", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 578, "x": 627, "var": "_iconShoes", "runtime": "MyUI.GoodsIcon" } }] };
        PlayerBag.EquipPartUI = EquipPartUI;
    })(PlayerBag = ui.PlayerBag || (ui.PlayerBag = {}));
})(ui || (ui = {}));
(function (ui) {
    var PlayerBag;
    (function (PlayerBag) {
        class ParcelPartUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.PlayerBag.ParcelPartUI.uiView);
            }
        }
        ParcelPartUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 90, "x": 256, "width": 197, "skin": "ui/common/money_bak.png", "height": 33 } }, { "type": "Image", "props": { "y": 90, "x": 495, "width": 197, "skin": "ui/common/money_bak.png", "height": 33 } }, { "type": "Image", "props": { "y": 90, "x": 734, "width": 197, "skin": "ui/common/money_bak.png", "height": 33 } }, { "type": "Image", "props": { "y": 90, "x": 974, "width": 197, "skin": "ui/common/money_bak.png", "height": 33 } }, { "type": "Image", "props": { "y": 85, "x": 247, "skin": "ui/common/money_gold.png" } }, { "type": "Image", "props": { "y": 84, "x": 482, "skin": "ui/common/money_diamond.png" } }, { "type": "Image", "props": { "y": 85, "x": 718, "skin": "ui/common/money_gold_binding.png" } }, { "type": "Image", "props": { "y": 84, "x": 957, "skin": "ui/common/money_diamond_binding.png" } }, { "type": "Button", "props": { "y": 627, "x": 749, "var": "_btnEquipRecycle", "skin": "ui/common/btn_anniu.png", "label": "label", "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 627, "x": 897, "var": "_btnRideRecycle", "skin": "ui/common/btn_anniu.png", "label": "label", "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 627, "x": 1045, "var": "_btnSort", "skin": "ui/common/btn_anniu.png", "label": "label", "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Image", "props": { "y": 599, "x": 759, "width": 412, "skin": "ui/common/flip_line.png", "height": 6, "sizeGrid": "0,8,0,8" } }, { "type": "List", "props": { "y": 155, "x": 753, "var": "_lstGoodsIcon", "spaceY": 6, "spaceX": 6, "repeatY": 5, "repeatX": 5 } }, { "type": "Box", "props": { "y": 594, "x": 875 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "_imgDot0", "skin": "ui/common/flip_dot_bg.png" } }, { "type": "Image", "props": { "y": 0, "x": 42, "var": "_imgDot1", "skin": "ui/common/flip_dot_bg.png" } }, { "type": "Image", "props": { "y": 0, "x": 84, "var": "_imgDot2", "skin": "ui/common/flip_dot_bg.png" } }, { "type": "Image", "props": { "y": 0, "x": 126, "var": "_imgDot3", "skin": "ui/common/flip_dot_bg.png" } }, { "type": "Image", "props": { "y": 0, "x": 168, "var": "_imgDot4", "skin": "ui/common/flip_dot_bg.png" } }] }] };
        PlayerBag.ParcelPartUI = ParcelPartUI;
    })(PlayerBag = ui.PlayerBag || (ui.PlayerBag = {}));
})(ui || (ui = {}));
(function (ui) {
    var PlayerBag;
    (function (PlayerBag) {
        class SkillItemUI extends Laya.Box {
            constructor() { super(); this.createUI(ui.PlayerBag.SkillItemUI.uiView); }
            createUI(uiData) {
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        SkillItemUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 128, "height": 124 }, "child": [{ "type": "Image", "props": { "y": 15, "x": 25, "width": 78, "var": "_imgIcon", "skin": "ui/common/skill_quan_an.png", "height": 78 } }, { "type": "Image", "props": { "y": 0, "x": 10, "var": "_imgSelect", "skin": "ui/common/skill_quan_select.png" } }, { "type": "Image", "props": { "y": 7, "x": 17, "skin": "ui/common/skill_quan_mask.png" } }, { "type": "Image", "props": { "y": 30, "x": 43, "var": "_imgLock", "skin": "ui/common/skill_suo_liang.png" } }, { "type": "Image", "props": { "y": 10, "x": 20, "var": "_imgCheck", "skin": "ui/common/skill_quan_check.png" } }, { "type": "Label", "props": { "y": 80, "x": 0, "width": 128, "var": "_txtInfo", "text": "label", "strokeColor": "#000000", "stroke": 1, "height": 42, "fontSize": 20, "color": "#dae8f5", "align": "center" } }, { "type": "Animation", "props": { "y": 20, "x": 95, "var": "_redMark", "source": "Components/AniRedMark.ani" } }] };
        PlayerBag.SkillItemUI = SkillItemUI;
    })(PlayerBag = ui.PlayerBag || (ui.PlayerBag = {}));
})(ui || (ui = {}));
(function (ui) {
    var PlayerBag;
    (function (PlayerBag) {
        class SkillPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.SkillItem", MyUI.SkillItem);
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                super.createChildren();
                this.createView(ui.PlayerBag.SkillPartUI.uiView);
            }
        }
        SkillPartUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 82, "x": 216, "skin": "ui/background/skill_left_bg.png" } }, { "type": "Image", "props": { "y": 97, "x": 742, "width": 464, "skin": "ui/common/vew_bg_right.png", "height": 598, "sizeGrid": "8,8,8,8" } }, { "type": "Button", "props": { "y": 634, "x": 686, "var": "_btnConfig", "toggle": true, "skin": "ui/common/btn_config.png", "stateNum": 2 } }, { "type": "SkillItem", "props": { "y": 315, "x": 413, "var": "_skillItem0", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 129, "x": 413, "var": "_skillItem1", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 182, "x": 545, "var": "_skillItem2", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 315, "x": 600, "var": "_skillItem3", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 445, "x": 546, "var": "_skillItem4", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 501, "x": 414, "var": "_skillItem5", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 445, "x": 284, "var": "_skillItem6", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 315, "x": 231, "var": "_skillItem7", "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 181, "x": 284, "var": "_skillItem8", "runtime": "MyUI.SkillItem" } }, { "type": "Label", "props": { "y": 96, "x": 272, "var": "_txtTotalMoJing", "text": 0, "fontSize": 26, "color": "#dae8f5" } }, { "type": "Image", "props": { "y": 90, "x": 228, "skin": "ui/common/money_mojing.png" } }, { "type": "Box", "props": { "y": 97, "x": 742, "var": "_groupInfo" }, "child": [{ "type": "Image", "props": { "y": 12, "x": 11, "width": 122, "skin": "ui/common/skill_di_bg.png", "height": 144 } }, { "type": "Image", "props": { "y": 166, "x": 13, "width": 440, "skin": "ui/common/tip_line.png" } }, { "type": "Image", "props": { "y": 423, "x": 13, "width": 440, "skin": "ui/common/tip_line.png" } }, { "type": "Image", "props": { "y": 475, "x": 67, "width": 36, "skin": "ui/common/money_gold_binding.png", "height": 36 } }, { "type": "Image", "props": { "y": 475, "x": 255, "width": 36, "skin": "ui/common/money_mojing.png", "height": 36 } }, { "type": "Button", "props": { "y": 530, "x": 13, "width": 214, "var": "_btnOneKeyUp", "skin": "ui/common/btn_anniu.png", "label": "一键升级", "height": 58, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 530, "x": 235, "width": 214, "var": "_btnUpgrade", "skin": "ui/common/btn_anniu.png", "label": "升级", "height": 58, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "SkillItem", "props": { "y": 19, "x": 8, "var": "_detailItem", "runtime": "MyUI.SkillItem" } }, { "type": "Label", "props": { "y": 17, "x": 144, "var": "_txtSkillName", "text": "label", "fontSize": 22, "color": "#dae8f5" } }, { "type": "Label", "props": { "y": 446, "x": 14, "var": "_txtTitleLevel", "text": "所需等级：", "fontSize": 18, "color": "#99a2b1" } }, { "type": "Label", "props": { "y": 446, "x": 104, "var": "_txtNeedLevel", "text": 0, "fontSize": 18, "color": "#dae8f5" } }, { "type": "Label", "props": { "y": 482, "x": 14, "var": "_txtTitleConsume", "text": "消耗：", "fontSize": 18, "color": "#99a2b1" } }, { "type": "Label", "props": { "y": 482, "x": 108, "var": "_txtGoldConsume", "text": 0, "fontSize": 18, "color": "#dae8f5" } }, { "type": "Label", "props": { "y": 482, "x": 293, "var": "_txtMoJingConsume", "text": 0, "fontSize": 18, "color": "#dae8f5" } }, { "type": "HTMLDivElement", "props": { "y": 50, "x": 144, "width": 310, "var": "_txtMPConsume", "innerHTML": "htmlText", "height": 22 } }, { "type": "HTMLDivElement", "props": { "y": 80, "x": 144, "width": 310, "var": "_txtCooldown", "innerHTML": "htmlText", "height": 22 } }, { "type": "HTMLDivElement", "props": { "y": 110, "x": 144, "width": 310, "var": "_txtReleaseScope", "innerHTML": "htmlText", "height": 48 } }, { "type": "HTMLDivElement", "props": { "y": 177, "x": 14, "width": 436, "var": "_txtSkillDesc", "innerHTML": "htmlText", "height": 238 } }] }, { "type": "Box", "props": { "y": 97, "x": 742, "var": "_groupConfig" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 16, "wordWrap": true, "width": 440, "var": "_txtConfigDesc", "text": "label", "leading": 4, "height": 120, "fontSize": 20, "color": "#99a2b1" } }, { "type": "SkillItem", "props": { "y": 334, "x": 67, "var": "_configItem0", "scaleY": 0.9, "scaleX": 0.9, "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 270, "x": 179, "var": "_configItem1", "scaleY": 1.3, "scaleX": 1.3, "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 232, "x": 81, "var": "_configItem2", "scaleY": 0.9, "scaleX": 0.9, "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 159, "x": 152, "var": "_configItem3", "scaleY": 0.9, "scaleX": 0.9, "runtime": "MyUI.SkillItem" } }, { "type": "SkillItem", "props": { "y": 145, "x": 256, "var": "_configItem4", "scaleY": 0.9, "scaleX": 0.9, "runtime": "MyUI.SkillItem" } }, { "type": "Button", "props": { "y": 376, "x": 334, "var": "_btnDisplayPage", "skin": "ui/common/btn_page_1.png", "mouseEnabled": false, "labelSize": 16, "labelPadding": "5,6,0,0", "labelAlign": "right", "label": 1, "stateNum": 1, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "Button", "props": { "y": 474, "x": 146, "var": "_btnPage0", "toggle": true, "skin": "ui/common/btn_page.png", "name": 0, "labelSize": 22, "label": 1, "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "Button", "props": { "y": 474, "x": 214, "var": "_btnPage1", "toggle": true, "skin": "ui/common/btn_page.png", "name": 1, "labelSize": 22, "label": 2, "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "Button", "props": { "y": 474, "x": 282, "var": "_btnPage2", "toggle": true, "skin": "ui/common/btn_page.png", "name": 2, "labelSize": 22, "label": 3, "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "TextInput", "props": { "y": 539, "x": 14, "width": 284, "var": "_inputCfgName", "text": "请输入技能配置名称", "skin": "ui/common/input_bg.png", "height": 42, "fontSize": 20, "align": "center", "sizeGrid": "6,6,6,6", "color": "#dae8f5" } }, { "type": "Button", "props": { "y": 534, "x": 309, "width": 140, "var": "_btnRename", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 50, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 474, "x": 346, "var": "_btnReset", "skin": "ui/common/btn_reset.png", "stateNum": 2 } }] }] };
        PlayerBag.SkillPartUI = SkillPartUI;
    })(PlayerBag = ui.PlayerBag || (ui.PlayerBag = {}));
})(ui || (ui = {}));
(function (ui) {
    var PromptBox;
    (function (PromptBox) {
        class PromptBoxUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.PromptBox.PromptBoxUI.uiView);
            }
        }
        PromptBoxUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 500, "height": 300 }, "child": [{ "type": "Box", "props": {}, "child": [{ "type": "Image", "props": { "width": 500, "skin": "ui/common/vew_bg_diban.png", "height": 300, "sizeGrid": "4,4,4,4" } }] }, { "type": "Box", "props": {}, "child": [{ "type": "Label", "props": { "y": 108, "x": 84, "wordWrap": true, "width": 335, "var": "_txtDesc", "height": 69, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "skin": "ui/common/tip_bg_title.png" } }, { "type": "Button", "props": { "y": 200, "x": 72, "width": 150, "var": "_btnConfirm", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "label": "确定", "height": 50, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 200, "x": 271, "width": 150, "var": "_btnCancel", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "label": "取消", "height": 50, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 6, "x": 456, "width": 33, "var": "_btnClose", "skin": "ui/common/btn_close.png", "height": 30, "stateNum": 1 } }] }, { "type": "Label", "props": { "y": 7, "x": 218, "text": "提示", "fontSize": 28, "color": "#ffffff" } }] };
        PromptBox.PromptBoxUI = PromptBoxUI;
    })(PromptBox = ui.PromptBox || (ui.PromptBox = {}));
})(ui || (ui = {}));
(function (ui) {
    var SystemOpenFying;
    (function (SystemOpenFying) {
        class SystemOpenFyingPartUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.SystemOpenFying.SystemOpenFyingPartUI.uiView);
            }
        }
        SystemOpenFyingPartUI.uiView = { "type": "Dialog", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Box", "props": { "y": 210, "x": 589, "var": "_needHideBox" }, "child": [{ "type": "Image", "props": { "y": 82, "x": -290, "skin": "ui/background/systemopen_fly_bg.png" } }, { "type": "Image", "props": { "width": 102, "var": "_twoImage", "height": 102 } }, { "type": "Label", "props": { "y": 133, "x": -74, "width": 250, "var": "_sOpenName", "text": "label", "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 170, "x": -350, "width": 800, "var": "_sOpenDesc", "text": "label", "fontSize": 24, "color": "#6EE2F3", "align": "center" } }, { "type": "Image", "props": { "y": -33, "x": -47, "width": 195, "skin": "ui/common/systemopen_fly_guang.png", "height": 173 } }, { "type": "Image", "props": { "x": -4, "width": 110, "skin": "ui/common/systemopen_fly_yuan.png", "height": 110 } }, { "type": "Image", "props": { "width": 102, "height": 102 } }] }, { "type": "Box", "props": { "y": 215, "x": 589 }, "child": [{ "type": "Image", "props": { "width": 102, "var": "_oneImage", "height": 102 } }] }] };
        SystemOpenFying.SystemOpenFyingPartUI = SystemOpenFyingPartUI;
    })(SystemOpenFying = ui.SystemOpenFying || (ui.SystemOpenFying = {}));
})(ui || (ui = {}));
(function (ui) {
    var SystemWizard;
    (function (SystemWizard) {
        class SystemWizardItemUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                super.createChildren();
                this.createView(ui.SystemWizard.SystemWizardItemUI.uiView);
            }
        }
        SystemWizardItemUI.uiView = { "type": "View", "props": { "x": 0, "width": 0, "height": 0 }, "child": [{ "type": "Box", "props": { "top": 200, "left": 800, "height": 222 }, "child": [{ "type": "Image", "props": { "width": 180, "skin": "ui/common/vew_bg_diban.png", "height": 222, "sizeGrid": "4,4,4,4" } }, { "type": "Label", "props": { "y": 118, "width": 180, "var": "_goodsName", "text": "label", "height": 20, "fontSize": 18, "color": "#ffffff", "align": "center" } }, { "type": "Button", "props": { "y": 6, "x": 160, "width": 14, "var": "_btnClose", "stateNum": 1, "skin": "ui/common/btn_close_1.png", "height": 15 } }, { "type": "Button", "props": { "y": 172, "x": 7, "width": 166, "var": "_btnConfirm", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "height": 44, "sizeGrid": "8,10,8,10", "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "GoodsIcon", "props": { "y": 21, "x": 50, "var": "_goodsIcon", "runtime": "MyUI.GoodsIcon" } }, { "type": "Label", "props": { "y": 223, "x": 0, "width": 180, "var": "_autoTimer", "height": 20, "fontSize": 18, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 80, "x": 56, "width": 8, "var": "_goodsCount", "height": 8, "fontSize": 18, "color": "#ffffff", "align": "center" } }, { "type": "HTMLDivElement", "props": { "y": 142, "x": 0, "width": 180, "var": "_goodsDesc", "innerHTML": "htmlText", "height": 20 } }] }] };
        SystemWizard.SystemWizardItemUI = SystemWizardItemUI;
    })(SystemWizard = ui.SystemWizard || (ui.SystemWizard = {}));
})(ui || (ui = {}));
(function (ui) {
    var Task;
    (function (Task) {
        class NPCDoingTaskPartUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                super.createChildren();
                this.createView(ui.Task.NPCDoingTaskPartUI.uiView);
            }
        }
        NPCDoingTaskPartUI.uiView = { "type": "Dialog", "props": { "y": 100, "x": 100, "width": 1280, "top": 100, "left": 100, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 369, "skin": "ui/common/vew_bg_diban.png", "sizeGrid": "3,3,3,3", "height": 518 } }, { "type": "HTMLDivElement", "props": { "y": 55, "x": 10, "width": 350, "var": "_NPCText", "innerHTML": "htmlText", "height": 24 } }, { "type": "HTMLDivElement", "props": { "y": 95, "x": 11, "width": 350, "var": "_TalkText", "innerHTML": "htmlText", "height": 94 } }, { "type": "Button", "props": { "y": 13, "x": 338, "var": "_btnClose", "skin": "ui/common/btn_close_1.png", "name": "close", "stateNum": 1 } }, { "type": "Image", "props": { "y": -1, "x": 1, "skin": "ui/common/tip_bg_title.png" } }, { "type": "Image", "props": { "y": 180, "x": 2, "skin": "ui/common/tip_bg_title.png" } }, { "type": "Label", "props": { "y": 192, "x": 11, "width": 85, "text": "任务奖励", "height": 24, "fontSize": 24, "color": "#AEBFD0FF", "bold": true } }, { "type": "Box", "props": { "y": 243, "x": 12, "width": 347, "var": "_Box_up", "name": "Box_up", "height": 42 }, "child": [{ "type": "Label", "props": { "y": 11, "x": 50, "width": 133, "var": "_UpText", "text": "40", "height": 24, "fontSize": 24, "color": "#dae8f5" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 348, "skin": "ui/common/item_bak.png", "sizeGrid": "4,4,4,4", "height": 42 } }, { "type": "Image", "props": { "width": 42, "var": "_UpIcon", "height": 42 } }] }, { "type": "Box", "props": { "y": 299, "x": 13, "width": 347, "var": "_Box_down", "name": "Box_down", "height": 42 }, "child": [{ "type": "Label", "props": { "y": 10, "x": 50, "width": 133, "var": "_DownText", "height": 24, "fontSize": 24, "color": "#dae8f5" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 348, "skin": "ui/common/item_bak.png", "sizeGrid": "4,4,4,4", "height": 42 } }, { "type": "Image", "props": { "width": 42, "var": "_DownIcon", "height": 42 } }] }, { "type": "Button", "props": { "y": 450, "x": 10, "width": 350, "visible": true, "var": "_Submit", "stateNum": 2, "skin": "ui/common/btn_anniu.png", "labelStrokeColor": "#000000", "labelStroke": 0, "labelSize": 26, "labelPadding": "0", "labelFont": "Microsoft YaHei", "labelColors": "#ffffff,#ffffff,#ffffff", "labelBold": true, "label": "领取奖励", "height": 58, "sizeGrid": "8,10,8,10" } }, { "type": "GoodsIcon", "props": { "y": 359, "x": 16, "visible": false, "var": "_Icon1", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 359, "x": 120, "visible": false, "var": "_Icon2", "runtime": "MyUI.GoodsIcon" } }] };
        Task.NPCDoingTaskPartUI = NPCDoingTaskPartUI;
    })(Task = ui.Task || (ui.Task = {}));
})(ui || (ui = {}));
(function (ui) {
    var Task;
    (function (Task) {
        class TaskBoxMiniUI extends Laya.Sprite {
            constructor() { super(); this.createUI(ui.Task.TaskBoxMiniUI.uiView); }
            createUI(uiData) {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                laya.utils.ClassUtils.createByJson(uiData, this, this);
            }
        }
        TaskBoxMiniUI.uiView = { "type": "Sprite", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Box", "props": { "width": 300, "height": 215 }, "child": [{ "type": "Button", "props": { "y": -1, "x": 5, "var": "mBtnTask", "stateNum": 2, "skin": "ui/main/btn_task.png" } }, { "type": "Button", "props": { "y": 108, "x": 5, "var": "mBtnTeam", "stateNum": 2, "skin": "ui/main/btn_zudui.png" } }, { "type": "Image", "props": { "y": 1, "x": 58, "skin": "ui/main/img_renwu_294_highlight.png" } }, { "type": "Button", "props": { "y": 33, "x": 131, "width": 183, "var": "mBtnTaskIcon", "pivotY": 32, "pivotX": 73, "height": 69 } }, { "type": "HTMLDivElement", "props": { "y": 6, "x": 63, "width": 217, "var": "mTxtTaskInfo", "mouseEnabled": false, "innerHTML": "<font style='fontSize:20' color='#f2b308'>[主]前往城外<br/></font>去[皇都原]找<font color='#49bd1b'>王云</font>对话<font color='#e73722'>(0/1)<br/></font>", "height": 59 } }] }] };
        Task.TaskBoxMiniUI = TaskBoxMiniUI;
    })(Task = ui.Task || (ui.Task = {}));
})(ui || (ui = {}));
(function (ui) {
    var tip;
    (function (tip) {
        class EquipTipUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                super.createChildren();
                this.createView(ui.tip.EquipTipUI.uiView);
            }
        }
        EquipTipUI.uiView = { "type": "Dialog", "props": {}, "child": [{ "type": "Box", "props": { "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 468, "var": "_bgContent", "skin": "ui/common/vew_bg_diban.png", "height": 628, "sizeGrid": "4,4,4,4" } }, { "type": "Box", "props": { "y": 1, "x": 2 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 464, "skin": "ui/common/tip_bg_title.png" } }, { "type": "Button", "props": { "y": 14, "x": 435, "var": "_btnClose", "skin": "ui/common/btn_close_1.png", "name": "close", "stateNum": 1 } }, { "type": "HTMLDivElement", "props": { "y": 11, "x": 62, "width": 340, "var": "_txtTitle", "height": 22 } }] }, { "type": "Box", "props": { "y": 59, "x": 14 }, "child": [{ "type": "GoodsIcon", "props": { "y": 0, "x": 0, "var": "_goodsIcon", "scaleY": 1.2, "scaleX": 1.2, "runtime": "MyUI.GoodsIcon" } }, { "type": "Image", "props": { "y": -6, "x": 111, "width": 324, "var": "_imgZhuoYue", "skin": "ui/common/tip_chuanshuo_lan.png", "height": 108 } }, { "type": "Image", "props": { "y": 107, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 2, "x": 108, "var": "_txtGrade", "text": "Grade", "fontSize": 18, "color": "#749a29", "align": "left" } }, { "type": "Label", "props": { "y": 37, "x": 108, "var": "_txtCombat", "text": "Combat", "fontSize": 26, "color": "#dae8f5", "align": "left" } }, { "type": "Label", "props": { "y": 77, "x": 108, "var": "_txtTitleCombat", "text": "CombatTitle", "fontSize": 18, "color": "#99a2b1", "align": "left" } }, { "type": "Label", "props": { "y": 2, "x": 370, "width": 70, "var": "_txtType", "text": "Type", "height": 18, "fontSize": 18, "color": "#99a2b1", "align": "right" } }, { "type": "HTMLDivElement", "props": { "y": 77, "x": 284, "width": 156, "var": "_txtOccu", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Panel", "props": { "y": 178, "x": 14, "width": 440, "var": "_panelContent", "vScrollBarSkin": "ui/common/vscroll.png", "height": 352 }, "child": [{ "type": "VBox", "props": { "y": 0, "x": 0, "var": "_groupContent", "space": 10 }, "child": [{ "type": "Box", "props": { "var": "_groupCondition" }, "child": [{ "type": "HTMLDivElement", "props": { "y": 0, "x": 0, "width": 210, "var": "_txtLevel", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 0, "x": 230, "width": 210, "var": "_txtCondition0", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 23, "x": 0, "width": 210, "var": "_txtCondition1", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 23, "x": 230, "width": 210, "var": "_txtCondition2", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 46, "x": 0, "width": 210, "var": "_txtCondition3", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupBasic" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleBasic", "text": "[Basic]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "Box", "props": { "y": 38, "x": 2, "var": "_groupStar0" }, "child": [{ "type": "List", "props": { "var": "_progressBg0", "spaceX": 1, "repeatX": 15 }, "child": [{ "type": "Image", "props": { "skin": "ui/common/tip_star_bg.png", "renderType": "render" } }] }, { "type": "List", "props": { "var": "_progressBar0", "spaceX": 1, "repeatX": 15 }, "child": [{ "type": "Image", "props": { "skin": "ui/common/tip_star.png", "renderType": "render" } }] }] }, { "type": "Box", "props": { "y": 67, "x": 2, "var": "_groupStar1" }, "child": [{ "type": "List", "props": { "var": "_progressBg1", "spaceX": 1, "repeatX": 15 }, "child": [{ "type": "Image", "props": { "skin": "ui/common/tip_star_bg.png", "renderType": "render" } }] }, { "type": "List", "props": { "var": "_progressBar1", "spaceX": 1, "repeatX": 2 }, "child": [{ "type": "Image", "props": { "skin": "ui/common/tip_star.png", "renderType": "render" } }] }] }, { "type": "HTMLDivElement", "props": { "y": 96, "x": 0, "width": 436, "var": "_txtBasic", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupAddition" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "ProgressBar", "props": { "y": 37, "x": 0, "var": "_progressAddition", "value": 0.5, "skin": "ui/common/progress_tip_addition.png" } }, { "type": "Label", "props": { "y": 33, "x": 174, "width": 90, "var": "_txtProgAddition", "text": "5/80", "height": 16, "fontSize": 16, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleAddition", "text": "[Addition]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "HTMLDivElement", "props": { "y": 50, "x": 0, "width": 436, "var": "_txtAddition", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupRefined" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleRefined", "text": "[Refined]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 0, "width": 436, "var": "_txtRefined", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupRandom" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleRandom", "text": "[Random]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 0, "width": 436, "var": "_txtRandom", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupLucky" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleLucky", "text": "[Lucky]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 0, "width": 436, "var": "_txtLucky", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "Box", "props": { "var": "_groupRebirth" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 440, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Label", "props": { "y": 8, "x": 0, "var": "_txtTitleRebirth", "text": "[Rebirth]", "fontSize": 20, "color": "#dae8f5", "align": "left" } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 0, "width": 436, "var": "_txtRebirth", "innerHTML": "htmlText", "height": 18 } }] }] }] }, { "type": "Box", "props": { "y": 532, "x": 2, "var": "_groupPrice" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 464, "skin": "ui/common/tip_bg_money.png", "height": 34 } }, { "type": "Image", "props": { "y": 6, "x": 62, "width": 26, "var": "_imgMoney", "skin": "ui/common/money_gold.png", "height": 26 } }, { "type": "HTMLDivElement", "props": { "y": 9, "x": 12, "width": 216, "var": "_txtPrice", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 9, "x": 262, "width": 188, "var": "_txtDurability", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "HBox", "props": { "y": 570, "x": 14, "width": 440, "var": "_groupButton", "space": 2 }, "child": [{ "type": "Button", "props": { "width": 38, "var": "_btnScan", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 0, "x": 40, "width": 38, "var": "_btnSale", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnUse", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnTakeOff", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnPutIn", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnProcess", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnBuy", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnDestroy", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnWear", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 38, "var": "_btnGetBack", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "y": 0, "x": 160, "width": 38, "var": "_btnUpShelf", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }] }, { "type": "Image", "props": { "y": -3, "x": -2, "var": "_imgEquiped", "skin": "ui/common/tip_equiped.png" }, "child": [{ "type": "Label", "props": { "y": 37, "x": 6, "text": "已装备", "rotation": -47, "fontSize": 14, "color": "#ffffff" } }] }] }] };
        tip.EquipTipUI = EquipTipUI;
    })(tip = ui.tip || (ui.tip = {}));
})(ui || (ui = {}));
(function (ui) {
    var tip;
    (function (tip) {
        class GoodsTipUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                super.createChildren();
                this.createView(ui.tip.GoodsTipUI.uiView);
            }
        }
        GoodsTipUI.uiView = { "type": "Dialog", "props": { "width": 800, "popupCenter": true, "height": 600 }, "child": [{ "type": "Box", "props": { "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 370, "var": "_contentBg", "skin": "ui/common/vew_bg_diban.png", "height": 413, "sizeGrid": "4,4,4,4" } }, { "type": "VBox", "props": { "y": 1, "x": 2, "var": "_groupContent", "space": 10, "layoutEnabled": false }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/tip_bg_title.png" } }, { "type": "Button", "props": { "y": 14, "x": 337, "var": "_btnClose", "skin": "ui/common/btn_close_1.png", "name": "close", "stateNum": 1 } }, { "type": "Label", "props": { "y": 11, "x": 52, "width": 261, "var": "_txtTitle", "text": "Name", "height": 22, "fontSize": 22, "color": "#d6dfe8", "bold": true, "align": "center" } }] }, { "type": "Box", "props": { "y": 58, "x": 10, "var": "_groupIcon" }, "child": [{ "type": "HTMLDivElement", "props": { "y": 122, "width": 347, "var": "_txtDesc", "innerHTML": "htmlText", "height": 58 } }, { "type": "GoodsIcon", "props": { "y": 0, "x": 2, "var": "_goodsIcon", "scaleY": 1.2, "scaleX": 1.2, "runtime": "MyUI.GoodsIcon" } }, { "type": "HTMLDivElement", "props": { "y": 7, "x": 116, "width": 168, "var": "_txtType", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 38, "x": 116, "width": 168, "var": "_txtLevel", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 68, "x": 116, "width": 168, "var": "_txtOccu", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 174, "x": 0, "width": 294, "var": "_txtValidTime", "innerHTML": "htmlText", "height": 18 } }, { "type": "Image", "props": { "y": 103, "x": 0, "width": 346, "skin": "ui/common/tip_line.png", "height": 3 } }, { "type": "Image", "props": { "y": 200, "x": 0, "width": 346, "skin": "ui/common/tip_line.png" } }] }, { "type": "Box", "props": { "y": 272, "x": 10, "var": "_groupSplit" }, "child": [{ "type": "Button", "props": { "y": 0, "x": 248, "width": 97, "var": "_btnSplit", "skin": "ui/common/btn_anniu.png", "labelSize": 20, "label": "label", "height": 44, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelBold": "false" } }, { "type": "Button", "props": { "y": 4, "x": 59, "var": "_btnMinus", "skin": "ui/common/btn_minus.png", "stateNum": 2 } }, { "type": "Button", "props": { "y": 4, "x": 202, "var": "_btnPlus", "skin": "ui/common/btn_plus.png", "stateNum": 2 } }, { "type": "TextInput", "props": { "y": 4, "x": 106, "width": 86, "var": "_txtSplitNum", "text": "2", "skin": "ui/common/input_bg.png", "height": 36, "fontSize": 16, "color": "#dae8f5", "align": "center", "sizeGrid": "6,6,6,6" } }, { "type": "Label", "props": { "y": 13, "x": 0, "var": "_txtTitleSplit", "text": "Num:", "fontSize": 18, "color": "#99a2b1", "align": "left" } }] }, { "type": "Box", "props": { "y": 329, "x": 10, "var": "_groupPrice" }, "child": [{ "type": "Label", "props": { "y": 28, "x": 0, "var": "_txtLimited", "text": "Limited", "layoutEnabled": false, "fontSize": 18, "color": "#99a2b1", "align": "left" } }, { "type": "Image", "props": { "y": -2, "x": 54, "width": 26, "var": "_imgMoney", "skin": "ui/common/money_diamond_binding.png", "height": 26 } }, { "type": "HTMLDivElement", "props": { "y": 0, "x": 0, "width": 140, "var": "_txtPrice", "innerHTML": "htmlText", "height": 18 } }, { "type": "HTMLDivElement", "props": { "y": 0, "x": 220, "width": 124, "var": "_txtCount", "innerHTML": "htmlText", "height": 18 } }] }, { "type": "HBox", "props": { "y": 371, "x": 10, "width": 346, "var": "_groupButton", "space": 4, "height": 48 }, "child": [{ "type": "Button", "props": { "width": 46, "var": "_btnUpShelf", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnSale", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnGetBack", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnPutIn", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnDestroy", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnBuy", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "Button", "props": { "width": 46, "var": "_btnUse", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 48, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }] }] }] }] };
        tip.GoodsTipUI = GoodsTipUI;
    })(tip = ui.tip || (ui.tip = {}));
})(ui || (ui = {}));
(function (ui) {
    var Vip;
    (function (Vip) {
        class VipItemUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("ui.Components.GoodsIconUI", ui.Components.GoodsIconUI);
                super.createChildren();
                this.createView(ui.Vip.VipItemUI.uiView);
            }
        }
        VipItemUI.uiView = { "type": "Dialog", "props": { "width": 995, "height": 476 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 995, "height": 476 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 445, "skin": "ui/common/vip_kuang_86.png", "sizeGrid": "5,5,5,5", "height": 476 } }, { "type": "Image", "props": { "y": 0, "x": 451, "width": 545, "skin": "ui/common/vip_kuang_86.png", "sizeGrid": "5,5,5,5", "height": 192 } }, { "type": "Image", "props": { "y": 201, "x": 451, "width": 545, "skin": "ui/common/vip_kuang_86.png", "sizeGrid": "5,5,5,5", "height": 275 } }, { "type": "Image", "props": { "y": 10, "x": 60, "skin": "ui/common/vip_text_di.png" } }, { "type": "Image", "props": { "y": 10, "x": 565, "skin": "ui/common/vip_text_di.png" } }, { "type": "Image", "props": { "y": 210, "x": 565, "skin": "ui/common/vip_text_di.png" } }, { "type": "Label", "props": { "y": 15, "x": 122, "width": 200, "var": "_vipDescTitleText", "text": "贵族特权", "fontSize": 26, "color": "#DCF1FA", "align": "center" } }, { "type": "Label", "props": { "y": 15, "x": 624, "width": 200, "var": "_vipDescTitleText1", "text": "贵族特权", "fontSize": 26, "color": "#DCF1FA", "align": "center" } }, { "type": "Label", "props": { "y": 215, "x": 624, "width": 200, "var": "_vipDescTitleText2", "text": "贵族特权", "fontSize": 26, "color": "#DCF1FA", "align": "center" } }, { "type": "Image", "props": { "y": 57, "x": 464, "width": 520, "skin": "ui/common/vip_dikuang.png", "sizeGrid": "5,5,5,5", "height": 124 } }, { "type": "Image", "props": { "y": 256, "x": 464, "width": 520, "skin": "ui/common/vip_dikuang.png", "sizeGrid": "5,5,5,5", "height": 125 } }, { "type": "Image", "props": { "y": 58, "x": 12, "width": 421, "skin": "ui/common/vip_dikuang.png", "sizeGrid": "5,5,5,5", "height": 405 } }, { "type": "Image", "props": { "y": 82, "x": 563, "width": 72, "var": "_teQuanBuffImage", "skin": "ui/common/vip_suishencangku.png", "height": 72 } }, { "type": "Image", "props": { "y": 82, "x": 688, "width": 72, "var": "_jingPoHuiShouImage", "skin": "ui/common/vip_huishou.png", "height": 72 } }, { "type": "Image", "props": { "y": 82, "x": 812, "width": 72, "var": "_suiShenCangKuImage", "skin": "ui/common/vip_tequanbuff.png", "height": 72 } }, { "type": "Image", "props": { "y": 390, "x": 637, "var": "_yiLIngQuImage", "skin": "ui/common/btn_yilingqu.png" } }, { "type": "Button", "props": { "y": 400, "x": 639, "width": 180, "var": "_getRewardBtn", "skin": "ui/common/btn_anniu.png", "height": 55, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "List", "props": { "y": 278, "x": 492, "var": "_rewardList", "height": 81 }, "child": [{ "type": "GoodsIcon", "props": { "y": 0, "x": 0, "runtime": "ui.Components.GoodsIconUI" } }] }, { "type": "List", "props": { "y": 77, "x": 35, "var": "_quanXianList" } }] }] };
        Vip.VipItemUI = VipItemUI;
    })(Vip = ui.Vip || (ui.Vip = {}));
})(ui || (ui = {}));
(function (ui) {
    var Vip;
    (function (Vip) {
        class VipPartUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(ui.Vip.VipPartUI.uiView);
            }
        }
        VipPartUI.uiView = { "type": "Dialog", "props": { "width": 1280, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 20, "x": 55, "width": 1170, "skin": "ui/common/vew_bg_diban.png", "height": 678, "sizeGrid": "4,4,4,4" } }, { "type": "Image", "props": { "y": 20, "x": 55, "width": 1170, "skin": "ui/common/vew_bg_title.png", "height": 58 } }, { "type": "Image", "props": { "y": 180, "x": 65, "width": 1150, "skin": "ui/background/vip_youkuang.png", "sizeGrid": "10,10,10,10", "height": 517 } }, { "type": "Label", "props": { "y": 35, "x": 592, "width": 100, "var": "_titleText", "fontSize": 30, "color": "#D6DFE8", "align": "center" } }, { "type": "Box", "props": {}, "child": [{ "type": "Button", "props": { "y": 35, "x": 1177, "var": "_btnClose", "stateNum": 1, "skin": "ui/common/btn_close.png" } }, { "type": "Image", "props": { "y": 114, "x": 76, "skin": "ui/common/vip_guizuzi.png" } }, { "type": "Label", "props": { "y": 116, "x": 184, "var": "_currVipLevelText", "text": "5", "fontSize": 44, "color": "#eff815" } }, { "type": "Label", "props": { "y": 100, "x": 391, "var": "_descText", "fontSize": 20, "color": "#9AAAC4" } }, { "type": "Label", "props": { "y": 100, "x": 627, "width": 120, "var": "_descText1", "fontSize": 20, "color": "#9AAAC4", "align": "center" } }, { "type": "Image", "props": { "y": 89, "x": 473, "width": 46, "skin": "ui/common/money_diamond.png", "height": 47 } }, { "type": "Label", "props": { "y": 100, "x": 504, "width": 120, "var": "_nextVipLevelNumsText", "text": "888888888", "fontSize": 20, "color": "#ffeb0d", "align": "center" } }, { "type": "Image", "props": { "y": 99, "x": 744, "width": 43, "skin": "ui/common/vip_guizuzi.png", "height": 24 } }, { "type": "Label", "props": { "y": 100, "x": 795, "var": "_nextVipLevelText", "text": "8", "height": 20, "fontSize": 20, "color": "#e9fd0a" } }, { "type": "Button", "props": { "y": 110, "x": 1032, "width": 180, "var": "_chongZhiBtn", "stateNum": 3, "skin": "ui/common/vip_anniu.png", "labelSize": 26, "labelColors": "#FCFAFD", "height": 60 } }, { "type": "ProgressBar", "props": { "y": 130, "x": 245, "width": 750, "var": "_progressBar", "skin": "ui/common/progress_vip_jindutiao.png", "sizeGrid": "5,5,5,5", "height": 22 } }, { "type": "Label", "props": { "y": 131, "x": 521, "width": 200, "var": "_progressBarText", "text": "888/1000", "fontSize": 18, "color": "#DAE8F5", "align": "center" } }] }, { "type": "List", "props": { "y": 200, "x": 142, "var": "_vipItemCanvas" } }, { "type": "Image", "props": { "y": 405, "x": 1166, "var": "_rightImageBtn", "skin": "ui/common/vip_jiantou.png" } }, { "type": "Image", "props": { "y": 405, "x": 116, "var": "_leftImageBtn", "skin": "ui/common/vip_jiantou.png", "scaleX": -1 } }] };
        Vip.VipPartUI = VipPartUI;
    })(Vip = ui.Vip || (ui.Vip = {}));
})(ui || (ui = {}));
(function (ui) {
    var Vip;
    (function (Vip) {
        class VipQuanXianItemUI extends Dialog {
            constructor() { super(); }
            createChildren() {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                super.createChildren();
                this.createView(ui.Vip.VipQuanXianItemUI.uiView);
            }
        }
        VipQuanXianItemUI.uiView = { "type": "Dialog", "props": { "width": 280, "height": 20 }, "child": [{ "type": "Image", "props": { "y": 4, "x": 0, "skin": "ui/common/vip_lingxing.png" } }, { "type": "HTMLDivElement", "props": { "x": 17, "width": 300, "var": "_descText", "innerHTML": "htmlText", "height": 20 } }] };
        Vip.VipQuanXianItemUI = VipQuanXianItemUI;
    })(Vip = ui.Vip || (ui.Vip = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        var Components;
        (function (Components) {
            class GradeItemRenderUI extends Laya.Box {
                constructor() { super(); this.createUI(ui.Welfare.Components.GradeItemRenderUI.uiView); }
                createUI(uiData) {
                    View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                    laya.utils.ClassUtils.createByJson(uiData, this, this);
                }
            }
            GradeItemRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 950, "height": 108 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 950, "skin": "ui/common/window_frame_bak3.png", "height": 108, "sizeGrid": "8,8,8,8" } }, { "type": "Button", "props": { "y": 31, "x": 780, "width": 152, "var": "_btnGet", "skin": "ui/common/btn_anniu.png", "labelSize": 22, "labelBold": false, "label": "label", "height": 46, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9" } }, { "type": "Label", "props": { "y": 41, "x": 32, "var": "_txtGrade", "text": "label", "fontSize": 26, "color": "#adceef" } }, { "type": "Label", "props": { "y": 41, "x": 780, "width": 152, "var": "_txtNotGet", "text": "label", "height": 26, "fontSize": 26, "color": "#9aaac4", "align": "center" } }, { "type": "Image", "props": { "y": 29, "x": 780, "var": "_imgHadGet", "skin": "ui/welfare/grade_state_had.png" } }, { "type": "GoodsIcon", "props": { "y": 13, "x": 238, "var": "_iconDouQi", "runtime": "MyUI.GoodsIcon" } }, { "type": "GoodsIcon", "props": { "y": 13, "x": 339, "var": "_iconMoney", "runtime": "MyUI.GoodsIcon" } }, { "type": "List", "props": { "y": 13, "x": 440, "width": 286, "var": "_goodsList", "spaceX": 20, "repeatY": 1, "height": 81 }, "child": [{ "type": "GoodsIcon", "props": { "runtime": "MyUI.GoodsIcon", "renderType": "render" } }] }] };
            Components.GradeItemRenderUI = GradeItemRenderUI;
        })(Components = Welfare.Components || (Welfare.Components = {}));
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        var Components;
        (function (Components) {
            class OnlineItemRenderUI extends Laya.Box {
                constructor() { super(); this.createUI(ui.Welfare.Components.OnlineItemRenderUI.uiView); }
                createUI(uiData) {
                    View.regComponent("MyUI.GoodsIcon", MyUI.GoodsIcon);
                    laya.utils.ClassUtils.createByJson(uiData, this, this);
                }
            }
            OnlineItemRenderUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 172, "height": 260 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 6, "skin": "ui/welfare/online_item_bak.png" } }, { "type": "Image", "props": { "y": 218, "x": 86, "var": "_imgState", "skin": "ui/welfare/online_state_can.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "ProgressBar", "props": { "y": 165, "x": 16, "width": 140, "var": "_progTime", "skin": "ui/welfare/progress_online_time.png", "height": 4, "sizeGrid": "0,4,0,4" } }, { "type": "Label", "props": { "y": 7, "x": 16, "width": 140, "var": "_txtTime", "text": "label", "height": 24, "fontSize": 24, "color": "#8fb8d8", "align": "center" } }, { "type": "Label", "props": { "y": 206, "x": 16, "width": 140, "var": "_txtState", "text": "label", "height": 24, "fontSize": 24, "color": "#afdcff", "align": "center" } }, { "type": "List", "props": { "y": 44, "x": 33, "width": 108, "var": "_goodsList", "height": 108 }, "child": [{ "type": "GoodsIcon", "props": { "width": 108, "scaleY": 1.3, "scaleX": 1.3, "runtime": "MyUI.GoodsIcon", "renderType": "render", "height": 108 } }] }] };
            Components.OnlineItemRenderUI = OnlineItemRenderUI;
        })(Components = Welfare.Components || (Welfare.Components = {}));
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        var Components;
        (function (Components) {
            class SevenLoginRewardItemUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(ui.Welfare.Components.SevenLoginRewardItemUI.uiView);
                }
            }
            SevenLoginRewardItemUI.uiView = { "type": "Dialog", "props": { "width": 121, "height": 160 }, "child": [{ "type": "Image", "props": { "width": 121, "skin": "ui/welfare/fuli_qiri_diban_xiao.png", "height": 160 } }, { "type": "Label", "props": { "y": 15, "x": 10, "width": 100, "var": "_labDays", "fontSize": 22, "color": "#8FB8D8", "align": "center" } }, { "type": "Image", "props": { "y": 44, "x": 8, "width": 105, "var": "_imgGoods", "height": 105 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 121, "var": "_imgNoGet", "skin": "ui/common/skill_di_bg.png", "height": 160 } }, { "type": "Image", "props": { "y": 62, "x": 12, "var": "_imgOverTime", "skin": "ui/welfare/fuli_qiri_yiguoqi.png" } }, { "type": "Image", "props": { "y": 65, "x": 5, "width": 111, "var": "_imgGained", "skin": "ui/welfare/fuli_qiri_yilingqu.png", "height": 71 } }, { "type": "Animation", "props": { "y": 80, "x": 60, "var": "_rewardEffect", "source": "Animations/SevenDayLoginRewardAnm.ani", "autoPlay": true } }] };
            Components.SevenLoginRewardItemUI = SevenLoginRewardItemUI;
        })(Components = Welfare.Components || (Welfare.Components = {}));
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        class DailyWelfarePartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.TabItemRender", MyUI.TabItemRender);
                super.createChildren();
                this.createView(ui.Welfare.DailyWelfarePartUI.uiView);
            }
        }
        DailyWelfarePartUI.uiView = { "type": "View", "props": { "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 89, "x": 224, "width": 992, "var": "_imgBak", "height": 186 } }, { "type": "Image", "props": { "y": 343, "x": 228, "width": 984, "skin": "ui/common/window_frame_bak.png", "height": 354, "sizeGrid": "20,20,20,20" } }, { "type": "HBox", "props": { "y": 280, "x": 226, "space": -2 }, "child": [{ "type": "TabItemRender", "props": { "width": 170, "var": "_tabOnline", "tabSkin": "ui/common/btn_common_tab_style1.png", "tabLabelSize": 22, "tabLabelColors": "#dae8f5,#dae8f5,#dae8f5,#dae8f5", "runtime": "MyUI.TabItemRender", "height": 56 } }, { "type": "TabItemRender", "props": { "width": 170, "var": "_tabGrade", "tabSkin": "ui/common/btn_common_tab_style1.png", "tabLabelSize": 22, "tabLabelColors": "#dae8f5,#dae8f5,#dae8f5,#dae8f5", "runtime": "MyUI.TabItemRender", "height": 56 } }, { "type": "TabItemRender", "props": { "width": 170, "var": "_tabXiuLian", "tabSkin": "ui/common/btn_common_tab_style1.png", "tabLabelSize": 22, "tabLabelColors": "#dae8f5,#dae8f5,#dae8f5,#dae8f5", "runtime": "MyUI.TabItemRender", "height": 56 } }] }, { "type": "Box", "props": { "y": 343, "x": 228 }, "child": [{ "type": "Image", "props": { "y": 9, "x": 8, "width": 664, "skin": "ui/background/meditation_content.png", "height": 344 } }, { "type": "Image", "props": { "y": 9, "x": 682, "width": 294, "skin": "ui/common/window_frame_bak2.png", "height": 344 } }, { "type": "Box", "props": { "y": 302, "x": 47 }, "child": [{ "type": "Image", "props": { "sizeGrid": "8,8,8,8", "y": 0, "x": -1, "width": 276, "skin": "ui/common/window_frame_bak1.png", "height": 38 } }, { "type": "Image", "props": { "y": 0, "x": 1, "width": 38, "skin": "ui/common/money_exp.png", "height": 39 } }, { "type": "Label", "props": { "var": "_txtExp", "y": 8, "x": 47, "width": 180, "text": "label", "height": 22, "fontSize": 22, "color": "#dae8f5", "align": "center" } }] }, { "type": "Box", "props": { "y": 302, "x": 358 }, "child": [{ "type": "Image", "props": { "sizeGrid": "8,8,8,8", "y": 0, "x": -1, "width": 276, "skin": "ui/common/window_frame_bak1.png", "height": 38 } }, { "type": "Image", "props": { "skin": "ui/common/money_xinghun.png", "y": 0, "x": 1, "width": 38, "height": 39 } }, { "type": "Label", "props": { "var": "_txtXingHun", "y": 8, "x": 47, "width": 180, "text": "label", "height": 22, "fontSize": 22, "color": "#dae8f5", "align": "center" } }] }, { "type": "Label", "props": { "y": 263, "x": 47, "width": 180, "text": "label", "height": 22, "fontSize": 22, "color": "#99a2b1" } }] }] };
        Welfare.DailyWelfarePartUI = DailyWelfarePartUI;
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        class GradeRewardPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("MyUI.Welfare.GradeItemRender", MyUI.Welfare.GradeItemRender);
                super.createChildren();
                this.createView(ui.Welfare.GradeRewardPartUI.uiView);
            }
        }
        GradeRewardPartUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 984, "height": 354 }, "child": [{ "type": "Image", "props": { "y": 9, "x": 9, "width": 966, "skin": "ui/common/window_frame_bak1.png", "height": 334, "sizeGrid": "8,8,8,8" } }, { "type": "List", "props": { "y": 16, "x": 17, "width": 954, "var": "_gradeList", "spaceY": 10, "repeatX": 1, "height": 324 }, "child": [{ "type": "GradeItemRender", "props": { "runtime": "MyUI.Welfare.GradeItemRender", "renderType": "render" } }] }] };
        Welfare.GradeRewardPartUI = GradeRewardPartUI;
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        class OnlineRewardPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                View.regComponent("MyUI.Welfare.OnlineItemRender", MyUI.Welfare.OnlineItemRender);
                super.createChildren();
                this.createView(ui.Welfare.OnlineRewardPartUI.uiView);
            }
        }
        OnlineRewardPartUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 984, "height": 354 }, "child": [{ "type": "Image", "props": { "y": 9, "x": 9, "width": 966, "skin": "ui/background/onlinereward_content.png", "height": 268 } }, { "type": "Button", "props": { "y": 287, "x": 795, "width": 180, "var": "_btnGet", "skin": "ui/common/btn_anniu.png", "label": "label", "height": 58, "sizeGrid": "8,10,8,10", "stateNum": 2, "labelColors": "#fcfafd,#fcfafd,#fcfafd,#cccec9", "labelSize": 24, "labelBold": "false" } }, { "type": "HTMLDivElement", "props": { "y": 306, "x": 9, "width": 680, "var": "_txtTime", "innerHTML": "htmlText", "height": 22 } }, { "type": "OnlineItemRender", "props": { "y": 23, "x": 45, "var": "_item0", "runtime": "MyUI.Welfare.OnlineItemRender" } }, { "type": "OnlineItemRender", "props": { "y": 23, "x": 285, "var": "_item1", "runtime": "MyUI.Welfare.OnlineItemRender" } }, { "type": "OnlineItemRender", "props": { "y": 23, "x": 525, "var": "_item2", "runtime": "MyUI.Welfare.OnlineItemRender" } }, { "type": "OnlineItemRender", "props": { "y": 23, "x": 765, "var": "_item3", "runtime": "MyUI.Welfare.OnlineItemRender" } }] };
        Welfare.OnlineRewardPartUI = OnlineRewardPartUI;
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
(function (ui) {
    var Welfare;
    (function (Welfare) {
        class SevenDayLoginPartUI extends View {
            constructor() { super(); }
            createChildren() {
                View.regComponent("ui.Welfare.Components.SevenLoginRewardItemUI", ui.Welfare.Components.SevenLoginRewardItemUI);
                super.createChildren();
                this.createView(ui.Welfare.SevenDayLoginPartUI.uiView);
            }
        }
        SevenDayLoginPartUI.uiView = { "type": "View", "props": { "width": 1280, "mouseThrough": true, "height": 720 }, "child": [{ "type": "Image", "props": { "y": 86, "x": 224, "width": 988, "skin": "ui/background/vip_youkuang.png", "sizeGrid": "5,5,5,5", "height": 610 } }, { "type": "Image", "props": { "y": 99, "x": 236, "width": 966, "skin": "ui/background/fuli_qiri_denglu_ditu.png", "height": 400 } }, { "type": "Image", "props": { "y": 155, "x": 683, "width": 512, "skin": "ui/background/fuli_qiri_denglu_zi.png", "height": 256 } }, { "type": "Label", "props": { "y": 378, "x": 757, "width": 400, "var": "_labDesc", "text": "label", "fontSize": 20, "color": "#F89247", "align": "center" } }, { "type": "List", "props": { "y": 516, "x": 250, "var": "_listSevenDay", "repeatX": 7 }, "child": [{ "type": "SevenLoginRewardItem", "props": { "runtime": "ui.Welfare.Components.SevenLoginRewardItemUI" } }] }] };
        Welfare.SevenDayLoginPartUI = SevenDayLoginPartUI;
    })(Welfare = ui.Welfare || (ui.Welfare = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map