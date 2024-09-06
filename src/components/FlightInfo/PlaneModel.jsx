import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const modelPath = 'src/assets/boeing-767/source/boeing-767.gltf';

const PlaneModel = ({
  width,
  height,
  lightPosition = { x: 10, y: 10, z: 10 },
  lightIntensity = 1,
  castShadow = true,
}) => {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let scene, camera, renderer, controls, model, animationFrameId;

    const initScene = () => {
      // Initialize scene, camera, renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true; // enable shadow map
      mountRef.current.appendChild(renderer.domElement);

      // Add light
      const light = new THREE.PointLight(0xffffff, lightIntensity);
      light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
      light.castShadow = castShadow;
      scene.add(light);

      // Camera positioning
      camera.position.z = 5;

      // Initialize controls
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

          // Center and scale the model
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

    initScene();
    loadModel();
    animate();

    window.addEventListener('resize', onWindowResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [width, height, lightPosition, lightIntensity, castShadow]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {error && <div>Error loading model: {error.message}</div>}
    </div>
  );
};

PlaneModel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lightPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  lightIntensity: PropTypes.number,
  castShadow: PropTypes.bool,
};

export default PlaneModel;
