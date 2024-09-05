import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './FlightMap.css';

const FlightMap = () => {
  const cesiumContainer = useRef(null);
  const viewer = useRef(null);

  useEffect(() => {
    const initializeCesium = async () => {
      const cesiumToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
      if (cesiumToken) {
        Cesium.Ion.defaultAccessToken = cesiumToken;
      } else {
        console.error('Cesium Ion token not found. Please set VITE_CESIUM_ION_TOKEN in your environment.');
        return;
      }

      if (cesiumContainer.current) {
        viewer.current = new Cesium.Viewer(cesiumContainer.current, {
          terrainProvider: await Cesium.createWorldTerrainAsync({
            requestVertexNormals: false,
            requestWaterMask: false
          }),
          baseLayerPicker: false,
          geocoder: false,
          navigationHelpButton: false,
          sceneModePicker: false,
          homeButton: false,
          timeline: false,
          animation: false,
          creditsDisplay: false
        });

        // Apply WebGL optimizations
        const scene = viewer.current.scene;
        const globe = scene.globe;

        // Terrain optimization
        globe.maximumScreenSpaceError = 2;
        globe.tileCacheSize = 100;
        globe.preloadSiblings = true;

        // Rendering optimization
        scene.requestRenderMode = true;
        scene.maximumRenderTimeChange = 0.0;

        // Atmosphere and lighting optimization
        scene.skyAtmosphere.show = false;
        scene.fog.enabled = false;
        globe.enableLighting = false;

        // Disable shadows if not needed
        viewer.current.shadows = false;

        // Camera setup
        viewer.current.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(-75.10, 39.57, 5000000),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: Cesium.Math.toRadians(0.0),
          },
        });

        // Add flight route
        const flightRoute = viewer.current.entities.add({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              -74.006, 40.7128, 1000, // New York
              2.3522, 48.8566, 1000 // Paris
            ]),
            width: 2,
            material: Cesium.Color.RED,
          },
        });

        viewer.current.zoomTo(flightRoute);
      }
    };

    initializeCesium();

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