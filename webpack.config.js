const path = require("path");//nodejs path模块
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, './src'),//context 指定对应的文件夹开始
    entry: {
      app: './app.js',//演示单入口文件
    },
    output: {
      path: path.resolve(__dirname, './dist'),//打包输出的路径，__dirname 当前路径
      filename: '[name].bundle.js',//打包后的名字[name]对应键值对
      // publicPath: './dist/'//本地
      publicPath: '/dist/'//服务器
    },
    module:{
      rules:[
        {
          test:/\.scss$/,//处理sass
          //正则选择匹配文件
          use:[
            //使用需要的loader，以数组形式加入，单独需要配置的loader以对象形式配置
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
          // use: ExtractTextPlugin.extract({
          //   fallback: "style-loader",
          //   use: ["css-loader","sass-loader"]
          // })

        },
        // {
        //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,//打包文件和图片，file-loader的封装升级版
        //   use:[
        //     {
        //       loader:'url-loader',
        //       options:'limit=8192'
        //       //webpack loader的配置方式，作为一种类似字符串的形式被追加到每一个loader的命名后面，
        //       //类似于url中的查询字符串，但在实际应用中有更多功能。
        //       //相当于loader:'url-loader?limit=8192'
        //     }
        //   ]
        // },
        {
          test:/\.js$/,//使用es6
          exclude: /node_modules/,//排除node模块编译
          use:[
            {
                loader:'babel-loader',
                options: {
                  plugins: [
                    "transform-runtime"
                  ],
                  presets: [
                    "es2015",
                    "stage-3"
                  ]//简写.babelrc配置
                }
            }
          ]
        },
      ]
    },
    devServer: {
      // contentBase: path.join(__dirname, "/dist"),
      // compress: true,//Gzip
      port: 8082,
      host:"0.0.0.0"
    },
    plugins: [
      // new OpenBrowserPlugin({ url: 'http://10.146.67.200:8082' })
      new OpenBrowserPlugin({ url: 'http://localhost:8082' })
      //端口号自定义
    ]
};
