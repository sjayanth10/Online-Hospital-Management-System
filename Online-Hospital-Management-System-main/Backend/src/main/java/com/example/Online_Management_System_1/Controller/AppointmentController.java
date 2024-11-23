package com.example.Online_Management_System_1.Controller;

import com.example.Online_Management_System_1.DTO.AppointmentDTO;
import com.example.Online_Management_System_1.Entity.Appointment;
import com.example.Online_Management_System_1.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    //Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // Book a new appointment or reschedule an existing one.
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(appointmentDTO.getAppointmentId());
        appointment.setPatientId(appointmentDTO.getPatientId());
        appointment.setDoctorId(appointmentDTO.getDoctorId());
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());

        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }

    // Get details of an appointment by ID.
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable Long id) {
        return ResponseEntity.ok((Appointment) appointmentService.getAppointmentsForPatient(id));
    }

    // Get all appointments for a specific patient.
    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsForPatient(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForPatient(id));
    }

    // Get all appointments for a specific doctor.
    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsForDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForDoctor(id));
    }

    // Cancel an appointment by ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}