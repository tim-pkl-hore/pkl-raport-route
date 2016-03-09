angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/guru-list', {
		templateUrl : 'views/partials/guru/listGuru.html',
		controller : 'listGuruCtrl'
	}).when('/guru-detail/:id', {
		templateUrl : 'views/partials/guru/detailGuru.html',
		controller : 'detailGuruCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/guru-edit/:id', {
		templateUrl : 'views/partials/guru/editGuru.html',
		controller : 'editGuruCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/guru-form', {
		templateUrl : 'views/partials/guru/formGuru.html',
		controller : 'addGuruCtrl'
	});
});

angular.module('raportApp').controller(
		'addGuruCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.submit = function() {
				var request = {
					url : '/guru',
					method : 'POST',
					data : $scope.guru
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/guru-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller('listGuruCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/guru',
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

angular.module('raportApp').controller('detailGuruCtrl', function($scope, $http, $log, id) {
	$scope.guru = [];
	var request = {
		url : '/guru/' + id ,
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
});


angular.module('raportApp').controller('updateGuruCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/guru/' + id,
			method: 'PUT',
			data: $scope.guru
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/guru-list"
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
						
	};
});

angular.module('raportApp').controller('editGuruCtrl', function($scope, $http, $log, id) {
	$scope.guru = [];
	
	var request = {
			url : '/guru/' + id ,
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
	
});