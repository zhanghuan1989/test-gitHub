/**
 * Created by beiwp on 2016/5/19.
 */

/**
 * 定义 Article 模型
  * @type {*|exports|module.exports}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created:{
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content:{
        type: String,
        default: '',
        trim: true
    },
    creator:{
        type: Schema.ObjectId,
        ref: 'User'
    }
});


mongoose.model('Article',ArticleSchema);