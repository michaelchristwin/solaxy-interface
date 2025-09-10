import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type React from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface GemProps {
  position: [number, number, number];
}

const Gem: React.FC<GemProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Create environment map for reflections
  const cubeRenderTarget = useMemo(
    () => new THREE.WebGLCubeRenderTarget(256),
    []
  );
  const cubeCamera = useMemo(
    () => new THREE.CubeCamera(0.1, 10, cubeRenderTarget),
    [cubeRenderTarget]
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Update environment map periodically
    if (Math.floor(time) % 2 === 0) {
      meshRef.current.visible = false;
      cubeCamera.update(state.gl, scene);
      meshRef.current.visible = true;
    }

    // Pulsing animation with multiple sine waves
    const pulseA = Math.sin(time * 1.5) * 0.1;
    const pulseB = Math.sin(time * 0.8) * 0.05;
    const scale = 1 + pulseA + pulseB;
    meshRef.current.scale.set(scale, scale, scale);

    // Rotation animation
    meshRef.current.rotation.x = time * 0.8;
    meshRef.current.rotation.y = time * -1.2;
    meshRef.current.rotation.z = time * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[0.25, 0]} />
      <meshPhysicalMaterial
        color={new THREE.Color(0x555500)}
        emissive={new THREE.Color(0xffd700)}
        roughness={0.4}
        metalness={0.9}
        reflectivity={0.8}
        clearcoat={0}
        clearcoatRoughness={0.2}
        envMap={cubeRenderTarget.texture}
      />
    </mesh>
  );
};

const Wireframe: React.FC = () => {
  const meshRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.7;
  });

  return (
    <lineSegments ref={meshRef}>
      <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 1)]} />
      <lineBasicMaterial color={new THREE.Color(0xffd800)} linewidth={2} />
    </lineSegments>
  );
};

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight color={new THREE.Color(0x404040)} intensity={0.5} />
      <pointLight
        position={[2, 2, 2]}
        color={new THREE.Color(0xffffff)}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[-2, -2, 0]}
        color={new THREE.Color(0xffffff)}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[4, 2, 2]}
        color={new THREE.Color(0xffffff)}
        intensity={1}
        distance={100}
        decay={1.0}
      />
      <pointLight
        position={[-2, 2, 3]}
        color={new THREE.Color(0xffffff)}
        intensity={1}
        distance={100}
        decay={1.0}
      />
    </>
  );
};

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
        camera={{
          fov: 75,
          aspect: 2,
          near: 0.1,
          far: 7,
          position: [0, 0, 1],
        }}
        gl={{
          antialias: true,
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
            autoUpdate: false,
            needsUpdate: false,
            render: (
              shadowsArray: THREE.Light[],
              scene: THREE.Scene,
              camera: THREE.Camera
            ): void => {
              console.log(scene);
              console.log(camera);
              console.log(shadowsArray);
            },
            cullFace: undefined,
          },
        }}
        scene={{ background: new THREE.Color(backgroundColor) }}
      >
        <Lights />
        <Gem position={[0.45, 0, 0]} />
        <Wireframe />
      </Canvas>
    </div>
  );
};

export default GemAnimation;
