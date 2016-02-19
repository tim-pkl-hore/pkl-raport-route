angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/hari-libur-list',{
					templateUrl: 'views/partials/hariLibur/listHariLibur.html',
					controller: 'listHariLiburCtrl'
				}).when('/hari-libur-detail/:id', {
					templateUrl: 'views/partials/hariLibur/detailHariLibur.html',
					controller: 'detailHariLiburCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/hari-libur-edit/:id', {
					templateUrl: 'views/partials/hariLibur/editHariLibur.html',
					controller: 'editHariLiburCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/hari-libur-form', {
					templateUrl: 'views/partials/hariLibur/formHariLibur.html',
					controller: 'addHariLiburCtrl'
				});
			});

angular.module('raportApp').controller('addHariLiburCtrl', function($scope, $http, $log) {
	$scope.raport = {};
				
	$scope.submit = function() {
		var request = {
			url: '/hari-libur',
			method: 'POST',
			data: $scope.hari_libur
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listHariLiburCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/hari-libur',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.items = response.data.content;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller('detailHariLiburCtrl', function($scope, $http, $log, id) {
	$scope.hari_libur = [];
	var request = {
		url : '/hari-libur/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.hari_libur = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});