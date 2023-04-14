import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import TripViewingCard from './TripViewingCard';



function TripImWatching({userInfo}) {
        
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
    <>
      <div className='trip-watching-container'>
        <h1>Creating one view port for 'trips i'm watching'</h1>
        <div className='view-card'>
          <br></br>
          <TripViewingCard />
          <br></br>
          <ProgressBar />
        </div>
        <div className='view-card'>
          <br></br>
          <TripViewingCard />
          <br></br>
          <ProgressBar />
        </div>
        <div className='view-card'>
          <br></br>
          <TripViewingCard />
          <br></br>
          <ProgressBar />
        </div>
      </div>
      
    </>
  )  
}

export default TripImWatching;