package com.devsuperior.movieflix.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	long countByEmailIgnoreCase(String email);

	long countByCodeRequestPassword(String codeRequestPassword);

	User findByEmailAndCodeRequestPasswordAndActive(String email, String codeRequestPassword, boolean active);
}