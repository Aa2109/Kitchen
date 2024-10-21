package com.aashif.kitchen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.Events;

public interface EventsRepo extends JpaRepository<Events, Integer>{

}
