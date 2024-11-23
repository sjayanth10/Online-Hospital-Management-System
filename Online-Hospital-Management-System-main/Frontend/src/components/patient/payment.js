import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    condition: '',
    transactionId: '',
    paymentScreenshot: null,
  });

  const PaymentDone = (e) => {
    alert("Payment Done");
  };

  const doctorUPINumber = "9856175015@upi"; // Replace with actual UPI number

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", formData);
    alert("Payment details submitted successfully!");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="bg-white mt-12 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Your Payment</h2>

        <p className="text-gray-700 mb-4">
          Please pay to the doctor's UPI number:
          <span className="font-semibold text-blue-600"> {doctorUPINumber}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-start my-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-start my-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-start my-2">Disease</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-start my-2">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-start my-2">Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full"
            />
          </div>

          <Link to="/">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-6"
              onClick={PaymentDone}
            >
              Submit Payment Details
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
