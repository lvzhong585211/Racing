// Upgrade NOTE: replaced 'UNITY_INSTANCE_ID' with 'UNITY_VERTEX_INPUT_INSTANCE_ID'

// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "A/Player"
{
	Properties
	{		
		[HideInInspector] __dirty( "", Int ) = 1	
		_MainTex("MainTex", 2D) = "white" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
		[HideInInspector] _hitColor( "", Range(0, 1)) = 0
		[Space(10)][KeywordEnum(On, Off)]_RimMode("背光模式", float) = 0
		[Space(10)][KeywordEnum(Off, On)]_CutMode("镂空模式", float) = 0
		// [Space(10)][Enum(CullMode)]_CullMode("剔除模式", float) = 0
	}

	SubShader
	{
		Tags{ "RenderType" = "Opaque"  "Queue" = "Geometry+0" "IsEmissive" = "true"  }
		// Cull [_CullMode]
		ZTest LEqual
		CGINCLUDE
		#include "UnityPBSLighting.cginc"
		#include "Lighting.cginc"
		#pragma target 3.0
		#ifdef UNITY_PASS_SHADOWCASTER
			#undef INTERNAL_DATA
			#undef WorldReflectionVector
			#undef WorldNormalVector
			#define INTERNAL_DATA half3 internalSurfaceTtoW0; half3 internalSurfaceTtoW1; half3 internalSurfaceTtoW2;
			#define WorldReflectionVector(data,normal) reflect (data.worldRefl, half3(dot(data.internalSurfaceTtoW0,normal), dot(data.internalSurfaceTtoW1,normal), dot(data.internalSurfaceTtoW2,normal)))
			#define WorldNormalVector(data,normal) fixed3(dot(data.internalSurfaceTtoW0,normal), dot(data.internalSurfaceTtoW1,normal), dot(data.internalSurfaceTtoW2,normal))
		#endif
		struct Input
		{
			float2 uv_texcoord;
			float3 worldNormal;
			INTERNAL_DATA
			float3 viewDir;
			float4 rimColor;
		};

		uniform sampler2D _MainTex;
		uniform float4 _MainTex_ST;
		uniform fixed _hitColor;
		uniform fixed4 RimColorAndPower;
		uniform fixed4 RimLightDir;
		uniform fixed4 AmbientColor;

		#pragma multi_compile _RIMMODE_ON _RIMMODE_OFF
		#pragma multi_compile _CUTMODE_OFF _CUTMODE_ON
		//#define _Vertex_Rim
		#include "MyLighting.cginc"	

		void surf( Input i , inout SurfaceOutput o )
		{
			float2 uv_MainTex = i.uv_texcoord * _MainTex_ST.xy + _MainTex_ST.zw;
			fixed4 diff = tex2D( _MainTex,uv_MainTex);
			o.Albedo = diff.xyz;
			#if _CUTMODE_ON
				clip(diff.a - 0.5);
			#endif
			#if _RIMMODE_ON
			o.Emission = ( pow( ( 1.0 - saturate( dot( i.worldNormal , i.viewDir ) ) ) , i.rimColor.a ) * i.rimColor.rgb ).rgb;
			o.Emission += diff.rgb*AmbientColor;
			#endif
			o.Alpha = 1;
		}

		ENDCG
		CGPROGRAM
		#pragma exclude_renderers xbox360 xboxone ps4 psp2 n3ds wiiu vulkan
		#pragma surface surf WrapBlinnPhong keepalpha nolightmap  nodynlightmap nodirlightmap vertex:rimvertfunc
		
		ENDCG
		Pass
		{
			Name "ShadowCaster"
			Tags{ "LightMode" = "ShadowCaster" }
			ZWrite On
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma target 3.0
			#pragma multi_compile_instancing
			#pragma multi_compile_shadowcaster
			#pragma multi_compile UNITY_PASS_SHADOWCASTER
			#pragma skip_variants FOG_LINEAR FOG_EXP FOG_EXP2
			# include "HLSLSupport.cginc"
			#if ( SHADER_API_D3D11 || SHADER_API_GLCORE || SHADER_API_GLES3 || SHADER_API_METAL  )
				#define CAN_SKIP_VPOS
			#endif
			#include "UnityCG.cginc"
			#include "Lighting.cginc"
			#include "UnityPBSLighting.cginc"
			sampler3D _DitherMaskLOD;
			struct v2f
			{
				V2F_SHADOW_CASTER;
				float3 worldPos : TEXCOORD6;
				float4 tSpace0 : TEXCOORD1;
				float4 tSpace1 : TEXCOORD2;
				float4 tSpace2 : TEXCOORD3;
				float4 texcoords01 : TEXCOORD4;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			v2f vert( appdata_full v )
			{
				v2f o;
				UNITY_SETUP_INSTANCE_ID( v );
				UNITY_INITIALIZE_OUTPUT( v2f, o );
				UNITY_TRANSFER_INSTANCE_ID( v, o );
				float3 worldPos = mul( unity_ObjectToWorld, v.vertex ).xyz;
				half3 worldNormal = UnityObjectToWorldNormal( v.normal );
				fixed3 worldTangent = UnityObjectToWorldDir( v.tangent.xyz );
				fixed tangentSign = v.tangent.w * unity_WorldTransformParams.w;
				fixed3 worldBinormal = cross( worldNormal, worldTangent ) * tangentSign;
				o.tSpace0 = float4( worldTangent.x, worldBinormal.x, worldNormal.x, worldPos.x );
				o.tSpace1 = float4( worldTangent.y, worldBinormal.y, worldNormal.y, worldPos.y );
				o.tSpace2 = float4( worldTangent.z, worldBinormal.z, worldNormal.z, worldPos.z );
				o.texcoords01 = float4( v.texcoord.xy, v.texcoord1.xy );
				o.worldPos = worldPos;
				TRANSFER_SHADOW_CASTER_NORMALOFFSET( o )
				return o;
			}
			fixed4 frag( v2f IN
			#if !defined( CAN_SKIP_VPOS )
			, UNITY_VPOS_TYPE vpos : VPOS
			#endif
			) : SV_Target
			{
				UNITY_SETUP_INSTANCE_ID( IN );
				Input surfIN;
				UNITY_INITIALIZE_OUTPUT( Input, surfIN );
				surfIN.uv_texcoord = IN.texcoords01.xy;
				float3 worldPos = float3( IN.tSpace0.w, IN.tSpace1.w, IN.tSpace2.w );
				fixed3 worldViewDir = normalize( UnityWorldSpaceViewDir( worldPos ) );
				surfIN.viewDir = worldViewDir;
				surfIN.worldNormal = float3( IN.tSpace0.z, IN.tSpace1.z, IN.tSpace2.z );
				surfIN.internalSurfaceTtoW0 = IN.tSpace0.xyz;
				surfIN.internalSurfaceTtoW1 = IN.tSpace1.xyz;
				surfIN.internalSurfaceTtoW2 = IN.tSpace2.xyz;
				SurfaceOutput o;
				UNITY_INITIALIZE_OUTPUT( SurfaceOutput, o )
				surf( surfIN, o );
				#if defined( CAN_SKIP_VPOS )
				float2 vpos = IN.pos;
				#endif
				SHADOW_CASTER_FRAGMENT( IN )
			}
			ENDCG
		}
	}
	Fallback "Diffuse"
}
/*ASEBEGIN
Version=5105
126;248;1641;785;2036.117;81.26575;1.3;True;False
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;0;147.2,339.6;Fixed;False;True;2;Fixed;;Lambert;A/Player;False;False;False;False;False;False;True;True;True;True;False;True;Back;0;3;False;0;0;Opaque;0.5;True;True;0;False;Opaque;Geometry;All;True;True;True;True;True;True;True;False;False;False;False;False;False;True;True;True;True;False;0;255;255;0;0;0;0;False;0;4;10;25;False;0.5;True;0;Zero;Zero;0;Zero;Zero;Add;Add;0;False;0;0,0,0,0;VertexOffset;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0.0;False;4;FLOAT;0.0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0.0;False;9;FLOAT;0.0;False;10;OBJECT;0.0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;13;OBJECT;0.0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.SaturateNode;20;-962.4039,309.9996;Float;False;0;FLOAT;1.23;False
Node;AmplifyShaderEditor.DotProductOpNode;21;-1137.603,334.4997;Float;False;0;FLOAT3;0.0,0,0;False;1;FLOAT3;0.0,0,0;False
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;27;-358.2028,390.8992;Float;False;0;FLOAT;0;False;1;COLOR;0.0;False
Node;AmplifyShaderEditor.PowerNode;26;-600.6031,375.6995;Float;False;0;FLOAT;0.0;False;1;FLOAT;0.0;False
Node;AmplifyShaderEditor.ColorNode;25;-606.8026,555.4988;Float;False;Property;_RimColor;RimColor;-1;0;0,0,0,0
Node;AmplifyShaderEditor.OneMinusNode;5;-793.4009,352.2989;Float;False;0;FLOAT;0;False
Node;AmplifyShaderEditor.RangedFloatNode;28;-890.0026,467.6995;Float;False;Property;_RimPower;RimPower;-1;0;1.761297;0;10
Node;AmplifyShaderEditor.SamplerNode;1;-210.5004,83.20016;Float;True;Property;_MainTex;MainTex;-1;0;None;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;0;SAMPLER2D;0,0;False;1;FLOAT2;1,0;False;2;FLOAT;1.0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1.0;False
Node;AmplifyShaderEditor.ViewDirInputsCoordNode;34;-1462.818,394.5349;Float;False;World
Node;AmplifyShaderEditor.WorldNormalVector;32;-1505.717,241.1344;Float;False;0;FLOAT3;0,0,0;False
WireConnection;0;0;1;0
WireConnection;0;2;27;0
WireConnection;20;0;21;0
WireConnection;21;0;32;0
WireConnection;21;1;34;0
WireConnection;27;0;26;0
WireConnection;27;1;25;0
WireConnection;26;0;5;0
WireConnection;26;1;28;0
WireConnection;5;0;20;0
ASEEND*/
//CHKSM=CF908C2494E0398454530D4F865F521D7768737F