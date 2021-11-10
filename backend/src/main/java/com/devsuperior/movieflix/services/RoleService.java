package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.RoleDTO;
import com.devsuperior.movieflix.entities.Role;
import com.devsuperior.movieflix.repositories.RoleRepository;
import com.devsuperior.movieflix.services.exceptions.DataBaseException;

@Service
public class RoleService {

	private static Logger LOGGER = LoggerFactory.getLogger(RoleService.class);

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private MessageSource messageSource;

	@Transactional(readOnly = true)
	public List<RoleDTO> list() {

		LOGGER.info("START METHOD RoleService.list");

		try {

		   List<Role> list = this.roleRepository.findAll();

		   List<RoleDTO> listDto = list.stream().map(role -> new RoleDTO(role)).collect(Collectors.toList());

		   LOGGER.info("END METHOD RoleService.list");

		   return listDto;

		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo RoleService.list " + e);
			throw new DataBaseException(this.messageSource.getMessage("role.error.listing", null, null));
		}
	}
}