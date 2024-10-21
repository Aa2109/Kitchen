package com.aashif.kitchen.ServiceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Address;
import com.aashif.kitchen.entity.Cart;
import com.aashif.kitchen.entity.CartItem;
import com.aashif.kitchen.entity.Order;
import com.aashif.kitchen.entity.OrderItem;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.exception.ResourceNotFoundException;
import com.aashif.kitchen.repository.AddresRepo;
import com.aashif.kitchen.repository.OrderItemRepo;
import com.aashif.kitchen.repository.OrderRepo;
import com.aashif.kitchen.repository.RestaurantRepo;
import com.aashif.kitchen.repository.UserRepo;
import com.aashif.kitchen.request.OrderServiceReq;
import com.aashif.kitchen.service.CartService;
import com.aashif.kitchen.service.OrderService;
import com.aashif.kitchen.service.RestaurantService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepo orderRepo;
	@Autowired
	private OrderItemRepo orderItemRepo;
	@Autowired
	private AddresRepo addresRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private CartService cartService;
	@Autowired
	private RestaurantRepo restaurantRepo;
	
	
	@Override
	public Order createOrder(OrderServiceReq req, User user1) throws Exception {
		Address address = req.getDeliveryAddress();
		Address savedAddress = this.addresRepo.save(address);
		User user = this.userRepo.findById(user1.getId()).orElseThrow(()-> new ResourceNotFoundException("user", "id", user1.getId()));
		if(user.getAddress().contains(savedAddress)) {
			user.getAddress().add(savedAddress);
		}
		Restaurant restaurant = this.restaurantService.getRestaurantById(req.getRestaurantId());
		
		Order order = new Order();
		order.setCustomer(user);
		order.setCreatedAt(new Date());
		order.setOrderStatus("PENDING");
		order.setDeliveryAdress(address);
		order.setRestaurant(restaurant);
		
		Cart cart = this.cartService.getCartByUser(user.getId());
		List<OrderItem> orderItems = new ArrayList<>();
		for(CartItem item : cart.getItem()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setFood(item.getFood());
			orderItem.setIngredients(item.getIngredients());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setTotalPrice(item.getTotalPrice());
			
			OrderItem savedOderItem = this.orderItemRepo.save(orderItem);
			orderItems.add(savedOderItem);
		}
		
		order.setItems(orderItems);
		order.setPrice(cartService.calculateCartTotals(cart));
		
		Order savedOrder = this.orderRepo.save(order);
		restaurant.getOrders().add(savedOrder);
		return savedOrder;
	}

	@Override
	public Order updateOrder(Long orderId, String orderStatus)throws Exception {
		Order order = getOrderById(orderId);
		if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") ||
								orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
			order.setOrderStatus(orderStatus);
			return this.orderRepo.save(order);
			
		}
		throw new Exception("Please select a valid order status");
	}

	@Override
	public void cancelOrder(Long orderId)throws Exception {
		Order order = this.orderRepo.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Order", "id", orderId));
		Order order1 = getOrderById(order.getId());
		this.orderItemRepo.deleteById(order1.getId());
		
	}

	@Override
	public List<Order> getUserOrder(Long userId) {
		User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("Order", "id", userId));
		return orderRepo.findByCustomerId(user.getId());
	}

	@Override
	public List<Order> getRastaurantOrder(Long restaurantId, String orderStatus) {
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()->
									new ResourceNotFoundException("Restaurant", "id", restaurantId));
		List<Order> orders = this.orderRepo.findByRestaurantId(restaurant.getId());
		if(orderStatus != null) {
			orders = orders.stream().filter(order->
											order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
		}
		return orders;
	}

	@Override
	public Order getOrderById(Long orderId) throws Exception{
		Order order = this.orderRepo.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Order", "id", orderId));
		return order;
	}

}
