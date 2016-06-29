'use strict';

var authorModule = angular.module('authorModule');
    
authorModule.controller('authorList', ['$scope', 'Author', function($scope, Author){
	$scope.authors = Author.query();
}]);

authorModule.controller('authorAdd', ['$scope', function($scope){
	
}]);