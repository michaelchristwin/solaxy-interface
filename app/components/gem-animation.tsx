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
    wireframe?: THREE.LineSegments;
    frameId?: number;
  }>({});

  // Setup scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize renderer with improved settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Camera setup - moved back for better perspective
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 7;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Create gem with improved material
    const gemRadius = 0.4;
    const gemGeometry = new THREE.IcosahedronGeometry(gemRadius, 0); // Increased detail level

    // Create environment map for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    scene.add(cubeCamera);

    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x555500,
      emissive: 0xffd700,
      roughness: 0.4,
      metalness: 0.9,
      reflectivity: 0.8,
      clearcoat: 0,
      clearcoatRoughness: 0.2,
      envMap: cubeRenderTarget.texture,
    });

    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    gem.castShadow = true;
    gem.receiveShadow = true;

    // Position the gem to the right side instead of center
    gem.position.x = 0.8; // Move to the right

    scene.add(gem);

    // Create wireframe with improved visibility - keeping it centered
    const wireframeRadius = 1;
    const wireframeDetail = 1;
    const wireframeGeometry = new THREE.IcosahedronGeometry(
      wireframeRadius,
      wireframeDetail
    );
    const edges = new THREE.EdgesGeometry(wireframeGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xffd800,
      linewidth: 2,
    });
    const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
    // wireframe position remains at (0,0,0) to cover the entire view
    scene.add(wireframe);

    //ライト
    function makePointLight(
      color: number | string,
      intensity: number,
      distance: number,
      decay: number
    ) {
      const pointLight = new THREE.PointLight(
        color,
        intensity,
        distance,
        decay
      );
      scene.add(pointLight);

      return pointLight;
    }

    const lights = [
      makePointLight(0xffffff, 1, 100, 1.0),
      makePointLight(0xffffff, 1, 100, 1.0),
      makePointLight(0xffffff, 1, 100, 1.0),
      makePointLight(0xffffff, 1, 100, 1.0),
    ];

    lights[0].position.set(2, 2, 2);
    lights[1].position.set(-2, -2, 0);
    lights[2].position.set(4, 2, 2);
    lights[3].position.set(-2, 2, 3);
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

    // Animation function with improved movement
    const animate = (time: number) => {
      time *= 0.001; // Convert to seconds

      handleResize();

      // Update environment map periodically for reflections
      if (Math.floor(time) % 2 === 0) {
        gem.visible = false;
        cubeCamera.update(renderer, scene);
        gem.visible = true;
      }

      if (wireframe) {
        wireframe.rotation.x = time * 0.5;
        wireframe.rotation.y = time * 0.7;
      }

      if (gem) {
        // More interesting pulsing with multiple sine waves
        const pulseA = Math.sin(time * 1.5) * 0.1;
        const pulseB = Math.sin(time * 0.8) * 0.05;
        const scale = 1 + pulseA + pulseB;
        gem.scale.set(scale, scale, scale);

        // Different rotation speeds for more interesting movement
        gem.rotation.x = time * 0.8;
        gem.rotation.y = time * -1.2;
        gem.rotation.z = time * 0.3;
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
      edges.dispose();
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
        position: "fixed",
        top: 0,
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
