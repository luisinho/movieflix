package com.devsuperior.movieflix.resources;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.services.GenreService;

@RestController
@RequestMapping(value = "/genres")
public class GenreResource {

	private static Logger LOG = LoggerFactory.getLogger(GenreResource.class);

	@Autowired
	private GenreService genreService;

	@GetMapping
	public ResponseEntity<List<GenreDTO>> findAll() {

		List<GenreDTO> list = new ArrayList<GenreDTO>();

		LOG.info("START METHOD GenreResource.findAll()");

		try {

			list = this.genreService.findAll();

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
		}

		LOG.info("END METHOD GenreResource.findAll()");

		return ResponseEntity.ok().body(list);
	}
}