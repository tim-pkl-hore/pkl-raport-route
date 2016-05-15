//package id.pkl.raport.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import id.pkl.raport.entity.AbsensiSiswa;
//
//public interface AbsensiSiswaRepository extends JpaRepository<AbsensiSiswa, Long>{
//	@Query("SELECT absensiSiswa FROM AbsensiSiswa absensiSiswa WHERE LOWER(absensiSiswa.alasan) LIKE LOWER(CONCAT('%', :search, '%'))")
//	Page<AbsensiSiswa> findBySearch(@Param("search") String searchField, Pageable pageable);
//
//}
