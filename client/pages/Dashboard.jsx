import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import ChatPage from '../components/ChatPage';
import TripImWatching from '../components/TripImWatching';
import MyTrip from '../components/MyTrip';
import MyTripStart from '../components/MyTripStart';
import MyTripCard from '../components/MyTripCard';

// creates a new Manager for the given host URL (https://socket.io/docs/v4/client-api/#manager)
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080/', {
  // path: '/chat',
});

function Dashboard(props) {

  console.log(props)

  // hook for tracking userTrip data 
  const [userTrip, setUserTrip] = useState({
    active: true,
    start_timestamp: '',
    start_lat: '',
    start_lng: '',
    sos_timestamp: '',
    sos_lat: '',
    sos_lng: '',
  })

  // hooks for conditionally rendering these components on click
  const [renderContacts, setRenderContacts] = useState(false);
  const [renderTrips, setRenderTrips] = useState(false);
  const [renderTripsImWatching, setRenderTripsImWatching] = useState(false);
  const [renderChatPage, setChatPage] = useState(false);

  const handleClick1 = () => setRenderContacts(true);
  const handleClick2 = () => setRenderTrips(true);
  const handleClick3 = () => setRenderTripsImWatching(true);
  const handleClick4 = () => setChatPage(true);

  // get request to update userTrip with data from db
  // we really only need this to occur once, at the beginning of each login. Currently, I think this get req will be sent every time 


  return(
    <div>
      <div className='dashboard-container'>
        <div className='sidebar-container'>
          <Sidebar 
            setRenderContacts={handleClick1}
            setRenderTrips={handleClick2}
            setRenderTripsImWatching={handleClick3}
            setChatPage={handleClick4}
          />
        </div>
        <div className='functions-container'>
          {renderContacts && <Contacts /> }
          {/* updated ln 58 to render MyTrip component, which in turn, conditionally renders either MyTripStart or MyTrip 
          depending on whether there is an active user trip */}
          {renderTrips && <MyTrip userInfo={props.userInfo} setUserInfo={props.setUserInfo} userTrip={userTrip} setUserTrip={setUserTrip} />}
          {renderTripsImWatching && <TripImWatching />}
          {renderChatPage &&  <ChatPage path= '/chat' socket={socket} />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;