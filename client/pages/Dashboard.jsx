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

  //SSE - render trips
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const source = new EventSource(`http://localhost:3000/stream/1234567890`, { //replace 123456789 with current user's phone_number
      withCredentials: false,
    }); //maybe need to add to webpack?

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
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
      {/* SSE - Render trips */}
      {/* <div>
        {trips.map((trip) => (
          <div>Trip Id: {trip.id} | Trip Start Time: {trip.start_timestamp} ||</div>
        ))}
      </div> */}

      <div className="sidebar-container">
        <Sidebar
          setRenderContacts={handleClick1}
          setRenderTrips={handleClick2}
          setRenderTripsImWatching={handleClick3}
          setChatPage={handleClick4}
        />
      </div>
      <div className='functions-container'>
        {activeComponent === 'contacts' && <Contacts
          userInfo={userInfo} 
          contacts={contacts} 
          setContacts={setContacts} 
        /> }
        {activeComponent === 'tripsImWatching' && <TripImWatching />}
        {activeComponent === 'chatPage' &&  <ChatPage 
          path= '/chat' 
          socket={socket} 
        />}
      </div>
    </div>
  )
}

export default Dashboard;