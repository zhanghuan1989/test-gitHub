/**
 * Created by beiwp on 2016/5/10.
 */


var User = require('mongoose').model("User");
var passport = require('passport');

var getErrorMessage = function(err){
    var message = '';

    if(err.code){
        switch (err.code){
            case 11000:
            case 11001:
                message = 'Username is already exists';
                break;
            default:
                message = 'Something went wrong'
        }
    }else{
        for(var errName in err.errors){
            if(err.errors[errName].message) message = err.errors[errName];
        }
    }

    return message;
};


exports.requiresLogin = function(req,res,next){
  //是否通过passport的身份校验 req.isAuthenticated
  if(!req.isAuthenticated()){
      return res.status(401).send({
          message:'User is not logged in'
      });
  }

  next();
};


exports.renderSignin = function (req,res,next) {
    if(!req.user){
        res.render('signin',{
            title:'Sign-in Form',
            message:req.flash('error') || req.flash('info')
        });
    }else{
        return res.redirect('/');
    }
};

exports.renderSignup = function(req,res,next){
    req.logOut();//清session
    res.render('signup',{
       title:'Sign-up Form',
       message:req.flash('error')
    });

};


exports.signup = function(req,res,next){
    if(!req.user){
        console.log(req.body);
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

        user.save(function(err){
            if(err){
                var message = getErrorMessage(err);
                req.flash('error',message);
                return res.redirect('/signup');
            }

            req.login(user,function(err){
                if(err)return next(err);
                return res.redirect('/');
            });
        });
    }else{
        return res.redirect('/');
    }
};

exports.sigout = function(req,res){
    req.logOut();
    res.redirect('/signin');
};


/**
 * 增
 * @param req
 * @param res
 * @param next
 */
exports.create = function (req,res,next) {
    console.log('==========USER===COUNTROLLER====CREATE===============');
    console.log("user create======"+JSON.stringify(req.body)+"====");

    var user = new User(req.body);
    user.save(function(err){
        if(err){
            return res.json({message:'SAVE ERROR'});
        }else{

            res.json({message:"SAVE OK"});
        }
    });
};

/**
 * 查
 * @param req
 * @param res
 * @param next
 */
exports.list = function (req,res,next) {
    console.log('==========USER===COUNTROLLER====LIST===============');
    User.find({}, function (err,users) {
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    })
};


/**
 * 查看
 * @param req
 * @param res
 * @param next
 */
exports.listOne = function (req,res,next) {
    console.log('==========USER===COUNTROLLER====LISTONE==============='+req.param("id"));
    User.findOne({
        _id:req.param("id")
    }, function (err,users) {
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    })
};

/**
 * 更新
 * @param req
 * @param res
 * @param next
 */
exports.update = function (req,res,next) {
    console.log('==========USER===COUNTROLLER====UPDATE==============='+req.param('id')+"=="+req.body);
    User.findByIdAndUpdate(req.param('id'),req.body,function (err,users) {
        if(err){
            return next(err);
        }else{
            res.json({message:"UPDATE OK"});
        }
    });
};


/**
 * 删除
 * @param req
 * @param res
 * @param next
 */
exports.delete = function (req,res,next) {
    console.log('==========USER===COUNTROLLER====UPDATE==============='+req.param('id')+"=="+req.body);
    User.findByIdAndRemove(req.param('id'),function (err,users) {
        if(err){
            return next(err);
        }else{
            res.json({message:"DELETE OK"});
        }
    });
};