angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/sekolah-list', {
		templateUrl : 'views/partials/sekolah/listSekolah.html',
		controller : 'SekolahCtrl'
	}).when('/sekolah-detail/:id', {
		templateUrl : 'views/partials/sekolah/detailSekolah.html',
		controller : 'SekolahCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/sekolah-edit/:id', {
		templateUrl : 'views/partials/sekolah/editSekolah.html',
		controller : 'SekolahCtrl'
	}).when('/sekolah-form', {
		templateUrl : 'views/partials/sekolah/formSekolah.html',
		controller : 'SekolahCtrl'
	});
});

angular.module('raportApp').controller('SekolahCtrl', function($scope, $http, $resource, $route, $stateParams, $mdDialog, $mdToast, $log, $state, $location, SekolahService){
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
     * Get iterable
     */
    
    $scope.kecamatan = [];
	var request = {
		url : '/kecamatan/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n"
				+ angular.toJson(response.data, true));
		$scope.kecamatan = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);

	$scope.kabupaten = [];
	var request = {
		url : '/kabupaten/all',
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

	$scope.provinsi = [];
	var request = {
		url : '/provinsi/all',
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

	$scope.tingkatan = [];
	var request = {
		url : '/tingkat/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n"
				+ angular.toJson(response.data, true));
		$scope.tingkatan = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	/*
	 * List Data
	 */
	
	$scope.items = [];

	var url = '/sekolah'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getSekolah = function(page, limit) {
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
		getSekolah(page, limit).get().$promise.then(
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
		SekolahService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/sekolah-list";
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
		SekolahService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/sekolah-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		SekolahService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/sekolah-list";
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
			SekolahService.delete({id : id}).$promise.then(
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
		'showAddSekolahCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/sekolah/formSekolah.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailSekolahCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/sekolah/detailSekolah.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/sekolah-list";
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



