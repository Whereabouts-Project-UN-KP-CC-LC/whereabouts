import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MapContainer from './MapContainer';

// When rendering this component, use => <MyTripCard userInfo={userInfo} setUserInfo={setUserInfo} userTrip={userTrip} setUserTrip={setUserTrip} />

// Card media is not needed since it was a component for the stock image that came with MUI

const MyTripCard = ({ userInfo, setUserInfo, userTrip, setUserTrip, setActiveComponent }) => {

  // let userData;
  // console.log(`Inside my trip card PASS #1`);
  // Get request to render user trip
  // useEffect(() => {
  //   async function getData() {
  //     const response = await axios.get(`/api/trips/my/${userInfo.phone_number}`);
  //     console.log('this is the response', response);
  //     userData = response.data[0];
  //     console.log('this is the userData var', userData);
  //   } 
  
  //   getData();


  // }, [])
  

  // make user info accessible to rest of app
  //  setUserTrip({
  //     tripId: userData.id,
  //     start_lat: userData.start_lat,
  //     start_lng: userData.start_lng,
  //   })
  // console.log(userData.start_lat)
  // console.log(userData.start_lng)

  // demo version 40.6970173,-74.3100135
  const trip = {
    start_lat: 40.6970173,
    start_lng: -74.3100135,
    tripId: 99,
  };

  // const trip = {
  //   start_lat: userData.start_lat,
  //   start_lng: userData.start_lng,
  //   tripId: userData.id,
  // };

  // obtain position, submit to server, render SOS map if needed
  const handleClick = async (name) => {

    try {
      // google API call to fetch position
      const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
      const { lat, lng } = response.data.location;
      
    } catch(err){
      console.log('error with fetching position from google api =>', err)
    }


    // update state with sos position, if sos was clicked
    if(name !== 'end-trip') {
        setUserTrip( (prevState) => {
            return {
                ...prevState,
                sos_lat: lat,
                sos_lng: lng,
            }
        });
    }

    // conditionally create body & endpoint url depending on whether we are ending trip or sending sos
    const body = (name === 'end-trip') ? {tripId: trip.tripId} : {tripId: trip.tripId, lat: lat, lng: lng};
    const url = (name === 'end-trip') ? '/api/trips/reached' : '/api/trips/sos';

    // send post req to back end with end trip or sos data
    try {
      axios.post(url, body)

    } catch(err) {
      console.log(err);
    }

  }

  return (
    <div className="my-trip-container">
      <Card sx={{ maxWidth: 700 }}>
        {/* lat={userTrip.start_lat} lng={userTrip.start_lng} */}
        <div className="map-container">
          <MapContainer trip={trip}/>
        </div>
        {/* <CardMedia
          sx={{ height: 150 }}
          src='src only accepts a string'
          title="interactive-map"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Your Current Trip
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secondary text here
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            color="primary"
            name="end-trip"
            onClick={(e) => {
              handleClick(e.target.name);
            }}
          >
            End this Trip
          </Button>
          <Button
            size="large"
            variant="contained"
            color="error"
            name="sos"
            onClick={(e) => {
              handleClick(e.target.name);
            }}
          >
            ALERT CONTACTS FOR HELP
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MyTripCard;
