package com.example.Online_Management_System_1.DTO;

public class LoginDTO {
    private static String email;
    private static String password;

    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }


    public static String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getters and Setters
}
