package com.example.Online_Management_System_1.Service;

import com.example.Online_Management_System_1.DTO.AdminSignupDTO;
import com.example.Online_Management_System_1.Entity.AdminSignup;
import com.example.Online_Management_System_1.Repository.AdminSignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminSignupService {

    @Autowired
    private AdminSignupRepository adminSignupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdminSignup AdminSignup(AdminSignupDTO adminSignupDTO){
        AdminSignup newAdmin = new AdminSignup();
        newAdmin.setName(adminSignupDTO.getName());
        newAdmin.setEmail(adminSignupDTO.getEmail());
        newAdmin.setPassword(adminSignupDTO.getPassword());

        return adminSignupRepository.save(newAdmin);
    }

    public boolean authenticate(String email, String password){
        Optional<AdminSignup> admin = adminSignupRepository.findByEmail(email);
        if (admin.isPresent() && password.equals(admin.get().getPassword())){
            return true;

        }
        return false;
    }

}
