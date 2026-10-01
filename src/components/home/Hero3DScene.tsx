import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, Database, Cpu, Wrench, Shield, CheckCircle2, Zap } from 'lucide-react';

interface Hero3DSceneProps {
  onNodeClick?: (nodeName: string) => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeChip, setActiveChip] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Conceptual UI tags that pulse/cycle
  const conceptualStatuses = [
    { label: 'Agent running', icon: Activity, detail: 'Decomposing task tree · 4 subroutines active', color: 'text-blue-500' },
    { label: 'Knowledge retrieved', icon: Database, detail: 'Dense & sparse index fused · 3 citations verified', color: 'text-cyan-500' },
    { label: 'Workflow automated', icon: Zap, detail: 'Idempotent webhook dispatched · 0ms error queue', color: 'text-indigo-500' },
    { label: 'Prediction generated', icon: Cpu, detail: 'Sequence anomaly score < 0.04 · Optimal route', color: 'text-violet-500' },
    { label: 'Task completed', icon: CheckCircle2, detail: 'Deterministic state confirmed · Audit trail signed', color: 'text-emerald-500' },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReduced);

    const interval = setInterval(() => {
      setActiveChip((prev) => (prev + 1) % conceptualStatuses.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile = window.innerWidth < 768;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 8.5 : 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
    container.appendChild(renderer.domElement);

    // Group for all core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Abstract AI Core: Icosahedron Wireframe + Inner Lattice
    const coreGeom = new THREE.IcosahedronGeometry(1.4, isMobile ? 1 : 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Inner glowing nucleus
    const nucleusGeom = new THREE.OctahedronGeometry(0.8, 1);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
    coreGroup.add(nucleusMesh);

    // 2. Orbital Rings
    const ringGeom = new THREE.RingGeometry(2.2, 2.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2 = ring1.clone();
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 4;
    (ring2.material as THREE.MeshBasicMaterial).color.setHex(0x6366f1);
    coreGroup.add(ring2);

    // 3. Conceptual Nodes (Data, Models, APIs, AI Agents, Tools, Business Systems, Actions, Results)
    const nodeNames = [
      'Data',
      'Models',
      'APIs',
      'AI Agents',
      'Tools',
      'Business Systems',
      'Actions',
      'Results',
    ];

    const nodePositions: THREE.Vector3[] = [];
    const nodeCount = nodeNames.length;
    const radius = 2.8;

    const nodeGeometry = new THREE.SphereGeometry(isMobile ? 0.08 : 0.1, 16, 16);
    const nodeGroup = new THREE.Group();
    coreGroup.add(nodeGroup);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const colorHex = i % 2 === 0 ? 0x38bdf8 : 0x818cf8;
      const nodeMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMat);
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);
    }

    // Connect nodes to core with lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
    });

    nodePositions.forEach((pos) => {
      const points = [new THREE.Vector3(0, 0, 0), pos];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMaterial);
      coreGroup.add(line);
    });

    // 4. Data Particles
    const particleCount = isMobile ? 80 : 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.2 + Math.random() * 2.4;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: isMobile ? 0.04 : 0.06,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particleSystem);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll-linked transformation
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Ambient Slow Movement
      const speed = isReducedMotion ? 0 : 0.15;
      coreMesh.rotation.y += speed * delta;
      coreMesh.rotation.x += speed * delta * 0.5;
      nucleusMesh.rotation.y -= speed * delta * 1.5;
      ring1.rotation.z += speed * delta * 0.6;
      ring2.rotation.z -= speed * delta * 0.5;

      // Mouse Lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      coreGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.5) * 0.05;
      coreGroup.rotation.y = currentRotationY + elapsedTime * 0.08;

      // Scroll Linked subtle contraction / shift
      if (scrollY > 0) {
        const factor = Math.min(scrollY / 800, 0.4);
        coreGroup.scale.set(1 - factor * 0.3, 1 - factor * 0.3, 1 - factor * 0.3);
        coreGroup.position.y = -factor * 1.5;
      }

      // Particle update
      const posAttr = particleGeom.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3] += particleVelocities[i].x;
        arr[i * 3 + 1] += particleVelocities[i].y;
        arr[i * 3 + 2] += particleVelocities[i].z;

        // boundary wrap
        const d = Math.sqrt(arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2);
        if (d > 3.6 || d < 0.8) {
          particleVelocities[i].x *= -1;
          particleVelocities[i].y *= -1;
          particleVelocities[i].z *= -1;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      nucleusGeom.dispose();
      nucleusMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      nodeGeometry.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, [isReducedMotion]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Conceptual UI Elements (Not fake product screenshots - architectural state tags) */}
      <div className="absolute inset-x-4 bottom-4 sm:bottom-6 pointer-events-none flex flex-col items-center">
        <div className="w-full max-w-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 shadow-lg transition-all duration-300 pointer-events-auto">
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              {React.createElement(conceptualStatuses[activeChip].icon, {
                className: `w-3.5 h-3.5 ${conceptualStatuses[activeChip].color}`,
              })}
              <span>{conceptualStatuses[activeChip].label}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              {activeChip + 1} / {conceptualStatuses.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
            {conceptualStatuses[activeChip].detail}
          </div>
        </div>

        {/* Minimal Stepper dots */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {conceptualStatuses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveChip(idx)}
              aria-label={`Show conceptual state ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                idx === activeChip ? 'w-5 bg-blue-600 dark:bg-blue-400' : 'w-1.5 bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Corner Nodes legend */}
      <div className="hidden xl:flex absolute top-4 right-4 flex-col gap-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-white/40 dark:bg-slate-950/40 backdrop-blur-sm p-3 rounded-lg border border-slate-200/40 dark:border-slate-800/40 pointer-events-none">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Core Linkages</div>
        <div>· Data Streams ↔ Vector Indices</div>
        <div>· APIs ↔ Tool Sandboxes</div>
        <div>· Models ↔ Autonomous Agents</div>
        <div>· State Graph ↔ Business Systems</div>
      </div>
    </div>
  );
};
