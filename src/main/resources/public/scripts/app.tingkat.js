angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/tingkat-list', {
		templateUrl : 'views/partials/tingkat/listTingkat.html',
		controller : 'TingkatCtrl'
	}).when('/tingkat-edit/:id', {
		templateUrl : 'views/partials/tingkat/editTingkat.html',
		controller : 'TingkatCtrl'
	}).when('/tingkat-form', {
		templateUrl : 'views/partials/tingkat/formTingkat.html',
		controller : 'TingkatCtrl'
	});
});

angular.module('raportApp').controller('TingkatCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, TingkatService){
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
	 * list data
	 */
	
	$scope.items = [];

	var url = '/tingkat'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getTingkat = function(page, limit) {
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
		getTingkat(page, limit).get().$promise.then(
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
		TingkatService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/tingkat-list";
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
		TingkatService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/tingkat-list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		TingkatService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/tingkat-list";
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
			TingkatService.delete({id : id}).$promise.then(
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


angular.module('raportApp').controller('addTingkatCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.submit = function() {
		var request = {
			url: '/tingkat',
			method: 'POST',
			data: $scope.tingkatan
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/tingkat-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listTingkatCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/tingkat',
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.items = response.data.content;
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
	
	
});

angular.module('raportApp').controller('detailTingkatCtrl', function($scope, $http, $log, $mdDialog, $mdMedia, id) {
	$scope.tingkat = [];
	var request = {
		url : '/tingkat/' + id ,
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
	
	
	$scope.status = '';
	$scope.showDetail = function(ev){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) &&  $scope.customFullscreen;
		$mdDialog.show({
			controller: DialogForm,
			templateUrl: 'views/partials/tingkat/detailTingkat.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		})
		.then(function(answer){
			$scope.status = 'You said the information was "' + answer + '".';
		}, function(){
			$scope.status = 'You cancelled the dialog.';
		});
		$scope.$watch(function(){
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen){
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};
	
	
});

angular.module('raportApp').controller('deleteTingkatCtrl', function($scope, $http, $log, id) {
	$scope.tingkat = [];
	var request = {
		url : '/tingkat/' + id ,
		method : 'DELETE'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.tingkat = response.data;
		window.location = "/#/tingkat-list";
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller('updateTingkatCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/tingkat/' + id,
			method: 'PUT',
			data: $scope.tingkat
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/tingkat-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
						
	};
});

angular.module('raportApp').controller('editTingkatCtrl', function($scope, $http, $log, id) {
	$scope.tingkat = [];
	
	var request = {
			url : '/tingkat/' + id ,
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
	
});



angular.module('raportApp').controller('showAddTingkatCtrl', function($scope, $mdDialog, $mdMedia){
	$scope.status = '';
	$scope.showAddForm = function(ev){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) &&  $scope.customFullscreen;
		$mdDialog.show({
			controller: DialogForm,
			templateUrl: 'views/partials/tingkat/formTingkat.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		});
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