'use strict';

var publicationModule = angular.module('publicationModule');

publicationModule.controller('publicationList', function($scope, $location, Publication, AlertMessage){

	$scope.publications = Publication.query();
	
	$scope.publication_sort_property = 'titulo';
  	$scope.sort_reverse = false;

	$scope.msg_alerta = AlertMessage.getMessage();

	$scope.delete = function(publication){
		
		if (!confirm('Realmente deseja apagar a publicação?')){
			return false;
		}

		publication.$delete({publicationId: publication.id}, function(){
			$scope.publications = Publication.query();
			$scope.msg_alerta = 'Publicação excluída com sucesso!';
		});
	}

	$scope.export = function(){
		alert('Em desenvolvimento!');
	}

	$scope.sortBy = function(publication_sort_property) {
	    $scope.sort_reverse = ($scope.publication_sort_property === publication_sort_property) ? !$scope.sort_reverse : false;
	    $scope.publication_sort_property = publication_sort_property;
  	};
});



publicationModule.controller('publicationEdit', function($scope, $routeParams, Publication, Author){

	$scope.publication_types = Publication.typeOptions;
	$scope.publication_statuses = Publication.statusOptions;
	$scope.publication_reaches = Publication.alcanceOptions;

	var date_now = new Date();
	$scope.ano_max_value = date_now.getFullYear();
	
	Author.query(function(authors){
		$scope.autores = authors;
	});

	Publication.get({publicationId: $routeParams.publicationId}, function(publication) {
		$scope.publication = Publication.getPublicationForForm(publication);
	});

	$scope.update = function(){
		var publication_for_save = Publication.getPublicationForSave($scope.publication);
		
		publication_for_save.$update({publicationId: $routeParams.publicationId},function(publication){
			$scope.publication = Publication.getPublicationForForm(publication);
			$scope.msg_alerta = 'Publicação salva com sucesso!';
		});
	}
});


publicationModule.controller('publicationAdd', function($scope, $location, Publication, AlertMessage, Author){

	Author.query(function(authors){
		$scope.autores_publicacao = authors;
	});

	$scope.publication_types = Publication.typeOptions;
	$scope.publication_statuses = Publication.statusOptions;
	$scope.publication_reaches = Publication.alcanceOptions;
	
	var date_now = new Date();
	$scope.ano_max_value = date_now.getFullYear();

	$scope.publication = new Publication();

	$scope.publication.ano = $scope.ano_max_value;
			
	Author.query(function(authors){
		$scope.autores = authors;
	});

	$scope.create = function(){

		$scope.publication = Publication.getPublicationForSave($scope.publication);

		$scope.publication.$save(function(publication){
			AlertMessage.setMessage('Publicação salva com sucesso!');
			$location.path('');
		});
	}
});




publicationModule
.filter('arrayFilter', function($filter) {
  	return function(array_to_filter, filter_value, property_to_filter) {

  		if (filter_value == undefined || filter_value == ''){
  			return array_to_filter;
  		}
		
		var array_filtered = [];
		
		array_to_filter.forEach(function(array_element, array_index){
			
			if ($filter('filter')(array_element[property_to_filter], filter_value).length > 0){
				array_filtered.push(array_element);
			}
		});

		return array_filtered;
  	};
});



publicationModule
.directive('publicationRecomendation', function() {
	return {
		templateUrl: '/components/publication/recomendations.html'
	};
})
.directive('publicationOrderIcon', function(){

	function link(scope, element, attrs){
		scope.$watchGroup(['publication_sort_property', 'sort_reverse'], function(){
			if (attrs.columnName == scope.publication_sort_property){
				if (scope.sort_reverse){
					element.html('<span class="glyphicon glyphicon glyphicon-chevron-up"></span>');
				}
				else{
					element.html('<span class="glyphicon glyphicon glyphicon-chevron-down"></span>');	
				}
			}
			else{
				element.text('');
			}
		});
	}

	return {
		link: link
	};
})