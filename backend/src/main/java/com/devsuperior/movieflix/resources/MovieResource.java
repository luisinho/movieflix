package com.devsuperior.movieflix.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {

	private static Logger LOG = LoggerFactory.getLogger(MovieResource.class);

	@Autowired
	private MovieService movieService;

	@GetMapping
	public ResponseEntity<Page<MovieDTO>> findAll(
			  @RequestParam(value ="genreId", defaultValue = "0") Long genreId,
			  @RequestParam(value = "page", defaultValue = "0") Integer page,
			  @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			  @RequestParam(value = "direction", defaultValue = "ASC") String direction,
			  @RequestParam(value = "orderBy", defaultValue = "title") String orderBy ) {

		StringBuffer log = new StringBuffer();
		log.append("genreId: ").append(genreId).append("\n");
		log.append("page: ").append(page).append("\n");
		log.append("linesPerPage: ").append(linesPerPage).append("\n");
		log.append("direction: ").append(direction).append("\n");
		log.append("orderBy: ").append(orderBy).append("\n");

		LOG.info("START METHOD MovieResource.findAll() - Params {} {} {} " + log.toString());

		Page<MovieDTO> listDto = null;

		try {

			PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);

			listDto = this.movieService.findAll(genreId, pageRequest);

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
		}

		LOG.info("END METHOD MovieResource.findAll()");

		return ResponseEntity.ok(listDto);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) throws Exception {

		LOG.info("START METHOD MovieResource.findById() - Param {} " + id);

		MovieDTO dto = new MovieDTO();

		try {

			dto = this.movieService.findById(id);

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
			throw new Exception(e);
		}

		LOG.info("END METHOD MovieResource.findById()");

		return ResponseEntity.ok().body(dto);
	}
}