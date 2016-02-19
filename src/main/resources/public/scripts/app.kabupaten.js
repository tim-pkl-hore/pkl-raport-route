angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/kabupaten-list', {
		templateUrl : 'views/partials/kabupaten/listKabupaten.html',
		controller : 'listKabupatenCtrl'
	}).when('/kabupaten-form', {
		templateUrl : 'views/partials/kabupaten/formKabupaten.html',
		controller : 'addKabupatenCtrl'
	}).when('/kabupaten-detail/:id', {
		templateUrl : 'views/partials/kabupaten/detailKabupaten.html',
		controller : 'detailKabupatenCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/kabupaten-edit/:id', {
		templateUrl : 'views/partials/kabupaten/editKabupaten.html',
		controller : 'editKabupatenCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});
});

angular.module('raportApp').controller(
		'listKabupatenCtrl',
		function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/kabupaten',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.items = response.data.content;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});

angular.module('raportApp').controller(
		'detailKabupatenCtrl',
		function($scope, $http, $log, id) {
			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/' + id,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});

angular.module('raportApp').controller(
		'addKabupatenCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.provinsi = [];
			var request = {
				url : '/provinsi/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.provinsi = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

			$scope.submit = function() {
				var request = {
					url : '/kabupaten',
					method : 'POST',
					data : $scope.kabupaten
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller('updateKabupatenCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.provinsi = [];
	var request = {
		url : '/provinsi/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n"
				+ angular.toJson(response.data, true));
		$scope.provinsi = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.update = function(id) {
		var request = {
			url: '/kabupaten/' + id,
			method: 'PUT',
			data: $scope.kabupaten
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

angular.module('raportApp').controller(
		'editKabupatenCtrl',
		function($scope, $http, $log, id) {
			$scope.kabupaten = [];
			
			var request = {
				url : '/kabupaten/' + id,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				console.dir(response.data);
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			

		});