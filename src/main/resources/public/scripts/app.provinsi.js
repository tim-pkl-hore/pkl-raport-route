angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/provinsi-list', {
		templateUrl : 'views/partials/provinsi/listProvinsi.html',
		controller : 'listProvinsiCtrl'
	}).when('/provinsi-detail/:id', {
		templateUrl : 'views/partials/provinsi/detailProvinsi.html',
		controller : 'detailProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-edit/:id', {
		templateUrl : 'views/partials/provinsi/editProvinsi.html',
		controller : 'editProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-delete/:id', {
		controller : 'deleteProvinsiCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/provinsi-form', {
		templateUrl : 'views/partials/provinsi/formProvinsi.html',
		controller : 'addProvinsiCtrl'
	});
});

angular.module('raportApp').controller('addProvinsiCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.submit = function() {
		var request = {
			url: '/provinsi',
			method: 'POST',
			data: $scope.provinsi
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/provinsi-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	};
});

angular.module('raportApp').controller('listProvinsiCtrl', function($scope, $http,    $log) {
	$scope.items = [];
	var request = {
		url : '/provinsi',
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

angular.module('raportApp').controller('detailProvinsiCtrl', function($scope, $http, $log, $mdDialog, $mdMedia, id) {
	$scope.provinsi = [];
	var request = {
		url : '/provinsi/' + id ,
		method : 'GET'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.provinsi = response.data;
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
			templateUrl: 'views/partials/provinsi/detailProvinsi.html',
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

angular.module('raportApp').controller('deleteProvinsiCtrl', function($scope, $http, $log, id) {
	$scope.provinsi = [];
	var request = {
		url : '/provinsi/' + id ,
		method : 'DELETE'
	};
	var successHandler = function(response) {
		$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
		$scope.provinsi = response.data;
		window.location = "/#/provinsi-list";
	};
	var errorHandler = function(errors) {
		$log.error(angular.toJson(errors, true));
	};
	$http(request).then(successHandler, errorHandler);
});

angular.module('raportApp').controller('updateProvinsiCtrl', function($scope, $http, $log) {
	$scope.raport = {};
	
	$scope.update = function(id) {
		var request = {
			url: '/provinsi/' + id,
			method: 'PUT',
			data: $scope.provinsi
		};
		var successHandler = function(response) {
			$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
			window.location = "/#/provinsi-list";
		};
		var errorHandler = function(errors) {
			$log.error('Errors :\n' + angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
						
	};
});

angular.module('raportApp').controller('editProvinsiCtrl', function($scope, $http, $log, id) {
	$scope.provinsi = [];
	
	var request = {
			url : '/provinsi/' + id ,
			method : 'GET'
		};
		var successHandler = function(response) {
			$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
			$scope.provinsi = response.data;
		};
		var errorHandler = function(errors) {
			$log.error(angular.toJson(errors, true));
		};
		$http(request).then(successHandler, errorHandler);
	
});

angular.module('raportApp').controller('showAddFormCtrl', function($scope, $mdDialog, $mdMedia){
	$scope.status = '';
	$scope.showAddForm = function(ev){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) &&  $scope.customFullscreen;
		$mdDialog.show({
			controller: DialogForm,
			templateUrl: 'views/partials/provinsi/formProvinsi.html',
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