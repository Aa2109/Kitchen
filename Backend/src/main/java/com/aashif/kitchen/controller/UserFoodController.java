package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.createFoodRequset;
import com.aashif.kitchen.service.FoodService;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/food/")
public class UserFoodController {
	
	@Autowired
	private FoodService foodService;
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantService restaurantService;
	
	
	@GetMapping("/search")
	public ResponseEntity<List<Food>> searchFood(@RequestParam String keyword, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		List<Food> food = this.foodService.searchFood(keyword);
		return new ResponseEntity<List<Food>>(food,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<Food>> getResataurantFood(@RequestParam(required = false) boolean vegetarian, @RequestParam(required = false) boolean seasonal,
			@RequestParam(required = false) boolean nonVeg, @RequestParam(required = false) String food_category,
			@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		List<Food> food = this.foodService.getRestaurantsFood(id,vegetarian,nonVeg,seasonal,food_category);
		return new ResponseEntity<List<Food>>(food,HttpStatus.OK);
		
	}

}
