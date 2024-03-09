import React, { useMemo, useState, useEffect } from "react";
//import { Map, InfoWindow, Marker, GoogleApiWrapper, Geocode } from "google-maps-react";

// hard code API key. Keep safe
const key = "AIzaSyBRzoiY1lCeVlXPEZELkqEdTehWIUcijms";

function MapContainer ({trip}) {
  // console.log('trip: ', trip);
  // console.log('keys for trip: ', JSON.stringify(trip.start_lat));

  // needs to be in sync with className="map-container" in css
  const containerStyle = {
    width: '700px',
    height: '300px',
  };

  
  const center = {
    'lat': trip.start_lat,
    'lng': trip.start_lng,
  };

  // hook to store coordinates & address:
  // const [address, setAddress] = useState('');
  // const [location, setLocation] = useState({ lat: null, lng: null });
  
  /* ** Note: ANYTHING rendered inside of the same div as Map container will be covered. Need to add components AROUND the container storing the Map component */
  return (
   <>

    <div className="map">
      <Map
        sx={{ position: 'absolute', zIndex: -1 }}
        containerStyle={containerStyle}
        initialCenter={center}
        google={google} 
        zoom={12}>
        <Marker
          name={'Current location'}
        />
      </Map>
      
    </div>
    
   </>
    
  );
};
 
export default GoogleApiWrapper({
  apiKey: key
})(MapContainer)

