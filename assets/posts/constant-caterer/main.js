import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, 500/300, 1, 2000 );
camera.position.z = 250;
camera.position.y = 250;
camera.position.x = 250;

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 100;

const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

let element = document.getElementById("3d-model");
const renderer = new THREE.WebGLRenderer({canvas : element, alpha : true});
let width = Math.min(500, element.parentElement.clientWidth);
renderer.setSize( width, 300*width/500 );

const loader = new STLLoader();
const geometry = await loader.loadAsync( '/assets/posts/constant-caterer/hbar-compressed.stl' );
const material = new THREE.MeshPhongMaterial( { color: 0x000FFF } );
const hbar = new THREE.Mesh( geometry, material);

hbar.rotation.x = -1.57;
hbar.translateX(-50);
hbar.translateZ(-100);

const group = new THREE.Group();
group.add(hbar);
scene.add(group);

let orbit = new OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;
orbit.enablePan = false;
orbit.update();
orbit.addEventListener( 'change', render );

function animate() {
  group.rotation.y += -0.01;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

function render() {
  renderer.render(scene, camera);
}
