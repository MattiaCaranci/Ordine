package com.model.entity;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CurrentTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Orderr {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderNumber;

	@CurrentTimestamp
	private Timestamp orderDate;

	private Double totalAmount;

	@OneToMany(mappedBy = "order")
	private List<OrderLineItems> orderLineItems;

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;

}
