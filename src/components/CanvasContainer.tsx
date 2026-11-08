"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import CookieMesh from "./3d/CookieMesh";
import { MotionValue } from "framer-motion";

export default function CanvasContainer({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ perspective: "1000px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Soft environment lighting to bring out texture details */}
        <Environment resolution={256} preset="city">
          <Lightformer form="rect" intensity={2} color="white" position={[5, 10, 5]} scale={[10, 10, 1]} target={[0, 0, 0]} />
        </Environment>
        
        <CookieMesh scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
