@echo off
:: 创建资源目录的链接,因为在Unity中直接导出资源到"res"目录很麻烦

set b=%cd%/../../../../Project/Tools/LayaExportedAssets/Actors
mklink /J Actors "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/Assets
mklink /J Assets "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/terrain
mklink /J terrain "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/Equips
mklink /J Equips "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/Decorations
mklink /J Decorations "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/LogicData
mklink /J LogicData "%b%"
set b=%cd%/../../../../Project/Tools/LayaExportedAssets/Library
mklink /J Library "%b%"

pause