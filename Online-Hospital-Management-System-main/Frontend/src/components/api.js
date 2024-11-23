import axios from 'axios';

const API_URL = 'http://localhost:9091';

// Get token from local storage
const getToken = () => localStorage.getItem('token');

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});



// Interceptor to attach token to each request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Admin: Register a new doctor
export const registerDoctor = (doctorData) => {
  return api.post('/admin/doctor', doctorData);
};

// Admin: Assign a doctor to an appointment
export const assignDoctor = (appointmentId, doctorId) => {
  return api.put(`/admin/appointment/${appointmentId}/${doctorId}`);
};

// Admin: Get consultation records
export const getConsultationRecords = async () => {
  try {
    const response = await api.get('/admin/consultationRecords');
    return response.data;
  } catch (error) {
    console.error('Error fetching consultation records:', error);
    throw error;
  }
};

// Admin: Get notifications
export const getNotifications = async () => {
  try {
    const response = await api.get('/admin/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Get all patients
export const getPatients = async () => {
  try {
    const response = await api.get('/api/patients');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};

// Get all doctors
export const getDoctors = async () => {
  try {
    const response = await api.get('/api/doctors');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Get all appointments
export const getAppointments = async () => {
  try {
    const response = await api.get('/api/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Doctor: Get the doctor's appointments
export const getDoctorAppointments = async () => {
  try {
    const response = await api.get('/api/doctor/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    throw error;
  }
};

// Doctor: Get the doctor's patients
export const getDoctorPatients = async () => {
  try {
    const response = await api.get('/api/doctor/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor patients:', error);
    throw error;
  }
};

// Doctor: Get notifications
export const getDoctorNotifications = async () => {
  try {
    const response = await api.get('/doctor/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor notifications:', error);
    throw error;
  }
};

// Doctor: Add a prescription
export const addPrescription = (prescriptionData) => {
  return api.post('/doctor/prescriptions', prescriptionData);
};

// Doctor: Update appointment status
export const updateAppointmentStatus = (appointmentId, status) => {
  return api.put(`/doctor/appointment/${appointmentId}/status`, { status });
};

// Doctor: Get schedule
export const getSchedule = async () => {
  try {
    const response = await api.get('/api/doctor/schedule');
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

// Patient: Book an appointment with a doctor
export const takeAppointment = (doctorId) => {
  return api.post('/patient/appointment', { doctorId });
};

// Patient: View their appointments
export const getPatientAppointments = async () => {
  try {
    const response = await api.get('/patient/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    throw error;
  }
};

// Patient: Cancel an appointment
export const cancelAppointment = (appointmentId) => {
  return api.delete(`/patient/appointment/${appointmentId}`);
};
