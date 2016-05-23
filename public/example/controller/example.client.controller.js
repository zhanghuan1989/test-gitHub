/**
 * Created by beiwp on 2016/5/17.
 */

angular.module('example').controller('ExampleController',['$scope','Authentication',
    function($scope,Authentication){
        $scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
        $scope.authentication = Authentication
    }
]);