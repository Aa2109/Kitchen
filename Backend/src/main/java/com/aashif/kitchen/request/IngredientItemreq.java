package com.aashif.kitchen.request;

import lombok.Data;

@Data
public class IngredientItemreq {
	
	private String name;
	private Long categoryId;
	private Long restaurantId;

}
