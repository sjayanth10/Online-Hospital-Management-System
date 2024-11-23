package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.DTO.PatientSignupDTO;
import com.example.Online_Management_System_1.Entity.PatientSignUp;
import com.example.Online_Management_System_1.Repository.PatientSignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientSignupService {

    @Autowired
    private PatientSignupRepository patientSignupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PatientSignUp PatientSignUp(PatientSignupDTO patientSignupDTO){
        PatientSignUp newPatient = new PatientSignUp();
        newPatient.setName(patientSignupDTO.getName());
        newPatient.setEmail(patientSignupDTO.getEmail());
        newPatient.setDate(patientSignupDTO.getDate());
        newPatient.setPhonenumber(patientSignupDTO.getPhonenumber());
        newPatient.setLocation(patientSignupDTO.getLocation());
        newPatient.setPassword((patientSignupDTO.getPassword()));

        return patientSignupRepository.save(newPatient);

    }

    public Optional<PatientSignUp> findByEmail(String email) {
        return patientSignupRepository.findByEmail(email);
    }



    public boolean authenticate(String email, String password) {
        // Find the user by email
        Optional<PatientSignUp> patient = patientSignupRepository.findByEmail(email);

        // If user not found, return false
        // Check if the user exists and compare passwords
        if (patient.isPresent() && password.equals(patient.get().getPassword())) {
            return true;
        }

        // Return false if user does not exist or passwords do not match
        return false;
    }

        // Compare the stored password with the input password


}
