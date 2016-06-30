'use strict';

// Declare app level module which depends on views, and components
var publiManagerModule = angular.module('publiManager', [
	'ngRoute',
  	'ui.bootstrap',
  	'ngAnimate',
  	'publicationModule',
  	'authorModule',
  	'userModule'
  	]
);

publiManagerModule.directive('publicationMessage', function(){

	function link(scope, element, attrs){
		attrs.$observe(scope.watch, function(new_val){
			if (new_val != undefined){
				scope.msg = new_val;
			}
		});
	}

	return {
		scope: {
			msg: '@watch'
		},
		link: link,
		template: '<div class="alert alert-success" role="alert" ng-if="msg != \'\'">{{msg}}</div>'
	};
});
