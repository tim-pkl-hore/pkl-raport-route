angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/kabupaten-list', {
		templateUrl : 'views/partials/kabupaten/listKabupaten.html',
		controller : 'listKabupatenCtrl'
	}).when('/kabupaten-form', {
		templateUrl : 'views/partials/kabupaten/formKabupaten.html',
		controller : 'KabupatenCtrl'
	}).when('/kabupaten-detail/:id', {
		templateUrl : 'views/partials/kabupaten/detailKabupaten.html',
		controller : 'KabupatenCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/kabupaten-edit/:id', {
		templateUrl : 'views/partials/kabupaten/editKabupaten.html',
		controller : 'KabupatenCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	});
});

angular.module('raportApp').controller('KabupatenCtrl', function($scope, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, KabupatenService){
	$scope.formData = {};
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
		KabupatenService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data tersimpan.')
				window.location = "/#/kabupaten-list";
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
		KabupatenService.get({id: $stateParams.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/kabupaten-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){
		$scope.formData.isEnabled = true;
		
		KabupatenService.update($scope.formData).$promise.then(
			function(response){
				$mdToast.show({
					template: '<md-toast class="md-toast">Data berhasil diubah</md-toast>',
					hideDelay: 6000,
					position: 'buttom right'
				});
				window.location = "/#/kabupaten-list";
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
	
	$scope.showConfirm = function(id){
		var confirm = $mdDialog.confirm()
			.title('Konfirmasi Hapus Data')
			.textContent('Apakah anda yakin untuk menghapus data?')
			.targetEvent(id)
			.ok('Delete')
			.cancel('Cancel');
		$mdDialog.show(confirm).then(function(){
			KabupatenService.delete({id : id}).$promise.then(
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
		'listKabupatenCtrl',
		function($scope, $http, $log, $resource) {
			$scope.items = [];

			var url = '/kabupaten'

			$scope.query = {
				order : '',
				limit : 5,
				page : 1,
				total : 0
			};

			var getKabupaten = function(page, limit) {
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
				getKabupaten(page, limit).get().$promise.then(
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

angular.module('raportApp').controller(
		'detailKabupatenCtrl',
		function($scope, $http, $log, id) {
			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/' + id,
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
		});



angular.module('raportApp').controller(
		'showAddKabupatenCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kabupaten/formKabupaten.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKabupatenCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kabupaten/detailKabupaten.html',
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