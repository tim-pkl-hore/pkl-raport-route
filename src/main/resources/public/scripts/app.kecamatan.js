angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/kecamatan-list', {
		templateUrl : 'views/partials/kecamatan/listKecamatan.html',
		controller : 'listKecamatanCtrl'
	}).when('/kecamatan-detail/:id', {
		templateUrl : 'views/partials/kecamatan/detailKecamatan.html',
		controller : 'detailKecamatanCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/kecamatan-form', {
		templateUrl : 'views/partials/kecamatan/formKecamatan.html',
		controller : 'addKecamatanCtrl'
	}).when('/kecamatan-edit/:id', {
		templateUrl : 'views/partials/provinsi/editKecamatan.html',
		controller : 'editKecamatanCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});
});

angular.module('raportApp').controller(
		'addKecamatanCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

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

			$scope.submit = function() {
				var request = {
					url : '/kecamatan',
					method : 'POST',
					data : $scope.kecamatan
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/kecamatan-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller('listKecamatanCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/kecamatan',
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

angular.module('raportApp').controller('detailKecamatanCtrl', function($scope, $http, $log, id) {
	$scope.kecamatan = [];
	var request = {
		url : '/kecamatan/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kecamatan = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});