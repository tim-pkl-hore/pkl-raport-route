angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kompetensi-dasar-list',{
					templateUrl: 'views/partials/kompetensiDasar/listKompetensiDasar.html',
					controller: 'listKompetensiDasarCtrl'
				}).when('/kompetensi-dasar-detail/:id', {
					templateUrl: 'views/partials/kompetensiDasar/detailKompetensiDasar.html',
					controller: 'detailKompetensiDasarCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-dasar-edit/:id', {
					templateUrl: 'views/partials/kompetensiDasar/editKompetensiDasar.html',
					controller: 'editKompetensiDasarCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-dasar-form', {
					templateUrl: 'views/partials/kompetensiDasar/formKompetensiDasar.html',
					controller: 'addKompetensiDasarCtrl'
				});
			});

angular.module('raportApp').controller('addKompetensiDasarCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.kompetensi_inti = [];
	var request = {
		url : '/kompetensi-inti/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kompetensi_inti = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.mata_pelajaran = [];
	var request = {
		url : '/matapelajaran/all',
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
	
	$scope.submit = function() {
		var request = {
			url: '/kompetensi-dasar',
			method: 'POST',
			data: $scope.kompetensi_dasar
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

angular.module('raportApp').controller('listKompetensiDasarCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/kompetensi-dasar',
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

angular.module('raportApp').controller('detailKompetensiDasarCtrl', function($scope, $http, $log, id) {
	$scope.kompetensi_dasar = [];
	var request = {
		url : '/kompetensi-dasar/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kompetensi_dasar = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});
