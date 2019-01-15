using UnityEngine;
using System.Collections;
using UnityEditor;

[CustomEditor(typeof(SceneViewMouse))]
class SceneViewMouseEditor : Editor
{
    public static Vector3 mousePos;
    //public static bool EditGrid = false;
    public static int brushLength = 1;

    public static float heightDelata = 1.0f;

    SerializedProperty BrushLength;
    SerializedProperty HeightDelta;

    void OnEnable()
    {
        BrushLength = serializedObject.FindProperty("BrushLength");
        HeightDelta = serializedObject.FindProperty("HeightDelta");
    }

    public override void OnInspectorGUI()  
    {
        //EditGrid = GUILayout.Toggle(EditGrid, "EditTerrain");

        serializedObject.Update();
        EditorGUILayout.PropertyField(BrushLength);
        if (BrushLength.intValue > 25)
            BrushLength.intValue = 25;
        if (BrushLength.intValue < 1)
            BrushLength.intValue = 1;

        EditorGUILayout.PropertyField(HeightDelta);
        if (HeightDelta.floatValue > 3.0f)
            HeightDelta.floatValue = 3.0f;
        if (HeightDelta.floatValue < 0.0f)
            HeightDelta.floatValue = 0.0f;

        serializedObject.ApplyModifiedProperties();

        brushLength = BrushLength.intValue;
        heightDelata = HeightDelta.floatValue;
    }
    void OnSceneGUI()
    {
        SceneViewMouse obj = (SceneViewMouse)target;
        mousePos = Event.current.mousePosition;
        mousePos.y = Screen.height - mousePos.y - 36.0f; // ??? Why that offset?!       
    }
}
