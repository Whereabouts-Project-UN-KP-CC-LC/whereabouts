import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import MyTripStart from '../components/MyTripStart';
import TripImWatching from '../components/TripImWatching';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from '../components/ChatPage';

// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080/', {
  // path: '/chat',
});

function Dashboard(props) {
  // hooks for conditionally rendering these components on click
  const [renderContacts, setRenderContacts] = useState(false);
  const [renderTrips, setRenderTrips] = useState(false);
  const [renderTripsImWatching, setRenderTripsImWatching] = useState(false);
  const [renderChatPage, setChatPage] = useState(false);

  const handleClick1 = () => setRenderContacts(true);
  const handleClick2 = () => setRenderTrips(true);
  const handleClick3 = () => setRenderTripsImWatching(true);
  const handleClick4 = () => setChatPage(true);

  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const source = new EventSource(`http://localhost:8080/stream`, {
      withCredentials: true,
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
      <div>{trips}</div>
      <div className="sidebar-container">
        <Sidebar
          setRenderContacts={handleClick1}
          setRenderTrips={handleClick2}
          setRenderTripsImWatching={handleClick3}
          setChatPage={handleClick4}
        />
      </div>
      <div className="functions-container">
        {renderContacts && <Contacts />}
        {renderTrips && <MyTripStart />}
        {renderTripsImWatching && <TripImWatching />}
        {renderChatPage && <ChatPage path="/chat" socket={socket} />}
      </div>
    </div>
  );
}

export default Dashboard;