package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Role;

public class RoleDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String authority;

	private String description;

	public RoleDTO(Role entity) {
		this.id = entity.getId();
		this.authority = entity.getAuthority();
		this.description = entity.getDescription();
	}

	public RoleDTO(Long id, String authority, String description) {
		this.id = id;
		this.authority = authority;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}