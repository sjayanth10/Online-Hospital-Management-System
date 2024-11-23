package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.PrescriptionDTO;
import com.example.Online_Management_System_1.Entity.Prescription;
import com.example.Online_Management_System_1.Service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // Get all prescriptions
    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    // Issue a new prescription electronically
    @PostMapping

    public ResponseEntity<Prescription> createPrescription(@RequestBody PrescriptionDTO prescriptionDTO) {
        Prescription prescription = new Prescription();
        prescription.setPatientId(prescriptionDTO.getPatientId());
        prescription.setDoctorId(prescriptionDTO.getDoctorId());
        prescription.setMedication(prescriptionDTO.getMedication());
        prescription.setDosage(prescriptionDTO.getDosage());
        prescription.setDateIssued(prescriptionDTO.getDateIssued());


        return ResponseEntity.ok(prescriptionService.savePrescription(prescription));
    }

    // Get all prescriptions for a specific patient
    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Prescription>> getPrescriptionsForPatient(@PathVariable Long id) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByPatientId(id);
        return ResponseEntity.ok(prescriptions);
    }

    // Get all prescriptions issued by a specific doctor
    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<Prescription>> getPrescriptionsIssuedByDoctor(@PathVariable Long id) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByDoctorId(id);
        return ResponseEntity.ok(prescriptions);
    }

    // Update an existing prescription
    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable Long id, @RequestBody PrescriptionDTO prescriptionDTO) {
        Prescription existingPrescription = prescriptionService.getPrescriptionById(id);
        if (existingPrescription != null) {
            existingPrescription.setMedication(prescriptionDTO.getMedication());
            existingPrescription.setDosage(prescriptionDTO.getDosage());


            return ResponseEntity.ok(prescriptionService.savePrescription(existingPrescription));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a specific prescription by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }
}