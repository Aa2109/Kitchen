package com.aashif.kitchen.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Events {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int id;
	public String name;
	public List<String> urls;
	public String location;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM dd yyyy hh:mm a")
	public LocalDateTime startedAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM dd yyyy hh:mm a")
	public LocalDateTime endsAt;
	
	@ManyToOne
	@JoinColumn(name = "restaurant_id")
	private Restaurant restaurant;
}
