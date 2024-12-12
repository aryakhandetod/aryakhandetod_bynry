import React, { useState } from 'react';

const ProfileForm = ({ onProfileUpdate }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    skills: [], // Initialize as an array
    certifications: [], // Initialize as an array
    interests: [], // Initialize as an array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills' || name === 'certifications' || name === 'interests') {
      // Split the comma-separated value into an array and trim whitespace
      setNewProfile({
        ...newProfile,
        [name]: value.split(',').map((item) => item.trim()), // Convert to an array
      });
    } else {
      setNewProfile({
        ...newProfile,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });
      const addedProfile = await response.json();
      onProfileUpdate((prevProfiles) => [...prevProfiles, addedProfile]);
      setNewProfile({
        name: '',
        photo: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        skills: [],
        certifications: [],
        interests: [],
      }); // Clear the form
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    <div className="profile-form">
      <h2>Add New Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProfile.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="photo"
          value={newProfile.photo}
          onChange={handleInputChange}
          placeholder="Photo URL"
          required
        />
        <textarea
          name="description"
          value={newProfile.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="address"
          value={newProfile.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="phone"
          value={newProfile.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <input
          type="email"
          name="email"
          value={newProfile.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="skills"
          value={newProfile.skills.join(', ')} // Display as comma-separated values
          onChange={handleInputChange}
          placeholder="Skills (comma separated)"
        />
        <input
          type="text"
          name="certifications"
          value={newProfile.certifications.join(', ')} // Display as comma-separated values
          onChange={handleInputChange}
          placeholder="Certifications (comma separated)"
        />
        <input
          type="text"
          name="interests"
          value={newProfile.interests.join(', ')} // Display as comma-separated values
          onChange={handleInputChange}
          placeholder="Interests (comma separated)"
        />
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
