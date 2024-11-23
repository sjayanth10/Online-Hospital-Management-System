package com.example.Online_Management_System_1.Repository;

import com.example.Online_Management_System_1.Entity.Appointment;
import com.example.Online_Management_System_1.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
