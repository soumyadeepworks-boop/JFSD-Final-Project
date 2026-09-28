package com.excelr.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.excelr.entity.Products;
import com.excelr.service.ProductService;
import jakarta.validation.Valid;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService ps;
	@GetMapping
	public List<Products> getData(){
		return ps.getAllRecords();
	}
	@GetMapping("/{id}")
	public ResponseEntity<Object> getDataById(@PathVariable("id") Integer id1){
		Optional<Products> x = ps.getRecordById(id1);
		if(x.isPresent()) {
			return ResponseEntity.ok(x.get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data Not Found");
	}
	@PostMapping
	public ResponseEntity<String> addData(@Valid @RequestBody Products p){
	    return ResponseEntity.ok(ps.addRecord(p));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateData(@PathVariable("id") Integer id1, @RequestBody Products p){
		return ResponseEntity.ok(ps.updateRecord(id1, p));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteData(@PathVariable("id") Integer id1){
		return ResponseEntity.ok(ps.deleteRecord(id1));
	}
//	@GetMapping("/category/{id}")
//	public List<Products> getDataByCategory(@PathVariable("id") Integer id1){
//		return ps.getRecordsByCategory(id1);
//	}
	@GetMapping("/category/{name}")
	public List<Products> getDataByCategoryName(@PathVariable("name") String name1){
		return ps.getRecordByCategoryName(name1);
	}
	@GetMapping("/product/{name}")
	public List<Products> getDataByProductName(@PathVariable("name") String name1){
		return ps.getAllRecordsByProductName(name1);
	}
	@GetMapping("/page")
	public Page<Products> getProductsByPage(Pageable pageable) {
	    return ps.getProductsByPage(pageable);
//	    http://localhost:8080/products/page?page=0&size=10
//	    http://localhost:8080/products/page?page=0&size=10&sort=productPrice
	}
}
