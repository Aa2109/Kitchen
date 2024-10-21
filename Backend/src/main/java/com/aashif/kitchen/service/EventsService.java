package com.aashif.kitchen.service;

import java.util.List;

import com.aashif.kitchen.entity.Events;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.request.createEventRequest;

public interface EventsService {

	Events createEvents(createEventRequest req,Restaurant restaurant);
	Events getEventsById(int id)throws Exception;
	List<Events> getEventsByRestaurant(long restaurantId)throws Exception;
	Events updateEvents(createEventRequest req, int eventId) throws Exception;
	void deleteEvents(int eventId) throws Exception;
	
}
