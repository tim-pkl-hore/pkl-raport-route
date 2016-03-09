angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/sekolah-list', {
		templateUrl : 'views/partials/sekolah/listSekolah.html',
		controller : 'listSekolahCtrl'
	}).when('/sekolah-detail/:id', {
		templateUrl : 'views/partials/sekolah/detailSekolah.html',
		controller : 'detailSekolahCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/sekolah-edit/:id', {
		templateUrl : 'views/partials/sekolah/editSekolah.html',
		controller : 'editSekolahCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/sekolah-form', {
		templateUrl : 'views/partials/sekolah/formSekolah.html',
		controller : 'addSekolahCtrl'
	});
});

angular.module('raportApp').controller(
		'addSekolahCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.kecamatan = [];
			var request = {
				url : '/kecamatan/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.kecamatan = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/all',
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
					url : '/sekolah',
					method : 'POST',
					data : $scope.sekolah
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/sekolah-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller('listSekolahCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/sekolah',
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

angular.module('raportApp').controller('detailSekolahCtrl', function($scope, $http, $log, id) {
	$scope.sekolah = [];
	var request = {
		url : '/sekolah/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.sekolah = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});
