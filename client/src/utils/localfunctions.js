import { jwtDecode } from 'jwt-decode';

// to check the token expiry
export const checkToken = role => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    // console.log(decoded);
    const timeInS = Date.now() / 1000;
    return decoded && decoded.exp > timeInS;
  } catch (e) {
    return false;
  }
};

//FOR ROLE BASED AUTHENTICATION-->

export const getRole = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (e) {
    return null;
  }
};
