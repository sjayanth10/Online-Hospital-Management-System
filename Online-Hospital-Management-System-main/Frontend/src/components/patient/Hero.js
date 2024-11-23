import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from './Assets/header_img.png'; // Replace with the actual path to your image

const Hero = () => {
  const navigate  = useNavigate()
  const GoToDocotors = ()=>{
    navigate('/all-doctors');
  }
  return (
    <section className="bg-blue-600 text-white py-20 px-8 md:px-16 lg:px-24 rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between "> {/* Align items to the bottom */}
        
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 flex flex-col justify-center"> {/* Center text vertically */}
          <h1 className="text-3xl font-bold mb-4 md:text-4xl ">Book Appointment With Trusted Doctors</h1>
          <p className="mb-8">Consult top doctors across various specializations</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold" onClick={GoToDocotors}>
            Get Started
          </button>
        </div>
        
        {/* Image Section */}
        <div className="md:w-1/2 side-image">
          <img 
            src={heroImage} 
            alt="Doctors" 
            className="hidden md:block w-3/4 md:w-full h-3/4 object-cover rounded-lg"
            style={{ maxHeight: '75%' }} // Ensures image height is 3/4 of the Hero section height
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;