import './user-bookings.css';
import UserNav from './user-Nav';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DeleteFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('ID');
  console.log('bookings page userId:', userId);
  console.log('heyy you', bookings);

  const fetchBookingsofUser = async () => {
    try {
      const response = await axios.get(`/appointment/user/${userId}`);
      const fetchBookings = response.data.response;

      if (fetchBookings.length == 0) {
        toast.info('You have no bookings right now!');
      } else {
        toast.success('Your Bookings');
      }
      setBookings(fetchBookings);
      console.log('Bookings:', fetchBookings);
    } catch (e) {
      console.log(e);
      toast.error('Failed loading your Bookings');
    }
  };

  const onDeleleteClick = async appointmentId => {
    console.log('its me slot:', appointmentId);
    try {
      const WhenDelete = await axios.delete(`/appointment/${appointmentId}`);
      console.log('ss', WhenDelete);
      fetchBookingsofUser();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBookingsofUser();
  }, []);

  return (
    <div className="user-bookigs-main">
      <UserNav />
      <ToastContainer />
      <div className="head-user-bookings">
        <p> myBookings</p>
      </div>
      <div className="first-part-book">
        <div className="cards-of-booking">
          {bookings.map(appointments => {
            return (
              <div key={appointments._id} className="booked-cards">
                <div className="accept-or-reject">
                  <p>{appointments.status}</p>
                </div>
                <img src={appointments.doctor[0]?.image} />

                <div className="names">
                  <p>
                    Dr.
                    {`
                  ${appointments.doctor[0]?.firstName}
                  ${appointments.doctor[0]?.lastName}`}
                  </p>
                </div>
                <div className="det">
                  <div className="slot-id">
                    <div className="id">
                      <h4>SLOT ID: </h4>
                    </div>
                    <div className="app">
                      <p>{appointments.slot[0]?._id}</p>
                    </div>
                  </div>
                  <div className="dat">
                    <p>
                      <h4> DATE:</h4>
                      {new Date(
                        appointments.slot[0]?.date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="tim">
                    <p>
                      <h4>TIME: </h4>
                      {appointments.slot[0]?.from} to {appointments.slot[0]?.to}
                    </p>
                  </div>
                  <div className="del">
                    <Popconfirm
                      onConfirm={() => onDeleleteClick(appointments._id)}
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
                      <DeleteFilled className="ques" />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UserBookings;
