/**
 * Created by sign on 2018/5/23.
 */
var webpack=require("webpack");
module.exports = {
    //__dirname  node提供的全局变量，指向项目根目录
    entry: __dirname + '/app/main.js',//入口文件
    output: {
        path: __dirname + '/public',//打包后的文件位置
        filename: 'webpack.js'//打包后文件的名字
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'javascript/auto',//不加这个会报错
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname + "app"//需要被处理的文件路径
            },
        ]
    },
    plugins:[
        new webpack.BannerPlugin("这是自定义的banner")
    ],
    devServer:{
        contentBase:'./public',//默认提供本地服务的目录
        inline:true,//自动更新
        hot:true,//允许热加载
        port:8080
    }

}