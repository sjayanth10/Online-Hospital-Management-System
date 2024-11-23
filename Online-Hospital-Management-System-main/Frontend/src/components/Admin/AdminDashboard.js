// import React, { useState, useEffect } from 'react';
// import {
//   getDoctors,
//   getAppointments,
//   getPatients,
//   getConsultationRecords,
//   getNotifications,
// } from '../api';


// const AdminDashboard = () => {
//   const [doctorCount, setDoctorCount] = useState(0);
//   const [patientCount, setPatientCount] = useState(0);
//   const [appointmentCount, setAppointmentCount] = useState(0);
//   const [consultationRecordCount, setConsultationRecordCount] = useState(0);
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [consultationRecords, setConsultationRecords] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('Dashboard');
//   const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

//   useEffect(() => {
//     loadDoctors();
//     loadAppointments();
//     loadPatients();
//     loadConsultationRecords();
//   }, []);

//   const loadDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await getDoctors();
//       setDoctors(response.data);
//     } catch (error) {
//       setError('Unable to load doctors. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadAppointments = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getAppointments();
//       setAppointments(response.data);
//     } catch (error) {
//       setError('Unable to load appointments. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadPatients = async () => {
//     setLoading(true);
//     try {
//       const response = await getPatients();
//       setPatients(response.data);
//     } catch (error) {
//       setError('Unable to load patients. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadConsultationRecords = async () => {
//     setLoading(true);
//     try {
//       const response = await getConsultationRecords();
//       setConsultationRecords(response.data);
//     } catch (error) {
//       setError('Unable to load consultation records. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === 'Dashboard') {
//       loadDashboardData();
//     }
//   }, [activeSection]);

//   const loadDashboardData = async () => {
//     try {
//       const [doctorsRes, patientsRes, appointmentsRes, consultationRecordsRes] = await Promise.all([
//         getDoctors(),
//         getPatients(),
//         getAppointments(),
//         getConsultationRecords(),
//       ]);

//       setDoctorCount(doctorsRes.data.length);
//       setPatientCount(patientsRes.data.length);
//       setAppointmentCount(appointmentsRes.data.length);
//       setConsultationRecordCount(consultationRecordsRes.data.length);
//     } catch (error) {
//       setError('Unable to load dashboard data. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getNotifications();
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       <aside className="w-full md:w-1/6 bg-white text-gray-800 p-4 shadow-md">
//         <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
//         <nav className="space-y-4">
//           <button
//             onClick={() => setActiveSection('Dashboard')}
//             className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Dashboard' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
//           >
//             Dashboard
//           </button>

//           <div>
//             <button
//               onClick={() => setIsUsersDropdownOpen(!isUsersDropdownOpen)}
//               className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
//             >
//               Users
//             </button>
//             {isUsersDropdownOpen && (
//               <div className="ml-4 space-y-2">
//                 <button
//                   onClick={() => setActiveSection('Doctors')}
//                   className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Doctors' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
//                 >
//                   Doctors
//                 </button>
//                 <button
//                   onClick={() => setActiveSection('Patients')}
//                   className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Patients' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
//                 >
//                   Patients
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setActiveSection('Appointments')}
//             className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Appointments' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
//           >
//             Appointments
//           </button>

//           <button
//             onClick={() => setActiveSection('ConsultationRecords')}
//             className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'ConsultationRecords' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
//           >
//             Consultation Records
//           </button>

//           <button
//             onClick={() => setActiveSection('Notifications')}
//             className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Notifications' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
//           >
//             Notifications
//           </button>
//         </nav>
//       </aside>

//       <main className="w-full md:w-5/6 p-4 md:p-6 bg-[#E0F7FA]">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6">{activeSection}</h2>

//         {activeSection === 'Dashboard' && (
//           <div className="bg-[#3B82F6] p-4 md:p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-medium text-white mb-4">Welcome to the Admin Dashboard</h3>
//             <p className="text-gray-200 mb-6">Manage doctors, appointments, patients, and consultation records from here.</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h4 className="text-lg font-semibold text-gray-700">Doctors</h4>
//                 <p className="text-3xl font-bold text-gray-800">{doctorCount}</p>
//               </div>

//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h4 className="text-lg font-semibold text-gray-700">Patients</h4>
//                 <p className="text-3xl font-bold text-gray-800">{patientCount}</p>
//               </div>

//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h4 className="text-lg font-semibold text-gray-700">Appointments</h4>
//                 <p className="text-3xl font-bold text-gray-800">{appointmentCount}</p>
//               </div>

//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h4 className="text-lg font-semibold text-gray-700">Consultation Records</h4>
//                 <p className="text-3xl font-bold text-gray-800">{consultationRecordCount}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeSection === 'Doctors' && (
//           <SectionContainer title="Doctors" data={doctors} loading={loading} error={error} />
//         )}
//         {activeSection === 'Patients' && (
//           <SectionContainer title="Patients" data={patients} loading={loading} error={error} />
//         )}
//         {activeSection === 'Appointments' && (
//           <SectionContainer title="Appointments" data={appointments} loading={loading} error={error} />
//         )}
//         {activeSection === 'ConsultationRecords' && (
//           <SectionContainer title="Consultation Records" data={consultationRecords} loading={loading} error={error} />
//         )}
//         {activeSection === 'Notifications' && (
//           <SectionContainer title="Notifications" data={notifications} loading={loading} error={error} />
//         )}
//       </main>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';

// Dummy data for testing
const dummyDoctors = [
  { id: 1, name: 'Dr.Sarah Lee', specialty: 'Orthopedist', email: 'sarah@hospital.com'},
  // { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology', email: 'janesmith@hospital.com', phone: '987-654-3210' },
];

const dummyPatients = [
  { id: 1, name: 'Avinash', age: 55, email: 'Avinash@example.com', phone: '9874563210' },
  // { id: 2, name: 'chinna thala', age: 27, email: 'bobbrown@gmail.com', phone: '321-654-9876' },
];

const dummyAppointments = [
  { id: 1, doctor: 'Dr.Sarah Lee', patient: 'Avinash', date: '2024-11-23', status: 'Scheduled' },
  // { id: 2, doctor: 'Dr. Dr. Sarah Lee', patient: 'Chinna thala', date: '2024-11-23', status: 'Completed' },
];

const dummyConsultationRecords = [
  // { id: 1, doctor: 'Dr. John Doe', patient: 'Alice Johnson', date: '2024-11-01', notes: 'Routine checkup, blood pressure normal' },
  // { id: 2, doctor: 'Dr. Jane Smith', patient: 'Bob Brown', date: '2024-10-29', notes: 'Treatment for skin rash' },
  { id: 1, doctor: 'Dr. Richard James', patient: 'Avinash', date: '2024-11-22', notes: 'Digestion problem' }
];

const dummyNotifications = [
  { id: 1, message: 'New doctor registered: Dr.Sarah Lee', timestamp: '2024-11-21 17:24'},
  { id: 2, message: 'New patient registered: Avinash', timestamp: '2024-11-21 17:21' },
  // { id: 3, message: 'New patient registered: Prasad', timestamp: '2024-11-07 15:00'},
];

const AdminDashboard = () => {
  const [doctorCount, setDoctorCount] = useState(dummyDoctors.length);
  const [patientCount, setPatientCount] = useState(dummyPatients.length);
  const [appointmentCount, setAppointmentCount] = useState(dummyAppointments.length);
  const [consultationRecordCount, setConsultationRecordCount] = useState(dummyConsultationRecords.length);
  const [doctors, setDoctors] = useState(dummyDoctors);
  const [patients, setPatients] = useState(dummyPatients);
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [consultationRecords, setConsultationRecords] = useState(dummyConsultationRecords);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-1/6 bg-white text-gray-800 p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('Dashboard')}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Dashboard' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Dashboard
          </button>

          <div>
            <button
              onClick={() => setIsUsersDropdownOpen(!isUsersDropdownOpen)}
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Users
            </button>
            {isUsersDropdownOpen && (
              <div className="ml-4 space-y-2">
                <button
                  onClick={() => setActiveSection('Doctors')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Doctors' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Doctors
                </button>
                <button
                  onClick={() => setActiveSection('Patients')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Patients' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Patients
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveSection('Appointments')}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Appointments' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Appointments
          </button>

          <button
            onClick={() => setActiveSection('ConsultationRecords')}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'ConsultationRecords' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Consultation Records
          </button>

          <button
            onClick={() => setActiveSection('Notifications')}
            className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'Notifications' ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Notifications
          </button>
        </nav>
      </aside>

      <main className="w-full md:w-5/6 p-4 md:p-6 bg-[#E0F7FA]">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{activeSection}</h2>

        {activeSection === 'Dashboard' && (
          <div className="bg-[#3B82F6] p-4 md:p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium text-white mb-4">Welcome to the Admin Dashboard</h3>
            <p className="text-gray-200 mb-6">Manage doctors, appointments, patients, and consultation records from here.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700">Doctors</h4>
                <p className="text-3xl font-bold text-gray-800">{doctorCount}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700">Patients</h4>
                <p className="text-3xl font-bold text-gray-800">{patientCount}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700">Appointments</h4>
                <p className="text-3xl font-bold text-gray-800">{appointmentCount}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700">Consultation Records</h4>
                <p className="text-3xl font-bold text-gray-800">{consultationRecordCount}</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Doctors' && (
          <SectionContainer title="Doctors" data={doctors} loading={loading} error={error} />
        )}
        {activeSection === 'Patients' && (
          <SectionContainer title="Patients" data={patients} loading={loading} error={error} />
        )}
        {activeSection === 'Appointments' && (
          <SectionContainer title="Appointments" data={appointments} loading={loading} error={error} />
        )}
        {activeSection === 'ConsultationRecords' && (
          <SectionContainer title="Consultation Records" data={consultationRecords} loading={loading} error={error} />
        )}
        {activeSection === 'Notifications' && (
          <SectionContainer title="Notifications" data={notifications} loading={loading} error={error} />
        )}
      </main>
    </div>
  );
};

const SectionContainer = ({ title, data, loading, error }) => {
  const renderTable = () => {
    if (title === 'Doctors') {
      return (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-">Name</th>
              <th className="px-4 py-2 border-b text-">Specialty</th>
              <th className="px-4 py-2 border-b text-">Email</th>
              <th className="px-4 py-2 border-b text-">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-4 py-2 border-b">
                  <img
                    src={`/images/doctors/doc${doctor.id}.png`} // Assuming images are named doc1.jpg, doc2.jpg, etc.
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border-b">{doctor.name}</td>
                <td className="px-4 py-2 border-b">{doctor.specialty}</td>
                <td className="px-4 py-2 border-b">{doctor.email}</td>
                <td className="px-4 py-2 border-b">{doctor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (title === 'Patients') {
      return (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text">Name</th>
              <th className="px-4 py-2 border-b text">Age</th>
              <th className="px-4 py-2 border-b text">Email</th>
              <th className="px-4 py-2 border-b text">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((patient) => (
              <tr key={patient.id}>
                <td className="px-4 py-2 border-b">{patient.name}</td>
                <td className="px-4 py-2 border-b">{patient.age}</td>
                <td className="px-4 py-2 border-b">{patient.email}</td>
                <td className="px-4 py-2 border-b">{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (title === 'Appointments') {
      return (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text">Doctor</th>
              <th className="px-4 py-2 border-b text">Patient</th>
              <th className="px-4 py-2 border-b text">Date</th>
              <th className="px-4 py-2 border-b text">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-4 py-2 border-b">{appointment.doctor}</td>
                <td className="px-4 py-2 border-b">{appointment.patient}</td>
                <td className="px-4 py-2 border-b">{appointment.date}</td>
                <td className="px-4 py-2 border-b">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (title === 'Consultation Records') {
      return (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text">Doctor</th>
              <th className="px-4 py-2 border-b text">Patient</th>
              <th className="px-4 py-2 border-b text">Date</th>
              <th className="px-4 py-2 border-b text">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-2 border-b">{record.doctor}</td>
                <td className="px-4 py-2 border-b">{record.patient}</td>
                <td className="px-4 py-2 border-b">{record.date}</td>
                <td className="px-4 py-2 border-b">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (title === 'Notifications') {
      return (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text">Message</th>
              <th className="px-4 py-2 border-b text">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((notification) => (
              <tr key={notification.id}>
                <td className="px-4 py-2 border-b">{notification.message}</td>
                <td className="px-4 py-2 border-b">{notification.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="p-4 bg-[#3B82F6] rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        renderTable()
      )}
    </div>
  );
};


export default AdminDashboard;
