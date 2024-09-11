import './hospital-doctors.css';
import HospitalNavBar from '../../components/Hospital-NavBar/hospital-nav';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const HospitalDoctors = () => {
  const { id } = useParams();

  const [doc, setDoc] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`/hospital/${id}/doctors`);
      setDoc(response.data);
      toast('Here are the doctors');
      console.log(response.data);
    } catch (e) {
      toast.error('error fetching doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [id]);

  return (
    <div className="department-names">
      <ToastContainer />
      <HospitalNavBar />
      <h1>Our Doctors</h1>
      <div className="doctor-cards">
        {doc.map(doctor => {
          return (
            <div key={doctor._id} className="doc-cards">
              <div className="boxxx">
                <div className="image-names">
                  {doctor.image && <img src={doctor.image} />}
                  <h2>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h2>
                </div>

                <div className="education">
                  <p>{doctor.position}</p>
                  <p>{doctor.qualification}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HospitalDoctors;
