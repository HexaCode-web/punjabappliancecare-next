"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }) {
  const mapRef = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLEMAP,
      version: "weekly",
    });

    let map, geocoder;

    loader.load().then(() => {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 13,
          });
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    });

    // Clean up on unmount
    return () => {
      if (map) map = null;
      if (geocoder) geocoder = null;
    };
  }, [address]);

  return (
    <div
      style={{
        height: "400px",
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        marginBottom: "100px",
      }}
      ref={mapRef}
    />
  );
}

export default Map;
