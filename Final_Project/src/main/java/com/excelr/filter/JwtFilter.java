package com.excelr.filter;
import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import com.excelr.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Collections;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
    	String authHeader = request.getHeader("Authorization");
    	if (authHeader != null && authHeader.startsWith("Bearer ")) {
    	    String token = authHeader.substring(7);
    	    try {
    	        String email = jwtUtil.extractEmail(token);
    	        String role = email.equals("soumyadeepworks@gmail.com") ? "ROLE_ADMIN" : "ROLE_USER";
    	        UsernamePasswordAuthenticationToken authentication =
    	                new UsernamePasswordAuthenticationToken(
    	                        email,
    	                        null,
    	                        Collections.singletonList(new SimpleGrantedAuthority(role))
    	                );
    	        SecurityContextHolder.getContext().setAuthentication(authentication);
    	        System.out.println("Logged in user: " + email);
    	    } catch (Exception e) {
    	        System.out.println("Invalid JWT Token");
    	    }
    	}
        filterChain.doFilter(request, response);
    }
    @Autowired
    private JwtUtil jwtUtil;
}