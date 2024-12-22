// src/components/WorldMap.jsx
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({ trips }) => {
  // You’d need lat/long for each airport. Hardcode or fetch from an API.
  // Example data: { airport: "JFK", coordinates: [-73.7781, 40.6413] }
  // For demonstration, assume you have a dictionary of airport codes -> coords
  const airportCoordinates = {
    JFK: [-73.7781, 40.6413],
    LAX: [-118.4085, 33.9416],
    ORD: [-87.9048, 41.9742],
    MIA: [-80.2870, 25.7959],
  };

  // Gather unique airports from trips
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
          if (!coords) return null;
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
