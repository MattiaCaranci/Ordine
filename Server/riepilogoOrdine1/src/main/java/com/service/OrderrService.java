package com.service;

import java.util.List;

import com.model.entity.Orderr;

public interface OrderrService {

	Boolean saveOrder(Orderr order);

	List<Orderr> getAllOrders();

}
