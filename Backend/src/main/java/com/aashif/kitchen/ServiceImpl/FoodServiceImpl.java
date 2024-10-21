package com.aashif.kitchen.ServiceImpl;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Category;
import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.FoodRepo;
import com.aashif.kitchen.repository.RestaurantRepo;
import com.aashif.kitchen.request.createFoodRequset;
import com.aashif.kitchen.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService{

	@Autowired
	private FoodRepo foodRepo;
//	@Autowired
//	private RestaurantRepo restaurantRepo;
	
	@Override
	public Food createFood(createFoodRequset req, Category category, Restaurant restaurant) {
		Food food = new Food();
		food.setFoodCategory(category);
		food.setRestaurant(restaurant);
		food.setDescription(req.getDescription());
		food.setImages(req.getImages());
		food.setName(req.getName());
		food.setPrice(req.getPrice());
		food.setIngredients(req.getIngredients());
		food.setSeasonal(req.isSeasonal());
		food.setVegetarian(req.isVegetarian());
		food.setAvailable(req.isAvailable());
		food.setCreationDate(LocalDate.now());
		
		Food savedFood = this.foodRepo.save(food);
		
		restaurant.getFoods().add(savedFood);
		return savedFood;
	}
	
	@Override
	public Food updateFood(createFoodRequset req, Category category, Restaurant restaurant, Long foodId) {
		Food food = this.foodRepo.findById(foodId).orElseThrow(()-> new ResourceNotFoundException("Food", "foodId", foodId));
		  // Update the food category and restaurant if provided
	    if (category != null) {
	        food.setFoodCategory(category);
	    }
	    if (restaurant != null) {
	        food.setRestaurant(restaurant);
	    }

	    // Update the food fields if provided, otherwise retain original values
	    if (req.getDescription() != null) {
	        food.setDescription(req.getDescription());
	    }
	    if (req.getImages() != null && !req.getImages().isEmpty()) {
	        food.setImages(req.getImages());
	    }
	    if (req.getName() != null) {
	        food.setName(req.getName());
	    }
	    if (req.getPrice() != null) {
	        food.setPrice(req.getPrice());
	    }
	    if (req.getIngredients() != null) {
	        food.setIngredients(req.getIngredients());
	    }
	  
	    Food savedFood = this.foodRepo.save(food);

	    if (restaurant != null) {
	        restaurant.getFoods().add(savedFood);
	    }

	    return savedFood;

	}

	@Override
	public void deleteFood(Long foodId) {
		Food food = this.foodRepo.findById(foodId).orElseThrow(()-> new ResourceNotFoundException("Food", "foodId", foodId));
		food.setRestaurant(null);
		this.foodRepo.delete(food);
		
	}
	

	@Override
	public List<Food> getRestaurantsFood(Long restaurantId, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory) {
		List<Food> foods = this.foodRepo.findByRestaurantId(restaurantId);
		if(isVeg) {
			foods = filterByVeg(foods,isVeg);
		}
		
		if(isNonVeg) {
			foods = filterByVeg(foods,isNonVeg);
		}
		
		if(isSeasonal) {
			foods = filterBySeasonal(foods,isSeasonal);
		}
		
		if(foodCategory != null && !foodCategory.equals("")) {
			foods = filterByCategory(foods,foodCategory);
		}
		
		return foods;
	}

	private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
		return foods.stream().filter(food -> {
			if(food.getFoodCategory()!= null) {
				return food.getFoodCategory().getName().equals(foodCategory);
			}
			return false;
		}).collect(Collectors.toList());
	}

//	private List<Food> filterByNonVeg(List<Food> foods, boolean isNonVeg) {
//		return foods.stream().filter(food-> food.isVegetarian()==false).collect(Collectors.toList());
//	}


	private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
		return foods.stream().filter(food-> food.isSeasonal()==isSeasonal).collect(Collectors.toList());
	}

	private List<Food> filterByVeg(List<Food> foods, boolean isVeg) {
		return foods.stream().filter(food-> food.isVegetarian()==isVeg).collect(Collectors.toList());
	}

	
	
	
	@Override
	public List<Food> searchFood(String keyword) {
		return this.foodRepo.searchFood(keyword);
	}

	@Override
	public Food getFoodById(Long foodId) {
		Food food = this.foodRepo.findById(foodId).orElseThrow(()-> new ResourceNotFoundException("Food", "foodId", foodId));
		return food;
	}

	@Override
	public Food updateAvailablityStatus(Long foodId) {
		Food food = this.foodRepo.findById(foodId).orElseThrow(()-> new ResourceNotFoundException("Food", "foodId", foodId));
		food.setAvailable(!food.isAvailable());
		return this.foodRepo.save(food);
	}

	

}
