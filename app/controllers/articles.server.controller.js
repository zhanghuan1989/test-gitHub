/**
 * Created by beiwp on 2016/5/19.
 */

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var getErrorMessage = function(err){
  if(err.errors){
      for(var errName in err.errors){
        if(err.errors[errName].message) return err.errors[errName].message;
      }
  }else{
      return 'Unknown server error';
  }
};

exports.create = function(req,res,next){
    var article = new Article(req.body);
    article.creator = req.user;

    article.save(function(err){
        if(err){
            return res.status(400).send({
               message: getErrorMessage(err)
            });
        }else{
            res.json(article);
        }
    })
};

exports.delete = function(req,res,next){
    var article = req.article;

    article.remove(function(err){
        if(err){
            return res.status(400).send({
                message:getErrorMessage(err)
            });
        }else{
            res.json(article);
        }
    });

};

exports.update = function(req,res,next){
    var article = req.article;

    article.title = req.body.title;
    artice.content = req.body.content;

    artile.save(function(err){
       if(err){
           return res.status(400).send({
              message: getErrorMessage(err)
           });
       }else{
           res.json(article);
       }
    });
};



exports.list = function(req,res,next){
    Article.find().sort('-created').populate('creator','firstName lastName fullName').exec(function(err,articles){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(articles);
        }
    });
};

exports.articleByID = function(req,res,next,id){
    Article.findById(id).populate('creator','firstName lastName fullName').exec(function(err,article){
        if(err) return next(err);
        if(!article) return next(new Error('Failed to load article '+ id));
        req.article = article;
        next();
    });
};

exports.read = function(req,res){
  res.json(req.article);
};

/**
 * 授权中间件  判断当前操作用户是否文章作者
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.hasAuthorization = function(req,res,next){
    if(req.article.creator.id !== req.user.id){
        return res.status(403).send({
           message: 'User is not authorized'
        });
    }

    next();
};