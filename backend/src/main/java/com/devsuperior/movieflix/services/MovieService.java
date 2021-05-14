package com.devsuperior.movieflix.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {

	private static Logger LOG = LoggerFactory.getLogger(MovieService.class);

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private GenreService genreService;

	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Long genreId, PageRequest pageRequest) throws Exception {

		LOG.info("START METHOD MovieService.findAll() - Params {} {} " + genreId + " " + pageRequest.toString());

		Page<MovieDTO> listDto = null;

		Genre genre = genreId == 0 ? null : this.genreService.findEntityGenreById(genreId);

		Page<Movie> list = this.movieRepository.find(genre, pageRequest);

		if (list != null && list.getContent() != null) {
			listDto = list.map(entity -> new MovieDTO(entity));
		}

		LOG.info("END METHOD MovieService.findAll()");

		return listDto;
	}

	@Transactional(readOnly = true)
	public Movie findByIdForReview(Long id) throws Exception {

		LOG.info("START METHOD MovieService.findByIdForReview() - Param {} " + id);

		Optional<Movie> obj = this.movieRepository.findById(id);

		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));

		LOG.info("END METHOD MovieService.findByIdForReview()");

		return entity;
	}

	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) throws Exception {

		LOG.info("START METHOD MovieService.findById() - Param {} " + id);

		Optional<Movie> obj = this.movieRepository.findById(id);

		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));

		LOG.info("END METHOD MovieService.findById()");

		return new MovieDTO(entity);
	}
}