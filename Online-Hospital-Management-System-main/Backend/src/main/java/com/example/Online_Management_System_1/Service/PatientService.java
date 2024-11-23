package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.Entity.Patient;
import com.example.Online_Management_System_1.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Save a new patient or update an existing one
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Retrieve all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Retrieve a specific patient by ID
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    // Delete a specific patient by ID
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}