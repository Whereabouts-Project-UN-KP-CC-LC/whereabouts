import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import ChatPage from '../components/ChatPage';
import TripImWatching from '../components/TripImWatching';
import MapContainer from '../components/MapContainer';
import MyTripCard from '../components/MyTripCard';
import TripViewingCard from '../components/TripViewingCard';

function Dashboard({ userInfo, setUserInfo }) {
  // hook for contacts per user
  const [contacts, setContacts] = useState([]);

  // hook for conditionally rendering components
  const [activeComponent, setActiveComponent] = useState('tripsImWatching');

  // hook for tracking userTrip data
  const [userTrip, setUserTrip] = useState({
    active: true,
    tripId: '',
    start_timestamp: '',
    start_lat: '',
    start_lng: '',
    sos_timestamp: '',
    sos_lat: '',
    sos_lng: '',
  });

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
      <div className="sidebar-container">
        <Sidebar handleClick={handleClick} />
      </div>
      <div className="functions-container">
        {activeComponent === 'contacts' && (
          <Contacts
            userInfo={userInfo}
            contacts={contacts}
            setContacts={setContacts}
            setActiveComponent={setActiveComponent}
          />
        )}
        {activeComponent === 'myTripCard' && <MyTripCard 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            userTrip={userTrip} 
            setUserTrip={setUserTrip} 
            setActiveComponent={setActiveComponent}
          />}
        {activeComponent === 'tripsImWatching' && (
          <TripImWatching userInfo={userInfo} />
        )}
        {activeComponent === 'chatPage' && (
          <ChatPage path="/chat" socket={socket} />
        )}
      </div>
      <div className="testing-container">
        <h1>Hello</h1>
        <MapContainer />
      </div>
    </div>
  );
}

export default Dashboard;
