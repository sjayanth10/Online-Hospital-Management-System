package com.example.Online_Management_System_1.Controller;


import com.example.Online_Management_System_1.DTO.LoginDTO;
import com.example.Online_Management_System_1.DTO.PatientSignupDTO;
import com.example.Online_Management_System_1.Entity.PatientSignUp;
import com.example.Online_Management_System_1.Repository.PatientSignupRepository;
import com.example.Online_Management_System_1.Service.PatientSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/patient")
public class PatientSignupController {

    @Autowired
    private PatientSignupRepository patientSignupRepository;

    @Autowired
    private PatientSignupService patientSignupService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody PatientSignupDTO patientSignupDTO) {
        try {
            patientSignupService.PatientSignUp(patientSignupDTO);
            return ResponseEntity.ok("Signup successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }

    @GetMapping("/signup")
    public ResponseEntity<String> getsignup(PatientSignupDTO patientSignupDTO) {
        try {
            patientSignupService.PatientSignUp(patientSignupDTO);
            return ResponseEntity.ok("got data");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        try {
            // Retrieve the user by email
            Optional<PatientSignUp> patient = patientSignupService.findByEmail(loginDTO.getEmail());

            // Validate the user
            if (patient == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            // Check the password directly (no encryption)
            if (!loginDTO.getPassword().equals(patient.get().getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

            // Successful login
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
