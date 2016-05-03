angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/nilai/list', {
		templateUrl : 'views/partials/nilai/listKelas.html',
		controller : 'NilaiCtrl'
	}).when('/nilai/list/:idkelas', {
		templateUrl : 'views/partials/nilai/listSiswa.html',
		controller : 'NilaiCtrl',
		resolve : {
			'idkelas' : function($route){
				return $route.current.params.idkelas;
			}
		}
	}).when('/nilai/list/mata/pelajaran/:idkelas/:idsiswa', {
		templateUrl : 'views/partials/nilai/listMataPelajaran.html',
		controller : 'NilaiCtrl',
		resolve : {
			'idsiswa' : function($route){
				return $route.current.params.idsiswa;
			
			}
		}
	});

});

angular.module('raportApp').controller('NilaiCtrl', function($scope,	 $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, PenilaianService, KelasService, KelasSiswaService){
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
	 * List Mata Pelajaran
	 */
	
	$scope.itemsMataPelajaran = [];

	var url = '/mata/pelajaran'

	$scope.query = {
		order : '',
		limit : 15,
		page : 1,
		total : 0
	};

	var getMataPelajaran = function(page, limit) {
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
		getMataPelajaran(page, limit).get().$promise.then(
				function(response) {
					console.dir(response.content);
					$scope.itemsMataPelajaran = response.content;
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
	 * List Kelas Siswa
	 */
	$scope.itemKelas = [];
	var request = {
		url : '/kelas/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.itemKelas = response.data.content;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
	
		PenilaianService.create($scope.formData).$promise.then(
			function(response){
				
				mdToast('Data berhasil ditambah');
				window.location = "/#/nilai/list";
			},
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Gagal menyimpan data, cek kembali input data');
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