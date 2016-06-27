'use strict';

angular.module('publicationModule')
.controller('publicationList', function($scope, $location, Publication){
	$scope.publications = Publication.query();
	
	$scope.publication_sort_property = 'titulo';
  	$scope.sort_reverse = false;

	$scope.delete = function(publication){
		
		if (!confirm('Realmente deseja apagar a publicação?')){
			return false;
		}

		publication.$delete({publicationId: publication.id}, function(){
			$scope.publications = Publication.query();
		});
	}

	$scope.sortBy = function(publication_sort_property) {
	    $scope.sort_reverse = ($scope.publication_sort_property === publication_sort_property) ? !$scope.sort_reverse : false;
	    $scope.publication_sort_property = publication_sort_property;
  	};
})
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
});


angular.module('publicationModule')
.controller('publicationEdit', function($scope, $routeParams, Publication){

	$scope.publication_types = Publication.typeOptions;
	$scope.publication_statuses = Publication.statusOptions;
	$scope.publication_reaches = Publication.alcanceOptions;

	var date_now = new Date();
	$scope.ano_max_value = date_now.getFullYear();
	
	Publication.get({publicationId: $routeParams.publicationId}, function(publication) {

		$scope.publication = Publication.getPublicationForForm(publication);
	});

	$scope.update = function(){
		$scope.publication = Publication.getPublicationForSave($scope.publication);
		
		$scope.publication.$update({publicationId: $routeParams.publicationId},function(publication){
			$scope.publication = Publication.getPublicationForForm(publication);
		});
	}
});


angular.module('publicationModule')
.controller('publicationAdd', function($scope, $location, Publication){

	$scope.publication_types = Publication.typeOptions;
	$scope.publication_statuses = Publication.statusOptions;
	$scope.publication_reaches = Publication.alcanceOptions;

	var date_now = new Date();
	$scope.ano_max_value = date_now.getFullYear();

	$scope.publication = new Publication();

	$scope.publication.ano = $scope.ano_max_value;

	$scope.create = function(){
		$scope.publication = Publication.getPublicationForSave($scope.publication);

		$scope.publication.$save(function(publication){
			$scope.publication = Publication.getPublicationForForm(publication);
			$location.path('');
		});
	}
});