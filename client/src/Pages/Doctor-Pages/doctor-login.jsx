import './doctor-login.css';
import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import axios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };
  console.log(login);

  const OnLoginClick = async () => {
    try {
      const response = await axios.post('/doctor/login', login);
      console.log(response.data);
      console.log(response.data.id);

      localStorage.setItem('token', response.data.token); // store it in localStorage
      localStorage.setItem('ID', response.data.id); // store it in localStorage
      navigate('/doctor/home');
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  const BacktoMain = () => {
    navigate('/');
  };

  const onForgotClick = () => {
    setModalOpen(true);
  };

  const onOkPress = async () => {
    console.log('sending email:', email);
    try {
      const response = await axios.post(
        `/doctor/forgot`,
        { email },
        { timeout: 10000 }
      );
      console.log(response);
      toast.success('Mail Send to your email');
      setModalOpen(false);
    } catch (e) {
      console.error(e.response?.data?.message || e.message);
    }
  };

  const onCancelPress = () => {
    setModalOpen(false);
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
  };
  console.log(email);

  return (
    <div className="login">
      <h1>WELCOME DOCTOR</h1>
      <h3>YOU CAN NOW LOGIN</h3>
      <div onClick={BacktoMain} className="back-to-main-doctor">
        <p>Back to main</p>
      </div>

      <div className="doctor-login-main">
        <ToastContainer />
        <div className="email">
          <p>Email ID</p>
          <Input
            type="email"
            placeholder="example@gmail.com"
            onChange={e => onChange(e, 'email')}
          />
        </div>

        <div className="password">
          <p>Password</p>
          <Input type="password" onChange={e => onChange(e, 'password')} />
        </div>
        <Button type="primary" onClick={OnLoginClick}>
          Login
        </Button>

        <div className="forgot">
          <p onClick={onForgotClick} className="forgot-link">
            Forgot password?
          </p>
        </div>
        <div className="modaal">
          <Modal
            title="Forgot Password?"
            open={modalOpen}
            onOk={onOkPress}
            onCancel={onCancelPress}
          >
            <p>We'll send a link to your email !</p>
            <p>Enter your registered Email Address</p>
            <Input onChange={onEmailChange} type="text" />
          </Modal>
        </div>
        <div className="ff">
          <p className="or">
            OR <br></br>login with
          </p>
          <hr></hr>
          <div className="image"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
