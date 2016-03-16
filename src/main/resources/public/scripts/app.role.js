angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/user-role-list', {
		templateUrl : 'views/partials/userRole/listRole.html',
		controller : 'listRoleCtrl'
	}).when('/user-role-form', {
		templateUrl : 'views/partials/userRole/formRole.html',
		controller : 'addRoleCtrl'
	}).when('/user-role-detail/:id', {
		templateUrl : 'views/partials/userRole/detailRole.html',
		controller : 'detailRoleCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/user-role-edit/:id', {
		templateUrl : 'views/partials/userRole/editRole.html',
		controller : 'editRoleCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});
});

angular.module('raportApp').controller(
		'listRoleCtrl',
		function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/user-role',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.items = response.data.content;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});

angular.module('raportApp').controller(
		'detailRoleCtrl',
		function($scope, $http, $log, id) {
			$scope.user_role = [];
			var request = {
				url : '/user-role/' + id,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.user_role = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});

angular.module('raportApp').controller(
		'addRoleCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.users = [];
			var request = {
				url : '/pengguna/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.users = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

			$scope.submit = function() {
				var request = {
					url : '/user-role',
					method : 'POST',
					data : $scope.user_role
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/user-role-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller('updateRoleCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.user_role = [];
	var request = {
		url : '/user-role/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n"
				+ angular.toJson(response.data, true));
		$scope.user_role = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.update = function(id) {
		var request = {
			url: '/user-role/' + id,
			method: 'PUT',
			data: $scope.user_role
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

angular.module('raportApp').controller(
		'editRoleCtrl',
		function($scope, $http, $log, id) {
			$scope.user_role = [];
			
			var request = {
				url : '/user-role/' + id,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				console.dir(response.data);
				$scope.user_role = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			

		});