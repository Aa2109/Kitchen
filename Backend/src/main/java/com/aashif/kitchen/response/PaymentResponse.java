package com.aashif.kitchen.response;

import lombok.Data;

@Data
public class PaymentResponse {
	private String payment_url;
	private String error;
}
