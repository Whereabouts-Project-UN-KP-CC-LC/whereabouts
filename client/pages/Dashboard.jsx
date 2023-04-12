import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import MyTripStart from '../components/MyTripStart';
import TripImWatching from '../components/TripImWatching';

function Dashboard(props) {

  // hooks for conditionally rendering these components on click
  const [renderContacts, setRenderContacts] = useState(false);
  const [renderTrips, setRenderTrips] = useState(false);
  const [renderTripsImWatching, setRenderTripsImWatching] = useState(false);

  const handleClick1 = () => setRenderContacts(true);
  const handleClick2 = () => setRenderTrips(true);
  const handleClick3 = () => setRenderTripsImWatching(true);

  return(
    <div className='dashboard-container'>
      <div className='sidebar-container'>
        <Sidebar 
          setRenderContacts={handleClick1}
          setRenderTrips={handleClick2}
          setRenderTripsImWatching={handleClick3}
        />
      </div>
      <div className='functions-container'>
        {renderContacts && <Contacts /> }
        {renderTrips && <MyTripStart />}
        {renderTripsImWatching && <TripImWatching />}
      </div>
    </div>
  )
}

export default Dashboard;