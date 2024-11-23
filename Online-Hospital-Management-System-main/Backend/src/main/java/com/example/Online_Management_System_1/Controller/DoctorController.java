package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.DoctorDTO;
import com.example.Online_Management_System_1.Entity.Doctor;
import com.example.Online_Management_System_1.Service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Get all doctors
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    // Get a specific doctor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.notFound().build();
    }

    // Add a new doctor
    @PostMapping
    public ResponseEntity<Doctor> addDoctor(@RequestBody DoctorDTO doctorDTO) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorDTO.getDoctorId());
        doctor.setSpecialityId(doctorDTO.getSpecialityId());
        doctor.setName(doctorDTO.getName());
        doctor.setSpecialization(doctorDTO.getSpecialization());
        doctor.setContactNumber(doctorDTO.getContactNumber());
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setPassword(doctorDTO.getPassword());

        return ResponseEntity.ok(doctorService.saveDoctor(doctor));
    }

    // Update an existing doctor's information
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO doctorDTO) {
        Doctor existingDoctor = doctorService.getDoctorById(id);
        if (existingDoctor != null) {
            existingDoctor.setDoctorId(doctorDTO.getDoctorId());
            existingDoctor.setSpecialityId(doctorDTO.getSpecialityId());
            existingDoctor.setName(doctorDTO.getName());
            existingDoctor.setSpecialization(doctorDTO.getSpecialization());
            existingDoctor.setContactNumber(doctorDTO.getContactNumber());
            existingDoctor.setEmail(doctorDTO.getEmail());
            existingDoctor.setPassword(doctorDTO.getPassword());

            return ResponseEntity.ok(doctorService.saveDoctor(existingDoctor));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a specific doctor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
