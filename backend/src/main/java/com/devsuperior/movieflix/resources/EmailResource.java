package com.devsuperior.movieflix.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.EmailDTO;
import com.devsuperior.movieflix.services.EmailService;

@RestController
@RequestMapping(value = "/emails")
public class EmailResource {

	private static Logger LOGGER = LoggerFactory.getLogger(EmailResource.class);

	@Autowired
	private EmailService emailService;

	@PostMapping
	public ResponseEntity<EmailDTO> send(@RequestBody EmailDTO dto) {

		LOGGER.info("START METHOD EmailResource.send: {} " + dto.getTo());

		EmailDTO emailDto = this.emailService.sendEmail(dto);

		if (emailDto == null) {
			LOGGER.error("Error ao enviar email");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

		LOGGER.info("END METHOD EmailResource.send");

		return ResponseEntity.status(emailDto.getStatusCode()).body(emailDto);
	}
}