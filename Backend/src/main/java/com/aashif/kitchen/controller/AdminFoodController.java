package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.createFoodRequset;
import com.aashif.kitchen.response.ApiResponse;
import com.aashif.kitchen.service.FoodService;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

	@Autowired
	private FoodService foodService;
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantService restaurantService;
	
	
	@PostMapping("/create")
	public ResponseEntity<Food> createFood(@RequestBody createFoodRequset req, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
//		Restaurant restaurant = (Restaurant) this.restaurantService.getRestaurantByUserId(user.getId());//restaurantService.getRestaurantById(req.getRestaurantId())
//		Restaurant restaurant = this.restaurantService.getRestaurantByUserId(user.getId()).get(0);
		List<Restaurant> restaurants = this.restaurantService.getRestaurantByUserId(user.getId());
		Restaurant restaurant = restaurants.isEmpty() ? null : restaurants.get(0);

		Food food = this.foodService.createFood(req, req.getCategory(), restaurant);
		return new ResponseEntity<Food>(food,HttpStatus.CREATED);
		
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Food> updateFood(@RequestBody(required = false) createFoodRequset req, @PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Restaurant restaurant = this.restaurantService.getRestaurantById(req.getRestaurantId());
		Food food = this.foodService.updateFood(req, req.getCategory(), restaurant,id);
		return new ResponseEntity<Food>(food,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse> deleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		this.foodService.deleteFood(id);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Food with id: "+id+" deleted succesfully", true),HttpStatus.OK);
	}
	
	@PutMapping("/isavilable/{id}")
	public ResponseEntity<Food> updateAvilbability(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Food food = this.foodService.updateAvailablityStatus(id);
		return new ResponseEntity<Food>(food,HttpStatus.OK);
	}
	
	
}
