package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Kelas;
import id.pkl.raport.entity.KelasSiswa;

public interface KelasRepository extends JpaRepository<Kelas, Long> {
	@Query("SELECT kelas FROM Kelas kelas WHERE LOWER(kelas.grupKelas.grupKelas) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(kelas.waliKelas.nama) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Kelas> findBySearch(@Param("search") String searchField, Pageable pageable);
	
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa JOIN kelasSiswa.siswa siswa WHERE kelasSiswa.kelas.id = :kelasId")
	Page<KelasSiswa> findByKelasSiswaId(@Param("kelasId") Long kelasId, Pageable pageable);
}
