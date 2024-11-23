import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../src/components/patient/NavBar';
import PatientDash from '../src/components/patient/PatientDash';
import AdminDashboard from '../src/components/Admin/AdminDashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import Login from '../src/components/LoginPage';
import Register from '../src/components/RegisterPage';
// import Doctors from './components/patient/AllDoctors';
import AboutUs from './components/patient/AboutUs';
import Contact from './components/patient/Contact';
import Doctors from './components/patient/AllDoctors';
import DoctorDetails from './components/patient/DoctorDetails';
import PaymentPage from './components/patient/payment';
import ProfilePage from './components/patient/ProfilePage';
import Appointments from "./components/patient/Appointments";
import Prescriptions from './components/patient/Prescriptions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <div className="bg-gray-100 container mx-auto text-center ">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
        <Routes>
          <Route path="/" element={<PatientDash />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to={`/${role.toLowerCase()}-dashboard`} /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
            }
          />
          <Route path="/patient-dashboard" element={isLoggedIn && role === 'PATIENT' ? <PatientDash /> : <Navigate to="/login" />} />
          <Route path="/admin-dashboard" element={isLoggedIn && role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/doctor-dashboard" element={isLoggedIn && role === 'DOCTOR' ? <DoctorDashboard /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-doctors" element={<Doctors />} />
          <Route path="/all-doctors/:id" element={<DoctorDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role}/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
