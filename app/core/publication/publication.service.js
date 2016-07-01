'use strict';

angular.
  module('core.publication').
  factory('Publication', ['$resource', '$filter',
    function($resource, $filter) {
        var Publication =  $resource('rest/publication.php?id=:publicationId', {}, {
            _query: {
                method: 'GET',
                isArray: true
            },
            update: {
                method: 'PUT'
            }
        });

        Publication.query = function(){
            return Publication._query(function(publications){
                var i = 0;
                var j;
                var qtd_autores_da_publicacao = 0;
                
                for(i=0; i<publications.length; i++){
                    publications[i] = Publication.getPublicationForForm(publications[i]);
                    publications[i].tipo = publications[i].tipo.name;
                    publications[i].status = publications[i].status.name;
                    publications[i].alcance = publications[i].alcance.name;

                    qtd_autores_da_publicacao = publications[i].autores.length;
                    
                    if (qtd_autores_da_publicacao){
                        publications[i].nomes_autores = [];

                        publications[i].autores.forEach(function(autor, indice, autores){
                            publications[i].nomes_autores.push(autor.nome_publicacao);
                        });

                        publications[i].nomes_autores = publications[i].nomes_autores.join('; ');
                    }
                    else{
                        publications[i].nomes_autores = '';
                    }
                }

                return publications;
            });
        }

        Publication.typeOptions = [
            {id: '1', name: 'Publicação em Periódico'},
            {id: '2', name: 'Publicação em Conferência Científica'},
            {id: '3', name: 'Livro completo'},
            {id: '4', name: 'Capítulo ou trecho de livro'}
        ];

        Publication.statusOptions = [
            {id: '1', name: 'Aceito'},
            {id: '2', name: 'Publicado'}
        ];

        Publication.alcanceOptions = [
            {id: '1', name: 'Nacional'},
            {id: '2', name: 'Internacional'}
        ];
        
        Publication.getPublicationForForm = function(publication){
            
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

        return Publication;
    }
  ]);
