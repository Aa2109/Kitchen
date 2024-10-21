package com.aashif.kitchen.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.dto.RestaurantDto;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.CreateRestaurantRequest;
import com.aashif.kitchen.response.ApiResponse;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/admin/restaurant")
public class AdminRestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<Restaurant> createRestaurant(
			@RequestBody CreateRestaurantRequest req,@RequestHeader("Authorization") String jwt) throws Exception{
		System.out.println(jwt);
		User user = this.userService.findUserByJwtToken(jwt);
		Restaurant restaurant =this.restaurantService.createRestaurant(req, user);
		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.CREATED);
		
	}
	
	@PutMapping("/update/{restaurantId}/user/{userId}")
	public ResponseEntity<Restaurant> upateRestaurant(
			@RequestBody CreateRestaurantRequest req,@RequestHeader("Authorization") String jwt, @PathVariable Long restaurantId, @PathVariable
			Long userId) throws Exception{
		
		User user = this.userService.findUserByJwtToken(jwt);
		Restaurant restaurant =this.restaurantService.updateRestaurant(restaurantId, req, userId);
		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{restaurantId}")
	public ResponseEntity<?> deleteRestaurant(@PathVariable("restaurantId") Long restaurantId, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		this.restaurantService.deleteRestaurant(restaurantId);
//		return new ResponseEntity(Map.of("message", "Restaurant deleted successfully"),HttpStatus.OK);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Restaurant with id: "+restaurantId+" deleted succeswsfully", true),HttpStatus.OK);
	}
		
	@GetMapping("/user")
	public ResponseEntity<List<Restaurant>> findRestaurantByUser(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(this.restaurantService.getRestaurantByUserId(user.getId()));
	}
		
	@PutMapping("/{id}/status")
	public ResponseEntity<Restaurant> updateStatus(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		
		return ResponseEntity.ok(this.restaurantService.updateRestaurantStatus(id));
	}
	
}
