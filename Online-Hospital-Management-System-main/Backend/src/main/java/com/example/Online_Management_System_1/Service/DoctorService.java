package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.Entity.Doctor;
import com.example.Online_Management_System_1.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Save a new doctor or update an existing one
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Retrieve all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Retrieve a specific doctor by ID
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    // Delete a specific doctor by ID
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);

    }
}