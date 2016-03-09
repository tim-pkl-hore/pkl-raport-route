angular.module('raportApp').controller(
		'logoutCtrl',
		function($scope, $http, $log) {
			$scope.logout = function() {
				var request = {
					url : '/logout',
					method : 'POST',
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/signin"
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});