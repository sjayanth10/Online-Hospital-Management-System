import React from 'react';
import { Link } from 'react-router-dom';
import doctorData from './doctorData';
import { useNavigate } from 'react-router-dom';

// const doctors = [
//   { name: "Dr. Richard James", specialty: "Cardiologist", image: doc1 },
//   { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc2 },
//   { name: "Dr. Linda Brown", specialty: "General Physician", image: doc3 },
//   { name: "Dr. dd Brown", specialty: "Neurologist", image: doc4 },
//   { name: "Dr. Linda Brown", specialty: "Orthopedist", image: doc5 },
//   { name: "Dr. Linda Brown", specialty: "Dermatologist", image: doc6 },
//   // Add more doctor objects here
// ];

const Doctors = () => {
  const navigate = useNavigate();
  const openDoctors = () => {
    navigate('/all-doctors')
  };
  return (
    <section className=" bg-white p-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Top Doctors to Book</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
          {doctorData.slice(0,6).map((doctorData, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md ">
              <img src={doctorData.image} alt={doctorData.name} className="w-full h-45 object-cover rounded-t-lg hover:bg-blue-200" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{doctorData.name}</h3>
                <p className="text-gray-600">{doctorData.specialty}</p>
                <Link to={`/all-doctors/${index}`}>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-full">Book</button>
                </Link>
              </div>
            </div>
          ))}

        </div>
        <button className="text-black mt-5 hover:bg-gray-300 bg-gray-200  py-2 px-6 rounded-lg" onClick={openDoctors}>More..</button>

      </div>
    </section>
  );
};

export default Doctors;
