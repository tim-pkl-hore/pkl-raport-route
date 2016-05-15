'use strict';
		
		var app = angular.module('raportApp', ['ngRoute', 'ngMaterial', 'ui.router', 'md.data.table', 'ngMdIcons', 'ngMenuSidenav', 'ngResource', 'ngMessages', 'tableSort'])
		.controller('raportApp', function($scope, $location, $timeout, $mdSidenav, $log, $mdToast){
			$scope.toggleSidenav = function(menu) {
			    $mdSidenav(menu).toggle();
			  }
			  $scope.toast = function(message) {
			    var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
			    $mdToast.show(toast);
			  };
			  $scope.toastList = function(message) {
			    var toast = $mdToast.simple().content('You clicked ' + message + ' having selected ' + $scope.selected.length + ' item(s)').position('bottom right');
			    $mdToast.show(toast);
			  };
			  $scope.selected = [];
			  $scope.toggle = function(item, list) {
			    var idx = list.indexOf(item);
			    if (idx > -1) list.splice(idx, 1);
			    else list.push(item);
			  };
			  $scope.data = {
			    title: 'SMP NEGERI 10 KOTA BOGOR',
			    user: {
			      name: 'Rapor SMP Negeri 10 Kota Bogor',
			      icon: 'school'
			    },
			    toolbar: {
			      buttons: [{
			        name: 'Button 1',
			        icon: 'add',
			        link: 'Button 1'
			      }],
			      menus: [{
			        name: 'Menu 1',
			        icon: 'message',
			        width: '4',
			        actions: [{
			          name: 'Action 1',
			          message: 'Action 1',
			          completed: true,
			          error: true
			        }, {
			          name: 'Action 2',
			          message: 'Action 2',
			          completed: false,
			          error: false
			        }, {
			          name: 'Action 3',
			          message: 'Action 3',
			          completed: true,
			          error: true
			        }]
			      }]
			    },
			    sidenav: {
			      sections: [{
			        name: 'Data Kelas',
			        link: '/#/kelas/list',
			        icon: 'room'
			      }, {
			    	  name: 'Data Siswa',
				        link: '/#/siswa/list',
				        icon: 'people'
			      },{
			    	  name: 'Data Guru',
				        link: '/#/guru/list',
				        icon: 'people'
			      },
			      {
			    	  name: 'Penilaian',
				        link: '/#/penilaian/list',
				        icon: 'spellcheck'
			      },{
			    	  name: 'Rapor',
				        link: '/#/rapor/list',
				        icon: 'my_library_books'
			      }]
			    },
			    content: {
			      lists: [{
			        name: 'List 1',
			        menu: {
			          name: 'Menu 1',
			          icon: 'settings',
			          width: '4',
			          actions: [{
			            name: 'Action 1',
			            message: 'Action 1',
			            completed: true,
			            error: true
			          }]
			        },
			        items: [{
			          name: 'Item 1',
			          description: 'Description 1',
			          link: 'Item 1'
			        }, {
			          name: 'Item 2',
			          description: 'Description 2',
			          link: 'Item 2'
			        }, {
			          name: 'Item 3',
			          description: 'Description 3',
			          link: 'Item 3'
			        }]
			      }]
			    }
			  }
			$scope.menu = [
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
				                 link : '/#/rapor/list',
				                 title: 'Rapor Siswa',
				                 icon: 'my_library_books'
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
			$scope.index = 0;

		    $scope.toggleSidenav = function (menuId) {
		        $mdSidenav(menuId).toggle();
		    };
			
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
		
		
		

		