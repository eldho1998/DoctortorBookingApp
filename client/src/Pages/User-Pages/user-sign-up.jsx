import './user-sign-up.css';
import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  return (
    <div className="main-sign">
      <h3>Please Sign In</h3>
      <div className="user-signup-main">
        <div className="user-form">
          <div className="flname">
            <form>
              <label>First Name</label>
              <Input onChange={e => onChange(e, 'firstName')} type="text" />
              <label>Last Name</label>
              <Input onChange={e => onChange(e, 'lastName')} type="text" />
            </form>
          </div>

          <div className="email">
            <form>
              <label>Email</label>
              <Input
                onChange={e => onChange(e, 'email')}
                type="email"
                placeholder="example@gmail.com"
              />
            </form>
          </div>

          <div className="password">
            <form>
              <label>Password</label>
              <Input onChange={e => onChange(e, 'password')} type="password" />
            </form>
          </div>

          <div className="confirm-password">
            <form>
              <label>Confirm Password</label>
              <Input
                onChange={e => onChange(e, 'confirmPassword')}
                type="password"
              />
            </form>
          </div>

          <div className="signup-button">
            <Button onClick={onUserSignUpClick} type="primary">
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
