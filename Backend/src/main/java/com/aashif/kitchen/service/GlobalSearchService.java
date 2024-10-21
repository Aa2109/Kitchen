package com.aashif.kitchen.service;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.Restaurant;

@Service
public class GlobalSearchService {

	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private FoodService foodService;
	
	public List<Restaurant> searchRestaurants(String keyword) throws Exception {
        return restaurantService.searchRestaurantByQuery(keyword); // Call existing restaurant search
    }

    public List<Food> searchItems(String keyword) {
        return foodService.searchFood(keyword); // Call existing item search
    }

    public Map<String, List<?>> searchAll(String keyword) throws Exception {
        List<Restaurant> restaurants = searchRestaurants(keyword);
        List<Food> items = searchItems(keyword);
        
        Map<String, List<?>> results = new HashMap<>();
        results.put("restaurants", restaurants);
        results.put("items", items);
        
        return results;
    }
}
