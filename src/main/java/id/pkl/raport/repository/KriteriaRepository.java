package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Kriteria;

public interface KriteriaRepository extends JpaRepository<Kriteria, Long>{
	@Query("SELECT kriteria FROM Kriteria kriteria WHERE LOWER(kriteria.namaKriteria) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Kriteria> findBySearch(@Param("search") String searchField, Pageable pageable);
}
