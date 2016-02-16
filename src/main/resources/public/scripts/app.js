'use strict';
		
		var app = angular.module('raportApp', ['ngRoute']);
		
		angular.module('raportApp')
			.config(function($routeProvider){
				$routeProvider.when('/provinsi', {
					templateUrl: '/views/partials/getProvinsi.html',
					controller: 'provinsiCtrl'
				}).when('/provinsi-list', {
					templateUrl: 'views/partials/provinsi/listProvinsi.html',
					controller: 'listProvinsiCtrl'
				}).when('/provinsi-detail/:id', {
					templateUrl: 'views/partials/provinsi/detailProvinsi.html',
					controller: 'detailProvinsiCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/provinsi-form', {
					templateUrl: 'views/partials/provinsi/formProvinsi.html',
					controller: 'addProvinsiCtrl'
				}).when('/kabupaten-list', {
					templateUrl: 'views/partials/kabupaten/listKabupaten.html',
					controller: 'listKabupatenCtrl'
				}).when('/kabupaten-form', {
					templateUrl: 'views/partials/kabupaten/formKabupaten.html',
					controller: 'addKabupatenCtrl'
				}).when('/kabupaten-detail/:id', {
					templateUrl: 'views/partials/kabupaten/detailKabupaten.html',
					controller: 'detailKabupatenCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kecamatan-list', {
					templateUrl: 'views/partials/kecamatan/listKecamatan.html',
					controller: 'listKecamatanCtrl'
				}).when('/kecamatan-detail/:id', {
					templateUrl: 'views/partials/kecamatan/detailKecamatan.html',
					controller: 'detailKecamatanCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kecamatan-form', {
					templateUrl: 'views/partials/kecamatan/formKecamatan.html',
					controller: 'addKecamatanCtrl'
				}).when('/matapelajaran-list', {
					templateUrl: 'views/partials/mataPelajaran/listMataPelajaran.html',
					controller: 'listMatpel'
				}).when('/matapelajaran-form', {
					templateUrl: 'views/partials/mataPelajaran/formMataPelajaran.html',
					controller: 'addMatpelCtrl'
				}).when('/matapelajaran-detail/:id', {
					templateUrl: 'views/partials/mataPelajaran/detailMataPelajaran.html',
					controller: 'detailMatpelCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/siswa-list', {
					templateUrl: 'views/partials/siswa/listSiswa.html',
					controller: 'listSiswaCtrl'
				}).when('/siswa-detail/:id', {
					templateUrl: 'views/partials/siswa/detailSiswa.html',
					controller: 'detailSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/siswa-form', {
					templateUrl: 'views/partials/siswa/formSiswa.html',
					controller: 'addSiswaCtrl'
				}).when('/sekolah-list', {
					templateUrl: 'views/partials/sekolah/listSekolah.html',
					controller: 'listSekolahCtrl'
				}).when('/sekolah-detail/:id', {
					templateUrl: 'views/partials/sekolah/detailSekolah.html',
					controller: 'detailSekolahCtrl',
					resolve:{
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/sekolah-form', {
					templateUrl: 'views/partials/sekolah/formSekolah.html',
					controller: 'addSekolahCtrl'
				}).when('/guru-list', {
					templateUrl: 'views/partials/guru/listGuru.html',
					controller: 'listGuruCtrl'
				}).when('/guru-detail/:id', {
					templateUrl: 'views/partials/guru/detailGuru.html',
					controller: 'detailGuruCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/guru-form', {
					templateUrl: 'views/partials/guru/formGuru.html',
					controller: 'addGuruCtrl'
				});
			});

		app.controller('listProvinsiCtrl', function($scope, $http,    $log) {
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
		
		app.controller('detailProvinsiCtrl', function($scope, $http, $log, id) {
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
		
		app.controller('listKabupatenCtrl', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/kabupaten',
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
		
		app.controller('detailKabupatenCtrl', function($scope, $http, $log, id) {
			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listKecamatanCtrl', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/kecamatan',
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
		
		app.controller('detailKecamatanCtrl', function($scope, $http, $log, id) {
			$scope.kecamatan = [];
			var request = {
				url : '/kecamatan/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kecamatan = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listSiswaCtrl', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/siswa',
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
		
		app.controller('detailSiswaCtrl', function($scope, $http, $log, id) {
			$scope.siswa = [];
			var request = {
				url : '/siswa/' + id ,
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
		});
		
		
		app.controller('listMatpel', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/matapelajaran',
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
		
		app.controller('detailMatpelCtrl', function($scope, $http, $log, id) {
			$scope.mata_pelajaran = [];
			var request = {
				url : '/matapelajaran/' + id ,
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
		});
		
		app.controller('listSekolahCtrl', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/sekolah',
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
		
		app.controller('detailSekolahCtrl', function($scope, $http, $log, id) {
			$scope.sekolah = [];
			var request = {
				url : '/sekolah/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.sekolah = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listGuruCtrl', function($scope, $http,    $log) {
			$scope.items = [];
			var request = {
				url : '/guru',
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
		
		app.controller('detailGuruCtrl', function($scope, $http, $log, id) {
			$scope.guru = [];
			var request = {
				url : '/guru/' + id ,
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
		});
		
		app.controller('addProvinsiCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.submit = function() {
				var request = {
					url: '/provinsi',
					method: 'POST',
					data: $scope.provinsi
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addKabupatenCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.provinsi = [];
			var request = {
				url : '/provinsi/all',
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
			
			$scope.submit = function() {
				var request = {
					url: '/kabupaten',
					method: 'POST',
					data: $scope.kabupaten
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addKecamatanCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.submit = function() {
				var request = {
					url: '/kecamatan',
					method: 'POST',
					data: $scope.kecamatan
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addMatpelCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.submit = function() {
				var request = {
					url: '/matapelajaran',
					method: 'POST',
					data: $scope.mata_pelajaran
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addSiswaCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.sekolah = [];
			var request = {
				url : '/sekolah/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.sekolah = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.submit = function() {
				var request = {
					url: '/siswa',
					method: 'POST',
					data: $scope.siswa
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addSekolahCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.kecamatan = [];
			var request = {
				url : '/kecamatan/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kecamatan = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.kabupaten = [];
			var request = {
				url : '/kabupaten/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kabupaten = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.provinsi = [];
			var request = {
				url : '/provinsi/all',
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
			
			$scope.submit = function() {
				var request = {
					url: '/sekolah',
					method: 'POST',
					data: $scope.sekolah
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		
		app.controller('addGuruCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.submit = function() {
				var request = {
					url: '/guru',
					method: 'POST',
					data: $scope.guru
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n' + angular.toJson(response.data, true));
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});
		