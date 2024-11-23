package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.DoctorDTO;
import com.example.Online_Management_System_1.DTO.PatientDTO;
import com.example.Online_Management_System_1.Entity.*;
import com.example.Online_Management_System_1.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;


    // Patient Management
    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(adminService.getAllPatients());
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = adminService.getPatientById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/patients")
    public ResponseEntity<Patient> addPatient(@RequestBody PatientDTO patientDTO) {
        Patient patient = new Patient();
        patient.setName(patientDTO.getName());
        // Set additional fields if necessary
        return ResponseEntity.ok(adminService.savePatient(patient));
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        adminService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    // Doctor Management

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(adminService.getAllDoctors());
    }

    @GetMapping("/doctors/{id}")
    public ResponseEntity<Object> getDoctorById(@PathVariable Long id) {
        Doctor doctor = adminService.getDoctorById(id);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/doctors")
    public ResponseEntity<Doctor> addDoctor(@RequestBody DoctorDTO doctorDTO) {
        Doctor doctor = new Doctor();
        doctor.setName(doctorDTO.getName());
        // Set additional fields if necessary
        return ResponseEntity.ok(adminService.saveDoctor(doctor));
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        adminService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

    // Appointment Management

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(adminService.getAllAppointments());
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = adminService.getAppointmentById(id);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        adminService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    // Prescription Management

    @GetMapping("/prescriptions")
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {
        return ResponseEntity.ok(adminService.getAllPrescriptions());
    }

    @GetMapping("/prescriptions/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        Prescription prescription = adminService.getPrescriptionById(id);
        if (prescription != null) {
            return ResponseEntity.ok(prescription);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/prescriptions/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        adminService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }
}
