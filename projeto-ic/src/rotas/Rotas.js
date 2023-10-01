import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import RegistrationPersonalInformation from '../pages/registration/RegistrationPersonalInformation';
import RegistrationAccessInformation from '../pages/registration/RegistrationAccessInformation';
import RegistrationProfessionalProfile from '../pages/registration/RegistrationProfessionalProfile';
import EditingSystem from '../pages/suggest/EditingSystem';
import StudentRecommendationSystem from '../pages/suggest/StudentRecommendationSystem';
import TeacherRecommendationSystem from '../pages/suggest/TeacherRecommendationSystem';
import UserProfile from '../pages/profile/UserProfile';
import ReportView from '../pages/report/ReportView';
import Recommendation from '../pages/recommendations/Recommendation';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />

        <Route exact path='/registration-personal-information' element={<RegistrationPersonalInformation/>} />
        <Route exact path='/registration-access-information' element={<RegistrationAccessInformation />} />
        <Route exact path='/registration-professional-profile' element={<RegistrationProfessionalProfile />} />
        
        <Route path="/editing-system/:userId/:codigoTurma" element={<EditingSystem />} />
        <Route exact path='/student-recommendation' element={<StudentRecommendationSystem />} />
        <Route exact path='/teacher-recommendation' element={<TeacherRecommendationSystem />} />
        
        <Route path="/user-profile/:userId" element={<UserProfile />} />
       
        <Route path="/report-view/:userId" element={<ReportView />} />
        <Route path="/recommendation" element={<Recommendation />} />
  
      </Routes>
    </Router>
  )
}

export default Routas;