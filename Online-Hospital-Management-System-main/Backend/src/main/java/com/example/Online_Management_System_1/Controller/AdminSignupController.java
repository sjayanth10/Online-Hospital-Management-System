package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.AdminSignupDTO;
import com.example.Online_Management_System_1.DTO.LoginDTO;
import com.example.Online_Management_System_1.Repository.AdminSignupRepository;
import com.example.Online_Management_System_1.Repository.DoctorSignupRepository;
import com.example.Online_Management_System_1.Service.AdminSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminSignupController {

    @Autowired
    private AdminSignupRepository adminSignupRepository;

    @Autowired
    private AdminSignupService adminSignupService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AdminSignupDTO adminSignupDTO){
        try {
            adminSignupService.AdminSignup(adminSignupDTO);
            return ResponseEntity.ok("Signup successful");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Signup failed :" + e.getMessage());
        }
    }

    @GetMapping("/signup")
    public ResponseEntity<String> getsignup(AdminSignupDTO adminSignupDTO){
       try{
           adminSignupService.AdminSignup(adminSignupDTO);
           return ResponseEntity.ok("got data");
       }catch (Exception e){
           return ResponseEntity.badRequest().body("Signup failed : " + e.getMessage());
       }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
        boolean isAuthenticated = adminSignupService.authenticate(LoginDTO.getEmail(), LoginDTO.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
