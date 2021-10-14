package com.devsuperior.movieflix.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Locale;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.devsuperior.movieflix.components.UserAuthentication;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.dto.UserInsertDTO;
import com.devsuperior.movieflix.dto.UserUpdateDTO;
import com.devsuperior.movieflix.entities.Role;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.RoleRepository;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.resources.exceptions.RegraNegocioException;
import com.devsuperior.movieflix.services.exceptions.DataBaseException;
import com.devsuperior.movieflix.services.exceptions.RegisterNotFoundException;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import com.devsuperior.movieflix.utils.UtilDate;

@Service
public class UserService implements UserDetailsService {

	private static Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private UserAuthentication userAuthentication;

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest) {

		LOGGER.info("START METHOD UserService.findAllPage: {} " + pageRequest.toString());

		try {

			 Page<User> list = this.userRepository.findAll(pageRequest);

			 Page<UserDTO> listDto = list.map(user -> new UserDTO(user));

			 LOGGER.info("END METHOD UserService.findAllPage");

			 return listDto;

		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.findAllPage " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.listing", null, null));
		}
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {

		LOGGER.info("START METHOD UserService.findById: {} " + id);

		User user = new User();

		try {

			Optional<User> obj = this.userRepository.findById(id);

			user = obj.orElseThrow(() -> new RegisterNotFoundException(this.messageSource.getMessage("user.not.found.with.the.id", null, null)));

		} catch (RegisterNotFoundException e) {
			throw new RegisterNotFoundException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.findById " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.not.found.with.the.id", null, null) + " " + id);
		}

		LOGGER.info("END METHOD UserService.findById ");

		return new UserDTO(user);
	}

	@Transactional(readOnly = true)
	public long countByCodeRequestPassword(String codeRequestPassword) {

		LOGGER.info("START METHOD UserService.countByCodeRequestPassword: ");

		long count = 0;

		try {

			count = this.userRepository.countByCodeRequestPassword(codeRequestPassword);

		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.countByCodeRequestPassword " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.code.request.password", null, null));
		}

		LOGGER.info("END METHOD UserService.countByCodeRequestPassword: ");

		return count;
	}

	@Transactional
	public UserDTO save(UserInsertDTO dto) {

		LOGGER.info("START METHOD UserService.insert() - Param {}: " + dto.getName());

		User entity = new User();

		try {

		  this.validateUserEmail(dto);

		  this.validateSamePasswords(dto);

		  this.copyDtoToEntity(dto, entity);

		  entity.setActive(Boolean.TRUE);

		  entity.setPassword(this.passwordEncoder.encode(dto.getPassword()));

		  entity = this.userRepository.save(entity);

		} catch(RegraNegocioException e) {
			throw new RegraNegocioException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.save " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.creating", null, null));
		}

		LOGGER.info("END METHOD UserService.insert() ");

		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserDTO dto) {

		LOGGER.info("START METHOD UserService.update()");

		User entity = new User();

		try {

			Optional<User> obj = this.userRepository.findById(id);

			entity = obj.orElseThrow(() ->
			    new ResourceNotFoundException(this.messageSource.getMessage("user.error.updating.id.not.found", null, null)));

		    this.copyDtoToEntity(dto, entity);

			entity = this.userRepository.save(entity);

		} catch (EntityNotFoundException e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.update " + e);
			throw new ResourceNotFoundException(this.messageSource.getMessage("user.error.updating.id.not.found", null, null) + " " + id);
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.update " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.updating.with.the.id", null, null) + " " + id); 
		}

		LOGGER.info("END METHOD UserService.update()");

		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO updatePassword(UserUpdateDTO dto) {

		LOGGER.info("START METHOD UserService.updatePassword()");

		User entity = new User();

		try {

		  this.validateRequiredFieldsChangePassword(dto);

		  this.validateSamePasswords(dto);

		  entity = this.userRepository.findByEmailAndCodeRequestPasswordAndActive(dto.getEmail(),
				                                                                  dto.getCodeRequestPassword(),
				                                                                  Boolean.TRUE);

		  if (entity == null) {
			  throw new RegraNegocioException(this.messageSource.getMessage("user.error.code.request.password", null, null));
		  }

		  this.validateTimeCodeRequest(entity);

		  if (!"".equals(dto.getPassword())) {
			  entity.setPassword(this.passwordEncoder.encode(dto.getPassword()));
			  entity.setCodeRequestPassword(null);
		  }

		  entity = this.userRepository.save(entity);

		} catch (EntityNotFoundException e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.updatePassword " + e);
			throw new ResourceNotFoundException(this.messageSource.getMessage("user.error.updating.password.id.not.found", null, null));
		} catch(RegraNegocioException e) {
			throw new RegraNegocioException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.updatePassword " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.updating.password.with.the.id", null, null)); 
		}

		LOGGER.info("END METHOD UserService.updatePassword()");

		return new UserDTO(entity);
	}

	@Transactional
	public void updateCodeRequestPassword(UserDTO userDto) {

		LOGGER.info("START METHOD UserService.updateCodeRequestPassword()");

		try {

			long numberRequest = 0;

			LocalDateTime todayDateTime = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.systemDefault());

			Optional<User> user = this.userRepository.findById(userDto.getId());

			user.get().setCodeRequestPassword(userDto.getCodeRequestPassword());
			user.get().setDateRequestPassword(todayDateTime);

			numberRequest = user.get().getNumberRequestsPassword() == null ? 1 : user.get().getNumberRequestsPassword() +1;

			user.get().setNumberRequestsPassword(numberRequest);

			this.userRepository.save(user.get());

		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.updateCodeRequestPassword " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.code.request.password", null, null)); 
		}

		LOGGER.info("END METHOD UserService.updateCodeRequestPassword()");
	}

	@Transactional
	public UserDTO disable(Long id) {

		LOGGER.info("START METHOD UserService.disable()");

		User entity = new User();

		try {

		  Optional<User> obj = this.userRepository.findById(id);

		  entity = obj.orElseThrow(() ->
		    new ResourceNotFoundException(this.messageSource.getMessage("user.error.disable.id.not.found", null, null)));

		  entity.setActive(Boolean.FALSE);

		  entity = this.userRepository.save(entity);

		} catch (EntityNotFoundException e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.disable " + e);
			throw new ResourceNotFoundException(this.messageSource.getMessage("user.error.disable.id.not.found", null, null) + " " + id);
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro no metodo UserService.disable " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.error.disable.with.the.id", null, null) + " " + id);
		}

		LOGGER.info("END METHOD UserService.disable()");

		return new UserDTO(entity);
	}

	private void copyDtoToEntity(UserDTO dto, User entity) {

		final String ROLE_VISITOR = "ROLE_VISITOR";

		entity.setEmail(dto.getEmail());
		entity.setName(dto.getName());

		entity.getRoles().clear();

		if (this.userAuthentication.isLogged()) {

			dto.getRoles().forEach(roleDto -> {
				Role role = this.roleRepository.getOne(roleDto.getId());
				entity.getRoles().add(role);
			});

		} else {

			Role role = this.roleRepository.findByAuthority(ROLE_VISITOR);
			entity.getRoles().add(role);
		}
	}

	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {

		UserDTO dto = null;

		try {

			Optional<User> obj = this.userRepository.findByEmail(email);

			User user = obj.orElseThrow(() ->
			    new RegraNegocioException(this.messageSource.getMessage("user.email.not.exist", null, null) + " " + email
			    +  "  " + this.messageSource.getMessage("user.email.not.exist.to.send", null, null)));

			dto = new UserDTO(user);

		} catch (RegraNegocioException e) {
			LOGGER.error("Ocorreu um erro ao localizar o email " + e);
			throw new RegraNegocioException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("Ocorreu um erro ao localizar o email " + e);
			throw new DataBaseException(this.messageSource.getMessage("user.email.find.error", null, null));
		}

		return dto;
	}

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		LOGGER.info("START METHOD UserService.loadUserByUsername() - Param {}: " + username);

		Optional<User> user = this.userRepository.findByEmail(username);

		if (!user.isPresent()) {

			Locale locale = new Locale("pt","BR");

			String message = this.messageSource.getMessage("user.name.not.found", null, locale);

			LOGGER.error(message + " : " + username);

			throw new UsernameNotFoundException(message);
		}

		LOGGER.info("END METHOD UserService.loadUserByUsername()");

		return user.get();
	}

	private void validateUserEmail(UserDTO dto) {

		long count = this.userRepository.countByEmailIgnoreCase(dto.getEmail());

		if (count > 0) {
			throw new RegraNegocioException(this.messageSource.getMessage("user.email.exist", null, null) + " " + dto.getEmail());
		}
	}

	private void validateSamePasswords(UserInsertDTO dto) {

		if (!dto.getPassword().equals(dto.getRepeatPassword())) {
			throw new RegraNegocioException(this.messageSource.getMessage("user.error.password", null, null));
		}
	}

	private void validateRequiredFieldsChangePassword(UserUpdateDTO dto) {

		if (!StringUtils.hasText(dto.getEmail())
			|| !StringUtils.hasText(dto.getCodeRequestPassword())
			   || !StringUtils.hasText(dto.getPassword())
			      || !StringUtils.hasText(dto.getRepeatPassword())) {
			throw new RegraNegocioException(this.messageSource.getMessage("user.required.fields.change.password", null, null));
		}
	}

	private void validateTimeCodeRequest(User user) {

		if (user.getDateRequestPassword() == null) {
			throw new RegraNegocioException(this.messageSource.getMessage("user.code.request.password.expiration", null, null));
		}

		LocalDateTime dateToday = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.systemDefault());

		LocalDateTime expirationDate  = user.getDateRequestPassword();

		boolean isExpire = new UtilDate().isExpiredOneHour(dateToday, expirationDate);

		if (isExpire) {
			throw new RegraNegocioException(this.messageSource.getMessage("user.code.request.password.expiration", null, null));
		}
	}
}