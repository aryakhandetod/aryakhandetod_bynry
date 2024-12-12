import React from 'react';

function ProfileDetails({ profile }) {
  const { name, photo, description, address, phone, email, skills, certifications, interests } = profile;

  return (
    <div className="profile-details">
      <img src={photo} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p><strong>Address:</strong> {address}</p>

      <div className="contact-info">
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <div className="additional-info">
        <p><strong>Skills:</strong> {skills.join(', ')}</p>
        <p><strong>Certifications:</strong> {certifications.join(', ')}</p>
        <p><strong>Interests:</strong> {interests.join(', ')}</p>
      </div>
    </div>
  );
}

export default ProfileDetails;
