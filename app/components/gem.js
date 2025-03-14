import * as THREE from "three";

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGL1Renderer({ canvas });

const fov = 75,
  aspect = 2,
  near = 0.1,
  far = 5,
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 1;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");

const gemRadius = 0.4;
const gemGeometry = new THREE.IcosahedronBufferGeometry(gemRadius);
const gemMaterial = new THREE.MeshStandardMaterial({
  color: 0x114477,
  emissive: 0xfcc001,
  roughness: 0.8,
  metalness: 1,
});
const gem = new THREE.Mesh(gemGeometry, gemMaterial);
scene.add(gem);

const radius = 1;
const detail = 1;
const geometry = new THREE.IcosahedronBufferGeometry(radius, detail);

const material = new THREE.MeshBasicMaterial({
  color: 0xffd800,
  wireframe: true,
  wireframeLinewidth: 1,
});

const object = new THREE.Mesh(geometry, material);
scene.add(object);

//ライト
function makePointLight(color, intense, dist, decay) {
  const pointLight = new THREE.PointLight({ color, intense, dist, decay });
  scene.add(pointLight);

  return pointLight;
}

const lights = [
  makePointLight(0xffffff, 1, 100, 1.0),
  makePointLight(0xffffff, 1, 100, 1.0),
  makePointLight(0xc1b6ff, 1, 100, 1.0),
  makePointLight(0xc1b6ff, 1, 100, 1.0),
];

lights[0].position.set(2, 2, 2);
lights[1].position.set(-2, -2, 0);
lights[2].position.set(4, 2, 2);
lights[3].position.set(-2, 2, 3);

///リサイズ

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

///レンダー

function render(time) {
  time *= 0.001; // convert time to seconds

  //resiponsiveに対応
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  object.rotation.x = time;
  object.rotation.y = time;

  gem.scale.x = gem.scale.y = gem.scale.z = Math.cos(Math.sin(time / 2));

  gem.rotation.x = time;
  gem.rotation.y = time * -1;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
