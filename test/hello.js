/**
 * Created by beiwp on 2016/5/4.
 */
/*
* Commonjs require  exports  module
*
* exports 提供某一段代码的访问
* require 加载某一模块
* module  module.exports包含exports对象指针
* */

var fs = require('fs');
var path = require('path');
var underscore = require('underscore');
var message = "Hellow bwp";
/**
 * 返回一个对象 通过对象属性访问方法
 * var hellow = require("./hello");
 * hellow.sayHellow();
 */
/*exports.sayHellow = function(){
    console.log(message);
};*/

/**
 * 返回一个函数引用
 * var hellow = require("./hello");
 * hellow();
 */

module.exports = function(){
    //console.log(message);
};


var localPath = __dirname;
//同步读取返回当前目录的所有文件集合
var flist = fs.readdirSync(localPath);
console.log(flist);
flist.forEach(function (file) {
    var newpath = path.join(localPath,file);
    console.log(newpath);
    var stat = fs.statSync(newpath);
    console.log(stat.isFile());
});




