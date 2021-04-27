package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findByMovie(Long idMovie) {

		Movie movie = new Movie();
		movie.setId(idMovie);

		List<Review> list = this.reviewRepository.findByMovie(movie);

		return list.stream().map(entity -> new ReviewDTO(entity)).collect(Collectors.toList());
	}
}