/*package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Kkm;

public interface KkmRepository extends JpaRepository<Kkm, Long> {
	@Query("SELECT kkm FROM Kkm kkm WHERE LOWER(kkm.kkm) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Kkm> findBySearch(@Param("search") String searchField, Pageable pageable);

}
*/