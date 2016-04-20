angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/penilaian/list', {
		templateUrl : 'views/partials/penilaian/listKelasPenilaian.html',
		controller : 'PenilaianCtrl'
	}).when('/penilaian/list/kelas/:idkelas', {
		templateUrl : 'views/partials/penilaian/listPenilaian.html',
		controller : 'PenilaianCtrl',
		resolve : {
			'idkelas' : function($route){
				return $route.current.params.idkelas;
			}
		}
	}).when('/penilaian/list/kelas/:idkelas/:idsiswa', {
		templateUrl : 'views/partials/penilaian/listNilai.html',
		controller : 'PenilaianCtrl',
		resolve : {
			'idsiswa' : function($route){
				return $route.current.params.idsiswa;
			
			}
		}
	}).when('/penilaian/:idkelasinput/input-nilai', {
		templateUrl : 'views/partials/penilaian/formPenilaian.html',
		controller : 'PenilaianCtrl',
		resolve : {
			'idkelasinput' : function($route){
				return $route.current.params.idkelasinput;
			}
		}
	}).when('/penilaian/edit/:idkelas/:idpenilaian', {
		templateUrl : 'views/partials/penilaian/editPenilaian.html',
		controller : 'PenilaianCtrl'
	});

});

angular.module('raportApp').controller('PenilaianCtrl', function($scope,	 $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, PenilaianService, KelasService, KelasSiswaService){
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
     * getIterable
     */
    
    $scope.kelas_siswa = [];
    var request = {
    		url : '/kelas/siswa/all',
    		method : 'GET'
    	};
    	var successHandler = function(response) {
    		$log.debug("Response data dari server : \n"
    				+ angular.toJson(response.data, true));
    		$scope.kelas_siswa = response.data;
    	};
    	var errorHandler = function(errors) {
    		$log.error(angular.toJson(errors, true));
    	};
    	$http(request).then(successHandler, errorHandler);
    	
    $scope.kelas = [];
    var request = {
        		url : '/kelas/all',
        		method : 'GET'
        	};
        	var successHandler = function(response) {
        		$log.debug("Response data dari server : \n"
        				+ angular.toJson(response.data, true));
        		$scope.kelas = response.data;
        	};
        	var errorHandler = function(errors) {
        		$log.error(angular.toJson(errors, true));
        	};
        	$http(request).then(successHandler, errorHandler);
    	
    	
    $scope.mata_pelajaran = [];
    	var request = {
    	    		url : '/mata/pelajaran/all',
    	    		method : 'GET'
    	    	};
    	    	var successHandler = function(response) {
    	    		$log.debug("Response data dari server : \n"
    	    				+ angular.toJson(response.data, true));
    	    		$scope.mata_pelajaran = response.data;
    	    	};
    	    	var errorHandler = function(errors) {
    	    		$log.error(angular.toJson(errors, true));
    	    	};
    	    	$http(request).then(successHandler, errorHandler);
    	    	
    	    	$scope.kriteria = [];
    	    	var request = {
    	    	    		url : '/kriteria/all',
    	    	    		method : 'GET'
    	    	    	};
    	    	    	var successHandler = function(response) {
    	    	    		$log.debug("Response data dari server : \n"
    	    	    				+ angular.toJson(response.data, true));
    	    	    		$scope.kriteria = response.data;
    	    	    	};
    	    	    	var errorHandler = function(errors) {
    	    	    		$log.error(angular.toJson(errors, true));
    	    	    	};
    	    	    	$http(request).then(successHandler, errorHandler);
    	
    /*
     * List Data
     */
    
    $scope.items = [];

	var url = '/kelas'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getPenilaian = function(page, limit) {
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
		getPenilaian(page, limit).get().$promise.then(
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

	$scope.searchField = function(){
		getPage(1, 5);
	};
	
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
	
		PenilaianService.create($scope.formData).$promise.then(
			function(response){
				
				mdToast('Data berhasil ditambah');
				window.location = "/#/penilaian/list/kelas/:idkelas/:idsiswa";
			},
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Gagal menyimpan data, cek kembali input data');
			}
		);
	};
	
	/*
	 * List penilaian by kelasId
	 */
	
	if($route.current.params.idkelas){
		$scope.itemsDetailPenilaian = [];
		$scope.idKelas = $route.current.params.idkelas;

		var url = '/penilaian/detail'

		$scope.queryDetailPenilaian = {
			order : '',
			limit : 5,
			page : 1,
			total : 0
		};

		var getDetailPenilaian = function(page, limit) {
			return $resource(url, {}, {
				get : {
					method : "GET",
					params : {
						page : page - 1,
						size : limit,
						kelasid : $route.current.params.idkelas,
						search : $scope.search
					}
				}
			});
		}

		var getPageDetailPenilaian = function(page, limit) {
			getDetailPenilaian(page, limit).get().$promise.then(
					function(response) {
						console.dir(response.content);
						$scope.itemsDetailPenilaian = response.content;
						$scope.queryDetailPenilaian.limit = response.size;
						$scope.queryDetailPenilaian.total = response.totalElements;
					}, function(errResponse) {
						console.log(errResponse);
						console.error('Error while fethcing data');
					}
			);

		}

		getPageDetailPenilaian($scope.queryDetailPenilaian.page, $scope.queryDetailPenilaian.limit);

		$scope.onPaginateDetailPenilaian = function(page, limit) {
			getPageDetailPenilaian(page, limit);
		}
		
		$scope.searchField = function(){
			getPage(1, 5);
		};
	};
	
	/*
	 * List penilaian by siswaId
	 */
	
	if($route.current.params.idsiswa){
		$scope.itemsDetailNilai = [];
		$scope.idSiswa = $route.current.params.idsiswa;

		var url = '/penilaian/detail/siswa/'+$route.current.params.idsiswa;

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
						kelassiswaid : $route.current.params.idsiswa,
						search : $scope.search
					}
				}
			});
		}

		var getPageDetailSiswa = function(page, limit) {
			getDetailSiswa(page, limit).get().$promise.then(
					function(response) {
						console.dir(response.content);
						$scope.itemsDetailNilai = response.content;
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
			getPageDetailSiswa(page, limit);
		}
		
		$scope.searchField = function(){
			getPage(1, 5);
		};
	};
	
	
	/*
	 * Input penilaian by kelasId
	 */
	if($route.current.params.idkelasinput){
		$scope.idKelas = $route.current.params.idkelasinput;
		KelasService.get({id: $route.current.params.idkelasinput}).$promise.then(
				function(response){
					$scope.tingkat = response.tingkat.tingkat;
					$scope.grupKelas = response.grupKelas.grupKelas;
				},
				function(errResponse){
					$log.debug(errResponse);
					mdToast('Data tidak ditemukan');
					window.location = "/#/penilaian/list";
				}
			);
		
		KelasSiswaService.getArray({id: 'all', other: $scope.idKelas}).$promise.then(
				function(response){
					$log.debug(response);
					$scope.kelasSiswa = response
				},
				function(errResponse){
					$log.debug(errResponse);
					mdToast('Data tidak ditemukan');
					window.location = "/#/penilaian/list";
				}
			);
	}
	
	/*
	 * Edit Data
	 */
	
	if($route.current.params.idpenilaian){
		KelasSiswaService.get({id: $route.current.params.idpenilaian}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/penilaian/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		PenilaianService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/penilaian/list";
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
			PenilaianService.delete({id : id}).$promise.then(
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
		'showAddpenilaianCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/penilaian/formPenilaian.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailpenilaianCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/penilaian/detailpenilaian.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/penilaian/list";
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