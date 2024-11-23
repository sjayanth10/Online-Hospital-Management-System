import React from 'react';
import { useNavigate } from 'react-router-dom';

const specialities = [
  { name: "General Physician", icon: "🩺" },
  { name: "Dermatologist", icon: "💊" },
  { name: "Cardiologist", icon: "❤️" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Orthopedist", icon: "🦴" },
];

const Specialities = () => {
  const navigate = useNavigate();

  const GoToAllDoctors=()=>{
    navigate('/all-doctors')
  }
  return (
    <section className="py-16 shadow-lg ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Find by Speciality</h2>
        <div className="grid grid-cols-2 md:grid-cols-5">
          {specialities.map((speciality, index) => (
            <div key={index} className="flex flex-col items-center mb-5">
              <div className="text-4xl mb-2"><button onClick={GoToAllDoctors}>{speciality.icon}</button></div>
              <p>{speciality.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;

