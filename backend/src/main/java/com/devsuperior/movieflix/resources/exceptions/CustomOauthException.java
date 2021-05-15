package com.devsuperior.movieflix.resources.exceptions;

import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;

public class CustomOauthException extends OAuth2Exception {	

	private static final long serialVersionUID = 1L;	

	public CustomOauthException(String msg) {		
		super(msg);
	}
	
	
}
