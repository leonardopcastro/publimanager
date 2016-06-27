'use strict';

angular.
	module('publiManager').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
  			$locationProvider.hashPrefix('!');

  			$routeProvider.
          when('/publications/edit/:publicationId',{
            controller: 'publicationEdit',
            templateUrl: '/components/publication/edit.html',
            method: 'edit'
          }).
          when('/publications/add',{
            controller: 'publicationAdd',
            templateUrl: '/components/publication/add.html',
            method: 'edit'
          }).
          when('/authors', {
              controller: 'authorCtrl',
          		templateUrl: '/components/author/index.html'
        	}).
        	when('/users', {
              controller: 'userCtrl',
          		templateUrl: '/components/user/index.html'
        	}).
        	otherwise({
            controller: 'publicationList',
            templateUrl: '/components/publication/index.html'
          });
		}
	]);