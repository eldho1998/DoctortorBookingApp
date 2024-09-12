import './hospital-nav.css';
import { Link, useParams } from 'react-router-dom';

const HospitalNavBar = () => {
  const { id } = useParams();
  return (
    <div className="Hospital-nav-main">
      <div className="hospital-nav-icon"></div>
      <div className="hospital-nav-bars">
        <Link className="hom" to={`/user/hospital/${id}`}>
          Home
        </Link>
        <Link className="depart" to={`/user/hospital/${id}/department`}>
          Departments
          {console.log('nav bar hospital id:', id)}
        </Link>
        <Link className="dott" to={`/user/hospital/${id}/doctors`}>
          Doctors
        </Link>
        <Link className="healt">Health Advice</Link>
        <Link className="abo">About</Link>
        <Link className="cont">Contact</Link>
        <Link className="use" to={'/user/home'}>
          User Home
        </Link>
      </div>
    </div>
  );
};

export default HospitalNavBar;
//mvn clean install
// java -jar "-Dspring.profiles.active=win"  target/alumnox-svc-api-0.0.1-SNAPSHOT.jar
