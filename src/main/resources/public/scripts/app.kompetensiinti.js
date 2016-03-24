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

angular.module('raportApp').controller(
		'listKompetensiIntiCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/kompetensi-inti'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getKompetensiInti = function(page, limit) {
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
				getKompetensiInti(page, limit).get().$promise.then(
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

angular.module('raportApp').controller(
		'showAddKompetensiIntiCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kompetensiInti/formKompetensiInti.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKompetensiIntiCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kompetensiInti/detailKelas.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kelas-list";
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
