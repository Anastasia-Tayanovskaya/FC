'use strict';

// Declare app level module which depends on views, and components
angular.module('angularWorkshop', [
  'ngRoute',
  'angularWorkshop.version',
  'angularWorkshop.articleList',
  'angularWorkshop.article-form-creation',
  'ngFileUpload',
  'angularWorkshop.pagination'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.
        when('/articles', {
          template: '<article-list></article-list>'
        })
        .when('/article/add', {
          template: '<article-form></article-form>'
        })
        .when('/article/:articleId/edit', {
          template: '<article-form></article-form>'
        })
}]);
