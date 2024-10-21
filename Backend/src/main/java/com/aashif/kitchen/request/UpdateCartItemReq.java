package com.aashif.kitchen.request;

import lombok.Data;

@Data
public class UpdateCartItemReq {

	private Long cartItemId;
	private int quantity;
}
