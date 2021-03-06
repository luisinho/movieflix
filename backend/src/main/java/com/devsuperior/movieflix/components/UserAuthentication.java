package com.devsuperior.movieflix.components;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserAuthentication {

	 public boolean isLogged() {

		 final String ANONYMOUS_USER = "anonymousUser";

		 boolean userLogged = true;

		 final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		 if ((ANONYMOUS_USER).equals(authentication.getName())) {
			   userLogged = false;
		 }

		 return userLogged;
	 }
}
