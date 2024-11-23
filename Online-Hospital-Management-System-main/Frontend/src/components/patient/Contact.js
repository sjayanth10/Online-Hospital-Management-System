import React from 'react';
import Footer from './Footer';

const Contact = () => {
  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Contact Us</h2>
        
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-8 text-start">
          
          {/* Contact Information */}
          <div className="md:w-1/2 w-full mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-6">
              We’d love to hear from you! If you have any questions, feedback, or concerns, feel free to reach out.
            </p>
            <ul className="text-gray-700 space-y-4 ">
              <li>
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
              </li>
              <li>
                <span className="font-semibold">Email:</span> contact@healthcare.com
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Healthcare St., City, State, Zip
              </li>
            </ul>
          </div>
          
          {/* Contact Form */}
          <div className="md:w-1/2 w-full">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-gray-600">Message</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
