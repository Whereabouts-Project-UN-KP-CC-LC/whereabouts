import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ handleClick }) {
  return (
    <div className="sidebar">
      <div onClick={() => handleClick('contacts')} className="sidebar-item">
        Contacts / Start Trip
      </div>
      <div onClick={() => handleClick('myTripCard')} className="sidebar-item">
        My Trip
      </div>
      <div
        onClick={() => handleClick('tripsImWatching')}
        className="sidebar-item"
      >
        Trips I'm Watching
      </div>
      <Link to="/chat" className="sidebar-item">
        Chat
      </Link>

      <Link to="/" className="sidebar-item">
        Logout
      </Link>
    </div>
  );
}
export default Sidebar;
