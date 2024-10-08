import { Button, Input, Select } from 'antd';
import './doctor-sign-up.css';
import { useState } from 'react';
import axios from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const { Option } = Select;

const DoctorSignUp = () => {
  const navigate = useNavigate();
  const [signup, setSignups] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    qualification: '',
    position: '',
    image: '',
    department: '',
    hospital: '',
  });

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const qualificationRef = useRef(null);
  const positionRef = useRef(null);
  const hospitalRef = useRef(null);
  const departmentRef = useRef(null);
  const imageRef = useRef(null);
  const signupRef = useRef(null);

  const onChange = (e, key) => {
    if (key == 'image') {
      setSignups({ ...signup, [key]: e.target.files[0] });
    } else {
      setSignups({ ...signup, [key]: e.target.value });
    }
  };
  console.log(signup);

  const onSignUpClick = async () => {
    const formData = new FormData();

    formData.append('firstName', signup.firstName);
    formData.append('lastName', signup.lastName);
    formData.append('email', signup.email);
    formData.append('phone', signup.phone);
    formData.append('image', signup.image);
    formData.append('qualification', signup.qualification);
    formData.append('position', signup.position);

    if (signup.hospital) {
      formData.append('hospital', signup.hospital);
    } else {
      toast.error('Please select a hospital');
      return;
    }

    if (signup.department) {
      formData.append('department', signup.department);
    } else {
      toast.error('Please select a department');
      return;
    }

    try {
      const response = await axios.post('/doctor/signup', formData, {
        timeout: 10000,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/doctor/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.error('Signup Error:', e);
      toast.error(e.response?.data?.message || 'Error occured during signup');
    }
  };

  const onLogin = () => {
    navigate('/doctor/login');
  };

  const handleKeyDown = (e, nextInputRef, isFinalField = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isFinalField) {
        onSignUpClick();
      } else {
        nextInputRef.current.focus();
      }
    }
  };

  return (
    <div className="doctor-main">
      <div className="Bblack"></div>

      <div className="doctor-sign-in-main">
        <div className="doctor-form">
          <form>
            <ToastContainer />
            <div className="doctor-first-section">
              <label>first name</label>
              <Input
                onKeyDown={e => handleKeyDown(e, lastNameRef)}
                onChange={e => onChange(e, 'firstName')}
                type="text"
              />

              <label>last name</label>
              <Input
                ref={lastNameRef}
                onKeyDown={e => handleKeyDown(e, emailRef)}
                onChange={e => onChange(e, 'lastName')}
                type="text"
              />

              <label>email</label>
              <Input
                ref={emailRef}
                onKeyDown={e => handleKeyDown(e, phoneRef)}
                onChange={e => onChange(e, 'email')}
                type="text"
                placeholder="example@gmail.com"
              />

              <label>phone</label>
              <Input
                ref={phoneRef}
                onKeyDown={e => handleKeyDown(e, qualificationRef)}
                type="text"
                placeholder="enter your 10 digit mobile number"
                onChange={e => onChange(e, 'phone')}
              />
            </div>
            <div className="doctor-second-section">
              <label>qualification</label>
              <Input
                ref={qualificationRef}
                onKeyDown={e => handleKeyDown(e, positionRef)}
                onChange={e => onChange(e, 'qualification')}
                type="text"
              />

              <label>position</label>
              <Input
                ref={positionRef}
                onKeyDown={e => handleKeyDown(e, hospitalRef)}
                onChange={e => onChange(e, 'position')}
                type="text"
              />

              <label for="hospital">hospital</label>
              <Select
                ref={hospitalRef}
                onKeyDown={e => handleKeyDown(e, departmentRef)}
                onChange={selectedHospitalId => {
                  console.log('Selected hospital ID:', selectedHospitalId);
                  onChange(
                    { target: { value: selectedHospitalId } },
                    'hospital'
                  );
                }}
                type="text"
                placeholder="--Select Doctor Hospital--"
                name="hospital"
                id="hospital"
              >
                <Option value="66d3529fc605473780f29cc3">
                  Aster Medicity Hospital
                </Option>
                <Option value="66d73c9a9b6e515c86b3ba8c">
                  Apollo Adlux Hospital
                </Option>
                <Option value="66d73e939b6e515c86b3baa1">
                  Rajagiri Hospital
                </Option>
                <Option value="">MOSC Medical Mission Hospital</Option>
                <Option value="66d1e7ec7935ff19592faaff">
                  Amrita Hospital
                </Option>
              </Select>

              <label for="department">department</label>
              <Select
                ref={departmentRef}
                onKeyDown={e => handleKeyDown(e, imageRef)}
                onChange={selectedDepartmentId => {
                  console.log('Selected department Id:', selectedDepartmentId);
                  onChange(
                    { target: { value: selectedDepartmentId } },
                    'department'
                  );
                }}
                type="text"
                placeholder="--Select Doctor Department--"
                name="department"
                id="department"
              >
                <Option value="66c85a733c63c37bf0a18a81"> Nuerology </Option>
                <Option value="66c85adf3c63c37bf0a18a85"> ENT </Option>
                <Option value="66c85acc3c63c37bf0a18a83"> Gynaecology</Option>
                <Option value="66c85badb117138dadc4e9b0">Orthopedics</Option>

                <Option value="66d2a33ef289d254a77e69ed"> Anasthesia </Option>
              </Select>

              <div className="doctor-image">
                <label>image</label>
                <input
                  ref={imageRef}
                  onKeyDown={e => handleKeyDown(e, signupRef)}
                  onChange={e => onChange(e, 'image')}
                  className="doctor-input"
                  type="file"
                  placeholder="upload"
                />
              </div>

              <div className="doctor-Sign-in">
                <Button ref={signupRef} onClick={onSignUpClick} type="primary">
                  <p>Sign Up</p>
                </Button>
              </div>
            </div>
          </form>
          <div className="doctor-already">
            <h3>Already have an account?</h3>
            <p onClick={onLogin}>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
