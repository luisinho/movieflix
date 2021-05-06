package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;


@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private GenreService genreService;

	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Long genreId, PageRequest pageRequest) {

		Page<MovieDTO> listDto = null;

		Genre genre = genreId == 0 ? null : this.genreService.findEntityGenreById(genreId);

		Page<Movie> list = this.movieRepository.find(genre, pageRequest);

		if (list != null && list.getContent() != null) {
			listDto = list.map(entity -> new MovieDTO(entity));
		}

		return listDto;
	}

	@Transactional(readOnly = true)
	public Movie findById(Long id) {
		return this.movieRepository.getOne(id);
	}
}