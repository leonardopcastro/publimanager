'use strict';

angular.
	module('publiManager').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
  			$locationProvider.hashPrefix('!');

  			$routeProvider.
          when('/publications/edit/:publicationId',{
            controller: 'publicationCtrl',
            templateUrl: '/components/publication/edit.html'
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
            controller: 'publicationCtrl',
            templateUrl: '/components/publication/index.html'
          });
		}
	]);