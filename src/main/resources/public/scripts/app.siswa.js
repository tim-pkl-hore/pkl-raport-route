angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/siswa-list', {
		templateUrl : 'views/partials/siswa/listSiswa.html',
		controller : 'listSiswaCtrl'
	}).when('/siswa-detail/:id', {
		templateUrl : 'views/partials/siswa/detailSiswa.html',
		controller : 'detailSiswaCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/siswa-edit/:id', {
		templateUrl : 'views/partials/siswa/editSiswa.html',
		controller : 'editSiswaCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/siswa-form', {
		templateUrl : 'views/partials/siswa/formSiswa.html',
		controller : 'addSiswaCtrl'
	});

});

angular.module('raportApp').controller(
		'addSiswaCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.sekolah = [];
			var request = {
				url : '/sekolah/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.sekolah = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

			$scope.submit = function() {
				var request = {
					url : '/siswa',
					method : 'POST',
					data : $scope.siswa
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

angular.module('raportApp').controller('listSiswaCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/siswa',
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

angular.module('raportApp').controller('detailSiswaCtrl', function($scope, $http, $log, id) {
	$scope.siswa = [];
	var request = {
		url : '/siswa/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});
