package com.aashif.kitchen.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Category;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.CategoryRepo;
import com.aashif.kitchen.service.CategoryService;
import com.aashif.kitchen.service.RestaurantService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Override
	public Category createCategory(String name,String desc, Long userId, Long restaurantId) throws Exception{
//		List<Restaurant> restaurant = this.restaurantService.getRestaurantByUserId(userId);
		Restaurant restaurant = this.restaurantService.getRestaurantById(restaurantId);

	    // Ensure the restaurant belongs to the user
	    if (restaurant.getOwner().getId() != userId) {
	        throw new Exception("User does not own the specified restaurant");
	    }
		Category category = new Category();
		category.setName(name);
		category.setDescription(desc);
//		category.setRestaurant(restaurant.get(0));
		category.setRestaurant(restaurant);
		return this.categoryRepo.save(category);
	}

	@Override
	public List<Category> getCategoryByReataurantId(Long id)throws Exception {
		Restaurant restaurant= this.restaurantService.getRestaurantById(id);
		return this.categoryRepo.findByRestaurantId(restaurant.getId());
	}

	@Override
	public Category getCategoryByCategoryId(Long categoryId) {
		Category category = this.categoryRepo.findById(categoryId).orElseThrow(()-> new ResourceNotFoundException("Category", "categoryId", categoryId));
		return category;
	}

}
