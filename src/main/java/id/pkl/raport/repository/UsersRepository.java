package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	@Query("SELECT users FROM Users users WHERE LOWER(users.username) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(users.password) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Users> findBySearch(@Param("search") String searchField, Pageable pageable);
}
