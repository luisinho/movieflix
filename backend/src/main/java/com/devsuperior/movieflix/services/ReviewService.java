package com.devsuperior.movieflix.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private MovieService movieService;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findByMovie(Long movieId) {

		List<ReviewDTO> listDto = new ArrayList<ReviewDTO>();

		Movie movie = this.movieService.findById(movieId);

		List<Review> list = this.reviewRepository.findByMovie(movie);

		if (!CollectionUtils.isEmpty(list)) {
			listDto = list.stream().map(entity -> new ReviewDTO(entity)).collect(Collectors.toList());
		}

		return listDto;
	}
}