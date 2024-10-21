package com.aashif.kitchen.request;

import java.time.LocalDateTime;
import java.util.List;

import com.aashif.kitchen.contactInfo.ContactInformation;
import com.aashif.kitchen.entity.Address;

import lombok.Data;

@Data
public class CreateRestaurantRequest {

	private Long id;
	private String name;
	private String description;
	private String cuisineType;
	private Address address;
	private String openingHour;
	private ContactInformation contactInformation;
	private List<String> images;
	
	
}
