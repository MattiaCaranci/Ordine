package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Order {
	// orderNumber, orderDate, totalAmount, orderLineItems

	@Id
	private Integer orderNumber;

	private Integer orderDate;
	private Integer totalAmount;
	private OrderLineItems orderLineItems;

}
