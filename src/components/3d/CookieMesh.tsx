"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

export default function CookieMesh({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const cookieAssemblyRef = useRef<THREE.Group>(null);
  const topCookieRef = useRef<THREE.Group>(null);
  const midCookieRef = useRef<THREE.Group>(null);
  const bottomCookieRef = useRef<THREE.Group>(null);
  
  const [pastHero, setPastHero] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [fadeAlpha, setFadeAlpha] = useState(0);

  const obj = useLoader(OBJLoader, "/cookie1.obj");
  
  const { geometry, cookieHeight } = useMemo(() => {
    let geo = new THREE.BufferGeometry();
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        geo = (child as THREE.Mesh).geometry.clone();
      }
    });

    geo.computeBoundingBox();
    const center = new THREE.Vector3();
    geo.boundingBox?.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
    
    const finalScale = 0.6; 
    geo.scale(finalScale, finalScale, finalScale);
    
    geo.computeBoundingBox();
    const height = geo.boundingBox!.max.y - geo.boundingBox!.min.y;
    
    return { geometry: geo, cookieHeight: height };
  }, [obj]);

  useFrame(() => {
    const currentScroll = scrollProgress.get();
    
    // TRANSITION: Fading the 3D model in only AFTER the hero images are scrolled past
    // Hero images occupy 100vh. If total height is 600vh, hero ends at 0.16. 
    // We start showing 3D at 0.2
    const fadeStart = 0.20; 
    const fadeEnd = 0.30;   
    
    // Fading out before the third section (0.62-0.72)
    const fadeOutStart = 0.62; 
    const fadeOutEnd = 0.72;
    
    let opacity = THREE.MathUtils.clamp((currentScroll - fadeStart) / (fadeEnd - fadeStart), 0, 1);
    if (currentScroll > fadeOutStart) {
      opacity = THREE.MathUtils.clamp(1 - (currentScroll - fadeOutStart) / (fadeOutEnd - fadeOutStart), 0, 1);
    }
    
    const shouldShow = currentScroll > fadeStart && currentScroll < fadeOutEnd;
    setPastHero((prev) => prev !== shouldShow ? shouldShow : prev);
    setLabelsVisible((prev) => {
        const visible = currentScroll > fadeStart + 0.05; 
        return prev !== visible ? visible : prev;
    });
    setFadeAlpha(opacity);

    if (cookieAssemblyRef.current) {
      // Apply opacity to models
      cookieAssemblyRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as any;
          if (mat) {
            mat.transparent = true;
            mat.opacity = opacity;
          }
        }
      });

      let splitTarget = 0;
      if (currentScroll > 0.22) {
        // Splitting happens deeper in now
        splitTarget = Math.min(1.4, (currentScroll - 0.22) * 5.0);
      }

      if (topCookieRef.current && midCookieRef.current && bottomCookieRef.current) {
        const topY = cookieHeight + splitTarget;
        const midY = splitTarget * 0.05;
        const bottomY = -cookieHeight - splitTarget;

        topCookieRef.current.position.y = THREE.MathUtils.lerp(topCookieRef.current.position.y, topY, 0.08);
        midCookieRef.current.position.y = THREE.MathUtils.lerp(midCookieRef.current.position.y, midY, 0.08);
        bottomCookieRef.current.position.y = THREE.MathUtils.lerp(bottomCookieRef.current.position.y, bottomY, 0.08);

        const rotBase = currentScroll * Math.PI;

        topCookieRef.current.rotation.x = THREE.MathUtils.lerp(topCookieRef.current.rotation.x, 0.4 + splitTarget * 0.1, 0.08);
        topCookieRef.current.rotation.y = THREE.MathUtils.lerp(topCookieRef.current.rotation.y, rotBase * 1.5 + 1.2, 0.05);
        
        midCookieRef.current.rotation.x = THREE.MathUtils.lerp(midCookieRef.current.rotation.x, 0.2, 0.08);
        midCookieRef.current.rotation.y = THREE.MathUtils.lerp(midCookieRef.current.rotation.y, (currentScroll * -1) + 2.5, 0.05);

        bottomCookieRef.current.rotation.x = THREE.MathUtils.lerp(bottomCookieRef.current.rotation.x, 0.5 - splitTarget * 0.05, 0.08);
        bottomCookieRef.current.rotation.y = THREE.MathUtils.lerp(bottomCookieRef.current.rotation.y, rotBase * 2 - 0.8, 0.05);

        topCookieRef.current.position.x = THREE.MathUtils.lerp(topCookieRef.current.position.x, 0.6, 0.08);
        midCookieRef.current.position.x = THREE.MathUtils.lerp(midCookieRef.current.position.x, -0.1, 0.08);
        bottomCookieRef.current.position.x = THREE.MathUtils.lerp(bottomCookieRef.current.position.x, -0.5, 0.08);
      }
    }
  });

  const showAnnotations = pastHero && labelsVisible;

  const colors = {
    chocolate: "#2e1a12", 
    matcha: "#7a8a4f",     
    redVelvet: "#7d1810",  
  };

  return (
    <group position={[0, -0.3, 0]}>
      <group ref={cookieAssemblyRef} rotation={[Math.PI * 0.1, 0, 0]}>
        <group ref={topCookieRef} position={[0.6, cookieHeight, 0]} rotation={[0.4, 1.2, 0.1]}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color={colors.chocolate} roughness={0.9} metalness={0.05} envMapIntensity={1.5} />
          </mesh>
        </group>

        <group ref={midCookieRef} position={[-0.1, 0, 0]} rotation={[0.2, 2.5, -0.05]}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color={colors.matcha} roughness={0.9} metalness={0.05} envMapIntensity={1.5} />
          </mesh>
        </group>

        <group ref={bottomCookieRef} position={[-0.5, -cookieHeight, 0]} rotation={[0.5, -0.8, -0.1]}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color={colors.redVelvet} roughness={0.9} metalness={0.05} envMapIntensity={1.5} />
          </mesh>
        </group>
      </group>

      {/* Annotations removed per user request for a cleaner 3D gallery view */}
    </group>
  );
}
