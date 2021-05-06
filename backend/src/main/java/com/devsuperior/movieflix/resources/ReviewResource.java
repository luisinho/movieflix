package com.devsuperior.movieflix.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/review")
public class ReviewResource {

	@Autowired
	private ReviewService reviewService;

	@GetMapping
	public ResponseEntity<List<ReviewDTO>> findAll(@RequestParam("movieId") Long movieId) {

		List<ReviewDTO> listDto = this.reviewService.findByMovie(movieId);

		return ResponseEntity.ok(listDto);
	}
}