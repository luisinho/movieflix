package com.devsuperior.movieflix.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ResourceExceptionHandler {

	// @ExceptionHandler({ InvalidTokenException.class, AuthenticationException.class, UsernameNotFoundException.class, InvalidGrantException.class })
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(UsernameNotFoundException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.BAD_REQUEST;

		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError("Credenciais do usuário não encontrada.");
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		if (e.getBindingResult().getFieldErrors() != null
				&& e.getBindingResult().getFieldErrors().size() >= 1) {

			String fieldMessage = e.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
			err.setError(fieldMessage);
		}

		return ResponseEntity.status(status).body(err);
	}
}