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
			window.location = "/#/kompetensi-dasar-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller(
		'listKompetensiDasarCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/kompetensi-dasar'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getKompetensiDasar = function(page, limit) {
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
				getKompetensiDasar(page, limit).get().$promise.then(
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

angular.module('raportApp').controller(
		'showAddKompetensiDasarCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kompetensiDasar/formKompetensiDasar.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKompetensiDasar',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailKompetensiDasar = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kompetensiDasar/detailKompetensiDasar.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kompetensi-dasar-list";
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
