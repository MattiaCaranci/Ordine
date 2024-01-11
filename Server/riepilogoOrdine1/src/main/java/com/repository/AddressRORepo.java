package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.entity.AddressRO;

public interface AddressRORepo extends JpaRepository<AddressRO, Integer> {

}
