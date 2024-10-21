package com.aashif.kitchen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Long>{
	
	public List<Category> findByRestaurantId(Long id);
}
