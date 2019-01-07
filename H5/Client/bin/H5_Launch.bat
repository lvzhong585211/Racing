@echo off
:: 设置Chrome路径
set chrome=C:\Users\changyouzhi\AppData\Local\Google\Chrome\Application\chrome.exe

:: 设置index.html路径
set index=D:\Loong\H5\Client\bin

:: 运行Chrome
start %chrome% --allow-file-access-from-files --disable-web-security --user-data-dir="%index%\chrome" %index%\index.html