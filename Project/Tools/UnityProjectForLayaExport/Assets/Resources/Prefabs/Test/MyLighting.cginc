#ifndef MY_LIGHTING_INCLUDED
#define MY_LIGHTING_INCLUDED

	void rimvertfunc( inout appdata_full v, out Input o )
	{
		UNITY_INITIALIZE_OUTPUT( Input, o );

#if _RIMMODE_ON
		// 在顶点中计算Rim颜色值及背光方向对Rim值的限制(Rim只出现在背光方向上)
		fixed3 backLightDir = RimLightDir;
		fixed3 worldNormal = normalize(mul(v.normal, (float3x3)unity_WorldToObject));

		// 被击中时,轮廓颜色的范围会变大
		fixed rimPower = lerp(RimColorAndPower.a, 1, _hitColor);

		o.rimColor.a = rimPower;
		o.rimColor.rgb = pow(1 - saturate(dot(worldNormal, backLightDir)), rimPower) * RimColorAndPower.rgb;
		
		// 计算击中效果的颜色,如果被击中了,则显示很强的颜色
		o.rimColor.rgb = lerp(o.rimColor, 3, _hitColor);

		#ifdef _Vertex_Rim			
			fixed viewDir = ObjSpaceViewDir(v.vertex);
			o.rimColor.rgb = pow(1 - saturate(dot(viewDir, v.normal)), rimPower)* RimColorAndPower.rgb;
		#endif
#endif		
	}


	// NOTE: some intricacy in shader compiler on some GLES2.0 platforms (iOS) needs 'viewDir' & 'h'
	// to be mediump instead of lowp, otherwise specular highlight becomes too bright.
	inline fixed4 WrapBlinnPhongLight (SurfaceOutput s, half3 viewDir, UnityLight light)
	{
		half3 h = normalize (light.dir + viewDir);

		// fixed diff = max (0, dot (s.Normal, light.dir));
		fixed diff = dot (s.Normal, light.dir) * 0.2 + 0.8;		// Diffuse Wrap,使得基础光更圆滑一些.

		fixed4 c;
		c.rgb = s.Albedo * light.color * diff * RimLightDir.w;// + light.color * _SpecColor.rgb * spec;
#ifdef _SPECULAR_
		float nh = max (0, dot (s.Normal, h));		
		float spec = pow (nh, s.Specular*128.0) * s.Gloss;
		c.rgb += light.color * spec;
#endif

		c.a = s.Alpha;

		return c;
	}

	// 我们自己的人物光照公式
	inline fixed4 LightingWrapBlinnPhong (SurfaceOutput s, half3 viewDir, UnityGI gi)
	{
		fixed4 c;
		c = WrapBlinnPhongLight (s, viewDir, gi.light);

		#ifdef UNITY_LIGHT_FUNCTION_APPLY_INDIRECT
			c.rgb += s.Albedo * gi.indirect.diffuse;
		#endif

		return c;
	}

	inline void LightingWrapBlinnPhong_GI (
		SurfaceOutput s,
		UnityGIInput data,
		inout UnityGI gi)
	{
		gi = UnityGlobalIllumination (data, 1.0, s.Normal);
	}


#endif
