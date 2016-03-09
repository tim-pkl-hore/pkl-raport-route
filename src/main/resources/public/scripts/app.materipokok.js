angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/materi-pokok-list',{
					templateUrl: 'views/partials/materiPokok/listMateriPokok.html',
					controller: 'listMateriPokokCtrl'
				}).when('/materi-pokok-detail/:id', {
					templateUrl: 'views/partials/materiPokok/detailMateriPokok.html',
					controller: 'detailMateriPokokCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/materi-pokok-form', {
					templateUrl: 'views/partials/materiPokok/formMateriPokok.html',
					controller: 'addMateriPokokCtrl'
				});
			});

angular.module('raportApp').controller('addMateriPokokCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.kompetensi_dasar = [];
	var request = {
		url : '/kompetensi-dasar/all',
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
				
	$scope.submit = function() {
		var request = {
			url: '/materi-pokok',
			method: 'POST',
			data: $scope.materi_pokok
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/materi-pokok-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listMateriPokokCtrl', function($scope, $http, $log) {
	$scope.items = [];
	var request = {
		url : '/materi-pokok',
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

angular.module('raportApp').controller('detailMateriPokokCtrl', function($scope, $http, $log, id) {
	$scope.materi_pokok = [];
	var request = {
		url : '/materi-pokok/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.materi_pokok = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});