package com.devsuperior.movieflix.services;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Autowired
	private MessageSource messageSource;

	@Transactional(readOnly = true)
	public Page<ReviewDTO> findAll(Long movieId, PageRequest pageRequest) throws Exception {

		LOG.info("START METHOD ReviewService.findAll() - Params {} {} " + movieId + " " + pageRequest.toString());

		Page<ReviewDTO> listDto = null;

		Page<Review> list = this.reviewRepository.find(movieId, pageRequest);

		if (list != null && list.getContent() != null) {
			listDto = list.map(entity -> new ReviewDTO(entity));
		}

		LOG.info("END METHOD ReviewService.findAll()");

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
			Locale locale = new Locale("pt","BR");
			String message = this.messageSource.getMessage("review.user.not.permission", null, locale);
			throw new ForbiddenException(message);
		}

		Movie movie = this.movieService.findByIdForReview(dto.getMovie().getId());

		Review entity = new Review();
		entity.setText(dto.getText());
		entity.setMovie(movie);
		entity.setUser(user);

		LOG.info("END METHOD ReviewService.getParseDtoToEntity()");

		return entity;
	}
}