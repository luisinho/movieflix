package com.devsuperior.movieflix.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.repositories.GenreRepository;

@Service
public class GenreService {

	@Autowired
	private GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreDTO> findAll() {

		List<GenreDTO> listDto = new ArrayList<GenreDTO>();

		List<Genre> list = this.genreRepository.findAll();

		if (!CollectionUtils.isEmpty(list)) {
			listDto = list.stream().map(entity -> new GenreDTO(entity)).collect(Collectors.toList());
		}

		return listDto;
	}
}