import './hospital-nav.css';
import { Link, useParams } from 'react-router-dom';

const HospitalNavBar = () => {
  const { id } = useParams();
  return (
    <div className="Hospital-nav-main">
      <div className="hospital-nav-icon"></div>
      <div className="hospital-nav-bars">
        <Link to={`/user/hospital/${id}`}>
          <p>Home</p>
        </Link>
        <Link to={`/user/hospital/${id}/department`}>
          <p>Departments</p>
          {console.log('nav bar hospital id:', id)}
        </Link>
        <Link to={`/user/hospital/${id}/doctors`}>
          <p>Doctors</p>
        </Link>
        <Link>
          <p>Health Advice</p>
        </Link>
        <Link>
          <p>About</p>
        </Link>
        <Link>
          <p>Contact</p>
        </Link>
        <Link to={'/user/home'}>
          <p>User Home</p>
        </Link>
      </div>
    </div>
  );
};

export default HospitalNavBar;
