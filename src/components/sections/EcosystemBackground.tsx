"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const gold = new THREE.Color("#c9a227");

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      col[i * 3] = gold.r;
      col[i * 3 + 1] = gold.g;
      col[i * 3 + 2] = gold.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FlowingLines() {
  const group = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * 2.5,
          Math.sin(angle) * 0.3,
          Math.sin(angle) * 2.5
        )
      );
      result.push(points);
    }
    return result;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  points.flatMap((p) => [p.x, p.y, p.z])
                ),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#c9a227" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

export default function EcosystemBackground() {
  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <Particles count={150} />
        <FlowingLines />
      </Canvas>
    </div>
  );
}
