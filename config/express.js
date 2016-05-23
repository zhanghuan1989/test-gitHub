/**
 * Created by beiwp on 2016/5/7.
 */
var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require("express-session");
var path = require('path');
var flash = require('connect-flash');
var passport  = require('passport');


module.exports = function () {
    var app = express();

	var admin = express();
	admin.get('/',function(req,res){
		//-------------------
	});

	//__dirname == E:\ysc_myworkspace\exercise\node\config
	app.locals.resoucePath = __dirname;

	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}
	
	app.use(bodyParser.urlencoded({
		extended:true
	}));
	
	app.use(bodyParser.json());
	app.use(methodOverride());
	
	app.use(session({
		saveUninitialized:true,
		resave:true,
		secret: config.sessionSecret
	}));

	/**
	 * 模板引擎设置  模板路径
	 */
	//console.log("----"+path.join(__dirname,'./app/views'));
	app.set('views', path.join(__dirname,'../app/views'));
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	
    require('../app/routes/index.server.routes')(app);
	require('../app/routes/users.server.routes')(app);
	require('../app/routes/interface.server.routes')(app);
	require('../app/routes/articles.server.routes')(app);

	app.use("/admin",admin);
	/**
	 * 静态资源文件
	 */
	app.use(express.static('./public'));	
	
    return app;
};