import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const HeroCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Particle Field
    const particlesCount = window.innerWidth < 768 ? 200 : 600;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorChoices = [new THREE.Color('#1E3A5F'), new THREE.Color('#2D4A6B')];

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 2. Prism Model (Wireframe Triangle)
    const prismGroup = new THREE.Group();
    const prismGeometry = new THREE.ConeGeometry(0.5, 1, 3);
    const prismEdges = new THREE.EdgesGeometry(prismGeometry);
    const prismMaterial = new THREE.LineBasicMaterial({ color: '#2D4A6B' });
    const prismWireframe = new THREE.LineSegments(prismEdges, prismMaterial);
    prismWireframe.rotation.x = Math.PI / 2;
    prismGroup.add(prismWireframe);

    // 3. Refraction Rays
    const createRay = (color: string, angle: number) => {
      const points = [
        new THREE.Vector3(0.4, 0, 0),
        new THREE.Vector3(2.5, Math.tan(angle) * 2.1, 0)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
      const line = new THREE.Line(geometry, material);
      return line;
    };

    const rayGreen = createRay('#16A34A', Math.PI / 12); // 15 deg
    const rayAmber = createRay('#F59E0B', 0);
    const rayRed = createRay('#DC2626', -Math.PI / 12); // -15 deg

    prismGroup.add(rayGreen, rayAmber, rayRed);
    scene.add(prismGroup);

    // Animate rays in
    gsap.to([rayGreen.material, rayAmber.material, rayRed.material], {
      opacity: 1,
      duration: 1.5,
      delay: 0.5,
      stagger: 0.2
    });

    // Interaction & Animation
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate camera & particles
      camera.rotation.y = elapsedTime * 0.02;
      particles.rotation.y = elapsedTime * 0.01;
      
      // Prism tilt
      prismGroup.rotation.y = THREE.MathUtils.lerp(prismGroup.rotation.y, mouse.x * 0.4, 0.05);
      prismGroup.rotation.x = THREE.MathUtils.lerp(prismGroup.rotation.x, mouse.y * 0.4, 0.05);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 select-none pointer-events-none" />;
};
