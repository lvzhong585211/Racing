// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "A/FX/PlaneMirror"
{
	Properties
	{
		[HideInInspector] __dirty( "", Int ) = 1
		_Color("Color", Color) = (1,1,1,1)
		_ReflectionTex("ReflectionTex", 2D) = "white" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
	}

	SubShader
	{
		Tags{ "RenderType" = "Opaque"  "Queue" = "Geometry+0" }
		Cull Back
		CGPROGRAM
		#pragma target 3.0
		#pragma exclude_renderers xbox360 xboxone ps4 psp2 n3ds wiiu 
		#pragma surface surf Lambert keepalpha  vertex:vertexDataFunc 
		struct Input
		{
			float3 worldNormal;
			INTERNAL_DATA
			float3 worldPos;
			float2 uv_texcoord;
			float4 refl;
		};

		uniform sampler2D _ReflectionTex;
		uniform fixed4 _Color;

		void vertexDataFunc( inout appdata_full v, out Input o )
		{
			UNITY_INITIALIZE_OUTPUT( Input, o );
			
			float4 pos = UnityObjectToClipPos(v.vertex);
			o.refl = ComputeScreenPos (pos);
		}

		void surf( Input i , inout SurfaceOutput o )
		{
			fixed4 refl = tex2Dproj(_ReflectionTex, UNITY_PROJ_COORD(i.refl));

			o.Albedo = refl*_Color.a + _Color;
			o.Alpha = 1;

		}

		ENDCG
	}
	CustomEditor "ASEMaterialInspector"
}
/*ASEBEGIN
Version=5105
111;117;1644;904;1175;315;1;True;True
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;0;0,0;Float;False;True;2;Float;ASEMaterialInspector;Lambert;A/PlaneMirror;False;False;False;False;False;False;False;False;False;False;False;False;Back;0;0;False;0;0;Opaque;0.5;True;False;0;False;Opaque;Geometry;All;True;True;True;True;True;True;True;False;False;False;False;False;False;True;True;True;True;False;0;255;255;0;0;0;0;False;0;4;10;25;False;0.5;True;0;Zero;Zero;0;Zero;Zero;Add;Add;0;False;0;0,0,0,0;VertexOffset;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0.0;False;4;FLOAT;0.0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0.0;False;9;FLOAT;0.0;False;10;OBJECT;0.0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;13;OBJECT;0.0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.SamplerNode;1;-451,-222;Float;True;Property;_ReflectionTex;ReflectionTex;0;0;None;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;1.0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1.0;False
Node;AmplifyShaderEditor.RangedFloatNode;2;-342,377;Float;False;Constant;_Float0;Float 0;1;0;0;0;0
Node;AmplifyShaderEditor.ViewDirInputsCoordNode;3;-669,230;Float;False;World
Node;AmplifyShaderEditor.WorldNormalVector;4;-684,34;Float;False;0;FLOAT3;0,0,0;False
Node;AmplifyShaderEditor.DotProductOpNode;5;-431,155;Float;False;0;FLOAT3;0,0,0;False;1;FLOAT3;0.0;False
WireConnection;0;0;1;0
WireConnection;0;1;5;0
WireConnection;0;11;2;0
WireConnection;4;0;3;0
WireConnection;5;0;4;0
WireConnection;5;1;3;0
ASEEND*/
//CHKSM=616C7CC4566786BB2FD743BABE55338FAE7D0170