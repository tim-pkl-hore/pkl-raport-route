angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/kelas/siswa/list',{
					templateUrl: 'views/partials/kelasSiswa/listKelasSiswa.html',
					controller: 'KelasSiswaCtrl'
				}).when('/kelas/siswa/detail/:id', {
					templateUrl: 'views/partials/kelasSiswa/detailKelasSiswa.html',
					controller: 'KelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas/siswa/edit/:id', {
					templateUrl: 'views/partials/kelasSiswa/editKelasSiswa.html',
					controller: 'KelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas/siswa/form', {
					templateUrl: 'views/partials/kelasSiswa/formKelasSiswa.html',
					controller: 'KelasSiswaCtrl'
				});
			});

angular.module('raportApp').controller('KelasSiswaCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, KelasSiswaService){
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
    $scope.kelas = [];
	var request = {
		url : '/kelas/all',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.kelas = response.data;
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
	
	
	/*
	 * List
	 */
	
	$scope.items = [];

	var url = '/kelas/siswa'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getKelasSiswa = function(page, limit) {
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
		getKelasSiswa(page, limit).get().$promise.then(
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
		KelasSiswaService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/kelas/siswa/list";
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
		KelasSiswaService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/kelas/siswa/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		KelasSiswaService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/kelas/siswa/list";
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
			KelasSiswaService.delete({id : id}).$promise.then(
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
	
	$scope.selection=[];
	 $scope.toggleSelection = function toggleSelection(items) {
	     var idx = $scope.selection.indexOf(items);
	 
	     // is currently selected
	     if (idx > -1) {
	       $scope.selection.splice(idx, 1);
	     }
	 
	     // is newly selected
	     else {
	       $scope.selection.push(items);
	     }
	   };
    
});



angular.module('raportApp').controller(
		'showAddKelasSiswaCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/kelasSiswa/formKelasSiswa.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailKelasSiswaCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/kelasSiswa/detailKelasSiswa.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/kelas/siswa/list";
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
