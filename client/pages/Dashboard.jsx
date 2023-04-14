import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import TripImWatching from '../components/TripImWatching';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Dashboard({ userInfo }) {
  // hook for contacts per user
  const [contacts, setContacts] = useState([]);

  // hook for conditionally rendering components
  const [activeComponent, setActiveComponent] = useState(null);

  // toggle components in sidebar
  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  // SSE - render trips
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const source = new EventSource(`http://localhost:3000/stream/2222`, {
      //replace 2222 with current user's phone_number
      withCredentials: false,
    }); // maybe need to add to webpack? Not necessary

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      // console.log(e.data);
      const data = JSON.parse(e.data);
      setTrips(data);
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ', e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar handleClick={handleClick} />
      </div>
      <div className="functions-container">
        {activeComponent === 'contacts' && (
          <Contacts
            userInfo={userInfo}
            contacts={contacts}
            setContacts={setContacts}
          />
        )}
        {activeComponent === 'tripsImWatching' && <TripImWatching />}
      </div>
    </div>
  );
}

export default Dashboard;
