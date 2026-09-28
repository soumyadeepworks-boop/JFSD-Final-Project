package com.excelr.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name = "products")
public class Products {
	@NotBlank(message = "Product name is required")
	private String productName;

	@NotNull(message = "Product price is required")
	@Min(value = 1, message = "Product price must be greater than 0")
	private Double productPrice;
	@Id
	private Integer productId;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	public Products() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Products(Integer productId, String productName, Double productPrice, Category category) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productPrice = productPrice;
		this.category = category;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(Double productPrice) {
		this.productPrice = productPrice;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	@Override
	public String toString() {
		return "Products [productId=" + productId + ", productName=" + productName + ", productPrice=" + productPrice
				+ ", categoryId=" + category + "]";
	}
}
