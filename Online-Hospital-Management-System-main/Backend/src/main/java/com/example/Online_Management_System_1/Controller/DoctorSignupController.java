package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.DoctorSignupDTO;
import com.example.Online_Management_System_1.DTO.LoginDTO;
import com.example.Online_Management_System_1.Repository.DoctorSignupRepository;
import com.example.Online_Management_System_1.Service.DoctorSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/doctor")
public class DoctorSignupController {

    @Autowired
    private DoctorSignupRepository doctorSignupRepository;

    @Autowired
    private DoctorSignupService doctorSignupService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody DoctorSignupDTO doctorSignupDTO){
        try {
            doctorSignupService.DoctorSignup(doctorSignupDTO);
            return ResponseEntity.ok("Signup Sucessfully");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }

    @GetMapping("/signup")
    public ResponseEntity<String> getsignup(DoctorSignupDTO doctorSignupDTO) {
        try {
            doctorSignupService.DoctorSignup(doctorSignupDTO);
            return ResponseEntity.ok("got data");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
        boolean isAuthenticated = doctorSignupService.authenticate(LoginDTO.getEmail(), LoginDTO.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login Sucessful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
