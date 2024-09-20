import './doctor-home.css';
import NavBar from '../../components/NavBar/navbar';
import axios from '../../utils/axios';
import html2pdf from 'html2pdf.js';
import { useState, useEffect } from 'react';
import { Button, Input } from 'antd';

const DoctorHome = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchHospital, setSearchHospital] = useState('');

  // const DownloadDocDetails = async () => {
  //   const id = localStorage.getItem('ID');
  //   const response = await axios.get(`/doctor/pdf/${id}`);
  //   console.log(response.data);
  //   html2pdf().from(response.data).save();
  // };
  const fetchHospital = async () => {
    try {
      const response = await axios.get('/hospital');
      setHospitals(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('Error :', e);
    }
  };

  console.log('Hos:', hospitals);

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
    <div className="doc-home">
      <NavBar />

      <div className="searchh">
        <h4>Search Hospitals</h4>
        <Input
          onChange={onHospitalSearch}
          placeholder="Search hospitals"
          type="search"
        />
        <Button onClick={onSearchClick}>Search</Button>
      </div>
      <div className="hospital-cardss">
        {hospitals.map((hospital, index) => (
          <div key={index} className="cards">
            <div className="detailsofhospitals">
              <img src={hospital.image} />
              <h3>{hospital.name}</h3>
              <p>{hospital.address.city} </p>
            </div>
            <div className="contact-hos">
              <p>{hospital.phone}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <button onClick={DownloadDocDetails}>Download Doctor Details</button> */}
    </div>
  );
};

export default DoctorHome;
