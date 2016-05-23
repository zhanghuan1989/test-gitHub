/**
 * Created by beiwp on 2016/5/4.
 */
/**
 * ��demo
 * ����ģ��  ���ص���ʵ�� ���Լ��� �����ļ����µĵ�����ģ��
 * ����·��ȥ���ؼ���
 * ���ص���һ�������������� ����B
 * ���ص���һ������ ����A
 * @type {*|exports|module.exports}
 */

/*====================================================================*/

var hellow = require('./test/hello');
//hellow.sayHellow();//exports A
hellow();// module exports   B

/*====================================================================*/

/**
 * ���� Nodejs Web����
 * 1 ��������ͷ res.writeHead
 *   ��� �ı� 'Content-Type':'text/plain'
 *   ��� html 'Content-Type':'html/plain'
 *   ������ ����Ҳ����
 *
 * 2 ��Ӧ����   html/plain �����ļ���������
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
 * ConnectӦ��
 * Connectģ�� ʹ����Ϊ�м����ģ�黯���  npm install connect --save
 * ���õ��м�� ��־���� ��̬�ļ�
 * next() ������һ��������� ֱ����һ���м������ res.end() ���������Ӧ
 *
 * connect�м������������
 *    req
 *    res
 *    next
 *
 * connect.use('xxx')ʹ��ĳһ���м��
 * connetc.use('/xxx','xx') ����ĳһ���м��
 *
 * connect�����кܶ���м��  ÿһ���м�������Ծ����Ƿ���������ִ��
 * ��next()��������  �м�������Ƚ��ȳ�ԭ��
 *
 * ��logger�� �� next() ɾ�� ִ�е�logger ���ֹͣ���� һֱ���ڹ���״̬
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
 * expressӦ��  ---���� connect
 * 1 �� connect�� Content-Type���˷�װ
 *   ������͵�������  application/octet-stream
 *   ���������       text/html
 *   ����Ƕ���       application/json
 *
 * 2 res.send()����������Ӧ
 *
 * 3 Ӧ�ö���
 *   1 app.set('xx','yy');   ���� express��������
 *   2 app.get('xx');        ��ȡ ĳ������
 *   3 app.use('/',callback) ���ڴ�������HTTP������м��
 *   4 app.GET|POST('/',callback)
 *   5 app.route(path).GET|POST(callback)
 *   6 app.param([name],callback) �����а���name�����������趨�߼�
 *
 * 4 �������
 *   req.query  ����GET�������� req.query['name'] ��ȡname����ֵ
 *   req.params ·�ɲ�������
 *   req.body   Ҫ��bodyParser()�м��ʹ��
 *   req.param(name) ��ȡ����ֵ GET���� ·�ɲ��� ����body���� jsonֵ �ѹ���
 *   req.path  req.ip  req.host
 *
 *
 * @type {*|exports|module.exports}
 */

var express_temp = require('express');
var app_temp1 = express_temp();

/**
 *  ����·������
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
 * Ҫ���������ص� MongoDB ���� ��Ȼ mongoose���Ӳ��ϵ�
 * @type {*|exports|module.exports}
 */
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var Passport = require('./config/passport');

//��ʼ�� mongoose (Schema hasn't been registered for model "user")
var db = mongoose();
var app = express();
var passport = Passport();


app.listen(2300);
module.exports = app;

console.log('MENA Server running at http://localhost:2300/');

