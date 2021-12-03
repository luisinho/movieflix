package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.devsuperior.movieflix.entities.Role;
import com.devsuperior.movieflix.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo email requirido!")
	@Email(message = "Favor entrar um email correto!")
	private String email;

	@NotBlank(message = "Campo nome requirido!")
	@Size(min = 3, message = "O campo nome deve conter no minimo 3 caracteres!")
	private String name;

	private Boolean active;

	private String codeRequestPassword;

	private Instant createdAt;

	private Long idRole;

	private List<RoleDTO> roles = new ArrayList<RoleDTO>();

	public UserDTO() {

	}

	public UserDTO(User entity) {
		this.id = entity.getId();
		this.email = entity.getEmail();
		this.name = entity.getName();
		this.active = entity.getActive();
		this.createdAt = entity.getCreatedAt();
	}
	
	public UserDTO(User entity, Set<Role> listRole) {
		this.id = entity.getId();
		this.email = entity.getEmail();
		this.name = entity.getName();
		this.active = entity.getActive();
		this.createdAt = entity.getCreatedAt();

		listRole.stream().forEach(role -> {
			roles.add(new RoleDTO(role));
		});
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getCodeRequestPassword() {
		return codeRequestPassword;
	}

	public void setCodeRequestPassword(String codeRequestPassword) {
		this.codeRequestPassword = codeRequestPassword;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Long getIdRole() {
		return idRole;
	}

	public void setIdRole(Long idRole) {
		this.idRole = idRole;
	}

	public List<RoleDTO> getRoles() {
		return roles;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDTO other = (UserDTO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}