angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/kecamatan-list', {
		templateUrl : 'views/partials/kecamatan/listKecamatan.html',
		controller : 'listKecamatanCtrl'
	}).when('/kecamatan-detail/:id', {
		templateUrl : 'views/partials/kecamatan/detailKecamatan.html',
		controller : 'detailKecamatanCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/kecamatan-form', {
		templateUrl : 'views/partials/kecamatan/formKecamatan.html',
		controller : 'addKecamatanCtrl'
	}).when('/kecamatan-edit/:id', {
		templateUrl : 'views/partials/provinsi/editKecamatan.html',
		controller : 'editKecamatanCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});
});

angular.module('raportApp').controller(
		'addKecamatanCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

			$scope.submit = function() {
				var request = {
					url : '/kecamatan',
					method : 'POST',
					data : $scope.kecamatan
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/kecamatan-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller(
		'listKecamatanCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/kecamatan'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getKecamatan = function(page, limit) {
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
				getKecamatan(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailKecamatanCtrl', function($scope, $http, $log, id) {
	$scope.kecamatan = [];
	var request = {
		url : '/kecamatan/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kecamatan = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller(
		'showAddKecamatanCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kecamatan/formKecamatan.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKecamatanCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailKecamatan = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kecamatan/detailKecamatan.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kabupaten-list";
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