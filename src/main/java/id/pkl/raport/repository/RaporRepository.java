package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Penilaian;
import id.pkl.raport.entity.Rapor;

public interface RaporRepository extends JpaRepository<Rapor, Long>{
	@Query("SELECT penilaian FROM Penilaian penilaian JOIN penilaian.kelasSiswa.siswa siswa WHERE siswa.id = :siswaId")
	Page<Penilaian> findBySiswaId(@Param("siswaId") Long siswaId, Pageable pageable);

}
