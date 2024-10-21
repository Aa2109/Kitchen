package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.dto.RestaurantDto;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.CreateRestaurantRequest;

public interface RestaurantService {

	public Restaurant createRestaurant(CreateRestaurantRequest req, User user)throws Exception;
	
	public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant, Long userId);
	
	public void deleteRestaurant(Long restaurantId );
	
	public List<Restaurant> getAllRestaurant()throws Exception ;
	
	public List<Restaurant> searchRestaurantByQuery(String query)throws Exception;
	
	public Restaurant getRestaurantById(Long restaurantid) throws Exception;
	
	public List<Restaurant> getRestaurantByUserId(Long userId);
	
	public RestaurantDto addToFavourite(Long restaurantId, User user);
	
	public Restaurant updateRestaurantStatus(Long restaurantId);
}
