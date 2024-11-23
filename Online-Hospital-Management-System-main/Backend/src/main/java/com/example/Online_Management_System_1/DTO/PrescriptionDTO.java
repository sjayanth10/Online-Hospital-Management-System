package com.example.Online_Management_System_1.DTO;

import com.example.Online_Management_System_1.Entity.Doctor;
import com.example.Online_Management_System_1.Entity.Patient;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PrescriptionDTO {
    private String medication;
    private String dosage;
    private LocalDate dateIssued;
    private Long patientId;
    private Long doctorId;

}
