import { useState, useEffect, useRef, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { 
  GoogleMapsProvider,
  useGoogleMap,
} from "@ubilabs/google-maps-react-hooks";

// declare map options/config
const mapOptions = {
  zoom: 12, 
  center: {
    lat: 43.68, 
    lng: -79.43
  }
};



export default function MapContainer() {
  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      options={mapOptions}
    ></GoogleMapsProvider>
  )
}

export default function MapContainer() {
  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      options={mapOptions}
    ></GoogleMapsProvider>
  )
}