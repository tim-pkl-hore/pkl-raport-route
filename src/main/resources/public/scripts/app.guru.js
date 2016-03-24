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

angular.module('raportApp').controller(
		'listGuruCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/guru'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getGuru = function(page, limit) {
				return $resource(url, {}, {
					get : {
						method : "GET",
						params : {
							page : page - 1,
							size : limit
						}
					}
				});
			}

			var getPage = function(page, limit) {
				getGuru(page, limit).get().$promise.then(
						function(response) {
							console.dir(response.content);
							$scope.items = response.content;
							$scope.query.limit = response.size;
							$scope.query.total = response.totalElements;
						}, function(errResponse) {
							console.log(errResponse);
							console.error('Error while fethcing data');
						}

				);

			}

			getPage($scope.query.page, $scope.query.limit);

			$scope.onPaginate = function(page, limit) {
				getPage(page, limit);
			}
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


angular.module('raportApp').controller(
		'showAddGuruCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/guru/formGuru.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailGuruCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/guru/detailGuru.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/provinsi-list";
							$log.log(url);
							$window.location.href = url;
						}

					};
				});

function DialogForm($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}
