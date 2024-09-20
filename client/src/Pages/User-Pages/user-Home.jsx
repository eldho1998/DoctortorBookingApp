import './user-Home.css';
import UserNav from '../../components/User-Navbar/user-Nav';
import { Button, Input, Spin, Flex } from 'antd';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchHospital, setSearchHospital] = useState('');
  const navigate = useNavigate();

  const fetchHospital = async () => {
    try {
      const response = await axios.get('/hospital');
      setHospitals(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error :', e);
    }
  };

  const onCardClick = async id => {
    try {
      const response = await axios.get(`/hospital/${id}`);
      console.log('hospitals data:', response.data);
      console.log('hospital id:', id);
      localStorage.setItem('hospitalID', id);
      navigate(`/user/hospital/${id}`);
    } catch (e) {
      console.log('Hospital not found');
    }
  };

  const onButtonClick = hosId => {
    console.log('this is your hosid:', hosId);
    navigate(`/user/hospital/${hosId}/doctors`);
  };

  const onHospitalSearch = async e => {
    setSearchHospital(e.target.value);
    try {
      if (searchHospital.length == 0) {
        setHospitals(response.data);
      }
      const response = await axios.get(
        `/hospital?searchHospital=${searchHospital}`
      );
      setHospitals(response.data);
    } catch (e) {
      console.log('Invalid');
    }
  };
  console.log('Hospital name', searchHospital);

  const onSearchClick = async () => {
    try {
      if (searchHospital.length == 0) {
        setHospitals(response.data);
      }
      const response = await axios.get(
        `/hospital?searchHospital=${searchHospital}`
      );
      setHospitals(response.data);
      console.log('ith', response.data);
    } catch (e) {
      toast.error('Invalid Key');
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  if (hospitals == null) {
    return (
      <div>
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  return (
    <div className="userhome">
      <UserNav />
      <div className="head-user-bookings">
        <p> myHome</p>
      </div>

      <div className="search">
        <h4>Search your Hospitals</h4>
        <Input
          onChange={onHospitalSearch}
          placeholder="Search hospitals"
          type="search"
        />
        <Button onClick={onSearchClick}>Search</Button>
      </div>

      <div className="hospital-cards">
        {hospitals.map((hospital, index) => (
          <div
            key={index}
            onClick={() => onCardClick(hospital._id)}
            className="cards"
          >
            <div className="detailsofhospitals">
              <img src={hospital.image} />
              <h3>{hospital.name}</h3>
              <p>{hospital.address.city} </p>
            </div>
            <div className="contact-hos">
              <p>{hospital.phone}</p>
            </div>

            <div className="butt">
              <Button
                onClick={event => {
                  event.stopPropagation();
                  onButtonClick(hospital._id);
                }}
              >
                View Doctors
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
