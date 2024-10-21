package com.aashif.kitchen.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.IngredientCategory;
import com.aashif.kitchen.entity.IngredientsItem;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.IngredientCategoryRepo;
import com.aashif.kitchen.repository.IngredientItemRepo;
import com.aashif.kitchen.service.IngredientsService;
import com.aashif.kitchen.service.RestaurantService;

@Service
public class IngredientsServiceImpl implements IngredientsService{
	
	@Autowired
	private IngredientCategoryRepo ingredientCategoryRepo;
	@Autowired
	private IngredientItemRepo ingredientItemRepo;
	@Autowired
	private RestaurantService restaurantService;
	@Override
	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
		Restaurant restaurant =this.restaurantService.getRestaurantById(restaurantId);
		IngredientCategory ingredientCategory = new IngredientCategory();
		ingredientCategory.setRestaurant(restaurant);
		ingredientCategory.setName(name);
		return this.ingredientCategoryRepo.save(ingredientCategory);
	}
	
	@Override
	public IngredientCategory getIngredientCategoryById(Long id) throws Exception {
		IngredientCategory category = this.ingredientCategoryRepo.findById(id).orElseThrow(()->
										new ResourceNotFoundException("Ingredientcategory", "id", id));
		
		return category;
	}
	@Override
	public List<IngredientCategory> getIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
		this.restaurantService.getRestaurantById(restaurantId);
		return this.ingredientCategoryRepo.findByRestaurantId(restaurantId);
	}
	
	@Override
	public IngredientsItem createIngredientItem(Long restaurantId, String ingredientname, Long categoryId)
			throws Exception {
		System.out.println("ingredientCategory "+categoryId);
		IngredientCategory category = this.ingredientCategoryRepo.findById(categoryId).orElseThrow(()->
		new ResourceNotFoundException("Ingredientcategory", "id", categoryId));
		
		Restaurant restaurant =this.restaurantService.getRestaurantById(restaurantId);
		
		IngredientsItem item = new IngredientsItem();
		item.setName(ingredientname);
		item.setRestaurant(restaurant);
		item.setCategory(category);
		
		IngredientsItem ingredient = this.ingredientItemRepo.save(item);
		category.getIngredient().add(ingredient);
		return ingredient;
	}
	@Override
	public List<IngredientsItem> getRestauransIngredients(Long restaurantId) throws Exception {
		return this.ingredientItemRepo.findByRestaurantId(restaurantId);
	}
	@Override
	public IngredientsItem updateStock(Long id) throws Exception {
		IngredientsItem item = this.ingredientItemRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("IngredientsItem", "id", id));
		item.setInStoke(!item.isInStoke());
		return this.ingredientItemRepo.save(item);
	}
	
	

}
