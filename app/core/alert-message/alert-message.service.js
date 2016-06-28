'use strict';

angular.
  module('core.alertMessage').
  factory('AlertMessage', [
    function() {
        
        var message = '';
        

        return {
            getMessage: function(){
                return message;
            },
            setMessage: function(new_msg){
                message = new_msg;
            }
        };
    }
  ]);
