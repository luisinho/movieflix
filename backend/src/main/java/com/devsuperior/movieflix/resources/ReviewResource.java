package com.devsuperior.movieflix.resources;

import java.net.URI;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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