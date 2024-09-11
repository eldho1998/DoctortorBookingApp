import { useState, useEffect } from 'react';
import './hospital-details.css';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import HospitalNavBar from '../../components/Hospital-NavBar/hospital-nav';
import HospitalHome from './hospital-home';

const HospitalDetails = () => {
  const [hospitalDetails, setHospitalDetails] = useState({});
  const { id } = useParams();

  const fetchHospitalDetails = async id => {
    try {
      const response = await axios.get(`/hospital/${id}`);
      setHospitalDetails(response.data.response);
      console.log(response);
    } catch (e) {
      toast.error('error fetching hospital');
    }
  };

  useEffect(() => {
    fetchHospitalDetails(id);
  }, []);

  return (
    <div className="header-main">
      <div className="header-nav">
        <HospitalNavBar />
      </div>
      <div className="hospital-header">
        <h1>Welcome to {hospitalDetails.name}</h1>
        <ToastContainer />
      </div>
      <HospitalHome />
    </div>
  );
};
export default HospitalDetails;
