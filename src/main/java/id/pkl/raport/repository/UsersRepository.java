package id.pkl.raport.repository;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import id.pkl.raport.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	@Query("SELECT users FROM Users users WHERE LOWER(users.username) LIKE LOWER(CONCAT('%', :search, '%'))"
			+ "OR LOWER(users.password) LIKE LOWER(CONCAT('%', :search, '%'))")
	Page<Users> findBySearch(@Param("search") String searchField, Pageable pageable);
}
