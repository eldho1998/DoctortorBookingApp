import './doctor-bookings.css';
import NavBar from '../../components/NavBar/navbar';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const DoctorBookings = () => {
  const [docBookings, setDocBookings] = useState([]);

  const doctorId = localStorage.getItem('ID');
  console.log('doc id on booking page:', doctorId);

  const fetchDoctorBookings = async () => {
    try {
      const response = await axios.get(`/appointment/doctor/${doctorId}`);
      setDocBookings(response.data.response);
      console.log('Hers ur bookingss:', response.data.response);
      toast.success('Your Appointments');
    } catch (e) {
      console.log('error:', e);
      toast.error('Error fetching your bookings');
    }
  };

  const handleAccept = async appointmentId => {
    try {
      await axios.put(`/appointment/${appointmentId}/accept`);
      toast.success('Appointment Accepted');
      fetchDoctorBookings();
    } catch (e) {
      toast.error('Error accepting Appointments');
    }
  };

  const handleReject = async appointmentId => {
    try {
      await axios.put(`/appointment/${appointmentId}/reject`);
      toast.success('Appointment Rejected');
      fetchDoctorBookings();
    } catch (e) {
      toast.error('Error rejecting Appointments');
    }
  };

  const onDeleleteClick = async appointmentId => {
    console.log('clicked:', appointmentId);
    try {
      const deleted = await axios.delete(`/appointment/${appointmentId}`);
      console.log(deleted);
      toast.success('Deleted Successfully!');
      fetchDoctorBookings();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDoctorBookings();
  }, []);

  return (
    <div className="doc-bookings">
      <ToastContainer />
      <NavBar />
      <h2>My Appointments</h2>

      <div className="cards-of-doctor-bookings">
        {docBookings.map((docbook, item) => {
          return (
            <div key={item} className="doctor-cards-book">
              <div className="daa">
                <p>
                  <h4>Date of appointment:</h4>
                  {new Date(docbook.slot[0]?.date).toLocaleDateString()}
                </p>
                <div className="del">
                  <Popconfirm
                    onConfirm={() => onDeleleteClick(docbook._id)}
                    placement="topLeft"
                    okText="Yes"
                    cancelText="No"
                    title="Delete Appointment?"
                    description="Are you sure to delete your appointment?"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                  >
                    <DeleteFilled className="ques" />
                  </Popconfirm>
                </div>
              </div>

              <p>
                <h4>Patient name:</h4>
                {`${docbook.user[0]?.firstName}  ${docbook.user[0]?.lastName}`}
              </p>
              <h5>
                Time: {docbook.slot[0]?.from} to {docbook.slot[0]?.to}
              </h5>

              <div className="buttons-of-doc-books">
                <Button
                  onClick={() => handleAccept(docbook._id)}
                  type="primary"
                  className="accept"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(docbook._id)}
                  className="reject"
                >
                  Reject
                </Button>

                {docbook.status == 'Accepted' && (
                  <Button disabled>Accepted!</Button>
                )}

                {docbook.status == 'Rejected' && (
                  <Button disabled>Rejected</Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorBookings;
