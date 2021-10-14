package com.devsuperior.movieflix.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.UnauthorizedExcepion;

@Service
public class AuthService {

	private static Logger LOG = LoggerFactory.getLogger(AuthService.class);

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public User authenticated() {

		try {

			LOG.info("START METHOD AuthService.authenticated()");

			String userName = SecurityContextHolder.getContext().getAuthentication().getName();

			Optional<User> user = this.userRepository.findByEmail(userName);

			LOG.info("END METHOD AuthService.authenticated()");

			return user.isPresent() ? user.get() : new User();

		} catch (Exception e) {
			LOG.error("An error has occurred " + e);
			throw new UnauthorizedExcepion("Invalid user");
		}
	}
}