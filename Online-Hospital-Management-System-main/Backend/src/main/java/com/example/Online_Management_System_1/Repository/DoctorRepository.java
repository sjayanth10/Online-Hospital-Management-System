package com.example.Online_Management_System_1.Repository;

import com.example.Online_Management_System_1.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
