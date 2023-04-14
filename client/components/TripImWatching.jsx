import React from 'react';
import ProgressBar from './ProgressBar';
import TripViewingCard from './TripViewingCard';



function TripImWatching() {
    

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