package com.aashif.kitchen.service;

import com.aashif.kitchen.entity.Order;
import com.aashif.kitchen.response.PaymentResponse;

public interface PaymentService {
	public PaymentResponse createPaymentLink(Order order);
}
