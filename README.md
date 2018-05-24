# webpack
webpack use Instructions


安装:<br/><br/>
1.安装node.js在C盘<br/><br/>
2.npm install webpack -g<br/><br/>
3.npm init一路回车<br/><br/>
4. npm i -S -D webpack//安装依赖项<br/><br/>
5.根目录下新建以下文件<br/><br/>
app<br/><br/>
  main.js<br/><br/>
  work.js<br/><br/>
public<br/><br/>
  index.html<br/><br/>
  
  
6.main.js<br/><br/>
require("./work.js");<br/><br/>
work.js<br/><br/>
document.write("这是一个webpack demo");<br/><br/>
index.html<br/><br/>
<script src="./webpack.js"></script><br/><br/>
7. webpack 入口文件  生成文件<br/><br/>
webpack app/main.js public/webpack.js//这里的路径是针对根目录计算的<br/><br/>

8.根目录下新建webpack.config.js<br/><br/>

9.webpack.config.js<br/><br/>
module.exports={<br/><br/>
    //__dirname  node提供的全局变量，指向项目根目录<br/><br/>
    entry:__dirname+'/app/main.js',//入口文件<br/><br/>
    output:{<br/><br/>
        path:__dirname+'/public',//打包后的文件位置<br/><br/>
        filename:'webpack.js'//打包后文件的名字<br/><br/>
    }<br/><br/>

}<br/><br/>

10.执行webpack即可打包<br/><br/>
11.配置package.json<br/><br/>
script里添加<br/><br/>
"start":"webpack"<br/><br/>
12.npm start运行<br/><br/>
如果script里定义的名字不叫start则需要用npm run xxx的方式执行<br/><br/>


关于loaders配置:<br/><br/>
test：匹配loaders所处理的文件的拓展名的正则表达式<br/><br/>
loader:loader名称<br/><br/>
include/exclude:手动添加必须处理的文件（文件夹）或者屏蔽不需要处理的文件（文件夹）（可选项）<br/><br/>
query:为loders提供额外的设置选项（可选）<br/><br/>
某个规则使用多个loader时用!感叹号连接<br/><br/>
EG：使用json-loader  //webpack3以后默认就支持json格式不需要json-loader了<br/><br/>
1.webpack.config.js<br/><br/>
module:{<br/><br/>
    rules:[<br/><br/>
      {<br/><br/>
    test: /\.json$/,<br/><br/>
    type: 'javascript/auto',//不加这个会报错<br/><br/>
    loader: 'json-loader'<br/><br/>
},<br/><br/>
    ]<br/><br/>
}<br/><br/>

2.app下新建data.json<br/><br/>
data.json:<br/><br/>
{<br/><br/>
  "text":"this is my json"<br/><br/>
}<br/><br/>

3.work.js<br/><br/>
var config=require("./data.json");<br/><br/>
document.write(config.text);<br/><br/>

4.nam run dev<br/><br/>

配置css-loader style-loader<br/><br/>
1.npm install style-loader css-loader  --save-dev<br/><br/>
2.app下新建index.css<br/><br/>
index.css<br/><br/>
body{<br/><br/>
    background: red;<br/><br/>
}<br/><br/>
3.main.js下引入index.css  <br/><br/>
require("./index.css");<br/><br/>

4.webpack.config.js配置Loader<br/><br/>
{test: /\.css$/, loader: 'style-loader!css-loader'}<br/><br/>
5.npm run dev<br/><br/>


使用postcss-loader  autoprefixer为样式添加浏览器前缀<br/><br/>
1.npm install -S -D postcss-loader autoprefixer<br/><br/>
2.webpack.config.js<br/><br/>
{test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'}<br/><br/>
3.在package.json同级建立postcss.config.js<br/><br/>
module.exports = {<br/><br/>
    plugins: {<br/><br/>
        autoprefixer: {<br/><br/>
            browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']<br/><br/>
        }<br/><br/>
    }
};
4.index.css<br/><br/>
display:flex<br/><br/>
5.npm run dev  这时页面已经被自动添加浏览器前缀了<br/><br/>



ES6转ES5  babel-loader<br/><br/>
1. npm install -S -D babel-core babel-loader babel-preset-es2015  <br/><br/>
2.webpack.config.js配置项<br/><br/>
{
    test: /\.js$/,<br/><br/>
    loader: "babel-loader",<br/><br/>
    include: __dirname + "app"//需要被babel处理的路径<br/><br/>
},
3.work.js写ES6<br/><br/>
var sum=(a,b)=>a+b;<br/><br/>
alert(sum(2,4));<br/><br/>


插件使用：<br/><br/>
1.webpack.config.js<br/><br/>
var webpack=require("webpack");<br/><br/>
module.exports = {<br/><br/>
plugins:[<br/><br/>
    new webpack.BannerPlugin("这是自定义的banner")<br/><br/>
]
}
2.npm run dev后发现打包加上了自定义的注释信息<br/><br/>

html-webpack-plugin插件：可以根据模板生成html文件，并按照配置引入对应的文件<br/><br/>

热更新 webpack-dev-server<br/><br/>
1.安装 npm install -S -D webpack-dev-server<br/><br/>
2.参数说明<br/><br/>
contentBase  默认提供本地服务的目录<br/><br/>
port			默认监听端口号<br/><br/>
inline		设置为true,当源文件改变时会自动刷新<br/><br/>
colors		设置为true，使终端输出的文件为彩色的<br/><br/>
historyApiFallback 		如果设置为true，所有的跳转将指向index.html<br/><br/>

3.webpack.config.js<br/><br/>
module.exports = {<br/><br/>
devServer:{<br/><br/>
    contentBase:'./public',//默认提供本地服务的目录<br/><br/>
    inline:true,//自动更新<br/><br/>
    hot:true,//允许热加载<br/><br/>
    port:8080//端口号<br/><br/>
}
}

4.配置package.json里script<br/><br/>
"dev": "webpack-dev-server --inline --hot"<br/><br/>
5.npm run dev<br/><br/>
