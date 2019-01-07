// 从Unity项目中同步数据表. 注：当添加了新的数据时，需要同步修改此文件
// 注: 如果对js语法不熟悉,可以在 http://www.typescriptlang.org/play/index.html 上写ts文件,会自动转成js文件
const fs = require('fs');
const path = require('path');

// src: 相对于H5JsonData目录的文件路径, dest: 相对于 datatables 目录的文件路径
const filesToSync = [
    {
        src: "GameRes/Config/npcs.json",
        dest:"npcs.json"
    },
    {
        src: "GameRes/Config/Goods.json",
        dest:"Goods.json"
    },
    {
        src: "Level/LevelConfig.json",
        dest:"LevelConfig.json"
    },
    {
        src: "ServerRes/1/IsolateRes/Config/Language.json",
        dest:"Language.json"
    },
    {
        src: "ServerRes/1/IsolateRes/Config/SystemTasks.json",
        dest:"SystemTasks.json"
    },    
    
    // TODO: 继续添加其它需要同步的文件
];

const baseSrcDir = process.argv[2];
if(!baseSrcDir){
    console.error("没有指定源目录")
    return ;
}

if(!fs.existsSync(baseSrcDir)){
    console.error(`指定的源目录 (${baseSrcDir}) 不存在`);
    return ;
}

var basedir = path.join(__dirname, ".");
const baseDestdir = path.join(basedir, "../../bin/res/datatables");
filesToSync.forEach(file => {
    const srcPath = path.join(baseSrcDir, file.src);
    const destPath = path.join(baseDestdir, file.dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`正在复制文件 ${srcPath} 到 ${destPath}`);
})

console.log("同步数据表完成!")