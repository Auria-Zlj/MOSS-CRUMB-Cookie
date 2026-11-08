"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const LavaMaterial = shaderMaterial(
  {
    time: 0,
    colorCore: new THREE.Color("#ff3300"), // bright fiery core
    colorCrust: new THREE.Color("#4a0a00"), // deeper baked edge
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 colorCore;
    uniform vec3 colorCrust;
    
    varying vec2 vUv;
    
    // Simple 2D internal noise generator
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
      // Scale coordinates to give "chunks"
      vec2 st = vUv * 6.0;
      
      // Animate noise over time
      float n = noise(st + time * 0.3);
      
      // Add a secondary layer of noise for detail
      float n2 = noise(st * 2.0 - time * 0.4);
      float combinedNoise = (n + n2 * 0.5) / 1.5;
      
      // Mix lava core and dark crust based on combined noise
      vec3 color = mix(colorCrust, colorCore, smoothstep(0.3, 0.7, combinedNoise));
      
      // Exaggerate glowing peaks
      float glow = smoothstep(0.75, 1.0, combinedNoise);
      color += vec3(glow * 0.8, glow * 0.4, 0.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LavaMaterial });

// Add intrinsic element type support for TS
declare module "@react-three/fiber" {
  interface IntrinsicElements {
    lavaMaterial: any;
  }
}

export { LavaMaterial };
