import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ setIsLoggedIn, setRole }) {
  const [role, setSelectedRole] = useState('PATIENT');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    adminCode: '',
    doctorLicense: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [valid, setValid] = useState(true); // To manage form validation
  const navigate = useNavigate();
  

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
    setCredentials({
      email: '',
      password: '',
      adminCode: '',
      doctorLicense: '',
    });
    setError('');
    setValid(true); // Reset validation on role change
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setValid(true); // Reset validation on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValid(true);

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError('Email and password are required');
      setValid(false);
      return;
    }

    // Email validation (basic pattern check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Please enter a valid email address');
      setValid(false);
      return;
    }

    // Password length validation (minimum 6 characters)
    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      setValid(false);
      return;
    }

    // Add validation for Doctor License
    if (role === 'DOCTOR' && (!/^[A-Za-z0-9]{6}$/.test(credentials.doctorLicense))) {
      setError('Doctor License must be 6 alphanumeric characters');
      setValid(false);
      return;
    }

    // Add validation for Admin Code
    if (role === 'ADMIN' && !credentials.adminCode) {
      setError('Admin Code is required');
      setValid(false);
      return;
    }

    if (!valid) return;

    try {
      const userDetails = {
        email: credentials.email,
        password: credentials.password,
        role: role,
        adminCode: role === 'ADMIN' ? credentials.adminCode : undefined,
        doctorLicense: role === 'DOCTOR' ? credentials.doctorLicense : undefined,
      };

      const apiEndpoint = `http://localhost:9091/api/${role.toLowerCase()}/login`;
      const response = await axios.post(apiEndpoint, userDetails);

      console.log('Login response:', response);

      // Check if login was successful
      if (response.status === 200) {
        setIsLoggedIn(true);
        setRole(role);
        // Navigate to different dashboards based on role
        navigate(`${role.toLowerCase()}-dashboard`);
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="bg-white w-full max-w-4xl h-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section: Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-4">Sign In to Account</h2>
          
          {/* Role Selection */}
          <div className="flex space-x-2 sm:space-x-4 mb-4">
            {['Admin', 'Doctor', 'Patient'].map((roleOption) => (
              <button
                key={roleOption}
                onClick={() => handleRoleChange(roleOption.toUpperCase())}
                className={`px-3 sm:px-4 py-1 rounded-lg font-semibold text-sm sm:text-base ${
                  role === roleOption.toUpperCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {roleOption}
              </button>
            ))}
          </div>

          {/* Dynamic Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs sm:max-w-sm">
            {error && <p className="text-red-500">{error}</p>}

            {/* Common Fields */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {role === 'ADMIN' && (
              <input
                type="text"
                name="adminCode"
                placeholder="Admin Code"
                value={credentials.adminCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            {role === 'DOCTOR' && (
              <input
                type="text"
                name="doctorLicense"
                placeholder="License Number"
                value={credentials.doctorLicense}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right Section: Welcome Message */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-500 text-white p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Hello, Friend!</h2>
          <p className="text-center mb-4 text-sm sm:text-base">Fill in your details and start your journey with us.</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-500 py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold hover:bg-gray-100"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// function Login({ setIsLoggedIn, setRole }) {
//   const [role, setSelectedRole] = useState('PATIENT');
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//     adminCode: '',
//     doctorLicense: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRoleChange = (newRole) => {
//     setSelectedRole(newRole);
//     setCredentials({
//       username: '',
//       password: '',
//       adminCode: '',
//       doctorLicense: '',
//     });
//   };

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`Logging in as ${role}`, credentials);
  //   // Mock validation - replace with actual validation logic
  //   if (credentials.username && credentials.password) {
  //     setIsLoggedIn(true);
  //     setRole(role);
  //     if (role === 'ADMIN') navigate('/admin-dashboard');
  //     else if (role === 'DOCTOR') navigate('/doctor-dashboard');
  //     else navigate('/patient-dashboard');
  //   } else {
  //     setError('Login failed. Please try again.');
  //   }
  // };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
//       <div className="bg-white w-full max-w-4xl h-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        
//         {/* Left Section: Sign In Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8">
//           <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-4">Sign In to Account</h2>
          
//           {/* Role Selection */}
//           <div className="flex space-x-2 sm:space-x-4 mb-4">
//             {['Admin', 'Doctor', 'Patient'].map((roleOption) => (
//               <button
//                 key={roleOption}
//                 onClick={() => handleRoleChange(roleOption.toUpperCase())}
//                 className={`px-3 sm:px-4 py-1 rounded-lg font-semibold text-sm sm:text-base ${
//                   role === roleOption.toUpperCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}
//               >
//                 {roleOption}
//               </button>
//             ))}
//           </div>

//           {/* Dynamic Form Fields */}
//           <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs sm:max-w-sm">
//             {error && <p className="text-red-500">{error}</p>}

//             {/* Common Fields */}
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={credentials.username}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {role === 'ADMIN' && (
//               <input
//                 type="text"
//                 name="adminCode"
//                 placeholder="Admin Code"
//                 value={credentials.adminCode}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             )}

//             {role === 'DOCTOR' && (
//               <input
//                 type="text"
//                 name="doctorLicense"
//                 placeholder="License Number"
//                 value={credentials.doctorLicense}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             )}

//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>

//         {/* Right Section: Welcome Message */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-500 text-white p-6 sm:p-8">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">Hello, Friend!</h2>
//           <p className="text-center mb-4 text-sm sm:text-base">Fill in your details and start your journey with us.</p>
//           <button
//             onClick={() => navigate('/register')}
//             className="bg-white text-blue-500 py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold hover:bg-gray-100"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;