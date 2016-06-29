'use strict';

angular.
  module('core.author').
  factory('Author', ['$resource', '$filter',
    function($resource, $filter) {
        var Author =  $resource('rest/author.php?id=:authorId', {}, {
            query: {
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });

        /*Publication.query = function(){
            return Publication._query(function(publications){
                var i = 0;

                for(i=0; i<publications.length; i++){
                    publications[i] = Publication.getPublicationForForm(publications[i]);
                    publications[i].tipo = publications[i].tipo.name;
                    publications[i].status = publications[i].status.name;
                    publications[i].alcance = publications[i].alcance.name;
                }

                return publications;
            });
        }*/

        /*Publication.getPublicationForForm = function(publication){
            
            if (publication.ano != null){
                publication.ano = parseInt(publication.ano);
            }

            if (publication.tipo != null){
                publication.tipo = $filter('filter')(this.typeOptions, {id: publication.tipo}, true);
                publication.tipo = publication.tipo[0];
            }

            if (publication.status != null){
                publication.status = $filter('filter')(this.statusOptions, {id: publication.status}, true);
                publication.status = publication.status[0];
            }

            if (publication.alcance != null){            
                publication.alcance = $filter('filter')(this.alcanceOptions, {id: publication.alcance}, true);
                publication.alcance = publication.alcance[0];
            }

            return publication;
        };


        Publication.getPublicationForSave = function(publication){
            publication.tipo = publication.tipo.id;
            publication.status = publication.status.id;
            publication.alcance = publication.alcance.id;

          return publication;
        }
*/
        return Author;
    }
  ]);
