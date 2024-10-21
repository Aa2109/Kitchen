package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.entity.Category;
import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.request.createFoodRequset;

public interface FoodService {
	Food createFood(createFoodRequset req, Category category, Restaurant restaurant);
	Food updateFood(createFoodRequset req, Category category, Restaurant restaurant, Long foodId);
	void deleteFood(Long foodId);
	List<Food> getRestaurantsFood(Long restaurantId, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory);
	List<Food> searchFood(String keyword);
	Food getFoodById(Long foodId);
	public Food updateAvailablityStatus(Long foodId);
}
