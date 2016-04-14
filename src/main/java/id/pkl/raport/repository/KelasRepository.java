package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Kelas;

public interface KelasRepository extends JpaRepository<Kelas, Long> {
	@Query("SELECT kelas FROM Kelas kelas WHERE LOWER(kelas.tingkat.tingkat) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(kelas.tahunAjaran.tahunAwal) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(kelas.tahunAjaran.tahunAkhir) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(kelas.grupKelas.grupKelas) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(kelas.waliKelas.nama) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Kelas> findBySearch(@Param("search") String searchField, Pageable pageable);
}
