angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/penilaian/list', {
		templateUrl : 'views/partials/penilaian/listKelasPenilaian.html',
		controller : 'PenilaianCtrl'
	}).when('/penilaian/form', {
		templateUrl : 'views/partials/penilaian/formPenilaian.html',
		controller : 'PenilaianCtrl'
	}).when('/penilaian/detail/list/:id', {
		templateUrl : 'views/partials/penilaian/listPenilaian.html',
		controller : 'PenilaianCtrl',
		resolve :{
			'id' : function($route){
				return $route.current.params.id;
			}
		}
	}).when('/penilaian/detail/:id', {
		templateUrl : 'views/partials/penilaian/detailPenilaian.html',
		controller : 'PenilaianCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/penilaian/edit/:id', {
		templateUrl : 'views/partials/penilaian/editPenilaian.html',
		controller : 'PenilaianCtrl'
	});

});

angular.module('raportApp').controller('PenilaianCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, PenilaianService){
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
        		url : '/kelas//all',
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
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
		PenilaianService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/penilaian/list";
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
		PenilaianService.get({id: $route.current.params.id}).$promise.then(
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