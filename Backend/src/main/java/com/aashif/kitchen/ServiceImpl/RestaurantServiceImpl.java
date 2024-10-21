package com.aashif.kitchen.ServiceImpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.dto.RestaurantDto;
import com.aashif.kitchen.entity.Address;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.AddresRepo;
import com.aashif.kitchen.repository.RestaurantRepo;
import com.aashif.kitchen.repository.UserRepo;
import com.aashif.kitchen.request.CreateRestaurantRequest;
import com.aashif.kitchen.service.RestaurantService;


@Service
public class RestaurantServiceImpl implements RestaurantService{

	@Autowired
	private RestaurantRepo restaurantRepo;
	@Autowired
	private AddresRepo addresRepo;
	@Autowired
	private UserRepo userRepo;
	
	@Override
	public Restaurant createRestaurant(CreateRestaurantRequest req, User user)throws Exception {
		 Address address = this.addresRepo.save(req.getAddress());
		 Restaurant restaurant = new Restaurant();
		 restaurant.setAddress(address);
		 restaurant.setContactInformation(req.getContactInformation());
		 restaurant.setCuisineType(req.getCuisineType());
		 restaurant.setDescription(req.getDescription());
		 restaurant.setImages(req.getImages());
		 restaurant.setName(req.getName());
		 restaurant.setOpeningHours(req.getOpeningHour());
		 restaurant.setRegistration(LocalDateTime.now());
		 restaurant.setOwner(user);
//		 restaurant.setOpen(true);
		return this.restaurantRepo.save(restaurant);
	}

	@Override
	public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant ,Long userId){
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()-> new ResourceNotFoundException("Restaurant", "restaurantId", restaurantId));
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "UserId", userId));
		restaurant.setCuisineType(updateRestaurant.getCuisineType());
		restaurant.setDescription(updateRestaurant.getDescription());
		restaurant.setContactInformation(updateRestaurant.getContactInformation());
		restaurant.setImages(updateRestaurant.getImages());
		restaurant.setName(updateRestaurant.getName());
		restaurant.setAddress(updateRestaurant.getAddress());
		restaurant.setOpeningHours(updateRestaurant.getOpeningHour());
		restaurant.setOwner(user);
		return this.restaurantRepo.save(restaurant);
	}

	@Override
	public void deleteRestaurant(Long restaurantId) {
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()-> new ResourceNotFoundException("Restaurant", "restaurantId", restaurantId));
		this.restaurantRepo.delete(restaurant);
	}

	@Override
	public List<Restaurant> getAllRestaurant()throws Exception {
		List<Restaurant> retaurants = this.restaurantRepo.findAll();
		return retaurants;
	}

	@Override
	public List<Restaurant> searchRestaurantByQuery(String query)throws Exception{
		
		return this.restaurantRepo.findBySerachQuery(query);
	}

	@Override
	public Restaurant getRestaurantById(Long restaurantId) throws Exception{
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()-> new ResourceNotFoundException("Restaurant", "restaurantId", restaurantId));
		return restaurant;
	}

	@Override
	public List<Restaurant> getRestaurantByUserId(Long userId){
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "UserId", userId));
		return this.restaurantRepo.findByOwnerId(user.getId());
	}

	@Override
	public RestaurantDto addToFavourite(Long restaurantId, User user){
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()-> new ResourceNotFoundException("Restaurant", "restaurantId", restaurantId));
		
		RestaurantDto dto= new RestaurantDto();
		dto.setDescription(restaurant.getDescription());
		dto.setImages(restaurant.getImages());
		dto.setTitle(restaurant.getName());
		dto.setId(restaurant.getId());
		
		boolean isFav = false;
		
		List<RestaurantDto> favorites = user.getFavorites();
		for(RestaurantDto favorite: favorites) {
			if(favorite.getId() == restaurantId) {
				isFav = true;
				break;
			}
		}
		
		if(isFav) {
			favorites.removeIf(fav -> fav.getId() == restaurantId);
		}
		else {
			favorites.add(dto);
		}
		
		this.userRepo.save(user);
		return dto;
	}

	@Override
	public Restaurant updateRestaurantStatus(Long restaurantId){
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()-> new ResourceNotFoundException("Restaurant", "restaurantId", restaurantId));
		restaurant.setOpen(!restaurant.isOpen());
		Restaurant savedResturant = restaurantRepo.save(restaurant);
		return savedResturant;
	}

}
