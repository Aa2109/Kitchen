package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.dto.RestaurantDto;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/user/restaurant")
public class UserRestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private UserService userService;
	
	@GetMapping("/all")
	public ResponseEntity <List<Restaurant>> findAllRestaurant(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(this.restaurantService.getAllRestaurant());
	}
	
	@GetMapping("/search")
	public ResponseEntity <List<Restaurant>> searchAllRestaurantByQuery(@RequestParam String search, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(this.restaurantService.searchRestaurantByQuery(search));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> findSingleRestaurant(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		return ResponseEntity.ok(this.restaurantService.getRestaurantById(id));
	}
	
	@PutMapping("/{id}/add-favorite")
	public ResponseEntity<RestaurantDto> addFavourite(@PathVariable Long id, /*@RequestBody User user,*/ @RequestHeader("Authorization") String jwt) throws Exception{
		System.out.println(jwt);
		User user = this.userService.findUserByJwtToken(jwt);
		//RestaurantDto dto = this.restaurantService.addToFavourite(id, user);
		return ResponseEntity.ok(this.restaurantService.addToFavourite(id, user));
	}

}
