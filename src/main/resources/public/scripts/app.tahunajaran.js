angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/tahun-ajaran-list', {
		templateUrl : 'views/partials/tahunAjaran/listTahunAjaran.html',
		controller : 'listTahunAjaranCtrl'
	}).when('/tahun-ajaran-detail/:id', {
		templateUrl : 'views/partials/tahunAjaran/detailTahunAjaran.html',
		controller : 'detailTahunAjaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tahun-ajaran-edit/:id', {
		templateUrl : 'views/partials/tahunAjaran/editTahunAjaran.html',
		controller : 'editTahunAjaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tahun-ajaran-form', {
		templateUrl : 'views/partials/tahunAjaran/formTahunAjaran.html',
		controller : 'addTahunAjaranCtrl'
	});
});

angular.module('raportApp').controller('addTahunAjaranCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.sekolah = [];
	var request = {
		url : '/sekolah/all',
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
	
	$scope.submit = function() {
		var request = {
			url: '/tahun-ajaran',
			method: 'POST',
			data: $scope.tahun_ajaran
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/tahun-ajaran-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listTahunAjaranCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/tahun-ajaran',
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

angular.module('raportApp').controller('detailTahunAjaranCtrl', function($scope, $http, $log, id) {
	$scope.tahun_ajaran = [];
	var request = {
		url : '/tahun-ajaran/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.tahun_ajaran = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});