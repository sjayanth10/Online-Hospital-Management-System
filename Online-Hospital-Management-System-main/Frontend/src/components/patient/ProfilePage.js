import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import doc1 from './Assets/doctor1.png';
import doc2 from './Assets/doctor2.png';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userLocalDetails, setUserLocalDetails] = useState(
        JSON.parse(localStorage.getItem("user")) || {}
      );
    
      const [formData, setFormData] = useState({
        name: userLocalDetails.name || "",
        email: userLocalDetails.email || "",
        role: userLocalDetails.role || "",
        doctorSpecialty: userLocalDetails.doctorSpecialty || "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSave = () => {
        // Save updated details to localStorage
        localStorage.setItem("user", JSON.stringify(formData));
        setUserLocalDetails(formData);
        setIsEditing(false);
      };
    
      return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
          {/* User Details */}
          <div className="p-8 w-full md:w-full lg:w-full mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
            {!isEditing ? (
              <div>
                <p><strong>Full Name:</strong> {userLocalDetails.name}</p>
                <p><strong>Email:</strong> {userLocalDetails.email}</p>
                <p><strong>Role:</strong> {userLocalDetails.role}</p>
                {userLocalDetails.role === "PATIENT" &&(
                    <p><strong>Phone Number:</strong> {userLocalDetails.contactNumber}</p>
                )}
                {userLocalDetails.role === "PATIENT" &&(
                    <p><strong>Address:</strong> {userLocalDetails.address}</p>
                )}
                {userLocalDetails.role === "DOCTOR" && (
                  <p><strong>Specialty:</strong> {userLocalDetails.doctorSpecialty}</p>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <label className="block mb-2">
                  <span className="text-gray-700">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Role</span>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="DOCTOR">Doctor</option>
                    <option value="PATIENT">Patient</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </label>
                {formData.role === "DOCTOR" && (
                  <label className="block mb-2">
                    <span className="text-gray-700">Specialty</span>
                    <input
                      type="text"
                      name="doctorSpecialty"
                      value={formData.doctorSpecialty}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                  </label>
                )}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default ProfilePage;
    // I am using localstorage data to render dainamically
    // const [userLocalDetails, setUserLocalDetails] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    // useEffect(() => {
    //     // Fetch user details and appointments (this can be from local storage, API, etc.)
    //     // Here is some mock data for demonstration.
    //     setUserDetails({
    //         fullName: "Venkata Sai Sasank",
    //         email: "venkata@example.com",
    //         phone: "+1234567890",
    //     });

    //     setAppointments([
    //         {
    //             doctorName: "Dr. Richard James",
    //             specialty: "General Physician",
    //             image: doc1, // Add path to doctor's image
    //             date: "2024-11-22",
    //             time: "10:00 am",
    //         },
    //         {
    //             doctorName: "Dr. Sarah Lee",
    //             specialty: "Orthopedic Surgeon",
    //             image: doc2, // Add path to doctor's image
    //             date: "2024-11-23",
    //             time: "02:00 pm",
    //         },
    //     ]);
    // }, []);

    // const handleAppointmentClick = (appointment) => {
    //     navigate(`/doctor-details/${appointment.doctorName}`);
    // };

    // return (
    //     <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
    //         {/* User Details */}
    //         <div className="p-8 w-full md:w-full lg:w-full mb-6">
    //             <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
    //             {userLocalDetails ? (
    //                 <div>
    //                     <p><strong>Full Name:</strong> {userLocalDetails.name}</p>
    //                     <p><strong>Email:</strong> {userLocalDetails.email}</p>
    //                     <p><strong>Role:</strong> {userLocalDetails.role}</p>
    //                     {userLocalDetails.role === "DOCTOR" && (
    //                         <p><strong>Specialty:</strong> {userLocalDetails.doctorSpecialty}</p>
    //                     )}
    //                 </div>
    //             ) : (
    //                 <p>Loading...</p>
    //             )}
    //         </div>

    //         {/* Booked Appointments */}
            //  <div className="bg-white rounded-lg p-8 w-full md:w-full lg:w-full">
            //     <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">Booked Appointments</h2>
            //     {appointments.length > 0 ? (
            //         <div>
            //             {appointments.map((appointment, index) => (
            //                 <div
            //                     key={index}
            //                     className="flex items-start mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
            //                     onClick={() => handleAppointmentClick(appointment)}
            //                 >
            //                     <img
            //                         src={appointment.image}
            //                         alt={appointment.doctorName}
            //                         className="w-24 h-30 rounded-lg object-cover bg-blue-100"
            //                     />
            //                     <div className="ml-4 flex-1 text-start">
            //                         <h3 className="text-lg font-semibold text-gray-800">
            //                             {appointment.doctorName}
            //                         </h3>
            //                         <p className="text-gray-600">{appointment.specialty}</p>
            //                         <p className="text-gray-800">
            //                             <strong>Date:</strong> {appointment.date}
            //                         </p>
            //                         <p className="text-gray-800">
            //                             <strong>Time:</strong> {appointment.time}
            //                         </p>
            //                     </div>
            //                 </div>
            //             ))}
            //         </div>
            //     ) : (
            //         <p>No appointments booked yet.</p>
            //     )}
            // </div>  
    //     </div>
    // );
