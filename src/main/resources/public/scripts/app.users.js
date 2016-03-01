angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/user-list', {
		templateUrl : 'views/partials/users/listUser.html',
		controller : 'listUserCtrl'
	}).when('/user-detail/:id', {
		templateUrl : 'views/partials/users/detailUser.html',
		controller : 'detailUserCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/user-edit/:id', {
		templateUrl : 'views/partials/users/editUser.html',
		controller : 'editUserCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/user-form', {
		templateUrl : 'views/partials/users/formUser.html',
		controller : 'addUserCtrl'
	});
});

angular.module('raportApp').controller(
		'addUserCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.submit = function() {
				var request = {
					url : '/pengguna',
					method : 'POST',
					data : $scope.users
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

angular.module('raportApp').controller('listUserCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/pengguna',
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

angular.module('raportApp').controller('detailUserCtrl', function($scope, $http, $log, id) {
	$scope.users = [];
	var request = {
		url : '/pengguna/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.users = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});


angular.module('raportApp').controller('updateUserCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/pengguna/' + id,
			method: 'PUT',
			data: $scope.users
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

angular.module('raportApp').controller('editUserCtrl', function($scope, $http, $log, id) {
	$scope.users = [];
	
	var request = {
			url : '/pengguna/' + id ,
			method : 'GET'
		};
		var successHandler = function(response) {
			$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
			$scope.users = response.data;
		};
		var errorHandler = function(errors) {
			$log.error(angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	
});