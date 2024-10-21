package com.aashif.kitchen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.CartItem;
import com.aashif.kitchen.entity.Order;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.AddCartItemRequest;
import com.aashif.kitchen.request.OrderServiceReq;
import com.aashif.kitchen.response.PaymentResponse;
import com.aashif.kitchen.service.OrderService;
import com.aashif.kitchen.service.PaymentService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/order/user")
public class UserOrderController {
	
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/create")
	public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderServiceReq req, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Order order = this.orderService.createOrder(req, user);
		PaymentResponse res = paymentService.createPaymentLink(order);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@GetMapping("/get")
	public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		List<Order> orders = this.orderService.getUserOrder(user.getId());
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}
	
}
