import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import ProfileCard from './components/ProfileCard';
import SearchBar from './components/SearchBar';
import ProfileForm from './components/ProfileForm'; // New component to handle profile creation
import AdminPanel from './components/AdminPanel'; // New component for admin actions

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [isMapVisible, setIsMapVisible] = useState(false); // State to toggle Map visibility

  // Fetch profiles from the backend
  useEffect(() => {
    fetch('http://localhost:5000/profiles') // API endpoint to fetch profiles
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch profiles');
        }
        return res.json();
      })
      .then((data) => setProfiles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading and error handling
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  // Function to handle adding, updating, or deleting profiles
  const handleProfileUpdate = (updatedProfiles) => {
    setProfiles(updatedProfiles);
  };

  return (
    <div className="app">
      <h1>Smart Search</h1>

      {/* SearchBar Component */}
      <SearchBar onSearch={(term) => setSearchTerm(term)} />

      {/* Conditionally render the Admin Panel based on admin status */}
      {isAdmin && (
        <AdminPanel profiles={profiles} onProfileUpdate={handleProfileUpdate} />
      )}

      {/* Button to toggle the visibility of the Map Component */}
      <button onClick={() => setIsMapVisible(!isMapVisible)}>
        {isMapVisible ? 'Hide Summary' : 'Show Summary'}
      </button>

      {/* Render profile cards */}
      <div className="profile-list">
        {filteredProfiles.map((profile) => (
          <div key={profile._id} className="profile-card-wrapper">
            <ProfileCard profile={profile} />
          </div>
        ))}
      </div>

      {/* Conditionally render MapComponent based on isMapVisible */}
      {isMapVisible && (
        <div>
          <h3>Location Summary</h3>
          {filteredProfiles.map((profile) => (
            <MapComponent key={profile._id} profile={profile} />
          ))}
        </div>
      )}

      {/* Button to toggle admin mode */}
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
      </button>

      {/* Form to add a new profile */}
      {isAdmin && <ProfileForm onProfileUpdate={handleProfileUpdate} />}
    </div>
  );
}

export default App;
