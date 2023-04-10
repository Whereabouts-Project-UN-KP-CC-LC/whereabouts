import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Contacts from '../components/Contacts';
import MyTripStart from '../components/MyTripStart';

function Dashboard(props) {

  // hooks for conditionally rendering these components on click
  const [renderContacts, setRenderContacts] = useState(false);
  const [renderTrips, setRenderTrips] = useState(false);

  const handleClick1 = () => setRenderContacts(true);
  const handleClick2 = () => setRenderTrips(true);



  return(
    <div className='dashboard-container'>
      <div className='sidebar-container'>
        <Sidebar 
          setRenderContacts={handleClick1}
          setRenderTrips={handleClick2}
        />
      </div>
      <div className='functions-container'>
        {renderContacts && <Contacts />}
        {renderTrips && <MyTripStart />}
      </div>
    </div>
  )
}

export default Dashboard;