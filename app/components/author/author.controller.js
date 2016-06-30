'use strict';

var authorModule = angular.module('authorModule');
    

authorModule.controller('authorList', ['$scope', 'Author', 'AlertMessage', function($scope, Author, AlertMessage){
	
	$scope.msg_alerta = AlertMessage.getMessage();

	$scope.authors = Author.query();

	$scope.delete = function(author){
		
		if (!confirm('Realmente deseja apagar o autor '+author.nome+' '+author.sobrenome+'?')){
			return false;
		}

		author.$delete({authorId: author.id}, function(){
			$scope.msg_alerta = 'Autor excluído com sucesso!';
			$scope.authors = Author.query();
		});
	}
}]);


authorModule.controller('authorAdd', ['$scope', '$location', 'Author', 'AlertMessage', function($scope, $location, Author, AlertMessage){
	
	$scope.author = new Author();

	$scope.create = function(){

		$scope.author.$save(function(){
			AlertMessage.setMessage('Autor salvo com sucesso!');
			$location.path('/authors');
		});
	}
}]);


authorModule.controller('authorEdit', ['$scope', '$routeParams', '$location', 'Author', 'AlertMessage', function($scope, $routeParams, $location, Author, AlertMessage){
	
	$scope.author = Author.get({authorId: $routeParams.authorId});

	$scope.update = function(){
		$scope.author.$update({authorId: $routeParams.authorId}, function(){
			AlertMessage.setMessage('Autor salvo com sucesso!');
			$location.path('/authors');
		});
	}
}]);