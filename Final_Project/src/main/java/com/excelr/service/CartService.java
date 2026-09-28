package com.excelr.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.excelr.entity.Cart;
import com.excelr.repository.CartRepo;
@Service
public class CartService {
    @Autowired
    private CartRepo cr;
    public List<Cart> getCartItems() {
        return cr.findAll();
    }
    public String addToCart(Cart c) {
        Optional<Cart> existingCart = cr.findByUserIdAndProductId(
                c.getUserId(), c.getProductId());
        if (existingCart.isPresent()) {
            Cart existing = existingCart.get();
            existing.setQuantity(existing.getQuantity() + c.getQuantity());
            cr.save(existing);
        } else {
            cr.save(c);
        }
        return "Product Added to Cart";
    }
    public String updateQuantity(Integer id, Integer quantity) {

        Optional<Cart> existingCart = cr.findById(id);

        if (existingCart.isPresent()) {
            Cart c = existingCart.get();
            c.setQuantity(quantity);
            cr.save(c);
            return "Cart Quantity Updated";
        }

        return "Cart Item Not Found";
    }
    public String deleteCartItem(Integer id) {
        if (cr.existsById(id)) {
            cr.deleteById(id);
            return "Product Removed from Cart";
        }
        return "Cart Item Not Found";
    }
}