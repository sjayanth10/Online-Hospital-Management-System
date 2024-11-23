import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import doctorData from './doctorData';
// Add other image imports as necessary

// const doctors = [
//     { name: "Dr. Richard James", specialty: "Cardiologist", image: doc1, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2, status: "Available" },
//     // Add more doctor objects here
// ];

const specialties = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedist",
];

const Doctors = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredDoctors = selectedSpecialty
        ? doctorData.filter((doctor) => doctor.specialty === selectedSpecialty)
        : doctorData;

    return (
        <div>
            <div className="flex flex-col md:flex-row bg-gray-100 p-6 min-h-screen">
                {/* Sidebar for large screens with sticky positioning */}
                <aside className="hidden md:block w-1/4 p-4 bg-white rounded-lg shadow-md mr-4 sticky top-24 h-max">
                    <h3 className="text-xl font-semibold mb-4">Browse through the doctor specialties</h3>
                    <ul className="space-y-2">
                        {specialties.map((specialty, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setSelectedSpecialty(specialty)}
                                    className={`w-full text-left p-2 rounded-md hover:bg-blue-400 transition ${selectedSpecialty === specialty ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {specialty}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setSelectedSpecialty("")}
                                className="w-full text-left p-2 rounded-md bg-gray-200 text-gray-700"
                            >
                                Show All
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Dropdown for small screens */}
                <div className="block md:hidden mb-4">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-left"
                    >
                        {selectedSpecialty || "Select Specialty"}
                    </button>
                    {isDropdownOpen && (
                        <div className="bg-white rounded-lg shadow-md mt-2 p-2">
                            <ul className="space-y-2">
                                {specialties.map((specialty, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => {
                                                setSelectedSpecialty(specialty);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left p-2 rounded-md transition hover:bg-blue-400 ${selectedSpecialty === specialty ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {specialty}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => {
                                            setSelectedSpecialty("");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full text-left p-2 rounded-md bg-gray-200 text-gray-700"
                                    >
                                        Show All
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Doctor cards grid */}
                <main className="w-full md:w-3/4">
                    {filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDoctors.map((doctor, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-41 object-cover hover:bg-blue-200" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                        <p className="text-gray-600">{doctor.specialty}</p>
                                        <p className={`mt-2 font-medium ${doctor.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                                            {doctor.status}
                                        </p>
                                        <Link to={`/all-doctors/${index}`}>
                                            <button className="mt-4 w-full bg-blue-600 text-white py-1 rounded-md">
                                                Book
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg mt-10">No doctors available for the selected specialty.</p>
                    )}
                </main>

            </div>
            <Footer />
        </div>

    );
};

export default Doctors;


