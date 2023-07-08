import React, { useMemo, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
// hard code API key. Keep safe
  apiKey: "AIzaSyBr3MX_jDHvEGcGo_0XBUiwQ7FO7y642C4",
  version: "weekly",
  // additionalOptions
})

function MapContainer ({trip}) {
  // console.log('trip: ', trip);
  // console.log('keys for trip: ', JSON.stringify(trip.start_lat));

  useEffect(() => {
    loader.load().then(async () => {
      const { google } = window;
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 35.6762, lng: 139.6503 },
        zoom: 12,
      });
    });
  }, []);
  
  return (
    <>
      <div className="map">
        <div id="map" className="map-container"></div>
      </div>
    </>
    
  );
};

export default MapContainer;

