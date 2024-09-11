import './App.css';
import { Route, Routes } from 'react-router-dom';
import FirstPage from './Pages/firstPage/first';
import DoctorSignUp from './Pages/Doctor-Pages/doctor-sign-up';
import DoctorLogin from './Pages/Doctor-Pages/doctor-login';
import DoctorHome from './Pages/Doctor-Pages/doctor-home';
import DoctorBookings from './Pages/Doctor-Pages/doctor-bookings';
import AddSlot from './Pages/Doctor-Pages/slot/addSlot';
import DoctorMySlots from './Pages/Doctor-Pages/slot/doctor-my-slots';
import EditDoctor from './Pages/Doctor-Pages/doctor-edit';
import PrivateRoute from './components/PrivateRoute';
import UserSignUp from './Pages/User-Pages/user-sign-up';
import UserLogin from './Pages/User-Pages/user-login';
import UserHome from './Pages/User-Pages/user-Home';
import UserProfile from './Pages/User-Pages/user-profile';
import UserBookings from './Pages/User-Pages/user-bookings';
import HospitalDetails from './Pages/Hospital-pages/hospital-details';
import HospitalHome from './Pages/Hospital-pages/hospital-home';
import HospitalDepartment from './Pages/Hospital-pages/hospital-department';
import HospitalDoctors from './Pages/Hospital-pages/hospital-doctors';
import HospitalDepartmentDetails from './Pages/Hospital-pages/hos-dpt-details';
import DoctorAppointmentBooking from './Pages/Doctor-Appointment-Pages/doc-appointment-book';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/doctor/signup" element={<DoctorSignUp />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />

        <Route element={<PrivateRoute role="doctor" />}>
          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/doctor/bookings" element={<DoctorBookings />} />
          <Route path="/doctor/addslot" element={<AddSlot />} />
          <Route path="/doctor/myslots" element={<DoctorMySlots />} />
          <Route path="/doctor/edit" element={<EditDoctor />} />
        </Route>

        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route element={<PrivateRoute role="USER" />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/bookings" element={<UserBookings />} />
          <Route path="/user/hospital/:id" element={<HospitalDetails />} />
          <Route path="/user/hospital/details" element={<HospitalHome />} />
          <Route
            path="/user/hospital/:id/department"
            element={<HospitalDepartment />}
          />
        </Route>
        <Route
          path="/user/hospital/:id/doctors"
          element={<HospitalDoctors />}
        />
        <Route
          path="/user/hospital/:id/department/:depId"
          element={<HospitalDepartmentDetails />}
        />
        <Route
          path="/department/:id/doctor/:id"
          element={<DoctorAppointmentBooking />}
        />
      </Routes>
    </div>
  );
};

export default App;
