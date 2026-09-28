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
import com.excelr.entity.Orders;
import com.excelr.service.OrderService;
@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService os;
    @GetMapping
    public List<Orders> getAllOrders() {
        return os.getAllOrders();
    }
    @GetMapping("/user/{userId}")
    public List<Orders> getOrdersByUser(@PathVariable Integer userId) {
        return os.getOrdersByUser(userId);
    }
    @PostMapping
    public String placeOrder(@RequestBody Orders o) {
        return os.placeOrder(o);
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Integer id) {
        return os.deleteOrder(id);
    }
}