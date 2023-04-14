import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MapContainer from '../components/MapContainer';


// Pass props from contact list. Must have SOS state passed down from...
export default function TripViewingCard({trip}) {
  
  //Adds red border to trip with SOS enabled
  const sx = { maxWidth: 700 };
  if (trip.sos_timestamp) {
    sx.border = 5;
    sx.borderColor = 'red';
  };

  let status = 'started';
  let color = 'success.main'
  if (trip.sos_timestamp && trip.end_timestamp) { status = 'finished'; color = 'text.secondary'}
  else if (trip.sos_timestamp) { status = 'sos'; color = 'error.main' }

  return (
    <Card sx={sx}>
      <div className="map-container">
        <MapContainer trip={trip} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* Here is were we'd insert contact's name and possibly travel destination */}
          {trip.traveler_name} is on a journey home.
        </Typography>
        <Typography variant="body2" color="{text}">
          Status: {status}
        </Typography>
      </CardContent>
      <CardActions>
        {/* conditionally render these buttons when SOS is active on trip */}
        {trip.sos_timestamp && <Button size="large">Join Chat</Button>}
        {trip.sos_timestamp && <Button size="large">Decline SOS</Button>}

      </CardActions>
    </Card>
  );
}
