// 清除掉 libs/netmessage.d.ts 文件中 "export = NetMsg;" 因为不支持它.
const fs = require('fs');
const path = require('path');
var basedir = path.join(__dirname, ".");
var msgFile = path.join(basedir, "../..", "libs/netmessage.d.ts");
var data = fs.readFileSync(msgFile, 'utf8');
data = data.replace('export = NetMsg;\n', '');
fs.writeFileSync(msgFile, data);
console.log("\n==> 生成静态 proto 代码成功: " + msgFile + "\n");