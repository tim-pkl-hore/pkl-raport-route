angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kkm/list',{
					templateUrl: 'views/partials/kkm/listKkm.html',
					controller: 'KkmCtrl'
				}).when('/kkm/detail/:id', {
					templateUrl: 'views/partials/kkm/detailKkm.html',
					controller: 'KkmCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kkm/edit/:id', {
					templateUrl: 'views/partials/kkm/editKkm.html',
					controller: 'KkmCtrl'
				}).when('/kkm/form', {
					templateUrl: 'views/partials/kkm/formKkm.html',
					controller: 'KkmCtrl'
				});
			});

angular.module('raportApp').controller('KkmCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, KkmService){
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
    
    /*
   
	/*
	 * List data
	 */
	
	$scope.items = [];

	var url = '/kkm'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getKkm = function(page, limit) {
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
		getKkm(page, limit).get().$promise.then(
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
	 * Create Data
	 */
	
	$scope.save = function(){
		KkmService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/kkm/list";
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
		KkmService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/kkm/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		KkmService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/kkm/list";
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
			KkmService.delete({id : id}).$promise.then(
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
		'showAddKkmCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kkm/formkkm.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKkmCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kkm/detailkkm.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kkm/list";
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