import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles Setup
    const particleCount = 30000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Initial positions (Random sphere)
    for (let i = 0; i < particleCount; i++) {
      const r = 40 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      colors[i * 3] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 2] = 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Shader Material for Glow Effect
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Target Shapes Data
    const shapes: Float32Array[] = [];
    const shapeNames = [
      'Vortex', 
      'Koch', 
      'Cardioid', 
      'Butterfly', 
      'Archimedean', 
      'Catenary', 
      'Lemniscate', 
      'Rose'
    ];
    let currentShapeIndex = 0;

    // Helper to add noise
    const addNoise = (val: number) => val + (Math.random() - 0.5) * 1.5;

    // 1. Vortex (Galaxy)
    const vortexPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = i * 0.002;
      const r = (i / particleCount) * 30;
      const spiralAngle = angle + r * 0.5;
      
      vortexPos[i * 3] = r * Math.cos(spiralAngle) + (Math.random() - 0.5) * 2;
      vortexPos[i * 3 + 1] = (Math.random() - 0.5) * 2; // Flat galaxy
      vortexPos[i * 3 + 2] = r * Math.sin(spiralAngle) + (Math.random() - 0.5) * 2;
    }
    shapes.push(vortexPos);

    // 2. Koch Curve (Approximation via fractal-like noise on a line/triangle)
    // Real 3D Koch is complex, let's do a 3D Snowflake-ish structure
    const kochPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // Distribute on a sphere but with fractal noise displacement
        const rBase = 15;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        // Add "spikes" based on angles to simulate fractal growth
        const spike = Math.abs(Math.sin(theta * 6) * Math.cos(phi * 6)) * 5;
        const r = rBase + spike + (Math.random() - 0.5);

        kochPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        kochPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        kochPos[i * 3 + 2] = r * Math.cos(phi);
    }
    shapes.push(kochPos);

    // 3. Cardioid (Heart) - 3D rotation
    const cardioidPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI; // Rotation
      
      // 2D Cardioid equation: r = 2(1 - cos(t))
      // We'll rotate this 2D shape to make a 3D volume
      const r = 10 * (1 - Math.cos(t)); 
      
      // Convert to 3D
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = (Math.random() - 0.5) * 5; // Thickness

      // Rotate to stand up
      cardioidPos[i * 3] = x;
      cardioidPos[i * 3 + 1] = y + 5; // Offset y
      cardioidPos[i * 3 + 2] = z;
    }
    shapes.push(cardioidPos);

    // 4. Butterfly Curve
    const butterflyPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * 24 * Math.PI; // Multiple loops
      const e = 2.71828;
      const term1 = Math.pow(e, Math.cos(t));
      const term2 = 2 * Math.cos(4 * t);
      const term3 = Math.pow(Math.sin(t / 12), 5);
      
      const r = 5 * (term1 - term2 + term3);
      
      butterflyPos[i * 3] = addNoise(r * Math.sin(t));
      butterflyPos[i * 3 + 1] = addNoise(r * Math.cos(t));
      butterflyPos[i * 3 + 2] = addNoise((Math.random() - 0.5) * 5);
    }
    shapes.push(butterflyPos);

    // 5. Archimedean Spiral (3D Helix/Conical)
    const spiralPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * 10 * Math.PI;
      const r = 1 + 0.5 * t;
      
      spiralPos[i * 3] = addNoise(r * Math.cos(t));
      spiralPos[i * 3 + 1] = addNoise((i / particleCount) * 40 - 20); // Height
      spiralPos[i * 3 + 2] = addNoise(r * Math.sin(t));
    }
    shapes.push(spiralPos);

    // 6. Catenary (Hanging Chain) - Multiple chains
    const catenaryPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const chainIdx = i % 5; // 5 chains
        const x = ((i / particleCount) * 5 - 2.5) * 10; // Range -25 to 25
        const a = 5 + chainIdx * 2;
        const y = a * Math.cosh(x / a) - 15; // Offset
        
        catenaryPos[i * 3] = addNoise(x);
        catenaryPos[i * 3 + 1] = addNoise(y);
        catenaryPos[i * 3 + 2] = addNoise((chainIdx - 2) * 5); // Depth separation
    }
    shapes.push(catenaryPos);

    // 7. Lemniscate of Bernoulli (Infinity)
    const lemniscatePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * 2 * Math.PI;
        const scale = 15;
        const denom = 1 + Math.sin(t) * Math.sin(t);
        const x = scale * Math.cos(t) / denom;
        const y = scale * Math.sin(t) * Math.cos(t) / denom;
        
        lemniscatePos[i * 3] = addNoise(x);
        lemniscatePos[i * 3 + 1] = addNoise(y);
        lemniscatePos[i * 3 + 2] = addNoise((Math.random() - 0.5) * 4);
    }
    shapes.push(lemniscatePos);

    // 8. Rose Curve (k=4)
    const rosePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const k = 4;
        const t = (i / particleCount) * 2 * Math.PI;
        const r = 15 * Math.cos(k * t);
        
        rosePos[i * 3] = addNoise(r * Math.cos(t));
        rosePos[i * 3 + 1] = addNoise(r * Math.sin(t));
        rosePos[i * 3 + 2] = addNoise((Math.random() - 0.5) * 4);
    }
    shapes.push(rosePos);


    // Animation Logic
    let transitionProgress = 0;
    let isTransitioning = false;
    let lastTime = 0;
    const transitionDuration = 3000; // ms
    const holdDuration = 4000; // ms
    let timeSinceLastSwitch = 0;

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      const delta = time - lastTime;
      lastTime = time;

      // Rotate entire system
      particles.rotation.y += 0.001;
      particles.rotation.z += 0.0005;

      // Handle Shape Transition
      if (!isTransitioning) {
        timeSinceLastSwitch += delta;
        if (timeSinceLastSwitch > holdDuration) {
            isTransitioning = true;
            transitionProgress = 0;
            currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
        }
      } else {
        transitionProgress += delta / transitionDuration;
        if (transitionProgress >= 1) {
            transitionProgress = 1;
            isTransitioning = false;
            timeSinceLastSwitch = 0;
        }

        // Interpolate positions
        const currentPositions = particles.geometry.attributes.position.array as Float32Array;
        const targetShape = shapes[currentShapeIndex];
        const prevShapeIndex = (currentShapeIndex - 1 + shapes.length) % shapes.length;
        const prevShape = shapes[prevShapeIndex];

        // Easing function
        const t = transitionProgress < 0.5 ? 2 * transitionProgress * transitionProgress : -1 + (4 - 2 * transitionProgress) * transitionProgress;

        for (let i = 0; i < particleCount * 3; i++) {
            currentPositions[i] = prevShape[i] + (targetShape[i] - prevShape[i]) * t;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" />
  );
}
