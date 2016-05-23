/**
 * Created by beiwp on 2016/5/19.
 */

var users = require('../../app/controllers/users.server.controller');
var articles = require('../../app/controllers/articles.server.controller');

module.exports = function (app) {
      // get 返回文章列表 post创建返回新文章
      // get:/articleid 返回指定文章  put:/articleid 更新并返回文章
      // delete:/articleid 用于删除指定文章

      app.route('/api/articles').get(articles.list).post(users.requiresLogin,articles.create);
      app.route('/api/articles/:articleId').get(articles.read).put(users.requiresLogin,articles.hasAuthorization,
          articles.update).delete(users.requiresLogin,articles.hasAuthorization,articles.delete);

      app.param('articleId',articles.articleByID);

};