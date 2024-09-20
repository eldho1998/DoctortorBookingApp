import './addSlot.css';
import NavBar from '../../../components/Doctor-NavBar/doctor-navbar';
import { Input, Button } from 'antd';

import axios from '../../../utils/axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const AddSlot = () => {
  const [slots, setSlots] = useState({
    date: '',
    from: '',
    to: '',
    availableSlots: '',
  });

  const onChange = (e, key) => {
    try {
      setSlots({ ...slots, [key]: e.target.value });
    } catch (e) {
      toast.error('Error typing data');
    }
  };
  console.log(slots);

  const onTimeChange = (e, key) => {
    setSlots({ ...slots, [key]: e.target.value });
  };

  const formatTime = time => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const doctorID = localStorage.getItem('ID');

  const onAddSlotClick = async () => {
    try {
      const slotData = {
        date: slots.date,
        from: formatTime(slots.from),
        to: formatTime(slots.to),
        availableSlots: slots.availableSlots,
        doctorID,
      };

      const response = await axios.post(`/slots`, slotData);

      setSlots({
        date: '',
        from: '',
        to: '',
        availableSlots: '',
      });
      console.log(response.data);

      toast.success('Successfully added slots');
    } catch (e) {
      console.log('Error:', e);
      toast.error('Error adding slots');
    }
  };

  return (
    <div className="slot-page-main">
      <ToastContainer />
      <NavBar />
      <div className="second-partt">
        <div className="Slotform-main">
          <div className="datee">
            <p>Give a Date</p>
            <Input
              value={slots.date}
              onChange={e => onChange(e, 'date')}
              type="date"
            />
          </div>
          <div className="timee">
            <div className="start">
              <p>Set Your Start Time</p>
              <input
                className="start-time"
                aria-label="Time"
                type="time"
                onChange={e => onTimeChange(e, 'from')}
              />
            </div>
            <div className="end">
              <p>Set Your End Time</p>
              <input
                className="end-time"
                aria-label="Time"
                type="time"
                onChange={e => onTimeChange(e, 'to')}
              />
            </div>
          </div>
          <div className="slots-count">
            <p>Slots Count</p>
            <Input
              value={slots.availableSlots}
              type="text"
              onChange={e => onChange(e, 'availableSlots')}
            />
          </div>
        </div>
        <div className="button">
          <Button onClick={onAddSlotClick}>Add Slots</Button>
        </div>
      </div>
    </div>
  );
};

export default AddSlot;
