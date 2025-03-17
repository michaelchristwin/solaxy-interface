import React, { useEffect, useRef } from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

interface GemAnimationProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const GemAnimation2: React.FC<GemAnimationProps> = ({
  width = "100%",
  height = "100vh",
  backgroundColor = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountRef = useRef<{
    engine?: BABYLON.Engine;
    scene?: BABYLON.Scene;
    gem?: BABYLON.Mesh;
    wireframe?: BABYLON.Mesh;
  }>({});

  // Setup scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize engine with improved settings
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true,
      adaptToDeviceRatio: true,
    });

    // Create scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromHexString(backgroundColor + "FF");

    // Camera setup
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      Math.PI / 2,
      1,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, 1));
    camera.fov = 75 * (Math.PI / 180);
    camera.minZ = 0.1;
    camera.maxZ = 7;
    camera.attachControl(canvasRef.current, true, true);

    // Add ambient light for base illumination
    const ambientLight = new BABYLON.HemisphericLight(
      "ambientLight",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 0.5;
    ambientLight.diffuse = new BABYLON.Color3(0.25, 0.25, 0.25);

    // Create gem
    const gemRadius = 0.4;
    const gem = BABYLON.MeshBuilder.CreateIcoSphere(
      "gem",
      { radius: gemRadius, subdivisions: 0 },
      scene
    );
    gem.position.x = 0.8; // Move to the right

    // Create environment for reflections
    const envTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "https://playground.babylonjs.com/textures/environment.dds",
      scene
    );
    scene.environmentTexture = envTexture;

    // Create PBR material for gem
    const gemMaterial = new BABYLON.PBRMaterial("gemMaterial", scene);
    gemMaterial.albedoColor = new BABYLON.Color3(0.33, 0.33, 0);
    gemMaterial.emissiveColor = new BABYLON.Color3(1, 0.84, 0);
    gemMaterial.roughness = 0.4;
    gemMaterial.metallic = 0.9;
    gemMaterial.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    gemMaterial.clearCoat.isEnabled = true;
    gemMaterial.clearCoat.intensity = 0;
    gemMaterial.clearCoat.roughness = 0.2;
    gemMaterial.environmentIntensity = 0.8;

    gem.material = gemMaterial;
    gem.receiveShadows = true;

    // Create wireframe
    const wireframeRadius = 1;
    const wireframe = BABYLON.MeshBuilder.CreateIcoSphere(
      "wireframe",
      { radius: wireframeRadius, subdivisions: 1 },
      scene
    );

    const wireframeMaterial = new BABYLON.StandardMaterial(
      "wireframeMaterial",
      scene
    );
    wireframeMaterial.emissiveColor = new BABYLON.Color3(1, 0.85, 0);
    wireframeMaterial.wireframe = true;
    wireframe.material = wireframeMaterial;

    // Create lights
    const createPointLight = (position: BABYLON.Vector3) => {
      const light = new BABYLON.PointLight("pointLight", position, scene);
      light.intensity = 1;
      light.range = 100;
      return light;
    };

    createPointLight(new BABYLON.Vector3(2, 2, 2));
    createPointLight(new BABYLON.Vector3(-2, -2, 0));
    createPointLight(new BABYLON.Vector3(4, 2, 2));
    createPointLight(new BABYLON.Vector3(-2, 2, 3));

    // Animation
    let time = 0;
    scene.onBeforeRenderObservable.add(() => {
      time += engine.getDeltaTime() / 1000;

      // Wireframe rotation
      if (wireframe) {
        wireframe.rotation.x = time * 0.5;
        wireframe.rotation.y = time * 0.7;
      }

      // Gem animation
      if (gem) {
        // Pulsing with multiple sine waves
        const pulseA = Math.sin(time * 1.5) * 0.1;
        const pulseB = Math.sin(time * 0.8) * 0.05;
        const scale = 1 + pulseA + pulseB;
        gem.scaling = new BABYLON.Vector3(scale, scale, scale);

        // Different rotation speeds
        gem.rotation.x = time * 0.8;
        gem.rotation.y = time * -1.2;
        gem.rotation.z = time * 0.3;
      }
    });

    // Handle resize
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    // Start render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Store references
    mountRef.current = { engine, scene, gem, wireframe };

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, [backgroundColor]);

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

export default GemAnimation2;
