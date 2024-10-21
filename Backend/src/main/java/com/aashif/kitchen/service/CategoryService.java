package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.entity.Category;

public interface CategoryService {

	Category createCategory(String name, String desc, Long userId, Long restaurantId) throws Exception;
	List<Category> getCategoryByReataurantId(Long restarantId)throws Exception;
	Category getCategoryByCategoryId(Long categoryId);
	
}
