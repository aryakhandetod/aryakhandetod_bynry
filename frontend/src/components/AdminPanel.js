import React, { useState, useEffect } from 'react';

const AdminPanel = ({ profiles, onProfileUpdate }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    address: '',
    photo: ''
  });
  const [editProfile, setEditProfile] = useState(null);

  // Handle form inputs for creating new profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form inputs for editing profile
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new profile (POST request to the backend)
  const handleAddProfile = () => {
    fetch('http://localhost:5000/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile)
    })
      .then((res) => res.json())
      .then((data) => {
        onProfileUpdate();  // Refresh the profile list after adding
        setNewProfile({
          name: '',
          description: '',
          address: '',
          photo: ''
        });  // Clear form
      })
      .catch((err) => console.error('Error adding profile:', err));
  };

  // Edit profile (PUT request to the backend)
  const handleEditProfile = () => {
    fetch(`http://localhost:5000/profiles/${editProfile._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProfile)
    })
      .then((res) => res.json())
      .then((data) => {
        onProfileUpdate();  // Refresh the profile list after editing
        setEditProfile(null);  // Clear the edit form
      })
      .catch((err) => console.error('Error editing profile:', err));
  };

  // Delete a profile (DELETE request to the backend)
  const handleDeleteProfile = (profileId) => {
    fetch(`http://localhost:5000/profiles/${profileId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then(() => {
        onProfileUpdate();  // Refresh the profile list after deleting
      })
      .catch((err) => console.error('Error deleting profile:', err));
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Edit Profile Form (shown when a profile is selected for editing) */}
      {editProfile && (
  <div className="edit-profile">
    <h3>Edit Profile</h3>

    {/* Name Input */}
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={editProfile.name}
        onChange={handleEditChange}
        placeholder="Enter your name"
        required
      />
    </div>

    {/* Photo URL Input */}
    <div className="form-group">
      <label htmlFor="photo">Photo URL</label>
      <input
        type="text"
        name="photo"
        value={editProfile.photo}
        onChange={handleEditChange}
        placeholder="Enter a photo URL"
      />
    </div>

    {/* Description Input */}
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={editProfile.description}
        onChange={handleEditChange}
        placeholder="Enter a brief description"
        required
      />
    </div>

    {/* Address Input */}
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        value={editProfile.address}
        onChange={handleEditChange}
        placeholder="Enter your address"
        required
      />
    </div>

    {/* Phone Number Input */}
    <div className="form-group">
      <label htmlFor="phone">Phone Number</label>
      <input
        type="text"
        name="phone"
        value={editProfile.phone}
        onChange={handleEditChange}
        placeholder="Enter your phone number"
      />
    </div>

    {/* Email Input */}
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={editProfile.email}
        onChange={handleEditChange}
        placeholder="Enter your email"
        required
      />
    </div>

    {/* Skills Input */}
    <div className="form-group">
      <label htmlFor="skills">Skills</label>
      <input
        type="text"
        name="skills"
        value={editProfile.skills.join(', ')}
        onChange={handleEditChange}
        placeholder="Enter your skills (comma separated)"
      />
    </div>

    {/* Certifications Input */}
    <div className="form-group">
      <label htmlFor="certifications">Certifications</label>
      <input
        type="text"
        name="certifications"
        value={editProfile.certifications.join(', ')}
        onChange={handleEditChange}
        placeholder="Enter your certifications (comma separated)"
      />
    </div>

    {/* Interests Input */}
    <div className="form-group">
      <label htmlFor="interests">Interests</label>
      <input
        type="text"
        name="interests"
        value={editProfile.interests.join(', ')}
        onChange={handleEditChange}
        placeholder="Enter your interests (comma separated)"
      />
    </div>

    {/* Save Button */}
    <button className="save-button" onClick={handleEditProfile}>
      Save Changes
    </button>
  </div>
)}


      {/* List Existing Profiles */}
      <div className="profile-list">
        <h3>Existing Profiles</h3>
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <h4>{profile.name}</h4>
            <p>{profile.description}</p>
            <p>{profile.address}</p>
            <button onClick={() => setEditProfile(profile)}>Edit</button>
            <button onClick={() => handleDeleteProfile(profile._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
