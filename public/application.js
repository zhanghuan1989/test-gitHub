/**
 * Created by beiwp on 2016/5/7.
 */

var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngResource','ngRoute','users','example','articles']);

//������������ �Ż�
mainApplicationModule.config(['$locationProvider',
    function($locationProvider){
        $locationProvider.hashPrefix('!')
    }
]);

//facebook �����֤�� �� OAuth�ص��� ����URL��#�� ���η�
if(window.location.hash == '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
    angular.bootstrap(document,[mainApplicationModuleName])
});