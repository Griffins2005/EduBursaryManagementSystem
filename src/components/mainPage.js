import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ApplicationList from './ApplicationList';
import ApplicationForm from './ApplicationForm';

const MainPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [applications, setApplications] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://EduBursaryManagementSystem-backend.onrender.com/api/applications/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const addApplication = (application) => {
    setApplications((prevApplications) => [...prevApplications, application]);
  };

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // Clear success message after 5 seconds
  };

  return (
    <div className="main-page">
      <div className="sidebar">
        <button onClick={() => toggleSection('mission')}>MISSION</button>
        {expandedSection === 'mission' && (
          <p>Our mission is to empower individuals through education and create opportunities for personal and professional growth.</p>
        )}

        <button onClick={() => toggleSection('objectives')}>OBJECTIVES</button>
        {expandedSection === 'objectives' && (
          <p>Our objectives include fostering inclusive learning environments, providing accessible educational resources, and promoting lifelong learning.</p>
        )}

        <button onClick={() => toggleSection('vision')}>VISION</button>
        {expandedSection === 'vision' && (
          <p>Our vision is to cultivate a world where every individual has access to quality education, enabling them to reach their full potential and positively impact their communities.</p>
        )}
        <h2>PROFILE</h2>
        <Link to="/UserProfile">
        <p>View Profile</p> 
        </Link>
      </div>

      <div className="main-content">
        <h1>Welcome to Our Education Platform</h1>
        <p>Need financial assistance for a bright future? Apply now!</p>

        <h2>Previous Applications</h2>
        <ApplicationList applications={applications} />

        <h2>Submit a New Application</h2>
        <ApplicationForm addApplication={addApplication} handleSuccessMessage={handleSuccessMessage} />
      </div>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default MainPage;
