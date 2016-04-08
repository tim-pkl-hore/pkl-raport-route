package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.GrupKelas;
import id.pkl.raport.entity.KelasSiswa;

public interface KelasSiswaRepository extends JpaRepository<KelasSiswa, Long>{
	@Query("SELECT kelasSiswa FROM KelasSiswa kelasSiswa WHERE LOWER(kelasSiswa.siswa) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<KelasSiswa> findBySearch(@Param("search") String searchField, Pageable pageable);
}
