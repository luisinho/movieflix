package com.devsuperior.movieflix.dto;

public class UserInsertDTO extends UserDTO {

	private static final long serialVersionUID = 1L;

	private String password;

	private String repeatPassword;

	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRepeatPassword() {
		return repeatPassword;
	}

	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}
}