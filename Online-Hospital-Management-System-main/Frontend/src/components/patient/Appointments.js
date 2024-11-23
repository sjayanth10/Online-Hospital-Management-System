import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Replace these paths with the actual image paths
import doc1 from "../patient/Assets/doctor1.png"; // Example path for doctor image 1
import doc2 from "../patient/Assets/doctor2.png"; // Example path for doctor image 2

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data or preloading appointments
    setAppointments([
    //   {
    //     doctorName: "Dr. Richard James",
    //     specialty: "General Physician",
    //     image: doc1, // Add path to doctor's image
    //     date: "2024-11-22",
    //     time: "10:00 am",
    //   },
      {
        doctorName: "Dr.Sarah Lee",
        specialty: "Orthopedist",
        image: doc2, // Add path to doctor's image
        date: "2024-11-23",
        time: "14:00",
      },
    ]);
  }, []);

  const handleAppointmentClick = (appointment) => {
    navigate(`/doctor-details/${appointment.doctorName}`);
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full md:w-full lg:w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">
        Booked Appointments
      </h2>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="flex items-start mb-4 p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
              onClick={() => handleAppointmentClick(appointment)}
            >
              <img
                src={appointment.image}
                alt={appointment.doctorName}
                className="w-24 h-30 rounded-lg object-cover bg-blue-100"
              />
              <div className="ml-4 flex-1 text-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {appointment.doctorName}
                </h3>
                <p className="text-gray-600">{appointment.specialty}</p>
                <p className="text-gray-800">
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p className="text-gray-800">
                  <strong>Time:</strong> {appointment.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments booked yet.</p>
      )}
    </div>
  );
};

export default Appointments;
