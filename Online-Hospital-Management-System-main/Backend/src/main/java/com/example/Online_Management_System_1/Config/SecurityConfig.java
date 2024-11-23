package com.example.Online_Management_System_1.Config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // Disable CSRF for APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/patient/signup","/api/patient/login",
                        "/api/admin/signup","api/admin/login",
                        "api/doctor/signup","api/doctor/login").permitAll()
                      // Allow public access to these endpoints
                        .anyRequest().authenticated()  // Secure all other endpoints
                )
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Use stateless sessions
                .and()
                .httpBasic();  // Use basic authentication for simplicity (could also add JWT if needed)

        return http.build();
    }

}
