package com.aashif.kitchen.ServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Order;
import com.aashif.kitchen.response.PaymentResponse;
import com.aashif.kitchen.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImpl implements PaymentService{

	@Value("${stripe_aapi_key}")
	private String stripeSecretKey;
	@Override
	public PaymentResponse createPaymentLink(Order order) {
		Stripe.apiKey = stripeSecretKey;
		SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(
				SessionCreateParams
				.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/payment/success/"+order.getId())
				.setCancelUrl("http://localhost:3000/payment/fail/")
				.addLineItem(SessionCreateParams.LineItem.builder()
						.setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("INR").setUnitAmount((long) order.getPrice()*100)
								.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
										.setName("Aashif's Kitchen").build()
										).build()
						).build()
				).build();
		
		
		
		PaymentResponse res = new PaymentResponse();
			try {
				Session session = Session.create(params);
				res.setPayment_url(session.getUrl());
			} catch (StripeException e) {
				
				e.printStackTrace();
				 res.setError("Payment link creation failed: " + e.getMessage());
			}
		
		
		
		return res;
	}

}
