import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import RegistrationPersonalInformation from '../pages/registration/RegistrationPersonalInformation';
import RegistrationAccessInformation from '../pages/registration/RegistrationAccessInformation';
import RegistrationProfessionalProfile from '../pages/registration/RegistrationProfessionalProfile';
import EditingSystem from '../pages/suggestEdit/EditingSystem';
import StudentRecommendationSystem from '../pages/suggestEdit/StudentRecommendationSystem';
import TeacherRecommendationSystem from '../pages/suggestEdit/TeacherRecommendationSystem';
import UserProfile from '../pages/profile/UserProfile';
import ReportView from '../pages/report/ReportView';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />

        <Route exact path='/registration-personal-information' element={<RegistrationPersonalInformation/>} />
        <Route exact path='/registration-access-information' element={<RegistrationAccessInformation />} />
        <Route exact path='/registration-professional-profile' element={<RegistrationProfessionalProfile />} />
        
        <Route path="/editing-system/:userId/:codigoTurma" element={<EditingSystem />} />
        <Route exact path='/student-recommendation' element={<StudentRecommendationSystem />} />
        <Route exact path='/teacher-recommendation' element={<TeacherRecommendationSystem />} />
        
        <Route path="/user-profile/:userId" element={<UserProfile />} />
       
        <Route path="/report-view/:userId" element={<ReportView />} />
      </Routes>
    </Router>
  )
}

export default Routas;