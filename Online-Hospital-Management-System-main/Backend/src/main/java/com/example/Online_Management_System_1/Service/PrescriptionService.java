package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.Entity.Prescription;
import com.example.Online_Management_System_1.Repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // Save a new prescription or update an existing one
    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    // Retrieve all prescriptions
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    // Retrieve prescriptions for a specific patient
    public List<Prescription> getPrescriptionsByPatientId(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    // Retrieve prescriptions issued by a specific doctor
    public List<Prescription> getPrescriptionsByDoctorId(Long doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    // Retrieve a specific prescription by ID
    public Prescription getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id).orElse(null);
    }

    // Delete a specific prescription by ID
    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
}
