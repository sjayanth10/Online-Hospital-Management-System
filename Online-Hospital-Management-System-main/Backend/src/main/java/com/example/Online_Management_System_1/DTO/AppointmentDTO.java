package com.example.Online_Management_System_1.DTO;

import com.example.Online_Management_System_1.Entity.Doctor;
import com.example.Online_Management_System_1.Entity.Patient;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppointmentDTO {
    private Long appointmentId ;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
}
