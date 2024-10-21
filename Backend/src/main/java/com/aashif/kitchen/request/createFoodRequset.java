package com.aashif.kitchen.request;

import java.util.List;

import com.aashif.kitchen.entity.Category;
import com.aashif.kitchen.entity.IngredientsItem;

import lombok.Data;

@Data
public class createFoodRequset {
	private String name;
	private String description;
	private Long price;
	
	private Category category;
	private List<String> images;
	private Long restaurantId;
	
	private boolean vegetarian;
	private boolean seasonal;
	private List<IngredientsItem> ingredients;
	private boolean available;
	
	
}
