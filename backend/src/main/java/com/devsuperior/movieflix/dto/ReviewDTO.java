package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String text;
	private MovieDTO movieDto;
	private UserDTO userDto;

	public ReviewDTO() {

	}

	public ReviewDTO(Review entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.movieDto = new MovieDTO(entity.getMovie());
		this.userDto = new UserDTO(entity.getUser().getId(), entity.getUser().getName());
	}

	public ReviewDTO(Long id, String text, MovieDTO movieDto, UserDTO userDto) {
		this.id = id;
		this.text = text;
		this.movieDto = movieDto;
		this.userDto = userDto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public MovieDTO getMovieDto() {
		return movieDto;
	}

	public void setMovieDto(MovieDTO movieDto) {
		this.movieDto = movieDto;
	}

	public UserDTO getUserDto() {
		return userDto;
	}

	public void setUserDto(UserDTO userDto) {
		this.userDto = userDto;
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
		ReviewDTO other = (ReviewDTO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}