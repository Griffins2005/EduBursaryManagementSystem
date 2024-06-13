import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationList from './ApplicationList';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('https://edubursarymanagementsystem-backend.onrender.com/api/auth/applications/admin');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  return (
    <div>
      <h2>All Applications</h2>
      <ApplicationList applications={applications} />
    </div>
  );
};

export default AdminApplications;
