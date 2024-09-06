import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './FlightMap.css';

const CesiumMap = ({ title, isExpanded, onToggle }) => {
  const mapRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (mapRef.current && !viewerRef.current) {
        try {
          const terrainProvider = await Cesium.createWorldTerrainAsync({
            requestVertexNormals: false,
            requestWaterMask: false
          });

          const viewer = new Cesium.Viewer(mapRef.current, {
            terrainProvider,
            baseLayerPicker: false,
            geocoder: true,
            navigationHelpButton: false,
            sceneModePicker: false,
            homeButton: false,
            timeline: false,
            animation: false,
            creditsDisplay: false
          });

          // Apply WebGL optimizations
          const scene = viewer.scene;
          const globe = scene.globe;

          globe.maximumScreenSpaceError = 2;
          globe.tileCacheSize = 100;
          globe.preloadSiblings = true;

          scene.requestRenderMode = true;
          scene.maximumRenderTimeChange = 0.0;

          scene.skyAtmosphere.show = false;
          scene.fog.enabled = false;
          globe.enableLighting = false;

          viewer.shadows = false;

          viewerRef.current = viewer;
        } catch (error) {
          console.error('Error initializing Cesium map:', error);
        }
      }
    };

    initializeMap();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.resize();
    }
  }, [isExpanded]);

  return (
    <div className={`map-container ${isExpanded ? 'expanded' : 'shrunk'}`}>
      <div className="map-header">
        <h3 className="map-title">{title}</h3>
        <button className="toggle-button" onClick={onToggle}>
          {isExpanded ? '↓' : '↑'}
        </button>
      </div>
      <div ref={mapRef} className="cesium-container" />
    </div>
  );
};

CesiumMap.propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const FlightMap = () => {
  const [map1Expanded, setMap1Expanded] = useState(true);
  const [map2Expanded, setMap2Expanded] = useState(false);

  useEffect(() => {
    const cesiumToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
    if (cesiumToken) {
      Cesium.Ion.defaultAccessToken = cesiumToken;
    } else {
      console.error('Cesium Ion token not found. Please set VITE_CESIUM_ION_TOKEN in your environment.');
    }
  }, []);

  const handleMap1Toggle = useCallback(() => {
    setMap1Expanded(prev => !prev);
  }, []);

  const handleMap2Toggle = useCallback(() => {
    setMap2Expanded(prev => !prev);
  }, []);

  return (
    <div className="flight-map">
      <CesiumMap
        title="Departure Map"
        isExpanded={map1Expanded}
        onToggle={handleMap1Toggle}
      />
      <CesiumMap
        title="Arrival Map"
        isExpanded={map2Expanded}
        onToggle={handleMap2Toggle}
      />
    </div>
  );
};

export default FlightMap;
