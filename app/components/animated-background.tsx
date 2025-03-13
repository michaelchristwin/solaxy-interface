import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { Mesh } from "three";
import { useRef } from "react";

const RotatingWireframe: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime();
      meshRef.current.rotation.y = clock.getElapsedTime();
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[0.8, 1]}>
      <meshBasicMaterial attach="material" color="#0077FF" wireframe={true} />
    </Icosahedron>
  );
};

const GlowingGem: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const scale = Math.cos(Math.sin(clock.getElapsedTime() / 2));
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.x = clock.getElapsedTime();
      meshRef.current.rotation.y = -clock.getElapsedTime();
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[0.5, 0]}>
      <meshStandardMaterial
        attach="material"
        color="#FFD700"
        emissive="#FFC107"
        roughness={0.8}
        metalness={1}
      />
    </Icosahedron>
  );
};

const AnimatedBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <color attach="background" args={["transparent"]} />

        <RotatingWireframe />
        <GlowingGem />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
