package com.aashif.kitchen.entity;



import java.time.LocalDate;
import java.util.*;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String description;
	private Long price;
	
	@ManyToOne
	private Category foodCategory;
	
	@Column(length = 1000)
	@ElementCollection
	private List<String> images;
	
	private boolean available;
	@ManyToOne
	private Restaurant restaurant;
	
	private boolean isVegetarian;
	private boolean isSeasonal;
	
	@ManyToMany
	private List<IngredientsItem> ingredients = new ArrayList<>();
	
	private LocalDate creationDate;

}
