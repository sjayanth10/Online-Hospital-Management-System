package com.example.Online_Management_System_1.Repository;

import com.example.Online_Management_System_1.Entity.AdminSignup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminSignupRepository extends JpaRepository<AdminSignup,Long> {

    Optional<AdminSignup> findByEmail(String email);


}
