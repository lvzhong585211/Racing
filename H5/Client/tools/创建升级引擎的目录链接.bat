@echo off
:: 创建引擎升级的目录的链接

set b=%cd%/../../../Project/Tools/H5ClientEngineGit/.git
mklink /J "../.git" "%b%"
set b=%cd%/../../../Project/Tools/H5ClientEngineGit/.gitignore
mklink "../.gitignore" "%b%"

pause