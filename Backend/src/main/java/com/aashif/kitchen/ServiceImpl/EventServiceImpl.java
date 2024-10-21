package com.aashif.kitchen.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aashif.kitchen.entity.Events;
import com.aashif.kitchen.entity.Restaurant;
import com.aashif.kitchen.repository.EventsRepo;
import com.aashif.kitchen.repository.RestaurantRepo;
import com.aashif.kitchen.request.createEventRequest;
import com.aashif.kitchen.service.EventsService;

@Service
public class EventServiceImpl implements EventsService{

	@Autowired
	public RestaurantRepo restaurantRepo;
	
	@Autowired
	public EventsRepo eventsRepo;
	@Override
	public Events createEvents(createEventRequest req, Restaurant restaurant){
		Events events = new Events();
		events.setName(req.getName());
		events.setLocation(req.getLocation());
		events.setUrls(req.getUrls());
		events.setStartedAt(req.getStartedAt());
		events.setEndsAt(req.getEndsAt());
		events.setRestaurant(restaurant);
		
		Events savedEvents = eventsRepo.save(events);
		
		restaurant.getEvents().add(savedEvents);
		
		return savedEvents;
	}

	@Override
	public Events getEventsById(int id) throws Exception{
		
		Events events = this.eventsRepo.findById(id).orElseThrow(()-> new Exception("Event not Found with id: "+ id));
		return events;
	}

	@Override
	public Events updateEvents(createEventRequest req,int eventId) throws Exception {
		Events ev = this.eventsRepo.findById(eventId).orElseThrow(()->(new Exception("Event not Found of ebentId: "+eventId)));
		if (req.getName() != null) {
		    ev.setName(req.getName());
		}
		if (req.getLocation() != null) {
		    ev.setLocation(req.getLocation());
		}
		if (req.getUrls() != null) {
		    ev.setUrls(req.getUrls());
		}
		if (req.getStartedAt() != null) {
		    ev.setStartedAt(req.getStartedAt());
		}
		if (req.getEndsAt() != null) {
			ev.setEndsAt(req.getEndsAt());
		}
		return ev;
	}

	@Override
	public void deleteEvents(int eventId) throws Exception {
		Events ev = this.eventsRepo.findById(eventId).orElseThrow(()->(new Exception("Event not Found of ebentId: "+eventId)));
		ev.setRestaurant(null);
		this.eventsRepo.delete(ev);
	}

	@Override
	public List<Events> getEventsByRestaurant(long restaurantId) throws Exception {
		Restaurant restaurant = this.restaurantRepo.findById(restaurantId).orElseThrow(()->(new Exception("Event not Found of restaurantId: "+restaurantId)));
		List<Events> list = restaurant.getEvents();
		return list;
	}

}
