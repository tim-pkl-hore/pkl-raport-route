'use strict';
		
		var app = angular.module('raportApp', ['ngRoute', 'ngMaterial', 'ui.router', 'md.data.table', 'ngMdIcons', 'ngMenuSidenav', 'ngResource'] )
		.controller('raportApp', function($scope, $location, $timeout, $mdSidenav, $log){
			$scope.provinsi = '/#/provinsi-list';
			$scope.kabupaten = '/#/kabupaten-list';
			$scope.kecamatan = '/#/kecamatan-list';
			$scope.absensiSiswa = '/#/absensi-siswa-list';
			$scope.guru = '/#/guru-list';
			$scope.hariLibur = '/#/hari-libur-list';
			$scope.kelas = '/#/kelas-list';
			$scope.kelasSiswa = '/#/kelas-siswa-list';
			$scope.kompetensiDasar = '/#/kompetensi-dasar-list';
			$scope.kompetensiInti = '/#/kompetensi-inti-list';
			$scope.mataPelajaran = '/#/matapelajaran-list';
			$scope.materiPokok = '/#/materi-pokok-list';
			$scope.sekolah = '/#/sekolah-list';
			$scope.siswa = '/#/siswa-list';
			$scope.tahunAjaran = '/#/tahun-ajaran-list';
			$scope.tingkat = '/#/tingkat-list';
			$scope.jurusan = '/#/jurusan-list';
			$scope.user = '/#/user-list';
			$scope.role = '/#/user-role-list';
			$scope.logout = '/logout';
			
			$scope.toggleLeft = buildDelayedToggler('left');
		    $scope.toggleRight = buildToggler('right');
		    $scope.isOpenRight = function(){
		      return $mdSidenav('right').isOpen();
		    };
		    /**
		     * Supplies a function that will continue to operate until the
		     * time is up.
		     */
		    function debounce(func, wait, context) {
		      var timer;
		      return function debounced() {
		        var context = $scope,
		            args = Array.prototype.slice.call(arguments);
		        $timeout.cancel(timer);
		        timer = $timeout(function() {
		          timer = undefined;
		          func.apply(context, args);
		        }, wait || 10);
		      };
		    }
		    /**
		     * Build handler to open/close a SideNav; when animation finishes
		     * report completion in console
		     */
		    function buildDelayedToggler(navID) {
		      return debounce(function() {
		        $mdSidenav(navID)
		          .toggle()
		          .then(function () {
		            $log.debug("toggle " + navID + " is done");
		          });
		      }, 200);
		    }
		    function buildToggler(navID) {
		      return function() {
		        $mdSidenav(navID)
		          .toggle()
		          .then(function () {
		            $log.debug("toggle " + navID + " is done");
		          });
		      }
		    }
		  })
		  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
		    $scope.close = function () {
		      $mdSidenav('left').close()
		        .then(function () {
		          $log.debug("close LEFT is done");
		        });
		    };
		  })
		  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
		    $scope.close = function () {
		      $mdSidenav('right').close()
		        .then(function () {
		          $log.debug("close RIGHT is done");
		        });
		    };
		    
		
			
		});
		
		
		

		