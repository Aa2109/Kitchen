package com.aashif.kitchen.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Cart;
import com.aashif.kitchen.entity.CartItem;
import com.aashif.kitchen.entity.Food;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.CartItemRepo;
import com.aashif.kitchen.repository.CartRepo;
import com.aashif.kitchen.repository.FoodRepo;
import com.aashif.kitchen.repository.UserRepo;
import com.aashif.kitchen.request.AddCartItemRequest;
import com.aashif.kitchen.service.CartService;
import com.aashif.kitchen.service.FoodService;
import com.aashif.kitchen.service.UserService;

@Service
public class CartServiceImpl implements CartService{

	@Autowired
	private CartRepo cartRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CartItemRepo cartItemRepo;
	@Autowired
	private FoodService foodService;
	@Autowired
	private UserService userService;
	
	
	@Override
	public CartItem addItemTocart(AddCartItemRequest req, Long userId) throws Exception {
		
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "userId", userId));
		Food food = this.foodService.getFoodById(req.getFoodId());
		Cart cart = this.cartRepo.findByCustomerId(user.getId());
		
		for(CartItem cartItem : cart.getItem()) {
			if(cartItem.getFood().equals(food)) {
				int newQuantity = cartItem.getQuantity() + req.getQuantity(); 
				return updatecartItem(cartItem.getId(), newQuantity);
			}
		}
		CartItem newCartItem = new CartItem();
		newCartItem.setFood(food);
		newCartItem.setCart(cart);
		newCartItem.setQuantity(req.getQuantity());
		newCartItem.setIngredients(req.getIngredients());
		newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());
		
		CartItem savedcartItem = this.cartItemRepo.save(newCartItem);
		cart.getItem().add(savedcartItem);
	
		return savedcartItem;
	}

	@Override
	public CartItem updatecartItem(Long cartItemId, int quantity) {
		CartItem cartItem = this.cartItemRepo.findById(cartItemId).orElseThrow(()->new ResourceNotFoundException("CartItem", "id", cartItemId));
		cartItem.setQuantity(quantity);
		cartItem.setTotalPrice(cartItem.getFood().getPrice() * quantity);
		return this.cartItemRepo.save(cartItem);
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
		User user = this.userService.findUserByJwtToken(jwt);
		Cart cart = this.cartRepo.findByCustomerId(user.getId());
		CartItem cartItem = this.cartItemRepo.findById(cartItemId).orElseThrow(()->new ResourceNotFoundException("CartItem", "id", cartItemId));
		cart.getItem().remove(cartItem);
		return this.cartRepo.save(cart);
		
	}

	@Override
	public Long calculateCartTotals(Cart cart) throws Exception{
		Long total = 0L;
		for(CartItem item : cart.getItem()) {
			total += item.getFood().getPrice() * item.getQuantity();
//			System.out.println(total);
		}
		System.out.println("total= "+total);
		return total;
	}

	@Override
	public Cart getCartById(Long cartId) {
		Cart cart  = this.cartRepo.findById(cartId).orElseThrow(()-> new ResourceNotFoundException("Cart", "id", cartId));
		return cart;
	}

	@Override
	public Cart getCartByUser(Long userId) {
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("user", "id", userId));
		Cart cart = this.cartRepo.findByCustomerId(user.getId());
		try {
			cart.setTotal(calculateCartTotals(cart));
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return cart;
	}

	@Override
	public Cart clearCart(Long userId) throws Exception {
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User", "userId", userId));
		Cart cart = getCartByUser(user.getId());
		cart.getItem().clear();
		return this.cartRepo.save(cart);
	}

}
