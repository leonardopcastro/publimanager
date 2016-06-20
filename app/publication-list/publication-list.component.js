'use strict';

// Register `publication-list` component, along with its associated controller and template
angular.
  module('publicationList').
  component('publicationList', {
    templateUrl: 'publication-list/publication-list.template.html',
    controller:['Publication',
      function PublicationListController(Publication) {
        this.publications = Publication.query();
      }
    ]
    
  });
