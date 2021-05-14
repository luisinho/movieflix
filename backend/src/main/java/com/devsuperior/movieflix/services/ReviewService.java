package com.devsuperior.movieflix.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ForbiddenException;

@Service
public class ReviewService {

	private static Logger LOG = LoggerFactory.getLogger(ReviewService.class);

	public static final  String ROLES_MEMBER = "ROLE_MEMBER";

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private MovieService movieService;

	@Autowired
	private AuthService authService;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findByMovie(Long movieId) throws Exception  {

		LOG.info("START METHOD ReviewService.findByMovie() - Param {} " + movieId);

		List<ReviewDTO> listDto = new ArrayList<ReviewDTO>();

		Movie movie = this.movieService.findByIdForReview(movieId);

		List<Review> list = this.reviewRepository.findByMovie(movie);

		if (!CollectionUtils.isEmpty(list)) {
			listDto = list.stream().map(entity -> new ReviewDTO(entity)).collect(Collectors.toList());
		}

		LOG.info("END METHOD ReviewService.findByMovie()");

		return listDto;
	}

	@Transactional
	public ReviewDTO insert(ReviewDTO dto) throws Exception {

		LOG.info("START METHOD ReviewService.insert() - Params {} " + dto.toString());

		Review entity = this.getParseDtoToEntity(dto);

		entity = this.reviewRepository.save(entity);

		LOG.info("END METHOD ReviewService.insert()");

		return new ReviewDTO(entity);
	}

	private Review getParseDtoToEntity(ReviewDTO dto) throws Exception {

		LOG.info("START METHOD ReviewService.getParseDtoToEntity() - Params {} " + dto.toString());

		User user = this.authService.authenticated();

		if(!user.hasHole(ROLES_MEMBER)) {
			throw new ForbiddenException("O seu perfil não tem permissão.");
		}

		Movie movie = this.movieService.findByIdForReview(dto.getMovieDto().getId());

		Review entity = new Review();
		entity.setText(dto.getText());
		entity.setMovie(movie);
		entity.setUser(user);

		LOG.info("END METHOD ReviewService.getParseDtoToEntity()");

		return entity;
	}
}