import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import TripImWatching from '../components/TripImWatching';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from '../components/ChatPage';

// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080/', {
  // path: '/chat',
});

function Dashboard({ userInfo }) {

  // hook for contacts per user
  const [contacts, setContacts] = useState([]);

  // hook for conditionally rendering components
  const [activeComponent, setActiveComponent] = useState(null);

  // toggle components in sidebar
  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="dashboard-container">
      {/* SSE - Render trips */}
      {/* <div>
        {trips.map((trip) => (
          <div>Trip Id: {trip.id} | Trip Start Time: {trip.start_timestamp} ||</div>
        ))}
      </div> */}
      <div className='sidebar-container'>
        <Sidebar 
          handleClick={handleClick}
        />
      </div>
      <div className='functions-container'>
        {activeComponent === 'contacts' && <Contacts
          userInfo={userInfo} 
          contacts={contacts} 
          setContacts={setContacts} 
        /> }
        {activeComponent === 'tripsImWatching' && <TripImWatching
          userInfo={userInfo} 
        />}
        {activeComponent === 'chatPage' &&  <ChatPage 
          path= '/chat' 
          socket={socket} 
        />}
      </div>
    </div>
  )
}

export default Dashboard;
