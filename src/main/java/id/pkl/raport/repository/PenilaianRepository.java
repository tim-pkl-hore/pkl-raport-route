package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Penilaian;

public interface PenilaianRepository extends JpaRepository<Penilaian, Long> {
	@Query("SELECT penilaian FROM Penilaian penilaian WHERE LOWER(penilaian.nilai) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(penilaian.kkm) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Penilaian> findBySearch(@Param("search") String searchField, Pageable pageable);
}
