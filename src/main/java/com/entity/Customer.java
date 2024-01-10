package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Customer {
	// id, firstname, lastname, age, email, phone, locale,
	// billingAddress,shippingAddress

	@Id
	private Integer id;
	private String firstName;
	private String lastName;
	private Integer age;
	private String email;
	private Integer phone;
	private String locale;
	private String billingAddress;
	private String shippingAddress;

}
