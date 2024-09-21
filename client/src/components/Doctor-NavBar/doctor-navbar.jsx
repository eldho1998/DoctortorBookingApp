import './doctor-navbar.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button, Spin, Flex } from 'antd';

const NavBar = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});

  const getDoctorDetails = async () => {
    const doctorId = localStorage.getItem('ID');
    const token = localStorage.getItem('token');

    const response = await axios.get(`/doctor/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    setDoctor(response.data);
  };
  console.log(doctor);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    navigate('/doctor/login');
  };

  const DoctorEditPage = () => {
    localStorage.getItem('ID');
    navigate('/doctor/edit');
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  if (doctor == null) {
    return (
      <div className="loader">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  return (
    <div className="navbar-main">
      <div className="yes">
        <div className="bars">
          <NavLink className="link" to="/doctor/home">
            <h2>HOME</h2>
          </NavLink>

          <NavLink className="link" to="/doctor/bookings">
            <h2>APPOINTMENTS</h2>
          </NavLink>

          <NavLink className="link" to="/doctor/addslot">
            <h2>ADD SLOTS</h2>
          </NavLink>
          <NavLink className="link" to="/doctor/myslots">
            <h2>MY SLOTS</h2>
          </NavLink>
          <h2 onClick={logOut}>LOGOUT</h2>
        </div>
        <div className="contents">
          <img src={doctor.image} />

          <div className="details">
            <h3>Dr. {`${doctor.firstName} ${doctor.lastName}`}</h3>
            <p>{doctor.email}</p>
            <p>{doctor.qualification}</p>
            <p>{doctor.position}</p>
            <p>{doctor.phone}</p>
          </div>
        </div>
      </div>

      <div className="edit-details">
        <button onClick={DoctorEditPage}>EDIT</button>
      </div>
    </div>
  );
};

export default NavBar;
