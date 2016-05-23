/**
 * Created by beiwp on 2016/5/4.
 */
/**
 * 简单demo
 * 加载模块  返回调用实体 可以加载 任意文件夹下的第三方模块
 * 根据路径去加载即可
 * 返回的是一个函数的引用则 调用B
 * 返回的是一个对象 调用A
 * @type {*|exports|module.exports}
 */

/*====================================================================*/

var hellow = require('./test/hello');
//hellow.sayHellow();//exports A
hellow();// module exports   B

/*====================================================================*/

/**
 * 创建 Nodejs Web服务
 * 1 设置请求头 res.writeHead
 *   输出 文本 'Content-Type':'text/plain'
 *   输出 html 'Content-Type':'html/plain'
 *   不设置 好像也可以
 *
 * 2 响应主体   html/plain 会以文件下载下来
 *   res.write('xxxx');
 *   res.end(['xxxx']);
 */
var http = require('http');
http.createServer(function(req,res){
    /*res.writeHead(200,{
        'Content-Type':'text/plain'
    });*/
    res.write('Hellow bwp');
    res.end();
}).listen(2000);

console.log('Server running at http://localhost:2000/');

/*====================================================================*/

/**
 * Connect应用
 * Connect模块 使用名为中间件的模块化组件  npm install connect --save
 * 常用的中间件 日志工具 静态文件
 * next() 调用下一个处理程序 直到摸一个中间件用了 res.end() 方法完成响应
 *
 * connect中间件的三个参数
 *    req
 *    res
 *    next
 *
 * connect.use('xxx')使用某一个中间件
 * connetc.use('/xxx','xx') 加载某一个中间件
 *
 * connect可以有很多的中间件  每一个中间件都可以决定是否立即结束执行
 * 用next()链接起来  中间件函数先进先出原则
 *
 * 在logger中 把 next() 删除 执行到logger 便会停止下来 一直出于挂起状态
 *
 *
 */
var connect = require('connect');
var app_temp1 = connect();

var logger  = function(req,res,next){
    console.log(req.method+'-----------'+req.url);
    next();
};

var helloWorld = function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.end('Hollw Connect');
};

var sayGoodBye = function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.end('Good By Connect');
};

app_temp1.use(logger);
//app.use(helloWorld);
app_temp1.use('/hellow',helloWorld);
app_temp1.use('/goodbye',sayGoodBye);

app_temp1.listen(2100);

console.log('CONNECT Server running at http://localhost:2100/');

/*=========================EXPRESS===========================================*/

/**
 * express应用  ---基于 connect
 * 1 对 connect的 Content-Type做了封装
 *   如果发送到缓冲区  application/octet-stream
 *   如果是文字       text/html
 *   如果是对象       application/json
 *
 * 2 res.send()发回所有响应
 *
 * 3 应用对象
 *   1 app.set('xx','yy');   设置 express环境变量
 *   2 app.get('xx');        获取 某个变量
 *   3 app.use('/',callback) 用于创建处理HTTP请求的中间件
 *   4 app.GET|POST('/',callback)
 *   5 app.route(path).GET|POST(callback)
 *   6 app.param([name],callback) 对所有包含name参数的请求设定逻辑
 *
 * 4 请求对象
 *   req.query  返回GET参数对象 req.query['name'] 获取name参数值
 *   req.params 路由参数对象
 *   req.body   要与bodyParser()中间件使用
 *   req.param(name) 获取参数值 GET参数 路由参数 请求body部分 json值 已过期
 *   req.path  req.ip  req.host
 *
 *
 * @type {*|exports|module.exports}
 */

var express_temp = require('express');
var app_temp1 = express_temp();

/**
 *  处理路由请求
 *  app.route(path).[POST|GET]function(req,res){}
 *
 */

// 1
app_temp1.get('/',function(req,res){
    res.send('This is a GET  request');
});

app_temp1.post('/',function(req,res){
    res.send('This is a POST request');
});

// 2
app_temp1.route('/').get(function(req,res){
    res.send('This is a GET  request');
}).post(function(req,res){
    res.send('This is a POST  request');
});

var hasName = function (req,res,next) {
    if(req.param('name')){
        next();
    }else{
        res.send('What is your Name----------')
    }
};

var sayHellow = function (req,res,next) {
    res.send('Hellow    '+req.param('name'))
}

app_temp1.use('/',function(req,res){
   res.send('Hellow  Express');

});

app_temp1.get('/get',hasName, sayHellow);

app_temp1.listen(2200);
module.exports = app_temp1;
console.log('EXPRESS Server running at http://localhost:2200/');



/*==============================MENA======================================*/
process.env.NODE_ENV  = process.env.NODE_ENV || 'development';
console.log('=============MENA======='+process.env.NODE_ENV+'=============');


/**
 * 要先启动本地的 MongoDB 服务 不然 mongoose链接不上的
 * @type {*|exports|module.exports}
 */
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var Passport = require('./config/passport');

//初始化 mongoose (Schema hasn't been registered for model "user")
var db = mongoose();
var app = express();
var passport = Passport();


app.listen(2300);
module.exports = app;

console.log('MENA Server running at http://localhost:2300/');

