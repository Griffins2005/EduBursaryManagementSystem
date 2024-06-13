import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = ({ addApplication }) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [amount, setAmount] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [fatherEarnings, setFatherEarnings] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [motherEarnings, setMotherEarnings] = useState('');
  const [guardianOccupation, setGuardianOccupation] = useState('');
  const [guardianEarnings, setGuardianEarnings] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !school || !amount || !familyType) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const newApplication = {
        name,
        school,
        amount,
        familyType,
        fatherOccupation,
        fatherEarnings,
        motherOccupation,
        motherEarnings,
        guardianOccupation,
        guardianEarnings,
        guardianRelationship
      };

      const response = await axios.post('https://edubursarymanagementsystem-backend.onrender.com/api/applications/apply', newApplication, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      addApplication(response.data);
      setName('');
      setSchool('');
      setAmount('');
      setFamilyType('');
      setFatherOccupation('');
      setFatherEarnings('');
      setMotherOccupation('');
      setMotherEarnings('');
      setGuardianOccupation('');
      setGuardianEarnings('');
      setGuardianRelationship('');
      setError('');
      setSuccess('Application submitted successfully!');

      setTimeout(() => {
        setSuccess('');
        navigate('/'); // Navigate back to the main page
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in');
      } else {
        setError('Application submission failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="School" />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <select name="familyType" value={familyType} onChange={(e) => setFamilyType(e.target.value)} required>
        <option value="">Select Family Type</option>
        <option value="Single Parent">Single Parent</option>
        <option value="Two Parents">Two Parents</option>
        <option value="No Parents">No Parents</option>
      </select>
      {familyType === 'Single Parent' && (
        <>
          <input type="text" value={fatherOccupation} onChange={(e) => setFatherOccupation(e.target.value)} placeholder="Father's Occupation" />
          <input type="number" value={fatherEarnings} onChange={(e) => setFatherEarnings(e.target.value)} placeholder="Father's Monthly Earnings" />
        </>
      )}
      {familyType === 'Two Parents' && (
        <>
          <input type="text" value={fatherOccupation} onChange={(e) => setFatherOccupation(e.target.value)} placeholder="Father's Occupation" />
          <input type="number" value={fatherEarnings} onChange={(e) => setFatherEarnings(e.target.value)} placeholder="Father's Monthly Earnings" />
          <input type="text" value={motherOccupation} onChange={(e) => setMotherOccupation(e.target.value)} placeholder="Mother's Occupation" />
          <input type="number" value={motherEarnings} onChange={(e) => setMotherEarnings(e.target.value)} placeholder="Mother's Monthly Earnings" />
        </>
      )}
      {familyType === 'No Parents' && (
        <>
          <input type="text" value={guardianOccupation} onChange={(e) => setGuardianOccupation(e.target.value)} placeholder="Guardian's Occupation" />
          <input type="number" value={guardianEarnings} onChange={(e) => setGuardianEarnings(e.target.value)} placeholder="Guardian's Monthly Earnings" />
          <input type="text" value={guardianRelationship} onChange={(e) => setGuardianRelationship(e.target.value)} placeholder="Relationship to Guardian" />
        </>
      )}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
