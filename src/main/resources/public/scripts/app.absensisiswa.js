angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/absensi-siswa-list',{
					templateUrl: 'views/partials/absensiSiswa/listAbsensiSiswa.html',
					controller: 'listAbsensiSiswaCtrl'
				}).when('/absensi-siswa-detail/:id', {
					templateUrl: 'views/partials/absensiSiswa/detailAbsensiSiswa.html',
					controller: 'detailAbsensiSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/absensi-siswa-edit/:id', {
					templateUrl: 'views/partials/absensiSiswa/editAbsensiSiswa.html',
					controller: 'editAbsensiSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/absensi-siswa-form', {
					templateUrl: 'views/partials/absensiSiswa/formAbsensiSiswa.html',
					controller: 'addAbsensiSiswaCtrl'
				});
			});




angular.module('raportApp').controller('addAbsensiSiswaCtrl', function($scope, $http, $log) {
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
	
	$scope.kelas_siswa = [];
	var request = {
		url : '/kelas-siswa/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kelas_siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.submit = function() {
		var request = {
			url: '/absensi-siswa',
			method: 'POST',
			data: $scope.absensi_siswa
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/absensi-siswa-list";
			
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listAbsensiSiswaCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/absensi-siswa'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getAbsensiSiswa = function(page, limit) {
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
				getAbsensiSiswa(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailAbsensiSiswaCtrl', function($scope, $http, $log, id) {
	$scope.absensi_siswa = [];
	var request = {
		url : '/absensi-siswa/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.absensi_siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller(
		'showAddAbsensiCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/absensiSiswa/formAbsensiSiswa.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailAbsensiCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/absensiSiswa/detailAbsensiSiswa.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/absensi-siswa-list";
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

