# webpack
webpack use Instructions


安装：
1.安装node.js在C盘
2.npm install webpack -g
3.npm init一路回车
4. npm i -S -D webpack//安装依赖项
5.根目录下新建以下文件


6.main.js
require("./work.js");
work.js
document.write("这是一个webpack demo");
index.html
<script src="./webpack.js"></script>
7. webpack 入口文件  生成文件
webpack app/main.js public/webpack.js//这里的路径是针对根目录计算的

8.根目录下新建webpack.config.js

9.webpack.config.js
module.exports={
    //__dirname  node提供的全局变量，指向项目根目录
    entry:__dirname+'/app/main.js',//入口文件
    output:{
        path:__dirname+'/public',//打包后的文件位置
        filename:'webpack.js'//打包后文件的名字
    }

}

10.执行webpack即可打包
11.配置package.json
script里添加
"start":"webpack"
12.npm start运行
如果script里定义的名字不叫start则需要用npm run xxx的方式执行


关于loaders配置:
test：匹配loaders所处理的文件的拓展名的正则表达式
loader:loader名称
include/exclude:手动添加必须处理的文件（文件夹）或者屏蔽不需要处理的文件（文件夹）（可选项）
query:为loders提供额外的设置选项（可选）
某个规则使用多个loader时用!感叹号连接
EG：使用json-loader  //webpack3以后默认就支持json格式不需要json-loader了
1.webpack.config.js
module:{
    rules:[
      {
    test: /\.json$/,
    type: 'javascript/auto',//不加这个会报错
    loader: 'json-loader'
},
    ]
}

2.app下新建data.json
data.json:
{
  "text":"this is my json"
}

3.work.js
var config=require("./data.json");
document.write(config.text);

4.nam run dev

配置css-loader style-loader
1.npm install style-loader css-loader  --save-dev
2.app下新建index.css
index.css
body{
    background: red;
}
3.main.js下引入index.css  
require("./index.css");

4.webpack.config.js配置Loader
{test: /\.css$/, loader: 'style-loader!css-loader'}
5.npm run dev


使用postcss-loader  autoprefixer为样式添加浏览器前缀
1.npm install -S -D postcss-loader autoprefixer
2.webpack.config.js
{test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'}
3.在package.json同级建立postcss.config.js
module.exports = {
    plugins: {
        autoprefixer: {
            browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']
        }
    }
};
4.index.css
display:flex
5.npm run dev  这时页面已经被自动添加浏览器前缀了



ES6转ES5  babel-loader
1. npm install -S -D babel-core babel-
loader babel-preset-es2015
2.webpack.config.js配置项
{
    test: /\.js$/,
    loader: "babel-loader",
    include: __dirname + "app"//需要被babel处理的路径
},
3.work.js写ES6
var sum=(a,b)=>a+b;
alert(sum(2,4));


插件使用：
1.webpack.config.js
var webpack=require("webpack");
module.exports = {
plugins:[
    new webpack.BannerPlugin("这是自定义的banner")
]
}
2.npm run dev后发现打包加上了自定义的注释信息

html-webpack-plugin插件：可以根据模板生成html文件，并按照配置引入对应的文件

热更新 webpack-dev-server
1.安装 npm install -S -D webpack-dev-server
2.参数说明
contentBase  默认提供本地服务的目录
port			默认监听端口号
inline		设置为true,当源文件改变时会自动刷新
colors		设置为true，使终端输出的文件为彩色的
historyApiFallback 		如果设置为true，所有的跳转将指向index.html

3.webpack.config.js
module.exports = {
devServer:{
    contentBase:'./public',//默认提供本地服务的目录
    inline:true,//自动更新
    hot:true,//允许热加载
    port:8080//端口号
}
}

4.配置package.json里script
"dev": "webpack-dev-server --inline --hot"
5.npm run dev
