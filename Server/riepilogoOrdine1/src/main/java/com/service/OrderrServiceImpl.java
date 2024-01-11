package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.entity.AddressRO;
import com.model.entity.Customer;
import com.model.entity.OrderLineItems;
import com.model.entity.Orderr;
import com.model.entity.Product;
import com.repository.AddressRORepo;
import com.repository.CustomerRepo;
import com.repository.OrderLineItemsRepo;
import com.repository.OrderrRepo;
import com.repository.ProductRepo;

import jakarta.transaction.Transactional;

@Service
public class OrderrServiceImpl implements OrderrService {

	@Autowired
	private AddressRORepo addressRORepo;

	@Autowired
	private CustomerRepo customerRepo;

	@Autowired
	private OrderLineItemsRepo orderLineItemsRepo;

	@Autowired
	private OrderrRepo orderRepo;

	@Autowired
	private ProductRepo productRepo;

	@Transactional
	public Boolean saveOrder(Orderr order) {
		Customer customer = order.getCustomer();
		Customer customerTS = order.getCustomer();
		if (customer.getCustomerId() == null) {
			customer = customerRepo.save(customer);
		} else {
			customerRepo.findById(customer.getCustomerId()).orElseGet(() -> customerRepo.save(customerTS));
		}

		order.setCustomer(customer);

		if (order.getOrderNumber() == null) {
			order = orderRepo.save(order);
		} else {
			final Orderr finalOrder = order;
			order = orderRepo.findById(finalOrder.getOrderNumber()).orElseGet(() -> orderRepo.save(finalOrder));
		}

		List<OrderLineItems> orderLineItems = order.getOrderLineItems();
		if (orderLineItems != null && !orderLineItems.isEmpty()) {
			for (OrderLineItems lineItem : orderLineItems) {
				lineItem.setOrder(order);

				Product product = lineItem.getProduct();
				if (product.getCode() == null) {
					product = productRepo.save(product);
				} else {
					final Product finalProduct = product;
					product = productRepo.findById(finalProduct.getCode())
							.orElseGet(() -> productRepo.save(finalProduct));
				}

				lineItem.setProduct(product);

				lineItem = orderLineItemsRepo.save(lineItem);
			}
		}

		AddressRO billingAddress = customer.getBillingAddress();
		AddressRO shippingAddress = customer.getShippingAddress();

		if (billingAddress != null) {
			List<Customer> bc = billingAddress.getBillingCustomers();
			bc.add(customer);
			billingAddress.setBillingCustomers(bc);

			billingAddress = addressRORepo.save(billingAddress);
		}

		if (shippingAddress != null) {
			List<Customer> sc = shippingAddress.getShippingCustomers();
			sc.add(customer);
			shippingAddress.setShippingCustomers(sc);

			shippingAddress = addressRORepo.save(shippingAddress);
		}

		customer.setBillingAddress(billingAddress);
		customer.setShippingAddress(shippingAddress);
		customerRepo.save(customer);

		return true;
	}

	@Override
	public List<Orderr> getAllOrders() {
		return orderRepo.findAll();
	}

}
