package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.DTO.DoctorSignupDTO;
import com.example.Online_Management_System_1.Entity.DoctorSignup;
import com.example.Online_Management_System_1.Repository.DoctorSignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorSignupService {

    @Autowired
    private DoctorSignupRepository doctorSignupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public DoctorSignup DoctorSignup(DoctorSignupDTO doctorSignupDTO){
        DoctorSignup newDoctor = new DoctorSignup();
        newDoctor.setName(doctorSignupDTO.getName());
        newDoctor.setEmail(doctorSignupDTO.getEmail());
        newDoctor.setPassword(doctorSignupDTO.getPassword());
        newDoctor.setSpeciality(doctorSignupDTO.getSpeciality());

        return doctorSignupRepository.save(newDoctor);
    }

    public boolean authenticate(String email, String password){
        Optional<DoctorSignup> doctor = doctorSignupRepository.findByEmail(email);
        if (doctor.isPresent() && password.equals(doctor.get().getPassword())){
            return true;
        }

        return false;
    }
}
