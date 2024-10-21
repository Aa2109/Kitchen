package com.aashif.kitchen.service;

import com.aashif.kitchen.entity.Cart;
import com.aashif.kitchen.entity.CartItem;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.AddCartItemRequest;

public interface CartService {

	CartItem addItemTocart(AddCartItemRequest req, Long userId)throws Exception;
	CartItem updatecartItem(Long cartItemId, int quantity);
	Cart removeItemFromCart(Long cartItemId, String jwt)throws Exception;
	Long calculateCartTotals(Cart cart)throws Exception;
	Cart getCartById(Long cartId);
	Cart getCartByUser(Long userId);
	Cart clearCart(Long userId)throws Exception;
}
