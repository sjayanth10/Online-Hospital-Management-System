package com.example.Online_Management_System_1.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DoctorDTO {
    private Long doctorId;
    private Long specialityId;
    private String specialization;
    private Long contactNumber;
    private String name;
    private String email;
    private String password;
}
