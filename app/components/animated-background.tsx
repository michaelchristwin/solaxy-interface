import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface GemAnimationProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const GemAnimation: React.FC<GemAnimationProps> = ({
  width = "100%",
  height = "100vh",
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    gem?: THREE.Mesh;
    wireframe?: THREE.Mesh;
    frameId?: number;
  }>({});

  // Setup scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    // Camera setup
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Create gem
    const gemRadius = 0.4;
    const gemGeometry = new THREE.IcosahedronGeometry(gemRadius);
    const gemMaterial = new THREE.MeshStandardMaterial({
      color: 0x114477,
      emissive: 0xfcc001,
      roughness: 0.8,
      metalness: 1,
    });
    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    scene.add(gem);

    // Create wireframe
    const wireframeRadius = 1;
    const wireframeDetail = 1;
    const wireframeGeometry = new THREE.IcosahedronGeometry(
      wireframeRadius,
      wireframeDetail
    );
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd800,
      wireframe: true,
      wireframeLinewidth: 1,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Create lights
    const createPointLight = (
      color: number | string,
      intensity: number,
      distance: number,
      decay: number,
      position: [number, number, number]
    ) => {
      const light = new THREE.PointLight(color, intensity, distance, decay);
      light.position.set(...position);
      scene.add(light);
      return light;
    };

    createPointLight(0xffffff, 1, 100, 1.0, [2, 2, 2]);
    createPointLight(0xffffff, 1, 100, 1.0, [-2, -2, 0]);
    createPointLight(0xc1b6ff, 1, 100, 1.0, [4, 2, 2]);
    createPointLight(0xc1b6ff, 1, 100, 1.0, [-2, 2, 3]);

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !renderer || !camera) return;

      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;

      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      return needResize;
    };

    // Animation function
    const animate = (time: number) => {
      time *= 0.001; // Convert to seconds

      handleResize();

      if (wireframe) {
        wireframe.rotation.x = time;
        wireframe.rotation.y = time;
      }

      if (gem) {
        const scale = Math.cos(Math.sin(time / 2));
        gem.scale.set(scale, scale, scale);
        gem.rotation.x = time;
        gem.rotation.y = time * -1;
      }

      renderer.render(scene, camera);
      mountRef.current.frameId = requestAnimationFrame(animate);
    };

    // Start animation
    mountRef.current = { renderer, scene, camera, gem, wireframe };
    handleResize();
    mountRef.current.frameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (mountRef.current.frameId !== undefined) {
        cancelAnimationFrame(mountRef.current.frameId);
      }
      if (mountRef.current.renderer) {
        mountRef.current.renderer.dispose();
      }
      // Clean up geometries and materials
      gemGeometry.dispose();
      gemMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, [backgroundColor]);

  // Handle window resize
  useEffect(() => {
    const handleWindowResize = () => {
      // Trigger a resize of our canvas
      if (canvasRef.current) {
        const event = new Event("resize");
        window.dispatchEvent(event);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        zIndex: -1,
        position: "fixed", // Changed from default to fixed
        top: 0, // Added to position at the top
        left: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default GemAnimation;
