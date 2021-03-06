angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kompetensi-dasar-list',{
					templateUrl: 'views/partials/kompetensiDasar/listKompetensiDasar.html',
					controller: 'KompetensiDasarCtrl'
				}).when('/kompetensi-dasar-detail/:id', {
					templateUrl: 'views/partials/kompetensiDasar/detailKompetensiDasar.html',
					controller: 'KompetensiDasarCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-dasar-edit/:id', {
					templateUrl: 'views/partials/kompetensiDasar/editKompetensiDasar.html',
					controller: 'KompetensiDasarCtrl'
				}).when('/kompetensi-dasar-form', {
					templateUrl: 'views/partials/kompetensiDasar/formKompetensiDasar.html',
					controller: 'KompetensiDasarCtrl'
				});
			});

angular.module('raportApp').controller('KompetensiDasarCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, KompetensiDasarService){
	$scope.formData = {};
	
	/*
	 * Template toast
	 */
	
	var mdToast = function(message){
        $mdToast.show({
            template: '<md-toast class="md-toast">' + message + '</md-toast>',
            hideDelay: 7000,
            position: 'top right'
        });
    };
    
    /*
     * Get itarable
     */
    
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
    
	/*
	 * List Data
	 */
	
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
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
		KompetensiDasarService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/kompetensi-dasar-list";
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
	if($route.current.params.id){
		KompetensiDasarService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/kompetensi-dasar-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		KompetensiDasarService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/kompetensi-dasar-list";
			},
			
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Data gagal diubah, cek kembali data input')
			}
		);
	};
	
	
	$scope.showConfirm = function(id){
		var confirm = $mdDialog.confirm()
			.title('Konfirmasi Hapus Data')
			.textContent('Apakah anda yakin untuk menghapus data?')
			.ok('Hapus')
			.cancel('Batal');
		$mdDialog.show(confirm).then(function(){
			KompetensiDasarService.delete({id : id}).$promise.then(
				function(response){
					mdToast('Data berhasil dihapus');
					getPage($scope.query.page, $scope.query.limit);
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
