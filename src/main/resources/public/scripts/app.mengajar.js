angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/guru/mengajar/list', {
		templateUrl : 'views/partials/mengajar/listMengajar.html',
		controller : 'MengajarCtrl'
	}).when('/guru/mengajar/detail/:id', {
		templateUrl : 'views/partials/mengajar/detailMengajar.html',
		controller : 'MengajarCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/guru/mengajar/edit/:id', {
		templateUrl : 'views/partials/mengajar/editMengajar.html',
		controller : 'MengajarCtrl'
	}).when('/guru/mengajar/form', {
		templateUrl : 'views/partials/mengajar/formMengajar.html',
		controller : 'MengajarCtrl'
	});
});


angular.module('raportApp')
.controller('MengajarCtrl', function($scope, $http, $resource, $route, $stateParams, $mdDialog, $mdToast, $log, $state, $location, MengajarService){
	$scope.formData = {};
	$scope.items = [];
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
     * Get Iterable
     */
    $scope.guru_mengajar_mata_pelajaran = [];
    var request = {
    		url : '/guru/mengajar/all',
    		method : 'GET'
    	};
    	var successHandler = function(response) {
    		$log.debug("Response data dari server : \n"
    				+ angular.toJson(response.data, true));
    		$scope.guru_mengajar_mata_pelajaran = response.data;
    	};
    	var errorHandler = function(errors) {
    		$log.error(angular.toJson(errors, true));
    	};
    	$http(request).then(successHandler, errorHandler);
    
    
    /*
     * List Data
     */
    
	var url = '/guru/mengajar'
		
    $scope.query = {
			order : '',
			limit : 5,
			page : 1,
			total : 0
		};
	
	var getMengajar = function(page, limit) {
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
		getMengajar(page, limit).get().$promise.then(
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
	 * Get Iterable
	 */
	
	$scope.mata_pelajaran = [];
	var request = {
		url : '/mata/pelajaran/all',
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
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
		MengajarService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/guru/mengajar/list";
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
		MengajarService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/guru/mengajar/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		MengajarService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/guru/mengajar/list";
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
	
	$scope.showConfirm = function(idGuru, idMatpel){
		var confirm = $mdDialog.confirm()
			.title('Konfirmasi Hapus Data')
			.textContent('Apakah anda yakin untuk menghapus data?')
			.ok('Hapus')
			.cancel('Batal');
		$mdDialog.show(confirm).then(function(){
			MengajarService.delete({idGuru : idGuru, idMatpel : idMatpel}).$promise.then(
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

angular.module('raportApp')
		.controller(
				'showDetailMengajarCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/mengajar/detailMengajar.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/mengajar/list";
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
