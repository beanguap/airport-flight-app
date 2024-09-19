import React, { useState, useEffect } from "react";
import axios from "axios";

const ClosestAirport = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      // Fetch the closest airport data using Overpass API
      const overpassQuery = `
        [out:json];
        (
          node["aeroway"="aerodrome"](around:50000,${location.latitude},${location.longitude});
        );
        out body;
        >;
        out skel qt;
      `;

      axios
        .get(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`,
        )
        .then((response) => {
          const airports = response.data.elements;
          if (airports.length > 0) {
            setAirport(airports[0]);
          } else {
            setAirport(null);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {airport ? (
        <div>
          <h2 style={{ color: "#ff9500" }}>Closest Airport</h2>
          <p>Name: {airport.tags.name || "Unknown"}</p>
          <p>Type: {airport.tags.aeroway}</p>
        </div>
      ) : (
        <div>No airport found.</div>
      )}
    </div>
  );
};

export default ClosestAirport;
