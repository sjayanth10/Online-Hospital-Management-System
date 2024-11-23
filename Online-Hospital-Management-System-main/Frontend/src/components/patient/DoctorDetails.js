import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import doctorData from './doctorData';

// Function to generate an array of the next 7 days
const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i); // Set the date for the next day
        days.push(nextDay.toISOString().split('T')[0]); // Store as YYYY-MM-DD
    }
    return days;
};

// Function to convert "05:00 am" or "05:00 pm" format to a Date object with 24-hour time
const convertTo24HourFormat = (time12hr) => {
    const [time, period] = time12hr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12; // Convert PM times to 24-hour format
    }
    if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0; // Convert 12 AM to 00:00
    }

    const convertedTime = new Date();
    convertedTime.setHours(hours, minutes, 0, 0); // Set the converted hours and minutes on today's date
    return convertedTime;
};

const DoctorDetails = ({ isLoggedIn, setIsLoggedIn }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const doctor = doctorData[id];
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Get the next 7 days for booking
    const availableDates = getNextSevenDays();

    const handleBookAppointment = () => {
        if (isLoggedIn && selectedDate && selectedSlot) {
            setIsPopupOpen(true); // Open confirmation popup
        } else if (!isLoggedIn) {
            alert("Please log in first.");
            navigate('/login');
        } else {
            alert('Please select a date and time slot.');
        }
    };

    const handleConfirm = () => {
        setIsPopupOpen(false);
        navigate('/payment'); // Redirect to payment page
    };

    // Function to check if the time slot is disabled for today
    const isSlotDisabled = (slot) => {
        // Only disable slots if the selected date is today
        if (selectedDate === new Date().toISOString().split('T')[0]) {
            const currentTime = new Date();

            // Convert the slot to 24-hour format
            const slotTime = convertTo24HourFormat(slot);

            return slotTime <= currentTime; // Disable the slot if the slot time is earlier than or equal to the current time
        }
        return false; // All slots are available if it's not today
    };

    if (!doctor) {
        return <p>Doctor not found.</p>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-3/4 lg:w-3/4">
                {/* Doctor Details */}
                <div className="flex items-start text-start space-x-6">
                    <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-lg object-cover bg-blue-100" />
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {doctor.name} <span className="text-blue-500">✔</span>
                        </h1>
                        <p className="text-gray-600 mt-1">{doctor.specialty} - {doctor.experience}</p>
                        <p className="text-gray-600 mt-2"><strong>About:</strong> {doctor.about}</p>
                        <p className="text-gray-800 font-medium mt-4">Appointment fee: <span className="font-semibold">{doctor.fee}</span></p>
                    </div>
                </div>
                <hr className="mt-5" />

                {/* Booking Slots */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Booking slots</h3>
                    <div className="flex space-x-2 mt-4">
                        {availableDates.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                className={`py-2 px-4 rounded-lg ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} transition-colors`}
                            >
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {doctor.slots.map((slot, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSlot(slot)}
                                disabled={isSlotDisabled(slot)} // Disable slot if it's past for the selected day
                                className={`py-1 px-3 border rounded-lg ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} transition-colors ${isSlotDisabled(slot) ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Book Appointment Button */}
                <div className="mt-8">
                    <button onClick={handleBookAppointment} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg">
                        Book an appointment
                    </button>
                </div>
            </div>

            {/* Confirmation Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center text-start bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold">Confirm Appointment</h2>
                        <p><strong>Doctor:</strong> {doctor.name}</p>
                        <p><strong>Specialty:</strong> {doctor.specialty}</p>
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Time:</strong> {selectedSlot}</p>
                        <div className="flex justify-center mt-4 space-x-2">
                            <button onClick={() => setIsPopupOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
