/**
 * Created by beiwp on 2016/5/4.
 */
/*
* Commonjs require  exports  module
*
* exports �ṩĳһ�δ���ķ���
* require ����ĳһģ��
* module  module.exports����exports����ָ��
* */

var fs = require('fs');
var path = require('path');
var underscore = require('underscore');
var message = "Hellow bwp";
/**
 * ����һ������ ͨ���������Է��ʷ���
 * var hellow = require("./hello");
 * hellow.sayHellow();
 */
/*exports.sayHellow = function(){
    console.log(message);
};*/

/**
 * ����һ����������
 * var hellow = require("./hello");
 * hellow();
 */

module.exports = function(){
    //console.log(message);
};


var localPath = __dirname;
//ͬ����ȡ���ص�ǰĿ¼�������ļ�����
var flist = fs.readdirSync(localPath);
console.log(flist);
flist.forEach(function (file) {
    var newpath = path.join(localPath,file);
    console.log(newpath);
    var stat = fs.statSync(newpath);
    console.log(stat.isFile());
});




