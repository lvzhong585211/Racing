@echo off
:: 设置拷贝源路径和目标路径
set org=D:\Workspace\H5_Develop\H5\Client\bin
set dest=D:\Client_H5

:: 设置拷贝时排除的目录
set ex1=%org%\res\Actors
set ex2=%org%\res\Assets
set ex3=%org%\res\Decorations
set ex4=%org%\res\Equips
set ex5=%org%\res\Library
set ex6=%org%\res\LogicData
set ex7=%org%\res\terrain

:: 执行拷贝
robocopy %org% %dest% /MIR /XF H5_CopyClient_Bin2Client.bat /XD %ex1% %ex2% %ex3% %ex4% %ex5% %ex6% %ex7%

pause