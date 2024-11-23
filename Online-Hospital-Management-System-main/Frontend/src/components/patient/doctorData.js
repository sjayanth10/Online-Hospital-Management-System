// doctorData.js
import doc1 from './Assets/doctor1.png'; // Replace with the actual path
import doc2 from './Assets/doctor2.png';
import doc3 from './Assets/doctor3.png';
import doc4 from './Assets/doctor4.png';
import doc5 from './Assets/doctor5.png';
import doc6 from './Assets/doctor6.png';
import doc7 from './Assets/doctor7.png';

const doctorData = [
  {
    id: 1,
    name: "Dr. Richard James",
    specialty: "General Physician",
    image: doc1,
    experience: "4 Years",
    about: "Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fee: "$50",
    availableDates: ["2024-11-08", "2024-11-09", "2024-11-10"],
    slots: ["04:00","05:00","10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"]
  },
  {
    id: 2,
    name: "Dr. Linda Brown",
    specialty: "Dermatologist",
    image: doc2,
    experience: "4 Years",
    about: "Dr. Brown has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fee: "$50",
    availableDates: ["2024-11-08", "2024-11-09", "2024-11-10"],
    slots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"]
  },
  {
    id: 3,
    name: "Dr. Michael Smith",
    specialty: "Cardiologist",
    image: doc3,
    experience: "8 Years",
    about: "Dr. Smith is dedicated to providing personalized cardiac care and emphasizes the importance of heart health through education and preventive measures.",
    fee: "$75",
    availableDates: ["2024-11-12", "2024-11-13", "2024-11-14"],
    slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30"]
},
{
    id: 4,
    name: "Dr. Emily Johnson",
    specialty: "Pediatrician",
    image: doc4,
    experience: "6 Years",
    about: "Dr. Johnson specializes in children's health and wellness, focusing on preventive care and the treatment of common childhood illnesses.",
    fee: "$60",
    availableDates: ["2024-11-15", "2024-11-16", "2024-11-17"],
    slots: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
},
{
    id: 5,
    name: "Dr. Sarah Lee",
    specialty: "Orthopedist",
    image: doc5,
    experience: "10 Years",
    about: "Dr. Lee is committed to providing high-quality orthopedic care, focusing on both surgical and non-surgical treatment options for musculoskeletal issues.",
    fee: "$100",
    availableDates: ["2024-11-18", "2024-11-19", "2024-11-20"],
    slots: [ "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"]
},
{
    id: 6,
    name: "Dr. David Johnson",
    specialty: "Pediatrician",
    image: doc6,
    experience: "9 Years",
    about: "Dr. Johnson specializes in pediatric care, offering services for children's health and development.",
    fee: "$85",
    availableDates: ["2024-11-30", "2024-12-01", "2024-12-02"],
    slots: ["09:30", "10:00", "10:30", "11:00", "11:30"]
  },
  {
    id: 7,
    name: "Dr. James",
    specialty: "Orthopedist",
    image: doc7,
    experience: "15 Years",
    about: "Dr. James is a renowned cardiologist dedicated to providing top-notch cardiac care to his patients.",
    fee: "$120",
    availableDates: ["2024-11-18", "2024-11-19", "2024-11-20"],
    slots: ["09:00", "09:30", "10:00", "10:30", "11:00"]
  },
  // Add more doctors as needed
];

export default doctorData;
