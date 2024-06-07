import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ setSearchQuery }) => {
  // const [query, setQuery] = useState('');
  // const handleSearch = (e) => {
  //   e.preventDefault();
  // };

  const [localQuery, setLocalQuery] = useState('');

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">News Aggregator</Link>
      </div>
      <form className="search-form"
      //  onSubmit={handleSearch}
       >
        <input
          type="text"
          placeholder="Search articles..."
          value={localQuery}
          onChange={handleInputChange}
        />
        {/* <button type="submit">Search</button> */}
      </form>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/feed">My Feed</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
