package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Siswa;

public interface SiswaRepository extends JpaRepository<Siswa, Long>{
	@Query("SELECT siswa FROM Siswa siswa WHERE LOWER(siswa.namaSiswa) LIKE LOWER(CONCAT('%', :search, '%')) "
			+ "OR LOWER(siswa.nisn) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.tempatLahir) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.alamatSiswa) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.namaAyah) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.namaIbu) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.alamatOrtu) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.pekerjaanIbu) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.pekerjaanAyah) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.namaWali) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.alamatWali) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(siswa.pekerjaanWali) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Siswa> findBySearch(@Param("search") String searchField, Pageable pageable);
}
