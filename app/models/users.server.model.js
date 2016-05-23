/**
 * Created by beiwp on 2016/5/10.
 */

/**
 * 创建 User模型
 * @type {*|exports|module.exports}
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//schema 模式模型
var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        match: [ /.+\@.+\..+/,'please fill a valid e-mail address']
    },
    userName : {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password : {
        type : String,
        validate : [
            function(password){
                return password && password.length > 6;
            },'Password should be longer'
        ]
    },
    salt:{
        type : String
    },
    provider:{
      type : String,
      required : 'provider is required'
    },
    providerData:{},
    created:{
        type:Date,
        defaulte:Date.now()
    }
});


/**
 * 虚拟属性
 */
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[0] || '';
});

/**
 * 预存储
 */

UserSchema.pre('save',function(next){
   if(this.password){
       this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
       this.password = this.hashPassword(this.password);
   }

    next();
});

/**
 * 方法
 * @type {{hashPassword: Function, authenticate: Function}}
 */

UserSchema.methods = {
    hashPassword : function(password){
        var password_temp = new Buffer(password, 'binary');
        //console.log(password_temp);
        //binding.PBKDF2(password, salt, iterations, keylen, digest, callback)  TypeError: Not a buffer
        //http://stackoverflow.com/questions/30377119/nodejs-pbkdf2sync-not-a-buffer-error
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    },
    authenticate : function(password){
        return this.password === this.hashPassword(password);
    }
};

UserSchema.statics.findUniqueUserName = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        userName : possibleUsername
    },function(err,user){
        if(err){
            callback(possibleUsername);
        }else{
            if(!user){
                callback(user);
            }else{
                return _this.findUniqueUserName(username, (suffix || '') + 1, callback);
            }
        }
    });
};

UserSchema.set('toJSON',{
    getter: true,
    virtuals: true
});



mongoose.model("User",UserSchema);