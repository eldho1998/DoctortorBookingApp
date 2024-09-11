import './doctor-my-slots.css';
import NavBar from '../../../components/NavBar/navbar';
import axios from '../../../utils/axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const DoctorMySlots = () => {
  const [myslots, setMySlots] = useState([]);

  const doctorID = localStorage.getItem('ID');

  const fetchMySlots = async () => {
    try {
      const response = await axios.get(`/slots/${doctorID}`, myslots);
      setMySlots(response.data.response);
      console.log('Yourr Slots:', response.data.response);
    } catch (e) {
      toast.error('Error getting your slots');
    }
  };

  useEffect(() => {
    fetchMySlots();
  }, []);

  return (
    <div className="doctor-my-slots">
      <NavBar />
      <div className="myslots">
        {myslots.map((slots, index) => {
          return (
            <div key={index} className="slots-cards">
              <p>Date: {slots.date}</p>
              <p>From: {`${slots.from} To ${slots.to}`}</p>
              <p>Number of Slots: {slots.availableSlots}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorMySlots;
