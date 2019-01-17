#if UNITY_EDITOR
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.IO;
using System.Xml;

public class GlTFExporterWindow : EditorWindow
{
	const string KEY_PATH = "GlTFPath";
	const string KEY_FILE = "GlTFFile";
	static public string path = "?";
	static string savedPath;
	static string savedFile;
	static XmlDocument xdoc;

	static Preset preset = new Preset();
	static UnityEngine.TextAsset presetAsset;
	GameObject exporterGo;
	SceneToGlTFWiz exporter;
	bool buildZip = false;
	bool convertImages = false;
	bool exportAnimation = true;
	private bool exportTangent = false;

	//EditorPrefs.SetString(KEY_PATH, savedPath);
	//EditorPrefs.SetString(KEY_FILE, savedFile);
	[MenuItem("Tools/Export to glTF")]
	static void CreateWizard()
	{
		savedPath = EditorPrefs.GetString(KEY_PATH, "/Export/");
		savedFile = EditorPrefs.GetString(KEY_FILE, "test.gltf");
		path = savedPath + "/" + savedFile;
		//		ScriptableWizard.DisplayWizard("Export Selected Stuff to glTF", typeof(SceneToGlTFWiz), "Export");

		GlTFExporterWindow window = (GlTFExporterWindow)EditorWindow.GetWindow(typeof(GlTFExporterWindow), false, "导出glTF");
		window.Show();
	}

	void OnWizardUpdate()
	{
		//		Texture[] txs = Selection.GetFiltered(Texture, SelectionMode.Assets);
		//		Debug.Log("found "+txs.Length);
	}

	void OnGUI()
	{
		// GlTF_Writer.binary = GUILayout.Toggle(GlTF_Writer.binary, "Binary GlTF");
		// buildZip = GUILayout.Toggle(buildZip, "Export Zip");

		// Force animation baking for now
		// GlTF_Writer.bakeAnimation = GUILayout.Toggle(true, "Bake animations (forced for now)");
		// exportAnimation = GUILayout.Toggle(exportAnimation, "Export animations");
		// convertImages = GUILayout.Toggle(convertImages, "Convert images");
		// presetAsset = EditorGUILayout.ObjectField("Preset file", presetAsset, typeof(UnityEngine.TextAsset), false) as UnityEngine.TextAsset;

		if (!exporterGo)
		{
			exporterGo = GameObject.Find("exporter");
			if(!exporterGo)
				exporterGo = new GameObject("exporter");
		}
		if(!exporter)
		{
			exporter = exporterGo.GetComponent<SceneToGlTFWiz>();
			if (!exporter)
			{
				exporter = exporterGo.AddComponent<SceneToGlTFWiz>();
			}
			GlTF_Writer.bakeAnimation = false;
			GlTF_Writer.binary = false;
			convertImages = true;
		}

		GUI.enabled = (Selection.GetTransforms(SelectionMode.Deep).Length > 0);

		var layoutOption = GUILayout.Height(30);

		GUILayout.Label("");
		exportTangent = GUILayout.Toggle(exportTangent, "导出切线", layoutOption);

		GUILayout.Space(5);
		if (GUILayout.Button("Export Actor(皮肤,骨架及动作)", layoutOption))
		{
			GlTF_Writer.exportAnimation = true;
			GlTF_Writer.exportMesh = true;
			GlTF_Writer.clearNoUsedNode = false;

			ExportFile("Actors/");
		}

		GUILayout.Space(5);
		if (GUILayout.Button("Export Equip(皮肤)", layoutOption))
		{
			GlTF_Writer.exportAnimation = false;
			GlTF_Writer.exportMesh = true;
			GlTF_Writer.clearNoUsedNode = true;
			ExportFile("Equips/");
		}

		GUILayout.Space(5);
		if (GUILayout.Button("Export Animations(动作)", layoutOption))
		{
			GlTF_Writer.exportAnimation = true;
			GlTF_Writer.exportMesh = false;
			GlTF_Writer.clearNoUsedNode = true;
			ExportFile("Animations/");
		}

		GUILayout.Space(5);
		if (GUILayout.Button("Export Scene(场景)", layoutOption))
		{
			GlTF_Writer.exportAnimation = true;
			GlTF_Writer.exportMesh = true;
			GlTF_Writer.clearNoUsedNode = false;
			ExportFile("Scenes/");
		}

		GUI.enabled = true;
	}

	void OnDestroy()
	{
		GameObject.DestroyImmediate(exporterGo);
		exporter = null;
	}

	/// <summary>
	/// 导出选中对象到指定相对目录
	/// </summary>
	/// <param name="outDir"></param>
	void ExportFile(string outDir)
	{
		var ext = "gltf";	// 只支持json格式,二进制格式通过后期优化工具处理来实现
		path = Application.dataPath + "/../exportGlTFs/" + outDir;

		if (path.Length != 0)
		{
			if (presetAsset != null)
			{
				string psPath = AssetDatabase.GetAssetPath(presetAsset);
				if (psPath != null)
				{
					psPath = psPath.Remove(0, "Assets".Length);
					psPath = Application.dataPath + psPath;
					preset.Load(psPath);
				}
			}
			exporter.ExportCoroutine(path, preset, buildZip, true, convertImages);
		}
	}
}
#endif