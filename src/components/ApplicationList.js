import React, { useEffect } from 'react';

const ApplicationList = ({ applications }) => {
  useEffect(() => {
    console.log('Applications:', applications);
  }, [applications]);

  if (!applications || applications.length === 0) {
    return <p>No applications found.</p>;
  }

  return (
    <ul className="application-list">
      {applications.map((application, index) => {
        console.log('Rendering application:', application);
        return (
          <li key={application._id || index} className="application-item">
            <div className="application-details"> {/* Apply CSS class to the container */}
              <span><strong>Name:</strong> {application.name}</span>
              <span><strong>School:</strong> {application.school}</span>
              <span><strong>Amount:</strong> {application.amount}</span>
              <span><strong>Family Type:</strong> {application.familyType}</span>
              {application.familyType === 'Single Parent' && (
                <>
                  <span><strong>Parent's Occupation:</strong> {application.parentOccupation}</span>
                  <span><strong>Parent's Monthly Earnings:</strong> {application.parentEarnings}</span>
                </>
              )}
              {application.familyType === 'Two Parents' && (
                <>
                  <span><strong>Father's Occupation:</strong> {application.fatherOccupation}</span>
                  <span><strong>Father's Monthly Earnings:</strong> {application.fatherEarnings}</span>
                  <span><strong>Mother's Occupation:</strong> {application.motherOccupation}</span>
                  <span><strong>Mother's Monthly Earnings:</strong> {application.motherEarnings}</span>
                </>
              )}
              {application.familyType === 'No Parents' && (
                <>
                  <span><strong>Guardian's Occupation:</strong> {application.guardianOccupation}</span>
                  <span><strong>Guardian's Monthly Earnings:</strong> {application.guardianEarnings}</span>
                  <span><strong>Relationship to Guardian:</strong> {application.relationshipToGuardian}</span>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ApplicationList;
