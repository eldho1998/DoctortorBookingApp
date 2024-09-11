import './doctor-login.css';
import { Button, Input } from 'antd';
import { useState } from 'react';
import axios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };
  console.log(login);

  const OnLoginClick = async () => {
    try {
      const response = await axios.post('/doctor/login', login);
      console.log(response.data); //contain id and token
      console.log(response.data.id); //contains id

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
          <a href="">
            <p className="forgot-link">Forgot password?</p>
          </a>
        </div>

        <p className="or">
          OR <br></br>login with
        </p>
        <hr></hr>
        <div className="image"></div>
      </div>
    </div>
  );
};

export default DoctorLogin;
