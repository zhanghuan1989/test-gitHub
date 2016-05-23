/**
 * Created by beiwp on 2016/5/19.
 */

angular.module('users').factory('Authentication',[
    function(){
        this.user = window.user;
        return {
            user: this.user
        }
    }
]);