package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.MataPelajaran;

public interface MataPelajaranRepository extends JpaRepository<MataPelajaran, Long>{
	@Query("SELECT mataPelajaran FROM MataPelajaran mataPelajaran WHERE LOWER(mataPelajaran.namaMatpel) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<MataPelajaran> findBySearch(@Param("search") String searchField, Pageable pageable);
}
