/**
 * Created by beiwp on 2016/5/7.
 */

var index = require("../controllers/index.server.controller");

module.exports = function(app){
    console.log("===========INDEX==ROUTE===================");
    var logger = function(req,res,next){
        next();
    };

    var hasName = function (req,res,next) {
        //get«Î«Û
        if(req.query["name"]){
            next();
        }else{
            res.send("What is your Name----------")
        }
    };

    var sayHellow = function (req,res,next) {
        res.send("Hellow    "+req.param("name"));

    };
    app.get("/",index.checkUser);
    app.get("/",logger,index.render);
    //app.get("/json",logger,index.jsontest);

};