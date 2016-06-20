'use strict';

angular.
  module('core.publication').
  factory('Publication', ['$resource',
    function($resource) {
      return $resource('publications/:publicationId.json', {}, {
        query: {
          method: 'GET',
          params: {publicationId: 'publications'},
          isArray: true
        }
      });
    }
  ]);
