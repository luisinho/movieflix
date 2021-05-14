package com.devsuperior.movieflix.services.exceptions;

public class UnauthorizedExcepion extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UnauthorizedExcepion(String msg) {
		super(msg);
	}
}
