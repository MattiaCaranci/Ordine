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
public class AddressRO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String street;

	private String city;

	private String state;

	private Integer postalCode;

	@OneToMany(mappedBy = "billingAddress")
	private List<Customer> billingCustomers;

	@OneToMany(mappedBy = "shippingAddress")
	private List<Customer> shippingCustomers;

}