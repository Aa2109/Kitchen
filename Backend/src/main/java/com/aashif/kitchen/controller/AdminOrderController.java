package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.*;
import com.aashif.kitchen.service.OrderService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	


	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<Order>> getRestaurantOrder(@PathVariable Long id, @RequestParam(required = false) String order_status 
				,@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		List<Order> order = this.orderService.getRastaurantOrder(id,order_status);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/{orderStatus}")
	public ResponseEntity<Order> updateOrderStaus(@PathVariable Long orderId, @PathVariable String orderStatus 
			,@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Order order = this.orderService.updateOrder(orderId, orderStatus);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
	

}
