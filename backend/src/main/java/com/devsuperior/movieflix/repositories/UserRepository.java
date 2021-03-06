package com.devsuperior.movieflix.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u WHERE u.active = true")
	Page<User> listAllUser(Pageable pageable);

	Optional<User> findByEmail(String email);

	long countByEmailIgnoreCase(String email);

	long countByCodeRequestPassword(String codeRequestPassword);

	User findByEmailAndCodeRequestPasswordAndActive(String email, String codeRequestPassword, boolean active);

	Page<User> findByEmailLike(String email, Pageable pageable);

	Page<User> findByNameLike(String email, Pageable pageable);

	Page<User> findByActiveTrue(Pageable pageable);

	Page<User> findByActiveFalse(Pageable pageable);
}