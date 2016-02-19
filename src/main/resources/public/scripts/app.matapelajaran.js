angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/matapelajaran-list', {
		templateUrl : 'views/partials/mataPelajaran/listMataPelajaran.html',
		controller : 'listMatpel'
	}).when('/matapelajaran-form', {
		templateUrl : 'views/partials/mataPelajaran/formMataPelajaran.html',
		controller : 'addMatpelCtrl'
	}).when('/matapelajaran-detail/:id', {
		templateUrl : 'views/partials/mataPelajaran/detailMataPelajaran.html',
		controller : 'detailMatpelCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/matapelajaran-edit/:id', {
		templateUrl : 'views/partials/mataPelajaran/editMataPelajaran.html',
		controller : 'editMataPelajaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});

});

angular.module('raportApp').controller(
		'addMatpelCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.submit = function() {
				var request = {
					url : '/matapelajaran',
					method : 'POST',
					data : $scope.mata_pelajaran
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

angular.module('raportApp').controller('listMatpel', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/matapelajaran',
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

angular.module('raportApp').controller('detailMatpelCtrl', function($scope, $http, $log, id) {
	$scope.mata_pelajaran = [];
	var request = {
		url : '/matapelajaran/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.mata_pelajaran = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller('updateMataPelajaranCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/matapelajaran/' + id,
			method: 'PUT',
			data: $scope.mata_pelajaran
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

angular.module('raportApp').controller('editMataPelajaranCtrl', function($scope, $http, $log, id) {
	$scope.mata_pelajaran = [];
	
	var request = {
			url : '/matapelajaran/' + id ,
			method : 'GET'
		};
		var successHandler = function(response) {
			$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
			$scope.mata_pelajaran = response.data;
		};
		var errorHandler = function(errors) {
			$log.error(angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	
});