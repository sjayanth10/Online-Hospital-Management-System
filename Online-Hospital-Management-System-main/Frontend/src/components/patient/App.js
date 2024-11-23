// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Home from './Home';
// import Login from './Login';
// import PatientDash from './PatientDash';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={<PatientDash />} />
//         <Route
//           path="/login"
//           element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../src/components/patient/NavBar';
import PatientDash from '../src/components/patient/PatientDash';
// import AdminDashboard from './AdminDashboard';
// import DoctorDashboard from './DoctorDashboard';
// import AdminDashboard from 
// import Login from './Login';
import Login from '../src/components/LoginPage'

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
          <Route path="/admin-dashboard" element={isLoggedIn && role === 'ADMIN' ? <PatientDash /> : <Navigate to="/login" />} />
          <Route path="/doctor-dashboard" element={isLoggedIn && role === 'DOCTOR' ? <PatientDash /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

