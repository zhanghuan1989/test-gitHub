/**
 * Created by beiwp on 2016/5/17.
 */

angular.module('example').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/',{
                templateUrl:'example/views/example.client.view.html'
            }).
            otherwise({
                redirectTo:'/'
            });
    }
])