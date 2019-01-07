
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import EffectAnimation = laya.display.EffectAnimation
module ui.ActivityPart {
    export class ActivityItemRenderUI extends Laya.Box {
		public _activityName:Laya.Label;
		public _text1:laya.html.dom.HTMLDivElement;
		public _text2:laya.html.dom.HTMLDivElement;
		public _giftsListBox:Laya.List;
		public _enterBtn:Laya.Button;
		public _fuBenTypeSpr:Laya.Image;
		public _fuBenType2Name:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":0,"renderType":"render","height":0},"child":[{"type":"Image","props":{"width":302,"skin":"ui/common/activity_renderbg.png","height":139}},{"type":"Label","props":{"y":10,"x":10,"var":"_activityName","fontSize":18,"color":"#9AAAC4"}},{"type":"HTMLDivElement","props":{"y":38,"x":10,"width":200,"var":"_text1","innerHTML":"htmlText","height":20}},{"type":"HTMLDivElement","props":{"y":58,"x":10,"width":200,"var":"_text2","innerHTML":"htmlText","height":20}},{"type":"List","props":{"y":87,"x":10,"var":"_giftsListBox"}},{"type":"Button","props":{"y":92,"x":193,"width":96,"var":"_enterBtn","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":16,"labelColors":"#DAE8F5","height":32,"sizeGrid":"8,10,8,10","labelBold":"false"}},{"type":"Image","props":{"y":0,"x":253,"width":47,"var":"_fuBenTypeSpr","skin":"ui/common/activity_bangpai_zi.png","height":35}},{"type":"Label","props":{"y":3,"x":254,"width":45,"var":"_fuBenType2Name","text":"必做","fontSize":16,"color":"#ffffff","align":"center"}}]};
        constructor(){ super();this.createUI(ui.ActivityPart.ActivityItemRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.ActivityPart {
    export class ActivityPartUI extends View {
		public _mxActivityItemRenderList:Laya.List;
		public _zcActivityItemRenderList:Laya.List;
		public _xsActivityItemRenderList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":88,"x":225,"width":986,"height":604},"child":[{"type":"Image","props":{"y":0,"x":0,"width":986,"skin":"ui/common/window_frame_bak.png","height":604,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":9,"x":7,"width":622,"skin":"ui/common/window_frame_bak1.png","height":540,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":12,"x":662,"width":316,"skin":"ui/common/window_frame_bak1.png","height":588,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":9,"x":658,"width":314,"skin":"ui/common/window_title_bak2.png","height":54}},{"type":"List","props":{"y":17,"x":15,"width":607,"var":"_mxActivityItemRenderList","spaceY":5,"spaceX":5,"repeatX":2,"renderType":"render","height":530},"child":[{"type":"ActivityItemRender","props":{"runtime":"MyUI.ActivityItemRender","renderType":"render"}}]},{"type":"List","props":{"y":17,"x":15,"width":607,"var":"_zcActivityItemRenderList","spaceY":5,"spaceX":5,"repeatX":2,"renderType":"render","height":530},"child":[{"type":"ActivityItemRender","props":{"runtime":"MyUI.ActivityItemRender","renderType":"render"}}]},{"type":"List","props":{"y":71,"x":671.5,"width":300,"var":"_xsActivityItemRenderList","spaceY":5,"renderType":"render","height":525},"child":[{"type":"ActivityItemRender","props":{"runtime":"MyUI.ActivityItemRender","renderType":"render"}}]},{"type":"Label","props":{"y":22,"x":768,"width":100,"text":"活动提醒","fontSize":24,"color":"#BCDDFF","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.ActivityItemRender",MyUI.ActivityItemRender);

            super.createChildren();
            this.createView(ui.ActivityPart.ActivityPartUI.uiView);

        }

    }
}

module ui.Animations {
    export class HurtNumberUI extends EffectAnimation {
		public Left:Laya.FrameAnimation;
		public right:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Text","props":{"y":0,"x":0,"width":120,"text":"100.5万","pivotY":16,"pivotX":60,"height":32,"fontSize":32,"color":"#ffe000","align":"center"},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"y":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":3},{"value":-16,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":8},{"value":-6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":13}],"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":8},{"value":-8,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":13}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":8}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":8}],"alpha":[{"value":0.6,"tweenMethod":"strongOut","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":13}]}}],"name":"Left","id":1,"frameRate":60,"action":0},{"nodes":[{"target":2,"keyframes":{"y":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":3},{"value":-16,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":8},{"value":-6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"y","index":13}],"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":8},{"value":8,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":13}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":8}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":8}],"alpha":[{"value":0.6,"tweenMethod":"strongOut","tween":true,"target":2,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":3},{"value":0.6,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"alpha","index":13}]}}],"name":"right","id":1,"frameRate":60,"action":0}]};
        constructor(){ super();this.effectData =ui.Animations.HurtNumberUI.uiView;}
    }
}

module ui {
    export class BaseWindowUI extends Dialog {
		public _btnClose:Laya.Button;
		public _txtTitle:Laya.Label;
		public _lstTab:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":1280,"popupCenter":true,"height":720},"child":[{"type":"Image","props":{"y":20,"x":55,"width":1170,"skin":"ui/common/window_plate_bak.png","height":678,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":20,"x":55,"width":1170,"skin":"ui/common/window_title_bak.png","height":58}},{"type":"Image","props":{"y":85,"x":56,"width":160,"skin":"ui/common/window_tab_bak.png","height":612,"sizeGrid":"0,10,0,10"}},{"type":"Button","props":{"y":35,"x":1177,"var":"_btnClose","stateNum":1,"skin":"ui/common/btn_close.png","name":"close"}},{"type":"Label","props":{"y":34,"x":515,"width":250,"var":"_txtTitle","height":30,"fontSize":30,"color":"#d6dfe8","align":"center"}},{"type":"List","props":{"y":85,"x":56,"width":160,"var":"_lstTab","spaceY":2,"height":610},"child":[{"type":"TabItemRender","props":{"runtime":"MyUI.TabItemRender","renderType":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TabItemRender",MyUI.TabItemRender);

            super.createChildren();
            this.createView(ui.BaseWindowUI.uiView);

        }

    }
}

module ui.Business {
    export class BusinessGoodsBoxUI extends Laya.Box {
		public _ItemHuoBi:MyUI.HuoBiItem;
		public _textTiShi:Laya.Label;
		public _listGoods:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":985,"height":525},"child":[{"type":"HuoBiItem","props":{"y":0,"x":10,"var":"_ItemHuoBi","runtime":"MyUI.HuoBiItem"}},{"type":"Label","props":{"y":14,"x":261,"width":500,"var":"_textTiShi","text":"label","fontSize":20,"color":"#99A2B1"}},{"type":"List","props":{"y":60,"x":22.5,"width":950,"var":"_listGoods","spaceY":5,"spaceX":10,"renderType":"render","height":460}}]};
        constructor(){ super();this.createUI(ui.Business.BusinessGoodsBoxUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("MyUI.HuoBiItem",MyUI.HuoBiItem);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Business {
    export class BusinessPartUI extends Dialog {
		public _tabDouQi:MyUI.TabItemRender;
		public _tabBangHui:MyUI.TabItemRender;
		public _tabXunLong:MyUI.TabItemRender;
		public _boxDouQi:MyUI.BusinessGoodsBox;
		public _boxBangHui:MyUI.BusinessGoodsBox;
		public _boxXunLong:MyUI.BusinessGoodsBox;

        public static  uiView:any ={"type":"Dialog","props":{"y":94,"x":226,"width":985,"height":594},"child":[{"type":"Box","props":{"width":985,"mouseThrough":true,"height":594},"child":[{"type":"Image","props":{"y":69,"width":988,"skin":"ui/common/window_frame_bak.png","height":535,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":117,"x":11,"width":965,"skin":"ui/common/window_frame_bak1.png","height":475,"sizeGrid":"8,8,8,8"}},{"type":"HBox","props":{},"child":[{"type":"TabItemRender","props":{"width":200,"var":"_tabDouQi","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":200,"var":"_tabBangHui","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":200,"var":"_tabXunLong","runtime":"MyUI.TabItemRender","height":56}}]},{"type":"BusinessGoodsBox","props":{"y":69,"var":"_boxDouQi","runtime":"MyUI.BusinessGoodsBox"}},{"type":"BusinessGoodsBox","props":{"y":69,"var":"_boxBangHui","runtime":"MyUI.BusinessGoodsBox"}},{"type":"BusinessGoodsBox","props":{"y":69,"var":"_boxXunLong","runtime":"MyUI.BusinessGoodsBox"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TabItemRender",MyUI.TabItemRender);
			View.regComponent("MyUI.BusinessGoodsBox",MyUI.BusinessGoodsBox);

            super.createChildren();
            this.createView(ui.Business.BusinessPartUI.uiView);

        }

    }
}

module ui.Business.Components {
    export class BusinessGoodsRenderUI extends Laya.Box {
		public _textGoodsName:laya.html.dom.HTMLDivElement;
		public _goodsIcon:MyUI.GoodsIcon;
		public _textCondition:Laya.Label;
		public _btnBuy:Laya.Button;
		public _imageMoneyType:Laya.Image;
		public _textGoodsPrice:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":180,"height":236},"child":[{"type":"Image","props":{"y":0,"x":0,"width":180,"skin":"ui/common/window_tab_bak.png","sizeGrid":"5,5,5,5","height":236}},{"type":"Image","props":{"y":151,"x":2,"width":176,"skin":"ui/common/window_frame_bak2.png","sizeGrid":"5,5,5,5","height":82}},{"type":"HTMLDivElement","props":{"y":11,"x":0,"width":180,"var":"_textGoodsName","height":24}},{"type":"GoodsIcon","props":{"y":46,"x":48,"var":"_goodsIcon","runtime":"MyUI.GoodsIcon"}},{"type":"Label","props":{"y":160,"x":11,"width":160,"var":"_textCondition","height":24,"fontSize":20,"color":"#DAE8F5","align":"center"}},{"type":"Button","props":{"y":190,"x":10,"width":160,"var":"_btnBuy","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":24,"height":40,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Image","props":{"y":189,"x":23,"width":40,"var":"_imageMoneyType","mouseThrough":true,"height":40}},{"type":"Label","props":{"y":197,"x":55,"width":110,"var":"_textGoodsPrice","text":"label","mouseThrough":true,"height":24,"fontSize":22,"color":"#DAE8F5","align":"center"}}]};
        constructor(){ super();this.createUI(ui.Business.Components.BusinessGoodsRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Components {
    export class GoodsIconUI extends Laya.Box {
		public _imgBack1:Laya.Image;
		public _imgIcon:Laya.Image;
		public _imgQuality:Laya.Image;
		public _imgTime:Laya.Image;
		public _imgBinding:Laya.Image;
		public _imgComparison:Laya.Image;
		public _txtContent:Laya.Label;
		public _txtCount:Laya.Label;
		public _imgState:Laya.Image;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":81,"height":81},"child":[{"type":"Image","props":{"y":1,"x":1,"width":79,"skin":"ui/common/icon_bg_grid.png","height":79}},{"type":"Image","props":{"y":1,"x":1,"width":79,"var":"_imgBack1","skin":"ui/common/icon_bg_zhuangbeidi.png","height":79}},{"type":"Image","props":{"y":8,"x":8,"width":64,"var":"_imgIcon","height":64}},{"type":"Image","props":{"y":1,"x":1,"width":81,"var":"_imgQuality","skin":"ui/common/icon_quality_lan.png","height":81}},{"type":"Image","props":{"y":2,"x":2,"var":"_imgTime","skin":"ui/common/icon_state_time.png"}},{"type":"Image","props":{"y":56,"x":2,"var":"_imgBinding","skin":"ui/common/icon_state_binding.png"}},{"type":"Image","props":{"y":60,"x":59,"var":"_imgComparison","skin":"ui/common/icon_state_up.png"}},{"type":"Label","props":{"y":4,"x":6,"width":70,"var":"_txtContent","overflow":"hidden","height":14,"fontSize":14,"color":"#dae8f5","align":"right"}},{"type":"Label","props":{"y":60,"x":6,"width":70,"var":"_txtCount","overflow":"hidden","height":16,"fontSize":16,"color":"#dae8f5","align":"right"}},{"type":"Image","props":{"x":0,"width":81,"var":"_imgState","height":81}}]};
        constructor(){ super();this.createUI(ui.Components.GoodsIconUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Components {
    export class HudTextUI extends EffectAnimation {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{},"compId":1,"child":[{"type":"Image","props":{"y":-4,"x":0,"skin":"ui/common/money_lingjing.png","scaleY":1.4,"scaleX":1.4,"blendMode":"","alpha":1},"compId":3}],"animations":[{"nodes":[{"target":3,"keyframes":{"y":[{"value":23,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":0},{"value":-2,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":2},{"value":-4,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":4},{"value":19,"tweenMethod":"linearNone","tween":true,"target":3,"key":"y","index":10}],"x":[{"value":23,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"x","index":10}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":2},{"value":1.4,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":4},{"value":3,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":7},{"value":5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":0},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":2},{"value":1.4,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":4},{"value":3,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":7},{"value":5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"scaleX","index":10}],"blendMode":[{"value":"","tweenMethod":"linearNone","tween":false,"target":3,"key":"blendMode","index":0}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorY","index":10}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":3,"key":"anchorX","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":1},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"alpha","index":30}]}},{"target":1,"keyframes":{"sceneColor":[{"value":"#000000","tweenMethod":"linearNone","tween":false,"target":1,"key":"sceneColor","index":0},{"value":"#d93634","tweenMethod":"linearNone","tween":false,"target":1,"key":"sceneColor","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super();this.effectData =ui.Components.HudTextUI.uiView;}
    }
}

module ui.Components {
    export class HuoBiItemUI extends Laya.Box {
		public _imageHuoBi:Laya.Image;
		public _textHuoBiNums:Laya.Label;
		public _btnJump:Laya.Button;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":216,"renderType":"render","height":48},"child":[{"type":"Image","props":{"y":8,"x":17,"width":196,"skin":"ui/common/money_bak.png","height":30,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":0,"width":46,"var":"_imageHuoBi","height":47}},{"type":"Label","props":{"y":12,"x":20,"width":180,"var":"_textHuoBiNums","text":"label","height":22,"fontSize":22,"color":"#A7B9CE","align":"center"}},{"type":"Button","props":{"y":6,"x":183,"width":32,"var":"_btnJump","stateNum":2,"skin":"ui/common/btn_jiahao.png","height":32}}]};
        constructor(){ super();this.createUI(ui.Components.HuoBiItemUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Components {
    export class MapPointUI extends Laya.Box {
		public _txtName:Laya.Label;
		public _imgPoint:Laya.Image;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":10,"height":10},"child":[{"type":"Label","props":{"y":-15,"x":0,"var":"_txtName","text":"label","fontSize":16,"color":"#dae8f5","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"var":"_imgPoint","skin":"ui/common/map_point_monster.png","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super();this.createUI(ui.Components.MapPointUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Components {
    export class RedDotUI extends Laya.Box {
		public _ani:Laya.Animation;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":18,"height":18},"child":[{"type":"Animation","props":{"y":8,"x":8,"width":0,"var":"_ani","source":"Animations/AniRedDot.ani","height":0}}]};
        constructor(){ super();this.createUI(ui.Components.RedDotUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Components {
    export class RoleCreatorItemUI extends View {
		public _btnRole:Laya.Button;
		public _btnAvatar:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":376,"runtime":"MyUI.RoleCreatorItem","height":73},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"_btnRole","toggle":true,"stateNum":2,"skin":"ui/login/btn_avatar.png","mouseEnabled":false,"labelSize":24,"labelPadding":"0,0,0,130","labelColors":"#797879,#ffffff,#ffffff,#797879","labelBold":true,"labelAlign":"left","label":"职业名称"},"child":[{"type":"Button","props":{"y":9,"x":43,"width":54,"var":"_btnAvatar","toggle":true,"stateNum":2,"mouseEnabled":false,"height":54}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.RoleCreatorItem",MyUI.RoleCreatorItem);

            super.createChildren();
            this.createView(ui.Components.RoleCreatorItemUI.uiView);

        }

    }
}

module ui.Components {
    export class RoleSelectorItemUI extends View {
		public _btnRole:Laya.Button;
		public _btnDelete:Laya.Button;
		public _txtLevel:Laya.Label;
		public _txtStatCreate:Laya.Label;
		public _btnAvatar:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":376,"height":73},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"_btnRole","toggle":true,"stateNum":2,"skin":"ui/login/btn_avatar.png","mouseEnabled":false,"labelSize":22,"labelPadding":"12,0,0,130","labelColors":"#797879,#ffffff,#ffffff,#797879","labelBold":true,"labelAlign":"left","label":"label"}},{"type":"Button","props":{"y":22,"x":310,"var":"_btnDelete","stateNum":2,"skin":"ui/login/btn_shanchu.png"}},{"type":"Label","props":{"y":14,"x":131,"var":"_txtLevel","text":"label","fontSize":18,"color":"#ffd460","bold":true,"align":"left"}},{"type":"Label","props":{"y":24,"x":130,"var":"_txtStatCreate","text":"? 创建角色","fontSize":24,"color":"#989393","bold":true}},{"type":"Button","props":{"y":9,"x":43,"width":54,"var":"_btnAvatar","toggle":true,"stateNum":2,"mouseEnabled":false,"height":54}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Components.RoleSelectorItemUI.uiView);

        }

    }
}

module ui.Components {
    export class TabItemRenderUI extends Laya.Box {
		public _btnTab:Laya.Button;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":160,"height":86},"child":[{"type":"Button","props":{"var":"_btnTab","top":0,"skin":"ui/common/btn_tab.png","right":0,"mouseEnabled":false,"left":0,"label":"label","bottom":0,"stateNum":2,"labelColors":"#737991,#d4dee9,#737991,#737991","labelSize":24,"toggle":"true","width":160,"height":86}}]};
        constructor(){ super();this.createUI(ui.Components.TabItemRenderUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.EquipFuBen.Components {
    export class EquipFuBenDifficultyItemUI extends Laya.Box {
		public _imageSelected:Laya.Image;
		public _imageFuBenDiff:Laya.Image;
		public _imageSuo:Laya.Image;
		public _textFuBenNums:Laya.Label;
		public _textFuBenDiffMode:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":230,"height":284},"child":[{"type":"Image","props":{"y":0,"x":0,"width":230,"skin":"ui/common/window_frame_bak6.png","height":284}},{"type":"Image","props":{"y":-5,"x":-3,"width":235,"var":"_imageSelected","skin":"ui/common/totem_kuang_xz_w.png","sizeGrid":"10,10,10,10","height":294}},{"type":"Image","props":{"width":230,"var":"_imageFuBenDiff","height":284}},{"type":"Image","props":{"y":6,"x":9,"width":36,"var":"_imageSuo","skin":"ui/common/activity_suo.png","height":36}},{"type":"Label","props":{"y":207,"x":5,"width":220,"var":"_textFuBenNums","fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":244,"x":41,"width":150,"var":"_textFuBenDiffMode","text":"难度模式","fontSize":24,"color":"#D6DFE8","align":"center"}}]};
        constructor(){ super();this.createUI(ui.EquipFuBen.Components.EquipFuBenDifficultyItemUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.EquipFuBen.Components {
    export class EquipFuBenItemRenderUI extends Laya.Box {
		public _imageFuBenItem:Laya.Image;
		public _imageSelected:Laya.Image;
		public _imageSuo:Laya.Image;
		public _textFuBenName:Laya.Label;
		public _textFuBenNeedLevel:Laya.Label;
		public _textFuBenJie:Laya.Label;
		public _textFuBenPuTongNums:Laya.Label;
		public _textFuBenKunNanNums:Laya.Label;
		public _textFuBenLianYuNums:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":389,"height":130},"child":[{"type":"Image","props":{"width":394,"var":"_imageFuBenItem","skin":"ui/common/700.png","height":135}},{"type":"Image","props":{"y":0,"x":0,"width":389,"var":"_imageSelected","skin":"ui/common/fuben_item_xuanzhong.png","sizeGrid":"18,18,18,18","height":130}},{"type":"Image","props":{"y":19,"x":302,"width":54,"var":"_imageSuo","skin":"ui/common/activity_suo.png","height":54}},{"type":"Image","props":{"y":-1,"x":-1,"width":33,"skin":"ui/common/fuben_qizi.png","height":55}},{"type":"Label","props":{"y":23,"x":49,"width":150,"var":"_textFuBenName","text":"完成次数","strokeColor":"#060606","stroke":-1,"fontSize":28,"color":"#D4DEE9","bold":true,"align":"left"}},{"type":"Label","props":{"y":56,"x":49,"width":150,"var":"_textFuBenNeedLevel","text":"难度模式","fontSize":20,"color":"#D6DFE8","align":"left"}},{"type":"Label","props":{"y":4,"x":6,"wordWrap":true,"width":19,"var":"_textFuBenJie","valign":"top","text":"1阶","strokeColor":"#080808","stroke":-1,"height":38,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":105,"x":91,"width":50,"var":"_textFuBenPuTongNums","text":"0/2","fontSize":18,"color":"#D4DEE9","align":"left"}},{"type":"Label","props":{"y":105,"x":208,"width":50,"var":"_textFuBenKunNanNums","text":"0/2","fontSize":18,"color":"#D4DEE9","align":"left"}},{"type":"Label","props":{"y":105,"x":312,"width":50,"var":"_textFuBenLianYuNums","text":"0/2","fontSize":18,"color":"#D4DEE9","align":"left"}}]};
        constructor(){ super();this.createUI(ui.EquipFuBen.Components.EquipFuBenItemRenderUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.EquipFuBen {
    export class EquipFuBenInfoBoxUI extends Laya.Box {
		public _boxFuBenDiff:Laya.Box;
		public _itemModePT:MyUI.EquipFuBenDifficultyItem;
		public _itemModeKN:MyUI.EquipFuBenDifficultyItem;
		public _itemModeLY:MyUI.EquipFuBenDifficultyItem;
		public _boxFuBenText:Laya.Box;
		public _textFuBenLevel:Laya.Label;
		public _textFuBenZhanLiNums:Laya.Label;
		public _textFuBenRequire:Laya.Label;
		public _textFuBenFastestTG:Laya.Label;
		public _textFuBenFastestTGTimes:Laya.Label;
		public _textFuBenMyFastestTG:Laya.Label;
		public _textFuBenMyFastestTGTimes:Laya.Label;
		public _listFuBenDrop:Laya.List;
		public _btnSweeping:Laya.Button;
		public _btnEnter:Laya.Button;
		public _checkDouQiHuiShou:Laya.CheckBox;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":746,"height":606},"child":[{"type":"Image","props":{"y":444,"x":18,"width":712,"skin":"ui/common/window_plate_bak.png","height":80,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":349,"x":18,"width":712,"skin":"ui/common/window_plate_bak.png","height":44,"sizeGrid":"10,10,10,10"}},{"type":"Box","props":{"var":"_boxFuBenDiff"},"child":[{"type":"EquipFuBenDifficultyItem","props":{"y":15,"x":18,"var":"_itemModePT","runtime":"MyUI.EquipFuBenDifficultyItem"}},{"type":"EquipFuBenDifficultyItem","props":{"y":15,"x":261,"var":"_itemModeKN","runtime":"MyUI.EquipFuBenDifficultyItem"}},{"type":"EquipFuBenDifficultyItem","props":{"y":15,"x":501,"var":"_itemModeLY","runtime":"MyUI.EquipFuBenDifficultyItem"}}]},{"type":"Box","props":{"var":"_boxFuBenText"},"child":[{"type":"Label","props":{"y":315,"x":20,"text":"``384","fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":361,"x":32,"width":101,"text":"``1377","height":20,"fontSize":20,"color":"#6A758F"}},{"type":"Label","props":{"y":361,"x":256,"width":101,"text":"``276","height":20,"fontSize":20,"color":"#6A758F"}},{"type":"Label","props":{"y":361,"x":457,"width":101,"text":"``1378","height":20,"fontSize":20,"color":"#6A758F"}},{"type":"Label","props":{"y":361,"x":130,"width":131,"var":"_textFuBenLevel","text":"副本信息","height":20,"fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":361,"x":359,"width":131,"var":"_textFuBenZhanLiNums","text":"副本信息","height":20,"fontSize":20,"color":"#DAE8F5"}},{"type":"Label","props":{"y":361,"x":559,"width":131,"var":"_textFuBenRequire","text":"副本信息","height":20,"fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":411,"x":20,"text":"``1374","fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":542,"x":20,"text":"``1375","fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":542,"x":117,"width":131,"var":"_textFuBenFastestTG","text":"副本信息","height":20,"fontSize":20,"color":"#DAE8F5"}},{"type":"Label","props":{"y":542,"x":287,"width":65,"var":"_textFuBenFastestTGTimes","text":"副本信息","height":20,"fontSize":20,"color":"#DAE8F5"}},{"type":"Label","props":{"y":572,"x":20,"text":"``1376","fontSize":20,"color":"#82A7CC"}},{"type":"Label","props":{"y":572,"x":117,"width":131,"var":"_textFuBenMyFastestTG","text":"副本信息","height":20,"fontSize":20,"color":"#DAE8F5"}},{"type":"Label","props":{"y":572,"x":287,"width":65,"var":"_textFuBenMyFastestTGTimes","text":"副本信息","height":20,"fontSize":20,"color":"#DAE8F5"}}]},{"type":"List","props":{"y":450,"x":25,"width":700,"var":"_listFuBenDrop","height":80}},{"type":"Button","props":{"y":539,"x":355,"width":180,"var":"_btnSweeping","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"``663","height":58,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":539,"x":549,"width":180,"var":"_btnEnter","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"``241","height":58,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"CheckBox","props":{"y":547,"x":-392,"var":"_checkDouQiHuiShou","stateNum":2,"skin":"ui/common/check_style.png","labelSize":20,"labelColors":"#afc0d1,#afc0d1,#afc0d1,#afc0d1","labelPadding":"9,0,0,9"}}]};
        constructor(){ super();this.createUI(ui.EquipFuBen.EquipFuBenInfoBoxUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("MyUI.EquipFuBenDifficultyItem",MyUI.EquipFuBenDifficultyItem);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.EquipFuBen {
    export class EquipFuBenListBoxUI extends Laya.Box {
		public _listFuBenItemRender:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":396,"height":530},"child":[{"type":"List","props":{"width":396,"var":"_listFuBenItemRender","spaceY":5,"renderType":"render","height":530}}]};
        constructor(){ super();this.createUI(ui.EquipFuBen.EquipFuBenListBoxUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.EquipFuBen {
    export class EquipFuBenPartUI extends Dialog {
		public _boxFuBenList:MyUI.EquipFuBenListBox;
		public _boxFuBenInfo:MyUI.EquipFuBenInfoBox;
		public _btnClose:Laya.Button;
		public _textTitle:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":91,"x":67},"child":[{"type":"Image","props":{"y":-61,"x":-2,"width":1170,"skin":"ui/common/window_title_bak.png","height":58}},{"type":"Image","props":{"y":-61,"x":-2,"width":1170,"skin":"ui/common/window_plate_bak.png","height":678,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":1,"x":0,"width":398,"skin":"ui/common/window_frame_bak.png","height":612,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":6,"x":407,"width":746,"skin":"ui/common/window_frame_bak.png","height":606,"sizeGrid":"20,20,20,20"}},{"type":"EquipFuBenListBox","props":{"y":7,"x":3,"var":"_boxFuBenList","runtime":"MyUI.EquipFuBenListBox"}},{"type":"EquipFuBenInfoBox","props":{"y":7,"x":408,"var":"_boxFuBenInfo","runtime":"MyUI.EquipFuBenInfoBox"}},{"type":"Button","props":{"y":-46,"x":1120,"var":"_btnClose","stateNum":1,"skin":"ui/common/btn_close.png"}},{"type":"Label","props":{"y":-46,"x":535,"width":100,"var":"_textTitle","fontSize":30,"color":"#D6DFE8","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.EquipFuBenListBox",MyUI.EquipFuBenListBox);
			View.regComponent("MyUI.EquipFuBenInfoBox",MyUI.EquipFuBenInfoBox);

            super.createChildren();
            this.createView(ui.EquipFuBen.EquipFuBenPartUI.uiView);

        }

    }
}

module ui.FirstRecharge {
    export class FirstRechargePartUI extends Dialog {
		public _btnClose:Laya.Button;
		public _imageYiLingQu:Laya.Image;
		public _btnGetReward:Laya.Button;
		public _btnChongZhi:Laya.Button;
		public _listGoods:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":44,"x":79,"skin":"ui/background/frist_chongzhi_bg.png"}},{"type":"Image","props":{"y":532,"x":245,"width":274,"skin":"ui/background/frist_chongzhi_zhandouli.png","height":48}},{"type":"Button","props":{"y":148,"x":1027,"width":77,"var":"_btnClose","stateNum":2,"skin":"ui/common/btn_frist_chongzhi_close.png","height":82}},{"type":"Image","props":{"y":547,"x":706,"width":152,"var":"_imageYiLingQu","skin":"ui/common/first_chongzhi_yilingqu.png","height":50}},{"type":"Button","props":{"y":542,"x":692,"width":181,"var":"_btnGetReward","stateNum":2,"skin":"ui/common/btn_frist_chongzhi_lingqu.png","labelStrokeColor":"#1b0f0e","labelStroke":1,"labelSize":28,"labelPadding":"2","labelColors":"#FCFAFD","height":60}},{"type":"Button","props":{"y":542,"x":692,"var":"_btnChongZhi","stateNum":2,"skin":"ui/common/btn_frist_chongzhi_lingqu.png","labelStrokeColor":"#1b0f0e","labelStroke":1,"labelSize":28,"labelPadding":"2","labelColors":"#FCFAFD"}},{"type":"List","props":{"y":362,"x":560,"width":"100","var":"_listGoods","repeatX":5,"height":"100"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.FirstRecharge.FirstRechargePartUI.uiView);

        }

    }
}

module ui.FunOpenTiShi {
    export class FunOpenTiShiPartUI extends Dialog {
		public _textImage:Laya.Image;
		public _textDesc:Laya.Label;
		public _textFinish:Laya.Label;
		public _getGoodIcon:MyUI.GoodsIcon;
		public _getRewardBtn:Laya.Button;
		public _showImage:Laya.Image;
		public _btnClose:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":196,"x":280,"width":722,"skin":"ui/background/funopen_ditu.png","sizeGrid":"0,10,0,382","height":323}},{"type":"Image","props":{"y":286,"x":254,"width":459,"skin":"ui/common/funopentishi_xian.png","sizeGrid":"0,10,0,382","height":2}},{"type":"Image","props":{"y":217,"x":359,"width":250,"var":"_textImage","height":62}},{"type":"Label","props":{"y":297,"x":303,"wordWrap":true,"width":380,"var":"_textDesc","height":50,"fontSize":20,"color":"#9dd0fd"}},{"type":"Label","props":{"y":470,"x":374,"width":230,"var":"_textFinish","fontSize":20,"color":"#aab7cc","align":"center"}},{"type":"GoodsIcon","props":{"y":363,"x":444,"var":"_getGoodIcon","runtime":"MyUI.GoodsIcon"}},{"type":"Button","props":{"y":460,"x":426,"width":120,"var":"_getRewardBtn","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":20,"height":40,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Image","props":{"y":199,"x":689,"width":316,"var":"_showImage","height":323}},{"type":"Button","props":{"y":203,"x":980,"width":20,"var":"_btnClose","stateNum":1,"skin":"ui/common/btn_close.png","height":20}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            super.createChildren();
            this.createView(ui.FunOpenTiShi.FunOpenTiShiPartUI.uiView);

        }

    }
}

module ui {
    export class LoadingViewUI extends View {
		public imgBg:Laya.Image;
		public compProgress:Laya.ProgressBar;
		public txtProgress:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"var":"imgBg","top":0,"skin":"ui/background/img_loading_bg.jpg","right":0,"left":0,"bottom":0}},{"type":"ProgressBar","props":{"width":960,"var":"compProgress","value":0,"skin":"ui/loading/progress_loading.png","sizeGrid":"4,8,4,8","height":16,"centerX":0,"bottom":70},"child":[{"type":"Label","props":{"y":26,"x":0,"text":"游戏载入中","fontSize":28,"color":"#fdffff","bold":true}},{"type":"Label","props":{"y":30,"x":138,"text":"（此过程不消耗流量）","fontSize":24,"color":"#99a2b1","bold":true}},{"type":"Label","props":{"y":24,"x":860,"width":100,"var":"txtProgress","text":"0%","height":32,"fontSize":28,"color":"#fdffff","bold":true,"align":"right"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoadingViewUI.uiView);

        }

    }
}

module ui.login {
    export class LoginViewUI extends View {
		public imgBg:Laya.Image;
		public textAccount:Laya.TextInput;
		public textPassward:Laya.TextInput;
		public btnRegister:Laya.Button;
		public btnSpeedy:Laya.Button;
		public btnLogin:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"var":"imgBg","top":0,"skin":"ui/background/img_denglu_bg.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"width":1042,"renderType":"render","height":540,"centerY":1,"centerX":0},"child":[{"type":"Image","props":{"y":264,"x":310,"width":478,"skin":"ui/login/input_256x52.png","name":"账号","height":52},"child":[{"type":"TextInput","props":{"y":-4,"x":105,"width":431,"var":"textAccount","type":"text","multiline":false,"mouseEnabled":true,"maxChars":32,"height":60,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":10,"x":34,"width":93,"text":"账号:","mouseEnabled":false,"height":37,"fontSize":26,"font":"Microsoft YaHei","color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":328,"x":310,"width":478,"skin":"ui/login/input_256x52.png","name":"密码","height":52},"child":[{"type":"TextInput","props":{"y":-4,"x":104,"width":429,"var":"textPassward","type":"password","multiline":false,"mouseEnabled":true,"height":60,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":10,"x":34,"width":93,"text":"密码:","height":37,"fontSize":26,"font":"Microsoft YaHei","color":"#ffffff","bold":true}}]},{"type":"Button","props":{"y":459,"x":0,"width":310,"var":"btnRegister","stateNum":2,"skin":"ui/login/btn_anniu_lan.png","labelStrokeColor":"#7d7d7d","labelStroke":0,"labelSize":26,"labelPadding":"0","labelFont":"Microsoft YaHei","labelColors":"#ffffff,#ffffff,#ffffff,#7d7d7d","labelBold":true,"label":"注册账号","height":72,"disabled":true}},{"type":"Button","props":{"y":459,"x":366,"width":310,"var":"btnSpeedy","stateNum":2,"skin":"ui/login/btn_anniu_lan.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":26,"labelPadding":"0","labelFont":"Microsoft YaHei","labelColors":"#ffffff,#ffffff,#ffffff","labelBold":true,"label":"快速登录","height":72}},{"type":"Button","props":{"y":459,"x":731,"width":310,"var":"btnLogin","stateNum":2,"skin":"ui/login/btn_anniu_lan.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":26,"labelPadding":"0","labelFont":"Microsoft YaHei","labelColors":"#ffffff,#ffffff,#ffffff","labelBold":true,"label":"登录游戏","height":72}},{"type":"Image","props":{"y":0,"x":291,"skin":"ui/background/logo.png","name":"龙图标"}}]},{"type":"Label","props":{"text":"抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防受骗上当  适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活","fontSize":16,"font":"Microsoft YaHei","color":"#ffffff","centerX":0,"bottom":13,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.login.LoginViewUI.uiView);

        }

    }
}

module ui.login {
    export class RoleCreatorUI extends View {
		public _btnReturn:Laya.Button;
		public _inputName:Laya.TextInput;
		public _btnRandom:Laya.Button;
		public _btnCreate:Laya.Button;
		public _imgBadge:Laya.Image;
		public _txtOccuName:Laya.Label;
		public _txtOccuInfo:Laya.Label;
		public _boxOccu:Laya.VBox;
		public comLongDan:MyUI.RoleCreatorItem;
		public comHuaLing:MyUI.RoleCreatorItem;
		public comQiaoGong:MyUI.RoleCreatorItem;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Button","props":{"width":187,"var":"_btnReturn","top":10,"stateNum":1,"skin":"ui/login/btn_fanhui.png","left":16,"labelSize":28,"labelFont":"Microsoft YaHei","labelColors":"#e2e8ee,#e2e8ee,#e2e8ee,#e2e8ee","labelBold":true,"labelAlign":"right","label":"选择角色","height":43,"sizeGrid":"0,0,0,56"}},{"type":"TextInput","props":{"width":310,"var":"_inputName","type":"text","skin":"ui/login/input_300x50.png","promptColor":"#3e3e3e","prompt":"输入角色名称","padding":"0,60,0,10","overflow":"hidden","height":56,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","centerX":0,"bottom":46,"bold":true,"align":"left","sizeGrid":"14,16,14,16"},"child":[{"type":"Button","props":{"y":8,"x":257,"var":"_btnRandom","stateNum":1,"skin":"ui/login/btn_dice.png"}}]},{"type":"Box","props":{"right":66,"bottom":40},"child":[{"type":"Button","props":{"y":230,"x":6,"var":"_btnCreate","stateNum":2,"skin":"ui/login/btn_anniu_lv.png","labelSize":30,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"创建角色"}},{"type":"Image","props":{"y":-276,"x":47,"width":228,"var":"_imgBadge","height":262}},{"type":"Label","props":{"y":0,"x":0,"width":109,"var":"_txtOccuName","text":"龙胆","height":45,"fontSize":30,"font":"Microsoft YaHei","color":"#987139","bold":true,"align":"left"}},{"type":"Label","props":{"y":49,"wordWrap":true,"width":321,"var":"_txtOccuInfo","text":"夸父族的勇士，拥有无与伦比的强大力量.无人可在力量愤怒的释放下逃生，他们手中的拒付手中的拒付手中的拒付","leading":4,"height":130,"fontSize":20,"font":"Microsoft YaHei","color":"#a0a8ac","bold":true,"align":"left"}}]},{"type":"VBox","props":{"var":"_boxOccu","top":120,"space":40,"left":0},"child":[{"type":"RoleCreatorItem","props":{"var":"comLongDan","runtime":"MyUI.RoleCreatorItem"}},{"type":"RoleCreatorItem","props":{"var":"comHuaLing","runtime":"MyUI.RoleCreatorItem"}},{"type":"RoleCreatorItem","props":{"var":"comQiaoGong","runtime":"MyUI.RoleCreatorItem"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.RoleCreatorItem",MyUI.RoleCreatorItem);

            super.createChildren();
            this.createView(ui.login.RoleCreatorUI.uiView);

        }

    }
}

module ui.login {
    export class RoleSelectorUI extends View {
		public _btnReturn:Laya.Button;
		public _btnEnter:Laya.Button;
		public _txtOccuName:Laya.Label;
		public _txtOccuInfo:Laya.Label;
		public _txtDelRemainingSec:Laya.Label;
		public _imgBadge:Laya.Image;
		public _boxOccu:Laya.VBox;
		public _itmRole0:MyUI.RoleSelectorItem;
		public _itmRole1:MyUI.RoleSelectorItem;
		public _itmRole2:MyUI.RoleSelectorItem;
		public _itmRole3:MyUI.RoleSelectorItem;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Button","props":{"width":184,"var":"_btnReturn","top":10,"stateNum":1,"skin":"ui/login/btn_fanhui.png","left":16,"labelSize":28,"labelColors":"#e2e8ee,#e2e8ee,#e2e8ee,#e2e8ee","labelBold":true,"labelAlign":"right","label":"返回登录","height":43,"sizeGrid":"0,0,0,56"}},{"type":"Box","props":{"right":66,"bottom":40},"child":[{"type":"Button","props":{"y":230,"x":6,"var":"_btnEnter","stateNum":2,"skin":"ui/login/btn_anniu_lv.png","labelSize":30,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"进入游戏"}},{"type":"Label","props":{"var":"_txtOccuName","text":"龙胆","fontSize":30,"color":"#987139","bold":true,"align":"left"}},{"type":"Label","props":{"y":49,"wordWrap":true,"width":321,"var":"_txtOccuInfo","text":"夸父族的勇士，拥有无与伦比的强大力量.无人可在力量愤怒的释放下逃生，他们手中的拒付手中的拒付手中的拒付","leading":4,"height":130,"fontSize":20,"color":"#a0a8ac","bold":true,"align":"left"}},{"type":"Label","props":{"y":257,"x":17,"width":288,"var":"_txtDelRemainingSec","text":"删除中...","height":18,"fontSize":20,"color":"#ec0000","bold":true,"align":"center"}},{"type":"Image","props":{"y":-276,"x":47,"width":228,"var":"_imgBadge","height":262}}]},{"type":"VBox","props":{"var":"_boxOccu","top":120,"space":40,"left":0},"child":[{"type":"RoleSelectorItem","props":{"var":"_itmRole0","runtime":"MyUI.RoleSelectorItem"}},{"type":"RoleSelectorItem","props":{"var":"_itmRole1","runtime":"MyUI.RoleSelectorItem"}},{"type":"RoleSelectorItem","props":{"y":113,"x":0,"var":"_itmRole2","runtime":"MyUI.RoleSelectorItem"}},{"type":"RoleSelectorItem","props":{"y":113,"x":0,"var":"_itmRole3","runtime":"MyUI.RoleSelectorItem"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.RoleSelectorItem",MyUI.RoleSelectorItem);

            super.createChildren();
            this.createView(ui.login.RoleSelectorUI.uiView);

        }

    }
}

module ui.MainUI {
    export class MainFunOpenTiShiUI extends Laya.Box {
		public _tishiName:laya.html.dom.HTMLDivElement;
		public _tiShiImage:Laya.Image;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":294,"renderType":"render","height":58},"child":[{"type":"Image","props":{"width":294,"skin":"ui/common/funopentishi_tishidi.png","sizeGrid":"5,5,5,5","height":58}},{"type":"HTMLDivElement","props":{"y":10,"x":35,"width":200,"var":"_tishiName","height":39}},{"type":"Image","props":{"y":8,"x":243,"width":42,"var":"_tiShiImage","height":42}}]};
        constructor(){ super();this.createUI(ui.MainUI.MainFunOpenTiShiUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class MainSkillIconUI extends Laya.Box {
		public _imgIcon:Laya.Image;
		public _imgBg:Laya.Image;
		public _imgLock:Laya.Image;
		public _txtCooldown:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":42,"x":42,"width":84,"height":84,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":42,"x":42,"width":78,"var":"_imgIcon","height":78,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":42,"x":42,"var":"_imgBg","skin":"ui/main/img_bg_skill.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":21,"var":"_imgLock","skin":"ui/common/skill_suo_liang.png"}},{"type":"Label","props":{"y":42,"x":41,"width":60,"var":"_txtCooldown","strokeColor":"#000000","stroke":1,"height":30,"fontSize":30,"color":"#ffffff","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};
        constructor(){ super();this.createUI(ui.MainUI.MainSkillIconUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class MainViewUI extends View {
		public _redDotRefer:MyUI.RedDot;
		public _radarMap:MyUI.RadarMap;
		public _topGroup1:Laya.Box;
		public _topGroup2:Laya.Box;
		public _funOpenTiShiBox:MyUI.MainFunOpenTiShi;
		public _groupFun:Laya.Box;
		public _btnSwitch:Laya.Button;
		public _rightGroup1:Laya.Box;
		public _imgNet:Laya.Image;
		public _progBarBattery:Laya.ProgressBar;
		public _progBarExp:Laya.ProgressBar;
		public _txtExp:Laya.Label;
		public _bottomRightGroup:Laya.Box;
		public _groupSkill:Laya.Box;
		public _btnPage:Laya.Button;
		public _skillIcon0:MyUI.MainSkillIcon;
		public _skillIcon1:MyUI.MainSkillIcon;
		public _skillIcon2:MyUI.MainSkillIcon;
		public _skillIcon3:MyUI.MainSkillIcon;
		public _skillIcon4:MyUI.MainSkillIcon;
		public _btnNpcTalk:Laya.Button;
		public _meditationHint:Laya.Box;
		public _miniTask:LogicTask.TaskBoxMini;
		public _headLeader:MyUI.RoleHeadPart;
		public _headMonster:MyUI.MonsterHeadPart;
		public _headNetPlayer:MyUI.ObjectRoleFacePart;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"RedDot","props":{"y":25,"x":25,"var":"_redDotRefer","runtime":"MyUI.RedDot"}},{"type":"Box","props":{"y":17,"x":1118,"top":17,"right":12,"name":"GroupTop"},"child":[{"type":"RadarMap","props":{"y":-10,"x":-14,"var":"_radarMap","runtime":"MyUI.RadarMap"}},{"type":"Button","props":{"y":32,"x":-34,"width":40,"stateNum":1,"skin":"ui/main/btn_func_setting.png","height":40}},{"type":"Button","props":{"y":89,"x":-31,"width":40,"stateNum":1,"skin":"ui/main/btn_func_email.png","height":40}},{"type":"Button","props":{"y":133,"x":6,"width":40,"toggle":true,"stateNum":2,"skin":"ui/main/btn_func_pingbi.png","height":40}},{"type":"Box","props":{"y":-10,"x":-116,"var":"_topGroup1"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":70,"stateNum":1,"skin":"ui/main/btn_func_fuli.png","name":"btnFunc_19","height":70}},{"type":"Button","props":{"y":0,"x":-72,"width":70,"stateNum":1,"skin":"ui/main/btn_func_mall.png","name":"btnFunc_27","height":70}},{"type":"Button","props":{"y":0,"x":-144,"width":70,"stateNum":1,"skin":"ui/main/btn_func_trade.png","height":70}},{"type":"Button","props":{"y":0,"x":-216,"width":70,"stateNum":1,"skin":"ui/main/btn_func_lottery.png","height":70}},{"type":"Button","props":{"y":0,"x":-288,"width":70,"stateNum":1,"skin":"ui/main/btn_func_dailycharge.png","name":"btnFunc_33","labelStrokeColor":"#000000","labelStroke":-1,"labelSize":17,"labelPadding":"25","labelColors":"#D6DBE0","labelAlign":"center","label":"首充","height":70}}]},{"type":"Box","props":{"y":74,"x":-116,"var":"_topGroup2"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":70,"stateNum":1,"skin":"ui/main/btn_func_adventure.png","name":"btnFunc_12","height":70}},{"type":"Button","props":{"y":0,"x":-72,"width":70,"stateNum":1,"skin":"ui/main/btn_func_battle.png","name":"btnFunc_49","height":70}},{"type":"Button","props":{"y":0,"x":-144,"width":70,"stateNum":1,"skin":"ui/main/btn_func_bianqiang.png","height":70}},{"type":"Button","props":{"y":0,"x":-216,"width":70,"stateNum":1,"skin":"ui/main/btn_func_jieri.png","height":70}}]},{"type":"MainFunOpenTiShi","props":{"y":212,"x":-118,"var":"_funOpenTiShiBox","runtime":"MyUI.MainFunOpenTiShi"}}]},{"type":"Box","props":{"y":314,"width":60,"var":"_groupFun","right":5,"name":"GroupFunction","height":227},"child":[{"type":"Button","props":{"y":0,"x":0,"width":50,"var":"_btnSwitch","toggle":true,"stateNum":1,"skin":"ui/main/btn_func_qiehuan.png","height":50}},{"type":"Button","props":{"y":-10,"x":-82,"width":70,"stateNum":1,"skin":"ui/main/btn_func_parcel.png","name":"btnFunc_3","height":70}},{"type":"Box","props":{"y":73,"x":-10,"var":"_rightGroup1"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":70,"stateNum":1,"skin":"ui/main/btn_func_role.png","name":"btnFunc_2","height":70}},{"type":"Button","props":{"y":0,"x":-72,"width":70,"stateNum":1,"skin":"ui/main/btn_func_qichong.png","name":"btnFunc_25","height":70}},{"type":"Button","props":{"y":0,"x":-144,"width":70,"stateNum":1,"skin":"ui/main/btn_func_zuntianlu.png","name":"btnFunc_8","height":70}},{"type":"Button","props":{"y":84,"x":0,"width":70,"stateNum":1,"skin":"ui/main/btn_func_fengyunzhi.png","height":70}}]}]},{"type":"Box","props":{"name":"GroupChat","centerX":0,"bottom":7},"child":[{"type":"Image","props":{"y":0,"x":0,"width":450,"skin":"ui/main/img_bg_chat.png","height":121}},{"type":"Button","props":{"y":0,"x":-76,"toggle":true,"stateNum":2,"skin":"ui/main/btn_guaji.png"}},{"type":"Button","props":{"y":60,"x":-76,"stateNum":1,"skin":"ui/main/btn_audio.png"}},{"type":"Button","props":{"y":1,"x":412,"stateNum":1,"skin":"ui/main/btn_chat.png"}}]},{"type":"Box","props":{"y":0,"right":0,"name":"GroupExp","left":0,"bottom":0},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":1,"skin":"ui/main/btn_horse.png"}},{"type":"Image","props":{"y":48,"x":0,"width":312,"skin":"ui/main/img_bg_battery.png","height":26,"sizeGrid":"0,20,0,6"}},{"type":"Image","props":{"y":51,"x":11,"var":"_imgNet","skin":"ui/main/img_net_wifi_3.png"}},{"type":"ProgressBar","props":{"y":54,"x":152,"var":"_progBarBattery","skin":"ui/main/progress_battery.png","sizeGrid":"6,8,6,8"}},{"type":"ProgressBar","props":{"y":74,"var":"_progBarExp","skin":"ui/main/progress_exp.png","sizeGrid":"0,4,0,4","right":0,"left":0,"height":6}},{"type":"Label","props":{"y":70,"width":188,"var":"_txtExp","height":10,"fontSize":10,"color":"#ffffff","centerX":0,"align":"center"}}]},{"type":"Box","props":{"width":300,"var":"_bottomRightGroup","right":24,"height":276,"bottom":24},"child":[{"type":"Box","props":{"y":0,"x":0,"width":300,"var":"_groupSkill","height":276},"child":[{"type":"Button","props":{"y":214,"x":251,"var":"_btnPage","stateNum":1,"skin":"ui/main/btn_skill_qiehuan.png","labelSize":16,"labelPadding":"5,6,0,0","labelAlign":"right","label":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"Image","props":{"y":101,"x":103,"skin":"ui/main/img_skill_huadong.png"}},{"type":"MainSkillIcon","props":{"y":223,"x":42,"var":"_skillIcon0","runtime":"MyUI.MainSkillIcon"}},{"type":"MainSkillIcon","props":{"y":189,"x":191,"var":"_skillIcon1","scaleY":1.5,"scaleX":1.5,"runtime":"MyUI.MainSkillIcon"}},{"type":"MainSkillIcon","props":{"y":119,"x":55,"var":"_skillIcon2","runtime":"MyUI.MainSkillIcon"}},{"type":"MainSkillIcon","props":{"y":45,"x":127,"var":"_skillIcon3","runtime":"MyUI.MainSkillIcon"}},{"type":"MainSkillIcon","props":{"y":42,"x":232,"var":"_skillIcon4","runtime":"MyUI.MainSkillIcon"}}]},{"type":"Button","props":{"y":131,"x":133,"var":"_btnNpcTalk","stateNum":1,"skin":"ui/main/btn_npc_talk.png"}}]},{"type":"Box","props":{"width":596,"var":"_meditationHint","height":85,"centerX":0,"bottom":180},"child":[{"type":"Image","props":{"y":0,"x":6.000000375128451,"width":583,"skin":"ui/main/img_xiulian_bak.png","height":85}},{"type":"Image","props":{"y":44,"x":504.0000003751285,"skin":"ui/main/img_xiulian_huawen.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":44,"x":91.00000037512845,"skin":"ui/main/img_xiulian_huawen.png","rotation":180,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":21,"x":206.00000037512845,"skin":"ui/main/img_xiulian_text.png"}}]},{"type":"TaskBoxMini","props":{"y":212,"x":0,"var":"_miniTask","runtime":"LogicTask.TaskBoxMini"}},{"type":"RoleHeadInfo","props":{"y":5,"x":5,"var":"_headLeader","runtime":"MyUI.RoleHeadPart"}},{"type":"MonsterHeadPart","props":{"y":34,"x":340,"var":"_headMonster","runtime":"MyUI.MonsterHeadPart"}},{"type":"ObjectRoleFacePart","props":{"y":32,"x":362,"var":"_headNetPlayer","runtime":"MyUI.ObjectRoleFacePart"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.RedDot",MyUI.RedDot);
			View.regComponent("MyUI.RadarMap",MyUI.RadarMap);
			View.regComponent("MyUI.MainFunOpenTiShi",MyUI.MainFunOpenTiShi);
			View.regComponent("MyUI.MainSkillIcon",MyUI.MainSkillIcon);
			View.regComponent("LogicTask.TaskBoxMini",LogicTask.TaskBoxMini);
			View.regComponent("MyUI.RoleHeadPart",MyUI.RoleHeadPart);
			View.regComponent("MyUI.MonsterHeadPart",MyUI.MonsterHeadPart);
			View.regComponent("MyUI.ObjectRoleFacePart",MyUI.ObjectRoleFacePart);

            super.createChildren();
            this.createView(ui.MainUI.MainViewUI.uiView);

        }

    }
}

module ui.MainUI {
    export class MeditationUIUI extends Laya.Box {
		public _imgWater:Laya.Image;
		public _imgWaterLevel:Laya.Image;
		public _evtRegion:Laya.Image;
		public _txtTimeTitle:Laya.Label;
		public _txtExpTitle:Laya.Label;
		public _txtXingHunTitle:Laya.Label;
		public _txtTime:Laya.Label;
		public _txtExp:Laya.Label;
		public _txtXingHun:Laya.Label;
		public _txtPercent:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":286,"height":308},"child":[{"type":"Image","props":{"y":112,"x":35,"width":220,"skin":"ui/main/img_xiulian_prog_bak.png","height":177}},{"type":"Box","props":{"y":132,"x":86},"child":[{"type":"Image","props":{"y":3,"x":3,"width":110,"skin":"ui/common/img_circle_mask.png","renderType":"mask","height":110}},{"type":"Image","props":{"y":116,"x":0,"width":118,"var":"_imgWater","skin":"ui/main/img_xiulian_water.png","height":116,"anchorY":1}},{"type":"Image","props":{"y":0,"x":0,"width":116,"skin":"ui/main/img_xiulian_water_bak.png","height":116}},{"type":"Image","props":{"y":116,"x":0,"width":118,"var":"_imgWaterLevel","skin":"ui/main/img_xiulian_water_level.png","height":60,"anchorY":0.3}}]},{"type":"Image","props":{"y":131,"x":85,"width":117,"var":"_evtRegion","skin":"ui/main/img_xiulian_touming.png","height":117}},{"type":"Image","props":{"y":0,"x":0,"width":286,"skin":"ui/main/img_xiulian_info_bak.png","height":114}},{"type":"Label","props":{"y":14,"x":22,"width":92,"var":"_txtTimeTitle","text":"label","height":18,"fontSize":18,"color":"#97a4b8"}},{"type":"Label","props":{"y":44,"x":22,"width":92,"var":"_txtExpTitle","text":"label","height":18,"fontSize":18,"color":"#97a4b8"}},{"type":"Label","props":{"y":75,"x":23,"width":92,"var":"_txtXingHunTitle","text":"label","height":18,"fontSize":18,"color":"#5ebfcd"}},{"type":"Label","props":{"y":14,"x":122,"width":86,"var":"_txtTime","text":"label","height":18,"fontSize":18,"color":"#ffffff"}},{"type":"Label","props":{"y":44,"x":122,"width":86,"var":"_txtExp","text":"label","height":18,"fontSize":18,"color":"#9dd0fb"}},{"type":"Label","props":{"y":75,"x":122,"width":86,"var":"_txtXingHun","text":"label","height":18,"fontSize":18,"color":"#5ebfcd"}},{"type":"Label","props":{"y":178,"x":111,"width":65,"var":"_txtPercent","text":"label","height":22,"fontSize":22,"color":"#ffffff","align":"center"}}]};
        constructor(){ super();this.createUI(ui.MainUI.MeditationUIUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class MonsterHeadPartUI extends Laya.Box {
		public _progBarLife:Laya.ProgressBar;
		public _imgHead:Laya.Image;
		public _txtName:Laya.Label;
		public _txtLevel:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":258,"height":60},"child":[{"type":"ProgressBar","props":{"y":31,"x":51,"var":"_progBarLife","skin":"ui/main/progress_monster.png"}},{"type":"Image","props":{"y":0,"x":0,"var":"_imgHead","skin":"ui/main/img_head_monster.png"}},{"type":"Label","props":{"y":9,"x":67,"var":"_txtName","text":"label","fontSize":16,"color":"#efefef"}},{"type":"Label","props":{"y":46,"x":4,"width":50,"var":"_txtLevel","text":"label","height":14,"fontSize":14,"color":"#efefef","align":"center"}}]};
        constructor(){ super();this.createUI(ui.MainUI.MonsterHeadPartUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class NetWaitingUI extends View {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":156,"height":156,"centerY":-20,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/background/netwaiting_frame.png"}},{"type":"Image","props":{"y":78,"x":78,"skin":"ui/background/netwaiting_bar.png","name":"bar","anchorY":0.5,"anchorX":0.5},"compId":3}],"animations":[{"nodes":[{"target":3,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":3,"key":"rotation","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MainUI.NetWaitingUI.uiView);

        }

    }
}

module ui.MainUI {
    export class ObjectRoleFacePartUI extends Laya.Box {
		public _progBarLife:Laya.ProgressBar;
		public _progBarMagic:Laya.ProgressBar;
		public _imgHead:Laya.Image;
		public _txtName:Laya.Label;
		public _txtLevel:Laya.Label;
		public _txtLife:Laya.Label;
		public _txtMagic:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":287,"height":78},"child":[{"type":"ProgressBar","props":{"y":27,"x":61,"var":"_progBarLife","skin":"ui/main/progress_netplayer_hp.png","sizeGrid":"0,10,0,10"}},{"type":"ProgressBar","props":{"y":46,"x":61,"var":"_progBarMagic","skin":"ui/main/progress_netplayer_mp.png","sizeGrid":"0,10,0,10"}},{"type":"Image","props":{"y":0,"x":0,"var":"_imgHead"}},{"type":"Label","props":{"y":14,"x":176,"var":"_txtName","text":"label","fontSize":16,"color":"#6bdaea","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":64,"x":37,"var":"_txtLevel","text":"label","fontSize":14,"color":"#fdf7dd","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":34,"x":176,"var":"_txtLife","text":"label","fontSize":12,"color":"#fdf7dd","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":53,"x":176,"var":"_txtMagic","text":"label","fontSize":12,"color":"#fdf7dd","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};
        constructor(){ super();this.createUI(ui.MainUI.ObjectRoleFacePartUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class RadarMapUI extends Laya.Box {
		public _imgBak:Laya.Image;
		public _imgMap:Laya.Image;
		public _imgLeader:Laya.Image;
		public _txtName:Laya.Label;
		public _txtPosition:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":180,"height":158},"child":[{"type":"Image","props":{"y":8,"x":15,"var":"_imgBak","skin":"ui/main/img_bg_map.png"}},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":83,"x":90,"width":142,"skin":"ui/common/img_circle_mask.png","renderType":"mask","height":142,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":90,"x":89,"width":512,"var":"_imgMap","height":512,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":256,"x":256,"width":22,"var":"_imgLeader","skin":"ui/common/map_point_leader.png","height":30,"anchorY":0.12,"anchorX":0.46}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":180,"skin":"ui/main/img_bg_map_name.png","height":28}},{"type":"Label","props":{"y":14,"x":89,"var":"_txtName","text":"label","fontSize":18,"color":"#f9f9f9","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":37,"x":89,"var":"_txtPosition","text":"label","fontSize":16,"color":"#f9f9f9","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};
        constructor(){ super();this.createUI(ui.MainUI.RadarMapUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.MainUI {
    export class RockerUI extends View {
		public back:Laya.Image;
		public knob:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":4,"x":42,"width":600,"height":400},"child":[{"type":"Image","props":{"y":286,"x":8,"var":"back","skin":"ui/main/Joystick_back.png"}},{"type":"Image","props":{"y":273,"x":4,"var":"knob","skin":"ui/main/Joystick.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MainUI.RockerUI.uiView);

        }

    }
}

module ui.MainUI {
    export class RoleHeadInfoUI extends Laya.Box {
		public _imgHead:Laya.Image;
		public _imgVIPLevel:Laya.Button;
		public _progBarLife:Laya.ProgressBar;
		public _progBarMagic:Laya.ProgressBar;
		public _txtLevel:Laya.Label;
		public _txtTitleCombat:Laya.Label;
		public _txtCombat:Laya.Label;
		public _txtLife:Laya.Label;
		public _txtMagic:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":320,"height":89},"child":[{"type":"Image","props":{"y":1,"x":0,"width":320,"skin":"ui/main/img_bg_avatar.png","height":88}},{"type":"Image","props":{"y":12,"x":11,"width":68,"var":"_imgHead","height":68}},{"type":"Button","props":{"y":9,"x":255,"var":"_imgVIPLevel","stateNum":1,"skin":"ui/main/btn_vip_0.png"}},{"type":"ProgressBar","props":{"y":46,"x":87,"width":226,"var":"_progBarLife","skin":"ui/main/progress_hp.png","height":16,"sizeGrid":"0,4,0,4"}},{"type":"ProgressBar","props":{"y":64,"x":87,"width":226,"var":"_progBarMagic","skin":"ui/main/progress_mp.png","height":16,"sizeGrid":"0,4,0,4"}},{"type":"Label","props":{"y":2,"x":2,"width":78,"var":"_txtLevel","height":16,"fontSize":16,"color":"#dee7f2"}},{"type":"Label","props":{"y":15,"x":89,"width":30,"var":"_txtTitleCombat","text":"战","height":22,"fontSize":22,"color":"#dee7f2"}},{"type":"Label","props":{"y":9,"x":118,"var":"_txtCombat","text":"0","fontSize":30,"color":"#c5fd32"}},{"type":"Label","props":{"y":48,"x":180,"width":56,"var":"_txtLife","text":"label","height":12,"fontSize":12,"color":"#f7ddff"}},{"type":"Label","props":{"y":66,"x":180,"width":56,"var":"_txtMagic","text":"label","fontSize":12,"color":"#f7ddff"}}]};
        constructor(){ super();this.createUI(ui.MainUI.RoleHeadInfoUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Mall.Components {
    export class MallBuyLimitGoodsRenderUI extends Laya.Box {
		public _textGoodsName:laya.html.dom.HTMLDivElement;
		public _goodsIcon:MyUI.GoodsIcon;
		public _btnBuy:Laya.Button;
		public _textYuanJiaTitle:Laya.Label;
		public _textXianJiaTitle:Laya.Label;
		public _textYuanJiaNums:Laya.Label;
		public _textXianJiaNums:Laya.Label;
		public _textShengYuTitle:Laya.Label;
		public _textShengYuNums:Laya.Label;
		public _textXianGouTitle:Laya.Label;
		public _textXianGouNums:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":365,"height":170},"child":[{"type":"Image","props":{"y":0,"x":0,"width":365,"skin":"ui/common/window_tab_bak.png","height":168,"sizeGrid":"0,10,0,10"}},{"type":"Image","props":{"y":102,"x":2,"width":360,"skin":"ui/common/window_frame_bak1.png","height":65,"sizeGrid":"8,8,8,8"}},{"type":"HTMLDivElement","props":{"y":7,"x":0,"width":180,"var":"_textGoodsName","height":24}},{"type":"GoodsIcon","props":{"y":10,"x":10,"var":"_goodsIcon","runtime":"MyUI.GoodsIcon"}},{"type":"Button","props":{"y":115,"x":204,"width":148,"var":"_btnBuy","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":22,"label":"对对对","height":40,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Label","props":{"y":22,"x":105,"width":80,"var":"_textYuanJiaTitle","text":"label","fontSize":20,"color":"#747D8E"}},{"type":"Label","props":{"y":61,"x":105,"width":80,"var":"_textXianJiaTitle","text":"label","fontSize":20,"color":"#BBDAF9"}},{"type":"Label","props":{"y":23,"x":221,"width":80,"var":"_textYuanJiaNums","text":"label","fontSize":20,"color":"#1BA0E1"}},{"type":"Label","props":{"y":62,"x":221,"width":80,"var":"_textXianJiaNums","text":"label","fontSize":20,"color":"#BBDAF9"}},{"type":"Image","props":{"y":18,"x":169,"width":185,"skin":"ui/common/window_frame_bak1.png","height":32,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":58,"x":169,"width":185,"skin":"ui/common/window_frame_bak1.png","height":32,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":17,"x":179,"width":35,"skin":"ui/common/money_diamond.png","height":35}},{"type":"Image","props":{"y":57,"x":179,"width":35,"skin":"ui/common/money_diamond.png","height":35}},{"type":"Image","props":{"y":34,"x":180,"width":94,"skin":"ui/common/mall_qianggou_hengtiao.png","height":2}},{"type":"Label","props":{"y":113,"x":15,"width":50,"var":"_textShengYuTitle","text":"label","fontSize":20,"color":"#AFC0D1"}},{"type":"Label","props":{"y":113,"x":70,"width":50,"var":"_textShengYuNums","text":"100","fontSize":20,"color":"#AFC0D1"}},{"type":"Label","props":{"y":136,"x":15,"width":50,"var":"_textXianGouTitle","text":"label","fontSize":20,"color":"#E2E298"}},{"type":"Label","props":{"y":136,"x":70,"width":50,"var":"_textXianGouNums","text":"100","fontSize":20,"color":"#E2E298"}}]};
        constructor(){ super();this.createUI(ui.Mall.Components.MallBuyLimitGoodsRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Mall.Components {
    export class MallGoodsRenderUI extends Laya.Box {
		public _textGoodsName:laya.html.dom.HTMLDivElement;
		public _goodsIcon:MyUI.GoodsIcon;
		public _btnBuy:Laya.Button;
		public _imageMoneyType:Laya.Image;
		public _textGoodsPrice:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":180,"height":200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":180,"skin":"ui/common/window_tab_bak.png","height":200,"sizeGrid":"0,10,0,10"}},{"type":"HTMLDivElement","props":{"y":7,"x":0,"width":180,"var":"_textGoodsName","height":24}},{"type":"GoodsIcon","props":{"y":50,"x":48,"var":"_goodsIcon","runtime":"MyUI.GoodsIcon"}},{"type":"Button","props":{"y":150,"x":10,"width":160,"var":"_btnBuy","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":24,"height":40,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Image","props":{"y":147,"x":18,"width":46,"var":"_imageMoneyType","mouseThrough":true,"height":47}},{"type":"Label","props":{"y":157,"x":55,"width":110,"var":"_textGoodsPrice","text":"label","mouseThrough":true,"height":24,"fontSize":24,"color":"#DAE8F5","align":"center"}}]};
        constructor(){ super();this.createUI(ui.Mall.Components.MallGoodsRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Mall {
    export class MallGoodsPartUI extends Laya.Box {
		public _listgoods:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":756,"height":415},"child":[{"type":"List","props":{"y":0,"x":0,"width":756,"var":"_listgoods","spaceY":9,"spaceX":9,"renderType":"render","height":415}}]};
        constructor(){ super();this.createUI(ui.Mall.MallGoodsPartUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Mall {
    export class MallpartUI extends View {
		public _tabBuyLimit:MyUI.TabItemRender;
		public _tabDiamond:MyUI.TabItemRender;
		public _tabBindingDiamond:MyUI.TabItemRender;
		public _tabSilver:MyUI.TabItemRender;
		public _btnViewDetails:Laya.Button;
		public _labBuyTimeTitle:Laya.Label;
		public _labBuyTimes:Laya.Label;
		public _mallGoodsBox:Laya.Box;
		public _imageNoHas:Laya.Image;
		public _textNoHas:Laya.Label;
		public _itemHuoBiDiamond:MyUI.HuoBiItem;
		public _itemHuoBiBindDiamond:MyUI.HuoBiItem;
		public _itemHuoYinBi:MyUI.HuoBiItem;

        public static  uiView:any ={"type":"View","props":{"y":92,"x":225,"width":988,"height":610},"child":[{"type":"HBox","props":{"y":0,"x":2},"child":[{"type":"TabItemRender","props":{"width":200,"var":"_tabBuyLimit","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":200,"var":"_tabDiamond","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":200,"var":"_tabBindingDiamond","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":200,"var":"_tabSilver","runtime":"MyUI.TabItemRender","height":56}}]},{"type":"Image","props":{"y":69,"x":0,"width":988,"skin":"ui/common/window_frame_bak.png","height":540,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":79,"x":10,"width":198,"skin":"ui/background/mall_haibao.png","height":525}},{"type":"Image","props":{"y":116,"x":215,"width":765,"skin":"ui/common/window_frame_bak1.png","height":415,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":547,"x":19,"width":180,"var":"_btnViewDetails","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"label","height":45,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Label","props":{"y":551,"x":217,"width":120,"var":"_labBuyTimeTitle","text":"抢购倒计时","fontSize":20,"color":"#99A2B1","align":"left"}},{"type":"Label","props":{"y":551,"x":333,"width":200,"var":"_labBuyTimes","fontSize":20,"color":"#49BD1B","align":"left"}},{"type":"Box","props":{"y":124,"x":224,"var":"_mallGoodsBox"}},{"type":"Image","props":{"y":161,"x":462,"width":268,"var":"_imageNoHas","skin":"ui/common/common_gantanhao.png","height":268}},{"type":"Label","props":{"y":375,"x":396,"width":400,"var":"_textNoHas","text":"暂无抢购商品","fontSize":28,"color":"#82A7CC","align":"center"}},{"type":"Box","props":{"y":71,"x":215},"child":[{"type":"HuoBiItem","props":{"var":"_itemHuoBiDiamond","runtime":"MyUI.HuoBiItem"}},{"type":"HuoBiItem","props":{"y":0,"x":240,"var":"_itemHuoBiBindDiamond","runtime":"MyUI.HuoBiItem"}},{"type":"HuoBiItem","props":{"x":480,"var":"_itemHuoYinBi","runtime":"MyUI.HuoBiItem"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TabItemRender",MyUI.TabItemRender);
			View.regComponent("MyUI.HuoBiItem",MyUI.HuoBiItem);

            super.createChildren();
            this.createView(ui.Mall.MallpartUI.uiView);

        }

    }
}

module ui.MapUI {
    export class MapWindowUI extends Dialog {
		public _imgBak:Laya.Image;
		public _groupLocal:Laya.Box;
		public _chckNPC:Laya.Button;
		public _chckMonster:Laya.Button;
		public _chckTeleport:Laya.Button;
		public _txtTransferTip:Laya.Label;
		public _transferList:Laya.List;
		public _imgLocal:Laya.Image;
		public _imgLeader:Laya.Image;
		public _imgLocalIcon:Laya.Image;
		public _txtLocalName:Laya.Label;
		public _txtDropTip:Laya.Label;
		public _goodsList:Laya.List;
		public _groupWorld:Laya.Box;
		public _groupPlace:Laya.Box;
		public _imgOccu:Laya.Image;
		public _panelWorld:Laya.Panel;
		public _btnBack:Laya.Button;
		public _btnGoto:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Image","props":{"var":"_imgBak","top":0,"skin":"ui/background/map_bak.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"width":1280,"var":"_groupLocal","height":720,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":72,"x":30,"skin":"ui/common/skill_quan_an.png"}},{"type":"Button","props":{"y":72,"x":32,"width":462,"var":"_chckNPC","stateNum":2,"skin":"ui/common/btn_map_chk_type.png","label":"label","height":58,"labelColors":"#afc0d1,#afc0d1,#afc0d1,#afc0d1","labelSize":20,"toggle":"true"}},{"type":"Button","props":{"y":134,"x":32,"width":462,"var":"_chckMonster","stateNum":2,"skin":"ui/common/btn_map_chk_type.png","label":"label","height":58,"labelColors":"#afc0d1,#afc0d1,#afc0d1,#afc0d1","labelSize":20,"toggle":"true"}},{"type":"Button","props":{"y":196,"x":31,"width":462,"var":"_chckTeleport","stateNum":2,"skin":"ui/common/btn_map_chk_type.png","label":"label","height":58,"labelColors":"#afc0d1,#afc0d1,#afc0d1,#afc0d1","labelSize":20,"toggle":"true"}},{"type":"Image","props":{"y":636,"x":30,"width":464,"skin":"ui/common/tip_bg_money.png","height":66}},{"type":"Label","props":{"y":669,"x":262,"var":"_txtTransferTip","text":"label","fontSize":18,"color":"#d8d9dc","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"List","props":{"y":259,"x":31,"width":462,"var":"_transferList","selectEnable":true,"height":374},"child":[{"type":"Box","props":{"y":0,"x":0,"width":460,"renderType":"render","height":58},"child":[{"type":"Image","props":{"y":21,"x":57,"skin":"ui/common/map_trans_item_dot.png"}},{"type":"Image","props":{"y":0,"x":10,"skin":"ui/common/map_trans_item_selected.png","name":"selectBox"}},{"type":"Label","props":{"y":20,"x":100,"text":"label","name":"label","fontSize":18,"color":"#afc0d1","align":"left"}}]}]},{"type":"Image","props":{"y":288,"x":870,"width":512,"var":"_imgLocal","height":512,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":256,"x":256,"width":30,"var":"_imgLeader","skin":"ui/common/map_point_leader.png","height":40,"anchorY":0.12,"anchorX":0.46}}]},{"type":"Image","props":{"y":545,"x":748,"skin":"ui/common/map_name_bak.png"}},{"type":"Image","props":{"y":582,"x":834,"width":48,"var":"_imgLocalIcon","height":30,"anchorY":1,"anchorX":1}},{"type":"Label","props":{"y":568,"x":870,"var":"_txtLocalName","text":"label","fontSize":24,"color":"#d8d9dc","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":601,"x":522,"width":622,"skin":"ui/common/window_frame_bak5.png","height":99}},{"type":"Label","props":{"y":640,"x":537,"var":"_txtDropTip","text":"label","fontSize":22,"color":"#99a2b1"}},{"type":"Image","props":{"y":650,"x":662,"skin":"ui/common/map_scroll_arrow.png","rotation":180,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":650,"x":1115,"skin":"ui/common/map_scroll_arrow.png","anchorY":0.5,"anchorX":0.5}},{"type":"List","props":{"y":609,"x":686,"width":405,"var":"_goodsList","spaceX":10,"height":84},"child":[{"type":"GoodsIcon","props":{"runtime":"MyUI.GoodsIcon","renderType":"render"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":1514,"var":"_groupWorld","name":"groupWorld","height":1052},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1514,"skin":"ui/background/map_bak_diwen.png","height":1052}},{"type":"Image","props":{"y":0,"x":0,"width":1514,"skin":"ui/background/map_bak_guang.png","height":1052}},{"type":"WorldMapPiece","props":{"y":219,"x":265,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_1.png","name":"piece_1","mapID":1}},{"type":"WorldMapPiece","props":{"y":244,"x":132,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_2.png","name":"piece_2","mapID":2}},{"type":"WorldMapPiece","props":{"y":358,"x":438,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_3.png","name":"piece_3","mapID":3}},{"type":"WorldMapPiece","props":{"y":532,"x":473,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_4.png","name":"piece_4","mapID":4}},{"type":"WorldMapPiece","props":{"y":424,"x":159,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_5.png","name":"piece_5","mapID":5}},{"type":"WorldMapPiece","props":{"y":632,"x":341,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_6.png","name":"piece_6","mapID":6}},{"type":"WorldMapPiece","props":{"y":405,"x":899,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_9.png","name":"piece_9","mapID":9}},{"type":"WorldMapPiece","props":{"y":141,"x":787,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_30.png","name":"piece_30","mapID":30}},{"type":"WorldMapPiece","props":{"y":97,"x":390,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_40.png","name":"piece_40","mapID":40}},{"type":"WorldMapPiece","props":{"y":605,"x":808,"runtime":"MyUI.MapUI.WorldMapPiece","pieceSkin":"ui/map/50_2.png","name":"piece_50","mapID":-1}},{"type":"WorldMapPiece","props":{"y":577,"x":1000,"runtime":"MyUI.MapUI.WorldMapPiece","pieceSkin":"ui/map/60_2.png","name":"piece_60","mapID":-1}},{"type":"WorldMapPiece","props":{"y":465,"x":1074,"runtime":"MyUI.MapUI.WorldMapPiece","pieceSkin":"ui/map/70_2.png","name":"piece_70","mapID":-1}},{"type":"WorldMapPiece","props":{"y":413,"x":808,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_7.png","name":"piece_7","mapID":7}},{"type":"WorldMapPiece","props":{"y":567,"x":853,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_8.png","name":"piece_8","mapID":8}},{"type":"WorldMapPiece","props":{"y":194,"x":662,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_20.png","name":"piece_20","mapID":20}},{"type":"WorldMapPiece","props":{"y":404,"x":1101,"runtime":"MyUI.MapUI.WorldMapPiece","pieceIcon":"ui/common/map_icon_10.png","name":"piece_10","mapID":10}},{"type":"Box","props":{"y":241,"x":156,"var":"_groupPlace","anchorY":1,"anchorX":0.5},"child":[{"type":"Image","props":{"y":8,"x":9,"width":42,"var":"_imgOccu","height":42}},{"type":"Image","props":{"y":0,"x":0,"skin":"ui/common/map_location.png"}}]}]},{"type":"Panel","props":{"var":"_panelWorld","top":0,"right":0,"name":"panelWorld","left":0,"bottom":0}},{"type":"Button","props":{"width":190,"var":"_btnBack","top":10,"stateNum":1,"skin":"ui/common/btn_fanhui.png","left":16,"labelSize":28,"labelPadding":"0,0,0,33","labelColors":"#d4dee9,#d4dee9,#d4dee9,#d4dee9","label":"区域地图","sizeGrid":"0,0,0,56"}},{"type":"Button","props":{"var":"_btnGoto","stateNum":1,"skin":"ui/common/btn_map_local.png","right":32,"bottom":30}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);
			View.regComponent("MyUI.MapUI.WorldMapPiece",MyUI.MapUI.WorldMapPiece);

            super.createChildren();
            this.createView(ui.MapUI.MapWindowUI.uiView);

        }

    }
}

module ui.MapUI {
    export class WorldMapPieceUI extends Laya.Box {
		public _imgPiece:Laya.Image;
		public _evtRegion:Laya.Box;
		public _iconPiece:Laya.Image;
		public _txtPiece:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":180,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"_imgPiece","mouseEnabled":false}},{"type":"Box","props":{"y":40,"x":60,"width":120,"var":"_evtRegion","height":80,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":60,"var":"_iconPiece","anchorY":1,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":60,"width":160,"var":"_txtPiece","fontSize":22,"color":"#dae8f5","anchorX":0.5,"align":"center"}}]}]};
        constructor(){ super();this.createUI(ui.MapUI.WorldMapPieceUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.PlayerBag {
    export class AttributePointWindowUI extends Dialog {
		public _checkAuto:Laya.CheckBox;
		public _btnReset:Laya.Button;
		public _btnRecommend:Laya.Button;
		public _txtRemainder:laya.html.dom.HTMLDivElement;
		public _btnStrengthAdd:Laya.Button;
		public _btnStrengthSub:Laya.Button;
		public _txtTotalStrength:Laya.Label;
		public _txtMedStrength:Laya.Label;
		public _btnIntelligenceAdd:Laya.Button;
		public _btnIntelligenceSub:Laya.Button;
		public _txtTotalIntelligence:Laya.Label;
		public _txtMedIntelligence:Laya.Label;
		public _btnDexterityAdd:Laya.Button;
		public _btnDexteritySub:Laya.Button;
		public _txtTotalDexterity:Laya.Label;
		public _txtMedDexterity:Laya.Label;
		public _btnStaminaAdd:Laya.Button;
		public _btnStaminaSub:Laya.Button;
		public _txtTotalStamina:Laya.Label;
		public _txtMedStamina:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":878,"height":494},"child":[{"type":"Image","props":{"y":0,"x":0,"width":878,"skin":"ui/common/window_plate_bak.png","height":494,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":0,"width":878,"skin":"ui/common/window_title_bak1.png","height":58}},{"type":"Image","props":{"y":106,"x":12,"width":854,"skin":"ui/common/window_frame_bak1.png","height":208,"sizeGrid":"8,8,8,8"}},{"type":"CheckBox","props":{"y":323,"x":12,"width":256,"var":"_checkAuto","stateNum":2,"skin":"ui/common/check_style.png","label":"升级时自动按推荐加点","height":40,"labelSize":20,"labelColors":"#afc0d1,#afc0d1,#afc0d1,#afc0d1","labelPadding":"9,0,0,9"}},{"type":"Button","props":{"y":424,"x":457,"width":200,"var":"_btnReset","skin":"ui/common/btn_anniu.png","label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":424,"x":666,"width":200,"var":"_btnRecommend","skin":"ui/common/btn_anniu.png","label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Label","props":{"y":14,"x":314,"width":250,"text":"``11119","height":30,"fontSize":30,"color":"#d6dfe8","align":"center"}},{"type":"Label","props":{"y":76,"x":17,"width":150,"text":"``11120","height":20,"fontSize":20,"color":"#747d8e"}},{"type":"Label","props":{"y":76,"x":311,"width":150,"text":"``11121","height":20,"fontSize":20,"color":"#747d8e","align":"center"}},{"type":"Label","props":{"y":76,"x":618,"width":150,"text":"``11122","height":20,"fontSize":20,"color":"#747d8e","align":"center"}},{"type":"Label","props":{"y":386,"x":12,"width":428,"text":"``11125","height":18,"fontSize":18,"color":"#747d8e","align":"left"}},{"type":"Label","props":{"y":411,"x":12,"width":428,"text":"``11126","height":18,"fontSize":18,"color":"#747d8e","align":"left"}},{"type":"Label","props":{"y":437,"x":12,"width":428,"text":"``11127","height":18,"fontSize":18,"color":"#747d8e","align":"left"}},{"type":"Label","props":{"y":462,"x":12,"width":428,"text":"``11128","height":18,"fontSize":18,"color":"#747d8e","align":"left"}},{"type":"HTMLDivElement","props":{"y":334,"x":602,"width":263,"var":"_txtRemainder","innerHTML":"htmlText","height":20}},{"type":"VBox","props":{"y":114,"x":16},"child":[{"type":"Box","props":{"width":846,"height":48},"child":[{"type":"Image","props":{"y":0,"x":0,"width":846,"skin":"ui/common/window_title_bak3.png","height":48}},{"type":"Image","props":{"y":4,"x":8,"skin":"ui/common/role_attr_liliang.png"}},{"type":"Image","props":{"y":5,"x":558,"width":236,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":6,"x":802,"var":"_btnStrengthAdd","skin":"ui/common/btn_cp1_plus.png","stateNum":2}},{"type":"Button","props":{"y":6,"x":515,"var":"_btnStrengthSub","skin":"ui/common/btn_cp1_minus.png","stateNum":2}},{"type":"Label","props":{"y":13,"x":53,"text":"``121","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":119,"var":"_txtTotalStrength","text":"label","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":295,"width":150,"var":"_txtMedStrength","text":"label","height":22,"fontSize":22,"color":"#afc0d1","align":"center"}}]},{"type":"Box","props":{"width":846,"height":48},"child":[{"type":"Image","props":{"y":4,"x":8,"skin":"ui/common/role_attr_zhili.png"}},{"type":"Image","props":{"y":5,"x":558,"width":236,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":6,"x":802,"var":"_btnIntelligenceAdd","skin":"ui/common/btn_cp1_plus.png","stateNum":2}},{"type":"Button","props":{"y":6,"x":515,"var":"_btnIntelligenceSub","skin":"ui/common/btn_cp1_minus.png","stateNum":2}},{"type":"Label","props":{"y":13,"x":53,"text":"``122","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":119,"var":"_txtTotalIntelligence","text":"label","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":295,"width":150,"var":"_txtMedIntelligence","text":"label","height":22,"fontSize":22,"color":"#afc0d1","align":"center"}}]},{"type":"Box","props":{"width":846,"height":48},"child":[{"type":"Image","props":{"y":0,"x":0,"width":846,"skin":"ui/common/window_title_bak3.png","height":48}},{"type":"Image","props":{"y":4,"x":8,"skin":"ui/common/role_attr_minjie.png"}},{"type":"Image","props":{"y":5,"x":558,"width":236,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":6,"x":802,"var":"_btnDexterityAdd","skin":"ui/common/btn_cp1_plus.png","stateNum":2}},{"type":"Button","props":{"y":6,"x":515,"var":"_btnDexteritySub","skin":"ui/common/btn_cp1_minus.png","stateNum":2}},{"type":"Label","props":{"y":13,"x":53,"text":"``123","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":119,"var":"_txtTotalDexterity","text":"label","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":295,"width":150,"var":"_txtMedDexterity","text":"label","height":22,"fontSize":22,"color":"#afc0d1","align":"center"}}]},{"type":"Box","props":{"width":846,"height":48},"child":[{"type":"Image","props":{"y":4,"x":8,"skin":"ui/common/role_attr_tipo.png"}},{"type":"Image","props":{"y":5,"x":558,"width":236,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":6,"x":802,"var":"_btnStaminaAdd","skin":"ui/common/btn_cp1_plus.png","stateNum":2}},{"type":"Button","props":{"y":6,"x":515,"var":"_btnStaminaSub","skin":"ui/common/btn_cp1_minus.png","stateNum":2}},{"type":"Label","props":{"y":13,"x":53,"text":"``124","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":119,"var":"_txtTotalStamina","text":"label","fontSize":22,"color":"#afc0d1"}},{"type":"Label","props":{"y":13,"x":295,"width":150,"var":"_txtMedStamina","text":"label","height":22,"fontSize":22,"color":"#afc0d1","align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.PlayerBag.AttributePointWindowUI.uiView);

        }

    }
}

module ui.PlayerBag {
    export class EquipPartUI extends View {
		public _txtName:Laya.Label;
		public _txtCombat:Laya.Label;
		public _iconAmulet:MyUI.GoodsIcon;
		public _iconNecklace:MyUI.GoodsIcon;
		public _iconLeftRing:MyUI.GoodsIcon;
		public _iconRightRing:MyUI.GoodsIcon;
		public _iconWeapon:MyUI.GoodsIcon;
		public _iconHelmet:MyUI.GoodsIcon;
		public _iconArmour:MyUI.GoodsIcon;
		public _iconGloves:MyUI.GoodsIcon;
		public _iconLegs:MyUI.GoodsIcon;
		public _iconShoes:MyUI.GoodsIcon;

        public static  uiView:any ={"type":"View","props":{"y":146,"x":244,"width":464,"height":520},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ui/background/role_equip_left.png"}},{"type":"Image","props":{"y":30,"x":382,"skin":"ui/background/role_equip_right.png"}},{"type":"Label","props":{"y":0,"x":231,"width":210,"var":"_txtName","text":"Name","height":24,"fontSize":24,"color":"#a7b9ce","anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":495,"x":231,"width":210,"var":"_txtCombat","text":"Combat","height":24,"fontSize":24,"color":"#d6dfe8","anchorX":0.5,"align":"center"}},{"type":"GoodsIcon","props":{"y":30,"x":0,"var":"_iconAmulet","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":131,"x":0,"var":"_iconNecklace","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":231,"x":0,"var":"_iconLeftRing","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":332,"x":0,"var":"_iconRightRing","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":432,"x":0,"var":"_iconWeapon","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":30,"x":382,"var":"_iconHelmet","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":131,"x":382,"var":"_iconArmour","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":232,"x":382,"var":"_iconGloves","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":332,"x":382,"var":"_iconLegs","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":432,"x":382,"var":"_iconShoes","runtime":"MyUI.GoodsIcon"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            super.createChildren();
            this.createView(ui.PlayerBag.EquipPartUI.uiView);

        }

    }
}

module ui.PlayerBag {
    export class ParcelPartUI extends View {
		public _itemDiamond:MyUI.HuoBiItem;
		public _itemBindDiamond:MyUI.HuoBiItem;
		public _itemGold:MyUI.HuoBiItem;
		public _itemBindGold:MyUI.HuoBiItem;
		public _btnEquipRecycle:Laya.Button;
		public _btnRideRecycle:Laya.Button;
		public _btnSort:Laya.Button;
		public _lstGoodsIcon:Laya.List;
		public _imgDot0:Laya.Image;
		public _imgDot1:Laya.Image;
		public _imgDot2:Laya.Image;
		public _imgDot3:Laya.Image;
		public _imgDot4:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":84,"x":247,"width":952,"height":614},"child":[{"type":"HuoBiItem","props":{"y":0,"x":0,"var":"_itemDiamond","runtime":"MyUI.HuoBiItem"}},{"type":"HuoBiItem","props":{"y":0,"x":237,"var":"_itemBindDiamond","runtime":"MyUI.HuoBiItem"}},{"type":"HuoBiItem","props":{"y":0,"x":473,"var":"_itemGold","runtime":"MyUI.HuoBiItem"}},{"type":"HuoBiItem","props":{"y":0,"x":710,"var":"_itemBindGold","runtime":"MyUI.HuoBiItem"}},{"type":"Image","props":{"y":57,"x":490,"width":462,"skin":"ui/common/window_frame_bak.png","height":556,"sizeGrid":"20,20,20,20"}},{"type":"Button","props":{"y":544,"x":502,"var":"_btnEquipRecycle","skin":"ui/common/btn_anniu.png","label":"label","sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":544,"x":650,"var":"_btnRideRecycle","skin":"ui/common/btn_anniu.png","label":"label","sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":544,"x":798,"var":"_btnSort","skin":"ui/common/btn_anniu.png","label":"label","sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Image","props":{"y":516,"x":512,"width":412,"skin":"ui/common/flip_line.png","height":6,"sizeGrid":"0,8,0,8"}},{"type":"List","props":{"y":72,"x":506,"var":"_lstGoodsIcon","spaceY":6,"spaceX":6,"repeatY":5,"repeatX":5}},{"type":"Box","props":{"y":511,"x":628},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"_imgDot0","skin":"ui/common/flip_dot_bg.png"}},{"type":"Image","props":{"y":0,"x":42,"var":"_imgDot1","skin":"ui/common/flip_dot_bg.png"}},{"type":"Image","props":{"y":0,"x":84,"var":"_imgDot2","skin":"ui/common/flip_dot_bg.png"}},{"type":"Image","props":{"y":0,"x":126,"var":"_imgDot3","skin":"ui/common/flip_dot_bg.png"}},{"type":"Image","props":{"y":0,"x":168,"var":"_imgDot4","skin":"ui/common/flip_dot_bg.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.HuoBiItem",MyUI.HuoBiItem);

            super.createChildren();
            this.createView(ui.PlayerBag.ParcelPartUI.uiView);

        }

    }
}

module ui.PlayerBag {
    export class PropertyWindowUI extends Dialog {
		public _btnClose:Laya.Button;
		public _txtHeadline:Laya.Label;
		public _txtContent:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":340,"height":450},"child":[{"type":"Image","props":{"y":0,"x":0,"width":340,"skin":"ui/common/window_plate_bak.png","height":450,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":0,"width":340,"skin":"ui/common/window_title_bak.png","height":50}},{"type":"Button","props":{"y":17,"x":309,"var":"_btnClose","skin":"ui/common/btn_close1.png","name":"close","stateNum":1}},{"type":"Label","props":{"y":14,"x":45,"width":250,"var":"_txtHeadline","text":"label","height":22,"fontSize":22,"color":"#d6dfe8","align":"center"}},{"type":"Label","props":{"y":62,"x":30,"width":280,"var":"_txtContent","text":"label","leading":6,"height":380,"fontSize":18,"color":"#99a2b1","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PlayerBag.PropertyWindowUI.uiView);

        }

    }
}

module ui.PlayerBag {
    export class RolePartUI extends View {
		public _btnPoint:Laya.Button;
		public _btnDetail:Laya.Button;
		public _txtOccu:Laya.Label;
		public _txtLevel:Laya.Label;
		public _txtFamily:Laya.Label;
		public _txtTitle:Laya.Label;
		public _txtSpouse:Laya.Label;
		public _txtPK:Laya.Label;
		public _groupPrimary:Laya.Box;
		public _txtStrength:Laya.Label;
		public _txtDexterity:Laya.Label;
		public _txtIntelligence:Laya.Label;
		public _txtStamina:Laya.Label;
		public _txtMaxHp:Laya.Label;
		public _txtPhysicalAttack:Laya.Label;
		public _txtMagicAttack:Laya.Label;
		public _txtPhysicalDefence:Laya.Label;
		public _txtMagicDefence:Laya.Label;
		public _txtHit:Laya.Label;
		public _txtDodge:Laya.Label;
		public _panelHelp:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":96,"x":736,"width":464,"height":602},"child":[{"type":"Image","props":{"y":0,"x":0,"width":464,"skin":"ui/common/window_frame_bak.png","height":602,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":0,"x":0,"width":464,"skin":"ui/common/window_title_bak2.png","height":46}},{"type":"Image","props":{"y":222,"x":0,"width":464,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Image","props":{"y":340,"x":0,"width":464,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Button","props":{"y":222,"x":367,"width":90,"var":"_btnPoint","skin":"ui/common/btn_anniu.png","labelSize":18,"label":"label","height":40,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Button","props":{"y":340,"x":367,"width":90,"var":"_btnDetail","skin":"ui/common/btn_anniu.png","labelSize":18,"label":"label","height":40,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Label","props":{"y":12,"x":127,"width":210,"text":"``746","height":22,"fontSize":22,"color":"#afc0d1","align":"center"}},{"type":"Label","props":{"y":233,"x":10,"text":"``1345","fontSize":20,"color":"#afc0d1"}},{"type":"Label","props":{"y":351,"x":10,"text":"``11131","fontSize":20,"color":"#afc0d1"}},{"type":"VBox","props":{"y":55,"x":10,"space":10,"align":"left"},"child":[{"type":"HBox","props":{"space":6},"child":[{"type":"Label","props":{"text":"``13268","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtOccu","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":10,"x":10,"space":6},"child":[{"type":"Label","props":{"text":"``13269","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtLevel","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":20,"x":20,"space":6},"child":[{"type":"Label","props":{"text":"``13270","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtFamily","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":30,"x":30,"space":6},"child":[{"type":"Label","props":{"text":"``13271","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtTitle","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":40,"x":40,"space":6},"child":[{"type":"Label","props":{"text":"``13273","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtSpouse","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":50,"x":50,"space":6},"child":[{"type":"Label","props":{"text":"``13272","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtPK","text":"label","fontSize":18,"color":"#afc0d1"}}]}]},{"type":"Box","props":{"y":272,"x":10,"width":440,"var":"_groupPrimary","height":62},"child":[{"type":"HBox","props":{"y":4,"x":0,"space":6},"child":[{"type":"Image","props":{"y":-5,"width":24,"skin":"ui/common/role_attr_liliang.png","height":28}},{"type":"Label","props":{"text":"``121","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtStrength","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":38,"x":0,"space":6},"child":[{"type":"Image","props":{"y":-5,"width":24,"skin":"ui/common/role_attr_minjie.png","height":28}},{"type":"Label","props":{"text":"``123","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtDexterity","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":4,"x":222,"space":6},"child":[{"type":"Image","props":{"y":-5,"width":24,"skin":"ui/common/role_attr_zhili.png","height":28}},{"type":"Label","props":{"text":"``122","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtIntelligence","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"HBox","props":{"y":38,"x":222,"space":6},"child":[{"type":"Image","props":{"y":-5,"width":24,"skin":"ui/common/role_attr_tipo.png","height":28}},{"type":"Label","props":{"text":"``124","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"var":"_txtStamina","text":"label","fontSize":18,"color":"#afc0d1"}}]}]},{"type":"VBox","props":{"y":394,"x":10,"space":6},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_shengmingshangxian.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13274","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtMaxHp","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_wuligongji.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13275","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtPhysicalAttack","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_mofagongji.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13276","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtMagicAttack","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_wulifangyu.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13277","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtPhysicalDefence","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_mofafangyu.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13278","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtMagicDefence","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_minghzhong.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13279","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtHit","text":"label","fontSize":18,"color":"#afc0d1"}}]},{"type":"Box","props":{},"child":[{"type":"Image","props":{"y":-3,"skin":"ui/common/role_attr1_shanbi.png"}},{"type":"Label","props":{"y":0,"x":30,"text":"``13280","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":0,"x":244,"var":"_txtDodge","text":"label","fontSize":18,"color":"#afc0d1"}}]}]},{"type":"Box","props":{"y":96,"x":-438,"var":"_panelHelp"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":436,"skin":"ui/common/window_plate_bak.png","height":506,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":0,"x":0,"width":436,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Image","props":{"y":107,"x":0,"width":436,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Image","props":{"y":213,"x":0,"width":436,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Image","props":{"y":320,"x":0,"width":436,"skin":"ui/common/window_title_bak3.png","height":42}},{"type":"Image","props":{"y":1,"x":16,"skin":"ui/common/role_attr_liliang.png"}},{"type":"Image","props":{"y":108,"x":16,"skin":"ui/common/role_attr_zhili.png"}},{"type":"Image","props":{"y":214,"x":16,"skin":"ui/common/role_attr_minjie.png"}},{"type":"Image","props":{"y":321,"x":16,"skin":"ui/common/role_attr_tipo.png"}},{"type":"Label","props":{"y":11,"x":64,"text":"``121","fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":118,"x":64,"text":"``122","fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":224,"x":64,"text":"``123","fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":331,"x":64,"text":"``124","fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":50,"x":110,"wordWrap":true,"width":308,"text":"``12755","leading":4,"height":50,"fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":157,"x":110,"wordWrap":true,"width":308,"text":"``12756","leading":4,"height":50,"fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":263,"x":110,"wordWrap":true,"width":308,"text":"``12757","leading":4,"height":50,"fontSize":20,"color":"#dae8f5"}},{"type":"Label","props":{"y":370,"x":110,"wordWrap":true,"width":308,"text":"``12758","leading":4,"height":50,"fontSize":20,"color":"#dae8f5"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PlayerBag.RolePartUI.uiView);

        }

    }
}

module ui.PlayerBag {
    export class SkillItemUI extends Laya.Box {
		public _imgIcon:Laya.Image;
		public _imgSelect:Laya.Image;
		public _imgLock:Laya.Image;
		public _imgCheck:Laya.Image;
		public _txtInfo:Laya.Label;
		public _redMark:Laya.Animation;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":128,"height":124},"child":[{"type":"Image","props":{"y":15,"x":25,"width":78,"var":"_imgIcon","skin":"ui/common/skill_quan_an.png","height":78}},{"type":"Image","props":{"y":0,"x":10,"var":"_imgSelect","skin":"ui/common/skill_quan_select.png"}},{"type":"Image","props":{"y":7,"x":17,"skin":"ui/common/skill_quan_mask.png"}},{"type":"Image","props":{"y":30,"x":43,"var":"_imgLock","skin":"ui/common/skill_suo_liang.png"}},{"type":"Image","props":{"y":10,"x":20,"var":"_imgCheck","skin":"ui/common/skill_quan_check.png"}},{"type":"Label","props":{"y":80,"x":0,"width":128,"var":"_txtInfo","text":"label","strokeColor":"#000000","stroke":1,"height":42,"fontSize":20,"color":"#dae8f5","align":"center"}},{"type":"Animation","props":{"y":20,"x":95,"var":"_redMark","source":"Animations/AniRedDot.ani"}}]};
        constructor(){ super();this.createUI(ui.PlayerBag.SkillItemUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.PlayerBag {
    export class SkillPartUI extends View {
		public _btnConfig:Laya.Button;
		public _skillItem0:MyUI.SkillItem;
		public _skillItem1:MyUI.SkillItem;
		public _skillItem2:MyUI.SkillItem;
		public _skillItem3:MyUI.SkillItem;
		public _skillItem4:MyUI.SkillItem;
		public _skillItem5:MyUI.SkillItem;
		public _skillItem6:MyUI.SkillItem;
		public _skillItem7:MyUI.SkillItem;
		public _skillItem8:MyUI.SkillItem;
		public _txtTotalMoJing:Laya.Label;
		public _groupInfo:Laya.Box;
		public _btnOneKeyUp:Laya.Button;
		public _btnUpgrade:Laya.Button;
		public _detailItem:MyUI.SkillItem;
		public _txtSkillName:Laya.Label;
		public _txtTitleLevel:Laya.Label;
		public _txtNeedLevel:Laya.Label;
		public _txtTitleConsume:Laya.Label;
		public _txtGoldConsume:Laya.Label;
		public _txtMoJingConsume:Laya.Label;
		public _txtMPConsume:laya.html.dom.HTMLDivElement;
		public _txtCooldown:laya.html.dom.HTMLDivElement;
		public _txtReleaseScope:laya.html.dom.HTMLDivElement;
		public _txtSkillDesc:laya.html.dom.HTMLDivElement;
		public _groupConfig:Laya.Box;
		public _txtConfigDesc:laya.html.dom.HTMLDivElement;
		public _configItem0:MyUI.SkillItem;
		public _configItem1:MyUI.SkillItem;
		public _configItem2:MyUI.SkillItem;
		public _configItem3:MyUI.SkillItem;
		public _configItem4:MyUI.SkillItem;
		public _btnDisplayPage:Laya.Button;
		public _btnPage0:Laya.Button;
		public _btnPage1:Laya.Button;
		public _btnPage2:Laya.Button;
		public _inputCfgName:Laya.TextInput;
		public _btnRename:Laya.Button;
		public _btnReset:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":84,"x":222,"width":988,"height":610},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/background/skill_left_bg.png"}},{"type":"Image","props":{"y":15,"x":526,"width":464,"skin":"ui/common/window_frame_bak.png","height":598,"sizeGrid":"20,20,20,20"}},{"type":"Button","props":{"y":552,"x":470,"var":"_btnConfig","toggle":true,"skin":"ui/common/btn_config.png","stateNum":2}},{"type":"SkillItem","props":{"y":233,"x":197,"var":"_skillItem0","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":47,"x":197,"var":"_skillItem1","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":100,"x":329,"var":"_skillItem2","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":233,"x":384,"var":"_skillItem3","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":363,"x":330,"var":"_skillItem4","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":419,"x":198,"var":"_skillItem5","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":363,"x":68,"var":"_skillItem6","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":233,"x":15,"var":"_skillItem7","runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":99,"x":68,"var":"_skillItem8","runtime":"MyUI.SkillItem"}},{"type":"Label","props":{"y":14,"x":56,"var":"_txtTotalMoJing","text":0,"fontSize":26,"color":"#dae8f5"}},{"type":"Image","props":{"y":8,"x":12,"skin":"ui/common/money_mojing.png"}},{"type":"Box","props":{"y":15,"x":526,"var":"_groupInfo"},"child":[{"type":"Image","props":{"y":12,"x":11,"width":122,"skin":"ui/common/window_frame_bak6.png","height":144}},{"type":"Image","props":{"y":166,"x":13,"width":440,"skin":"ui/common/tip_line.png"}},{"type":"Image","props":{"y":423,"x":13,"width":440,"skin":"ui/common/tip_line.png"}},{"type":"Image","props":{"y":475,"x":67,"width":36,"skin":"ui/common/money_gold_binding.png","height":36}},{"type":"Image","props":{"y":475,"x":255,"width":36,"skin":"ui/common/money_mojing.png","height":36}},{"type":"Button","props":{"y":530,"x":13,"width":214,"var":"_btnOneKeyUp","skin":"ui/common/btn_anniu.png","label":"一键升级","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":530,"x":235,"width":214,"var":"_btnUpgrade","skin":"ui/common/btn_anniu.png","label":"升级","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"SkillItem","props":{"y":19,"x":8,"var":"_detailItem","runtime":"MyUI.SkillItem"}},{"type":"Label","props":{"y":17,"x":144,"var":"_txtSkillName","text":"label","fontSize":22,"color":"#dae8f5"}},{"type":"Label","props":{"y":446,"x":14,"var":"_txtTitleLevel","text":"所需等级：","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":446,"x":104,"var":"_txtNeedLevel","fontSize":18,"color":"#dae8f5"}},{"type":"Label","props":{"y":482,"x":14,"var":"_txtTitleConsume","text":"消耗：","fontSize":18,"color":"#99a2b1"}},{"type":"Label","props":{"y":482,"x":108,"var":"_txtGoldConsume","fontSize":18,"color":"#dae8f5"}},{"type":"Label","props":{"y":482,"x":293,"var":"_txtMoJingConsume","fontSize":18,"color":"#dae8f5"}},{"type":"HTMLDivElement","props":{"y":50,"x":144,"width":310,"var":"_txtMPConsume","innerHTML":"htmlText","height":22}},{"type":"HTMLDivElement","props":{"y":80,"x":144,"width":310,"var":"_txtCooldown","innerHTML":"htmlText","height":22}},{"type":"HTMLDivElement","props":{"y":110,"x":144,"width":310,"var":"_txtReleaseScope","innerHTML":"htmlText","height":48}},{"type":"HTMLDivElement","props":{"y":177,"x":14,"width":436,"var":"_txtSkillDesc","innerHTML":"htmlText","height":238}}]},{"type":"Box","props":{"y":15,"x":526,"var":"_groupConfig"},"child":[{"type":"HTMLDivElement","props":{"y":12,"x":16,"width":440,"var":"_txtConfigDesc","innerHTML":"htmlText","height":120}},{"type":"SkillItem","props":{"y":334,"x":67,"var":"_configItem0","scaleY":0.9,"scaleX":0.9,"runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":270,"x":179,"var":"_configItem1","scaleY":1.3,"scaleX":1.3,"runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":232,"x":81,"var":"_configItem2","scaleY":0.9,"scaleX":0.9,"runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":159,"x":152,"var":"_configItem3","scaleY":0.9,"scaleX":0.9,"runtime":"MyUI.SkillItem"}},{"type":"SkillItem","props":{"y":145,"x":256,"var":"_configItem4","scaleY":0.9,"scaleX":0.9,"runtime":"MyUI.SkillItem"}},{"type":"Button","props":{"y":376,"x":334,"var":"_btnDisplayPage","skin":"ui/common/btn_page_1.png","mouseEnabled":false,"labelSize":16,"labelPadding":"5,6,0,0","labelAlign":"right","label":1,"stateNum":1,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"Button","props":{"y":474,"x":146,"var":"_btnPage0","toggle":true,"skin":"ui/common/btn_page.png","name":0,"labelSize":22,"label":1,"stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"Button","props":{"y":474,"x":214,"var":"_btnPage1","toggle":true,"skin":"ui/common/btn_page.png","name":1,"labelSize":22,"label":2,"stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"Button","props":{"y":474,"x":282,"var":"_btnPage2","toggle":true,"skin":"ui/common/btn_page.png","name":2,"labelSize":22,"label":3,"stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"TextInput","props":{"y":539,"x":14,"width":284,"var":"_inputCfgName","text":"请输入技能配置名称","skin":"ui/common/window_input_bak.png","height":42,"fontSize":20,"align":"center","sizeGrid":"6,6,6,6","color":"#dae8f5"}},{"type":"Button","props":{"y":534,"x":309,"width":140,"var":"_btnRename","skin":"ui/common/btn_anniu.png","label":"label","height":50,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":474,"x":346,"var":"_btnReset","skin":"ui/common/btn_reset.png","stateNum":2}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.SkillItem",MyUI.SkillItem);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.PlayerBag.SkillPartUI.uiView);

        }

    }
}

module ui.PromptBox {
    export class PromptBoxUI extends Dialog {
		public _txtDesc:Laya.Label;
		public _btnConfirm:Laya.Button;
		public _btnCancel:Laya.Button;
		public _btnClose:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":500,"height":300},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"width":500,"skin":"ui/common/window_plate_bak.png","height":300,"sizeGrid":"10,10,10,10"}}]},{"type":"Box","props":{},"child":[{"type":"Label","props":{"y":108,"x":84,"wordWrap":true,"width":335,"var":"_txtDesc","height":69,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":500,"skin":"ui/common/window_title_bak1.png"}},{"type":"Button","props":{"y":200,"x":72,"width":150,"var":"_btnConfirm","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"确定","height":50,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":200,"x":271,"width":150,"var":"_btnCancel","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"取消","height":50,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":6,"x":456,"width":33,"var":"_btnClose","skin":"ui/common/btn_close.png","height":30,"stateNum":1}}]},{"type":"Label","props":{"y":7,"x":218,"text":"提示","fontSize":28,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PromptBox.PromptBoxUI.uiView);

        }

    }
}

module ui.SystemOpenFying {
    export class SystemOpenFyingPartUI extends Dialog {
		public _needHideBox:Laya.Box;
		public _twoImage:Laya.Image;
		public _sOpenName:Laya.Label;
		public _sOpenDesc:Laya.Label;
		public _oneImage:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":210,"x":589,"var":"_needHideBox"},"child":[{"type":"Image","props":{"y":82,"x":-290,"skin":"ui/background/systemopen_fly_bg.png"}},{"type":"Image","props":{"width":102,"var":"_twoImage","height":102}},{"type":"Label","props":{"y":133,"x":-74,"width":250,"var":"_sOpenName","text":"label","fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":170,"x":-350,"width":800,"var":"_sOpenDesc","text":"label","fontSize":24,"color":"#6EE2F3","align":"center"}},{"type":"Image","props":{"y":-33,"x":-47,"width":195,"skin":"ui/common/systemopen_fly_guang.png","height":173}},{"type":"Image","props":{"x":-4,"width":110,"skin":"ui/common/systemopen_fly_yuan.png","height":110}},{"type":"Image","props":{"width":102,"height":102}}]},{"type":"Image","props":{"y":215,"x":589,"width":102,"var":"_oneImage","height":102}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.SystemOpenFying.SystemOpenFyingPartUI.uiView);

        }

    }
}

module ui.SystemWizard {
    export class SystemWizardItemUI extends View {
		public _goodsName:Laya.Label;
		public _btnClose:Laya.Button;
		public _btnConfirm:Laya.Button;
		public _goodsIcon:MyUI.GoodsIcon;
		public _autoTimer:Laya.Label;
		public _goodsCount:Laya.Label;
		public _goodsDesc:laya.html.dom.HTMLDivElement;

        public static  uiView:any ={"type":"View","props":{"x":0,"width":0,"mouseThrough":true,"height":0},"child":[{"type":"Box","props":{"top":200,"left":800,"height":222},"child":[{"type":"Image","props":{"width":180,"skin":"ui/common/window_plate_bak.png","height":222,"sizeGrid":"10,10,10,10"}},{"type":"Label","props":{"y":118,"width":180,"var":"_goodsName","text":"label","height":20,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":6,"x":160,"width":14,"var":"_btnClose","stateNum":1,"skin":"ui/common/btn_close1.png","height":15}},{"type":"Button","props":{"y":172,"x":7,"width":166,"var":"_btnConfirm","stateNum":2,"skin":"ui/common/btn_anniu.png","height":44,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"GoodsIcon","props":{"y":21,"x":50,"var":"_goodsIcon","runtime":"MyUI.GoodsIcon"}},{"type":"Label","props":{"y":223,"x":0,"width":180,"var":"_autoTimer","height":20,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":80,"x":56,"width":8,"var":"_goodsCount","height":8,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"HTMLDivElement","props":{"y":142,"x":0,"width":180,"var":"_goodsDesc","innerHTML":"htmlText","height":20}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.SystemWizard.SystemWizardItemUI.uiView);

        }

    }
}

module ui.Task.Components {
    export class TaskBoxMiniTotemUI extends Laya.Box {
		public _textTotemName:Laya.Label;
		public _proTotem:Laya.ProgressBar;
		public _textProValue:Laya.Label;
		public _imageTotemIcon:Laya.Image;
		public _btnTotemPanel:Laya.Button;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":0,"renderType":"render","height":0},"child":[{"type":"Image","props":{"width":278,"skin":"ui/main/img_renwu_294_highlight.png","height":68}},{"type":"Label","props":{"y":15,"x":69,"var":"_textTotemName","text":"label","fontSize":18,"color":"#FFF5B9"}},{"type":"ProgressBar","props":{"y":37,"x":60,"width":204,"var":"_proTotem","skin":"ui/common/progress_task_tuteng.png","sizeGrid":"5,5,5,5"}},{"type":"Label","props":{"y":36,"x":118,"width":100,"var":"_textProValue","text":"label","fontSize":14,"color":"#FFFfff","align":"center"}},{"type":"Image","props":{"y":1,"x":5,"width":61,"var":"_imageTotemIcon","height":65}},{"type":"Button","props":{"y":0,"x":-2,"width":278,"var":"_btnTotemPanel","height":68}}]};
        constructor(){ super();this.createUI(ui.Task.Components.TaskBoxMiniTotemUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Task {
    export class NPCDialogPartUI extends Dialog {
		public _btnClose:Laya.Button;
		public _txtNpcName:Laya.Label;
		public _txtNpcTalk:laya.html.dom.HTMLDivElement;
		public _groupOperation:Laya.Box;
		public _txtTitleFunc:Laya.Label;
		public _buttonList:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":370,"left":60,"height":520,"centerY":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/background/npcdialog_bak.png"}},{"type":"Image","props":{"y":1,"x":1,"width":366,"skin":"ui/common/window_title_bak3.png"}},{"type":"Button","props":{"y":15,"x":339,"var":"_btnClose","skin":"ui/common/btn_close1.png","stateNum":1}},{"type":"Label","props":{"y":50,"x":12,"width":346,"var":"_txtNpcName","text":"label","height":24,"fontSize":24,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":82,"x":12,"width":346,"var":"_txtNpcTalk","innerHTML":"htmlText","height":100}},{"type":"Box","props":{"y":189,"x":1,"var":"_groupOperation"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":366,"skin":"ui/common/window_title_bak3.png"}},{"type":"Label","props":{"y":9,"x":11,"width":346,"var":"_txtTitleFunc","text":"label","height":24,"fontSize":24,"color":"#dae8f5","align":"left"}},{"type":"List","props":{"y":258,"x":9,"var":"_buttonList","spaceY":-120,"selectEnable":false},"child":[{"type":"Button","props":{"width":350,"toggle":false,"skin":"ui/common/btn_anniu.png","renderType":"render","label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"},"child":[{"type":"Image","props":{"y":10,"x":36,"name":"_imgIcon"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.Task.NPCDialogPartUI.uiView);

        }

    }
}

module ui.Task {
    export class NPCDoingTaskPartUI extends Dialog {
		public _btnClose:Laya.Button;
		public _NPCText:laya.html.dom.HTMLDivElement;
		public _TalkText:laya.html.dom.HTMLDivElement;
		public _txtTitleReward:Laya.Label;
		public _Box_up:Laya.Box;
		public _UpText:Laya.Label;
		public _UpIcon:Laya.Image;
		public _Box_down:Laya.Box;
		public _DownText:Laya.Label;
		public _DownIcon:Laya.Image;
		public _Submit:Laya.Button;
		public _Icon1:MyUI.GoodsIcon;
		public _Icon2:MyUI.GoodsIcon;

        public static  uiView:any ={"type":"Dialog","props":{"width":370,"left":60,"height":520,"centerY":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/background/npcdialog_bak.png"}},{"type":"Image","props":{"y":1,"x":1,"width":366,"skin":"ui/common/window_title_bak3.png"}},{"type":"Image","props":{"y":189,"x":1,"width":366,"skin":"ui/common/window_title_bak3.png"}},{"type":"Button","props":{"y":15,"x":339,"var":"_btnClose","skin":"ui/common/btn_close1.png","name":"close","stateNum":1}},{"type":"HTMLDivElement","props":{"y":50,"x":12,"width":346,"var":"_NPCText","innerHTML":"htmlText","height":24}},{"type":"HTMLDivElement","props":{"y":82,"x":12,"width":346,"var":"_TalkText","innerHTML":"htmlText","height":100}},{"type":"Label","props":{"y":198,"x":12,"width":115,"var":"_txtTitleReward","text":"label","height":24,"fontSize":24,"color":"#dae8f5","align":"left"}},{"type":"Box","props":{"y":246,"x":12,"width":347,"var":"_Box_up","name":"Box_up","height":42},"child":[{"type":"Label","props":{"y":11,"x":50,"width":133,"var":"_UpText","text":40,"height":24,"fontSize":24,"color":"#dae8f5"}},{"type":"Image","props":{"y":0,"x":0,"width":348,"skin":"ui/common/window_frame_bak1.png","height":42,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"width":42,"var":"_UpIcon","height":42}}]},{"type":"Box","props":{"y":300,"x":13,"width":347,"var":"_Box_down","name":"Box_down","height":42},"child":[{"type":"Label","props":{"y":10,"x":50,"width":133,"var":"_DownText","height":24,"fontSize":24,"color":"#dae8f5"}},{"type":"Image","props":{"y":0,"x":0,"width":348,"skin":"ui/common/window_frame_bak1.png","height":42,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"width":42,"var":"_DownIcon","height":42}}]},{"type":"Button","props":{"y":451,"x":10,"width":350,"var":"_Submit","skin":"ui/common/btn_anniu.png","labelSize":28,"label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"GoodsIcon","props":{"y":360,"x":16,"visible":false,"var":"_Icon1","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":360,"x":120,"visible":false,"var":"_Icon2","runtime":"MyUI.GoodsIcon"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            super.createChildren();
            this.createView(ui.Task.NPCDoingTaskPartUI.uiView);

        }

    }
}

module ui.Task {
    export class TaskBoxMiniUI extends Laya.Sprite {
		public mBtnTask:Laya.Button;
		public mBtnTeam:Laya.Button;
		public _boxMainTaskInfo:Laya.Box;
		public mBtnTaskIcon:Laya.Button;
		public mTxtTaskInfo:laya.html.dom.HTMLDivElement;
		public _boxTuTengInfo:Laya.Box;
		public _boxTotem:LogicTask.TaskBoxMiniTotem;

        public static  uiView:any ={"type":"Sprite","props":{"y":0,"x":0},"child":[{"type":"Box","props":{"width":300,"height":215},"child":[{"type":"Button","props":{"y":-1,"x":5,"var":"mBtnTask","stateNum":2,"skin":"ui/main/btn_task.png"}},{"type":"Button","props":{"y":108,"x":5,"var":"mBtnTeam","stateNum":2,"skin":"ui/main/btn_zudui.png"}},{"type":"Box","props":{"y":75,"x":58,"var":"_boxMainTaskInfo"},"child":[{"type":"Image","props":{"y":1,"width":278,"skin":"ui/main/img_renwu_294.png","height":68}},{"type":"Button","props":{"y":32,"x":73,"width":250,"var":"mBtnTaskIcon","pivotY":32,"pivotX":73,"height":69}},{"type":"HTMLDivElement","props":{"y":5,"x":4,"width":260,"var":"mTxtTaskInfo","mouseEnabled":false,"innerHTML":"<font style='fontSize:20' color='#f2b308'>[主]前往城外<br/></font>去[皇都原]找<font color='#49bd1b'>王云</font>对话<font color='#e73722'>(0/1)<br/></font>","height":59}}]},{"type":"Box","props":{"y":1,"x":58,"var":"_boxTuTengInfo"},"child":[{"type":"TaskBoxMiniTotem","props":{"var":"_boxTotem","runtime":"LogicTask.TaskBoxMiniTotem"}}]}]}]};
        constructor(){ super();this.createUI(ui.Task.TaskBoxMiniUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("LogicTask.TaskBoxMiniTotem",LogicTask.TaskBoxMiniTotem);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.tip {
    export class EquipTipUI extends Dialog {
		public _bgContent:Laya.Image;
		public _btnClose:Laya.Button;
		public _txtTitle:laya.html.dom.HTMLDivElement;
		public _goodsIcon:MyUI.GoodsIcon;
		public _imgZhuoYue:Laya.Image;
		public _txtGrade:Laya.Label;
		public _txtCombat:Laya.Label;
		public _txtTitleCombat:Laya.Label;
		public _txtType:Laya.Label;
		public _txtOccu:laya.html.dom.HTMLDivElement;
		public _panelContent:Laya.Panel;
		public _groupContent:Laya.VBox;
		public _groupCondition:Laya.Box;
		public _txtLevel:laya.html.dom.HTMLDivElement;
		public _txtCondition0:laya.html.dom.HTMLDivElement;
		public _txtCondition1:laya.html.dom.HTMLDivElement;
		public _txtCondition2:laya.html.dom.HTMLDivElement;
		public _txtCondition3:laya.html.dom.HTMLDivElement;
		public _groupBasic:Laya.Box;
		public _txtTitleBasic:Laya.Label;
		public _groupStar0:Laya.Box;
		public _progressBg0:Laya.List;
		public _progressBar0:Laya.List;
		public _groupStar1:Laya.Box;
		public _progressBg1:Laya.List;
		public _progressBar1:Laya.List;
		public _txtBasic:laya.html.dom.HTMLDivElement;
		public _groupAddition:Laya.Box;
		public _progressAddition:Laya.ProgressBar;
		public _txtProgAddition:Laya.Label;
		public _txtTitleAddition:Laya.Label;
		public _txtAddition:laya.html.dom.HTMLDivElement;
		public _groupRefined:Laya.Box;
		public _txtTitleRefined:Laya.Label;
		public _txtRefined:laya.html.dom.HTMLDivElement;
		public _groupRandom:Laya.Box;
		public _txtTitleRandom:Laya.Label;
		public _txtRandom:laya.html.dom.HTMLDivElement;
		public _groupLucky:Laya.Box;
		public _txtTitleLucky:Laya.Label;
		public _txtLucky:laya.html.dom.HTMLDivElement;
		public _groupRebirth:Laya.Box;
		public _txtTitleRebirth:Laya.Label;
		public _txtRebirth:laya.html.dom.HTMLDivElement;
		public _groupPrice:Laya.Box;
		public _imgMoney:Laya.Image;
		public _txtPrice:laya.html.dom.HTMLDivElement;
		public _txtDurability:laya.html.dom.HTMLDivElement;
		public _groupButton:Laya.HBox;
		public _btnScan:Laya.Button;
		public _btnSale:Laya.Button;
		public _btnUse:Laya.Button;
		public _btnTakeOff:Laya.Button;
		public _btnPutIn:Laya.Button;
		public _btnProcess:Laya.Button;
		public _btnBuy:Laya.Button;
		public _btnDestroy:Laya.Button;
		public _btnWear:Laya.Button;
		public _btnGetBack:Laya.Button;
		public _btnUpShelf:Laya.Button;
		public _imgEquiped:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{},"child":[{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":468,"var":"_bgContent","skin":"ui/common/window_plate_bak.png","height":628,"sizeGrid":"10,10,10,10"}},{"type":"Box","props":{"y":1,"x":2},"child":[{"type":"Image","props":{"y":0,"x":0,"width":464,"skin":"ui/common/window_title_bak1.png"}},{"type":"Button","props":{"y":14,"x":435,"var":"_btnClose","skin":"ui/common/btn_close1.png","name":"close","stateNum":1}},{"type":"HTMLDivElement","props":{"y":11,"x":62,"width":340,"var":"_txtTitle","height":22}}]},{"type":"Box","props":{"y":59,"x":14},"child":[{"type":"GoodsIcon","props":{"y":0,"x":0,"var":"_goodsIcon","scaleY":1.2,"scaleX":1.2,"runtime":"MyUI.GoodsIcon"}},{"type":"Image","props":{"y":-6,"x":111,"width":324,"var":"_imgZhuoYue","skin":"ui/common/tip_chuanshuo_lan.png","height":108}},{"type":"Image","props":{"y":107,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":2,"x":108,"var":"_txtGrade","text":"Grade","fontSize":18,"color":"#749a29","align":"left"}},{"type":"Label","props":{"y":37,"x":108,"var":"_txtCombat","text":"Combat","fontSize":26,"color":"#dae8f5","align":"left"}},{"type":"Label","props":{"y":77,"x":108,"var":"_txtTitleCombat","text":"CombatTitle","fontSize":18,"color":"#99a2b1","align":"left"}},{"type":"Label","props":{"y":2,"x":370,"width":70,"var":"_txtType","text":"Type","height":18,"fontSize":18,"color":"#99a2b1","align":"right"}},{"type":"HTMLDivElement","props":{"y":77,"x":284,"width":156,"var":"_txtOccu","innerHTML":"htmlText","height":18}}]},{"type":"Panel","props":{"y":178,"x":14,"width":440,"var":"_panelContent","vScrollBarSkin":"ui/common/vscroll.png","height":352},"child":[{"type":"VBox","props":{"y":0,"x":0,"var":"_groupContent","space":10},"child":[{"type":"Box","props":{"var":"_groupCondition"},"child":[{"type":"HTMLDivElement","props":{"y":0,"x":0,"width":210,"var":"_txtLevel","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":0,"x":230,"width":210,"var":"_txtCondition0","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":23,"x":0,"width":210,"var":"_txtCondition1","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":23,"x":230,"width":210,"var":"_txtCondition2","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":46,"x":0,"width":210,"var":"_txtCondition3","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupBasic"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleBasic","text":"[Basic]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"Box","props":{"y":38,"x":2,"var":"_groupStar0"},"child":[{"type":"List","props":{"var":"_progressBg0","spaceX":1,"repeatX":15},"child":[{"type":"Image","props":{"skin":"ui/common/tip_star_bg.png","renderType":"render"}}]},{"type":"List","props":{"var":"_progressBar0","spaceX":1,"repeatX":15},"child":[{"type":"Image","props":{"skin":"ui/common/tip_star.png","renderType":"render"}}]}]},{"type":"Box","props":{"y":67,"x":2,"var":"_groupStar1"},"child":[{"type":"List","props":{"var":"_progressBg1","spaceX":1,"repeatX":15},"child":[{"type":"Image","props":{"skin":"ui/common/tip_star_bg.png","renderType":"render"}}]},{"type":"List","props":{"var":"_progressBar1","spaceX":1,"repeatX":2},"child":[{"type":"Image","props":{"skin":"ui/common/tip_star.png","renderType":"render"}}]}]},{"type":"HTMLDivElement","props":{"y":96,"x":0,"width":436,"var":"_txtBasic","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupAddition"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"ProgressBar","props":{"y":37,"x":0,"var":"_progressAddition","value":0.5,"skin":"ui/common/progress_tip_addition.png"}},{"type":"Label","props":{"y":33,"x":174,"width":90,"var":"_txtProgAddition","text":"5/80","height":16,"fontSize":16,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleAddition","text":"[Addition]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":50,"x":0,"width":436,"var":"_txtAddition","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupRefined"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleRefined","text":"[Refined]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":38,"x":0,"width":436,"var":"_txtRefined","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupRandom"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleRandom","text":"[Random]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":38,"x":0,"width":436,"var":"_txtRandom","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupLucky"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleLucky","text":"[Lucky]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":38,"x":0,"width":436,"var":"_txtLucky","innerHTML":"htmlText","height":18}}]},{"type":"Box","props":{"var":"_groupRebirth"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"ui/common/tip_line.png","height":3}},{"type":"Label","props":{"y":8,"x":0,"var":"_txtTitleRebirth","text":"[Rebirth]","fontSize":20,"color":"#dae8f5","align":"left"}},{"type":"HTMLDivElement","props":{"y":38,"x":0,"width":436,"var":"_txtRebirth","innerHTML":"htmlText","height":18}}]}]}]},{"type":"Box","props":{"y":532,"x":2,"var":"_groupPrice"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":464,"skin":"ui/common/tip_bg_money.png","height":34}},{"type":"Image","props":{"y":6,"x":62,"width":26,"var":"_imgMoney","skin":"ui/common/money_gold.png","height":26}},{"type":"HTMLDivElement","props":{"y":9,"x":12,"width":216,"var":"_txtPrice","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":9,"x":262,"width":188,"var":"_txtDurability","innerHTML":"htmlText","height":18}}]},{"type":"HBox","props":{"y":570,"x":14,"width":440,"var":"_groupButton","space":2},"child":[{"type":"Button","props":{"width":38,"var":"_btnScan","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":0,"x":40,"width":38,"var":"_btnSale","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnUse","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnTakeOff","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnPutIn","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnProcess","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnBuy","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnDestroy","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnWear","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":38,"var":"_btnGetBack","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"y":0,"x":160,"width":38,"var":"_btnUpShelf","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}}]},{"type":"Image","props":{"y":-3,"x":-2,"var":"_imgEquiped","skin":"ui/common/tip_equiped.png"},"child":[{"type":"Label","props":{"y":37,"x":6,"text":"已装备","rotation":-47,"fontSize":14,"color":"#ffffff"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            super.createChildren();
            this.createView(ui.tip.EquipTipUI.uiView);

        }

    }
}

module ui.tip {
    export class GoodsTipUI extends Dialog {
		public _contentBg:Laya.Image;
		public _groupContent:Laya.VBox;
		public _btnClose:Laya.Button;
		public _txtTitle:Laya.Label;
		public _groupIcon:Laya.Box;
		public _goodsIcon:MyUI.GoodsIcon;
		public _txtType:laya.html.dom.HTMLDivElement;
		public _txtLevel:laya.html.dom.HTMLDivElement;
		public _txtOccu:laya.html.dom.HTMLDivElement;
		public _txtDesc:laya.html.dom.HTMLDivElement;
		public _txtValidTime:laya.html.dom.HTMLDivElement;
		public _groupSplit:Laya.Box;
		public _btnSplit:Laya.Button;
		public _btnMinus:Laya.Button;
		public _btnPlus:Laya.Button;
		public _txtSplitNum:Laya.Label;
		public _txtTitleSplit:Laya.Label;
		public _groupPrice:Laya.Box;
		public _txtLimited:Laya.Label;
		public _imgMoney:Laya.Image;
		public _txtPrice:laya.html.dom.HTMLDivElement;
		public _txtCount:laya.html.dom.HTMLDivElement;
		public _groupButton:Laya.HBox;
		public _btnUpShelf:Laya.Button;
		public _btnSale:Laya.Button;
		public _btnGetBack:Laya.Button;
		public _btnPutIn:Laya.Button;
		public _btnDestroy:Laya.Button;
		public _btnBuy:Laya.Button;
		public _btnUse:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"popupCenter":true,"height":600},"child":[{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":370,"var":"_contentBg","skin":"ui/common/window_plate_bak.png","height":426,"sizeGrid":"10,10,10,10"}},{"type":"VBox","props":{"y":1,"x":2,"var":"_groupContent","space":10,"layoutEnabled":false},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/common/window_title_bak1.png"}},{"type":"Button","props":{"y":14,"x":337,"var":"_btnClose","skin":"ui/common/btn_close1.png","name":"close","stateNum":1}},{"type":"Label","props":{"y":11,"x":52,"width":261,"var":"_txtTitle","text":"Name","height":22,"fontSize":22,"color":"#d6dfe8","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":58,"x":10,"var":"_groupIcon"},"child":[{"type":"GoodsIcon","props":{"y":0,"x":2,"var":"_goodsIcon","scaleY":1.2,"scaleX":1.2,"runtime":"MyUI.GoodsIcon"}},{"type":"HTMLDivElement","props":{"y":7,"x":116,"width":168,"var":"_txtType","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":38,"x":116,"width":168,"var":"_txtLevel","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":68,"x":116,"width":168,"var":"_txtOccu","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":118,"width":347,"var":"_txtDesc","innerHTML":"htmlText","height":80}},{"type":"HTMLDivElement","props":{"y":174,"x":0,"width":294,"var":"_txtValidTime","innerHTML":"htmlText","height":18}},{"type":"Image","props":{"y":103,"x":0,"width":346,"skin":"ui/common/tip_line.png","height":3}},{"type":"Image","props":{"y":215,"x":0,"width":346,"skin":"ui/common/tip_line.png"}}]},{"type":"Box","props":{"y":284,"x":10,"var":"_groupSplit"},"child":[{"type":"Button","props":{"y":0,"x":248,"width":97,"var":"_btnSplit","skin":"ui/common/btn_anniu.png","labelSize":20,"label":"label","height":44,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelBold":"false"}},{"type":"Button","props":{"y":4,"x":59,"var":"_btnMinus","skin":"ui/common/btn_cp_minus.png","stateNum":2}},{"type":"Button","props":{"y":4,"x":202,"var":"_btnPlus","skin":"ui/common/btn_cp_plus.png","stateNum":2}},{"type":"Image","props":{"y":4,"x":106,"width":86,"skin":"ui/common/window_input_bak.png","height":36,"sizeGrid":"6,6,6,6","color":"#dae8f5"}},{"type":"Label","props":{"y":14,"x":124,"width":50,"var":"_txtSplitNum","text":"1","fontSize":16,"color":"#dae8f5","align":"center"}},{"type":"Label","props":{"y":13,"x":0,"var":"_txtTitleSplit","text":"Num:","fontSize":18,"color":"#99a2b1","align":"left"}}]},{"type":"Box","props":{"y":336,"x":10,"var":"_groupPrice"},"child":[{"type":"Label","props":{"y":28,"x":0,"var":"_txtLimited","text":"Limited","layoutEnabled":false,"fontSize":18,"color":"#99a2b1","align":"left"}},{"type":"Image","props":{"y":-2,"x":54,"width":26,"var":"_imgMoney","skin":"ui/common/money_diamond_binding.png","height":26}},{"type":"HTMLDivElement","props":{"y":0,"x":0,"width":140,"var":"_txtPrice","innerHTML":"htmlText","height":18}},{"type":"HTMLDivElement","props":{"y":0,"x":220,"width":124,"var":"_txtCount","innerHTML":"htmlText","height":18}}]},{"type":"HBox","props":{"y":372,"x":10,"width":346,"var":"_groupButton","space":4,"height":48},"child":[{"type":"Button","props":{"width":46,"var":"_btnUpShelf","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnSale","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnGetBack","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnPutIn","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnDestroy","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnBuy","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Button","props":{"width":46,"var":"_btnUse","skin":"ui/common/btn_anniu.png","label":"label","height":48,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.tip.GoodsTipUI.uiView);

        }

    }
}

module ui.Totem.Components {
    export class TotemIconRenderUI extends Laya.Box {
		public _imageIcon:Laya.Image;
		public _imageSelected:Laya.Image;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":102,"renderType":"render","height":102},"child":[{"type":"Image","props":{"y":1,"x":1,"width":101,"skin":"ui/common/totem_kuang_daoju.png","sizeGrid":"5,5,5,5","height":101}},{"type":"Image","props":{"y":0.5,"x":0.5,"width":101,"var":"_imageIcon","height":101,"disabled":true}},{"type":"Image","props":{"y":-6,"x":-7,"width":116,"var":"_imageSelected","skin":"ui/common/totem_kuang_xz_w.png","sizeGrid":"10,10,10,10","height":116}}]};
        constructor(){ super();this.createUI(ui.Totem.Components.TotemIconRenderUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Totem {
    export class TotemInfoBoxUI extends Dialog {
		public _htmlDesc1:laya.html.dom.HTMLDivElement;
		public _htmlDesc2:laya.html.dom.HTMLDivElement;
		public _htmlTotemTuJing:laya.html.dom.HTMLDivElement;
		public _btnGoChallenge:Laya.Button;
		public _textTotemName:Laya.Label;
		public _imageRightSmall:Laya.Image;
		public _btnLook:Laya.Button;
		public _listTotemIcon:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":153,"x":530,"width":440,"skin":"ui/common/tip_line.png"}},{"type":"Image","props":{"y":396,"x":530,"width":440,"skin":"ui/common/tip_line.png"}},{"type":"HTMLDivElement","props":{"y":39,"x":545,"width":420,"var":"_htmlDesc1","innerHTML":"htmlText","height":104}},{"type":"HTMLDivElement","props":{"y":174,"x":545,"width":420,"var":"_htmlDesc2","innerHTML":"htmlText","height":129}},{"type":"HTMLDivElement","props":{"y":419,"x":545,"width":420,"var":"_htmlTotemTuJing","innerHTML":"htmlText","height":40}},{"type":"Button","props":{"y":519,"x":545,"width":416,"var":"_btnGoChallenge","stateNum":2,"skin":"ui/common/btn_anniu.png","label":"进行挑战","height":58,"sizeGrid":"8,10,8,10","labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"Image","props":{"y":453,"x":210,"width":296,"skin":"ui/common/totem_mingzidi.png","height":47}},{"type":"Label","props":{"y":465,"x":302,"width":112,"var":"_textTotemName","text":"label","height":26,"fontSize":22,"color":"#DAE8F5","align":"center"}},{"type":"Image","props":{"y":302,"x":905,"width":50,"var":"_imageRightSmall","skin":"ui/common/totem_di_beidongjineng_da.png","height":50}},{"type":"Image","props":{"y":302,"x":905,"width":50,"height":50}},{"type":"Button","props":{"y":353,"x":900,"width":60,"var":"_btnLook","stateNum":2,"skin":"ui/common/btn_totem_look.png","labelSize":18,"labelColors":"#ffffff","label":"label","height":24}}]},{"type":"List","props":{"y":5,"x":3,"width":115,"var":"_listTotemIcon","renderType":"render","height":585},"child":[{"type":"TotemIconRender","props":{"y":5,"x":6,"runtime":"MyUI.TotemIconRender","renderType":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.TotemIconRender",MyUI.TotemIconRender);

            super.createChildren();
            this.createView(ui.Totem.TotemInfoBoxUI.uiView);

        }

    }
}

module ui.Totem {
    export class TotemPartUI extends Dialog {
		public _imageTotemBG:Laya.Image;
		public _imageTotem:Laya.Image;
		public _boxQiuLong:MyUI.TotemInfoBox;
		public _boxJiaoLong:MyUI.TotemInfoBox;
		public _boxLiLong:MyUI.TotemInfoBox;

        public static  uiView:any ={"type":"Dialog","props":{"y":101,"x":234,"width":1000,"height":590},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"width":120,"skin":"ui/common/icon_bg_grid.png","height":590}},{"type":"Image","props":{"x":125,"width":845,"var":"_imageTotemBG","height":586}},{"type":"Image","props":{"y":89,"x":203,"width":303,"var":"_imageTotem","height":328}},{"type":"Image","props":{"y":153,"x":530,"width":440,"skin":"ui/common/tip_line.png"}},{"type":"Image","props":{"y":396,"x":530,"width":440,"skin":"ui/common/tip_line.png"}}]},{"type":"TotemInfoBox","props":{"var":"_boxQiuLong","runtime":"MyUI.TotemInfoBox"}},{"type":"TotemInfoBox","props":{"var":"_boxJiaoLong","runtime":"MyUI.TotemInfoBox"}},{"type":"TotemInfoBox","props":{"var":"_boxLiLong","runtime":"MyUI.TotemInfoBox"}},{"type":"Image","props":{"y":10,"x":135,"width":845,"height":586}},{"type":"Image","props":{"y":99,"x":213,"width":303,"height":328}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TotemInfoBox",MyUI.TotemInfoBox);

            super.createChildren();
            this.createView(ui.Totem.TotemPartUI.uiView);

        }

    }
}

module ui.Vip {
    export class VipItemUI extends Dialog {
		public _vipDescTitleText:Laya.Label;
		public _vipDescTitleText1:Laya.Label;
		public _vipDescTitleText2:Laya.Label;
		public _teQuanBuffImage:Laya.Image;
		public _jingPoHuiShouImage:Laya.Image;
		public _suiShenCangKuImage:Laya.Image;
		public _yiLIngQuImage:Laya.Image;
		public _getRewardBtn:Laya.Button;
		public _rewardList:Laya.List;
		public _quanXianList:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":995,"height":476},"child":[{"type":"Box","props":{"y":0,"x":0,"width":995,"height":476},"child":[{"type":"Image","props":{"y":0,"x":0,"width":445,"skin":"ui/common/window_frame_bak3.png","height":476,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":0,"x":451,"width":545,"skin":"ui/common/window_frame_bak3.png","height":192,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":201,"x":451,"width":545,"skin":"ui/common/window_frame_bak3.png","height":275,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":10,"x":60,"skin":"ui/common/vip_text_di.png"}},{"type":"Image","props":{"y":10,"x":565,"skin":"ui/common/vip_text_di.png"}},{"type":"Image","props":{"y":210,"x":565,"skin":"ui/common/vip_text_di.png"}},{"type":"Label","props":{"y":15,"x":122,"width":200,"var":"_vipDescTitleText","text":"贵族特权","fontSize":26,"color":"#DCF1FA","align":"center"}},{"type":"Label","props":{"y":15,"x":624,"width":200,"var":"_vipDescTitleText1","text":"贵族特权","fontSize":26,"color":"#DCF1FA","align":"center"}},{"type":"Label","props":{"y":215,"x":624,"width":200,"var":"_vipDescTitleText2","text":"贵族特权","fontSize":26,"color":"#DCF1FA","align":"center"}},{"type":"Image","props":{"y":57,"x":464,"width":520,"skin":"ui/common/window_frame_bak1.png","height":124,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":256,"x":464,"width":520,"skin":"ui/common/window_frame_bak1.png","height":125,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":58,"x":12,"width":421,"skin":"ui/common/window_frame_bak1.png","height":405,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":82,"x":563,"width":72,"var":"_teQuanBuffImage","skin":"ui/common/vip_suishencangku.png","height":72}},{"type":"Image","props":{"y":82,"x":688,"width":72,"var":"_jingPoHuiShouImage","skin":"ui/common/vip_huishou.png","height":72}},{"type":"Image","props":{"y":82,"x":812,"width":72,"var":"_suiShenCangKuImage","skin":"ui/common/vip_tequanbuff.png","height":72}},{"type":"Image","props":{"y":390,"x":637,"var":"_yiLIngQuImage","skin":"ui/common/btn_yilingqu.png"}},{"type":"Button","props":{"y":400,"x":639,"width":180,"var":"_getRewardBtn","skin":"ui/common/btn_anniu.png","height":55,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"List","props":{"y":278,"x":492,"var":"_rewardList","height":81},"child":[{"type":"GoodsIcon","props":{"y":0,"x":0,"runtime":"ui.Components.GoodsIconUI"}}]},{"type":"List","props":{"y":77,"x":35,"var":"_quanXianList"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.Components.GoodsIconUI",ui.Components.GoodsIconUI);

            super.createChildren();
            this.createView(ui.Vip.VipItemUI.uiView);

        }

    }
}

module ui.Vip {
    export class VipPartUI extends Dialog {
		public _titleText:Laya.Label;
		public _btnClose:Laya.Button;
		public _currVipLevelText:Laya.Label;
		public _descText:Laya.Label;
		public _descText1:Laya.Label;
		public _nextVipLevelNumsText:Laya.Label;
		public _nextVipLevelText:Laya.Label;
		public _chongZhiBtn:Laya.Button;
		public _progressBar:Laya.ProgressBar;
		public _progressBarText:Laya.Label;
		public _vipItemCanvas:Laya.List;
		public _rightImageBtn:Laya.Image;
		public _leftImageBtn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":20,"x":55,"width":1170,"skin":"ui/common/window_plate_bak.png","height":678,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":20,"x":55,"width":1170,"skin":"ui/common/window_title_bak.png","height":58}},{"type":"Image","props":{"y":180,"x":65,"width":1150,"skin":"ui/common/window_frame_bak.png","height":517,"sizeGrid":"20,20,20,20"}},{"type":"Label","props":{"y":35,"x":592,"width":100,"var":"_titleText","fontSize":30,"color":"#D6DFE8","align":"center"}},{"type":"Box","props":{},"child":[{"type":"Button","props":{"y":35,"x":1177,"var":"_btnClose","stateNum":1,"skin":"ui/common/btn_close.png"}},{"type":"Image","props":{"y":114,"x":76,"skin":"ui/common/vip_guizuzi.png"}},{"type":"Label","props":{"y":116,"x":184,"var":"_currVipLevelText","text":"5","fontSize":44,"color":"#eff815"}},{"type":"Label","props":{"y":100,"x":391,"var":"_descText","fontSize":20,"color":"#9AAAC4"}},{"type":"Label","props":{"y":100,"x":627,"width":120,"var":"_descText1","fontSize":20,"color":"#9AAAC4","align":"center"}},{"type":"Image","props":{"y":89,"x":473,"width":46,"skin":"ui/common/money_diamond.png","height":47}},{"type":"Label","props":{"y":100,"x":504,"width":120,"var":"_nextVipLevelNumsText","text":"888888888","fontSize":20,"color":"#ffeb0d","align":"center"}},{"type":"Image","props":{"y":99,"x":744,"width":43,"skin":"ui/common/vip_guizuzi.png","height":24}},{"type":"Label","props":{"y":100,"x":795,"var":"_nextVipLevelText","text":"8","height":20,"fontSize":20,"color":"#e9fd0a"}},{"type":"Button","props":{"y":110,"x":1032,"width":180,"var":"_chongZhiBtn","stateNum":3,"skin":"ui/common/vip_anniu.png","labelSize":26,"labelColors":"#FCFAFD","height":60}},{"type":"ProgressBar","props":{"y":130,"x":245,"width":750,"var":"_progressBar","skin":"ui/common/progress_vip_jindutiao.png","sizeGrid":"5,5,5,5","height":22}},{"type":"Label","props":{"y":131,"x":521,"width":200,"var":"_progressBarText","text":"888/1000","fontSize":18,"color":"#DAE8F5","align":"center"}}]},{"type":"List","props":{"y":200,"x":142,"var":"_vipItemCanvas"}},{"type":"Image","props":{"y":405,"x":1166,"var":"_rightImageBtn","skin":"ui/common/vip_jiantou.png"}},{"type":"Image","props":{"y":405,"x":116,"var":"_leftImageBtn","skin":"ui/common/vip_jiantou.png","scaleX":-1}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Vip.VipPartUI.uiView);

        }

    }
}

module ui.Vip {
    export class VipQuanXianItemUI extends Dialog {
		public _descText:laya.html.dom.HTMLDivElement;

        public static  uiView:any ={"type":"Dialog","props":{"width":280,"height":20},"child":[{"type":"Image","props":{"y":4,"x":0,"skin":"ui/common/vip_lingxing.png"}},{"type":"HTMLDivElement","props":{"x":17,"width":300,"var":"_descText","innerHTML":"htmlText","height":20}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.Vip.VipQuanXianItemUI.uiView);

        }

    }
}

module ui.Welfare {
    export class ChargeWelfarePartUI extends View {
		public _tabDayCharge:MyUI.TabItemRender;
		public _tabLeiJiCharge:MyUI.TabItemRender;
		public _tabLeiJiConsume:MyUI.TabItemRender;
		public _boxList:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":87,"x":224,"width":1280,"mouseThrough":true,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":992,"skin":"ui/netImages/plate/chargeWelfare_title.png","height":186}},{"type":"HBox","props":{"y":193,"x":1},"child":[{"type":"TabItemRender","props":{"width":170,"var":"_tabDayCharge","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":170,"var":"_tabLeiJiCharge","runtime":"MyUI.TabItemRender","height":56}},{"type":"TabItemRender","props":{"width":170,"var":"_tabLeiJiConsume","runtime":"MyUI.TabItemRender","height":56}}]},{"type":"Image","props":{"y":255,"x":4,"width":985,"skin":"ui/common/window_frame_bak.png","sizeGrid":"5,5,5,5","height":355}},{"type":"Image","props":{"y":265,"x":14,"width":965,"skin":"ui/common/window_frame_bak2.png","sizeGrid":"5,5,5,5","height":340}},{"type":"Box","props":{"y":273,"x":22,"width":950,"var":"_boxList","renderType":"render","height":326}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TabItemRender",MyUI.TabItemRender);

            super.createChildren();
            this.createView(ui.Welfare.ChargeWelfarePartUI.uiView);

        }

    }
}

module ui.Welfare.Components {
    export class ChargeWelfareItemBoxUI extends Laya.Box {
		public _listWelfare:Laya.List;
		public _boxDayCharge:Laya.Box;
		public _txtDayTimeTitle:Laya.Label;
		public _txtDayCountDownTimeTitle:Laya.Label;
		public _txtTimes:Laya.Label;
		public _boxLeiJiCharge:Laya.Box;
		public _txtCurrLeiJiCharge:Laya.Label;
		public _boxLeiJiConsume:Laya.Box;
		public _txtCurrLeiJiConsume:Laya.Label;
		public _btnAllGet:Laya.Button;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":950,"height":326},"child":[{"type":"List","props":{"y":0,"x":0,"width":950,"var":"_listWelfare","spaceY":10,"repeatX":1,"height":326}},{"type":"Box","props":{"y":-79,"x":468,"var":"_boxDayCharge"},"child":[{"type":"Label","props":{"y":0,"x":130,"width":150,"var":"_txtDayTimeTitle","text":"dddd","fontSize":20,"color":"#99A2B1","align":"right"}},{"type":"Label","props":{"y":28,"x":35,"width":150,"var":"_txtDayCountDownTimeTitle","text":"label","fontSize":20,"color":"#99A2B1","align":"right"}},{"type":"Label","props":{"y":27,"x":180,"width":100,"var":"_txtTimes","fontSize":22,"color":"#49BD1B","align":"right"}}]},{"type":"Box","props":{"y":-81,"x":575,"var":"_boxLeiJiCharge"},"child":[{"type":"Label","props":{"y":0,"x":-18,"width":130,"text":"``11469","fontSize":22,"color":"#99A2B1","align":"right"}},{"type":"Label","props":{"y":28,"x":-69,"width":150,"var":"_txtCurrLeiJiCharge","text":"555","fontSize":22,"color":"#99A2B1","align":"right"}},{"type":"Image","props":{"y":17,"x":78,"width":46,"skin":"ui/common/money_diamond.png","height":47}}]},{"type":"Box","props":{"y":-81,"x":575,"var":"_boxLeiJiConsume"},"child":[{"type":"Label","props":{"y":0,"x":-18,"width":130,"text":"``11472","fontSize":22,"color":"#99A2B1","align":"right"}},{"type":"Label","props":{"y":28,"x":-69,"width":150,"var":"_txtCurrLeiJiConsume","fontSize":22,"color":"#99A2B1","align":"right"}},{"type":"Image","props":{"y":17,"x":78,"width":46,"skin":"ui/common/money_diamond.png","height":47}}]},{"type":"Button","props":{"y":-75,"x":780,"width":148,"var":"_btnAllGet","stateNum":2,"skin":"ui/common/btn_anniu.png","labelSize":22,"labelColors":"#D6DFE8","height":48,"sizeGrid":"8,10,8,10","labelBold":"false"}}]};
        constructor(){ super();this.createUI(ui.Welfare.Components.ChargeWelfareItemBoxUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Welfare.Components {
    export class ChargeWelfareRenderUI extends Laya.Box {
		public _imageBack:Laya.Image;
		public _txtTitle:Laya.Label;
		public _txtDiamondNums:Laya.Label;
		public _imageYiLingQu:Laya.Image;
		public _imageDiamond:Laya.Image;
		public _btnGet:Laya.Button;
		public _btnCharge:Laya.Button;
		public _listGoods:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":950,"renderType":"render","height":108},"child":[{"type":"Image","props":{"y":0,"x":0,"width":950,"var":"_imageBack","skin":"ui/common/window_frame_bak3.png","sizeGrid":"5,5,5,5","height":110}},{"type":"Box","props":{},"child":[{"type":"Label","props":{"y":24,"x":35,"var":"_txtTitle","text":"label","fontSize":26,"color":"#99A2B1"}},{"type":"Label","props":{"y":58,"x":35,"var":"_txtDiamondNums","text":"label","fontSize":26,"color":"#DAE8F5"}},{"type":"Image","props":{"y":30,"x":777,"width":152,"var":"_imageYiLingQu","skin":"ui/common/first_chongzhi_yilingqu.png","height":50}},{"type":"Image","props":{"y":50,"x":105,"width":46,"var":"_imageDiamond","skin":"ui/common/money_diamond.png","height":47}},{"type":"Button","props":{"y":35,"x":780,"width":148,"var":"_btnGet","stateNum":2,"skin":"ui/common/btn_anniu.png","sizeGrid":"5,5,5,5","labelSize":20,"labelColors":"#ffffff","height":40,"labelBold":"false"}},{"type":"Button","props":{"y":35,"x":780,"width":148,"var":"_btnCharge","stateNum":2,"skin":"ui/common/btn_frist_chongzhi_lingqu.png","labelSize":20,"labelColors":"#ffffff","label":"label","height":40}}]},{"type":"List","props":{"y":14,"x":237,"width":80,"var":"_listGoods","spaceX":10,"height":80}}]};
        constructor(){ super();this.createUI(ui.Welfare.Components.ChargeWelfareRenderUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Welfare.Components {
    export class GradeItemRenderUI extends Laya.Box {
		public _btnGet:Laya.Button;
		public _txtGrade:Laya.Label;
		public _txtNotGet:Laya.Label;
		public _imgHadGet:Laya.Image;
		public _iconDouQi:MyUI.GoodsIcon;
		public _iconMoney:MyUI.GoodsIcon;
		public _goodsList:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":950,"height":108},"child":[{"type":"Image","props":{"y":0,"x":0,"width":950,"skin":"ui/common/window_frame_bak3.png","height":108,"sizeGrid":"8,8,8,8"}},{"type":"Button","props":{"y":31,"x":780,"width":152,"var":"_btnGet","skin":"ui/common/btn_anniu.png","labelSize":22,"labelBold":false,"label":"label","height":46,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9"}},{"type":"Label","props":{"y":41,"x":32,"var":"_txtGrade","text":"label","fontSize":26,"color":"#adceef"}},{"type":"Label","props":{"y":41,"x":780,"width":152,"var":"_txtNotGet","text":"label","height":26,"fontSize":26,"color":"#9aaac4","align":"center"}},{"type":"Image","props":{"y":29,"x":780,"var":"_imgHadGet","skin":"ui/welfare/grade_state_had.png"}},{"type":"GoodsIcon","props":{"y":13,"x":238,"var":"_iconDouQi","runtime":"MyUI.GoodsIcon"}},{"type":"GoodsIcon","props":{"y":13,"x":339,"var":"_iconMoney","runtime":"MyUI.GoodsIcon"}},{"type":"List","props":{"y":13,"x":440,"width":286,"var":"_goodsList","spaceX":20,"repeatY":1,"height":81},"child":[{"type":"GoodsIcon","props":{"runtime":"MyUI.GoodsIcon","renderType":"render"}}]}]};
        constructor(){ super();this.createUI(ui.Welfare.Components.GradeItemRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Welfare.Components {
    export class OnlineItemRenderUI extends Laya.Box {
		public _imgState:Laya.Image;
		public _progTime:Laya.ProgressBar;
		public _txtTime:Laya.Label;
		public _txtState:Laya.Label;
		public _goodsList:Laya.List;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":172,"height":260},"child":[{"type":"Image","props":{"y":0,"x":6,"skin":"ui/welfare/online_item_bak.png"}},{"type":"Image","props":{"y":218,"x":86,"var":"_imgState","skin":"ui/welfare/online_state_can.png","anchorY":0.5,"anchorX":0.5}},{"type":"ProgressBar","props":{"y":165,"x":16,"width":140,"var":"_progTime","skin":"ui/welfare/progress_online_time.png","height":4,"sizeGrid":"0,4,0,4"}},{"type":"Label","props":{"y":7,"x":16,"width":140,"var":"_txtTime","text":"label","height":24,"fontSize":24,"color":"#8fb8d8","align":"center"}},{"type":"Label","props":{"y":206,"x":16,"width":140,"var":"_txtState","text":"label","height":24,"fontSize":24,"color":"#afdcff","align":"center"}},{"type":"List","props":{"y":44,"x":33,"width":108,"var":"_goodsList","height":108},"child":[{"type":"GoodsIcon","props":{"width":108,"scaleY":1.3,"scaleX":1.3,"runtime":"MyUI.GoodsIcon","renderType":"render","height":108}}]}]};
        constructor(){ super();this.createUI(ui.Welfare.Components.OnlineItemRenderUI.uiView);}
        createUI(uiData:any):void {
        			View.regComponent("MyUI.GoodsIcon",MyUI.GoodsIcon);

            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Welfare.Components {
    export class SevenLoginRewardItemUI extends Dialog {
		public _labDays:Laya.Label;
		public _imgGoods:Laya.Image;
		public _imgNoGet:Laya.Image;
		public _imgOverTime:Laya.Image;
		public _imgGained:Laya.Image;
		public _rewardEffect:Laya.Animation;

        public static  uiView:any ={"type":"Dialog","props":{"width":121,"height":160},"child":[{"type":"Image","props":{"width":121,"skin":"ui/welfare/fuli_qiri_diban_xiao.png","height":160}},{"type":"Label","props":{"y":15,"x":10,"width":100,"var":"_labDays","fontSize":22,"color":"#8FB8D8","align":"center"}},{"type":"Image","props":{"y":44,"x":8,"width":105,"var":"_imgGoods","height":105}},{"type":"Image","props":{"y":0,"x":0,"width":121,"var":"_imgNoGet","skin":"ui/common/window_frame_bak6.png","height":160}},{"type":"Image","props":{"y":62,"x":12,"var":"_imgOverTime","skin":"ui/welfare/fuli_qiri_yiguoqi.png"}},{"type":"Image","props":{"y":65,"x":5,"width":111,"var":"_imgGained","skin":"ui/welfare/fuli_qiri_yilingqu.png","height":71}},{"type":"Animation","props":{"y":80,"x":60,"var":"_rewardEffect","source":"Animations/SevenDayLoginRewardAnm.ani","autoPlay":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Welfare.Components.SevenLoginRewardItemUI.uiView);

        }

    }
}

module ui.Welfare {
    export class DailyWelfarePartUI extends View {
		public _imgBak:Laya.Image;
		public _tabOnline:MyUI.TabItemRender;
		public _tabGrade:MyUI.TabItemRender;
		public _tabMeditation:MyUI.TabItemRender;

        public static  uiView:any ={"type":"View","props":{"y":88,"x":222,"width":992,"height":608},"child":[{"type":"Image","props":{"y":0,"x":0,"width":992,"var":"_imgBak","height":186}},{"type":"Image","props":{"y":254,"x":4,"width":984,"skin":"ui/common/window_frame_bak.png","height":354,"sizeGrid":"20,20,20,20"}},{"type":"HBox","props":{"y":191,"x":2,"space":-2},"child":[{"type":"TabItemRender","props":{"width":170,"var":"_tabOnline","tabSkin":"ui/common/btn_tab1.png","tabLabelSize":22,"tabLabelColors":"#dae8f5,#dae8f5,#dae8f5,#dae8f5","runtime":"MyUI.TabItemRender","redDotLeftTop":"148,6","height":56}},{"type":"TabItemRender","props":{"width":170,"var":"_tabGrade","tabSkin":"ui/common/btn_tab1.png","tabLabelSize":22,"tabLabelColors":"#dae8f5,#dae8f5,#dae8f5,#dae8f5","runtime":"MyUI.TabItemRender","redDotLeftTop":"148,6","height":56}},{"type":"TabItemRender","props":{"width":170,"var":"_tabMeditation","tabSkin":"ui/common/btn_tab1.png","tabLabelSize":22,"tabLabelColors":"#dae8f5,#dae8f5,#dae8f5,#dae8f5","runtime":"MyUI.TabItemRender","redDotLeftTop":"148,6","height":56}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.TabItemRender",MyUI.TabItemRender);

            super.createChildren();
            this.createView(ui.Welfare.DailyWelfarePartUI.uiView);

        }

    }
}

module ui.Welfare {
    export class GradeRewardPartUI extends View {
		public _gradeList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":984,"height":354},"child":[{"type":"Image","props":{"y":9,"x":9,"width":966,"skin":"ui/common/window_frame_bak1.png","height":334,"sizeGrid":"8,8,8,8"}},{"type":"List","props":{"y":16,"x":17,"width":954,"var":"_gradeList","spaceY":10,"repeatX":1,"height":324},"child":[{"type":"GradeItemRender","props":{"runtime":"MyUI.Welfare.GradeItemRender","renderType":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MyUI.Welfare.GradeItemRender",MyUI.Welfare.GradeItemRender);

            super.createChildren();
            this.createView(ui.Welfare.GradeRewardPartUI.uiView);

        }

    }
}

module ui.Welfare {
    export class MeditationPartUI extends Laya.Box {
		public _imgMoney:Laya.Image;
		public _radioGroup:Laya.RadioGroup;
		public _btnGet:Laya.Button;
		public _txtTitleEarning:Laya.Label;
		public _txtExp:Laya.Label;
		public _txtXingHun:Laya.Label;
		public _txtTitleConsume:Laya.Label;
		public _txtMoney:Laya.Label;
		public _imgWater:Laya.Image;
		public _imgWaterLevel:Laya.Image;
		public _txtTime:Laya.Label;

        public static  uiView:any ={"type":"Box","props":{"y":0,"x":0,"width":984,"height":354},"child":[{"type":"Image","props":{"y":9,"x":8,"width":664,"skin":"ui/background/meditation_content.png","height":344}},{"type":"Image","props":{"y":9,"x":682,"width":294,"skin":"ui/common/window_frame_bak2.png","height":344}},{"type":"Image","props":{"y":302,"x":46,"width":276,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":302,"x":48,"width":38,"skin":"ui/common/money_exp.png","height":39}},{"type":"Image","props":{"y":302,"x":357,"width":276,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":302,"x":359,"width":38,"skin":"ui/common/money_xinghun.png","height":39}},{"type":"Image","props":{"y":235,"x":766,"width":182,"skin":"ui/common/window_frame_bak1.png","height":38,"sizeGrid":"8,8,8,8"}},{"type":"Image","props":{"y":235,"x":768,"width":38,"var":"_imgMoney","skin":"ui/common/money_exp.png","height":39}},{"type":"RadioGroup","props":{"y":41,"x":764,"var":"_radioGroup","space":44,"skin":"ui/common/radiogroup_style.png","selectedIndex":0,"labels":"label","direction":"vertical","labelSize":22,"labelColors":"#8ea1b5,#8ea1b5,#8ea1b5,#8ea1b5","labelPadding":"0,0,0,20","stateNum":2}},{"type":"Button","props":{"y":284,"x":694,"width":270,"var":"_btnGet","skin":"ui/common/btn_anniu.png","labelBold":false,"label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24}},{"type":"Label","props":{"y":263,"x":47,"width":180,"var":"_txtTitleEarning","text":"label","height":22,"fontSize":22,"color":"#99a2b1"}},{"type":"Label","props":{"y":310,"x":94,"width":180,"var":"_txtExp","text":"label","height":22,"fontSize":22,"color":"#dae8f5","align":"center"}},{"type":"Label","props":{"y":310,"x":405,"width":180,"var":"_txtXingHun","text":"label","height":22,"fontSize":22,"color":"#dae8f5","align":"center"}},{"type":"Label","props":{"y":244,"x":688,"width":74,"var":"_txtTitleConsume","text":"label","height":22,"fontSize":22,"color":"#99a2b1","align":"right"}},{"type":"Label","props":{"y":243,"x":811,"width":130,"var":"_txtMoney","text":"label","height":22,"fontSize":22,"color":"#dae8f5","align":"left"}},{"type":"Box","props":{"y":31,"x":184},"child":[{"type":"Image","props":{"y":0,"x":0,"width":312,"skin":"ui/main/img_xiulian_prog_bak.png","height":252}},{"type":"Box","props":{"y":26,"x":69},"child":[{"type":"Image","props":{"y":7,"x":7,"width":156,"skin":"ui/common/img_circle_mask.png","renderType":"mask","height":156}},{"type":"Image","props":{"y":170,"x":0,"width":170,"var":"_imgWater","skin":"ui/main/img_xiulian_water.png","height":170,"anchorY":1}},{"type":"Image","props":{"y":0,"x":0,"width":170,"skin":"ui/main/img_xiulian_water_bak.png","height":170}},{"type":"Image","props":{"y":170,"x":0,"width":170,"var":"_imgWaterLevel","skin":"ui/main/img_xiulian_water_level.png","height":60,"anchorY":0.3}}]},{"type":"Image","props":{"y":25,"x":69,"width":170,"skin":"ui/main/img_xiulian_touming.png","height":170}},{"type":"Label","props":{"y":97,"x":69,"width":170,"var":"_txtTime","text":"label","height":28,"fontSize":28,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super();this.createUI(ui.Welfare.MeditationPartUI.uiView);}
        createUI(uiData:any):void {
        
            laya.utils.ClassUtils.createByJson(uiData, this, this);

        }

    }
}

module ui.Welfare {
    export class OnlineRewardPartUI extends View {
		public _btnGet:Laya.Button;
		public _txtTime:laya.html.dom.HTMLDivElement;
		public _item0:MyUI.Welfare.OnlineItemRender;
		public _item1:MyUI.Welfare.OnlineItemRender;
		public _item2:MyUI.Welfare.OnlineItemRender;
		public _item3:MyUI.Welfare.OnlineItemRender;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":984,"height":354},"child":[{"type":"Image","props":{"y":9,"x":9,"width":966,"skin":"ui/background/onlinereward_content.png","height":268}},{"type":"Button","props":{"y":287,"x":795,"width":180,"var":"_btnGet","skin":"ui/common/btn_anniu.png","label":"label","height":58,"sizeGrid":"8,10,8,10","stateNum":2,"labelColors":"#fcfafd,#fcfafd,#fcfafd,#cccec9","labelSize":24,"labelBold":"false"}},{"type":"HTMLDivElement","props":{"y":306,"x":9,"width":680,"var":"_txtTime","innerHTML":"htmlText","height":22}},{"type":"OnlineItemRender","props":{"y":23,"x":45,"var":"_item0","runtime":"MyUI.Welfare.OnlineItemRender"}},{"type":"OnlineItemRender","props":{"y":23,"x":285,"var":"_item1","runtime":"MyUI.Welfare.OnlineItemRender"}},{"type":"OnlineItemRender","props":{"y":23,"x":525,"var":"_item2","runtime":"MyUI.Welfare.OnlineItemRender"}},{"type":"OnlineItemRender","props":{"y":23,"x":765,"var":"_item3","runtime":"MyUI.Welfare.OnlineItemRender"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("MyUI.Welfare.OnlineItemRender",MyUI.Welfare.OnlineItemRender);

            super.createChildren();
            this.createView(ui.Welfare.OnlineRewardPartUI.uiView);

        }

    }
}

module ui.Welfare {
    export class SevenDayLoginPartUI extends View {
		public _labDesc:Laya.Label;
		public _listSevenDay:Laya.List;

        public static  uiView:any ={"type":"View","props":{"y":86,"x":224,"width":988,"height":610},"child":[{"type":"Image","props":{"y":0,"x":0,"width":988,"skin":"ui/common/window_frame_bak.png","height":610,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":13,"x":12,"width":966,"skin":"ui/background/fuli_qiri_denglu_ditu.png","height":400}},{"type":"Image","props":{"y":69,"x":459,"width":512,"skin":"ui/background/fuli_qiri_denglu_zi.png","height":256}},{"type":"Label","props":{"y":292,"x":533,"width":400,"var":"_labDesc","text":"label","fontSize":20,"color":"#F89247","align":"center"}},{"type":"List","props":{"y":430,"x":26,"var":"_listSevenDay","repeatX":7},"child":[{"type":"SevenLoginRewardItem","props":{"runtime":"ui.Welfare.Components.SevenLoginRewardItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.Welfare.Components.SevenLoginRewardItemUI",ui.Welfare.Components.SevenLoginRewardItemUI);

            super.createChildren();
            this.createView(ui.Welfare.SevenDayLoginPartUI.uiView);

        }

    }
}
