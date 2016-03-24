angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/materi-pokok-list',{
					templateUrl: 'views/partials/materiPokok/listMateriPokok.html',
					controller: 'listMateriPokokCtrl'
				}).when('/materi-pokok-detail/:id', {
					templateUrl: 'views/partials/materiPokok/detailMateriPokok.html',
					controller: 'detailMateriPokokCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/materi-pokok-form', {
					templateUrl: 'views/partials/materiPokok/formMateriPokok.html',
					controller: 'addMateriPokokCtrl'
				});
			});

angular.module('raportApp').controller('addMateriPokokCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.kompetensi_dasar = [];
	var request = {
		url : '/kompetensi-dasar/all',
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
				
	$scope.submit = function() {
		var request = {
			url: '/materi-pokok',
			method: 'POST',
			data: $scope.materi_pokok
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/materi-pokok-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller(
		'listMateriPokokCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/materi-pokok'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getMateriPokok = function(page, limit) {
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
				getMateriPokok(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailMateriPokokCtrl', function($scope, $http, $log, id) {
	$scope.materi_pokok = [];
	var request = {
		url : '/materi-pokok/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.materi_pokok = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller(
		'showAddMateriPokokCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/materiPokok/formMateriPokok.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKelasCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/materiPokok/detailMateriPokok.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/materi-pokok-list";
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