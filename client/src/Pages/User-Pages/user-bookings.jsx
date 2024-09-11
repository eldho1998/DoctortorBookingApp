import './user-bookings.css';
import UserNav from './user-Nav';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('ID');
  console.log('bookings page userId:', userId);

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

  console.log('heyy you', bookings);
  useEffect(() => {
    fetchBookingsofUser();
  }, []);

  return (
    <div className="user-bookigs-main">
      <UserNav />
      <ToastContainer />
      <div className="head-user-bookings">
        <p> My Bookings</p>
      </div>
      <div className="first-part-book">
        <div className="cards-of-booking">
          {bookings.map((appointments, index) => {
            return (
              <div key={index} className="booked-cards">
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
                      <p>{appointments.slot[0]._id}</p>
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
