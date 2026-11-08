"use client";
 
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
  
export default function Hero({ 
  isReady = true
}: { 
  isReady?: boolean
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCut, setIsCut] = useState(false);

  // Custom Interactivity Toggle: Trigger the Anatomical Cut on scroll gesture
  useEffect(() => {
    if (!isReady) return;
    setHasMounted(true);

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 5) return;
      if (e.deltaY > 0) setIsCut(true);
      else setIsCut(false);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isReady]);
 
  return (
    <section 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden font-sans bg-parchment overscroll-none touch-none"
    >
      
      {/* 
          STAINLESS BACKGROUND LAYER (FIXED & IMMUTABLE)
      */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Branding Wordmark */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={hasMounted ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.8, ease: "easeOut" }}
             style={{ fontFamily: "'Barriecito', system-ui" }}
             className="text-3xl md:text-6xl text-foreground whitespace-nowrap uppercase tracking-[0.2em] font-medium"
          >
            Moss&Cookie
          </motion.div>
        </div>

        {/* Deep Cacao Annotation (Restored Original Proportion) */}
        <div className="absolute left-[8%] top-[54%] -translate-y-1/2 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={hasMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="font-handwriting text-2xl md:text-3xl font-semibold text-[#825d48] -rotate-6 lowercase"
          >
            deep cacao
          </motion.span>
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="ml-8 mt-1">
            <motion.path
              d="M10,5 C 20,20, 40,25, 55,20"
              stroke="#825d48"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={hasMounted ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.4 }}
            />
          </svg>
        </div>

        {/* Uji Dream Annotation */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] flex flex-col items-center">
           <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-4">
            <motion.path
              d="M30,50 Q40,30 30,5"
              stroke="#5a7a2e"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={hasMounted ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
            />
          </svg>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={hasMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-handwriting text-2xl md:text-3xl font-semibold text-[#5a7a2e] rotate-2 lowercase"
          >
            uji dream
          </motion.span>
        </div>

        {/* Cloud Taro Annotation (Restored Grand Scale Offset) */}
        <div className="absolute right-[5%] top-[54%] -translate-y-1/2 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={hasMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="font-handwriting text-2xl md:text-3xl font-semibold text-[#7c639e] rotate-3 lowercase"
          >
            cloud taro
          </motion.span>
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="rotate-[-10deg] mt-1 pr-6">
            <motion.path
              d="M70,5 C 60,25, 40,30, 10,25"
              stroke="#7c639e"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={hasMounted ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.4 }}
            />
          </svg>
        </div>
      </div>
 
      {/* 
          INTERACTIVE PRODUCT CORE: RESTORING THE 'GOLDILOCKS' PROPORTIONS
          Compensating for specific image crops to ensure visual parity.
      */}
      <div className="relative w-full h-full max-w-[1400px] z-20 flex items-center justify-center pointer-events-none">
        
        {/* Left: Deep Cacao (28vw) */}
        <div className="absolute left-[10%] top-[60%] -translate-y-1/2 w-[28vw] min-w-[320px]">
          <motion.div 
            initial={{ scale: 0.8, y: 350, opacity: 0, rotate: -15 }}
            animate={hasMounted ? { scale: 1, y: 0, opacity: 1, rotate: -5 } : {}}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.6 }}
            className="relative w-full flex items-center justify-center"
          >
           <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div key="c-w" className="w-full flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/doublecoco.png" alt="Cacao" width={600} height={600} priority className="w-full h-auto object-contain" />
                </motion.div>
              ) : (
                <motion.div key="c-c" className="w-full flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/cocoacut.png" alt="Cacao Cut" width={600} height={600} className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
 
        {/* Center: Uji Dream (28vw) */}
        <div className="absolute left-[50%] -translate-x-1/2 top-[60%] -translate-y-1/2 w-[28vw] min-w-[320px]">
          <motion.div 
            initial={{ scale: 0.8, y: 350, opacity: 0, rotate: 10 }}
            animate={hasMounted ? { scale: 1, y: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.4 }}
            className="relative w-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div key="m-w" className="w-full flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/macha.png" alt="Matcha" width={600} height={600} priority className="w-full h-auto object-contain" />
                </motion.div>
              ) : (
                <motion.div key="m-c" className="w-full flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/machacut.png" alt="Matcha Cut" width={600} height={600} className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/5 blur-[50px] rounded-full z-[-1]" />
          </motion.div>
        </div>
 
        {/* Right: Cloud Taro (34vw - Large scale to compensate for crop padding) */}
        <div className="absolute right-[7%] top-[60%] -translate-y-1/2 w-[34vw] min-w-[380px]">
          <motion.div 
            initial={{ scale: 0.8, y: 350, opacity: 0, rotate: 15 }}
            animate={hasMounted ? { scale: 1, y: 0, opacity: 1, rotate: 5 } : {}}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.8 }}
            className="relative w-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {!isCut ? (
                <motion.div key="t-w" className="w-full flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/taro.png" alt="Taro" width={650} height={650} priority className="w-full h-auto object-contain" />
                </motion.div>
              ) : (
                <motion.div key="t-c" className="w-full flex items-center justify-center" initial={{ opacity: 0, scale: 0.74 }} animate={{ opacity: 1, scale: 0.74 }} transition={{ duration: 0.1 }}>
                  <Image src="/image/tarocut.png" alt="Taro Cut" width={650} height={650} className="className=w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
 
    </section>
  );
}
