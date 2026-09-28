package com.excelr.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.excelr.entity.Orders;
import com.excelr.repository.CartRepo;
import com.excelr.repository.OrderRepo;
import java.util.Optional;
import com.excelr.entity.Cart;
@Service
public class OrderService {
    @Autowired
    private OrderRepo or;
    @Autowired
    private CartRepo cr;
    public List<Orders> getAllOrders() {
        return or.findAll();
    }
    public List<Orders> getOrdersByUser(Integer userId) {
        return or.findAllByUserId(userId);
    }
    public String placeOrder(Orders o) {
        or.save(o);
        Optional<Cart> existingCart =
                cr.findByUserIdAndProductId(o.getUserId(), o.getProductId());
        if (existingCart.isPresent()) {
            cr.deleteById(existingCart.get().getCartId());
            cr.flush();
        }
        return "Order Placed Successfully";
    }
    public String deleteOrder(Integer id) {
        if (or.existsById(id)) {
            or.deleteById(id);
            return "Order Deleted Successfully";
        }
        return "Order Not Found";
    }
}