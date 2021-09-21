package com.devsuperior.movieflix.resources;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewResource {

	private static Logger LOG = LoggerFactory.getLogger(ReviewResource.class);

	@Autowired
	private ReviewService reviewService;

	@GetMapping
	public ResponseEntity<Page<ReviewDTO>> findAll(
			  @RequestParam(value ="movieId", defaultValue = "0") Long movieId,
			  @RequestParam(value = "page", defaultValue = "0") Integer page,
			  @RequestParam(value = "linesPerPage", defaultValue = "4") Integer linesPerPage,
			  @RequestParam(value = "direction", defaultValue = "ASC") String direction,
			  @RequestParam(value = "orderBy", defaultValue = "createdAt") String orderBy ) {

		StringBuffer log = new StringBuffer();
		log.append("movieId: ").append(movieId).append("\n");
		log.append("page: ").append(page).append("\n");
		log.append("linesPerPage: ").append(linesPerPage).append("\n");
		log.append("direction: ").append(direction).append("\n");
		log.append("orderBy: ").append(orderBy).append("\n");

		LOG.info("START METHOD ReviewResource.findAll() - Params {} {} {} " + log.toString());

		Page<ReviewDTO> listDto = null;

		try {

			PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),  orderBy);

			listDto = this.reviewService.findAll(movieId, pageRequest);

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
		}

		LOG.info("END METHOD ReviewResource.findAll()");

		return ResponseEntity.ok(listDto);
	}

	@PostMapping
	public ResponseEntity<ReviewDTO> insert(@Valid @RequestBody ReviewDTO dto) throws Exception {

		URI uri = null;

		LOG.info("START METHOD ReviewResource.insert() - Params " + dto.toString());

		try {

			dto = this.reviewService.insert(dto);

			uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}").buildAndExpand(dto.getId()).toUri();			

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
			throw new Exception(e);
		}

		LOG.info("END METHOD ReviewResource.insert()");

		return ResponseEntity.created(uri).body(dto);
	}
}