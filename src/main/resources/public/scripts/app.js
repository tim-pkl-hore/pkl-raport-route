'use strict';
		
		var app = angular.module('raportApp', ['ngRoute', 'ngMaterial', 'ui.router', 'md.data.table', 'ngMdIcons', 'ngMenuSidenav', 'ngResource'])
		.controller('raportApp', function($scope, $location, $timeout, $mdSidenav, $log){
			$scope.menu = [
			               {
				                 link : '/#/absensi/siswa/list',
				                 title: 'Data Absensi Siswa',
				                 icon: 'assignment_turned_in',
				                 title2: 'List Absensi Siswa'
				           },
				           {
				                 link : '/#/guru/list',
				                 title: 'Data Guru',
				                 icon: 'people'
				           },
				           
				           {
				                 link : '/#/kelas/list',
				                 title: 'Data Kelas',
				                 icon: 'people'
				           },
				           {
				                 link : '/#/kelas/siswa/list',
				                 title: 'Data Kelas Siswa',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/guru/mengajar/list',
				                 title: 'Data Pengajar',
				                 icon: 'group'
				           },
				           				          
				           {
				                 link : '/#/mata/pelajaran/list',
				                 title: 'Data Mata Pelajaran',
				                 icon: 'group'
				           },
				          
				           {
				                 link : '/#/siswa/list',
				                 title: 'Data Siswa',
				                 icon: 'person'
				           },
				           
				           {
				                 link : '/#/penilaian/list',
				                 title: 'Penilaian Siswa',
				                 icon: 'spellcheck'
				           },
				           
				           {
				                 link : '/#/user/list',
				                 title: 'User',
				                 icon: 'group'
				           },
				           {
				                 link : '/#/user/role/list',
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
		
		
		

		