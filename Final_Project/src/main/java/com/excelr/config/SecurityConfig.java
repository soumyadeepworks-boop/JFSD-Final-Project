package com.excelr.config;
import org.springframework.context.annotation.Bean;
import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import com.excelr.filter.JwtFilter;
@Configuration
public class SecurityConfig {
	@Autowired
	private JwtFilter jwtFilter;
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> cors.configurationSource(request -> {
		    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();

		    corsConfiguration.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
		    corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		    corsConfiguration.setAllowedHeaders(java.util.List.of("*"));

		    return corsConfiguration;
		}));
		http.authorizeHttpRequests(auth -> 
		auth.dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
		.requestMatchers(
			    "/users/register",
			    "/users/login",
			    "/products/**",
			    "/category/**"
			).permitAll()
	    .requestMatchers("/users/admin").hasRole("ADMIN")
	    .anyRequest().authenticated()
	);
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
