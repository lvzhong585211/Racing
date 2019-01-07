using UnityEngine;

namespace HSGameEngine.Common
{
    // 游戏内用层级在此定义
    public static class Layers
    {
        public static void Initialize()
        {
            Layers.DEFAULT = LayerMask.NameToLayer("Default");
            Layers.BARRIER = LayerMask.NameToLayer("Barrier");
            Layers.NON_BARRIER = LayerMask.NameToLayer("Non-Barrier");
            Layers.TERRAIN = LayerMask.NameToLayer("Terrain");
            Layers.BUILDING = LayerMask.NameToLayer("building");
            Layers.NON_RENDER = LayerMask.NameToLayer("Non-Rendering");
            Layers.SPRITES = LayerMask.NameToLayer("Sprites");
            Layers.TARGETCAMERA = LayerMask.NameToLayer("TargetCamera");
            Layers.SELFCAMERA = LayerMask.NameToLayer("SelfCamera");
            Layers.NON_VISIBLE = LayerMask.NameToLayer("Non-Visible");
            Layers.XUANJUE = LayerMask.NameToLayer("XuanJue");
            Layers.LOONGUI = LayerMask.NameToLayer("LOONGUI");
            Layers.GUI = LayerMask.NameToLayer("GUI");
            Layers.UI = LayerMask.NameToLayer("UI");
            Layers.DECORATION = LayerMask.NameToLayer("Decoration");
            Layers.LIGHTS = LayerMask.NameToLayer("Lights");
            Layers.TRANSFX = LayerMask.NameToLayer("TransparentFX");
            Layers.LOONGUISYSTEM = LayerMask.NameToLayer("LOONGUISYSTEM");
            Layers.TOPCAMERA = LayerMask.NameToLayer("TopCamera");

            Layers.MainLight = (1 << TERRAIN | 1 << NON_BARRIER | 1 << SPRITES | 1 << TARGETCAMERA);
            Layers.CameraAvoid = (1 << TERRAIN | 1 << NON_BARRIER | 1 << BUILDING);
            Layers.CameraTrans = (1 << SPRITES | 1 << BUILDING);
            Layers.GroundCheck = (1 << TERRAIN | 1 << NON_BARRIER);
            Layers.UIs = (1 << LOONGUI | 1 << GUI | 1 << UI);

            Layers.SelfLayer = -2;
        }

        public static int DEFAULT;
        public static int BARRIER;
        public static int NON_BARRIER;
        public static int TERRAIN;
        public static int BUILDING;
        public static int NON_RENDER;
        public static int SPRITES;
        public static int TARGETCAMERA;
        public static int SELFCAMERA;
        public static int NON_VISIBLE;
        public static int XUANJUE;
        public static int LOONGUI;
        public static int GUI;
        public static int UI;
        public static int DECORATION;
        public static int LIGHTS;
        public static int TRANSFX;
        public static int LOONGUISYSTEM;
        public static int TOPCAMERA;

        public static int MainLight;
        public static int CameraAvoid;
        public static int CameraTrans;
        public static int GroundCheck;
        public static int UIs;

        public static int SelfLayer;    //  创建对象时，不进行层替换，使用自己的层
    }

}
