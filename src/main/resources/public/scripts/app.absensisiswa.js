angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/absensi-siswa-list',{
					templateUrl: 'views/partials/absensiSiswa/listAbsensiSiswa.html',
					controller: 'listAbsensiSiswaCtrl'
				}).when('/absensi-siswa-detail/:id', {
					templateUrl: 'views/partials/absensiSiswa/detailAbsensiSiswa.html',
					controller: 'detailAbsensiSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/absensi-siswa-edit/:id', {
					templateUrl: 'views/partials/absensiSiswa/editAbsensiSiswa.html',
					controller: 'editAbsensiSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/absensi-siswa-form', {
					templateUrl: 'views/partials/absensiSiswa/formAbsensiSiswa.html',
					controller: 'addAbsensiSiswaCtrl'
				});
			});

angular.module('raportApp').controller('addAbsensiSiswaCtrl', function($scope, $http, $log) {
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
	
	$scope.kelas_siswa = [];
	var request = {
		url : '/kelas-siswa/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kelas_siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.submit = function() {
		var request = {
			url: '/absensi-siswa',
			method: 'POST',
			data: $scope.absensi_siswa
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

angular.module('raportApp').controller('listAbsensiSiswaCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/absensi-siswa',
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

angular.module('raportApp').controller('detailAbsensiSiswaCtrl', function($scope, $http, $log, id) {
	$scope.absensi_siswa = [];
	var request = {
		url : '/absensi-siswa/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.absensi_siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});