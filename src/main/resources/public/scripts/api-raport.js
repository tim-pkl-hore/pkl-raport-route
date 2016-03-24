'use strict';
angular.module('raportApp')
	.factory('KabupatenService', function($resource){
		return $resource('/kabupaten/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	});