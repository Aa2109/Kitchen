package com.aashif.kitchen.request;

import lombok.Data;

@Data
public class CreateCategoryRequest {
	private String name;
    private String description;
    private Long restaurantId;
}
