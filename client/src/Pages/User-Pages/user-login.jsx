import { Button, Input } from 'antd';
import './user-login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import React, { useRef } from 'react';

const UserLogin = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const passwordRef = useRef(null);
  const loginRef = useRef(null);

  const onChange = (e, key) => {
    setUserLogin({ ...userLogin, [key]: e.target.value });
  };
  console.log(userLogin);

  const OnUserLoginClick = async () => {
    try {
      const response = await axios.post('/user/login', userLogin);
      console.log(response);
      console.log(response.data.id);
      console.log(response.data.token);

      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('token', response.data.token);

      navigate('/user/home');
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  const backToMain = () => {
    navigate('/');
  };

  const handleEmailKeyPress = e => {
    if (e.key === 'Enter') {
      passwordRef.current.focus();
    }
  };

  const handlePasswordPress = e => {
    if (e.key === 'Enter') {
      loginRef.current.focus();
    }
  };

  return (
    <div className="user-login-main">
      <ToastContainer theme="light" transition={Bounce} />
      <div className="img"></div>
      <h1>You can now Login</h1>
      <h2>
        #Find Your Health <br /> <h3>Solutions Online!</h3>
      </h2>
      <div onClick={backToMain} className="backto-main">
        <p>Back to main</p>
      </div>
      <div className="social">
        <p>Follow us on</p>
      </div>
      <div className="user-login-form">
        <form>
          <div className="email">
            <label>Email</label>
            <Input
              onKeyDown={handleEmailKeyPress}
              onChange={e => onChange(e, 'email')}
              type="email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="password">
            <label>Password</label>
            <Input
              ref={passwordRef}
              onKeyDown={handlePasswordPress}
              onChange={e => onChange(e, 'password')}
              type="password"
              placeholder="enter your password"
            />
          </div>

          <div className="bt">
            <Button ref={loginRef} onClick={OnUserLoginClick} type="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserLogin;
