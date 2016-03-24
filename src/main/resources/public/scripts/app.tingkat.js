angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/tingkat-list', {
		templateUrl : 'views/partials/tingkat/listTingkat.html',
		controller : 'listTingkatCtrl'
	}).when('/tingkat-detail/:id', {
		templateUrl : 'views/partials/tingkat/detailTingkat.html',
		controller : 'detailTingkatCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tingkat-edit/:id', {
		templateUrl : 'views/partials/tingkat/editTingkat.html',
		controller : 'editTingkatCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tingkat-delete/:id', {
		controller : 'deleteTingkatCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/tingkat-form', {
		templateUrl : 'views/partials/tingkat/formTingkat.html',
		controller : 'addTingkatCtrl'
	});
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