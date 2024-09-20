import './hospital-home.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const HospitalHome = () => {
  const { id } = useParams();
  console.log('hos id', id);
  const [hospital, setHospital] = useState({});

  const fetchHos = async id => {
    try {
      const response = await axios.get(`/hospital/${id}`);
      setHospital(response.data.response);
      console.log(response.data.response);
    } catch (e) {
      console.log(e);
    }
  };
  const city = hospital.address?.city;

  useEffect(() => {
    fetchHos(id);
  }, [id]);

  return (
    <div className="hooo">
      <div className="imagee">
        <img src={hospital.image} />
      </div>
      <div className="foot">
        <h1>
          We'll treated You & <br />
          Take Care your Health
        </h1>
        <p>Place: {city}</p>
      </div>
    </div>
  );
};

export default HospitalHome;
