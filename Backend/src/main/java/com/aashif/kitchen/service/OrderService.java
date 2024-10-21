package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.entity.Order;
import com.aashif.kitchen.entity.User;
import com.aashif.kitchen.request.OrderServiceReq;

public interface OrderService {

	Order createOrder(OrderServiceReq req, User user)throws Exception;
	Order updateOrder(Long orderId, String orderStatus) throws Exception;
	void cancelOrder(Long orderId)throws Exception;
	List<Order> getUserOrder(Long userId);
	List<Order> getRastaurantOrder(Long restaurantId, String orderStatus);
	Order getOrderById(Long orderId) throws Exception;
}
