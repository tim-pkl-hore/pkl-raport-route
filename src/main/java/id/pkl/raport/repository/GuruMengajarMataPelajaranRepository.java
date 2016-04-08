package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.GuruMengajarMataPelajaraId;
import id.pkl.raport.entity.GuruMengajarMataPelajaran;

public interface GuruMengajarMataPelajaranRepository extends JpaRepository<GuruMengajarMataPelajaran, GuruMengajarMataPelajaraId> {
	@Query("SELECT guruMengajarMataPelajaran FROM GuruMengajarMataPelajaran guruMengajarMataPelajaran WHERE LOWER(id.guruId) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<GuruMengajarMataPelajaran> findBySearch(@Param("search") String searchField, Pageable pageable);

	
}
