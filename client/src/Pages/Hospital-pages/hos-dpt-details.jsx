import './hos-dpt-details.css';
import HospitalNavBar from '../../components/Hospital-NavBar/hospital-nav';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HospitalDepartmentDetails = () => {
  const { depId } = useParams();
  const navigate = useNavigate();

  const [dptDetails, setDptDetails] = useState([]);
  const [dpt2, setDpt2] = useState('');
  console.log(dptDetails);

  const fetchDptDetails = async () => {
    try {
      const response = await axios.get(`/department/${depId}/doctors`);
      setDptDetails(response.data);
      console.log(response.data);
    } catch (e) {
      toast.error('error fetching your department doctors');
    }
  };

  const fetchDpt = async () => {
    try {
      const response2 = await axios.get(`/department/${depId}`);
      setDpt2(response2.data.departments.name);
      console.log(response2.data);
    } catch (e) {
      toast.error('error fetching your departments');
    }
  };

  const onBookClick = doctorId => {
    navigate(`/department/${depId}/doctor/${doctorId}`);
    console.log('doctor id:', doctorId);
  };

  useEffect(() => {
    fetchDptDetails();
    fetchDpt();
  }, []);

  return (
    <div className="hos-dpt-detials-main">
      <ToastContainer />
      <HospitalNavBar />
      <div className="hospital-header">
        <h1>Welcome to {dpt2}</h1>
      </div>
      <div className="divv">
        <h1>Book Your Appointments!</h1>
        <div className="docc">
          {dptDetails.map(doctor => {
            return (
              <div key={doctor._id} className="doc-cards">
                <div className="boxxx">
                  <div className="image-names">
                    {doctor.image && <img src={doctor.image} />}
                    <h2>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h2>
                  </div>

                  <div className="education">
                    <h3>{doctor.position}</h3>
                    <p>{doctor.qualification}</p>
                    <div className="butt">
                      <button onClick={() => onBookClick(doctor._id)}>
                        BOOK APPOINTMENT
                      </button>
                    </div>
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

export default HospitalDepartmentDetails;
