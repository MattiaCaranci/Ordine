package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Product {

	// code, name, variants, description, price, retailer

	@Id
	private Integer code;
	private String name;
	private String variants;
	private String description;
	private Integer price;
	private String retailer;

}
