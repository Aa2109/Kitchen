package com.aashif.kitchen.request;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class createEventRequest {
	public String name;
	public String location;
	public List<String> urls;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM dd yyyy hh:mm a")
	public LocalDateTime startedAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM dd yyyy hh:mm a")
	public LocalDateTime endsAt;

	
}
