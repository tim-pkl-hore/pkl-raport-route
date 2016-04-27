package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.KelasSiswa;

public interface KelasSiswaRepository extends JpaRepository<KelasSiswa, Long>{
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa WHERE LOWER(kelasSiswa.siswa.namaSiswa) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<KelasSiswa> findBySearch(@Param("search") String searchField, Pageable pageable);
	
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa WHERE kelasSiswa.kelas.id = :kelasId ")
	Iterable<KelasSiswa> findByKelasId(@Param("kelasId") Long kelasId);
	
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa WHERE kelasSiswa.kelas.id = :kelasId AND kelasSiswa.siswa.id = :siswaId ")
	KelasSiswa findByKelasIdSiswaId(@Param("kelasId") Long kelasId, @Param("siswaId") Long siswaId);
}
