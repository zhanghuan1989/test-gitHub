/**
 * Created by beiwp on 2016/5/10.
 */
var inter = require('../../app/controllers/interface.server.controller');
module.exports = function (app) {
    app.route('/callInterface').post(inter.callInterface);
};