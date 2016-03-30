'use strict';
angular.module('raportApp')
	.factory('ProvinsiService', function($resource){
		return $resource('/provinsi/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KabupatenService', function($resource){
		return $resource('/kabupaten/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KecamatanService', function($resource){
		return $resource('/kecamatan/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('AbsensiSiswaService', function($resource){
		return $resource('/absensi-siswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('GuruService', function($resource){
		return $resource('/guru/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('HariLiburService', function($resource){
		return $resource('/hari-libur/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KelasService', function($resource){
		return $resource('/kelas/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KelasSiswaService', function($resource){
		return $resource('/kelasSiswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KompetensiDasarService', function($resource){
		return $resource('/kompetensi-dasar/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('KompetensiIntiService', function($resource){
		return $resource('/kompetensi-inti/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('MataPelajaranService', function($resource){
		return $resource('/matapelajaran/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('MateriPokokService', function($resource){
		return $resource('/materi-pokok/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('SekolahService', function($resource){
		return $resource('/sekolah/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('SiswaService', function($resource){
		return $resource('/siswa/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('TahunAjaranService', function($resource){
		return $resource('/tahun-ajaran/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('TingkatService', function($resource){
		return $resource('/tingkat/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	.factory('RoleService', function($resource){
		return $resource('/user-role/:id', {}, {
			get: {method: 'GET'},
			create: {method: 'POST'},
			update: {method: 'PUT', params: {id: '@id'}},
			delete: {method: 'DELETE', params: {id: '@id'}}
		})
	})
	;