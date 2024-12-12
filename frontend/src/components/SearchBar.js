import React from 'react';
  // Import the new CSS file for styling

function SearchBar({ onSearch }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search profiles by name or location"
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="search-icon"></span>
    </div>
  );
}

export default SearchBar;
