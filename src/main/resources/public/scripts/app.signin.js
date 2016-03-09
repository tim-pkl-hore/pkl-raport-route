angular.module('raportApp').controller(
		'SignInCtrl',
		function($scope, $http, $log) {
			$scope.logout = function() {
				var request = {
					url : '/pengguna',
					method : 'POST',
				};
				var successHandler = function(response) {
					$log.debug('Response data dari server : \n'
							+ angular.toJson(response.data, true));
					window.location = "/"
				};
				var errorHandler = function(errors) {
					$log.error('Errors :\n' + angular.toJson(errors, true));
				};
				$http(request).then(successHandler, errorHandler);
			};
		});