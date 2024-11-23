package com.example.Online_Management_System_1.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientDTO {
    private Long roleId;
    private Long patientId;
    private Date birthdate;
    private Long contactNumber;
    private String name;
    private String email;
    private String password;
}
