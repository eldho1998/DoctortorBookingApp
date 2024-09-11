import { checkToken, getRole } from '../../utils/localfunctions';
import { Outlet, Navigate } from 'react-router-dom';

//ROLE BASED AND TOKEN CHECK AUTHENTICATION
const PrivateRoute = props => {
  console.log('Working');
  return checkToken() && props.role == getRole() ? (
    <Outlet />
  ) : (
    <Navigate to={`/${props.role}/login/`} />
  );
};

export default PrivateRoute;
