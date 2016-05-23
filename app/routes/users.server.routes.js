/**
 * Created by beiwp on 2016/5/10.
 */

var users = require('../../app/controllers/users.server.controller');
var passport =  require('passport');

module.exports = function (app) {
    console.log("===========USER==ROUTE===================");

    app.route('/signup').get(users.renderSignup).post(users.signup);
    app.route('/signin').get(users.renderSignin).post(passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/signin',
        failureFlash:true
    }));

    app.get('/signout',users.sigout);

    app.route('/users').post(users.create);
    app.route('/usersList').post(users.list);
    app.route('/usersListOne/:id').post(users.listOne);
    app.route('/update/:id').post(users.update);
    app.route('/del/:id').post(users.delete);
};