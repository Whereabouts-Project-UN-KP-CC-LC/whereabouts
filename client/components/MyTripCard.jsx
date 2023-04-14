import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MapContainer from './MapContainer';

// When rendering this component, use => <MyTripCard userInfo={userInfo} setUserInfo={setUserInfo} userTrip={userTrip} setUserTrip={setUserTrip} />

const MyTripCard = ({ userInfo, setUserInfo, userTrip, setUserTrip }) => {
    

    // obtain position, submit to server, render SOS map if needed
    const handleClick = async (name) => {
        // CHECK DATABASE FOR PROPER COLUMN NAMES
        const time_stamp = Date.now();

        // google API call to fetch position
        const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBRzoiY1lCeVlXPEZELkqEdTehWIUcijms`);
        const position = response.data.location;

        // update state with sos position, if sos was clicked
        if(name !== 'end-trip') {
            setUserTrip( (prevState) => {
                return {
                    ...prevState,
                    sos_lat: position.lat,
                    sos_lng: position.lng,
                }
            });
        }
    
        // NEED PROPER ENDPOINT FOR POST REQUEST
        const body = (name === 'end-trip') ? {end_timestamp: time_stamp} : {sos_timestamp: time_stamp, sos_lat: lat, sos_lng: lng};
        axios.post('/sos', {...body, phone_number: userInfo.phone_number} )

        // REDIRECT TO CHAT
        

    };
    

  return (

    <Card sx={{ maxWidth: 700 }}>
    <MapContainer lat={userTrip.start_lat} lng={userTrip.start_lng} />
      
      <CardMedia
        sx={{ height: 150 }}
        src='src only accepts a string'
        title="interactive-map"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Your Current Trip
        </Typography>
        <Typography variant="body2" color="text.secondary">
            
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
            size='large' 
            variant='contained' 
            color='primary' 
            name='end-trip' 
            onClick={(e) => {handleClick(e.target.name)}} 
        >End this Trip</Button>
        <Button 
            size='large' 
            variant='contained' 
            color='error' 
            name='sos' 
            onClick={(e) => {handleClick(e.target.name)}} 
        >ALERT CONTACTS FOR HELP</Button>
      </CardActions>
    </Card>

  )
}

export default MyTripCard;
