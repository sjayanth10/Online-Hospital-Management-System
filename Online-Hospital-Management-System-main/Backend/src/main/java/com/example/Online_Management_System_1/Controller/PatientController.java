package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.PatientDTO;
import com.example.Online_Management_System_1.Entity.Patient;
import com.example.Online_Management_System_1.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Get all patients
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    // Get a specific patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.notFound().build();
    }

    // Add a new patient
    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody PatientDTO patientDTO) {
        Patient patient = new Patient();
        patient.setName(patientDTO.getName());
        patient.setRoleId(patientDTO.getRoleId());
        patient.setPatientId(patientDTO.getPatientId());
        patient.setBirthdate(patientDTO.getBirthdate());
        patient.setContactNumber(patientDTO.getContactNumber());
        patient.setEmail(patientDTO.getEmail());
        patient.setPassword(patientDTO.getPassword());

        // Set other fields as necessary...
        return ResponseEntity.ok(patientService.savePatient(patient));
    }

    // Update an existing patient's information
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody PatientDTO patientDTO) {
        Patient existingPatient = patientService.getPatientById(id);
        if (existingPatient != null) {
            Patient patient = new Patient();
            patient.setName(patientDTO.getName());
            patient.setRoleId(patientDTO.getRoleId());
            patient.setPatientId(patientDTO.getPatientId());
            patient.setBirthdate(patientDTO.getBirthdate());
            patient.setContactNumber(patientDTO.getContactNumber());
            patient.setEmail(patientDTO.getEmail());
            patient.setPassword(patientDTO.getPassword());
            // Update other fields as necessary...

            return ResponseEntity.ok(patientService.savePatient(existingPatient));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a specific patient by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
