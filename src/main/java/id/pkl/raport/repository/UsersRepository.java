package id.pkl.raport.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import id.pkl.raport.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {

}
