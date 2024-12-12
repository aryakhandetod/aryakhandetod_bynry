import React, { useState } from 'react';
import MapComponent from './MapComponent';
import ProfileDetails from './ProfileDetails';

const ProfileCard = ({ profile }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showDetails, setShowDetails] = useState(false); 

  const handleShowSummaryClick = (e) => {
    e.stopPropagation();  // Prevents the click from bubbling up to the card
    setShowSummary((prev) => !prev);  // Toggle the map view only
  };

  const handleCardClick = () => {
    // Show details when card is clicked, and reset the map view if it's open
    setShowDetails((prev) => !prev);
    setShowSummary(false); // Hide map when profile details are shown
  };

  return (
    <div className="profile-card" onClick={handleCardClick}>
      <img src={profile.photo} alt={profile.name} />
      <div className="profile-info">
        <h3>{profile.name}</h3>
        <p>{profile.description}</p>
        <p>{profile.address}</p>
      </div>

      <div className="actions">
        {/* Show the "Show Summary" button only if the full details are not visible */}
        {!showDetails && (
          <button onClick={handleShowSummaryClick}>
            {showSummary ? 'Hide Summary' : 'Show Summary'}
          </button>
        )}
      </div>

      {/* Render the map only when the summary button is clicked */}
      {showSummary && <MapComponent profile={profile} />}

      {/* Conditionally render ProfileDetails only when the card is clicked */}
      {showDetails && <ProfileDetails profile={profile} />}
    </div>
  );
};

export default ProfileCard;
