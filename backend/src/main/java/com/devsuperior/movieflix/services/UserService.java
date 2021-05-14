package com.devsuperior.movieflix.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

	private static Logger LOG = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		LOG.info("START METHOD UserService.loadUserByUsername() - Param {}: " + username);

		User user = this.userRepository.findByEmail(username);

		if (user == null) {
			LOG.error("Credenciais do usuario nao encontrada: " + username);
			throw new UsernameNotFoundException("Credenciais do usuario nao encontrada.");
		}

		LOG.info("END METHOD UserService.loadUserByUsername()");

		return user;
	}	
}