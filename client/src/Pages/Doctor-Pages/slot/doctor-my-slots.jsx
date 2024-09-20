import './doctor-my-slots.css';
import NavBar from '../../../components/NavBar/navbar';
import axios from '../../../utils/axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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

  const deleteSlot = async slotId => {
    console.log(slotId);
    try {
      const response = await axios.delete(`/slots/${slotId}`);
      console.log(response);
      toast.info('Successfully deleted!');
      fetchMySlots();
    } catch (e) {
      console.log(e);
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
              <p>Date:</p> {slots.date}
              <p>From: </p>
              {`${slots.from} To ${slots.to}`}
              <p>Number of Slots: {slots.availableSlots}</p>
              <div className="butto">
                <Popconfirm
                  onConfirm={() => deleteSlot(slots._id)}
                  placement="topLeft"
                  okText="Yes"
                  cancelText="No"
                  title="Delete Slot?"
                  description="Are you sure to delete your slot?"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                >
                  <button>Delete Slot</button>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorMySlots;
