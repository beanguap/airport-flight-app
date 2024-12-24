// src/components/WorldMap.jsx
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

// Use a working TopoJSON from world-atlas
// (v2 includes the countries-110m.json file)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = ({ trips }) => {
  // Hardcoded dictionary of some airport IATA codes to [lng, lat]
  const airportCoordinates = {
    JFK: [-73.7781, 40.6413],
    LAX: [-118.4085, 33.9416],
    ORD: [-87.9048, 41.9742],
    MIA: [-80.2870, 25.7959],
  };

  // Get unique airports
  const visitedAirports = trips.reduce((acc, trip) => {
    acc.add(trip.departureAirport);
    acc.add(trip.destinationAirport);
    return acc;
  }, new Set());

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>

        {Array.from(visitedAirports).map((airport) => {
          const coords = airportCoordinates[airport];
          if (!coords) {
            console.warn(`Coordinates not found for airport: ${airport}`);
            return null;
          }
          return (
            <Marker key={airport} coordinates={coords}>
              <circle r={5} fill="#F53" />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {airport}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
