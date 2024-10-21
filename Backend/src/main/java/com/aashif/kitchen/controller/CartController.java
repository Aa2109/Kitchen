package com.aashif.kitchen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aashif.kitchen.entity.Cart;
import com.aashif.kitchen.entity.CartItem;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.AddCartItemRequest;
import com.aashif.kitchen.request.UpdateCartItemReq;
import com.aashif.kitchen.service.CartService;
import com.aashif.kitchen.service.UserService;

@RestController
@RequestMapping("/api/cart-item")
public class CartController {
	
	@Autowired
	private CartService cartService;
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest
			req, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		CartItem item = cartService.addItemTocart(req, user.getId());
		return new ResponseEntity<CartItem>(item, HttpStatus.CREATED);
	}
	
	@PutMapping("/update")
	public ResponseEntity<CartItem> updateItemQuantityCart(@RequestBody UpdateCartItemReq
			req, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		CartItem item = cartService.updatecartItem(req.getCartItemId(), req.getQuantity());
		
		return new ResponseEntity<CartItem>(item, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}/remove")
	public ResponseEntity<Cart> removeCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Cart item = this.cartService.removeItemFromCart(id, jwt);
		return new ResponseEntity<Cart>(item, HttpStatus.OK);
	}
	
	@PutMapping("/cart/clear")
	public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Cart item = this.cartService.clearCart(user.getId());
		return new ResponseEntity<Cart>(item, HttpStatus.OK);
	}
	
	@GetMapping("/cart")
	public ResponseEntity<Cart> getUserCart(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = this.userService.findUserByJwtToken(jwt);
		Cart item = this.cartService.getCartByUser(user.getId());
		return new ResponseEntity<Cart>(item, HttpStatus.OK);
	}
	
	
}
