// Upgrade NOTE: replaced 'UNITY_INSTANCE_ID' with 'UNITY_VERTEX_INPUT_INSTANCE_ID'

// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "A/Player_Env"
{
	Properties
	{
		[HideInInspector] __dirty( "", Int ) = 1
		_MainTex("MainTex", 2D) = "white" {}
		_EnvScale("EnvScale", Range( 0 , 3)) = 0.2
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
			float3 worldRefl;
			INTERNAL_DATA
			float3 worldNormal;
			float3 viewDir;
			float4 rimColor;
		};

		uniform sampler2D _MainTex;
		uniform float4 _MainTex_ST;
		uniform fixed _EnvScale;
		uniform fixed _hitColor;
		uniform fixed4 RimColorAndPower;
		uniform fixed4 RimLightDir;
		uniform fixed4 AmbientColor;

		#pragma multi_compile _RIMMODE_ON _RIMMODE_OFF
		#pragma multi_compile _CUTMODE_OFF _CUTMODE_ON
		#include "MyLighting.cginc"

		void surf( Input i , inout SurfaceOutput o )
		{
			float2 uv_MainTex = i.uv_texcoord * _MainTex_ST.xy + _MainTex_ST.zw;
			float4 tex2DNode1 = tex2D( _MainTex,uv_MainTex);
			#if _CUTMODE_ON
				clip(tex2DNode1.a - 0.5);
			#endif
			o.Albedo = tex2DNode1.xyz;
			float3 worldrefVec5 = i.worldRefl;
			fixed3 reflectedDir = worldrefVec5;
			o.Emission = ( tex2DNode1.a * ( _EnvScale * (UNITY_SAMPLE_TEXCUBE(unity_SpecCube0, reflectedDir)) ) ).rgb ;
			#if _RIMMODE_ON
				o.Emission += ( pow( ( 1.0 - saturate( dot( i.worldNormal , i.viewDir ) ) ) , i.rimColor.a ) * ( i.rimColor.rgb ) ).rgb;
				o.Emission += tex2DNode1.rgb*AmbientColor;
			#endif
			o.Alpha = 1;
		}

		ENDCG
		CGPROGRAM
		#pragma exclude_renderers xbox360 xboxone ps4 psp2 n3ds wiiu vulkan
		#pragma surface surf WrapBlinnPhong keepalpha noshadow nolightmap  nodynlightmap nodirlightmap nofog vertex:rimvertfunc
		

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
			#if ( SHADER_API_D3D11 || SHADER_API_GLCORE || SHADER_API_GLES3 || SHADER_API_METAL )
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
				surfIN.worldRefl = -worldViewDir;
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
	CustomEditor "ASEMaterialInspector"
}
/*ASEBEGIN
Version=5105
126;248;1641;785;2548.3;-76.00066;1.6;True;True
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;0;0,0;Float;False;True;2;Float;ASEMaterialInspector;Lambert;A/Player_Env;False;False;False;False;False;False;True;True;True;True;False;True;Back;0;0;False;0;0;Opaque;0.5;True;True;0;False;Opaque;Geometry;All;True;True;True;True;True;True;True;False;False;False;False;False;False;True;True;True;True;False;0;255;255;0;0;0;0;False;0;4;10;25;False;0.5;False;0;Zero;Zero;0;Zero;Zero;Add;Add;0;False;0;0,0,0,0;VertexOffset;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0.0;False;4;FLOAT;0.0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0.0;False;9;FLOAT;0.0;False;10;OBJECT;0.0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;13;OBJECT;0.0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.CommentaryNode;3;-1562.538,96.96259;Float;False;951.0302;391.8097;环境反射;6;10;9;8;7;5;4;
Node;AmplifyShaderEditor.CommentaryNode;4;-1242.237,268.9626;Float;False;232.96;126.2;使用Unity内置的反射球;0;
Node;AmplifyShaderEditor.CommentaryNode;11;-2032.442,519.0212;Float;False;1431.239;506.109;Rim 轮廓光;9;20;17;16;15;14;13;12;25;26;
Node;AmplifyShaderEditor.WorldReflectionVector;5;-1512.538,290.3628;Float;False;0;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;7;-936.6377,238.3625;Float;False;0;FLOAT;0.0;False;1;FLOAT4;0.0;False
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;9;-763.2367,214.9622;Float;False;0;FLOAT;0.0,0,0,0;False;1;FLOAT4;0;False
Node;AmplifyShaderEditor.CustomExpressionNode;8;-1192.237,318.9625;Fixed;False;UNITY_SAMPLE_TEXCUBE(unity_SpecCube0, reflectedDir);4;1;True;reflectedDir;FLOAT3;0.0;0;FLOAT3;0.0;False
Node;AmplifyShaderEditor.SimpleAddOpNode;23;-438.3994,345.5007;Float;False;0;FLOAT4;0.0,0,0,0;False;1;COLOR;0.0,0,0,0;False
Node;AmplifyShaderEditor.SamplerNode;1;-1245.5,-187.5;Float;True;Property;_MainTex;MainTex;1;0;None;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;1.0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1.0;False
Node;AmplifyShaderEditor.PowerNode;12;-1012.606,634.7204;Float;False;0;FLOAT;0.0;False;1;FLOAT;0.0;False
Node;AmplifyShaderEditor.OneMinusNode;13;-1205.404,611.3198;Float;False;0;FLOAT;0;False
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;14;-1001.901,762.5984;Float;False;0;COLOR;0.0;False;1;COLOR;0.0,0,0,0;False
Node;AmplifyShaderEditor.DotProductOpNode;15;-1562.908,574.5206;Float;False;0;FLOAT3;0,0,0;False;1;FLOAT3;0.0;False
Node;AmplifyShaderEditor.SaturateNode;16;-1393.908,576.8207;Float;False;0;FLOAT;1.23;False
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;17;-770.2068,649.92;Float;False;0;FLOAT;0;False;1;COLOR;0.0;False
Node;AmplifyShaderEditor.ColorNode;20;-1410.708,779.217;Fixed;False;Global;_Color1;Color 1;0;0;0.8602941,0.7988694,0.3036332,0.007843138
Node;AmplifyShaderEditor.WorldNormalVector;25;-1866.699,602.4012;Float;False;0;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.RangedFloatNode;10;-1265.537,156.4622;Fixed;False;Property;_EnvScale;EnvScale;4;0;0.2;0;3
Node;AmplifyShaderEditor.ViewDirInputsCoordNode;26;-1828.3,762.401;Float;False;World
WireConnection;0;0;1;0
WireConnection;0;2;23;0
WireConnection;7;0;10;0
WireConnection;7;1;8;0
WireConnection;9;0;1;4
WireConnection;9;1;7;0
WireConnection;8;0;5;0
WireConnection;23;0;9;0
WireConnection;23;1;17;0
WireConnection;12;0;13;0
WireConnection;12;1;20;4
WireConnection;13;0;16;0
WireConnection;14;0;20;0
WireConnection;15;0;25;0
WireConnection;15;1;26;0
WireConnection;16;0;15;0
WireConnection;17;0;12;0
WireConnection;17;1;14;0
ASEEND*/
//CHKSM=F79A7DDCF01193558ACE973EE1E2615294B0AEE1