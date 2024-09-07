import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlaneModel = ({
  width,
  height,
  modelPath,
  lightPosition = { x: 10, y: 10, z: 10 },
  lightIntensity = 1,
  castShadow = true,
}) => {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let scene, camera, renderer, controls, model, animationFrameId;

    const initScene = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      mountRef.current.appendChild(renderer.domElement);

      const light = new THREE.PointLight(0xffffff, lightIntensity);
      light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      light.castShadow = castShadow;
      scene.add(light);

      camera.position.z = 5;

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
    };

    const loadModel = () => {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          model = gltf.scene;
          scene.add(model);

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          model.scale.set(scale, scale, scale);
          model.position.sub(center.multiplyScalar(scale));
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setError(error);
        }
      );
    };

    const onWindowResize = () => {
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    try {
      initScene();
      loadModel();
      animate();
      window.addEventListener('resize', onWindowResize);
    } catch (err) {
      console.error('Error initializing scene:', err);
      setError(err);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [width, height, modelPath, lightPosition, lightIntensity, castShadow]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {error && <div>Error loading model: {error.message}</div>}
    </div>
  );
};

PlaneModel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  modelPath: PropTypes.string.isRequired,
  lightPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  lightIntensity: PropTypes.number,
  castShadow: PropTypes.bool,
};

export default PlaneModel;