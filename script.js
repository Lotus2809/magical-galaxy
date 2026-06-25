import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.set(0, 90, 180);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const starCount = 100000;

const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);

const insideColor = new THREE.Color("#ffffff");
const outsideColor = new THREE.Color("#ff00ff");

for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;

    const radius = Math.random() * 100;
    const angle = radius * 0.25 + (i % 5) * ((Math.PI * 2) / 5);

    positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 15;
    positions[i3 + 1] = (Math.random() - 0.5) * 15;
    positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 15;

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / 100);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

function animate() {
    requestAnimationFrame(animate);

    galaxy.rotation.y += 0.002;
    galaxy.rotation.x = 0.7;

    renderer.render(scene, camera);
}

animate();