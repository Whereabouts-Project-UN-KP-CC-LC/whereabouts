import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MapContainer from '../components/MapContainer';

// Card media is not needed since it was a component for the stock image that came with MUI

// Pass props from contact list. Must have SOS state passed down from...
export default function TripViewingCard({ trip }) {
  // console log coordinates per traveler watching
  console.log(`trip: ${JSON.stringify(trip)}`);
  // console.log(`trip.start_lat : ${trip.start_lat}`);

  const newTrip = JSON.stringify(trip);

  return (

      
    <Card sx={{ width: 700, height: 500 }}>
       
      <div className="map-container">
        <MapContainer trip={newTrip} />
      </div>
      <Typography gutterBottom variant="h5" component="div">
          {/* Here is were we'd insert contact's name and possibly travel destination */}
          HELLO HELLO
          {/* {trip.traveler_name} is on a journey home. */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Optional text here. 
        </Typography>
      <Button size='xx-large'> Join Chat</Button>
      <Button size='xx-large'> Decline SOS</Button>
    
  </Card>
    

    
  );
}
