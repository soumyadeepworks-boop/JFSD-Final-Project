package com.excelr.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.Category;
import com.excelr.repository.CategoryRepo;
@Service
public class CategoryService {
	@Autowired
	private CategoryRepo cr;
	public List<Category> getRecords(){
		return cr.findAll();
	}
	public Optional<Category> getRecordById(Integer id){
		return cr.findById(id);
	}
	public String updateRecord(Category c, Integer id) {
		if(cr.existsById(id)) {
			cr.save(c);
			return "Record Updated Successfully";
		}
		return "Record Not found";
	}
	public String addRecord(Category c) {
		cr.save(c);
		return "Record Added Successfully";
	}
	public String deleteRecord(Integer id) {
		if(cr.existsById(id)) {
			cr.deleteById(id);
			return "Record Deleted Successfully";
		}
		return "Record Not Found";
	}
}
