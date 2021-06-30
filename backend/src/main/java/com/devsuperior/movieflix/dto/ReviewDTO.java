package com.devsuperior.movieflix.dto;

import java.io.Serializable;
import java.time.Instant;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;

public class ReviewDTO implements Serializable, Comparable<ReviewDTO> {

	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo avaliação requerido!")
	private String text;
	private Instant createdAt;
	private MovieDTO movie;
	private UserDTO user;	

	public ReviewDTO() {

	}

	public ReviewDTO(Review entity) {
		this.id = entity.getId();
		this.text = entity.getText();
		this.createdAt = entity.getCreatedAt();

		if (entity.getMovie() != null) {
			this.movie = new MovieDTO(entity.getMovie());
		}

		this.user = new UserDTO(entity.getUser());
	}

	public ReviewDTO(Long id, String text, MovieDTO movieDto) {
		this.id = id;
		this.text = text;
		this.movie = movieDto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}	

	public MovieDTO getMovie() {
		return movie;
	}

	public void setMovie(MovieDTO movie) {
		this.movie = movie;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	@Override
	public int compareTo(ReviewDTO obj) {
	   if (getCreatedAt() == null || obj.getCreatedAt() == null) {
		   return 0;
	   }
	   return getCreatedAt().compareTo(obj.getCreatedAt());
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

	@Override
	public String toString() {
		return "ReviewDTO [text=" + text + ", movieId=" + movie.getId() + "]";
	}
}