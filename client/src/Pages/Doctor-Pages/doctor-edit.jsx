import './doctor-edit.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Input, Button, Spin, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const EditDoctor = () => {
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(true); // Add loading state

  const [editDoctor, setEditDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    qualifiaction: '',
    position: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const onChange = (e, key) => {
    setEditDoctor({ ...editDoctor, [key]: e.target.value });
  };
  console.log(editDoctor);

  const getDoctorDetails = async () => {
    const doctorId = localStorage.getItem('ID');

    try {
      const response = await axios.get(`/doctor/${doctorId}`);
      console.log(response);
      setEditDoctor(response.data);
      // setLoading(false); // Data has been loaded
    } catch (e) {
      toast.error(`${e}`);
      // setLoading(false); // Stop loading even if there was an error
    }
  };

  const onSaveChanges = async () => {
    const doctorId = localStorage.getItem('ID');

    try {
      const response = await axios.post(`/doctor/${doctorId}`, editDoctor);
      localStorage.setItem('ID', response.data.id);
      navigate('/doctor/home');
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="loader-on-edit">
  //       <Flex align="center" gap="middle">
  //         <Spin size="large" />
  //       </Flex>
  //     </div>
  //   );
  // }

  if (!editDoctor.firstName) {
    return (
      <div className="loader-on-edit">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  }

  return (
    <div className="doctor-edit-main">
      <div className="back"></div>
      <ToastContainer />
      <form>
        <div className="doctor-edit-form">
          <div className="firstLast">
            <p>First name</p>
            <Input
              type="text"
              value={editDoctor.firstName}
              onChange={e => onChange(e, 'firstName')}
            />
            <p>Last name</p>
            <Input
              type="text"
              value={editDoctor.lastName}
              onChange={e => onChange(e, 'lastName')}
            />
          </div>

          <p>Email*</p>
          <Input
            type="email"
            value={editDoctor.email}
            onChange={e => onChange(e, 'email')}
          />
          <p>Qualification</p>
          <Input
            type="text"
            value={editDoctor.qualification}
            onChange={e => onChange(e, 'qualification')}
          />
          <p>Position</p>
          <Input
            type="text"
            value={editDoctor.position}
            onChange={e => onChange(e, 'position')}
          />
          <p>New Password*</p>
          <Input type="password" onChange={e => onChange(e, 'password')} />
          <p>Confirm new password*</p>
          <Input
            type="password"
            onChange={e => onChange(e, 'confirmPassword')}
          />
          <div className="save-changes">
            <Button onClick={onSaveChanges}>Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
