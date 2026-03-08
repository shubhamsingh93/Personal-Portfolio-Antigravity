"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function DataMesh() {
  const meshRef = useRef<THREE.Points>(null);

  // Generate abstract topography points
  const [positions, phases] = useMemo(() => {
    const geoSize = 50;
    const pointsCount = geoSize * geoSize;
    const pos = new Float32Array(pointsCount * 3);
    const ph = new Float32Array(pointsCount);

    let i = 0;
    for (let x = 0; x < geoSize; x++) {
      for (let z = 0; z < geoSize; z++) {
        const posX = (x - geoSize / 2) * 0.4;
        const posZ = (z - geoSize / 2) * 0.4;
        const d = Math.sqrt(posX * posX + posZ * posZ);
        // Base elevation
        const posY = Math.sin(d * 0.8) * 1.5;

        pos[i * 3] = posX;
        pos[i * 3 + 1] = posY;
        pos[i * 3 + 2] = posZ;

        ph[i] = Math.random() * Math.PI * 2;
        i++;
      }
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const positionsAttr = meshRef.current.geometry.attributes.position;
    
    // Animate mesh
    for (let i = 0; i < phases.length; i++) {
      const idx = i * 3 + 1;
      const originalY = Math.sin(Math.sqrt(Math.pow(positionsAttr.array[i * 3], 2) + Math.pow(positionsAttr.array[i * 3 + 2], 2)) * 0.8) * 1.5;
      
      // Add subtle waving based on time
      positionsAttr.array[idx] = originalY + Math.sin(t * 1.5 + phases[i]) * 0.2;
    }
    
    positionsAttr.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function WireframeCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return null; // Gracefully degrade by returning nothing on mobile screens
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <fog attach="fog" args={["#030303", 5, 20]} />
        <DataMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
