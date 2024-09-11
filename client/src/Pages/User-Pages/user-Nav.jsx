import './user-Nav.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserNav = () => {
  const navigate = useNavigate();

  const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    navigate('/user/login');
  };

  return (
    <div className="main">
      <div className="user-home-main">
        {/* <div className="back"></div> */}

        <div className="nav-bars">
          <div className="icon"></div>
          <div className="user-bars">
            <Link className="link-home" to={'/user/home'}>
              HOME
            </Link>
            <Link className="link-profile" to={'/user/profile'}>
              PROFILE
            </Link>
            <Link className="link-bookings" to={'/user/bookings'}>
              myBOOKINGS
            </Link>
            <Link className="link-logout" onClick={logoutClick}>
              LOGOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;

//Passw0!d
