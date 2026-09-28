package com.excelr.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.entity.Category;
import com.excelr.service.CategoryService;
@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService cs;
	@GetMapping
	public List<Category> getCategoryRecord(){
		return cs.getRecords();
	}
	@GetMapping("/{id}")
	public ResponseEntity<Object> getSingleCategoryRecord(@PathVariable("id") Integer id1){
		Optional<Category> x =  cs.getRecordById(id1);
		if(x.isPresent()) {
			return ResponseEntity.ok(x.get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record Not Found");
	}
	@PostMapping
	public ResponseEntity<String> saveData(@RequestBody Category c){
		return ResponseEntity.ok(cs.addRecord(c));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateData(@PathVariable("id") Integer id1, @RequestBody Category c){
		return ResponseEntity.ok(cs.updateRecord(c, id1));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable("id") Integer id1){
		return ResponseEntity.ok(cs.deleteRecord(id1));
	}
}
