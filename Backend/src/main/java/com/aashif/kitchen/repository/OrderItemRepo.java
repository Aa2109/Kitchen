package com.aashif.kitchen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{

}
