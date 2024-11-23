package com.example.Online_Management_System_1.Repository;

import com.example.Online_Management_System_1.Entity.DoctorSignup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorSignupRepository extends JpaRepository<DoctorSignup, Long> {

    Optional<DoctorSignup> findByEmail(String email);

}
