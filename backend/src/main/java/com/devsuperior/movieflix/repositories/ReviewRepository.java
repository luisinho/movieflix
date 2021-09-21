package com.devsuperior.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("SELECT obj FROM Review obj INNER JOIN obj.movie mv "
			+ "WHERE mv.id = :movieId ")
	Page<Review> find(@Param("movieId") Long movieId, Pageable pageable);
}
