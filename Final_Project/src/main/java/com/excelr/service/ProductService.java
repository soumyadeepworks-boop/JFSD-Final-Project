package com.excelr.service;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.excelr.entity.Products;
import com.excelr.repository.ProductRepo;
@Service
public class ProductService {
	@Autowired
	private ProductRepo pr;
	public List<Products> getAllRecords(){
		return pr.findAll();
	}
	public Optional<Products> getRecordById(Integer id){
		return pr.findById(id);
	}
	public String addRecord(Products p) {
		pr.save(p);
		return "Data Added Successfully";
	}
	public String updateRecord(Integer id, Products p) {
		if(pr.existsById(id)) {
			pr.save(p);
			return "Data Updated Successfully";
		}
		return "Data No Found";
	}
	public String deleteRecord(Integer id) {
		if(pr.existsById(id)) {
			pr.deleteById(id);
			return "Data Deleted Successfully";
		}
		return "Data Not Found";
	}
	public List<Products> getRecordsByCategory(Integer id){
		return pr.findAllByCategory_CategoryId(id);
	}
	public List<Products> getRecordByCategoryName(String name){
		return pr.findAllByCategory_CategoryName(name);
	}
	public List<Products> getAllRecordsByProductName(String name){
		return pr.findAllByProductNameContaining(name);
	}
	public Page<Products> getProductsByPage(Pageable pageable) {
	    return pr.findAll(pageable);
	}
}
