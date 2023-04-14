import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";



export default function MapContainer ({ start_lat, start_lng }) {
  const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyBRzoiY1lCeVlXPEZELkqEdTehWIUcijms'
  })

  if (!isLoaded) {
    console.log(`Can not detect google API key`);
    return <div> Loading...</div>;
  }
  return <Map start_lat={start_lat} start_lng={start_lng} />;
}

  function Map({ start_lat, start_lng }) {
    const center = useMemo(() => ({ lat: start_lat, lng: start_lng }), []);
  
    return (
      <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
      </GoogleMap>
    );
};
