package com.example.Online_Management_System_1.Repository;


import com.example.Online_Management_System_1.Entity.PatientSignUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientSignupRepository extends JpaRepository<PatientSignUp,Long> {


    Optional<PatientSignUp> findByEmail(String email);
}

