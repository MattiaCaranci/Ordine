package com.service;

import java.util.List;

import com.model.entity.Product;

public interface ProductService {

	Boolean updateShop(List<Product> vgaList);

	List<Product> getAllProd();

}
