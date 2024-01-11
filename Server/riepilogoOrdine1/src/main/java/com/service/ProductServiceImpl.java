package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.entity.Product;
import com.repository.ProductRepo;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepo productRepo;

	@Override
	public Boolean updateShop(List<Product> pList) {
		if (pList != null) {
			productRepo.saveAll(pList);
			return true;
		}
		return false;
	}

	@Override
	public List<Product> getAllProd() {
		return productRepo.findAll();

	}

}
