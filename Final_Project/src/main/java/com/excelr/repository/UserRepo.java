package com.excelr.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.excelr.entity.Users;
@Repository
public interface UserRepo extends JpaRepository<Users, Integer>{
	Optional<Users> findByUserEmail(String userEmail);
}
