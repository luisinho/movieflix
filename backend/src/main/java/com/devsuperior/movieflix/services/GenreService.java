package com.devsuperior.movieflix.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class GenreService {

	private static Logger LOG = LoggerFactory.getLogger(GenreService.class);

	@Autowired
	private GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreDTO> findAll() throws Exception {

		LOG.info("START METHOD GenreService.findAll()");

		List<GenreDTO> listDto = new ArrayList<GenreDTO>();

		List<Genre> list = this.genreRepository.findAll();

		if (!CollectionUtils.isEmpty(list)) {
			listDto = list.stream().map(entity -> new GenreDTO(entity)).collect(Collectors.toList());
		}

		LOG.info("END METHOD GenreService.findAll()");

		return listDto;
	}

	@Transactional(readOnly = true)
	public Genre findEntityGenreById(Long id) throws Exception {

		LOG.info("START METHOD GenreService.findEntityGenreById() - Param {} " + id);

		Optional<Genre> obj = this.genreRepository.findById(id);

		Genre entity = obj.orElseThrow(() ->
			new ResourceNotFoundException("Entity not found.")
		);

		LOG.info("END METHOD GenreService.findEntityGenreById()");

		return entity;
	}
}