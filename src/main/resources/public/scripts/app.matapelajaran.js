angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/matapelajaran-list', {
		templateUrl : 'views/partials/mataPelajaran/listMataPelajaran.html',
		controller : 'listMatpel'
	}).when('/matapelajaran-form', {
		templateUrl : 'views/partials/mataPelajaran/formMataPelajaran.html',
		controller : 'addMatpelCtrl'
	}).when('/matapelajaran-detail/:id', {
		templateUrl : 'views/partials/mataPelajaran/detailMataPelajaran.html',
		controller : 'detailMatpelCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/matapelajaran-edit/:id', {
		templateUrl : 'views/partials/mataPelajaran/editMataPelajaran.html',
		controller : 'editMataPelajaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});

});

angular.module('raportApp').controller(
		'addMatpelCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.submit = function() {
				var request = {
					url : '/matapelajaran',
					method : 'POST',
					data : $scope.mata_pelajaran
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/matapelajaran-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller(
		'listMatpel',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/matapelajaran'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getMatpel = function(page, limit) {
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
				getMatpel(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailMatpelCtrl', function($scope, $http, $log, id) {
	$scope.mata_pelajaran = [];
	var request = {
		url : '/matapelajaran/' + id ,
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
});

angular.module('raportApp').controller('updateMataPelajaranCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/matapelajaran/' + id,
			method: 'PUT',
			data: $scope.mata_pelajaran
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/matapelajaran-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
						
	};
});

angular.module('raportApp').controller('editMataPelajaranCtrl', function($scope, $http, $log, id) {
	$scope.mata_pelajaran = [];
	
	var request = {
			url : '/matapelajaran/' + id ,
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
	
});

angular.module('raportApp').controller(
		'showAddMataPelajaranCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/mataPelajaran/formMataPelajaran.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailMataPelajaranCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/mataPelajaran/detailMataPelajaran.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/matapelajaran-list";
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