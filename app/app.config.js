'use strict';

angular.
	module('publiManager').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
  			$locationProvider.hashPrefix('!');

  			$routeProvider.
  			when('/authors', {
          		template: '<author-list></author-list>'
        	}).
        	when('/users', {
          		template: '<user-list></user-list>'
        	}).
        	otherwise({template: '<publication-list></publication-list>'});
		}
	]);