import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelPath from '../../assets/boeing767/scene.gltf'; // Adjust this path if necessary

const PlaneModel = ({ width, height, lightPosition, lightIntensity, castShadow }) => {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let controls;

    console.log('Attempting to load model from path:', modelPath);

    // Pre-fetch to check if the file can be loaded
    fetch(modelPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log('First 100 characters of the file:', data.slice(0, 100));
        loader.load(
          modelPath,
          (gltf) => {
            console.log('Model loaded successfully:', gltf);
            scene.add(gltf.scene);
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 1 / maxDim;
            gltf.scene.scale.set(scale, scale, scale);
            gltf.scene.position.sub(center.multiplyScalar(scale));
            // Set up camera position
            camera.position.z = 2;
          },
          undefined,
          (error) => {
            console.error('An error occurred loading the model:', error);
            setError(`Failed to load the 3D model: ${error.message}`);
          }
        );
      })
      .catch(fetchError => {
        console.error('Fetch error:', fetchError);
        setError(`Could not fetch the model file: ${fetchError.message}`);
      });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(...lightPosition);
    directionalLight.intensity = lightIntensity;
    directionalLight.castShadow = castShadow;
    scene.add(directionalLight);

    // Add OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Update camera aspect ratio and renderer size on window resize
    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentRef.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [width, height, lightPosition, lightIntensity, castShadow]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

PlaneModel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lightPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  lightIntensity: PropTypes.number.isRequired,
  castShadow: PropTypes.bool.isRequired,
};

export default PlaneModel;