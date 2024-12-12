import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  // Fetch profiles when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/profiles');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (profileId, updatedProfileData) => {
    try {
      const response = await fetch(`http://localhost:5000/profiles/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedData = await response.json();
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === profileId ? updatedData : profile
        )
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async (profileId) => {
    try {
      const response = await fetch(`http://localhost:5000/profiles/${profileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete profile');

      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== profileId)
      );
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  // Handle adding a new profile
  const handleAddProfile = async (newProfile) => {
    try {
      const response = await fetch('http://localhost:5000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });

      if (!response.ok) throw new Error('Failed to add profile');

      const addedProfile = await response.json();
      setProfiles((prevProfiles) => [...prevProfiles, addedProfile]);
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  return (
    <div className="profile-list">
      <h2>Profile List</h2>

      <ProfileForm onProfileUpdate={handleAddProfile} />

      <div className="profiles">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile">
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <p>{profile.address}</p>
            <p>{profile.phone}</p>
            <p>{profile.email}</p>
            <button onClick={() => handleUpdateProfile(profile.id, profile)}>Update Profile</button>
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
