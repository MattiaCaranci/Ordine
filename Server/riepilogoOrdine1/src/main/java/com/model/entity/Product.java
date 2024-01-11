package com.model.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer code;

	private String name;

	private List<String> variants;

	private String description;

	private Double price;

	private String retailer;

	// Alcune modifiche qui, utilizziamo List invece di ArrayList
	@OneToMany(mappedBy = "product")
	private List<OrderLineItems> orderLineItemsList;
}
