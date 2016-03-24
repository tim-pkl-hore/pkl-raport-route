angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/tahun-ajaran-list', {
		templateUrl : 'views/partials/tahunAjaran/listTahunAjaran.html',
		controller : 'listTahunAjaranCtrl'
	}).when('/tahun-ajaran-detail/:id', {
		templateUrl : 'views/partials/tahunAjaran/detailTahunAjaran.html',
		controller : 'detailTahunAjaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tahun-ajaran-edit/:id', {
		templateUrl : 'views/partials/tahunAjaran/editTahunAjaran.html',
		controller : 'editTahunAjaranCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tahun-ajaran-form', {
		templateUrl : 'views/partials/tahunAjaran/formTahunAjaran.html',
		controller : 'addTahunAjaranCtrl'
	});
});

angular.module('raportApp').controller('addTahunAjaranCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.sekolah = [];
	var request = {
		url : '/sekolah/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.sekolah = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.submit = function() {
		var request = {
			url: '/tahun-ajaran',
			method: 'POST',
			data: $scope.tahun_ajaran
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/tahun-ajaran-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller(
		'listTahunAjaranCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/tahun-ajaran'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getTahunAjaran = function(page, limit) {
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
				getTahunAjaran(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailTahunAjaranCtrl', function($scope, $http, $log, id) {
	$scope.tahun_ajaran = [];
	var request = {
		url : '/tahun-ajaran/' + id ,
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
});

angular.module('raportApp').controller(
		'showAddTahunAjaranCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/tahunAjaran/formTahunAjaran.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailTahunAjaranCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/tahunAjaran/detailTahunAjaran.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/tahun-ajaran-list";
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