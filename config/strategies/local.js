/**
 * Created by beiwp on 2016/5/16.
 */

/**
 * 本地检验策略
 * @type {Passport|exports|module.exports}
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function(){
    console.log('=======passport local======');
    passport.use(new LocalStrategy({usernameField:'userName',passwordField:'password'},function(username,password,done){
        //console.log('======='+username+'======'+password);
        User.findOne({
            userName:username
        },function(err,user){
            if(err){
                return done(err);
            }

            if(!user){
                return done(null,false,{
                    message:'Unknow User'
                });
            }
            if(!user.authenticate(password)){
                return done(null,false,{
                    message:'Invalid Password'
                });
            }
            /*if(password !== user.password){
                return done(null,false,{
                    message:'Invalid Password'
                });
            }*/


            return done(null,user);
        });
    }))
};

