import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './FlightMap.css';

const FlightMap = () => {
  const cesiumContainer = useRef(null);
  const viewer = useRef(null);

  useEffect(() => {
    const cesiumToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
    if (cesiumToken) {
      Cesium.Ion.defaultAccessToken = cesiumToken;
    } else {
      console.error('Cesium Ion token not found. Please set VITE_CESIUM_ION_TOKEN in your environment.');
      return;
    }

    if (cesiumContainer.current) {
      viewer.current = new Cesium.Viewer(cesiumContainer.current, {
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: Cesium.IonResource.fromAssetId(1),
        }),
        // ... other viewer options ...
      });

      viewer.current.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-75.10, 39.57, 5000000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: Cesium.Math.toRadians(0.0),
        },
      });

      const addTileset = async () => {
        try {
          const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
          viewer.current.scene.primitives.add(tileset);
          viewer.current.zoomTo(tileset);
        } catch (error) {
          console.error('Error loading tileset:', error);
        }
      };

      addTileset();

      viewer.current.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -74.006, 40.7128, 1000, // New York
            2.3522, 48.8566, 1000   // Paris
          ]),
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