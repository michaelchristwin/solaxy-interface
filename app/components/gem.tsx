import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CubeCamera } from "@react-three/drei";
import * as THREE from "three";

interface GemAnimationProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

// Resize helper to mimic manual resize handling
function ResizeHandler() {
  const { gl, camera } = useThree();
  useEffect(() => {
    function handleResize() {
      const canvas = gl.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      if (canvas.width !== width || canvas.height !== height) {
        gl.setSize(width, height, false);
        (camera as THREE.PerspectiveCamera).aspect =
          canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gl, camera]);
  return null;
}

// Gem component with environment map update using CubeCamera
function Gem() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cubeCameraRef = useRef<any>(null); // CubeCamera ref (type any for simplicity)
  const { gl, scene } = useThree();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      // Update pulsing scale
      const pulseA = Math.sin(time * 1.5) * 0.1;
      const pulseB = Math.sin(time * 0.8) * 0.05;
      const scale = 1 + pulseA + pulseB;
      meshRef.current.scale.set(scale, scale, scale);
      // Update rotations
      meshRef.current.rotation.set(time * 0.8, time * -1.2, time * 0.3);
    }
    // Update the cube camera (environment map) every 2 seconds
    if (Math.floor(time) % 2 === 0 && cubeCameraRef.current) {
      if (meshRef.current) meshRef.current.visible = false;
      cubeCameraRef.current.update(gl, scene);
      if (meshRef.current) meshRef.current.visible = true;
    }
  });

  return (
    <CubeCamera resolution={256} frames={0} ref={cubeCameraRef}>
      {(texture) => (
        <mesh ref={meshRef} position={[0.45, 0, 0]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshPhysicalMaterial
            color={0x555500}
            emissive={0xffd700}
            roughness={0.4}
            metalness={0.9}
            reflectivity={0.8}
            clearcoat={0}
            clearcoatRoughness={0.2}
            envMap={texture}
          />
        </mesh>
      )}
    </CubeCamera>
  );
}

// Wireframe component, replicating the EdgesGeometry-based wireframe
function Wireframe() {
  const ref = useRef<THREE.LineSegments>(null!);
  // Create the wireframe geometry using Icosahedron and EdgesGeometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);
  // Create material matching your parameters
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: 0xffd800, linewidth: 2 }),
    []
  );
  // Animate wireframe rotation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = time * 0.5;
      ref.current.rotation.y = time * 0.7;
    }
  });
  return <lineSegments ref={ref} geometry={geometry} material={material} />;
}

// Lights replicating your makePointLight calls and positions
function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color={0x404040} />
      <pointLight
        position={[2, 2, 2]}
        color={0xffffff}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[-2, -2, 0]}
        color={0xffffff}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[4, 2, 2]}
        color={0xffffff}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[-2, 2, 3]}
        color={0xffffff}
        intensity={1}
        distance={100}
        decay={1.0}
      />
    </>
  );
}

// Main GemAnimation component
const GemAnimation: React.FC<GemAnimationProps> = ({
  width = "100%",
  height = "100vh",
  backgroundColor = "#ffffff",
}) => {
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
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={window.devicePixelRatio}
        camera={{ fov: 75, aspect: 2, near: 0.1, far: 7, position: [0, 0, 1] }}
      >
        {/* Set background color */}
        <color attach="background" args={[backgroundColor]} />
        <ResizeHandler />
        <Lights />
        <Gem />
        <Wireframe />
      </Canvas>
    </div>
  );
};

export default GemAnimation;
