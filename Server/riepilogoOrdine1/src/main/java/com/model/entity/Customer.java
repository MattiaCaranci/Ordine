package com.model.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_id")
	private Integer customerId;

	private String firstname;

	private String lastname;

	private Integer age;

	private String email;

	private String phone;

	private String locale;

	@ManyToOne
	@JoinColumn(name = "billing_address_id")
	private AddressRO billingAddress;

	@ManyToOne
	@JoinColumn(name = "shipping_address_id")
	private AddressRO shippingAddress;

	@OneToMany(mappedBy = "customer")
	private List<Orderr> orders;

}
