//using HSGameEngine.Common;
//using HSGameEngine.Drawing;
//using HSGameEngine.GameEngine.Common;
//using HSGameEngine.GameEngine.Data;
//using HSGameEngine.GameEngine.Logic;
using MapObstaclesInfo;
//using Server.Tools;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Linq;
using HSGameEngine.Common;

/// <summary>
/// 兼容类
/// </summary>
[Serializable]
public struct PointF
{
    // Private x and y coordinate fields.
    private float x, y;

    // -----------------------
    // Public Shared Members
    // -----------------------

    /// <summary>
    ///	Empty Shared Field
    /// </summary>
    ///
    /// <remarks>
    ///	An uninitialized PointF Structure.
    /// </remarks>

    public static readonly PointF Empty;

    /// <summary>
    ///	Equality Operator
    /// </summary>
    ///
    /// <remarks>
    ///	Compares two PointF objects. The return value is
    ///	based on the equivalence of the X and Y properties 
    ///	of the two points.
    /// </remarks>

    public static bool operator ==(PointF left, PointF right)
    {
        return ((left.X == right.X) && (left.Y == right.Y));
    }

    /// <summary>
    ///	Inequality Operator
    /// </summary>
    ///
    /// <remarks>
    ///	Compares two PointF objects. The return value is
    ///	based on the equivalence of the X and Y properties 
    ///	of the two points.
    /// </remarks>

    public static bool operator !=(PointF left, PointF right)
    {
        return ((left.X != right.X) || (left.Y != right.Y));
    }

    // -----------------------
    // Public Constructor
    // -----------------------

    /// <summary>
    ///	PointF Constructor
    /// </summary>
    ///
    /// <remarks>
    ///	Creates a PointF from a specified x,y coordinate pair.
    /// </remarks>

    public PointF(float x, float y)
    {
        this.x = x;
        this.y = y;
    }

    // -----------------------
    // Public Instance Members
    // -----------------------

    /// <summary>
    ///	IsEmpty Property
    /// </summary>
    ///
    /// <remarks>
    ///	Indicates if both X and Y are zero.
    /// </remarks>

    public bool IsEmpty
    {
        get
        {
            return ((x == 0.0) && (y == 0.0));
        }
    }

    /// <summary>
    ///	X Property
    /// </summary>
    ///
    /// <remarks>
    ///	The X coordinate of the PointF.
    /// </remarks>

    public float X
    {
        get
        {
            return x;
        }
        set
        {
            x = value;
        }
    }

    /// <summary>
    ///	Y Property
    /// </summary>
    ///
    /// <remarks>
    ///	The Y coordinate of the PointF.
    /// </remarks>

    public float Y
    {
        get
        {
            return y;
        }
        set
        {
            y = value;
        }
    }

    /// <summary>
    ///	Equals Method
    /// </summary>
    ///
    /// <remarks>
    ///	Checks equivalence of this PointF and another object.
    /// </remarks>

    public override bool Equals(object obj)
    {
        if (!(obj is PointF))
            return false;

        return (this == (PointF)obj);
    }

    /// <summary>
    ///	GetHashCode Method
    /// </summary>
    ///
    /// <remarks>
    ///	Calculates a hashing value.
    /// </remarks>

    public override int GetHashCode()
    {
        return (int)x ^ (int)y;
    }

#if NET_2_0
		public static PointF Add (PointF pt, Size sz)
		{
			return new PointF (pt.X + sz.Width, pt.Y + sz.Height);
		}

		public static PointF Add (PointF pt, SizeF sz)
		{
			return new PointF (pt.X + sz.Width, pt.Y + sz.Height);
		}

		public static PointF Subtract (PointF pt, Size sz)
		{
			return new PointF (pt.X - sz.Width, pt.Y - sz.Height);
		}

		public static PointF Subtract (PointF pt, SizeF sz)
		{
			return new PointF (pt.X - sz.Width, pt.Y - sz.Height);
		}
#endif

}

/// <summary>
/// Point类
/// </summary>
[Serializable]
public struct Point
{
    // Private x and y coordinate fields.
    private int x, y;

    // -----------------------
    // Public Shared Members
    // -----------------------

    /// <summary>
    ///	Empty Shared Field
    /// </summary>
    ///
    /// <remarks>
    ///	An uninitialized Point Structure.
    /// </remarks>

    public static readonly Point Empty;

    /// <summary>
    ///	Ceiling Shared Method
    /// </summary>
    ///
    /// <remarks>
    ///	Produces a Point structure from a PointF structure by
    ///	taking the ceiling of the X and Y properties.
    /// </remarks>

    public static Point Ceiling(PointF value)
    {
        int x, y;
        checked
        {
            x = (int)Math.Ceiling(value.X);
            y = (int)Math.Ceiling(value.Y);
        }

        return new Point(x, y);
    }

    /// <summary>
    ///	Round Shared Method
    /// </summary>
    ///
    /// <remarks>
    ///	Produces a Point structure from a PointF structure by
    ///	rounding the X and Y properties.
    /// </remarks>

    public static Point Round(PointF value)
    {
        int x, y;
        checked
        {
            x = (int)Math.Round(value.X);
            y = (int)Math.Round(value.Y);
        }

        return new Point(x, y);
    }

    /// <summary>
    ///	Truncate Shared Method
    /// </summary>
    ///
    /// <remarks>
    ///	Produces a Point structure from a PointF structure by
    ///	truncating the X and Y properties.
    /// </remarks>

    // LAMESPEC: Should this be floor, or a pure cast to int?

    public static Point Truncate(PointF value)
    {
        int x, y;
        checked
        {
            x = (int)value.X;
            y = (int)value.Y;
        }

        return new Point(x, y);
    }

    /// <summary>
    ///	Equality Operator
    /// </summary>
    ///
    /// <remarks>
    ///	Compares two Point objects. The return value is
    ///	based on the equivalence of the X and Y properties 
    ///	of the two points.
    /// </remarks>

    public static bool operator ==(Point left, Point right)
    {
        return ((left.X == right.X) && (left.Y == right.Y));
    }

    /// <summary>
    ///	Inequality Operator
    /// </summary>
    ///
    /// <remarks>
    ///	Compares two Point objects. The return value is
    ///	based on the equivalence of the X and Y properties 
    ///	of the two points.
    /// </remarks>

    public static bool operator !=(Point left, Point right)
    {
        return ((left.X != right.X) || (left.Y != right.Y));
    }

    /// <summary>
    ///	Point to PointF Conversion
    /// </summary>
    ///
    /// <remarks>
    ///	Creates a PointF based on the coordinates of a given 
    ///	Point. No explicit cast is required.
    /// </remarks>

    public static implicit operator PointF(Point p)
    {
        return new PointF(p.X, p.Y);
    }


    // -----------------------
    // Public Constructors
    // -----------------------

    /// <summary>
    ///	Point Constructor
    /// </summary>
    ///
    /// <remarks>
    ///	Creates a Point from an integer which holds the Y
    ///	coordinate in the high order 16 bits and the X
    ///	coordinate in the low order 16 bits.
    /// </remarks>

    public Point(int dw)
    {
        y = dw >> 16;
        x = dw & 0xffff;
    }

    /// <summary>
    ///	Point Constructor
    /// </summary>
    ///
    /// <remarks>
    ///	Creates a Point from a specified x,y coordinate pair.
    /// </remarks>

    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    // -----------------------
    // Public Instance Members
    // -----------------------

    /// <summary>
    ///	IsEmpty Property
    /// </summary>
    ///
    /// <remarks>
    ///	Indicates if both X and Y are zero.
    /// </remarks>

    public bool IsEmpty
    {
        get
        {
            return ((x == 0) && (y == 0));
        }
    }

    /// <summary>
    ///	X Property
    /// </summary>
    ///
    /// <remarks>
    ///	The X coordinate of the Point.
    /// </remarks>

    public int X
    {
        get
        {
            return x;
        }
        set
        {
            x = value;
        }
    }

    /// <summary>
    ///	Y Property
    /// </summary>
    ///
    /// <remarks>
    ///	The Y coordinate of the Point.
    /// </remarks>

    public int Y
    {
        get
        {
            return y;
        }
        set
        {
            y = value;
        }
    }

    /// <summary>
    ///	Equals Method
    /// </summary>
    ///
    /// <remarks>
    ///	Checks equivalence of this Point and another object.
    /// </remarks>

    public override bool Equals(object obj)
    {
        if (!(obj is Point))
            return false;

        return (this == (Point)obj);
    }

    /// <summary>
    ///	GetHashCode Method
    /// </summary>
    ///
    /// <remarks>
    ///	Calculates a hashing value.
    /// </remarks>

    public override int GetHashCode()
    {
        return x ^ y;
    }

    /// <summary>
    ///	Offset Method
    /// </summary>
    ///
    /// <remarks>
    ///	Moves the Point a specified distance.
    /// </remarks>

    public void Offset(int dx, int dy)
    {
        x += dx;
        y += dy;
    }

#if NET_2_0
		public static Point Add (Point pt, Size sz)
		{
			return new Point (pt.X + sz.Width, pt.Y + sz.Height);
		}

		public void Offset (Point p)
		{
			Offset (p.X, p.Y);
		}

		public static Point Subtract (Point pt, Size sz)
		{
			return new Point (pt.X - sz.Width, pt.Y - sz.Height);
		}
#endif

}

/// <summary>
/// 地图格子信息
/// </summary>
namespace MapObstaclesInfo


{
    public class theName
    {
        public static string root_obj_name = "Don't click me (Obs)!!!";
        public static string root_obj_tmp_edit_name = "Temp Edit";
        public static string terrain_plane_obj_name = "TerrainPlane";
        public static string root_obj_task_road_name = "taskRoad area root";
        public static string root_obj_dynamic_barrier = "dynamic_barrier_root";
        public static string dynamic_barrier_pre = "Dynamic_Barrier";
    }

    public class GridInfo
    {
        private int gridSize_X;
        private int gridSize_Y;
        private int gridMaxIndex_X;
        private int gridMaxIndex_Y;

        public int GridSize_X
        {
            get
            {
                return gridSize_X;
            }

            set
            {
                gridSize_X = value;
            }
        }

        public int GridSize_Y
        {
            get
            {
                return gridSize_Y;
            }

            set
            {
                gridSize_Y = value;
            }
        }

        public int GridMaxIndex_X
        {
            get
            {
                return gridMaxIndex_X;
            }

            set
            {
                gridMaxIndex_X = value;
            }
        }

        public int GridMaxIndex_Y
        {
            get
            {
                return gridMaxIndex_Y;
            }

            set
            {
                gridMaxIndex_Y = value;
            }
        }
    }

    public delegate void ClearAllObstaclesHandler();
    public class MapInfo
    {
        private int mapInfo_MapWidth;
        private int mapInfo_MapHeight;
        private int mapInfo_NodeSize;
        private string mapInfo_Value;
        private string mapInfo_ID;
        private GridInfo gridInfo;
        private byte[,] grid_data_Info;
        public event ClearAllObstaclesHandler _ClearAllObstacles;

        private Material obs_m = null;
        private Material pass_m = null;

        private Dictionary<int, GameObject> tempEditorObj = new Dictionary<int, GameObject>();

        public MapInfo()
        {
            mapInfo_MapWidth = 0;
            mapInfo_MapHeight = 0;
            mapInfo_NodeSize = 0;
            mapInfo_Value = "";
            mapInfo_ID = "";
            gridInfo = new GridInfo();
            gridInfo.GridSize_X = 200;
            gridInfo.GridSize_Y = 200;
            grid_data_Info = null;
        }

        public void GetMapObsStringValue( out string map_value )
        {
            map_value = "";
            int n = 0;
            int width = grid_data_Info.GetUpperBound(1);
            int length = grid_data_Info.GetUpperBound(0);
            int totalNum = width * length;
            for (int y = 0; y < width; y++)
            {
                for (int x = 0; x < length; x++)
                {
                    if(grid_data_Info[x, y] == 0)
                    {
                        if (string.IsNullOrEmpty(map_value))
                            map_value = string.Format("{0}_{1}", x * 2, y * 2);
                        else
                            map_value += string.Format(",{0}_{1}", x * 2, y * 2);
                        
                        if (n % 100 == 0)
                        EditorUtility.DisplayProgressBar("导出地图格子信息 ...", OneKey_DisplayAllObstacles.m_curFileName, (float)n / (float)totalNum);
                    }
                    n++;
                }
            }           
        }

        public void ClearTempEditObjs()
        {
            GameObject tempObjRoot = GameObject.Find(theName.root_obj_tmp_edit_name);
            if (tempObjRoot != null)
            {
                if (Application.isEditor) UnityEngine.Object.DestroyImmediate(tempObjRoot);
                else UnityEngine.Object.Destroy(tempObjRoot);
            }
            tempEditorObj.Clear();
        }

        public void SaveTempObjs()
        {
            int mapWidth = grid_data_Info.GetUpperBound(0);
            foreach ( var tempObj in tempEditorObj )
            {
                var curGridInfo = tempObj.Value.GetComponent<MyObstacleGridInfo>();
                grid_data_Info[curGridInfo.m_nGrid_X, curGridInfo.m_nGrid_Y] = (curGridInfo.m_isObs ? (byte)0 : (byte)1);
            }
            ClearTempEditObjs();
            Display();
        }

        public void SetGridInfo( int xIndex, int yIndex, bool isObs )
        {
            if (xIndex < 0 || xIndex >= grid_data_Info.GetUpperBound(0) || yIndex < 0 || yIndex >= grid_data_Info.GetUpperBound(1))
                return;

            int simpleIndex = grid_data_Info.GetUpperBound(0) * yIndex + xIndex;

            GameObject rootObj = GameObject.Find(theName.root_obj_tmp_edit_name);
            if (rootObj == null)
                rootObj = new GameObject(theName.root_obj_tmp_edit_name);

            GameObject curEditorObj;
            if (tempEditorObj.TryGetValue(simpleIndex, out curEditorObj))
            {
                var gridMeshRender = curEditorObj.GetComponent<MeshRenderer>();
                if (isObs)
                    gridMeshRender.material = obs_m;
                else
                    gridMeshRender.material = pass_m;

                var curGridInfo = curEditorObj.GetComponent<MyObstacleGridInfo>();
                curGridInfo.m_isObs = isObs;
            }
            else
            {
                if (grid_data_Info[xIndex, yIndex] == 0 && isObs)
                    return;

                if (grid_data_Info[xIndex, yIndex] == 1 && !isObs)
                    return;

                var SingleCellVertices = new Vector3[4];
                var SingleCellTriangles = new int[6];

                var pos = new Vector3(xIndex * 2f + 1f, 0.8f, yIndex * 2f + 1f);

                const float GridSize = 2.0f;
                const float Thiness = 0.05f;
                const float HalfGridSize = GridSize * 0.5f - Thiness;

                //Obs.position;
                SingleCellVertices[0].x = pos.x - HalfGridSize;
                SingleCellVertices[0].z = pos.z - HalfGridSize;
                SingleCellVertices[0].y = GetGroundPositionEditor(SingleCellVertices[0].x, SingleCellVertices[0].z).y + 0.8f;

                SingleCellVertices[1].x = pos.x - HalfGridSize;
                SingleCellVertices[1].z = pos.z + HalfGridSize;
                SingleCellVertices[1].y = GetGroundPositionEditor(SingleCellVertices[1].x, SingleCellVertices[1].z).y + 0.8f;

                SingleCellVertices[2].x = pos.x + HalfGridSize;
                SingleCellVertices[2].z = pos.z + HalfGridSize;
                SingleCellVertices[2].y = GetGroundPositionEditor(SingleCellVertices[2].x, SingleCellVertices[2].z).y + 0.8f;

                SingleCellVertices[3].x = pos.x + HalfGridSize;
                SingleCellVertices[3].z = pos.z - HalfGridSize;
                SingleCellVertices[3].y = GetGroundPositionEditor(SingleCellVertices[3].x, SingleCellVertices[3].z).y + 0.8f;

                SingleCellTriangles[0] = 0;
                SingleCellTriangles[1] = 1;
                SingleCellTriangles[2] = 2;

                SingleCellTriangles[3] = 0;
                SingleCellTriangles[4] = 2;
                SingleCellTriangles[5] = 3;

                var newGridObj = new GameObject("newGridObj");
                var _meshFilter = newGridObj.AddComponent<MeshFilter>();
                var _meshRender = newGridObj.AddComponent<MeshRenderer>();
                if (_meshFilter.sharedMesh == null)
                    _meshFilter.sharedMesh = new Mesh();
                _meshFilter.sharedMesh.vertices = SingleCellVertices;
                _meshFilter.sharedMesh.triangles = SingleCellTriangles;

                if (isObs)
                    _meshRender.sharedMaterial = obs_m;
                else
                    _meshRender.sharedMaterial = pass_m;
                newGridObj.transform.parent = rootObj.transform;

                MyObstacleGridInfo curGridInfo = newGridObj.AddComponent<MyObstacleGridInfo>();
                curGridInfo.m_nGrid_X = xIndex;
                curGridInfo.m_nGrid_Y = yIndex;
                curGridInfo.m_isObs = isObs;

                tempEditorObj[simpleIndex] = newGridObj;
            }
        }

        public void SetGridInfo( Vector3 pos, bool isObs, int brushLength )
        {
            int xCenterIndex = (int)(pos.x / 2);
            int yCenterIndex = (int)(pos.z / 2);

            for (int xIndex = xCenterIndex - ((brushLength+1)/2 - 1); xIndex <= xCenterIndex + (brushLength)/2 ; xIndex++)
            {
                for (int yIndex = yCenterIndex - ((brushLength + 1) / 2 - 1); yIndex <= yCenterIndex + (brushLength) / 2; yIndex++)
                {
                    SetGridInfo(xIndex, yIndex, isObs);
                }
            }            
        }

        public void SetGridInfoToObsOrPass(Vector3 pos, int brushLength, float heightMaxDelta )
        {
            int xCenterIndex = (int)(pos.x / 2);
            int yCenterIndex = (int)(pos.z / 2);

            const float GridSize = 2.0f;
            const float Thiness = 0.05f;
            const float HalfGridSize = GridSize * 0.5f - Thiness;

            var SingleCellVertices = new Vector3[4];            

            for (int xIndex = xCenterIndex - ((brushLength + 1) / 2 - 1); xIndex <= xCenterIndex + (brushLength) / 2; xIndex++)
            {
                for (int yIndex = yCenterIndex - ((brushLength + 1) / 2 - 1); yIndex <= yCenterIndex + (brushLength) / 2; yIndex++)
                {
                    var poscenter = new Vector3(xIndex * 2f + 1f, 0.5f, yIndex * 2f + 1f);

                    float curMaxY = -10000;
                    float curMinY = 10000;
                    //Obs.position;
                    SingleCellVertices[0].x = poscenter.x - HalfGridSize;
                    SingleCellVertices[0].z = poscenter.z - HalfGridSize;
                    SingleCellVertices[0].y = GetGroundPositionEditor(SingleCellVertices[0].x, SingleCellVertices[0].z).y + 0.6f;

                    SingleCellVertices[1].x = poscenter.x - HalfGridSize;
                    SingleCellVertices[1].z = poscenter.z + HalfGridSize;
                    SingleCellVertices[1].y = GetGroundPositionEditor(SingleCellVertices[1].x, SingleCellVertices[1].z).y + 0.6f;

                    SingleCellVertices[2].x = poscenter.x + HalfGridSize;
                    SingleCellVertices[2].z = poscenter.z + HalfGridSize;
                    SingleCellVertices[2].y = GetGroundPositionEditor(SingleCellVertices[2].x, SingleCellVertices[2].z).y + 0.6f;

                    SingleCellVertices[3].x = poscenter.x + HalfGridSize;
                    SingleCellVertices[3].z = poscenter.z - HalfGridSize;
                    SingleCellVertices[3].y = GetGroundPositionEditor(SingleCellVertices[3].x, SingleCellVertices[3].z).y + 0.6f;

                    for( int i = 0; i < 4; i++ )
                    {
                        if (curMaxY < SingleCellVertices[i].y) curMaxY = SingleCellVertices[i].y;
                        if (curMinY > SingleCellVertices[i].y) curMinY = SingleCellVertices[i].y;
                    }

                    bool isObs = Mathf.Abs(curMaxY - curMinY) > heightMaxDelta;

                    SetGridInfo(xIndex, yIndex, isObs);
                }
            }
        }

        public void SetGridToObs(GameObject grid, bool isObs)
        {
            if (grid == null)
                return;

            var curGridInfo = grid.GetComponent<MyObstacleGridInfo>();
            if (curGridInfo != null)
            {
                Undo.RecordObject(curGridInfo, "set grids info");
                curGridInfo.m_isObs = isObs;
                var gridMeshRender = grid.GetComponent<MeshRenderer>();
                Undo.RecordObject(gridMeshRender, "set grids info");
                if (isObs)
                    gridMeshRender.material = obs_m;
                else
                    gridMeshRender.material = pass_m;
            }
        }

        /// <summary>
        /// 获取地面位置
        /// </summary>
        /// <param name="x"></param>
        /// <param name="z"></param>
        /// <param name="y"></param>
        /// <returns></returns>
        public static Vector3 GetGroundPositionEditor(float x, float z, float y = 0.0f)
        {
            if( !OneKey_DisplayAllObstacles.initLayerMasks )
            {
                Layers.Initialize();
                OneKey_DisplayAllObstacles.initLayerMasks = true;
            }

            Vector3 origin = new Vector3(x, 300.0f, z);
            Vector3 endp = new Vector3(x, 0, z);

            RaycastHit hitInfo = new RaycastHit();

            //必须是碰撞体才能执行这类检测

            int layer = Layers.GroundCheck;        

            //仅找第一个对象,可以设置layer过滤
            if (Physics.Linecast(origin, endp, out hitInfo, layer))
            {
                return hitInfo.point;
            }

            return new Vector3(x, y, z);
        }

        public void Display()
        {
            ClearTempEditObjs();
            if (obs_m == null)
                obs_m = Resources.Load("Prefabs/Test/obsMaterial") as Material;

            if (pass_m == null)
                pass_m = Resources.Load("Prefabs/Test/passMaterial") as Material;

            // 清理已有物体
            _ClearAllObstacles();

            // 创建地形平板
            GameObject terrainPlane = GameObject.Find(theName.terrain_plane_obj_name);
            if (terrainPlane == null)
            {
                string strPreName = "Prefabs/Test/TestCude";
                terrainPlane = Resources.Load(strPreName) as GameObject;
                if (null != terrainPlane)
                {
                    terrainPlane = GameObject.Instantiate(terrainPlane) as GameObject;
                    terrainPlane.transform.localPosition = new Vector3(grid_data_Info.GetUpperBound(0), 0.5f, grid_data_Info.GetUpperBound(1));
                    terrainPlane.transform.localScale = new Vector3(grid_data_Info.GetUpperBound(0)*2, 0.01f, grid_data_Info.GetUpperBound(1)*2);
                    terrainPlane.name = theName.terrain_plane_obj_name;
                    terrainPlane.AddComponent<SceneViewMouse>();
                }
            }

            //    //go.transform.localPosition = new Vector3(x * 2f + 0.5f, 50.10f, y * 2f + 0.5f);

            // 创建一个根节点
            //GameObject rootObj = new GameObject(theName.root_obj_name);

            var RedVectices = new List<Vector3>(256 * 256 * 4);
            var RedTrangles = new List<int>(256 * 256 * 6);

            var GreenVectices = new List<Vector3>(256 * 256 * 4);
            var GreenTrangles = new List<int>(256 * 256 * 6);

            var SingleCellVertices = new Vector3[4];
            var SingleCellTriangles = new int[6];

            const float GridSize = 2.0f;
            const float Thiness = 0.05f;
            const float HalfGridSize = GridSize * 0.5f - Thiness;

            var VertexIndex = 0;

            Material RedMaterial = obs_m;
            Material GreenMaterial = pass_m;
            MeshRenderer meshRender = null;

            int n = 0;
            int curX = 0;
            // 创建所有需要显示的节点
            for (int y = 0; y < grid_data_Info.GetUpperBound(1); y++)
            {
                
                for (int x = 0; x < grid_data_Info.GetUpperBound(0); x++)
                {
                    curX = x;
                    n++;
                    //if (grid_data_Info[x, y] == 0)
                    {
                        //if (Obs.gameObject == ObsObj)
                        //    continue;

                        //fProgress++;
                        //if (EditorUtility.DisplayCancelableProgressBar("Create mesh ...", string.Format("Do it {0}/{1} ...", fProgress, fLength), fProgress / fLength))
                        //{
                        //    break;
                        //}

                        //    Obs.gameObject.isStatic = true;
                        var pos = new Vector3(x * 2f + 1f, 0.5f, y * 2f + 1f);
                        
                        //Obs.position;
                        SingleCellVertices[0].x = pos.x - HalfGridSize;
                        SingleCellVertices[0].z = pos.z - HalfGridSize;
                        SingleCellVertices[0].y = GetGroundPositionEditor(SingleCellVertices[0].x, SingleCellVertices[0].z).y + 0.6f;

                        SingleCellVertices[1].x = pos.x - HalfGridSize;
                        SingleCellVertices[1].z = pos.z + HalfGridSize;
                        SingleCellVertices[1].y = GetGroundPositionEditor(SingleCellVertices[1].x, SingleCellVertices[1].z).y + 0.6f;

                        SingleCellVertices[2].x = pos.x + HalfGridSize;
                        SingleCellVertices[2].z = pos.z + HalfGridSize;
                        SingleCellVertices[2].y = GetGroundPositionEditor(SingleCellVertices[2].x, SingleCellVertices[2].z).y + 0.6f;

                        SingleCellVertices[3].x = pos.x + HalfGridSize;
                        SingleCellVertices[3].z = pos.z - HalfGridSize;
                        SingleCellVertices[3].y = GetGroundPositionEditor(SingleCellVertices[3].x, SingleCellVertices[3].z).y + 0.6f;


                        //meshRender = Obs.GetComponent<MeshRenderer>();
                        //if ((RedMaterial != null && RedMaterial == meshRender.sharedMaterial) || meshRender.sharedMaterial.name.StartsWith("obsMaterial"))
                        if (grid_data_Info[x, y] == 0)
                        {
                            VertexIndex = RedVectices.Count;
                            SingleCellTriangles[0] = VertexIndex + 0;
                            SingleCellTriangles[1] = VertexIndex + 1;
                            SingleCellTriangles[2] = VertexIndex + 2;

                            SingleCellTriangles[3] = VertexIndex + 0;
                            SingleCellTriangles[4] = VertexIndex + 2;
                            SingleCellTriangles[5] = VertexIndex + 3;

                            RedVectices.AddRange(SingleCellVertices);
                            RedTrangles.AddRange(SingleCellTriangles);

                            if (RedVectices.Count > 65000 - 4)
                            {
                                var RedObs = new GameObject("RedObs");
                                var _meshFilter = RedObs.AddComponent<MeshFilter>();
                                var _meshRender = RedObs.AddComponent<MeshRenderer>();
                                if (_meshFilter.sharedMesh == null)
                                    _meshFilter.sharedMesh = new Mesh();
                                _meshFilter.sharedMesh.vertices = RedVectices.ToArray();
                                _meshFilter.sharedMesh.triangles = RedTrangles.ToArray();
                                _meshRender.sharedMaterial = RedMaterial;

                                RedVectices.Clear();
                                RedTrangles.Clear();
                            }

                            //RedMaterial = meshRender.sharedMaterial;
                        }
                        //else if ((GreenMaterial != null && GreenMaterial == meshRender.sharedMaterial) || meshRender.sharedMaterial.name.StartsWith("passMaterial"))
                        else
                        {
                            VertexIndex = GreenVectices.Count;
                            SingleCellTriangles[0] = VertexIndex + 0;
                            SingleCellTriangles[1] = VertexIndex + 1;
                            SingleCellTriangles[2] = VertexIndex + 2;

                            SingleCellTriangles[3] = VertexIndex + 0;
                            SingleCellTriangles[4] = VertexIndex + 2;
                            SingleCellTriangles[5] = VertexIndex + 3;

                            GreenVectices.AddRange(SingleCellVertices);
                            GreenTrangles.AddRange(SingleCellTriangles);                           

                            if (GreenVectices.Count > 65000 - 4)
                            {
                                var RedObs = new GameObject("GreenObs");
                                var _meshFilter = RedObs.AddComponent<MeshFilter>();
                                var _meshRender = RedObs.AddComponent<MeshRenderer>();
                                if (_meshFilter.sharedMesh == null)
                                    _meshFilter.sharedMesh = new Mesh();
                                _meshFilter.sharedMesh.vertices = GreenVectices.ToArray();
                                _meshFilter.sharedMesh.triangles = GreenTrangles.ToArray();
                                _meshRender.sharedMaterial = GreenMaterial;

                                GreenVectices.Clear();
                                GreenTrangles.Clear();
                            }
                        }                        
                    }
                }
                EditorUtility.DisplayProgressBar("加载地图格子信息 ...", string.Format("加载中..."), (float)n / (float)(grid_data_Info.GetUpperBound(1) * grid_data_Info.GetUpperBound(0)) );
            }

            {
                var RedObs = new GameObject("RedObs");
                var meshFilter = RedObs.AddComponent<MeshFilter>();
                meshRender = RedObs.AddComponent<MeshRenderer>();
                if (meshFilter.sharedMesh == null)
                    meshFilter.sharedMesh = new Mesh();
                meshFilter.sharedMesh.vertices = RedVectices.ToArray();
                meshFilter.sharedMesh.triangles = RedTrangles.ToArray();
                meshRender.sharedMaterial = RedMaterial;
            }

            {
                var RedObs = new GameObject("GreenObs");
                var meshFilter = RedObs.AddComponent<MeshFilter>();
                meshRender = RedObs.AddComponent<MeshRenderer>();
                if (meshFilter.sharedMesh == null)
                    meshFilter.sharedMesh = new Mesh();
                meshFilter.sharedMesh.vertices = GreenVectices.ToArray();
                meshFilter.sharedMesh.triangles = GreenTrangles.ToArray();
                meshRender.sharedMaterial = GreenMaterial;
            }

            EditorUtility.ClearProgressBar();
            EditorSceneManager.MarkAllScenesDirty();
        }

        public void Analysis()
        {
            grid_data_Info = null;
            if (MapInfo_Value == "")
                return;

            // 计算最大格子数量
            {
                int wGridsNum = (mapInfo_MapWidth - 1) / gridInfo.GridSize_X + 1;
                int hGridsNum = (mapInfo_MapHeight - 1) / gridInfo.GridSize_Y + 1;

                //wGridsNum = (int)Math.Ceiling(Math.Log(wGridsNum, 2));
                //wGridsNum = (int)Math.Pow(2, wGridsNum);

                //hGridsNum = (int)Math.Ceiling(Math.Log(hGridsNum, 2));
                //hGridsNum = (int)Math.Pow(2, hGridsNum);

                gridInfo.GridMaxIndex_X = wGridsNum;
                gridInfo.GridMaxIndex_Y = hGridsNum;

                grid_data_Info = new byte[wGridsNum, hGridsNum];
                for (int y = 0; y < grid_data_Info.GetUpperBound(1); y++)
                {
                    for (int x = 0; x < grid_data_Info.GetUpperBound(0); x++)
                    {
                        //设置默认值,可以通过的均在矩阵中用1表示
                        grid_data_Info[x, y] = 1;
                    }
                }
            }

            // 赋值
            string[] strValues = mapInfo_Value.Split(',');
            foreach(string strValue in strValues)
            {
                string[] strPoint = strValue.Split('_');
                int xIndex = Convert.ToInt32(strPoint[0]) / 2;
                int yIndex = Convert.ToInt32(strPoint[1]) / 2;

                if (xIndex < 0 || xIndex >= gridInfo.GridMaxIndex_X || yIndex < 0 || yIndex >= gridInfo.GridMaxIndex_Y)
                {
                    continue;
                }

                try
                {
                    grid_data_Info[xIndex, yIndex] = 0;
                }
                catch (Exception e)
                {
                    Debug.LogError(e.ToString());
                }
            }
        }

        public int MapInfo_MapWidth
        {
            get
            {
                return mapInfo_MapWidth;
            }

            set
            {
                mapInfo_MapWidth = value;
            }
        }

        public int MapInfo_MapHeight
        {
            get
            {
                return mapInfo_MapHeight;
            }

            set
            {
                mapInfo_MapHeight = value;
            }
        }

        public int MapInfo_NodeSize
        {
            get
            {
                return mapInfo_NodeSize;
            }

            set
            {
                mapInfo_NodeSize = value;
            }
        }

        public string MapInfo_Value
        {
            get
            {
                return mapInfo_Value;
            }

            set
            {
                mapInfo_Value = value;
            }
        }

        public string MapInfo_ID
        {
            get
            {
                return mapInfo_ID;
            }

            set
            {
                mapInfo_ID = value;
            }
        }
    }
}

public class ErrorTips : EditorWindow
{
    public string tips = "";
    void OnGUI()
    {
        position = new Rect(Screen.width + 300, 400, 300, 60);

        EditorGUILayout.LabelField("");
        EditorGUILayout.LabelField("");
        EditorGUILayout.LabelField(tips, EditorStyles.centeredGreyMiniLabel);
    }
}

public enum ChoseMapType
{
    LoadMonsterNpcTeleports = 0,
    UpdateMonsterNpcPos = 1,
    LoadTaskRoad = 2,
}

public class ChoseMapDialog : EditorWindow
{
    public List<string> MapNames;

    public List<int> MapCodeIDs;

    public int choseSceneIndex = 0;

    public ChoseMapType choseMapType = ChoseMapType.LoadMonsterNpcTeleports;

    void OnGUI()
    {
        EditorGUILayout.BeginHorizontal();
        EditorGUILayout.LabelField("选择编辑场景");
        EditorGUILayout.Space();
        EditorGUILayout.Space();
        choseSceneIndex = EditorGUILayout.Popup(choseSceneIndex, MapNames.ToArray());
        EditorGUILayout.EndHorizontal();

        
        if( GUILayout.Button("确认", GUILayout.Width( 50f ) ) ) 
        {
            //if(choseMapType == ChoseMapType.LoadMonsterNpcTeleports)
            //    OneKey_DisplayAllObstacles.DisplayPreleftArea(MapCodeIDs[choseSceneIndex]);
            //if (choseMapType == ChoseMapType.UpdateMonsterNpcPos)
            //    OneKey_DisplayAllObstacles.UpdateMonsterNPCPosX2(MapCodeIDs[choseSceneIndex]);
            //if(choseMapType == ChoseMapType.LoadTaskRoad)
            //    OneKey_DisplayAllObstacles.DisplayTaskRoad(MapCodeIDs[choseSceneIndex]);
            Close();
        }
    }
}

/// <summary>
/// 地图简要信息
/// </summary>
public class SmallMapInfo
{
    public string MapName;
    public int MapCode;
    public string MapResName;
    public bool IsFuben;    //  是否是副本
}

/// <summary>
/// 怪物简要信息
/// </summary>
public class SmallMonsterInfo
{
    public string MonsterRes;
    public float Scale;
    public int MonsterID;
    public int MapCode;
    public int Code;

    public string PlaySound;
    public string AttackSound;
    public string HitSound;
    public string DieSound;

    public string GuaJieTeXiao;
}

/// <summary>
/// 音效事件简要信息
/// </summary>
public class SmallAudioInfo
{
    public string AudioEventName;
    public List<string> AudioItems = new List<string>();

}

/// <summary>
/// NPC简要信息
/// </summary>
public class SmallNpcInfo
{
    public string NpcRes;
    public int NpcID;
    public int MapCode;
    public int Code;
    public string TakeSound;
}

/// <summary>
/// 任务简要信息
/// </summary>
public class SmallTaskInfo
{
    public int TaskID;
    public int NextTaskID;
    public int SourceNPC;
    public int DestNPC;
    public int TargetType1;
    public int TargetNPC1;

    public int RelativeSystemTalk = -1;  //  关联的系统喊话
    public int RelativeSystemAnim = -1;  //  关联的系统动画
}

/// <summary>
/// 场景NPC简要信息
/// </summary>
public class SmallMapNpcInfo
{
    public int Code;
    public int X;
    public int Y;
    public int Dir;
    public float SmallAngle = 0.0f;
}

/// <summary>
/// 场景怪物简要信息
/// </summary>
public class SmallMapMonsterInfo
{
    public int ID;
    public int Code;
    public int X;
    public int Y;
    public int Radius;
    public int Num;
    public int PursuitRadius;
}

public class SmallSystemAnimInfo
{
    public int ID;
    public string NextIDs;
    public List<int> RelativeDecorationIDs = new List<int>(); //  关联特效ID
    public string SoundItem;                //  音效资源
}

public class SmallSystemTalkInfo
{
    public int ID;
    public string SoundEvent;       //  音效事件
}

public class SmallSkillInfo
{
    public int SkillID;
    public int SkillType;
    public int ToOccupation;
    public int LearnTask;
    public string SkillAction;
    public List<int> RelativeDecorations = new List<int>();     //  关联特效ID
    public string MusicWeapon;
    public string MusicNoWeapon;

    //  是否是主角技能
    public bool IsRoleSkill()
    {
        return ToOccupation >= 0 && ToOccupation < 8;
    }

    public bool IsNormalSkill()
    {
        return SkillType == 1;
    }
}

public class SmallSkillAttackInfo
{
    public int SkillAttackID;
    public List<int> RelativeDecorations = new List<int>();     //  关联特效ID
}


public class PackageResSmallInfo
{
    /// <summary>
    /// 文件大小
    /// </summary>
    public long FileSize = 0;
}




public class OneKey_DisplayAllObstacles : EditorWindow
{
    static public int MapGridSize = 200;

    public delegate void UpdatePosX2Func( string fileName );

    private static Dictionary<string, UpdatePosX2Func> mapUpdatePosX2Dict = new Dictionary<string, UpdatePosX2Func>();
    /// <summary>
    /// 地图信息
    /// </summary>
    private static MapObstaclesInfo.MapInfo mapInfo;

    /// <summary>
    /// 格子的数据
    /// </summary>
    private static Vector3[] vecAllObstacles;

    /// <summary>
    /// 当前显示障碍物的地图 PicCode
    /// </summary>
    private static int nCurrentMapID = -1;

    /// <summary>
    /// 当前显示任务编号
    /// </summary>
    private static int CurTaskIndex = -1;

    /// <summary>
    /// 地图数据(每次修换地图都重新加载)
    /// </summary>
    //private static GMapData CurrentMapData = null;

    private static XmlDocument m_curObsxmlDoc = new XmlDocument();

    private static XmlDocument m_curMonsterxmlDoc = new XmlDocument();

    private static XmlElement m_curObsXmlElement;

    public static string m_curFileName;

    private static Dictionary<string, int> mapResPicIDDict = new Dictionary<string, int>();

    private static Dictionary<int, List<SmallMapInfo>> mapPicAllCodeIDsDict = new Dictionary<int, List<SmallMapInfo>>();

    public static Dictionary<int, SmallMonsterInfo> totalMonserResDict = new Dictionary<int, SmallMonsterInfo>();

    private static Dictionary<string, SmallAudioInfo> totalAudioEventDict = new Dictionary<string, SmallAudioInfo>();

    public static Dictionary<int, SmallTaskInfo> taskDict = new Dictionary<int, SmallTaskInfo>();

    public static Dictionary<int, SmallNpcInfo> totalNpcResDict = new Dictionary<int, SmallNpcInfo>();

    private static Dictionary<int, SmallMapNpcInfo> mapNpcDict = new Dictionary<int, SmallMapNpcInfo>();

    private static Dictionary<int, SmallMapMonsterInfo> mapMonsterDict = new Dictionary<int, SmallMapMonsterInfo>();

    private static Dictionary<string, string> decoreationDict = new Dictionary<string, string>();

    private static Dictionary<string, int> mapFileCount = new Dictionary<string, int>();

    private static Dictionary<string, string> mDownloadParams = new Dictionary<string, string>();

    public static Dictionary<int, SmallSystemAnimInfo> totalSystemAnimDict = new Dictionary<int, SmallSystemAnimInfo>();

    public static Dictionary<int, SmallSystemTalkInfo> totalSystemTalkDict = new Dictionary<int, SmallSystemTalkInfo>();

    public static Dictionary<int, SmallSkillInfo> totalSkillDict = new Dictionary<int, SmallSkillInfo>();

    public static Dictionary<int, List<SmallSkillInfo>> totalTaskLearnSkillDict = new Dictionary<int, List<SmallSkillInfo>>();

    public static Dictionary<int, SmallSkillAttackInfo> totalSkillAttackDict = new Dictionary<int, SmallSkillAttackInfo>();

    public static Dictionary<int, SmallMapInfo> totalMapDict = new Dictionary<int, SmallMapInfo>();

    public static string m_SettingFileName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/Settings.xml";
    public static string m_LanguageFileName = "Assets/AssetsToBundle/GameSite/local/ServerRes/1/IsolateRes/Config/Language.xml";

    public static string m_DownloadParamFileName = "Assets/AssetsToBundle/GameSite/local/ServerRes/1/IsolateRes/Config/DownloadParams.xml";
    public static string m_DecorationFileName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/Decorations.xml";

    private static Material monsterArea_m = null;

    private static Material npcpos_m = null;

    private static Material teleportspos_m = null;

    private static Material taskRoad_m = null;

    private static Vector3 curMousePos;

    public static bool initLayerMasks = false;

    

    private static void DisplayObsGrid(int nMapID)
    {
        if(LoadMapInfo(nMapID))
            mapInfo.Display();
    }



    public static bool TryLoadAudioSmallInfo()
    {
        //  读取真实怪物配置
        if (totalAudioEventDict.Count == 0)
        {
            string strTotalAudioInfo = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/Audios.Xml";

            XmlNodeList totalAudioNodeList = null;
            GetCommonXmlNodeList(out totalAudioNodeList, strTotalAudioInfo, "Config", "Audios", "Audio");           


            //  配置一下音效资源
            foreach (XmlNode node in totalAudioNodeList)
            {
                XmlElement xmlelement = (XmlElement)node;

                SmallAudioInfo curAudioInfo = new SmallAudioInfo();

                curAudioInfo.AudioEventName = xmlelement.GetAttribute("AudioName");
                string SubAudios = xmlelement.GetAttribute("SubAudios");

                string[] fields = SubAudios.Split('|');
                if (fields.Length > 0)
                {
                    string[] audioItemInfo = null;
                    for (int i = 0; i < fields.Length; i++)
                    {
                        audioItemInfo = fields[i].Split(',');
                        if (audioItemInfo.Length != 3)
                        {
                            continue;
                        }
                        else
                        {                            
                            curAudioInfo.AudioItems.Add(audioItemInfo[0]);
                        }
                    }
                }

                totalAudioEventDict[curAudioInfo.AudioEventName] = curAudioInfo;
            }
        }
        return true;
    }



    private static List<SmallMapInfo> GetAllMapIDByMapPicID( int nMapPicID )
    {
        List<SmallMapInfo> rt = new List<SmallMapInfo>();
        mapPicAllCodeIDsDict.Clear();
        if (mapPicAllCodeIDsDict.Count == 0)
        {
            XmlReaderSettings xmlSet = new XmlReaderSettings();
            xmlSet.IgnoreComments = true;
            XmlDocument settingsXmlDoc = new XmlDocument();
            try
            {
                settingsXmlDoc.Load(XmlReader.Create(m_SettingFileName, xmlSet));
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否存在： {0}", m_SettingFileName), "确认");
                return rt;
            }


            XmlElement configXmlElement = (XmlElement)settingsXmlDoc.SelectSingleNode("Config");
            if (null == configXmlElement)
            {
                EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否正常， Settings.xml 中未包含 Config节点  配置文件名： {0}", m_SettingFileName), "确认");
                return rt;
            }

            XmlElement mapsXmlElement = (XmlElement)configXmlElement.SelectSingleNode("Maps");
            if (null == mapsXmlElement)
            {
                EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否正常， Settings.xml Config 中未包含 Maps节点  配置文件名： {0}", m_SettingFileName), "确认");
                return rt;
            }


            XmlNodeList xmlNodeList = mapsXmlElement.SelectNodes("Map");
            if (null == xmlNodeList || xmlNodeList.Count <= 0)
            {
                EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否正常， Settings.xml  <Config>  <Maps>  中没有Map节点  配置文件名： {0}", m_SettingFileName), "确认");
                return rt;
            }

            foreach (XmlNode node in xmlNodeList)
            {
                XmlElement xmlelement = (XmlElement)node;
                int curMapPicCode = int.Parse(xmlelement.GetAttribute("PicCode"));
                int curMapCode = int.Parse(xmlelement.GetAttribute("Code"));
                string curMapName = xmlelement.GetAttribute("Name");
                //if (curMapPicCode == nMapPicID)
                {
                    List<SmallMapInfo> curCodeIDsList;
                    if( mapPicAllCodeIDsDict.TryGetValue(curMapPicCode, out curCodeIDsList) )
                    {
                        SmallMapInfo smallMapInfo = new SmallMapInfo();
                        smallMapInfo.MapCode = curMapCode;
                        smallMapInfo.MapName = curMapName;
                        curCodeIDsList.Add(smallMapInfo);
                    }
                    else
                    {
                        SmallMapInfo smallSceneInfo = new SmallMapInfo();
                        smallSceneInfo.MapCode = curMapCode;
                        smallSceneInfo.MapName = curMapName;
                        curCodeIDsList = new List<SmallMapInfo>();
                        curCodeIDsList.Add(smallSceneInfo);
                        mapPicAllCodeIDsDict[curMapPicCode] = curCodeIDsList;
                    }
                }              
            }
        }

        mapPicAllCodeIDsDict.TryGetValue(nMapPicID, out rt);
        return rt;
    }

    public static bool GetMapNodeList(out XmlNodeList rtList)
    {
        rtList = null;
        return GetCommonXmlNodeList(out rtList, m_SettingFileName, "Config", "Maps", "Map");
    }

    /// <summary>
    /// 获取特效资源名称
    /// </summary>
    /// <param name="decoID"></param>
    /// <returns></returns>
    public static string GetDecorationRes( string decoID )
    {
        string rtVal = "";
        if (decoreationDict.Count == 0)
            LoadDecorationInfoParams();

        if (decoreationDict.TryGetValue(decoID, out rtVal))
            return rtVal;
        rtVal = "";
        return rtVal;
    }

    /// <summary>
    /// 加载特效表
    /// </summary>
    public static void LoadDecorationInfoParams()
    {
        decoreationDict.Clear();

        XmlNodeList rtList = null;
        GetCommonXmlNodeList(out rtList, m_DecorationFileName, "Config", "Decos", "Deco");

        foreach (XmlNode node in rtList)
        {
            XmlElement xmlelement = (XmlElement)node;
            var key = xmlelement.GetAttribute("Code");
            var value = xmlelement.GetAttribute("ResName");            
            decoreationDict[key] = string.Format("decoration/{0}", value).ToLower();
        }
    }

    /// <summary>
    /// 获取下载参数值
    /// </summary>
    /// <param name="key"></param>
    /// <returns></returns>
    public static string GetDownloadInfoParams(string key)
    {
        string rtVal = "";
        if(mDownloadParams.Count == 0 )
            LoadDownloadInfoParams();

        if (mDownloadParams.TryGetValue(key, out rtVal))
            return rtVal;
        rtVal = "";
        return rtVal;
    }

    /// <summary>
    /// 加载下载参数配置表
    /// </summary>
    public static void LoadDownloadInfoParams()
    {
        mDownloadParams.Clear();

        XmlNodeList rtList = null;
        GetCommonXmlNodeList(out rtList, m_DownloadParamFileName, "Config", "Params", "Param");

        foreach (XmlNode node in rtList)
        {
            XmlElement xmlelement = (XmlElement)node;
            var key = xmlelement.GetAttribute("Name");
            var value = xmlelement.GetAttribute("Value");

            mDownloadParams[key] = value;
        }
    }
    /// <summary>
    /// 获取场景节点
    /// </summary>
    /// <param name="rtList"></param>
    /// <returns></returns>
    //public static bool GetMapNodeList(out XmlNodeList rtList)
    public static bool GetCommonXmlNodeList( out XmlNodeList rtList, string FileName, params object[] args)
    {
        rtList = null;
        XmlReaderSettings xmlSet = new XmlReaderSettings();
        xmlSet.IgnoreComments = true;
        //XmlDocument settingsXmlDoc = new XmlDocument();
        XmlDocument commonXmlDoc = new XmlDocument();

        var FileOnlyName = Path.GetFileName(FileName);

        string logHead = string.Format("读取{0}", FileOnlyName);
        try
        {            
            commonXmlDoc.Load(XmlReader.Create(FileName, xmlSet));
            //settingsXmlDoc.Load(XmlReader.Create(m_SettingFileName, xmlSet));
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            //EditorUtility.DisplayDialog("加载地图格子信息", string.Format("加载地图格子信息失败!，请确认配置文件是否存在： {0}", m_SettingFileName), "确认");
            EditorUtility.DisplayDialog(logHead, string.Format("{0}失败!，请确认配置文件是否存在： {1}", logHead, FileName), "确认");
            return false;
        }

        XmlNode curNode = commonXmlDoc;
        string curFindKey = "";
        for ( int i = 0; i < args.Length; i++ )
        {
            var curNodeKey = args[i] as string;

            if (!string.IsNullOrEmpty(curFindKey))
                curFindKey += "_";
            curFindKey += curNodeKey;

            if ( i == args.Length - 1 )
            {
                rtList = curNode.SelectNodes(curNodeKey);
                if (null == rtList || rtList.Count <= 0)
                {
                    EditorUtility.DisplayDialog(logHead, string.Format("{0}失败!，请确认配置文件是否正常， {1} 中未包含 {2}节点  配置文件名： {3}", logHead, FileOnlyName, curFindKey, FileName), "确认");
                    return false;
                }
                return true;
            }
            else
            {
                curNode = (XmlElement)curNode.SelectSingleNode(curNodeKey);
                if ( null == curNode )
                {
                    EditorUtility.DisplayDialog(logHead, string.Format("{0}失败!，请确认配置文件是否正常， {1} 中未包含 {2}节点  配置文件名： {3}", logHead, FileOnlyName, curFindKey, FileName ), "确认");
                    return false;
                }
            }
        }
        return false;
    }

    public static int GetMapPicIDByMapResName( string mapResName )
    {
        if (mapResPicIDDict.Count == 0)
        {
            XmlNodeList xmlNodeList = null;
            if (!GetMapNodeList(out xmlNodeList))
                return -2;

            foreach (XmlNode node in xmlNodeList)
            {
                XmlElement xmlelement = (XmlElement)node;
                string curMapResName = xmlelement.GetAttribute("ResName");
                int index = curMapResName.IndexOf(".unity3d");
                if( index >= 0 )
                    curMapResName = curMapResName.Substring(0, index);
                if (curMapResName.Length > 0)
                    mapResPicIDDict[curMapResName] = int.Parse(xmlelement.GetAttribute("PicCode"));
            }
        }

        if (mapResPicIDDict.ContainsKey(mapResName))
            return mapResPicIDDict[mapResName];

        return -1;
    }



    public static double GetTwoPointDistance(Point start, Point end)
    {
        return Math.Sqrt(Math.Pow((end.X - start.X), 2) + Math.Pow((end.Y - start.Y), 2));
    }

    public static void GenerateSingleVerticesAndTriangles( int x, int y, int indexStart, out Vector3[] SingleCellVertices, out int[] SingleCellTriangles )
    {
        SingleCellVertices = new Vector3[4];
        SingleCellTriangles = new int[6];

        var pos = new Vector3(x * 2f + 1f, 0.5f, y * 2f + 1f);

        const float GridSize = 2.0f;
        const float Thiness = 0.05f;
        const float HalfGridSize = GridSize * 0.5f - Thiness;

        //Obs.position;
        SingleCellVertices[0].x = pos.x - HalfGridSize;
        SingleCellVertices[0].z = pos.z - HalfGridSize;
        SingleCellVertices[0].y = MapInfo.GetGroundPositionEditor(SingleCellVertices[0].x, SingleCellVertices[0].z).y + 1.6f;

        SingleCellVertices[1].x = pos.x - HalfGridSize;
        SingleCellVertices[1].z = pos.z + HalfGridSize;
        SingleCellVertices[1].y = MapInfo.GetGroundPositionEditor(SingleCellVertices[1].x, SingleCellVertices[1].z).y + 1.6f;

        SingleCellVertices[2].x = pos.x + HalfGridSize;
        SingleCellVertices[2].z = pos.z + HalfGridSize;
        SingleCellVertices[2].y = MapInfo.GetGroundPositionEditor(SingleCellVertices[2].x, SingleCellVertices[2].z).y + 1.6f;

        SingleCellVertices[3].x = pos.x + HalfGridSize;
        SingleCellVertices[3].z = pos.z - HalfGridSize;
        SingleCellVertices[3].y = MapInfo.GetGroundPositionEditor(SingleCellVertices[3].x, SingleCellVertices[3].z).y + 1.6f;

        //VertexIndex = RedVectices.Count;
        SingleCellTriangles[0] = indexStart + 0;
        SingleCellTriangles[1] = indexStart + 1;
        SingleCellTriangles[2] = indexStart + 2;

        SingleCellTriangles[3] = indexStart + 0;
        SingleCellTriangles[4] = indexStart + 2;
        SingleCellTriangles[5] = indexStart + 3;
    }



    public static bool FindSmallMonsterInfoByCodeID( int MonsterCodeID, out SmallMapMonsterInfo curMapMonsterInfo )
    {
        curMapMonsterInfo = null;
        foreach( var MapMonsterInfo in mapMonsterDict )
        {
            if( MapMonsterInfo.Value.Code == MonsterCodeID )
            {
                curMapMonsterInfo = MapMonsterInfo.Value;
                return true;
            }
        }
        return false;
    }

    public static bool AddStringSplitIntValToList(string val, List<int> backList, char split = ',' )
    {
        try
        {
            if( val != null )
            {
                if (!string.IsNullOrEmpty(val))
                {
                    string[] strFields = val.Split(split);
                    if (strFields.Length > 0)
                    {
                        for (int i = 0; i < strFields.Length; i++)
                        {
                            if (!string.IsNullOrEmpty(strFields[i]))
                                backList.Add(int.Parse(strFields[i]));
                        }
                    }
                }
            }            
        }
        catch
        {
            Debug.LogErrorFormat("解析字符串至整数列表时出错!, val: {0}", val);
            return false;
        }
        return true;
    }
    

    public static bool LoadSkillDict()
    {
        if (!LoadSkillAttackDict())
            return false;
        
        if (totalSkillDict.Count == 0)
        {
            //  技能招式表
            string strPathName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/Magics.xml";
            XmlNodeList xmlNodeList = null;
            GetCommonXmlNodeList(out xmlNodeList, strPathName, "Config", "Magics", "Magic");

            try
            {
                foreach (XmlNode node in xmlNodeList)
                {
                    XmlElement xmlelement = (XmlElement)node;
                    SmallSkillInfo curSkillnfo = new SmallSkillInfo();
                    curSkillnfo.SkillID = int.Parse(xmlelement.GetAttribute("ID"));
                    curSkillnfo.SkillType = int.Parse(xmlelement.GetAttribute("SkillType"));
                    curSkillnfo.ToOccupation = int.Parse(xmlelement.GetAttribute("ToOcuupation"));

                    if (xmlelement.GetAttribute("LearnTask") != null)
                        if (!int.TryParse(xmlelement.GetAttribute("LearnTask"), out curSkillnfo.LearnTask))
                            curSkillnfo.LearnTask = -1;
                    //    curSkillnfo.LearnTask = int.Parse(xmlelement.GetAttribute("LearnTask"));

                    curSkillnfo.SkillAction = xmlelement.GetAttribute("SkillAction");
                    curSkillnfo.MusicWeapon = xmlelement.GetAttribute("MusicWeapon");
                    curSkillnfo.MusicNoWeapon = xmlelement.GetAttribute("MusicNoWeapon");

                    //  获取招式关联特效
                    var StrManyTimeDmage = xmlelement.GetAttribute("ManyTimeDmage");//="167,1"                   

                    string[] fields = StrManyTimeDmage.Split('|');
                    for (int i = 0; i < fields.Length; i++)
                    {
                        string[] fields2 = fields[i].Split(',');
                        if (fields2.Length != 2)                                
                            continue;                       


                        if (fields2.Length == 2)
                        {
                            var curSkillAttackID = int.Parse(fields2[1]);
                            SmallSkillAttackInfo curSkillAttackInfo = null;
                            if( totalSkillAttackDict.TryGetValue(curSkillAttackID, out curSkillAttackInfo) )
                            {
                                curSkillnfo.RelativeDecorations.AddRange(curSkillAttackInfo.RelativeDecorations);
                                
                            }                            
                        }
                    }
                    curSkillnfo.RelativeDecorations = curSkillnfo.RelativeDecorations.Distinct().ToList();
                    totalSkillDict[curSkillnfo.SkillID] = curSkillnfo;

                    if(curSkillnfo.LearnTask > 0 )
                    {
                        List<SmallSkillInfo> curRelativeSkill = null;
                        if( !totalTaskLearnSkillDict.TryGetValue(curSkillnfo.LearnTask, out curRelativeSkill))
                        {
                            curRelativeSkill = new List<SmallSkillInfo>();
                            totalTaskLearnSkillDict[curSkillnfo.LearnTask] = curRelativeSkill;
                        }
                        curRelativeSkill.Add(curSkillnfo);
                    }
                }
            }
            catch
            {
                Debug.LogError("读取表 Magic.xml 简要信息失败!");
                return false;
            }
        }
        return true;
    }

    /// <summary>
    /// 加载技能招式表
    /// </summary>
    /// <returns></returns>
    public static bool LoadSkillAttackDict()
    {
        if(totalSkillAttackDict.Count == 0 )
        {
            //  技能招式表
            string strPathName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/MagicAttacks.xml";
            XmlNodeList xmlNodeList = null;
            GetCommonXmlNodeList(out xmlNodeList, strPathName, "Config", "MagicAttacks", "MagicAttack");

            try
            {
                foreach (XmlNode node in xmlNodeList)
                {
                    XmlElement xmlelement = (XmlElement)node;
                    SmallSkillAttackInfo curSkillAttackInfo = new SmallSkillAttackInfo();
                    curSkillAttackInfo.SkillAttackID = int.Parse(xmlelement.GetAttribute("ID"));

                    if( !AddStringSplitIntValToList(xmlelement.GetAttribute("Decoration"), curSkillAttackInfo.RelativeDecorations ))
                    {
                        Debug.LogErrorFormat("读取表 MagicAttacks.xml 简要信息失败!, 技能招式ID:{0}, 解析 Decoration 错误", curSkillAttackInfo.SkillAttackID );
                        return false;
                    }

                    if (!AddStringSplitIntValToList(xmlelement.GetAttribute("DelayDecoration"), curSkillAttackInfo.RelativeDecorations))
                    {
                        Debug.LogErrorFormat("读取表 MagicAttacks.xml 简要信息失败!, 技能招式ID:{0}, 解析 DelayDecoration 错误", curSkillAttackInfo.SkillAttackID);
                        return false;
                    }

                    if (!AddStringSplitIntValToList(xmlelement.GetAttribute("FlyDecoration"), curSkillAttackInfo.RelativeDecorations))
                    {
                        Debug.LogErrorFormat("读取表 MagicAttacks.xml 简要信息失败!, 技能招式ID:{0}, 解析 FlyDecoration 错误", curSkillAttackInfo.SkillAttackID);
                        return false;
                    }

                    if (!AddStringSplitIntValToList(xmlelement.GetAttribute("TargetDecoration"), curSkillAttackInfo.RelativeDecorations))
                    {
                        Debug.LogErrorFormat("读取表 MagicAttacks.xml 简要信息失败!, 技能招式ID:{0}, 解析 TargetDecoration 错误", curSkillAttackInfo.SkillAttackID);
                        return false;
                    }

                    //curSystemTalkmInfo.SoundEvent = xmlelement.GetAttribute("SoundEvent");
                    totalSkillAttackDict[curSkillAttackInfo.SkillAttackID] = curSkillAttackInfo;
                }
            }
            catch
            {
                Debug.LogError("读取表 MagicAttacks.xml 简要信息失败!");
                return false;
            }
        }
        return true;
    }

    public static bool LoadSettingMapDict()
    {
        if (totalMapDict.Count == 0)
        {
            XmlNodeList xmlNodeList = null;
            if (GetMapNodeList(out xmlNodeList))
            {
                if (xmlNodeList != null)
                {
                    try
                    {
                        foreach (XmlNode node in xmlNodeList)
                        {
                            XmlElement xmlelement = (XmlElement)node;
                            SmallMapInfo curMapInfo = new SmallMapInfo();

                            curMapInfo.MapName = xmlelement.GetAttribute("Name");
                            curMapInfo.MapCode = int.Parse(xmlelement.GetAttribute("Code"));
                            curMapInfo.MapResName = xmlelement.GetAttribute("ResName");
                            curMapInfo.IsFuben = !(xmlelement.GetAttribute("MapType").CompareTo("0") == 0);

                            totalMapDict[curMapInfo.MapCode] = curMapInfo;
                        }
                    }
                    catch
                    {
                        Debug.LogError("读取表 Settings.xml 简要信息失败!");
                        return false;
                    }
                }
            }      
            else
            {
                Debug.LogError("读取表 Settings.xml 简要信息失败!");
                return false;
            }
        }
        return true;
    }

    public static bool LoadSystemTalkDict()
    {
        if(totalSystemTalkDict.Count == 0 )
        {
            //  系统喊话表
            string strPathName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/SystemTalk.xml";
            XmlNodeList xmlNodeList = null;
            GetCommonXmlNodeList(out xmlNodeList, strPathName, "Config", "SystemTalks", "SystemTalk");

            try
            {
                foreach (XmlNode node in xmlNodeList)
                {
                    XmlElement xmlelement = (XmlElement)node;
                    SmallSystemTalkInfo curSystemTalkmInfo = new SmallSystemTalkInfo();
                    curSystemTalkmInfo.ID = int.Parse(xmlelement.GetAttribute("ID"));
                    curSystemTalkmInfo.SoundEvent = xmlelement.GetAttribute("SoundEvent");

                    totalSystemTalkDict[curSystemTalkmInfo.ID] = curSystemTalkmInfo;
                }               
            }
            catch
            {
                Debug.LogError("读取表 SystemTalk.xml 简要信息失败!");
                return false;
            }
        }
        return true;
    }

    public static bool LoadSystemAnimDict()
    {
        if(totalSystemAnimDict.Count == 0)
        {
            //  系统动画表
            string strPathName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/SystemAnim.xml";
            XmlNodeList xmlNodeList = null;
            GetCommonXmlNodeList(out xmlNodeList, strPathName, "Config", "SystemAnims", "SystemAnim");

            try
            {
                foreach (XmlNode node in xmlNodeList)
                {
                    XmlElement xmlelement = (XmlElement)node;
                    SmallSystemAnimInfo curSystemAnimInfo = new SmallSystemAnimInfo();
                    curSystemAnimInfo.ID = int.Parse(xmlelement.GetAttribute("ID"));
                    curSystemAnimInfo.NextIDs = xmlelement.GetAttribute("NextIDs");
                    curSystemAnimInfo.SoundItem = xmlelement.GetAttribute("SoundItem");

                    int AnimResID = int.Parse(xmlelement.GetAttribute("AnimResID"));
                    curSystemAnimInfo.RelativeDecorationIDs.Add(AnimResID);

                    totalSystemAnimDict[curSystemAnimInfo.ID] = curSystemAnimInfo;
                }

                //  将关联的特效资源补全
                foreach (var item in totalSystemAnimDict)
                {
                    if (!string.IsNullOrEmpty(item.Value.NextIDs))
                    {
                        string[] strIDs = item.Value.NextIDs.Split('|');
                        if (strIDs != null && strIDs.Length > 0)
                        {
                            for (int i = 0; i < strIDs.Length; i++)
                            {
                                int curID = int.Parse(strIDs[i]);
                                SmallSystemAnimInfo curNextAnimInfo = null;
                                if (totalSystemAnimDict.TryGetValue(curID, out curNextAnimInfo))
                                {
                                    item.Value.RelativeDecorationIDs.AddRange(curNextAnimInfo.RelativeDecorationIDs);
                                }
                            }
                        }
                    }
                }
            }
            catch
            {
                Debug.LogError("读取表 SystemAnim.xml 简要信息失败!");
                return false;
            }            
        }
        return true;
    }

    public static bool LoadTaskDict()
    {
        if (taskDict.Count == 0)
        {
            //  任务表
            string strPathName = "Assets/AssetsToBundle/GameSite/local/ServerRes/1/IsolateRes/Config/SystemTasks.xml";
            //XmlReaderSettings xmlSet = new XmlReaderSettings();
            //xmlSet.IgnoreComments = true;
            //XmlDocument taskXmlDoc = new XmlDocument();
            //try
            //{
            //    taskXmlDoc.Load(XmlReader.Create(strPathName, xmlSet));
            //}
            //catch (Exception e)
            //{
            //    Debug.LogError(e.ToString());
            //    EditorUtility.DisplayDialog("加载任务路线图", string.Format("读取任务配置表失败!，请确认配置文件是否存在： {0}", strPathName), "确认");
            //    return false;
            //}


            //XmlElement configXmlElement = (XmlElement)taskXmlDoc.SelectSingleNode("Config");
            //if (null == configXmlElement)
            //{
            //    EditorUtility.DisplayDialog("加载任务路线图", string.Format("读取任务配置表失败!，请确认配置文件是否正常， SystemTasks.xml 中未包含 Config节点  配置文件名： {0}", strPathName), "确认");
            //    return false;
            //}

            //XmlElement tasksXmlElement = (XmlElement)configXmlElement.SelectSingleNode("Tasks");
            //if (null == tasksXmlElement)
            //{
            //    EditorUtility.DisplayDialog("加载任务路线图", string.Format("读取任务配置表失败!，请确认配置文件是否正常， SystemTasks.xml Config 中未包含 Tasks节点  配置文件名： {0}", strPathName), "确认");
            //    return false;
            //}


            //XmlNodeList xmlNodeList = tasksXmlElement.SelectNodes("Task");
            //if (null == xmlNodeList || xmlNodeList.Count <= 0)
            //{
            //    EditorUtility.DisplayDialog("加载任务路线图", string.Format("读取任务配置表失败!，请确认配置文件是否正常， SystemTasks.xml  <Config>  <Tasks>  中没有Task节点  配置文件名： {0}", strPathName), "确认");
            //    return false;
            //}
            XmlNodeList xmlNodeList = null;
            GetCommonXmlNodeList(out xmlNodeList, strPathName, "Config", "Tasks", "Task");

            foreach (XmlNode node in xmlNodeList)
            {
                XmlElement xmlelement = (XmlElement)node;
                SmallTaskInfo curTaskInfo = new SmallTaskInfo();
                curTaskInfo.TaskID = int.Parse(xmlelement.GetAttribute("ID"));
                curTaskInfo.NextTaskID = int.Parse(xmlelement.GetAttribute("NextTask"));
                curTaskInfo.SourceNPC = int.Parse(xmlelement.GetAttribute("SourceNPC"));
                curTaskInfo.DestNPC = int.Parse(xmlelement.GetAttribute("DestNPC"));
                curTaskInfo.TargetType1 = int.Parse(xmlelement.GetAttribute("TargetType1"));
                curTaskInfo.TargetNPC1 = int.Parse(xmlelement.GetAttribute("TargetNPC1"));

                var StrSystemTalkTrigger = xmlelement.GetAttribute("SystemTalkTrigger");
                string[] SystemTriggers = StrSystemTalkTrigger.Split('|');
                if (SystemTriggers.Length > 0)
                {
                    for (int i = 0; i < SystemTriggers.Length; i++)
                    {
                        string[] fieldInfo = SystemTriggers[i].Split(',');
                        if (fieldInfo.Length >= 2)
                        {                           
                            curTaskInfo.RelativeSystemTalk = int.Parse(fieldInfo[1]);
                        }
                    }
                }

                var StrSystemAnimTrigger = xmlelement.GetAttribute("SystemAnimTrigger");
                string[] SystemAnimTriggers = StrSystemAnimTrigger.Split('|');
                if (SystemAnimTriggers.Length > 0)
                {
                    for (int i = 0; i < SystemAnimTriggers.Length; i++)
                    {
                        string[] fieldInfo = SystemAnimTriggers[i].Split(',');
                        if (fieldInfo.Length >= 3)
                        {
                            curTaskInfo.RelativeSystemAnim = int.Parse(fieldInfo[2]);
                        }
                    }
                }


                taskDict[curTaskInfo.TaskID] = curTaskInfo;
            }
        }
        return true;
    }


    public static bool TryLoadMonsterSmallInfo()
    {
        //  读取真实怪物配置
        if (totalMonserResDict.Count == 0)
        {
            string strTotalMonsterConfigName = "Assets/AssetsToBundle/GameSite/local/GameRes/Config/Monsters.Xml";
            XmlDocument totalMonsterXmlDoc = new XmlDocument();
            XmlReaderSettings xmlSetMonsterTotal = new XmlReaderSettings();
            xmlSetMonsterTotal.IgnoreComments = true;
            try
            {
                totalMonsterXmlDoc.Load(XmlReader.Create(strTotalMonsterConfigName, xmlSetMonsterTotal));
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("加载怪物表", string.Format("加载整体怪物数据失败!，请确认整体怪物数据配置文件是否存在 配置文件名： {0}", strTotalMonsterConfigName), "确认");
                return false;
            }

            XmlElement totalMonsterMapXmlElement = (XmlElement)totalMonsterXmlDoc.SelectSingleNode("Map");
            if (null == totalMonsterMapXmlElement)
            {
                EditorUtility.DisplayDialog("加载怪物表", string.Format("加载整体怪物数据失败!，请确认配置文件是否正常， Monsters.xml 中未包含 Map节点  配置文件名： {0}", strTotalMonsterConfigName), "确认");
                return false;
            }

            XmlElement totalMonstersXmlElement = (XmlElement)totalMonsterMapXmlElement.SelectSingleNode("Monsters");
            if (null == totalMonstersXmlElement)
            {
                EditorUtility.DisplayDialog("加载怪物表", string.Format("加载整体怪物数据失败!，请确认配置文件是否正常， Monsters.xml Map 中未包含 Monsters节点  配置文件名： {0}", strTotalMonsterConfigName), "确认");
                return false;
            }

            XmlNodeList totalMonsterNodeList = totalMonstersXmlElement.SelectNodes("Monster");


            //  配置一下怪物资源
            foreach (XmlNode node in totalMonsterNodeList)
            {
                XmlElement xmlelement = (XmlElement)node;
                int monsterID = int.Parse(xmlelement.GetAttribute("ID"));
                string resName = xmlelement.GetAttribute("ResName");
                resName = resName.Substring(0, resName.IndexOf(".unity3d"));
                SmallMonsterInfo smllMonsterInfo = new SmallMonsterInfo();
                smllMonsterInfo.MonsterRes = resName;
                smllMonsterInfo.Scale = float.Parse(xmlelement.GetAttribute("Scale"));
                smllMonsterInfo.MonsterID = monsterID;
                smllMonsterInfo.MapCode = int.Parse(xmlelement.GetAttribute("MapCode"));
                smllMonsterInfo.Code = int.Parse(xmlelement.GetAttribute("Code"));

                smllMonsterInfo.PlaySound = xmlelement.GetAttribute("PlaySound");
                smllMonsterInfo.AttackSound = xmlelement.GetAttribute("AttackSound");
                smllMonsterInfo.HitSound = xmlelement.GetAttribute("HitSound");
                smllMonsterInfo.DieSound = xmlelement.GetAttribute("DieSound");
                smllMonsterInfo.GuaJieTeXiao = xmlelement.GetAttribute("GuaJieTeXiao");
                totalMonserResDict[monsterID] = smllMonsterInfo;
            }
        }
        return true;
    }

 

    private static bool TryLoadMapNpcSmallInfo( int nMapID )
    {
        mapNpcDict.Clear();
        nCurrentMapID = nMapID;

        //真正的载入数据
        string strFileName = string.Format("npcs.Xml");
        string strPathName = "Assets/AssetsToBundle/GameSite/local/Map/" + nCurrentMapID.ToString() + "/";
        //string strPathAndFileName = strPathName + strFileName;       
        string curNpcFileName = strPathName + strFileName;

        XmlDocument curNpcXmlDoc = new XmlDocument();

        XmlReaderSettings xmlSet = new XmlReaderSettings();
        xmlSet.IgnoreComments = true;
        try
        {
            var xmlReader = XmlReader.Create(curNpcFileName, xmlSet);
            curNpcXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("加载地图NPC数据", string.Format("加载地图NPC数据失败!，请确认地图关联配置文件是否存在 配置文件名： {0}", curNpcFileName), "确认");
            return false;
        }

        XmlElement mapXmlElement = (XmlElement)curNpcXmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("加载地图NPC数据", string.Format("加载地图NPC数据失败!，请确认配置文件是否正常， npcs.xml 中未包含 Map节点  配置文件名： {0}", curNpcFileName), "确认");
            return false;
        }

        XmlElement npcsXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("NPCs");
        if (null == npcsXmlElement)
        {
            EditorUtility.DisplayDialog("加载地图NPC数据", string.Format("加载地图NPC数据失败!，请确认配置文件是否正常， npcs.xml Map 中未包含 NPCs 节点  配置文件名： {0}", curNpcFileName), "确认");
            return false;
        }

        XmlNodeList xmlNodeList = npcsXmlElement.SelectNodes("NPC");
        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;
            SmallMapNpcInfo curMapNpcInfo = new SmallMapNpcInfo();
            curMapNpcInfo.Code = int.Parse(xmlelement.GetAttribute("Code"));
            curMapNpcInfo.X = int.Parse(xmlelement.GetAttribute("X"));
            curMapNpcInfo.Y = int.Parse(xmlelement.GetAttribute("Y"));
            curMapNpcInfo.Dir = int.Parse(xmlelement.GetAttribute("Dir"));
            curMapNpcInfo.SmallAngle = 0.0f;
            float.TryParse(xmlelement.GetAttribute("SmallAngle"), out curMapNpcInfo.SmallAngle);
            mapNpcDict[curMapNpcInfo.Code] = curMapNpcInfo;
        }
        return true;
    }

    private static bool TryLoadMapMonsterSmallInfo(int nMapID)
    {
        mapMonsterDict.Clear();

        nCurrentMapID = nMapID;

        //真正的载入数据
        string strFileName = string.Format("Monsters.Xml");
        string strPathName = "Assets/AssetsToBundle/GameSite/local/Map/" + nCurrentMapID.ToString() + "/";
        //string strPathAndFileName = strPathName + strFileName;       
        string curMonsterFileName = strPathName + strFileName;




        XmlReaderSettings xmlSet = new XmlReaderSettings();
        xmlSet.IgnoreComments = true;
        try
        {
            var xmlReader = XmlReader.Create(curMonsterFileName, xmlSet);
            m_curMonsterxmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("加载地图怪物数据", string.Format("加载地图怪物数据失败!，请确认地图关联配置文件是否存在 配置文件名： {0}", curMonsterFileName), "确认");
            return false;
        }



        XmlElement mapXmlElement = (XmlElement)m_curMonsterxmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("加载地图怪物数据", string.Format("加载地图怪物数据失败!，请确认配置文件是否正常， Monsters.xml 中未包含 Map节点  配置文件名： {0}", curMonsterFileName), "确认");
            return false;
        }

        XmlElement monstersXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("Monsters");
        if (null == monstersXmlElement)
        {
            EditorUtility.DisplayDialog("加载地图怪物数据", string.Format("加载地图怪物数据失败!，请确认配置文件是否正常， Monsters.xml Map 中未包含 Monsters节点  配置文件名： {0}", curMonsterFileName), "确认");
            return false;
        }

        XmlNodeList xmlNodeList = monstersXmlElement.SelectNodes("Monster");

        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;

            SmallMapMonsterInfo curMapMonsterInfo = new SmallMapMonsterInfo();

            curMapMonsterInfo.ID = int.Parse(xmlelement.GetAttribute("ID"));
            curMapMonsterInfo.Code = int.Parse(xmlelement.GetAttribute("Code"));
            curMapMonsterInfo.X = int.Parse(xmlelement.GetAttribute("X"));
            curMapMonsterInfo.Y = int.Parse(xmlelement.GetAttribute("Y"));
            curMapMonsterInfo.Radius = int.Parse(xmlelement.GetAttribute("Radius"));
            curMapMonsterInfo.Num = int.Parse(xmlelement.GetAttribute("Num"));
            curMapMonsterInfo.PursuitRadius = int.Parse(xmlelement.GetAttribute("PursuitRadius"));

            mapMonsterDict[curMapMonsterInfo.ID] = curMapMonsterInfo;           
        }

        return true;
    }


    /// <summary>
    /// 载入地图格子的数据
    /// </summary>
    /// <returns></returns>
    private static bool LoadMapInfo(int nMapID)
    {
        //if (nMapID == nCurrentMapID)
        //    return true;
        nCurrentMapID = nMapID;

        if (mapInfo == null)
        {
            mapInfo = new MapObstaclesInfo.MapInfo();
            mapInfo._ClearAllObstacles += new MapObstaclesInfo.ClearAllObstaclesHandler(ClearAllObstacles);
        }

        //真正的载入数据
        string strFileName = string.Format("obs.Xml");
        string strPathName = "Assets/AssetsToBundle/GameSite/local/MapConfig/" + nCurrentMapID.ToString() + "/";
        //string strPathAndFileName = strPathName + strFileName;       
        m_curFileName = strPathName + strFileName;



        XmlReaderSettings xmlSet = new XmlReaderSettings();
        xmlSet.IgnoreComments = true;
        try
        {
            m_curObsxmlDoc.Load(XmlReader.Create(m_curFileName, xmlSet));
        }
        catch(Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("加载地图格子信息", string.Format("加载地图格子信息失败!，请确认地图关联配置文件是否存在 配置文件名： {0}", m_curFileName), "确认");
            return false;
        }



        XmlNode xmlRoot = m_curObsxmlDoc.SelectSingleNode("Item");
        m_curObsXmlElement = (XmlElement)xmlRoot;
        mapInfo.MapInfo_ID = m_curObsXmlElement.GetAttribute("ID").ToString();
        mapInfo.MapInfo_MapWidth = m_curObsXmlElement.GetAttribute("MapWidth").SafeToInt32();
        mapInfo.MapInfo_MapHeight = m_curObsXmlElement.GetAttribute("MapHeight").SafeToInt32();
        mapInfo.MapInfo_NodeSize = m_curObsXmlElement.GetAttribute("NodeSize").SafeToInt32();
        mapInfo.MapInfo_Value = m_curObsXmlElement.GetAttribute("Value");
        mapInfo.Analysis();       

        return true;
    }

   
    [MenuItem("MyTool/格子编辑/刷障碍 &C", false, 101)]
    private static void SetSelGridToObs()
    {
        if( Selection.activeGameObject == null || Selection.activeGameObject.name != theName.terrain_plane_obj_name )
        {
            EditorUtility.DisplayDialog("编辑地图格子", string.Format("编辑地图格子请先选中GameObject {0}", theName.terrain_plane_obj_name), "确认");
            return;
        }

        Camera[]  camera = SceneView.GetAllSceneCameras();
        if (camera.Length != 1)
            return;
       
        Ray ray = camera[0].ScreenPointToRay(SceneViewMouseEditor.mousePos);      
        RaycastHit hit;
        //GameObject rootObj = GameObject.Find(theName.root_obj_name);
        //if (rootObj == null)
        //    rootObj = new GameObject(theName.root_obj_name);

        int layer = 0;
        for (int i = 8; i < 20; i++)
        {
            layer |= (1 << i);
        }

        ////仅找第一个对象,可以设置layer过滤
        //if (Physics.Linecast(origin, endp, out hitInfo, layer))
        //{
        //    return hitInfo.point;
        //}

        if (Physics.Raycast(ray,out hit, 20000, layer))
        {
            //if (hit.transform.gameObject.name == theName.terrain_plane_obj_name)
            if(Mathf.Abs( MapInfo.GetGroundPositionEditor(hit.point.x, hit.point.z).y - hit.point.y ) < 1.0f )
            {
                mapInfo.SetGridInfo(hit.point, true, SceneViewMouseEditor.brushLength > 0? SceneViewMouseEditor.brushLength:1 );
            }
        }

        //Undo.RecordObjects(Selection.objects, "set grids to obs");
        //foreach ( var sel in Selection.objects)
        //{
        //    var curGameObj = sel as GameObject;            
        //    mapInfo.SetGridToObs(curGameObj, true);
        //
        //}
    }

    [MenuItem("MyTool/格子编辑/刷通路 &V", false, 102)]
    private static void SetSelGridToPass()
    {
        if (Selection.activeGameObject == null || Selection.activeGameObject.name != theName.terrain_plane_obj_name)
        {
            EditorUtility.DisplayDialog("编辑地图格子", string.Format("编辑地图格子请先选中GameObject {0}", theName.terrain_plane_obj_name), "确认");
            return;
        }

        Camera[] camera = SceneView.GetAllSceneCameras();
        if (camera.Length != 1)
            return;
        Ray ray = camera[0].ScreenPointToRay(SceneViewMouseEditor.mousePos);
        RaycastHit hit;
        //GameObject rootObj = GameObject.Find(theName.root_obj_name);
        //if (rootObj == null)
        //    rootObj = new GameObject(theName.root_obj_name);

        int layer = 0;
        for (int i = 8; i < 20; i++)
        {
            layer |= (1 << i);
        }

        //if (Physics.Raycast(ray, out hit))
        if (Physics.Raycast(ray, out hit, 20000, layer))
        {
            //if (hit.transform.gameObject.name == theName.terrain_plane_obj_name)
            if (Mathf.Abs( MapInfo.GetGroundPositionEditor(hit.point.x, hit.point.z).y - hit.point.y ) < 1.0f )
            {
                mapInfo.SetGridInfo(hit.point, false, SceneViewMouseEditor.brushLength > 0 ? SceneViewMouseEditor.brushLength : 1);
            }
        }

        //Undo.RecordObjects(Selection.objects, "set grids to pass");
        //foreach (var sel in Selection.objects)
        //{
        //    var curGameObj = sel as GameObject;
        //    mapInfo.SetGridToObs(curGameObj, false);
        //}
    }

    [MenuItem("MyTool/格子编辑/自检测刷格子 &F", false, 103)]
    private static void SetSelGridToPassOrObs()
    {
        if (Selection.activeGameObject == null || Selection.activeGameObject.name != theName.terrain_plane_obj_name)
        {
            EditorUtility.DisplayDialog("编辑地图格子", string.Format("编辑地图格子请先选中GameObject {0}", theName.terrain_plane_obj_name), "确认");
            return;
        }

        Camera[] camera = SceneView.GetAllSceneCameras();
        if (camera.Length != 1)
            return;
        Ray ray = camera[0].ScreenPointToRay(SceneViewMouseEditor.mousePos);
        RaycastHit hit;
        //GameObject rootObj = GameObject.Find(theName.root_obj_name);
        //if (rootObj == null)
        //    rootObj = new GameObject(theName.root_obj_name);

        int layer = 0;
        for (int i = 8; i < 20; i++)
        {
            layer |= (1 << i);
        }

        //if (Physics.Raycast(ray, out hit))
        if (Physics.Raycast(ray, out hit, 20000, layer))
        {
            //if (hit.transform.gameObject.name == theName.terrain_plane_obj_name)
            if (Mathf.Abs( MapInfo.GetGroundPositionEditor(hit.point.x, hit.point.z).y - hit.point.y ) < 1.0f )
            {
                //  取格子四个点的高度，计算高度差是否超过阈值
                mapInfo.SetGridInfoToObsOrPass(hit.point, SceneViewMouseEditor.brushLength > 0 ? SceneViewMouseEditor.brushLength : 1, SceneViewMouseEditor.heightDelata);
                //mapInfo.SetGridInfo(hit.point, false, SceneViewMouseEditor.brushLength > 0 ? SceneViewMouseEditor.brushLength : 1);
            }
        }
    }



    [MenuItem("MyTool/格子编辑/合并编辑格子 &B", false, 104)]
    private static void SaveTempEditToGrid()
    {
        mapInfo.SaveTempObjs();
    }

    [MenuItem("MyTool/格子编辑/导出地图格子信息", false, 105)]
    private static void SaveAllObstaclesInfo()
    {
        mapInfo.SaveTempObjs();
        //GameObject rootObj = GameObject.Find(MapObstaclesInfo.theName.root_obj_name);
        //if (rootObj == null)
        //{
        //    EditorUtility.DisplayDialog("导出地图格子信息", "没有加载地图格子信息!", "确认");
        //    return;
        //}

        if ( mapInfo == null )
        {
            EditorUtility.DisplayDialog("导出地图格子信息", "没有加载地图格子信息!", "确认");
            return;
        }

        string map_value = "";
        mapInfo.GetMapObsStringValue(out map_value);

        m_curObsXmlElement.SetAttribute("Value", map_value);
        EditorUtility.ClearProgressBar();
        try
        {
            m_curObsxmlDoc.Save(m_curFileName);
            EditorUtility.DisplayDialog("导出地图格子信息", "导出地图格子信息成功!", "确认");
        }
        catch(Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图格子信息", string.Format("导出地图格子信息失败!，请确认是否签出地图格子信息配置文件： {0}", m_curFileName), "确认");
        }        
    }


    [MenuItem("MyTool/格子编辑/加载地图格子", false, 100)]
    private static void DisplayAllObstacles_Map001()
    {
        //  根据场景名称在  Settings.xml 中找到对应的场景编号
        string curSceneName = SceneManager.GetActiveScene().name;
        int mapPicCode = GetMapPicIDByMapResName(curSceneName);
        if(mapPicCode < 0 )
        {
            if( mapPicCode == -1 )
                EditorUtility.DisplayDialog("加载地图格子信息", string.Format("加载地图格子信息失败!，当前场景 【{0}】在 Settings.xml 配置文件没有配置。 配置文件路径： {1} ", curSceneName, m_SettingFileName), "确认");
            return;
        }

        //OneKey_DisplaySafetyZone.ClearAllObstacles();//安全区和格子不共存

        DisplayObsGrid(mapPicCode);
    }

    [MenuItem("MyTool/清除缓存表结构", false, 80)]
    public static void ClearCacheTable()
    {
        mapPicAllCodeIDsDict.Clear();   //  相同场景，不同地图表
        totalMonserResDict.Clear();     //  怪物表    
        totalAudioEventDict.Clear();    //  音效事件表    
        taskDict.Clear();               //  任务表
        totalNpcResDict.Clear();        //  NPC表
        mapResPicIDDict.Clear();        //  场景资源编号表
        decoreationDict.Clear();        //  特效表
        mDownloadParams.Clear();        //  下载信息表
        totalSystemAnimDict.Clear();    //  系统动画表
        totalSystemTalkDict.Clear();    //  系统喊话表
        totalMapDict.Clear();           //  场景表
        totalSkillDict.Clear();         //  技能表
        totalSkillAttackDict.Clear();   //  技能招式表
        totalTaskLearnSkillDict.Clear();    //  任务解锁技能关联表
    }

    [MenuItem("MyTool/预留位置/保存预留位置", false, 91)]
    private static void SaveCurMapNpcDir()
    {
        //  根据场景名称在  Settings.xml 中找到对应的场景编号
        //string curSceneName = SceneManager.GetActiveScene().name;
        //int mapPicCode = GetMapPicIDByMapResName(curSceneName);
        //if (mapPicCode < 0)
        //{
        //    if (mapPicCode == -1)
        //        EditorUtility.DisplayDialog("保存npc方向失败", string.Format("保存npc方向失败!，当前场景 【{0}】在 Settings.xml 配置文件没有配置。 配置文件路径： {1} ", curSceneName, m_SettingFileName), "确认");
        //    return;
        //}

        //SavePrelefArea(nCurrentMapID);
    }


    [MenuItem("MyTool/格子编辑/清理地图格子", false, 106)]
    public static void ClearAllObstacles()
    {
        //GameObject rootObj = GameObject.Find(MapObstaclesInfo.theName.root_obj_name);
        //if(rootObj != null)
        //{
        //    DestroyImmediate(rootObj);
        //}
        bool needMakeDirty = false;
        GameObject redObs = GameObject.Find("RedObs");
        while(redObs != null)
        {
            DestroyImmediate(redObs);
            needMakeDirty = true;
            redObs = GameObject.Find("RedObs");
        }

        GameObject GreenObs = GameObject.Find("GreenObs");
        while (GreenObs != null)
        {
            DestroyImmediate(GreenObs);
            needMakeDirty = true;
            GreenObs = GameObject.Find("GreenObs");
        }
       
        GameObject terrainPlane = GameObject.Find(theName.terrain_plane_obj_name);
        if (terrainPlane != null)
        {
            DestroyImmediate(terrainPlane);
            needMakeDirty = true;
        }
            

        if (mapInfo != null)
            mapInfo.ClearTempEditObjs();

        GameObject tempObjRoot = GameObject.Find(theName.root_obj_tmp_edit_name);
        if (tempObjRoot != null)
        {
            if (Application.isEditor) UnityEngine.Object.DestroyImmediate(tempObjRoot);
            else UnityEngine.Object.Destroy(tempObjRoot);
        }

        if (needMakeDirty)
            EditorSceneManager.MarkAllScenesDirty();
    }

    [MenuItem("MyTool/预留位置/清理预留位置", false, 107)]
    private static void ClearAllMonsterNpcTeleportsArea()
    {
        bool needMakeDirty = false;
        GameObject rootObj = GameObject.Find("monster area root");
        if (rootObj != null)
        {
            needMakeDirty = true;
            DestroyImmediate(rootObj);
        }

        rootObj = GameObject.Find("npc area root");
        if (rootObj != null)
        {
            needMakeDirty = true;
            DestroyImmediate(rootObj);
        }

        rootObj = GameObject.Find("teleports area root");
        if (rootObj != null)
        {
            needMakeDirty = true;
            DestroyImmediate(rootObj);
        }

        rootObj = GameObject.Find(theName.root_obj_dynamic_barrier);
        if(rootObj != null)
        {
            needMakeDirty = true;
            DestroyImmediate(rootObj);
        }
        nCurrentMapID = -1;
        if(needMakeDirty)
            EditorSceneManager.MarkAllScenesDirty();
    }

    //////[MenuItem("MyTool/Update UIResource all map Pos X 2")]
    //////private static void UpdateAllUIResourceMapPosX2()
    //////{
    //////    XmlReaderSettings xmlSet = new XmlReaderSettings();
    //////    //xmlSet.IgnoreComments = true;
    //////    XmlDocument settingsXmlDoc = new XmlDocument();
    //////    try
    //////    {
    //////        settingsXmlDoc.Load(XmlReader.Create(m_SettingFileName, xmlSet));
    //////    }
    //////    catch (Exception e)
    //////    {
    //////        Debug.LogError(e.ToString());
    //////        EditorUtility.DisplayDialog("Update UIResource all map Pos X 2", string.Format("Update UIResource all map Pos X 2 failed!，请确认配置文件是否存在： {0}", m_SettingFileName), "确认");
    //////        return ;
    //////    }


        //////    XmlElement configXmlElement = (XmlElement)settingsXmlDoc.SelectSingleNode("Config");
        //////    if (null == configXmlElement)
        //////    {
        //////        EditorUtility.DisplayDialog("Update UIResource all map Pos X 2", string.Format("Update UIResource all map Pos X 2 failed!，请确认配置文件是否正常， Settings.xml 中未包含 Config节点  配置文件名： {0}", m_SettingFileName), "确认");
        //////        return ;
        //////    }

        //////    XmlElement mapsXmlElement = (XmlElement)configXmlElement.SelectSingleNode("Maps");
        //////    if (null == mapsXmlElement)
        //////    {
        //////        EditorUtility.DisplayDialog("Update UIResource all map Pos X 2", string.Format("Update UIResource all map Pos X 2 failed!，请确认配置文件是否正常， Settings.xml Config 中未包含 Maps节点  配置文件名： {0}", m_SettingFileName), "确认");
        //////        return ;
        //////    }


        //////    XmlNodeList xmlNodeList = mapsXmlElement.SelectNodes("Map");
        //////    if (null == xmlNodeList || xmlNodeList.Count <= 0)
        //////    {
        //////        EditorUtility.DisplayDialog("Update UIResource all map Pos X 2", string.Format("Update UIResource all map Pos X 2 failed!，请确认配置文件是否正常， Settings.xml  <Config>  <Maps>  中没有Map节点  配置文件名： {0}", m_SettingFileName), "确认");
        //////        return ;
        //////    }

        //////    Dictionary<int, int> haveDealedMap = new Dictionary<int, int>();
        //////    int index = 0;
        //////    int rt = 0;
        //////    foreach (XmlNode node in xmlNodeList)
        //////    {
        //////        XmlElement xmlelement = (XmlElement)node;
        //////        int curMapPicCode = int.Parse(xmlelement.GetAttribute("PicCode"));
        //////        int curMapCode = int.Parse(xmlelement.GetAttribute("Code"));
        //////        string curMapName = xmlelement.GetAttribute("Name");

        //////        //if ( curMapCode != 2 && curMapCode != 19 && curMapCode != 81000 )        //  导一版 2、19、81000 地图测试一下
        //////        //    continue;

        //////        EditorUtility.DisplayProgressBar("Update UIResource all map Pos X 2 ...", string.Format("转换中..."), (float)index / (float)(xmlNodeList.Count));
        //////        //ConvertMapXmls(curMapCode);
        //////        if(!haveDealedMap.TryGetValue(curMapPicCode, out rt))
        //////        {
        //////            ConvertMapConfigXmls(curMapPicCode);
        //////            haveDealedMap[curMapPicCode] = 0;
        //////        }



        //////        index++;

        //////        //break;  //  导一版2号地图测试一下
        //////    }

        //////    //  导出出生点 X 2
        //////    UpdateMapBirthPosX2(@"Assets/UIResources/Config/GameRes/Config/MapConfig.xml");

        //////    int totalFileCount = mapFileCount.Count;
        //////    EditorUtility.ClearProgressBar();

        //////    EditorUtility.DisplayDialog("转换地图坐标X2", "转换地图坐标X2成功!", "确认");
        //////}





    public static void UpdateNpcPosX2( string fileName )
    {
        string npcsPath = fileName;
        XmlDocument curNpcXmlDoc = new XmlDocument();

        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(npcsPath, xmlSet);
            curNpcXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败", npcsPath), "确认");
            return;
        }

        XmlElement mapXmlElement = (XmlElement)curNpcXmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 节点不存在 失败", npcsPath), "确认");
            return;
        }

        XmlElement npcsXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("NPCs");
        if (null == npcsXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 中 NPCs 节点不存在 失败", npcsPath), "确认");
            return;
        }


        bool bNeedUpdate = false;
        XmlNodeList xmlNodeList = npcsXmlElement.SelectNodes("NPC");
        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;

            int curX = int.Parse(xmlelement.GetAttribute("X")) * 2;
            int curY = int.Parse(xmlelement.GetAttribute("Y")) * 2;

            xmlelement.SetAttribute("X", curX.ToString());
            xmlelement.SetAttribute("Y", curY.ToString());

            bNeedUpdate = true;
        }

        if( bNeedUpdate )
        {
            try
            {
                curNpcXmlDoc.Save(npcsPath);
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图 npcs 信息配置文件： {0}", npcsPath), "确认");
                return;
            }
        }

    }

    public static void UpdateTeleportsPosX2(string fileName)
    {
        string strPathName = fileName;
        XmlDocument curNpcXmlDoc = new XmlDocument();

        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(strPathName, xmlSet);
            curNpcXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败\n", strPathName), "确认");
            return;
        }

        XmlElement mapXmlElement = (XmlElement)curNpcXmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 节点不存在\n", strPathName), "确认");
            return;
        }

        XmlElement npcsXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("Teleports");
        if (null == npcsXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 中 Teleports 节点不存在\n", strPathName), "确认");
            return;
        }

        bool bNeedUpdate = false;
        XmlNodeList xmlNodeList = npcsXmlElement.SelectNodes("Teleport");
        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;

            int toX = int.Parse(xmlelement.GetAttribute("ToX")) * 2;
            int toY = int.Parse(xmlelement.GetAttribute("ToY")) * 2;

            xmlelement.SetAttribute("ToX", toX.ToString());
            xmlelement.SetAttribute("ToY", toY.ToString());

            int curX = int.Parse(xmlelement.GetAttribute("X")) * 2;
            int curY = int.Parse(xmlelement.GetAttribute("Y")) * 2;

            xmlelement.SetAttribute("X", curX.ToString());
            xmlelement.SetAttribute("Y", curY.ToString());

            bNeedUpdate = true;
        }

        if(bNeedUpdate)
        {
            try
            {
                curNpcXmlDoc.Save(strPathName);
                //teleportsPath = strPathName;
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图 teleports 信息配置文件： {0}", strPathName), "确认");
                return;
            }
        }
       
    }

    public static void UpdateMonsterPosX2( string fileName )
    {
        string strPathName = fileName;
        XmlDocument curMonsterXmlDoc = new XmlDocument();
        

        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(strPathName, xmlSet);
            curMonsterXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败\n", strPathName), "确认");
            return;
        }

        XmlElement mapXmlElement = (XmlElement)curMonsterXmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 节点不存在", strPathName), "确认");
            return;
        }

        XmlElement monstersXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("Monsters");
        if (null == monstersXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 中 Monsters 节点不存在", strPathName), "确认");
            return;
        }

        bool bNeedUpdate = false;
        XmlNodeList xmlNodeList = monstersXmlElement.SelectNodes("Monster");
        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;

            int curX = int.Parse(xmlelement.GetAttribute("X")) * 2;
            int curY = int.Parse(xmlelement.GetAttribute("Y")) * 2;

            xmlelement.SetAttribute("X", curX.ToString());
            xmlelement.SetAttribute("Y", curY.ToString());
            bNeedUpdate = true;
        }

        if(bNeedUpdate)
        {
            try
            {
                curMonsterXmlDoc.Save(strPathName);
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图 Monsters 信息配置文件： {0}", strPathName), "确认");
                return;
                //EditorUtility.DisplayDialog("NPC Monster位置X2", "NPC Monster位置X2 失败", "确认");
            }
        }
       
    }

    public static void UpdateAreaLuaPosX2(string fileName)
    {
        string strPathName = fileName;
        XmlDocument curAreaLuaXmlDoc = new XmlDocument();


        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(strPathName, xmlSet);
            curAreaLuaXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败\n", strPathName), "确认");
            return;
        }

        XmlElement mapXmlElement = (XmlElement)curAreaLuaXmlDoc.SelectSingleNode("Map");
        if (null == mapXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 节点不存在", strPathName), "确认");
            return;
        }

        XmlElement areasXmlElement = (XmlElement)mapXmlElement.SelectSingleNode("Areas");
        if (null == areasXmlElement)
        {
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件中 Map 中 Monsters 节点不存在", strPathName), "确认");
            return;
        }

        bool bNeedUpdate = false;
        XmlNodeList xmlNodeList = areasXmlElement.SelectNodes("Area");
        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;

            int curX = int.Parse(xmlelement.GetAttribute("X")) * 2;
            int curY = int.Parse(xmlelement.GetAttribute("Y")) * 2;

            xmlelement.SetAttribute("X", curX.ToString());
            xmlelement.SetAttribute("Y", curY.ToString());

            bNeedUpdate = true;
        }

        if(bNeedUpdate )
        {
            try
            {
                curAreaLuaXmlDoc.Save(strPathName);
            }
            catch (Exception e)
            {
                Debug.LogError(e.ToString());
                EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图 AreaLua 信息配置文件： {0}", strPathName), "确认");
                return;
            }
        }

    }


    public static void UpdateMapGridPosX2(string fileName)
    {
        string strPathName = fileName;
        XmlDocument curMapGridXmlDoc = new XmlDocument();


        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(strPathName, xmlSet);
            curMapGridXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败\n", strPathName), "确认");
            return;
        }

        XmlElement xmlelement = (XmlElement)curMapGridXmlDoc.SelectSingleNode("Item");
      
        int mapWidth = xmlelement.GetAttribute("MapWidth").SafeToInt32();
        int mapHeight = xmlelement.GetAttribute("MapHeight").SafeToInt32();

        mapWidth *= 2;
        mapHeight *= 2;

        //mapInfo.MapInfo_NodeSize = m_curObsXmlElement.GetAttribute("NodeSize").SafeToInt32();

        xmlelement.SetAttribute("MapWidth", mapWidth.ToString());
        xmlelement.SetAttribute("MapHeight", mapHeight.ToString());        
        xmlelement.SetAttribute("NodeSize", MapGridSize.ToString());

        try
        {
            curMapGridXmlDoc.Save(strPathName);
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图格子信息配置文件： {0}", strPathName), "确认");
            return;
        }
    }

    public static void UpdateMapBirthPosX2(string fileName)
    {
        string strPathName = fileName;
        XmlDocument curMapBirthXmlDoc = new XmlDocument();


        XmlReaderSettings xmlSet = new XmlReaderSettings();
        //xmlSet.IgnoreComments = true;
        try
        {
            XmlReader xmlReader = XmlReader.Create(strPathName, xmlSet);
            curMapBirthXmlDoc.Load(xmlReader);
            xmlReader.Close();
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，{0} 文件加载失败\n", strPathName), "确认");
            return;
        }

        XmlElement mapsXmlElement = (XmlElement)curMapBirthXmlDoc.SelectSingleNode("Maps");
        if (null == mapsXmlElement)
        {
            EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否正常， MapConfig.xml Config 中未包含 Maps节点  配置文件名： {0}", m_SettingFileName), "确认");
            return;
        }


        XmlNodeList xmlNodeList = mapsXmlElement.SelectNodes("Map");
        if (null == xmlNodeList || xmlNodeList.Count <= 0)
        {
            EditorUtility.DisplayDialog("获取场景ID", string.Format("获取场景ID失败!，请确认配置文件是否正常， MapConfig.xml  <Config>  <Maps>  中没有Map节点  配置文件名： {0}", m_SettingFileName), "确认");
            return;
        }

        foreach (XmlNode node in xmlNodeList)
        {
            XmlElement xmlelement = (XmlElement)node;
            int birthX = int.Parse(xmlelement.GetAttribute("BirthPosX"));
            int birthY = int.Parse(xmlelement.GetAttribute("BirthPosY"));

            birthX *= 2;
            birthY *= 2;

            xmlelement.SetAttribute("BirthPosX", birthX.ToString());
            xmlelement.SetAttribute("BirthPosY", birthY.ToString());
        }

        try
        {
            curMapBirthXmlDoc.Save(strPathName);
        }
        catch (Exception e)
        {
            Debug.LogError(e.ToString());
            EditorUtility.DisplayDialog("导出地图配置", string.Format("导出地图配置失败!，请确认是否签出地图格子信息配置文件： {0}", strPathName), "确认");
            return;
        }
    }
}
