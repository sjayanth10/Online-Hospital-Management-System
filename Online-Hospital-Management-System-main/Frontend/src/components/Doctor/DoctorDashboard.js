// import React, { useState, useEffect } from 'react';
// import { getDoctorNotifications, addPrescription, getSchedule, getDoctorAppointments, getDoctorPatients } from '../api';

// function DoctorDashboard() {
//   const [activeSection, setActiveSection] = useState('Dashboard');
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(false);
//   const [error, setError] = useState(null);
//   const [patientsCount, setPatientsCount] = useState(0);
//   const [appointmentsCount, setAppointmentsCount] = useState(0);
//   const [schedule, setSchedule] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);

//   const [loadingSchedule, setLoadingSchedule] = useState(false);
//   const [loadingAppointments, setLoadingAppointments] = useState(false);
//   const [loadingPatients, setLoadingPatients] = useState(false);

//   // Prescription Form State
//   const [medication, setMedication] = useState('');
//   const [dosage, setDosage] = useState('');
//   const [dateIssued, setDateIssued] = useState('');
//   const [patientId, setPatientId] = useState('');
//   const [doctorId, setDoctorId] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     loadDashboardData();
//     loadNotifications();
//     loadSchedule();
//     loadAppointments();
//     loadPatients();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const [patientsRes, appointmentsRes] = await Promise.all([getDoctorPatients(), getDoctorAppointments()]);
//       setPatientsCount(patientsRes.data.length);
//       setAppointmentsCount(appointmentsRes.data.length);
//     } catch (error) {
//       setError('Unable to load dashboard data. Please try again later.');
//     }
//   };

//   const loadNotifications = async () => {
//     setLoadingNotifications(true);
//     try {
//       const response = await getDoctorNotifications();
//       setNotifications(response.data);
//     } catch (error) {
//       setError('Unable to load notifications. Please try again later.');
//     } finally {
//       setLoadingNotifications(false);
//     }
//   };

//   const loadSchedule = async () => {
//     setLoadingSchedule(true);
//     try {
//       const response = await getSchedule();
//       setSchedule(response.data);
//     } catch (error) {
//       setError('Unable to load schedule. Please try again later.');
//     } finally {
//       setLoadingSchedule(false);
//     }
//   };

//   const loadAppointments = async () => {
//     setLoadingAppointments(true);
//     try {
//       const response = await getDoctorAppointments();
//       setAppointments(response.data);
//     } catch (error) {
//       setError('Unable to load appointments. Please try again later.');
//     } finally {
//       setLoadingAppointments(false);
//     }
//   };

//   const loadPatients = async () => {
//     setLoadingPatients(true);
//     try {
//       const response = await getDoctorPatients();
//       setPatients(response.data);
//     } catch (error) {
//       setError('Unable to load patients. Please try again later.');
//     } finally {
//       setLoadingPatients(false);
//     }
//   };

//   const handlePrescriptionSubmit = async (e) => {
//     e.preventDefault();
//     const prescriptionData = { medication, dosage, dateIssued, patientId, doctorId };
    
//     try {
//       await addPrescription(prescriptionData);
//       setMessage('Prescription added successfully.');
//       setMedication('');
//       setDosage('');
//       setDateIssued('');
//       setPatientId('');
//       setDoctorId('');
//     } catch (error) {
//       setMessage('Failed to add prescription. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       <aside className="w-full md:w-1/4 lg:w-1/5 bg-white text-black p-4 shadow-md">
//         <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
//         <nav className="space-y-4">
//           {['Dashboard', 'Schedule', 'Appointments', 'Patients', 'Prescription', 'Notifications'].map((section) => (
//             <button
//               key={section}
//               onClick={() => setActiveSection(section)}
//               className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === section ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
//             >
//               {section}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       <main className="flex-1 p-6 bg-[#E0F7FA]">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6">{activeSection}</h2>

//         {/* Section Content */}
//         {activeSection === 'Dashboard' && (
//           <SectionContainer title="Doctor Dashboard" bgClass="bg-[#3B82F6]">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <InfoCard title="Total My Patients" count={patientsCount} loading={loadingPatients} />
//               <InfoCard title="Total My Appointments" count={appointmentsCount} loading={loadingAppointments} />
//             </div>
//           </SectionContainer>
//         )}

//         {activeSection === 'Schedule' && (
//           <SectionContainer title="My Schedule" bgClass="bg-[#3B82F6]">
//             {loadingSchedule ? <p>Loading schedule...</p> : <DataList data={schedule} label="day" value="time" />}
//           </SectionContainer>
//         )}

//         {activeSection === 'Appointments' && (
//           <SectionContainer title="My Appointments" bgClass="bg-[#3B82F6]">
//             {loadingAppointments ? <p>Loading appointments...</p> : <DataList data={appointments} label="patientName" value="time" />}
//           </SectionContainer>
//         )}

//         {activeSection === 'Patients' && (
//           <SectionContainer title="My Patients" bgClass="bg-[#3B82F6]">
//             {loadingPatients ? <p>Loading patients...</p> : <DataList data={patients} label="name" value="condition" />}
//           </SectionContainer>
//         )}

//         {activeSection === 'Prescription' && (
//           <SectionContainer title="Prescription Management" bgClass="bg-[#3B82F6]">
//             <form onSubmit={handlePrescriptionSubmit} className="space-y-4 mt-4">
//               <input type="text" placeholder="Medication" value={medication} onChange={(e) => setMedication(e.target.value)} required className="w-full p-2 rounded border" />
//               <input type="text" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required className="w-full p-2 rounded border" />
//               <input type="date" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} required className="w-full p-2 rounded border" />
//               <input type="text" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="w-full p-2 rounded border" />
//               <input type="text" placeholder="Doctor ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required className="w-full p-2 rounded border" />
//               <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit Prescription</button>
//             </form>
//             {message && <p className="text-green-500 mt-4">{message}</p>}
//           </SectionContainer>
//         )}

//         {activeSection === 'Notifications' && (
//           <SectionContainer title="Notifications" bgClass="bg-[#3B82F6]">
//             {loadingNotifications ? <p>Loading notifications...</p> : error ? <p className="text-red-500">{error}</p> : <DataList data={notifications} label="message" value="timestamp" />}
//           </SectionContainer>
//         )}
//       </main>
//     </div>
//   );
// }

// const SectionContainer = ({ title, children, bgClass }) => (
//   <div className={`p-4 ${bgClass} rounded-lg shadow-lg`}>
//     <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
//     {children}
//   </div>
// );

// const InfoCard = ({ title, count, loading }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md">
//     <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
//     <p className="text-3xl font-bold text-gray-800">{loading ? "Loading..." : count}</p>
//   </div>
// );

// const DataList = ({ data, label, value }) => (
//   <ul className="space-y-2">
//     {data.length > 0 ? data.map((item, index) => (
//       <li key={index} className="border-b py-2">
//         <strong>{item[label]}:</strong> {item[value]}
//       </li>
//     )) : <p className="text-gray-700">No data available</p>}
//   </ul>
// );

// export default DoctorDashboard;

import React, { useState, useEffect } from 'react';

// Mocking the API functions
const getDoctorNotifications = async () => {
  return {
    data: [
      { id: 1, message: 'New patient registered', timestamp: '2024-11-21 17:25' },
      { id: 2, message: 'Appointment scheduled with Avinash', timestamp: '2024-11-11 17:26' }
    ]
  };
};

const addPrescription = async (prescriptionData) => {
  console.log('Prescription added:', prescriptionData);
};

// const getSchedule = async () => {
//   return {
//     data: [
//       { day: 'Monday', time: '9:00 AM - 1:00 PM' },
//       { day: 'Tuesday', time: '10:00 AM - 2:00 PM' }
//     ]
//   };
// };

const getDoctorAppointments = async () => {
  return {
    data: [
      { id: 1, patientName: 'Avinash', time: '2024-11-23 14:00' },
      // { id: 2, patientName: 'Bob', time: '2024-11-12 11:00 AM' }
    ]
  };
};

const getDoctorPatients = async () => {
  return {
    data: [
      { id: 1, name: 'Avinash', condition: 'Knee Pain' },
      // { id: 2, name: 'Bob', condition: 'Fever' }
    ]
  };
};

function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [error, setError] = useState(null);
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);

  // Prescription Form State
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [dateIssued, setDateIssued] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDashboardData();
    loadNotifications();
    // loadSchedule();
    loadAppointments();
    loadPatients();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [patientsRes, appointmentsRes] = await Promise.all([getDoctorPatients(), getDoctorAppointments()]);
      setPatientsCount(patientsRes.data.length);
      setAppointmentsCount(appointmentsRes.data.length);
    } catch (error) {
      setError('Unable to load dashboard data. Please try again later.');
    }
  };

  const loadNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const response = await getDoctorNotifications();
      setNotifications(response.data);
    } catch (error) {
      setError('Unable to load notifications. Please try again later.');
    } finally {
      setLoadingNotifications(false);
    }
  };

  // const loadSchedule = async () => {
  //   setLoadingSchedule(true);
  //   try {
  //     const response = await getSchedule();
  //     setSchedule(response.data);
  //   } catch (error) {
  //     setError('Unable to load schedule. Please try again later.');
  //   } finally {
  //     setLoadingSchedule(false);
  //   }
  // };

  const loadAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await getDoctorAppointments();
      setAppointments(response.data);
    } catch (error) {
      setError('Unable to load appointments. Please try again later.');
    } finally {
      setLoadingAppointments(false);
    }
  };

  const loadPatients = async () => {
    setLoadingPatients(true);
    try {
      const response = await getDoctorPatients();
      setPatients(response.data);
    } catch (error) {
      setError('Unable to load patients. Please try again later.');
    } finally {
      setLoadingPatients(false);
    }
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    const prescriptionData = { medication, dosage, dateIssued, patientId, doctorId };
    
    try {
      await addPrescription(prescriptionData);
      setMessage('Prescription added successfully.');
      setMedication('');
      setDosage('');
      setDateIssued('');
      setPatientId('');
      setDoctorId('');
    } catch (error) {
      setMessage('Failed to add prescription. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-1/4 lg:w-1/5 bg-white text-black p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
        <nav className="space-y-4">
          {['Dashboard', 'Schedule', 'Appointments', 'Patients', 'Prescription', 'Notifications'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === section ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-[#E0F7FA]">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{activeSection}</h2>

        {/* Section Content */}
        {activeSection === 'Dashboard' && (
          <SectionContainer title="Doctor Dashboard" bgClass="bg-[#3B82F6]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard title="Total My Patients" count={patientsCount} loading={loadingPatients} />
              <InfoCard title="Total My Appointments" count={appointmentsCount} loading={loadingAppointments} />
            </div>
          </SectionContainer>
        )}

        {/* {activeSection === 'Schedule' && (
          <SectionContainer title="My Schedule" bgClass="bg-[#3B82F6]">
            {loadingSchedule ? <p>Loading schedule...</p> : <DataList data={schedule} label="day" value="time" />}
          </SectionContainer>
        )} */}

        {activeSection === 'Appointments' && (
          <SectionContainer title="My Appointments" bgClass="bg-[#3B82F6]">
            {loadingAppointments ? <p>Loading appointments...</p> : <DataList data={appointments} label="patientName" value="time" />}
          </SectionContainer>
        )}

        {activeSection === 'Patients' && (
          <SectionContainer title="My Patients" bgClass="bg-[#3B82F6]">
            {loadingPatients ? <p>Loading patients...</p> : <DataList data={patients} label="name" value="condition" />}
          </SectionContainer>
        )}

        {activeSection === 'Prescription' && (
          <SectionContainer title="Prescription Management" bgClass="bg-[#3B82F6]">
            <form onSubmit={handlePrescriptionSubmit} className="space-y-4 mt-4">
              <input type="text" placeholder="Medication" value={medication} onChange={(e) => setMedication(e.target.value)} required className="w-full p-2 rounded border" />
              <input type="text" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required className="w-full p-2 rounded border" />
              <input type="date" value={dateIssued} onChange={(e) => setDateIssued(e.target.value)} required className="w-full p-2 rounded border" />
              <input type="text" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="w-full p-2 rounded border" />
              <input type="text" placeholder="Doctor ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required className="w-full p-2 rounded border" />
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit Prescription</button>
            </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </SectionContainer>
        )}

        {activeSection === 'Notifications' && (
          <SectionContainer title="Notifications" bgClass="bg-[#3B82F6]">
            {loadingNotifications ? <p>Loading notifications...</p> : error ? <p className="text-red-500">{error}</p> : <DataList data={notifications} label="message" value="timestamp" />}
          </SectionContainer>
        )}
      </main>
    </div>
  );
}

const SectionContainer = ({ title, children, bgClass }) => (
  <div className={`p-4 ${bgClass} rounded-lg shadow-lg`}>
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

const InfoCard = ({ title, count, loading }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
    <p className="text-3xl font-bold text-gray-800">{loading ? "Loading..." : count}</p>
  </div>
);

const DataList = ({ data, label, value }) => (
  <ul className="space-y-2">
    {data.length > 0 ? data.map((item, index) => (
      <li key={index} className="border-b py-2">
        <strong>{item[label]}:</strong> {item[value]}
      </li>
    )) : <p className="text-gray-700">No data available</p>}
  </ul>
);

export default DoctorDashboard;
