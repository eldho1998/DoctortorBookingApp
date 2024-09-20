import './doc-appointment-book.css';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';

const DoctorAppointmentBooking = () => {
  const { id } = useParams();
  console.log('p', id);
  const [doctorById, setDoctorById] = useState({});
  const [availSlots, setAvailSlots] = useState([]);
  const [display, setDisplay] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchSlot, setSelectedSlotDates] = useState('');
  const [message, setMessage] = useState('');

  const fetchDoctorById = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Token not found in localStorage');
      }

      console.log(token);
      const response = await axios.get(`/doctor/doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDoctorById(response.data);
    } catch (error) {
      toast.error('There is an error while getting your Doctor');
      console.log(error);
    }
  };

  const fetchAvailableSlotsByDoctorId = async () => {
    try {
      const response = await axios.get(`/slots/${id}`);
      console.log(response.data);
      setAvailSlots(response.data.response);
      toast.success(`Dr. ${doctorById.firstName}'s Slots`);
      console.log('hum:', doctorById.firstName);
    } catch (e) {
      toast.error(`Error fetching Dr. ${doctorById.firstName}'s Slots`);
    }
  };

  const openModal = _id => {
    setSelectedSlotId(_id);
    setModalOpen(true);
    console.log('Clicked Slot id:', _id);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const userID = localStorage.getItem('ID');
  console.log('userrr:', userID);

  const onOkBooking = async () => {
    try {
      const SlotBookingData = {
        slotId: selectedSlotId,
      };

      if (!userID) {
        toast.error('User ID not found');
        return;
      }

      if (!selectedSlotId) {
        toast.error('Slot ID not selected');
        return;
      }

      const response = await axios.post(
        `/slots/bookslot/${userID}`,
        SlotBookingData
      );
      console.log(response.data);
      toast.success('Successfully Booked Appointment');
      setModalOpen(false);
      smoothScroll(0);
    } catch (e) {
      console.log('Booking error:', e);
      toast.error('Sorry Error Booking!');
    }
  };
  console.log(window.scrollY);
  const handleClickScroll = () => {
    smoothScroll(490);
    setDisplay(!display);
    setIsDisabled(true);
  };

  const smoothScroll = targetY => {
    let startY = window.scrollY;
    let distance = targetY - startY;
    let duration = 500;
    let startTime = null;

    const animation = currentTime => {
      if (!startTime) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startY, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const onSlotSearch = e => {
    setSelectedSlotDates(e.target.value);
  };

  const onHandleClick = async () => {
    if (!searchSlot) {
      setMessage('Please select a date first');
      toast.error('Please select a date first!');
      return;
    }
    try {
      const doctorID = id;
      const response = await axios.get(
        `/slots?doctorID=${doctorID}&date=${searchSlot}`
      );

      if (response.data.slot.length > 0) {
        setAvailSlots(response.data.slot);
        setMessage('');
        toast.success('Yes..! Available!');
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setAvailSlots([]);
        setMessage("Sorry! There's no Slots for this day");
        toast.info('Reload & Review Slots');
      }
      console.log('error', e);
    }
  };

  useEffect(() => {
    fetchDoctorById();
    fetchAvailableSlotsByDoctorId();
  }, []);

  return (
    <div className="doc-appointment-book">
      <ToastContainer />

      <div className="first-header">
        <div className="log"></div>
        <h1>BOOK APPOINTMENT WITH</h1>

        <h2>
          Dr.
          {`${doctorById.firstName} ${doctorById.lastName}`}
        </h2>
      </div>
      <div className="backk">
        <Link to={'/user/home'} className="link-no-underline">
          Back
        </Link>
        <div className="contact">
          <p>email: {`${doctorById.email}`}</p>
          <p>phone: {`${doctorById.phone}`}</p>
        </div>
      </div>
      <div className="second-part">
        <div className="details-of-doctor">
          <img src={doctorById.image} />
          <div className="name-pos">
            <div className="about">
              <h4>
                Dr.
                {`${doctorById.firstName} ${doctorById.lastName}`}
                <h4>{doctorById.position}</h4>
              </h4>
              <p>{doctorById.about}</p>
              <div className="book-button">
                <button onClick={handleClickScroll} disabled={isDisabled}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book-card">
        <div
          style={{ display: display ? 'block' : 'none' }}
          className="booking-card"
        >
          <div className="firsst">
            <div className="h1">
              <h1>AVAILABLE DATES AND SLOTS</h1>
              <p>only limited slots!</p>
            </div>

            <div className="search-regex">
              <p>Search your Slots by Date</p>
              <Input onChange={onSlotSearch} type="date" />
              <div className="bu">
                <button onClick={onHandleClick}>Search</button>
              </div>
            </div>
          </div>

          <div className="slotss">
            <div className="mess">{message && <p>{message}</p>}</div>
            {availSlots.map((item, index) => {
              return (
                <div key={index} className="slot-card">
                  <div className="dateee">
                    <h4>DATE: {item.date}</h4>
                    <p>
                      TIME: {item.from} to {item.to}
                    </p>
                  </div>
                  <div className="availslotss">
                    <h5>AVAILABLE SL0TS: {item.availableSlots}</h5>
                    <p>{item._id}</p>
                  </div>
                  <div className="bookbutton">
                    <Button onClick={() => openModal(item._id)}>
                      B00K N0W
                    </Button>
                    <Modal
                      title="Confirm Booking!"
                      visible={modalOpen}
                      onOk={onOkBooking}
                      onCancel={closeModal}
                    >
                      <p>Are you sure you want to book this appointment?</p>

                      <Input type="text" value={selectedSlotId} />
                    </Modal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorAppointmentBooking;
