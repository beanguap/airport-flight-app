import  { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const FlightMap = () => {
  const cesiumContainer = useRef(null);
  const viewer = useRef(null);

  useEffect(() => {
    if (cesiumContainer.current) {
      viewer.current = new Cesium.Viewer(cesiumContainer.current, {
        terrainProvider: Cesium.createWorldTerrain(),
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
      });

      // Example: Add a flight path
      const start = Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 1000);
      const end = Cesium.Cartesian3.fromDegrees(2.3522, 48.8566, 1000);

      viewer.current.entities.add({
        polyline: {
          positions: [start, end],
          width: 2,
          material: Cesium.Color.RED,
        },
      });

      viewer.current.zoomTo(viewer.current.entities);
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flight-map bg-white rounded-2xl shadow-lg overflow-hidden">
      <h3 className="text-xl font-semibold p-4 bg-gray-50">Flight Route</h3>
      <div ref={cesiumContainer} style={{ height: '500px' }} />
    </div>
  );
};

export default FlightMap;