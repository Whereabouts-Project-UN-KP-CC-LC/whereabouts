import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import TripViewingCard from './TripViewingCard';


function TripImWatching({userInfo}) {
  // temp data to render for demo
  const hardcodedTrips = [
    // ongoing trip:
    {
      trips_id: 1,
      traveler_name: 'Upasana',
      start_timestamp: new Date().toISOString(),
      start_lat: 33.7490, // Example coordinates for New York City
      start_lng: -84.3880,
      // Additional properties for the map or trip details can be added here
    },
    // SOS Trip
    {
      trips_id: 2,
      traveler_name: 'Charlie',
      start_timestamp: new Date().toISOString(),
      sos_timestamp: new Date().toISOString(),
      start_lat: 40.7128, // Example coordinates for Los Angeles
      start_lng: -74.0060,
      // Additional properties for the map or trip details can be added here
    },
    // Finished Trip
    {
      trips_id: 3,
      traveler_name: 'Lucas',
      start_timestamp: new Date().toISOString(),
      end_timestamp: new Date().toISOString(),
      start_lat: -33.4489, // Example coordinates for Chicago
      start_lng: -70.6693,
      // Additional properties for the map or trip details can be added here
    }
  ]

  /* uncomment for normal use */
  //SSE - render trips
  //const [trips, setTrips] = useState([]);

  // temp state to use hardcorded trips
  const [trips, setTrips] = useState(hardcodedTrips);

  useEffect(() => {
    const source = new EventSource(`http://localhost:3000/stream/${userInfo.phone_number}`, { //replace 123456789 with current user's phone_number
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
        <br/>
        <h1>Trips I'm Watching</h1>
        {trips.map((trip) => (
          <div key={trip.trips_id} className='view-card'>
            <br></br>
            <TripViewingCard
              trip={trip}
            />
          </div>
        ))}
      </div>
      
    </>
  )  
}

export default TripImWatching;