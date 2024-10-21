package com.aashif.kitchen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.IngredientsItem;

public interface IngredientItemRepo extends JpaRepository<IngredientsItem, Long>{
	
	List<IngredientsItem> findByRestaurantId(Long id);

}
