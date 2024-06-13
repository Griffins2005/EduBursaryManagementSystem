import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import LogIn from './components/LogIn';
import CreateProfile from './components/CreateProfile';
import MainPage from './components/mainPage';
import AdminApplications from './components/AdminApplications';
import StudentApplications from './components/StudentApplications';
import ApplicationForm from './components/ApplicationForm';
import UserProfile from './components/UserProfile';
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const handleLogIn = async (data) => {
    try {
      const response = await axios.get('https://edubursarymanagementsystem-backend.onrender.com/api/profile/me', {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      if (response.data) {
        navigate('/mainpage');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/profile');
    }
  };

  return (
    <div className="App">
      <header>Edu Bursary Application System</header>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn onLogIn={handleLogIn} />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/profile" element={<CreateProfile />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/admin" element={<AdminApplications />} />
        <Route path="/student" element={<StudentApplications />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
      </Routes>
    </div>
  );
}

export default App;
