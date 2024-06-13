import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../assets/images.jpg'; // Import your image file

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://edubursarymanagementsystem-backend.onrender.com/api/profile/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-heading">My Profile</h2>
      <div className="profile-info">
        <div className="profile-fields">
          <div className="profile-field">
            <label>Full Name:</label>
            <p>{profileData.fullName}</p>
          </div>
          <div className="profile-field">
            <label>Date of Birth:</label>
            <p>{profileData.dob}</p>
          </div>
          <div className="profile-field">
            <label>Gender:</label>
            <p>{profileData.gender}</p>
          </div>
          <div className="profile-field">
            <label>Phone:</label>
            <p>{profileData.phone}</p>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="profile-field">
            <label>Address:</label>
            <p>{profileData.address}</p>
          </div>
          <div className="profile-field">
            <label>City:</label>
            <p>{profileData.city}</p>
          </div>
          <div className="profile-field">
            <label>County:</label>
            <p>{profileData.county}</p>
          </div>
          <div className="profile-field">
            <label>County Code:</label>
            <p>{profileData.countyCode}</p>
          </div>
          <div className="profile-field">
            <label>Postal Code:</label>
            <p>{profileData.postalCode}</p>
          </div>
          <div className="profile-field">
            <label>Institution Name:</label>
            <p>{profileData.institutionName}</p>
          </div>
          <div className="profile-field">
            <label>Course:</label>
            <p>{profileData.course}</p>
          </div>
          <div className="profile-field">
            <label>Year of Study:</label>
            <p>{profileData.yearOfStudy}</p>
          </div>
          <div className="profile-field">
            <label>Student ID:</label>
            <p>{profileData.studentId}</p>
          </div>
          <div className="profile-field">
            <label>Household Income:</label>
            <p>{profileData.householdIncome}</p>
          </div>
          <div className="profile-field">
            <label>Number of Dependents:</label>
            <p>{profileData.numberOfDependents}</p>
          </div>
          <div className="profile-field">
            <label>Employment Status:</label>
            <p>{profileData.employmentStatus}</p>
          </div>
          <div className="profile-field">
            <label>Financial Aid:</label>
            <p>{profileData.financialAid}</p>
          </div>
          <div className="profile-field">
            <label>Personal Statement:</label>
            <p>{profileData.personalStatement}</p>
          </div>
        </div>
        <div className="profile-image-container">
          <img src={img} alt="Profile" className="profile-image" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
