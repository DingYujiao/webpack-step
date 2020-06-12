webpack 学习步骤



1. 初始化项目

    ```
   npm init
   ```

2. 安装webpack

    ```
   npm install --save-dev webpack
   ```

3. 编写webpack.config.js
    
    有几个配置必须填写
    
    * mode 模式,development\production\none,这里使用none
    
    * entry 入口,暂时使用单入口模式,这里使用app.js
    
    * output 出口, 这是一个对象,分为文件路径和文件名
    
    需要引用path模块,path模块的的相关教程 [Path](https://javascript.ruanyifeng.com/nodejs/path.html)
    path的目的是需要拿到绝对路径,这是webpack的要求

    ```
    module.exports = {
        "mode": "none",
        "entry": path.resolve(__dirname , 'app.js'),
        "output": {
            path: path.resolve(__dirname , './dist'),
            filename: 'output.js'
        },
    }
    ```
4. 建文件和文件夹

    1. 编写app.js
    ```
    module.exports = function(){
        console.log('这是app.js文件')
    }
    ```
    
5. 编译

    因为是本地安装,执行以下代码,如果没有权限,在前面添加sudo
    
    ```
   node_modules/.bin/webpack
   ``` 
    
    无权限的情况
    
    ```
   sudo node_modules/.bin/webpack
   ``` 
    
    如果是全局安装,执行
    
    ```
   webpack
   ```
6. 编译结果
    
   此时可以看到dist文件夹,里面会有output.js,表示编译成功!
   
7. 添加plugin

    此时,只是编译成功,还没有把编译结束的文件添加到index.html中,我们希望能够自动添加.
    1. 编写index.html,直接初始化一个空的html文件即可
    2. 安装html-webpack-plugin插件
    ```
    npm install --save-dev html-webpack-plugin
    ```
    3. 修改webpack.config.js,添加plugin配置
    ```
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
    
    module.exports = {
    	mode: 'none',
    	entry: path.resolve(__dirname , 'app.js'),
    	output: {
    		path: path.resolve(__dirname , './dist'),
    		filename: 'output.js'
    	},
    	plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            })
    	]
    }
    ```
    4. 执行相应的编译命令 ```sudo node_modules/.bin/webpack```,可以看到dist文件夹下多了index.html文件,index.html的body上方,多了一行```<script src="output.js"></script>```,表明添加成功

8. 配置热加载

    1. 安装webpack-dev-server
    ```
    npm install --save-dev webpack-dev-server
    ```
    2. 修改webp添加webpack.config.js,添加devServer配置
    ```
    module.exports = {
        ...
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 9000
        }
    }
    ```
    3. 修改package.json
    
    添加scripts
    
    ```
    "scripts": {
        "dev": "webpack-dev-server --hot"
    },
    ```
    4. 执行 ```npm run dev```
9. 