import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-col space-x-4 md:flex-col items-start text-left md:text-left mb-4 md:mb-10 space-y-4 md:space-y-0 md:space-x-4">
                    <Link to="/" className="text-2xl font-bold text-blue-600 my-4">Prescripto</Link>
                    <p className="text-gray-600 text-sm md:text-base max-w-xs md:max-w-sm">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 lg:space-x-12 items-start text-start sm:text-left">
                    
                    <div className="flex flex-col space-y-4">
                        <h5 className="text-gray-800 font-medium text-lg">Get in Touch</h5>
                        <a href="tel:+1-234-567-890" className="text-gray-600 hover:text-gray-800">
                            +1-234-567-890
                        </a>
                        <a href="mailto:info@example.com" className="text-gray-600 hover:text-gray-800">
                            info@example.com
                        </a>
                        <p className="text-gray-600 hover:text-gray-800">
                            Address: 123 Main St, Anytown, USA
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h5 className="text-gray-800 font-medium text-lg">Social Media</h5>
                        <a href="/" className="text-gray-600 hover:text-gray-800">
                            <i className="fa-brands fa-facebook-f"></i> Facebook
                        </a>
                        <a href="/" className="text-gray-600 hover:text-gray-800">
                            <i className="fa-brands fa-twitter"></i> Twitter
                        </a>
                        <a href="/" className="text-gray-600 hover:text-gray-800">
                            <i className="fa-brands fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
