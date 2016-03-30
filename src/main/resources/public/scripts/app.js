'use strict';
		
		var app = angular.module('raportApp', ['ngRoute', 'ngMaterial', 'ui.router', 'md.data.table', 'ngMdIcons', 'ngMenuSidenav', 'ngResource'])
		.controller('raportApp', function($scope, $location, $timeout, $mdSidenav, $log){
			$scope.menu = [
			               {
			                 link : '/#/provinsi-list',
			                 title: 'Provinsi',
			                 icon: 'dashboard'
			               },
			               {
			                 link : '/#/kabupaten-list',
			                 title: 'Kabupaten',
			                 icon: 'group'
			               },
			               {
			                 link : '/#/kecamatan-list',
			                 title: 'Kecamatan',
			                 icon: 'message'
			               },
			               {
				                 link : '/#/absensi-siswa-list',
				                 title: 'Absensi Siswa',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/guru-list',
				                 title: 'Guru',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/hari-libur-list',
				                 title: 'Hari Libur',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/kelas-list',
				                 title: 'Kelas',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/kelas-siswa-list',
				                 title: 'Kelas Siswa',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/kompetensi-dasar-list',
				                 title: 'Kompetensi Dasar',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/kompetensi-inti-list',
				                 title: 'Kompetensi Inti',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/matapelajaran-list',
				                 title: 'Mata Pelajaran',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/materi-pokok-list',
				                 title: 'Materi Pokok',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/sekolah-list',
				                 title: 'Sekolah',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/siswa-list',
				                 title: 'Siswa',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/tahun-ajaran-list',
				                 title: 'Tahun Ajaran',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/tingkat-list',
				                 title: 'Tingkat',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/user-list',
				                 title: 'User',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/user-role-list',
				                 title: 'Role',
				                 icon: 'group'
				           },
				           {
				                 link : '/logout',
				                 title: 'Logout',
				                 icon: 'logout'
				           },
			             ];

			
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
		
		
		

		