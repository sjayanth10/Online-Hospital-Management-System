// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// function Register() {
//   const [role, setRole] = useState('PATIENT'); // Default role
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     birthDate: '',
//     contactNumber: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     doctorSpecialty: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRoleChange = (newRole) => {
//     setRole(newRole);
//     setUser({
//       name: '',
//       email: '',
//       birthDate: '',
//       contactNumber: '',
//       address: '',
//       password: '',
//       confirmPassword: '',
//       doctorSpecialty: '',
//     });
//   };

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const validateInputs = () => {
//     if (!user.name) return 'Name is required';
//     if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email address';
//     if (!user.birthDate) return 'Birth date is required';
//     if (!user.contactNumber.match(/^\d{10}$/)) return 'Invalid contact number. Must be 10 digits';
//     if (!user.address) return 'Address is required';
//     if (user.password.length < 6) return 'Password must be at least 6 characters';
//     if (user.password !== user.confirmPassword) return 'Passwords do not match';
//     return '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:9091/api/patient/signup', { ...user, role });

//       if (response.status === 200) {
//         // Generate Admin Code if role is Admin
//         if (role === 'ADMIN') {
//           const adminCode = `HMS${response.data.adminCodeNumber}`;
//           await axios.post('http://localhost:9091/admin/send-email', {
//             email: user.email,
//             subject: 'Admin Registration Successful',
//             text: `You have been successfully registered as an Admin. Here are your login details:\nUsername: ${user.email}\nPassword: ${user.password}\nAdmin Code: ${adminCode}`,
//           });
//         }

//         // Send email to Doctor
//         if (role === 'DOCTOR') {
//           await axios.post('http://localhost:9091/doctor/send-email', {
//             email: user.email,
//             subject: 'Doctor Registration Successful',
//             text: `You have been successfully registered as a Doctor. Here are your login details:\nUsername: ${user.email}\nPassword: ${user.password}`,
//           });
//         }

//         // Send email to Patient
//         if (role === 'PATIENT') {
//           await axios.post('http://localhost:9091/patient/send-email', {
//             email: user.email,
//             subject: 'Patient Registration Successful',
//             text: `You have been successfully registered as a Patient. Here are your login details:\nUsername: ${user.email}\nPassword: ${user.password}`,
//           });
//         }

//         navigate('/login');
//       }
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Card Container */}
//       <div className="bg-white w-full max-w-4xl h-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">

//         {/* Left Section: Register Form */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
//           <h2 className="text-3xl font-semibold text-blue-500 mb-4">Create an Account</h2>

//           {/* Role Selection */}
//           <div className="flex space-x-4 mb-4 flex-wrap">
//             {['Admin', 'Doctor', 'Patient'].map((roleOption) => (
//               <button
//                 key={roleOption}
//                 onClick={() => handleRoleChange(roleOption.toUpperCase())}
//                 className={`px-4 py-2 rounded-lg font-semibold ${
//                   role === roleOption.toUpperCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
//                 }`}
//               >
//                 {roleOption}
//               </button>
//             ))}
//           </div>

//           {/* Dynamic Form Fields */}
//           <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
//             {error && <p className="text-red-500">{error}</p>}

//             {/* Common Fields */}
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={user.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={user.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             {role === 'PATIENT' && (
//               <>
//                 <input
//                   type="date"
//                   name="birthDate"
//                   placeholder="Birth Date"
//                   value={user.birthDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

//                 <input
//                   type="text"
//                   name="contactNumber"
//                   placeholder="Contact Number"
//                   value={user.contactNumber}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />

//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={user.address}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </>
//             )}

//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 value={user.password}
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

//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={user.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Role-Specific Fields */}
//             {role === 'DOCTOR' && (
//               <input
//                 type="text"
//                 name="doctorSpecialty"
//                 placeholder="Specialty"
//                 value={user.doctorSpecialty}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             )}

//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Register
//             </button>
//           </form>
//         </div>

//         {/* Right Section: Welcome Message */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-500 text-white p-4">
//           <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
//           <p className="text-center mb-4">To keep connected with us, please log in with your personal info.</p>
//           <button
//             onClick={() => navigate('/login')}
//             className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [role, setRole] = useState('PATIENT'); // Default role
  const [user, setUser] = useState({
    name: '',
    email: '',
    birthDate: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    doctorSpecialty: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setUser({
      name: '',
      email: '',
      birthDate: '',
      contactNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
      doctorSpecialty: '',
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    // Common validation for all roles
    if (!user.name) return 'Name is required';
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email address';
    if (user.password.length < 6) return 'Password must be at least 6 characters';
    if (user.password !== user.confirmPassword) return 'Passwords do not match';

    // Role-specific validation
    if (role === 'PATIENT') {
      if (!user.birthDate) return 'Birth date is required';
      if (!user.contactNumber.match(/^\d{10}$/)) return 'Invalid contact number. Must be 10 digits';
      if (!user.address) return 'Address is required';
    } else if (role === 'DOCTOR' && !user.doctorSpecialty) {
      return 'Specialty is required for doctors';
    }

    return ''; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    const userWithRole = { ...user, role };

    if (role === "DOCTOR") {
      userWithRole.specialty = user.specialty; // Assuming `specialty` is a property of `user`
    }

    const details = JSON.stringify(userWithRole);
    localStorage.setItem('user', details);
    console.log(details);

    const apiEndpoint = `http://localhost:9091/api/${role.toLowerCase()}/signup`;

    try {
      const response = await axios.post(apiEndpoint, { ...user, role });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-4xl h-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left Section: Register Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">Create an Account</h2>

          <div className="flex space-x-4 mb-4 flex-wrap">
            {['Admin', 'Doctor', 'Patient'].map((roleOption) => (
              <button
                key={roleOption}
                onClick={() => handleRoleChange(roleOption.toUpperCase())}
                className={`px-4 py-2 rounded-lg font-semibold ${role === roleOption.toUpperCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {roleOption}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
            {error && <p className="text-red-500">{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {role === 'PATIENT' && (
              <>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Birth Date"
                  value={user.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={user.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={user.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </>
            )}

            {role === 'DOCTOR' && (
              <input
                type="text"
                name="doctorSpecialty"
                placeholder="Specialty"
                value={user.doctorSpecialty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={user.password}
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

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-500 text-white p-4">
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-center mb-4">To keep connected with us, please log in with your personal info.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

