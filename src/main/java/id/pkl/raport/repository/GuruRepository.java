package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Guru;

public interface GuruRepository extends JpaRepository<Guru, Long>{
	
	@Query("SELECT guru FROM Guru guru WHERE LOWER(guru.nama) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(guru.email)"
			+ "LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(guru.alamat) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(guru.telp) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(guru.nip) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Guru> findBySearch(@Param("search") String searchField, Pageable pageable);
}
