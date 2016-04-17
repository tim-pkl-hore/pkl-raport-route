angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kelas/list',{
					templateUrl: 'views/partials/kelas/listKelas.html',
					controller: 'KelasCtrl'
				}).when('/kelas/detail/:id', {
					templateUrl: 'views/partials/kelas/detailKelas.html',
					controller: 'KelasCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas/detail/siswa/:idkelas', {
					templateUrl: 'views/partials/kelas/listSiswa.html',
					controller: 'KelasCtrl',
					resolve: {
						'idkelas': function($route){
							return $route.current.params.idkelas;
						}
					}
				}).when('/kelas/edit/:id', {
					templateUrl: 'views/partials/kelas/editKelas.html',
					controller: 'KelasCtrl'
				}).when('/kelas/form', {
					templateUrl: 'views/partials/kelas/formKelas.html',
					controller: 'KelasCtrl'
				});
			});

angular.module('raportApp').controller('KelasCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, KelasService){
	$scope.formData = {};
	$scope.search = "";
	
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
     
    $scope.tingkat = [];
	var request = {
		url : '/tingkat/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.tingkat = response.data;
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
    
    $scope.tahun_ajaran = [];
	var request = {
		url : '/tahun/ajaran/all',
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
	
	$scope.guru = [];
	var request = {
		url : '/guru/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.guru = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	$scope.grup_kelas = [];
	var request = {
		url : '/grup/kelas/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.grup_kelas = response.data;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
    

   
	/*
	 * List data
	 */
	
	$scope.items = [];

	var url = '/kelas'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getKelas = function(page, limit) {
		return $resource(url, {}, {
			get : {
				method : "GET",
				params : {
					page : page - 1,
					size : limit,
					search : $scope.search
				}
			}
		});
	}

	var getPage = function(page, limit) {
		getKelas(page, limit).get().$promise.then(
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
	 * Search
	 */
	$scope.searchField = function(){
		getPage(1, 5);
	};
	
	/*
	 *	List Siswa 
	 */
	
	if($route.current.params.idkelas){
		$scope.itemsDetailSiswa = [];
		$scope.idKelas = $route.current.params.idkelas;

		var url = '/kelas/detail'

		$scope.queryDetailSiswa = {
			order : '',
			limit : 5,
			page : 1,
			total : 0
		};

		var getDetailSiswa = function(page, limit) {
			return $resource(url, {}, {
				get : {
					method : "GET",
					params : {
						page : page - 1,
						size : limit,
						idkelas : $route.current.params.idkelas,
						search : $scope.search
					}
				}
			});
		}

		var getPageDetailSiswa = function(page, limit) {
			getDetailSiswa(page, limit).get().$promise.then(
					function(response) {
						console.dir(response.content);
						$scope.itemsDetailSiswa = response.content;
						$scope.queryDetailSiswa.limit = response.size;
						$scope.queryDetailSiswa.total = response.totalElements;
					}, function(errResponse) {
						console.log(errResponse);
						console.error('Error while fethcing data');
					}
			);

		}

		getPageDetailSiswa($scope.queryDetailSiswa.page, $scope.queryDetailSiswa.limit);

		$scope.onPaginateDetailSiswa = function(page, limit) {
			getDetailSiswa(page, limit);
		}
		
		$scope.searchField = function(){
			getPage(1, 5);
		};
	};
	/*
	 * Create Data
	 */
	
	$scope.simpan = function(){
		KelasService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/kelas/list";
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
		KelasService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/kelas/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		KelasService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/kelas/list";
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
			KelasService.delete({id : id}).$promise.then(
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
		'showAddKelasCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kelas/formKelas.html',
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
									templateUrl : 'views/partials/kelas/detailKelas.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kelas/list";
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