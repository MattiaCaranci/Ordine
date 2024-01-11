package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.entity.OrderLineItems;

public interface OrderLineItemsRepo extends JpaRepository<OrderLineItems, Integer> {

}
