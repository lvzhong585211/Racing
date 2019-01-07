using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

class ParticleInfo
{
	public string Path = null;
	public string Bone = null;
}

[DisallowMultipleComponent]
public class AnimEvents : MonoBehaviour {
	/// <summary>
	/// 播放指定路径的特效.
	/// </summary>
	/// <param name="particlePath"></param>
	public void PlayParticle(string strParticleInfo)
	{
		string jsonString = "{" + strParticleInfo + "}";
		var particleInfo = JsonUtility.FromJson<ParticleInfo>(jsonString);
		if(particleInfo == null)
		{
			Debug.LogErrorFormat("({0})上非法的动作特效事件描述({1}),不符合Json描述.", gameObject.name, strParticleInfo);
			return;
		}
		
		if(particleInfo.Bone == null)
		{
			particleInfo.Bone = "Bone40";
		}

		var bindBoneObj = gameObject.transform.Find(particleInfo.Bone);
		if(bindBoneObj == null)
		{
			Debug.LogErrorFormat("找不到({0})上动作播放的特效绑定骨骼({1})", gameObject.name, particleInfo.Bone);
			return;
		}

		var particlePath = "Assets/AssetsToBundle/Decoration/" + particleInfo.Path + ".prefab";
		var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(particlePath);
		if(prefab == null)
		{
			Debug.LogErrorFormat("找不到({0})上动作播放的特效({1})", gameObject.name, particlePath);
			return;
		}

		var particleSystemGO = Instantiate<GameObject>(prefab);
		particleSystemGO.transform.SetParent(gameObject.transform, false);
		particleSystemGO.AddComponent<ParticleAutoDestroy>();
		var ps = particleSystemGO.GetComponent<ParticleSystem>();
		ps.Play();
	}
}
