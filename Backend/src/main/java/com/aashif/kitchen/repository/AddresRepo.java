package com.aashif.kitchen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashif.kitchen.entity.Address;

public interface AddresRepo extends JpaRepository<Address, Long>{

}
