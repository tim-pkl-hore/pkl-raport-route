angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kelas-list',{
					templateUrl: 'views/partials/kelas/listKelas.html',
					controller: 'listKelasCtrl'
				}).when('/kelas-detail/:id', {
					templateUrl: 'views/partials/kelas/detailKelas.html',
					controller: 'detailKelasCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-edit/:id', {
					templateUrl: 'views/partials/kelas/editKelas.html',
					controller: 'editKelasCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-form', {
					templateUrl: 'views/partials/kelas/formKelas.html',
					controller: 'addKelasCtrl'
				});
			});

angular.module('raportApp').controller('addKelasCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.tahun_ajaran = [];
	var request = {
		url : '/tahun-ajaran/all',
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
	
	$scope.guru = [];
	var request = {
		url : '/guru/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.guru = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
				
	$scope.submit = function() {
		var request = {
			url: '/kelas',
			method: 'POST',
			data: $scope.kelas
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/kelas-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listKelasCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/kelas',
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

angular.module('raportApp').controller('detailKelasCtrl', function($scope, $http, $log, id) {
	$scope.kelas = [];
	var request = {
		url : '/kelas/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kelas = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});