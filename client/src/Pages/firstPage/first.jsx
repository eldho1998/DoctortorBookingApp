import './first.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();

  const onDoctorClick = () => {
    navigate('/doctor/signup');
  };

  const onPatientClick = () => {
    navigate('/user/signup');
  };

  return (
    <div className="first-page-main">
      <video autoPlay playsInline muted loop className="background-video">
        <source src="../../../public/earth.mp4" type="video/mp4" />
      </video>
      <h5>A Doctor-Patient Platform</h5>
      <p>ARE YOU A..?</p>
      <div className="firstpage-buttons">
        <Button onClick={onDoctorClick}>DOCTOR</Button>
        <Button onClick={onPatientClick}>PATIENT</Button>
      </div>
    </div>
  );
};

export default FirstPage;
