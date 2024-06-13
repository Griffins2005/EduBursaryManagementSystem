import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    county: '',
    countyCode: '',
    postalCode: '',
    institutionName: '',
    course: '',
    yearOfStudy: '',
    studentId: '',
    householdIncome: '',
    numberOfDependents: '',
    employmentStatus: '',
    financialAid: '',
    personalStatement: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/profile/create', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profile created:', response.data);
      setSuccessMessage('Profile created successfully!');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/mainpage');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error creating profile:', error);
      setErrorMessage('Error creating profile. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-profile">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="date" name="dob" value={profileData.dob} onChange={handleChange} required />
        <select name="gender" value={profileData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email Address" required />
        <input type="text" name="address" value={profileData.address} onChange={handleChange} placeholder="Street Address" required />
        <input type="text" name="city" value={profileData.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="county" value={profileData.county} onChange={handleChange} placeholder="County" required />
        <input type="text" name="countyCode" value={profileData.countyCode} onChange={handleChange} placeholder="County Code" required />
        <input type="text" name="postalCode" value={profileData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
        <input type="text" name="institutionName" value={profileData.institutionName} onChange={handleChange} placeholder="Institution Name" required />
        <input type="text" name="course" value={profileData.course} onChange={handleChange} placeholder="Course/Program of Study" required />
        <input type="number" name="yearOfStudy" value={profileData.yearOfStudy} onChange={handleChange} placeholder="Year of Study" required />
        <input type="text" name="studentId" value={profileData.studentId} onChange={handleChange} placeholder="Student ID Number" required />
        <input type="number" name="householdIncome" value={profileData.householdIncome} onChange={handleChange} placeholder="Household Income" required />
        <input type="number" name="numberOfDependents" value={profileData.numberOfDependents} onChange={handleChange} placeholder="Number of Dependents" required />
        <select name="employmentStatus" value={profileData.employmentStatus} onChange={handleChange} required>
          <option value="">Select Employment Status</option>
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
        </select>
        <input type="text" name="financialAid" value={profileData.financialAid} onChange={handleChange} placeholder="Financial Aid Received" required />
        <textarea name="personalStatement" value={profileData.personalStatement} onChange={handleChange} placeholder="Personal Statement" required></textarea>
        <button type="submit">Create Profile</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateProfile;
