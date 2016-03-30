angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/guru-list', {
		templateUrl : 'views/partials/guru/listGuru.html',
		controller : 'GuruCtrl'
	}).when('/guru-detail/:id', {
		templateUrl : 'views/partials/guru/detailGuru.html',
		controller : 'GuruCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/guru-edit/:id', {
		templateUrl : 'views/partials/guru/editGuru.html',
		controller : 'GuruCtrl'
	}).when('/guru-form', {
		templateUrl : 'views/partials/guru/formGuru.html',
		controller : 'GuruCtrl'
	});
});


angular.module('raportApp')
.controller('GuruCtrl', function($scope, $http, $resource, $route, $stateParams, $mdDialog, $mdToast, $log, $state, $location, GuruService){
	$scope.formData = {};
	$scope.items = [];
	
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
     * List Data
     */
    
	var url = '/guru'
		
    $scope.query = {
			order : '',
			limit : 5,
			page : 1,
			total : 0
		};
	
	var getGuru = function(page, limit) {
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
		getGuru(page, limit).get().$promise.then(
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
		GuruService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/guru-list";
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
		GuruService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/guru-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		GuruService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/guru-list";
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
			.ok('Hapus')
			.cancel('Batal');
		$mdDialog.show(confirm).then(function(){
			GuruService.delete({id : id}).$promise.then(
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
				'showDetailGuruCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/guru/detailGuru.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/guru-list";
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
