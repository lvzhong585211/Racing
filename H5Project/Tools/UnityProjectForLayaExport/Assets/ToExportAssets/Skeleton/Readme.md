## 导出骨架  
-----  
1. 由模型制作软件(如3DMax)中导出带有游戏中会使用到的所有骨骼的fbx文件,fbx中可以带有一套方便查看错误的模型  
2. fbx导入配置  
![Rig配置](Pics/骨架fbx配置.png)![Rig配置](Pics/骨架fbx配置_Animation.png)  
3. 打开`ExportActorScenes\ExportSkeleton.unity`场景,创建骨架对应的prefab.  
![Rig配置](Pics/骨架Prefab.png)    
4. Prefab的配置项  
![Rig配置](Pics/禁止皮肤导出.png)    
5. 真正导出时的选项  
![Rig配置](Pics/骨架导出选项.png)
-----  
## 导出NPC
----- 
NPC的FBX模型文件存放的位置
![Rig配置](Pics/NPC_FBX文件存放位置.png)

1. 添加FBX文件，贴图文件，修改FBX属性，修改材质球信息，贴好贴图。
![Rig配置](Pics/NPC_FBX文件.png)
![Rig配置](Pics/NPC_FBX文件属性设置1.png)
![Rig配置](Pics/NPC_FBX文件属性设置2.png)
![Rig配置](Pics/NPC_材质球设置.png)

2. 右键添加Animator Controller 组件，添加角色的动画文件到组件，在prefab上加上制作完成的组件。
角色位置要放在0.0.0点，然后制作prefab。

![Rig配置](Pics/NPC_Animator_Controller_组件.png)
![Rig配置](Pics/NPC_Animator_Controller设置.png)
![Rig配置](Pics/NPC_Prefab设置.png)
![Rig配置](Pics/NPC_Prefab存放位置.png)

3.输出模型和动作文件。在场景内只留下需要输出的角色（其他的隐藏或删除）。
![Rig配置](Pics/NPC_Hierarchy场景内放置NPC.png)
![Rig配置](Pics/NPC_输出文件选项.png)
选择角色输出的选项（Character）,修改输出路径，点击输出
![Rig配置](Pics/NPC_输出工具设置.png)

4.把输出文件放在相对应的H5文件夹内。Lh+模型+动作+材质+贴图文件。
![Rig配置](Pics/NPC_LH文件存放位置.png)
![Rig配置](Pics/NPC_模型文件存放位置.png)
![Rig配置](Pics/NPC_材质文件存放位置.png)
![Rig配置](Pics/NPC_贴图文件存放位置.png)
-----  
## 导出Monster怪物
----- 
怪物FBX模型文件存放位置
![Rig配置](Pics/Monster_怪物FBX文件存放位置.png)

1.	添加FBX文件，贴图文件，修改FBX属性，修改材质球信息，贴好贴图。
![Rig配置](Pics/Monster_怪物模型文件存放位置.png)
![Rig配置](Pics/Monster_动画文件存放位置.png)
![Rig配置](Pics/Monster_贴图文件存放位置.png)
![Rig配置](Pics/Monster_FBX文件属性修改.png)
![Rig配置](Pics/Monster_动画文件属性修改.png)
![Rig配置](Pics/Monster_材质球属性修改.png)

2. 右键添加Animator Controller（动画控制器） 组件，添加角色的动画文件到组件，在prefab上加上制作完成的组件。
角色位置要放在0.0.0点，然后制作prefab。

![Rig配置](Pics/Monster_动画控制器存放位置.png)
![Rig配置](Pics/Monster_动画控制器设置.png)
![Rig配置](Pics/Monster_Prefab文件设置.png)
![Rig配置](Pics/Monster_Prefab文件存放位置.png)

3.输出模型和动作文件。在场景内只留下需要输出的角色（其他的隐藏或删除）。
![Rig配置](Pics/Monster_文件输出选项.png)
![Rig配置](Pics/Monster_文件输出.png)
![Rig配置](Pics/Monster_文件输出属性设置.png)

4.把输出文件放在相对应的H5文件夹内。Lh+模型+动作+材质+贴图文件。
![Rig配置](Pics/Monster_LH文件存放路径.png)
![Rig配置](Pics/Monster_输出文件存放路径.png)
![Rig配置](Pics/Monster_Prefab文件存放路径.png)