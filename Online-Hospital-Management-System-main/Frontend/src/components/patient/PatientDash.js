import React from 'react';
// import Navbar from './NavBar';
import Hero from './Hero';
// import Navbar from './NavBar';
import Specialities from './Specialities';
import Doctor from './Doctor';
import Footer from './Footer';
import AppointmentBanner from './Banner'



function PatientDash() {
    return (
        <div className="bg-white container mx-auto text-center shadow-lg">

            {/* Hero Section */}
            <Hero />
            {/* Additional Sections */}
            <Specialities />
            <Doctor />
            <AppointmentBanner/>

            {/* Footer */}
            <Footer/>
        </div>
    );
}

export default PatientDash;


