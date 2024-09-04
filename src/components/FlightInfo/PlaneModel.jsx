import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PlaneModel = ({ width, height }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let controls;

    loader.load(
      '/src/assets/boeing767/scene.gltf',
      (gltf) => {
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
      (error) => console.error('An error occurred loading the model:', error)
    );

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Add OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
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
      currentRef.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      controls.dispose(); // Dispose of controls
      renderer.dispose(); // Dispose of renderer
      scene.clear(); // Clear the scene
    };
  }, [width, height]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

PlaneModel.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PlaneModel;
