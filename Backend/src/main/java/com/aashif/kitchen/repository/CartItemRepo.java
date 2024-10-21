package com.aashif.kitchen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long>{

}
