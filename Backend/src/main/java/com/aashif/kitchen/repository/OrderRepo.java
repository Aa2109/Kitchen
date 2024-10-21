package com.aashif.kitchen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Long>{
	
	List<Order> findByCustomerId(Long userId);
	List<Order> findByRestaurantId(Long restaurantId);

}
