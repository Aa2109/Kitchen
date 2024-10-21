package com.aashif.kitchen.controller;

import java.util.List;

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

import com.aashif.kitchen.entity.Events;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.createEventRequest;
import com.aashif.kitchen.response.ApiResponse;
import com.aashif.kitchen.service.EventsService;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/admin/restaurant")
public class EventsController {
	
	
	@Autowired
	private EventsService eventsService;
	@Autowired
	private UserService userService;
	@Autowired
	private RestaurantService restaurantService;
	
	@PostMapping("/create/events")
	public ResponseEntity<Events> createEvents(@RequestBody createEventRequest req, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Restaurant restaurant = this.restaurantService.getRestaurantByUserId(user.getId()).get(0);
		Events ev = this.eventsService.createEvents(req, restaurant);
		return new ResponseEntity<Events>(ev, HttpStatus.CREATED);
		
	}
	
	@PutMapping("/update/{id}/events")
	public ResponseEntity<Events> updateEvents(@RequestBody createEventRequest req, @PathVariable int id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		//Restaurant restaurant = this.restaurantService.getRestaurantByUserId(user.getId()).get(0);
		Events ev = this.eventsService.updateEvents(req, id);
		return new ResponseEntity<Events>(ev, HttpStatus.OK);
		
	}
	
	@GetMapping("/get/{id}/events")
	public ResponseEntity<Events> getEventsById(@PathVariable int id,@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Events ev = this.eventsService.getEventsById(id);
		return new ResponseEntity<Events>(ev, HttpStatus.OK);
		
	}
	@GetMapping("/getByRestaurant/events")
	public ResponseEntity<List<Events>> getEventsByRestaurantId(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Restaurant restaurant = this.restaurantService.getRestaurantByUserId(user.getId()).get(0);
		List<Events> ev = this.eventsService.getEventsByRestaurant(restaurant.getId());
		return new ResponseEntity<List<Events>>(ev, HttpStatus.OK);
		
	}
	@DeleteMapping("/delete/{id}/events")
	public ResponseEntity<ApiResponse> deleteEvents(@PathVariable int id,@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		this.eventsService.deleteEvents(id);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Events with id: "+id+" deleted succesfully", true),HttpStatus.OK);
	}
	
}
