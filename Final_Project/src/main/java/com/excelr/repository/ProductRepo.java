package com.excelr.repository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.excelr.entity.Products;
@Repository
public interface ProductRepo extends JpaRepository<Products, Integer>{
	public List<Products> findAllByCategory_CategoryId(Integer categoryId);
	public List<Products> findAllByCategory_CategoryName(String categoryName);
	public List<Products> findAllByProductNameContaining(String name);
	public Page<Products> findAll(Pageable pageable);
}
