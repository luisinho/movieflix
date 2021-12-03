package com.devsuperior.movieflix.entities;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "tb_user")
public class User implements UserDetails, Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "NAME",  length = 40)
	private String name;

	@Column(name = "EMAIL",  length = 50, unique = true)
	private String email;

	@Column(name = "PASSWORD", columnDefinition = "TEXT")
	private String password;

	@Column(name = "ACTIVE")
	private Boolean active;

	@Column(name = "DATE_REQUEST_PASSWORD", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private LocalDateTime dateRequestPassword;

	@Column(name = "CODE_REQUEST_PASSWORD", length = 15)
	private String codeRequestPassword;

	@Column(name = "NUMBER_REQUESTS_PASSWORD")
	private Long numberRequestsPassword;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_user_role",
	   joinColumns = @JoinColumn(name = "USER_ID"),
	   inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
	private Set<Role> roles = new HashSet<Role>();

	@OneToMany(mappedBy = "movie")
	private Set<Review> reviews = new HashSet<Review>();

	@Column(name = "CREATED_AT", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant createdAt;

	@Column(name ="UPDATED_AT", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant updatedAt;

	public User() {

	}

	public User(Long id, String name, String email, String password, Boolean active) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public LocalDateTime getDateRequestPassword() {
		return dateRequestPassword;
	}

	public void setDateRequestPassword(LocalDateTime dateRequestPassword) {
		this.dateRequestPassword = dateRequestPassword;
	}

	public String getCodeRequestPassword() {
		return codeRequestPassword;
	}

	public void setCodeRequestPassword(String codeRequestPassword) {
		this.codeRequestPassword = codeRequestPassword;
	}

	public Long getNumberRequestsPassword() {
		return numberRequestsPassword;
	}

	public void setNumberRequestsPassword(Long numberRequestsPassword) {
		this.numberRequestsPassword = numberRequestsPassword;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public Set<Review> getReviews() {
		return reviews;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	@PrePersist
	public void prePersist() {
		createdAt = Instant.now();
	}

	@PreUpdate
	public void preUpdate() {
		updatedAt = Instant.now();
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
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(role -> new SimpleGrantedAuthority(role.getAuthority()))
				   .collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public boolean hasHole(String roleName) {

		return this.roles.stream().anyMatch(role -> role.getAuthority().equals(roleName));
	}
}