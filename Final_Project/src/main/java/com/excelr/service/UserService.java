package com.excelr.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.excelr.repository.UserRepo;
import com.excelr.util.JwtUtil;
import com.excelr.entity.Users;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
@Service
public class UserService {
	@Value("${admin.email}")
	private String adminEmail;
	@Autowired
	private UserRepo ur;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	public List<Users> getAllUserRecords() {
	    return ur.findAll();
	}
	public String registerUser(Users u) {
		String encodedPassword = passwordEncoder.encode(u.getUserPassword());
		u.setUserPassword(encodedPassword);
		ur.save(u);
		return "User Registered Successfully";
	}
	public String loginUser(String email, String password) {
	    Optional<Users> user = ur.findByUserEmail(email);
	    if (user.isPresent()) {
	        if (passwordEncoder.matches(password, user.get().getUserPassword())) {
	            return jwtUtil.generateToken(email);
	        }
	    }
	    return "Invalid Email or Password";
	}
	public String getUserRole(String email) {
	    if (email.equals(adminEmail)) {
	        return "ADMIN";
	    }

	    return "USER";
	}
	public String resetPassword(String email, String newPassword) {
	    Optional<Users> user = ur.findByUserEmail(email);

	    if (user.isPresent()) {
	        Users u = user.get();
	        u.setUserPassword(passwordEncoder.encode(newPassword));
	        ur.save(u);
	        return "Password Updated Successfully";
	    }

	    return "User Not Found";
	}
}
