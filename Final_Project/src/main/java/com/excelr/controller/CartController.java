package com.excelr.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.excelr.entity.Cart;
import com.excelr.service.CartService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cs;
    @GetMapping
    public List<Cart> getCartItems() {
        return cs.getCartItems();
    }
    @PostMapping
    public String addToCart(@RequestBody Cart c) {
        return cs.addToCart(c);
    }
    @DeleteMapping("/{id}")
    public String deleteCartItem(@PathVariable Integer id) {
        return cs.deleteCartItem(id);
    }
    @PutMapping("/{id}")
    public String updateQuantity(@PathVariable Integer id,
                                 @RequestParam Integer quantity) {
        return cs.updateQuantity(id, quantity);
    }
}