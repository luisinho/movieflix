package com.devsuperior.movieflix.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.RoleDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.dto.UserInsertDTO;
import com.devsuperior.movieflix.dto.UserUpdateDTO;
import com.devsuperior.movieflix.services.RoleService;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

	private static Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAllPaged(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy,
			@RequestParam(value = "field", defaultValue = "") String field,
			@RequestParam(value = "fieldValue", defaultValue = "") String fieldValue) {

		StringBuffer params = new StringBuffer();
		params.append(page).append("\n");
		params.append(linesPerPage).append("\n");
		params.append(direction).append("\n");
		params.append(orderBy).append("\n");

		LOGGER.info("START METHOD UserResource.findAllPaged: {} {} {} {} " + params);

		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);

		Page<UserDTO>	list = this.userService.findAllPaged(field, fieldValue, pageRequest);

		LOGGER.info("END METHOD UserResource.findAllPaged");

		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {

		LOGGER.info("START METHOD UserResource.findById: {} " + id);

		UserDTO  dto = this.userService.findById(id);

		LOGGER.info("END METHOD UserResource.findById");

		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<UserDTO> save(@Valid @RequestBody UserInsertDTO dto) {

		LOGGER.info("START METHOD UserResource.save");

		UserDTO	  newdto = this.userService.save(dto);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newdto.getId()).toUri();

		LOGGER.info("END METHOD UserResource.save");

		return ResponseEntity.created(uri).body(newdto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {

		LOGGER.info("START METHOD UserResource.update");

		UserDTO  updateDto = this.userService.update(id, dto);

		LOGGER.info("END METHOD UserResource.update");

		return ResponseEntity.ok().body(updateDto);
	}

	@PutMapping(value = "/reset")
	public ResponseEntity<UserDTO> updatePassword(@RequestBody UserUpdateDTO dto) {

		LOGGER.info("START METHOD UserResource.updatePassword");

		UserDTO  updateDto = this.userService.updatePassword(dto);

		LOGGER.info("END METHOD UserResource.updatePassword");

		return ResponseEntity.ok().body(updateDto);
	}

	@PutMapping(value = "/disable/{id}")
	public ResponseEntity<UserDTO> disable(@PathVariable Long id) {

		LOGGER.info("START METHOD UserResource.disable");

		UserDTO  updateDto = this.userService.disable(id);

		LOGGER.info("END METHOD UserResource.disable");

		return ResponseEntity.ok().body(updateDto);
	}

	@GetMapping(value = "role")
	public ResponseEntity<List<RoleDTO>> listRole() {

		LOGGER.info("START METHOD UserResource.listRole");

		List<RoleDTO> list = this.roleService.list();

		LOGGER.info("END METHOD roleService.listRole");

		return ResponseEntity.ok().body(list);
	}
}