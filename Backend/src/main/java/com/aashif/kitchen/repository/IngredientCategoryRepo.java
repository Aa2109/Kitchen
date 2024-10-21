package com.aashif.kitchen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.IngredientCategory;

public interface IngredientCategoryRepo extends JpaRepository<IngredientCategory,Long>{
	
	List<IngredientCategory> findByRestaurantId(Long id);
	
}
