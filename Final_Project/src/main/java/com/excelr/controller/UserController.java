package com.excelr.controller;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.excelr.entity.Users;
import com.excelr.service.UserService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService us;
	@GetMapping
	public List<Users> getUsers() {
	    return us.getAllUserRecords();
	}
	@PostMapping("/register")
	public String registerUser(@Valid @RequestBody Users u) {
		return us.registerUser(u);
	}
	@PostMapping("/login")
	public String loginUser(@RequestParam String email, @RequestParam String password) {
	    return us.loginUser(email, password);
	}
	@GetMapping("/role")
	public String getUserRole(@RequestParam String email) {
	    return us.getUserRole(email);
	}
	@GetMapping("/admin")
	public String adminAccess() {
	    return "Welcome Admin";
	}
	@PutMapping("/reset-password")
	public String resetPassword(@RequestParam String email,
	                            @RequestParam String newPassword) {
	    return us.resetPassword(email, newPassword);
	}
}
