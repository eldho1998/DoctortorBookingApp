import './doctor-home.css';
import NavBar from '../../components/NavBar/navbar';
import axios from '../../utils/axios';
import html2pdf from 'html2pdf.js';

const DoctorHome = () => {
  const DownloadDocDetails = async () => {
    const id = localStorage.getItem('ID');
    const response = await axios.get(`/doctor/pdf/${id}`);
    console.log(response.data);

    html2pdf().from(response.data).save();
  };

  return (
    <div className="doc-home">
      <NavBar />
      <button onClick={DownloadDocDetails}>Download Doctor Details</button>
    </div>
  );
};

export default DoctorHome;
