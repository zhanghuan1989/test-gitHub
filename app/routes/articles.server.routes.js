/**
 * Created by beiwp on 2016/5/19.
 */

var users = require('../../app/controllers/users.server.controller');
var articles = require('../../app/controllers/articles.server.controller');

module.exports = function (app) {
      // get ���������б� post��������������
      // get:/articleid ����ָ������  put:/articleid ���²���������
      // delete:/articleid ����ɾ��ָ������

      app.route('/api/articles').get(articles.list).post(users.requiresLogin,articles.create);
      app.route('/api/articles/:articleId').get(articles.read).put(users.requiresLogin,articles.hasAuthorization,
          articles.update).delete(users.requiresLogin,articles.hasAuthorization,articles.delete);

      app.param('articleId',articles.articleByID);

};