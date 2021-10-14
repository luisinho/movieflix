package com.devsuperior.movieflix.utils;

import java.time.Duration;
import java.time.LocalDateTime;

public class UtilDate {

	public boolean isExpiredOneHour(LocalDateTime startDate, LocalDateTime endDate) {

		LocalDateTime dateToday = LocalDateTime.of(startDate.getYear(), startDate.getMonth(), startDate.getDayOfMonth(), startDate.getHour(), startDate.getMinute(), startDate.getSecond());

	    LocalDateTime expirationDate  = LocalDateTime.of(endDate.getYear(), endDate.getMonth(), endDate.getDayOfMonth(), endDate.getHour(), endDate.getMinute(), endDate.getSecond());

	    Duration duration = Duration.between(dateToday, expirationDate);

	    long seconds = Math.abs(duration.getSeconds());

	    long hours = seconds / 3600;

	    seconds -= (hours * 3600);

	    long minutes = seconds / 60;

	    if (hours == 0 && (minutes >= 0 && minutes <= 59)) {
	    	return false;
	    } else if (hours == 1 && minutes == 0) {
	    	return false;
	    }

	    return true;
	}
}