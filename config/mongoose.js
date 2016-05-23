/**
 * Created by beiwp on 2016/5/10.
 */

/**
 * ����mongoose
 * @type {*|exports|module.exports}
 */
var config = require("./config");
var mongoose = require("mongoose");

module.exports = function () {
    var db = mongoose.connect(config.db);

    var db_connection = db.connection;
    db_connection.on('error',console.error.bind(console,"connection error:"));
    db_connection.once('open', function(){
         console.log('============mongodb connect success============')
    });

    //ע��Userģ��
    require('../app/models/users.server.model');
    //ע��Articleģ��
    require('../app/models/article.server.model');

    return db;
};
