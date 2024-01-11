package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.entity.Orderr;
import com.model.entity.Product;
import com.service.OrderrService;
import com.service.ProductService;

@RestController
@RequestMapping("/api/riepOrder")
public class RiepOrderController {

	@Autowired
	private ProductService ps;

	@Autowired
	private OrderrService os;

	@PostMapping("/arrivingProducts")
	public ResponseEntity<?> arrivingProducts(@RequestBody List<Product> pList) {
		Boolean res = ps.updateShop(pList);
		return new ResponseEntity<>("is the restock successful'" + res, HttpStatus.OK);

	}

	@GetMapping("/getProducts")
	public ResponseEntity<?> getProducts() {
		List<Product> res = ps.getAllProd();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/arrivingOrder")
	public ResponseEntity<?> arrivingOrder(@RequestBody Orderr order) {
		Boolean res = os.saveOrder(order);
		return new ResponseEntity<>("boh sembra essere andata'" + res, HttpStatus.OK);

	}

}
