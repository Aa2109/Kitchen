package com.aashif.kitchen.request;

import com.aashif.kitchen.entity.Address;

import lombok.Data;

@Data
public class OrderServiceReq {

	private Long restaurantId;
	private Address deliveryAddress;
}
