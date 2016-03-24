angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/hari-libur-list',{
					templateUrl: 'views/partials/hariLibur/listHariLibur.html',
					controller: 'listHariLiburCtrl'
				}).when('/hari-libur-detail/:id', {
					templateUrl: 'views/partials/hariLibur/detailHariLibur.html',
					controller: 'detailHariLiburCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/hari-libur-edit/:id', {
					templateUrl: 'views/partials/hariLibur/editHariLibur.html',
					controller: 'editHariLiburCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/hari-libur-form', {
					templateUrl: 'views/partials/hariLibur/formHariLibur.html',
					controller: 'addHariLiburCtrl'
				});
			});

angular.module('raportApp').controller('addHariLiburCtrl', function($scope, $http, $log) {
	$scope.raport = {};
				
	$scope.submit = function() {
		var request = {
			url: '/hari-libur',
			method: 'POST',
			data: $scope.hari_libur
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/hari-libur-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller(
		'listHariLiburCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/hari-libur'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getHariLibur = function(page, limit) {
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
				getHariLibur(page, limit).get().$promise.then(
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

angular.module('raportApp').controller('detailHariLiburCtrl', function($scope, $http, $log, id) {
	$scope.hari_libur = [];
	var request = {
		url : '/hari-libur/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.hari_libur = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller(
		'showAddHariLiburCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/hariLibur/formHariLibur.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailHariLiburCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/hariLibur/detailProvinsi.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/hari-libur-list";
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
