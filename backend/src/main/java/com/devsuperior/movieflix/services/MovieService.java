package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.repositories.MovieRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;

	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Long idGenre, PageRequest pageRequest) {

		Page<MovieDTO> listDto = null;

		Genre genre = new Genre(idGenre, null);

		Page<Movie> list = this.movieRepository.find(genre, pageRequest);

		if (list != null && CollectionUtils.isEmpty(list.getContent())) {
			listDto = list.map(entity -> new MovieDTO(entity));
		}

		return listDto;		
	}
}