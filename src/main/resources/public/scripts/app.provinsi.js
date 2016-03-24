angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/provinsi-list', {
		templateUrl : 'views/partials/provinsi/listProvinsi.html',
		controller : 'listProvinsiCtrl'
	}).when('/provinsi-detail/:id', {
		templateUrl : 'views/partials/provinsi/detailProvinsi.html',
		controller : 'detailProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-edit/:id', {
		templateUrl : 'views/partials/provinsi/editProvinsi.html',
		controller : 'editProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-delete/:id', {
		controller : 'deleteProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-form', {
		templateUrl : 'views/partials/provinsi/formProvinsi.html',
		controller : 'addProvinsiCtrl'
	});
});

/*
 * Controller 
 */

angular.module('raportApp').controller('ProvinsiCtrl', function($scope, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, ProvinsiService){
	$scope.formData = {};
	/*
	 * Create Data
	 */
	
	$scope.save() = function(){
		$scope.formData.isEnabled = true;
		ProvinsiService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data tersimpan.')
				window.location = "/#/provinsi-list";
			},
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Gagal menyimpan data, cek kembali input data');
			}
		);
	};
	
	
	/*
	 * Edit Data
	 */
	if($stateParams.id){
		ProvinsiService.get({id: $stateParams.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/provinsi-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){
		$scope.formData.isEnabled = true;
		
		ProvinsiService.update($scope.formData).$promise.then(
			function(response){
				$mdToast.show({
					template: '<md-toast class="md-toast">Data berhasil diubah</md-toast>',
					hideDelay: 6000,
					position: 'buttom right'
				});
				window.location = "/#/provinsi-list";
			},
			
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Data gagal diubah, cek kembali data input')
			}
		);
	};
	
	/*
	 * Delete
	 */
	
	$scope.delete = function(id){
		var confirm = $mdDialog.confirm()
			.title('Konfirmasi Hapus Data')
			.textContent('Apakah anda yakin untuk menghapus data?')
			.targetEvent(id)
			.ok('Delete')
			.cancel('Cancel');
		$mdDialog.show(confirm).then(function(){
			ProvinsiService.delete({id : id}).$promise.then(
				function(response){
					mdToast('Data berhasil dihapus');
					getPage($scope.query.page, $scope.query.limit);
					$scope.onPaginate = function(page, limit) {
						getPage(page, limit);
					}
				},
				function(errResponse){
					$log.debug(errResponse);
					mdToast('Data gagal dihapus, silahkan mencoba lagi');
				}
			);
		});
	};
});


angular.module('raportApp').controller(
		'addProvinsiCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.submit = function() {
				var request = {
					url : '/provinsi',
					method : 'POST',
					data : $scope.provinsi
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/provinsi-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});

angular.module('raportApp').controller(
		'listProvinsiCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/provinsi'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getProvinsi = function(page, limit) {
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
				getProvinsi(page, limit).get().$promise.then(
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

angular
		.module('raportApp')
		.controller(
				'detailProvinsiCtrl',
				function($scope, $http, $log, $mdDialog, $mdMedia, id) {
					$scope.provinsi = [];
					var request = {
						url : '/provinsi/' + id,
						method : 'GET'
					};
					var successHandler = function(response) {
						$log.debug("Response data dari server : \n"
								+ angular.toJson(response.data, true));
						$scope.provinsi = response.data;
					};
					var errorHandler = function(errors) {
						$log.error(angular.toJson(errors, true));
					};
					$http(request).then(successHandler, errorHandler);

					$scope.status = '';
					$scope.showDetail = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show(
										{
											controller : DialogForm,
											templateUrl : 'views/partials/provinsi/detailProvinsi.html',
											parent : angular
													.element(document.body),
											targetEvent : ev,
											clickOutsideToClose : true,
											fullscreen : useFullScreen
										})
								.then(
										function(answer) {
											$scope.status = 'You said the information was "'
													+ answer + '".';
										},
										function() {
											$scope.status = 'You cancelled the dialog.';
										});
						$scope
								.$watch(
										function() {
											return $mdMedia('xs')
													|| $mdMedia('sm');
										},
										function(wantsFullScreen) {
											$scope.customFullscreen = (wantsFullScreen === true);
										});
					};

				});

angular.module('raportApp').controller(
		'deleteProvinsiCtrl',
		function($scope, $http, $log, id) {
			$scope.provinsi = [];
			var request = {
				url : '/provinsi/' + id,
				method : 'DELETE'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.provinsi = response.data;
				window.location = "/#/provinsi-list";
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});

angular.module('raportApp').controller(
		'updateProvinsiCtrl',
		function($scope, $http, $log) {
			$scope.raport = {};

			$scope.update = function(id) {
				var request = {
					url : '/provinsi/' + id,
					method : 'PUT',
					data : $scope.provinsi
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/#/provinsi-list";
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);

			};
		});

angular.module('raportApp').controller(
		'editProvinsiCtrl',
		function($scope, $http, $log, id) {
			$scope.provinsi = [];

			var request = {
				url : '/provinsi/' + id,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n"
						+ angular.toJson(response.data, true));
				$scope.provinsi = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);

		});

angular.module('raportApp').controller(
		'showAddFormCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/provinsi/formProvinsi.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailProvinsiCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/provinsi/detailProvinsi.html',
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