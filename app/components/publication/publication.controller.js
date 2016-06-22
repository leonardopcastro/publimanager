'use strict';

angular.
  module('publicationModule').
  controller('publicationCtrl', function($scope, Publication){
  		$scope.publications = Publication.query();

  		$scope.edit = function(){

  		}

  		$scope.save = function(){
  			
  		}

  		$scope.delete = function(){
  			
  		}
  });
