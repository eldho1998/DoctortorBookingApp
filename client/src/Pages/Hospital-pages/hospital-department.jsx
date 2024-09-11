import './hospital-department.css';
import HospitalNavBar from '../../components/Hospital-NavBar/hospital-nav';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const HospitalDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('hospital id:', id);

  const [dpt, setDpt] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`/hospital/${id}/departments`);
      setDpt(response.data);
      console.log('Departments fetched:', response.data);
      console.log(response);
    } catch (e) {
      console.error('Error fetching departments:', e.message);
      toast.error('error fetching your departments');
    }
  };

  const onDepartmentClick = departmentId => {
    console.log('Clicked department id:', departmentId);
    navigate(`/user/hospital/${id}/department/${departmentId}`);
  };

  useEffect(() => {
    fetchDepartments();
  }, [id]);

  return (
    <div className="department-names">
      <ToastContainer />
      <HospitalNavBar />
      <h1>Our Departments</h1>
      <div className="department-cards">
        {dpt.map(department => {
          return (
            <div
              onClick={() => onDepartmentClick(department._id)}
              key={department._id}
              className="dpt-cards"
            >
              <h2>{department.name}</h2>
              <div className="boxx">
                {department.image && (
                  <img src={department.image} alt={department.name} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HospitalDepartment;
