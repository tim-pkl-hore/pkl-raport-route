(function(angular) {
  var TingkatFactory = function($resource) {
    return $resource('/tingkat/:id', {
      id: '@id'
    }, {
      update: {
        method: "PUT"
      },
      remove: {
        method: "DELETE"
      }
    });
  };
  
  ItemFactory.$inject = ['$resource'];
  angular.module("raportApp.services").factory("Tingkat", TingkatFactory);
}(angular));