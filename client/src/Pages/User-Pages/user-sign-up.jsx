import './user-sign-up.css';
import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const signupRef = useRef(null);

  const onChange = (e, key) => {
    setUserSignUp({ ...userSignUp, [key]: e.target.value });
  };
  console.log(userSignUp);

  const onUserSignUpClick = async () => {
    try {
      const response = await axios.post('/user/signup', userSignUp);
      console.log(response);
      localStorage.setItem('ID', response.data.id);
      navigate('/user/login');
      toast('signed in successfully');
    } catch (e) {
      toast.error('Sign Up Failed');
    }
  };

  const onLoginClick = () => {
    navigate('/user/login');
  };

  const handleKeyDown = (e, nextInputRef, isFinalField = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isFinalField) {
        onUserSignUpClick();
      } else {
        nextInputRef.current.focus();
      }
    }
  };

  return (
    <div className="main-sign">
      <h3>Please Sign In</h3>
      <div className="user-signup-main">
        <div className="user-form">
          <div className="flname">
            <form>
              <label>First Name</label>
              <Input
                onKeyDown={e => handleKeyDown(e, lastNameRef)}
                onChange={e => onChange(e, 'firstName')}
                type="text"
              />
              <label>Last Name</label>
              <Input
                ref={lastNameRef}
                onKeyDown={e => handleKeyDown(e, emailRef)}
                onChange={e => onChange(e, 'lastName')}
                type="text"
              />
            </form>
          </div>

          <div className="email">
            <form>
              <label>Email</label>
              <Input
                ref={emailRef}
                onKeyDown={e => handleKeyDown(e, passwordRef)}
                onChange={e => onChange(e, 'email')}
                placeholder="example@gmail.com"
              />
            </form>
          </div>

          <div className="password">
            <form>
              <label>Password</label>
              <Input
                ref={passwordRef}
                onKeyDown={e => handleKeyDown(e, confirmPasswordRef)}
                onChange={e => onChange(e, 'password')}
                type="password"
              />
            </form>
          </div>

          <div className="confirm-password">
            <form>
              <label>Confirm Password</label>
              <Input
                ref={confirmPasswordRef}
                onKeyDown={e => handleKeyDown(e, null, true)}
                onChange={e => onChange(e, 'confirmPassword')}
                type="password"
              />
            </form>
          </div>

          <div className="signup-button">
            <Button ref={signupRef} onClick={onUserSignUpClick} type="primary">
              SignUp
            </Button>
          </div>
          <ToastContainer />
        </div>
        <div className="already">
          <h5>Already have an account?</h5>
          <p onClick={onLoginClick}>Login</p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
