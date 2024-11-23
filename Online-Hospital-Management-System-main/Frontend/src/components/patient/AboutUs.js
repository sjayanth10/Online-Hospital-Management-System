import React from 'react';
import aboutImage from './Assets/doctor1.png'; // Replace with the path to your image
import Footer from './Footer';

const AboutUs = () => {
    return (
        <section className="bg-gray-100 py-15 px-6">
            <div className="container mx-auto">

                {/* Image and About Us Content Side-by-Side */}
                <div className="flex flex-col md:flex-row items-center text-start bg-white rounded-lg shadow-lg p-6">

                    {/* About Image */}
                    <div className="md:w-1/2 w-full mb-8 md:mb-0">
                        <img src={aboutImage} alt="About Us" className="w-full h-45 md:w-full md:h-45 object-cover rounded-lg shadow-lg" />
                    </div>

                    {/* About Text */}
                    <div className="md:w-1/2 w-full md:pl-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to our healthcare platform! We are dedicated to providing quality healthcare services to everyone in need. Our team of experienced and compassionate doctors is here to ensure that you receive the best care possible. We believe in making healthcare accessible, affordable, and efficient.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center text-start bg-white rounded-lg shadow-lg p-6">
                    {/* Our Mission Section */}
                    <div className="md:w-1/2 w-full mb-8 md:mb-0 text-start">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Core Values</h3>
                        <ul className="text-gray-700 list-disc list-inside space-y-2">
                            <li>Compassionate Care</li>
                            <li>Integrity and Transparency</li>
                            <li>Commitment to Excellence</li>
                            <li>Patient-Centered Approach</li>
                        </ul>
                    </div>

                    {/* Our Core Values Section */}
                    <div className="md:w-1/2 w-full md:pl-8">

                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-700">
                            Our mission is to connect patients with top-notch healthcare providers and to make healthcare more accessible. We are committed to fostering a safe, welcoming, and caring environment for all our patients.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default AboutUs;
