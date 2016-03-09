angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kelas-siswa-list',{
					templateUrl: 'views/partials/kelasSiswa/listKelasSiswa.html',
					controller: 'listKelasSiswaCtrl'
				}).when('/kelas-siswa-detail/:id', {
					templateUrl: 'views/partials/kelasSiswa/detailKelasSiswa.html',
					controller: 'detailKelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-siswa-edit/:id', {
					templateUrl: 'views/partials/kelasSiswa/editKelasSiswa.html',
					controller: 'editKelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-siswa-form', {
					templateUrl: 'views/partials/kelasSiswa/formKelasSiswa.html',
					controller: 'addKelasSiswaCtrl'
				});
			});

angular.module('raportApp').controller('addKelasSiswaCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.kelas = [];
	var request = {
		url : '/kelas/all',
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
	
	$scope.siswa = [];
	var request = {
		url : '/siswa/all',
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
				
	$scope.submit = function() {
		var request = {
			url: '/kelas-siswa',
			method: 'POST',
			data: $scope.kelas_siswa
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/kelas-siswa-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listKelasSiswaCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/kelas-siswa',
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

angular.module('raportApp').controller('detailKelasSiswaCtrl', function($scope, $http, $log, id) {
	$scope.kelas_siswa = [];
	var request = {
		url : '/kelas-siswa/' + id ,
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
});