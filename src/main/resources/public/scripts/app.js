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
				}).when('/provinsi-edit/:id', {
					templateUrl: 'views/partials/provinsi/editProvinsi.html',
					controller: 'editProvinsiCtrl',
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
				}).when('/tahun-ajaran-list', {
					templateUrl: 'views/partials/tahunAjaran/listTahunAjaran.html',
					controller: 'listTahunAjaranCtrl'
				}).when('/tahun-ajaran-detail/:id', {
					templateUrl: 'views/partials/tahunAjaran/detailTahunAjaran.html',
					controller: 'detailTahunAjaranCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/tahun-ajaran-form', {
					templateUrl: 'views/partials/tahunAjaran/formTahunAjaran.html',
					controller: 'addTahunAjaranCtrl'
				}).when('/kompetensi-inti-list',{
					templateUrl: 'views/partials/kompetensiInti/listKompetensiInti.html',
					controller: 'listKompetensiIntiCtrl'
				}).when('/kompetensi-inti-detail/:id', {
					templateUrl: 'views/partials/kompetensiInti/detailKompetensiInti.html',
					controller: 'detailKompetensiIntiCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-inti-form', {
					templateUrl: 'views/partials/kompetensiInti/formKompetensiInti.html',
					controller: 'addKompetensiIntiCtrl'
				}).when('/kompetensi-dasar-list',{
					templateUrl: 'views/partials/kompetensiDasar/listKompetensiDasar.html',
					controller: 'listKompetensiDasarCtrl'
				}).when('/kompetensi-dasar-detail/:id', {
					templateUrl: 'views/partials/kompetensiDasar/detailKompetensiDasar.html',
					controller: 'detailKompetensiDasarCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kompetensi-dasar-form', {
					templateUrl: 'views/partials/kompetensiDasar/formKompetensiDasar.html',
					controller: 'addKompetensiDasarCtrl'
				}).when('/materi-pokok-list',{
					templateUrl: 'views/partials/materiPokok/listMateriPokok.html',
					controller: 'listMateriPokokCtrl'
				}).when('/materi-pokok-detail/:id', {
					templateUrl: 'views/partials/materiPokok/detailMateriPokok.html',
					controller: 'detailMateriPokokCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/materi-pokok-form', {
					templateUrl: 'views/partials/materiPokok/formMateriPokok.html',
					controller: 'addMateriPokokCtrl'
				}).when('/kelas-siswa-list',{
					templateUrl: 'views/partials/kelasSiswa/listKelasSiswa.html',
					controller: 'listKelasSiswaCtrl'
				}).when('/kelas-siswa-detail/:id', {
					templateUrl: 'views/partials/kelasSiswa/detailKelasSiswa.html',
					controller: 'detailKelasSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-siswa-form', {
					templateUrl: 'views/partials/kelasSiswa/formKelasSiswa.html',
					controller: 'addKelasSiswaCtrl'
				}).when('/kelas-list',{
					templateUrl: 'views/partials/kelas/listKelas.html',
					controller: 'listKelasCtrl'
				}).when('/kelas-detail/:id', {
					templateUrl: 'views/partials/kelas/detailKelas.html',
					controller: 'detailKelasCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/kelas-form', {
					templateUrl: 'views/partials/kelas/formKelas.html',
					controller: 'addKelasCtrl'
				}).when('/hari-libur-list',{
					templateUrl: 'views/partials/hariLibur/listHariLibur.html',
					controller: 'listHariLiburCtrl'
				}).when('/hari-libur-detail/:id', {
					templateUrl: 'views/partials/hariLibur/detailHariLibur.html',
					controller: 'detailHariLiburCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/hari-libur-form', {
					templateUrl: 'views/partials/hariLibur/formHariLibur.html',
					controller: 'addHariLiburCtrl'
				}).when('/absensi-siswa-list',{
					templateUrl: 'views/partials/absensiSiswa/listAbsensiSiswa.html',
					controller: 'listAbsensiSiswaCtrl'
				}).when('/absensi-siswa-detail/:id', {
					templateUrl: 'views/partials/absensiSiswa/detailAbsensiSiswa.html',
					controller: 'detailAbsensiSiswaCtrl',
					resolve: {
						'id': function($route){
							return $route.current.params.id;
						}
					}
				}).when('/absensi-siswa-form', {
					templateUrl: 'views/partials/absensiSiswa/formAbsensiSiswa.html',
					controller: 'addAbsensiSiswaCtrl'
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
		
		app.controller('editProvinsiCtrl', function($scope, $http, $log, id) {
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
		
		app.controller('listTahunAjaranCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/tahun-ajaran',
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
		
		app.controller('detailTahunAjaranCtrl', function($scope, $http, $log, id) {
			$scope.tahun_ajaran = [];
			var request = {
				url : '/tahun-ajaran/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.tahun_ajaran = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listKompetensiIntiCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/kompetensi-inti',
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
		
		app.controller('detailKompetensiIntiCtrl', function($scope, $http, $log, id) {
			$scope.kompetensi_inti = [];
			var request = {
				url : '/kompetensi-inti/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kompetensi_inti = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listMateriPokokCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/materi-pokok',
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
		
		app.controller('detailMateriPokokCtrl', function($scope, $http, $log, id) {
			$scope.materi_pokok = [];
			var request = {
				url : '/materi-pokok/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.materi_pokok = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listKelasSiswaCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/kelas-siswa',
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
		
		app.controller('detailKelasSiswaCtrl', function($scope, $http, $log, id) {
			$scope.kelas_siswa = [];
			var request = {
				url : '/kelas-siswa/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kelas_siswa = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listKelasCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/kelas',
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
		
		app.controller('detailKelasCtrl', function($scope, $http, $log, id) {
			$scope.kelas = [];
			var request = {
				url : '/kelas/' + id ,
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
		});
		
		app.controller('listHariLiburCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/hari-libur',
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
		
		app.controller('detailHariLiburCtrl', function($scope, $http, $log, id) {
			$scope.hari_libur = [];
			var request = {
				url : '/hari-libur/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.hari_libur = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
		});
		
		app.controller('listAbsensiSiswaCtrl', function($scope, $http, $log) {
			$scope.items = [];
			var request = {
				url : '/absensi-siswa',
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
		
		app.controller('detailAbsensiSiswaCtrl', function($scope, $http, $log, id) {
			$scope.absensi_siswa = [];
			var request = {
				url : '/absensi-siswa/' + id ,
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.absensi_siswa = response.data;
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
		
		app.controller('updateProvinsiCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.update = function(id) {
				var request = {
					url: '/provinsi/' + id,
					method: 'PUT',
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
		
		app.controller('addTahunAjaranCtrl', function($scope, $http, $log) {
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
					url: '/tahun-ajaran',
					method: 'POST',
					data: $scope.tahun_ajaran
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
		
		app.controller('addKompetensiIntiCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.tahun_ajaran = [];
			var request = {
				url : '/tahun-ajaran/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.tahun_ajaran = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.mata_pelajaran = [];
			var request = {
				url : '/matapelajaran/all',
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
			
			$scope.submit = function() {
				var request = {
					url: '/kompetensi-inti',
					method: 'POST',
					data: $scope.kompetensi_inti
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
		
		app.controller('addKompetensiDasarCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.kompetensi_inti = [];
			var request = {
				url : '/kompetensi-inti/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kompetensi_inti = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.mata_pelajaran = [];
			var request = {
				url : '/matapelajaran/all',
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
			
			$scope.submit = function() {
				var request = {
					url: '/kompetensi-dasar',
					method: 'POST',
					data: $scope.kompetensi_dasar
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
		
		app.controller('addMateriPokokCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.kompetensi_dasar = [];
			var request = {
				url : '/kompetensi-dasar/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kompetensi_dasar = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
						
			$scope.submit = function() {
				var request = {
					url: '/materi-pokok',
					method: 'POST',
					data: $scope.materi_pokok
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
		
		app.controller('addKelasSiswaCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
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
						
			$scope.submit = function() {
				var request = {
					url: '/kelas-siswa',
					method: 'POST',
					data: $scope.kelas_siswa
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
		
		app.controller('addKelasCtrl', function($scope, $http, $log) {
			$scope.raport = {};
			
			$scope.tahun_ajaran = [];
			var request = {
				url : '/tahun-ajaran/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.tahun_ajaran = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
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
						
			$scope.submit = function() {
				var request = {
					url: '/kelas',
					method: 'POST',
					data: $scope.kelas
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
		
		app.controller('addHariLiburCtrl', function($scope, $http, $log) {
			$scope.raport = {};
						
			$scope.submit = function() {
				var request = {
					url: '/hari-libur',
					method: 'POST',
					data: $scope.hari_libur
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
		
		app.controller('addAbsensiSiswaCtrl', function($scope, $http, $log) {
			$scope.raport = {};
						
			$scope.tahun_ajaran = [];
			var request = {
				url : '/tahun-ajaran/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.tahun_ajaran = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
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
			
			$scope.kelas_siswa = [];
			var request = {
				url : '/kelas-siswa/all',
				method : 'GET'
			};
			var successHandler = function(response) {
				$log.debug("Response data dari server : \n" + angular.toJson(response.data, true));
				$scope.kelas_siswa = response.data;
			};
			var errorHandler = function(errors) {
				$log.error(angular.toJson(errors, true));
			};
			$http(request).then(successHandler, errorHandler);
			
			$scope.submit = function() {
				var request = {
					url: '/absensi-siswa',
					method: 'POST',
					data: $scope.absensi_siswa
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
		