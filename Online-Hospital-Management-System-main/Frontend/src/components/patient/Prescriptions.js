import React, { useState } from "react";
import { jsPDF } from "jspdf";

const Prescriptions = () => {
  const [prescriptions] = useState([
    // {
    //   doctorName: "Dr. Richard James",
    //   specialty: "General Physician",
    //   image: "path_to_doc1_image", // Replace with actual path
    //   medication: "Antacid",
    //   dosage: "1 tablet twice a day after meals",
    //   dateIssued: "2024-11-22",
    //   condition: "Digestion problem",
    // },
    {
      doctorName: "Dr. Sarah Lee",
      specialty: "Orthopedist",
      image: "path_to_doc2_image", // Replace with actual path
      medication: "Pain Reliever, Volini spray",
      dosage: "1 tablet every 6 hours as needed, if pain is more",
      dateIssued: "2024-11-23",
      condition: "Knee Pain",
    },
  ]);

  const handleDownloadPDF = (prescription) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prescription", 20, 20);
    doc.setFontSize(12);
    doc.text(`Doctor Name: ${prescription.doctorName}`, 20, 40);
    doc.text(`Specialty: ${prescription.specialty}`, 20, 50);
    doc.text(`Condition: ${prescription.condition}`, 20, 60);
    doc.text(`Medication: ${prescription.medication}`, 20, 70);
    doc.text(`Dosage: ${prescription.dosage}`, 20, 80);
    doc.text(`Date Issued: ${prescription.dateIssued}`, 20, 90);

    doc.save(`Prescription_${prescription.doctorName.replace(" ", "_")}.pdf`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Prescriptions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-">Doctor Name</th>
              <th className="py-2 px-4 text-">Specialty</th>
              <th className="py-2 px-4 text-">Condition</th>
              <th className="py-2 px-4 text-">Medication</th>
              <th className="py-2 px-4 text-">Dosage</th>
              <th className="py-2 px-4 text-">Date Issued</th>
              <th className="py-2 px-4 text-">Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4">{prescription.doctorName}</td>
                <td className="py-2 px-4">{prescription.specialty}</td>
                <td className="py-2 px-4">{prescription.condition}</td>
                <td className="py-2 px-4">{prescription.medication}</td>
                <td className="py-2 px-4">{prescription.dosage}</td>
                <td className="py-2 px-4">{prescription.dateIssued}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDownloadPDF(prescription)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescriptions;
