import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function StudentApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await axios.get('https://edubursarymanagementsystem-backend.onrender.com/api/auth/applications/user');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications', error);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div>
      <h2>My Applications</h2>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            {application.name} - {application.school} - {application.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentApplications;