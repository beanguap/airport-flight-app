import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './FlightMap.css'; // Import the CSS file

const FlightMap = () => {
  const cesiumContainer = useRef(null);
  const viewer = useRef(null);

  useEffect(() => {
    // Set Cesium Ion token using Vite environment variable
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

    if (cesiumContainer.current) {
      viewer.current = new Cesium.Viewer(cesiumContainer.current, {
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: Cesium.IonResource.fromAssetId(1), // Cesium World Terrain asset ID
        }),
        animation: true,
        baseLayerPicker: true,
        fullscreenButton: true,
        vrButton: true,
        geocoder: true,
        homeButton: true,
        infoBox: true,
        sceneModePicker: true,
        selectionIndicator: true,
        timeline: true,
        navigationHelpButton: true,
      });

      // Set the initial view to a location where the globe should be visible
      viewer.current.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-75.10, 39.57, 5000000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: Cesium.Math.toRadians(0.0),
        },
      });

      // Add a 3D Tileset from Cesium Ion
      const addTileset = async () => {
        try {
          const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207); // Your asset ID
          viewer.current.scene.primitives.add(tileset);

          // Adjust the view to the tileset
          viewer.current.zoomTo(tileset);
        } catch (error) {
          console.error('Error loading tileset:', error);
        }
      };

      addTileset();

      // Example: Add a flight path
      const start = Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 1000); // New York City
      const end = Cesium.Cartesian3.fromDegrees(2.3522, 48.8566, 1000); // Paris

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
        viewer.current = null;
      }
    };
  }, []);

  return (
    <div className="flight-map">
      <h3 className="flight-map-title">Flight Route</h3>
      <div ref={cesiumContainer} className="cesium-container" />
    </div>
  );
};

export default FlightMap;
