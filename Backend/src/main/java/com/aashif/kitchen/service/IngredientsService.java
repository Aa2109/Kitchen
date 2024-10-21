package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.entity.IngredientCategory;
import com.aashif.kitchen.entity.IngredientsItem;

public interface IngredientsService {
	
	IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;
	IngredientCategory getIngredientCategoryById(Long id)throws Exception;
	List<IngredientCategory> getIngredientCategoryByRestaurantId(Long restaurantId)throws Exception;
	IngredientsItem createIngredientItem(Long restaurantId, String ingredientname, Long categoryId)throws Exception;
	List<IngredientsItem> getRestauransIngredients(Long restaurantId)throws Exception;
	IngredientsItem updateStock(Long id)throws Exception;
	

}
