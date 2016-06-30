'use strict';

angular.
	module('publiManager').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
  			$locationProvider.hashPrefix('!');

  			$routeProvider.
          when('/publications/edit/:publicationId',{
            controller: 'publicationEdit',
            templateUrl: '/components/publication/edit.html'
          }).
          when('/publications/add',{
            controller: 'publicationAdd',
            templateUrl: '/components/publication/add.html'
          }).
          when('/authors', {
              controller: 'authorList',
          		templateUrl: '/components/author/index.html'
        	}).
          when('/authors/add', {
              controller: 'authorAdd',
              templateUrl: '/components/author/add.html'

          }).
          when('/authors/edit/:authorId', {
              controller: 'authorEdit',
              templateUrl: '/components/author/edit.html'

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