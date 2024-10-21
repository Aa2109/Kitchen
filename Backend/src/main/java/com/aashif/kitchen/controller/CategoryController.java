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
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.Category;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.repository.CategoryRepo;
import com.aashif.kitchen.request.CreateCategoryRequest;
import com.aashif.kitchen.service.CategoryService;
import com.aashif.kitchen.service.RestaurantService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private RestaurantService restaurantService;
	
	@PostMapping("/admin/category/create")
	public ResponseEntity<Category> createCategory(@RequestHeader("Authorization") String jwt,
			@RequestBody CreateCategoryRequest category) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Category createdCategory = this.categoryService.createCategory(category.getName(), category.getDescription(), user.getId(), category.getRestaurantId());
		return new ResponseEntity<Category>(createdCategory, HttpStatus.CREATED);
	}
	
	@GetMapping("/category/restaurant/{id}")
	public ResponseEntity<List<Category>> getRestaurantByCategory(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		List<Category> category = this.categoryService.getCategoryByReataurantId(id);
		return new  ResponseEntity<List<Category>>(category,HttpStatus.OK);
		
	}
	
	@GetMapping("/category/{id}")
	public ResponseEntity<Category> getCategoryById(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Category category = this.categoryService.getCategoryByCategoryId(id);
		return new  ResponseEntity<>(category,HttpStatus.OK);
		
	}
	

}
