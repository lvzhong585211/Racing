## 常用操作说明 ##
-----  
* **修改过 `src\Net\Proto\NetMessage.proto` 文件后需要执行命令:** 

    ```js
    pbjs -t static-module -w closure -r NetMsg --no-create --no-convert --no-delimited --no-verify -o bin/libs/netmessage.js src/Net/Proto/NetMessage.proto && pbts -m -n NetMsg -o libs/netmessage.d.ts bin/libs/netmessage.js && node tools/cli/clear_netmessage_proto.js
    ```     
    来编译Proto,以生成 `bin\libs\netmessage.js` 与 `libs\netmessage.d.ts` 文件.  

    如下图: 
    
    ![图1](../../程序组/02_制作流程文档/界面制作/引用图片/生成protobuf.jpg)

    > 必须要安装 `protobufjs`,通过在控制台执行如下指令安装:  
    > 
    > ```cmd
    > npm install protobufjs -g --registry=https://registry.npm.taobao.org
    > ```  

* **添加新的数据表后**  
    需要同步维护 `tools/cli/sync_datatables.js` 文件,以方便后期同步数据表  
    > 同步数据表使用命令  

    ```javascript
    node tools/cli/sync_datatables.js "D:/TFSProjects_public/Project/Client/H5JsonData"
    ```  
    其中`D:/TFSProjects_public/Project/Client/H5JsonData` 指定了Unity导出的数据表目录

 * **升级引擎版本流程**  
 1. 先确保提交 `H5\Client` 目录的引擎的修改到 `Project\Tools\H5ClientEngineGit` 下的Git.
 2. 打开 `Project\Tools\EngineUpdate` 目录的工程,按LayaBox的引擎升级流程升级到要升级的版本. 这样 `Project\Tools\EngineUpdate\bin\libs` 目录下的引擎文件会被更新,提交Git版本.  
 3. 打开 `Project\Tools\H5ClientEngineGit` 目录的工程, 合并 `Project\Tools\EngineUpdate` 的Git分支,处理合并冲突(咱们自己修改过某些引擎的Bug),这样大部分升级工作就可以自动搞定了.  
 4. 提交更新后的引擎到TFS

## 注意事项 ##
------

* **调用方法时如果有可选参数不想赋值的话，需要把参数写成`undefined`而不是`null`**  
方法定义 
public Load(url: any, progress?: laya.utils.Handler, type?: string, priority?: number);
方法调用
this.Load("img.atlas", `undefined`, `undefined`, `undefined`);

* **`index.html`里面`script(<script src="js/Global/Log.js"></script>)`的引入是有顺序的**  
如果发现编译时在方法调用时出错，除了考虑空对象还可以考虑下`script`的引入顺序，如果确定是引入顺序问题的话，第一种方法可以考虑修改引入顺序，还有一种方法是写完整的命名空间调用（把`Log.Info("")`改写成`Global.Log.Info("")`）

* **子类`override`父类中的`setter/getter`方法时**  
一定要两个方法`全部override`，不然会导致某些行为不正常。在某次开发的时候只`override`了`Component`的`set visible(value: boolean)`方法，其他所有逻辑都不变，就导致界面的鼠标事件不响应，后来又`override`了`get visible(): boolean`，界面才恢复正常  

* **转换`XML`格式的数据到`Json`格式**  
打开`$/ShenLongDaLu/Project/Client`的Unity工程,找到要转换的xml文件,点击右键,选择`Reimport`,会在`Client/H5JsonData`生成对应的`Json`文件  
![图1](../../程序组/02_制作流程文档/界面制作/引用图片/转换xml数据到json.jpg)  
> 注:如果需要特定格式,可以去函数 SelfXmlToBin.OnPostprocessAllAssets() 中添加转换功能  

* **数学运算,取整**  
涉及到做数学运算时,一定要搞清楚, js 全是`浮点数运算`,没有`整数`这一说,所以,如果需要整数,必须手动调用 `Math.floor()` 来取整.  
或者使用移位操作符：`有符号整数与无符号整数相互转化`  
    > unsigned = signed>>>0;
    通过使用无符号右移运算符，位动位数为0，可以将32位有符号整数，转化为32位无符号整数。
    signed = unsigned << 0;
    通过使用左移运算符，位动位数为0，可以将32位无符号整数，转化为32位有符号整数。
    注：JavaScript的所有位操作都是先将操作对象转化为32位有符号数进行的。具体的细节可以去查Ecma-262规范（JavaScript 的正式名称是 "ECMAScript"，其语法由Ecma-262规范描述）。

* **时间使用**  
涉及到时间的使用需要注意,服务器传递过来的时间都是使用C#的`DateTime.Now`来获取的,它是 0001 年 1 月 1 日午夜 12:00:00 以来所经历的毫秒或Ticks,如果需要比较时间,只能使用 TimeManager.now() 函数获取的毫秒时间来进行比较,不可以直接使用`Date.now()`函数.

* **Map**  
Map添加数据时只能使用`Map.set(key, value)`形式，而不能使用`Map[key]=value`的形式。

* **获取Table表对应VO的属性值**  
获取表字段属性值，如果字段在Json表中导出时被忽略掉了那么在代码里获取该字段值的时候，string类型通过`TableUtils.getFieldString(val)`获取，number类型通过`TableUtils.getFieldNumber(val)`获取，这样可以保证获取出来的属性字段不为null或undefined。  
例如：`let execMagic = TableUtils.getFieldString(goodVO.ExecMagic)`


``` js
namespace TimeManager{
    /**
     * 返回同C#的DateTime.Now相同的时间(毫秒)
     */
    export function now():number{
        return Date.now() + before1970;     // before1970 从 1900年1月到1970年1月的毫秒。
    }
    ...
    ...
}
```

## 待完成任务 ##

### 1. 日常工作  


### 2. 优化工作  

    - [x] 数据表行数据的转换提前到运行前,以减少运行时的性能开销  

        - 如 json2NPCInfoVO() 函数的执行  



