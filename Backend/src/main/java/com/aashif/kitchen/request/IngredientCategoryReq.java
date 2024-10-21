package com.aashif.kitchen.request;

import lombok.Data;

@Data
public class IngredientCategoryReq {

	private String name;
	private Long restaurantId;
}
