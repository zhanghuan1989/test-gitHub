/**
 * Created by beiwp on 2016/5/19.
 */

/**
 * 创建模块服务
 */
angular.module('articles').factory('Articles',['$resource',function($resource){
    return $resource('api/articles/:articleId',{
        articleId: '@_id'
    },{
        update:{
            method: 'PUT'
        }
    });
}]);