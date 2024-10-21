package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.IngredientCategory;
import com.aashif.kitchen.entity.IngredientsItem;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.IngredientCategoryReq;
import com.aashif.kitchen.request.IngredientItemreq;
import com.aashif.kitchen.service.IngredientsService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/admin/ingredient")

public class IngredientController {

	@Autowired
	private IngredientsService ingredientsService;
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/create/category")
	public ResponseEntity<IngredientCategory> createIG(@RequestBody IngredientCategoryReq req, @RequestHeader("Authorization")String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		IngredientCategory item = this.ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId());
		return new ResponseEntity<IngredientCategory>(item,HttpStatus.CREATED);
	}
	
	@PostMapping("/create/item")
	public ResponseEntity<IngredientsItem> createII(@RequestBody IngredientItemreq req, @RequestHeader("Authorization")String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		IngredientsItem item = this.ingredientsService.createIngredientItem(req.getRestaurantId(),req.getName(), req.getCategoryId());
		return new ResponseEntity<>(item,HttpStatus.CREATED);
	}
	
//	@PostMapping("/create")
//	public ResponseEntity<IngredientsItem> createIG(@RequestBody IngredientItemreq req, @RequestHeader("Authorization")String jwt) throws Exception{
//		User user =this.userService.findUserByJwtToken(jwt);
//		IngredientsItem item = this.ingredientsService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getCategoryId());
//		return new ResponseEntity<IngredientsItem>(item, HttpStatus.CREATED);
//	}
	
	@PutMapping("/update/stock/{id}")
	public ResponseEntity<IngredientsItem> udpdateIstock(@PathVariable Long id, @RequestHeader("Authorization")String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		System.out.println(">>>>>>>>>>>"+jwt);
		IngredientsItem item = this.ingredientsService.updateStock(id);
		return new ResponseEntity<IngredientsItem>(item, HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<IngredientsItem>> getRIngredient(@PathVariable Long id, @RequestHeader("Authorization")String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		List<IngredientsItem> items = this.ingredientsService.getRestauransIngredients(id);
		return new ResponseEntity<List<IngredientsItem>>(items, HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}/category")
	public ResponseEntity<List<IngredientCategory>> getRICategory(@PathVariable Long id, @RequestHeader("Authorization")String jwt) throws Exception{
		User user =this.userService.findUserByJwtToken(jwt);
		List<IngredientCategory> items = this.ingredientsService.getIngredientCategoryByRestaurantId(id);
		return new ResponseEntity<List<IngredientCategory>>(items, HttpStatus.OK);
	}
	
	
}
