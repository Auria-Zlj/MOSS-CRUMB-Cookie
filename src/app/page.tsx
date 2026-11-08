"use client";
 
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import SpringIntro from "@/components/SpringIntro";
import { AnimatePresence } from "framer-motion";
 
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
 
  return (
    <main className="fixed inset-0 w-full h-dvh bg-parchment overflow-hidden touch-none">
      <AnimatePresence mode="wait">
        {showIntro && (
          <SpringIntro key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
 
      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.3s ease-in' }} className="h-full w-full">
        {/* SINGLE SCREEN HERO: No more native page scrolling */}
        <section className="relative w-full h-full z-10 overflow-hidden">
          <Hero isReady={!showIntro} />
        </section>
      </div>
    </main>
  );
}
