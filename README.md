官方地址：https://github.com/bodymovin/bodymovin-extension
官方文档：https://ae-scripting.docsforadobe.dev/index.html


1.按照ae debugging扩展的步骤
2.下载https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_9.x，这里选择的是cep9	
3.安装扩展依赖：npm i
4.安装服务端依赖：cd bundle/server && npm i
5.全局安装gulp ‘  npm install --global gulp-cli’
6.修改项目中的 gulpfile.js， 将 var extensionDestination = './././tropi/AppData/Roaming/Adobe/CEP/extensions/bodymovin"；指向你的本地目录
 /Library/Application Support/Adobe/CEP/extensions/com.bodymovin.body 这个是我的构建目录）
7.在项目根目录下执行 npm run build（如果此时你在bundle 下需要调整目录）
8.在根目录下 运行 npm run start-dev
9.将你的构建产物（./build/）复制到 CEP的拓展目录下、/Library/Application Support/Adobe/CEP/extensions,（之前安装过对应拓展，请将其移除移除）
10. 打开 CEF client 并打开 http://localhost:8092


开发环境为http://localhost:3000/，需要从8092切换过来

如果m1-m3出现问题，在vscode里重新用rosetta配置，然后重新安装extendscript debugger插件
