package id.pkl.raport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import id.pkl.raport.entity.Role;
import id.pkl.raport.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

}
