angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kompetensi-inti-list',{
					templateUrl: 'views/partials/kompetensiInti/listKompetensiInti.html',
					controller: 'listKompetensiIntiCtrl'
				}).when('/kompetensi-inti-detail/:id', {
					templateUrl: 'views/partials/kompetensiInti/detailKompetensiInti.html',
					controller: 'detailKompetensiIntiCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-inti-edit/:id', {
					templateUrl: 'views/partials/kompetensiInti/editKompetensiInti.html',
					controller: 'editKompetensiIntiCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-inti-form', {
					templateUrl: 'views/partials/kompetensiInti/formKompetensiInti.html',
					controller: 'addKompetensiIntiCtrl'
				});
			});

angular.module('raportApp').controller('addKompetensiIntiCtrl', function($scope, $http, $log) {
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
			url: '/kompetensi-inti',
			method: 'POST',
			data: $scope.kompetensi_inti
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/kompetensi-inti-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});


angular.module('raportApp').controller('listKompetensiIntiCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/kompetensi-inti',
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

angular.module('raportApp').controller('detailKompetensiIntiCtrl', function($scope, $http, $log, id) {
	$scope.kompetensi_inti = [];
	var request = {
		url : '/kompetensi-inti/' + id ,
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
});
