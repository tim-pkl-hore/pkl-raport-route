angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kelas-siswa-list',{
					templateUrl: 'views/partials/kelasSiswa/listKelasSiswa.html',
					controller: 'listKelasSiswaCtrl'
				}).when('/kelas-siswa-detail/:id', {
					templateUrl: 'views/partials/kelasSiswa/detailKelasSiswa.html',
					controller: 'detailKelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-siswa-edit/:id', {
					templateUrl: 'views/partials/kelasSiswa/editKelasSiswa.html',
					controller: 'editKelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-siswa-form', {
					templateUrl: 'views/partials/kelasSiswa/formKelasSiswa.html',
					controller: 'addKelasSiswaCtrl'
				});
			});

angular.module('raportApp').controller('addKelasSiswaCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.kelas = [];
	var request = {
		url : '/kelas/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kelas = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.siswa = [];
	var request = {
		url : '/siswa/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.siswa = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
				
	$scope.submit = function() {
		var request = {
			url: '/kelas-siswa',
			method: 'POST',
			data: $scope.kelas_siswa
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/kelas-siswa-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller(
		'listKelasSiswaCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/kelas-siswa'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getKelasSiswa = function(page, limit) {
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
				getKelasSiswa(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailKelasSiswaCtrl', function($scope, $http, $log, id) {
	$scope.kelas_siswa = [];
	var request = {
		url : '/kelas-siswa/' + id ,
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
});

angular.module('raportApp').controller(
		'showAddKelasSiswaCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kelasSiswa/formKelasSiswa.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKelasSiswaCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kelasSiswa/detailKelasSiswa.html',
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
