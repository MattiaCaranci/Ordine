package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class OrderLineItems {
	// d, product, amount, quantity

	@Id
	private Integer id;
	private String product;
	private Integer amount;
	private Integer quantity;

}
