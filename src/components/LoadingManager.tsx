"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingManager({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400); // Small pause at 100% before completion hand-off
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-parchment"
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* We use a thin line with a max-width, maintaining a delicate minimal aesthetic */}
        <div className="w-1/3 max-w-[200px] h-[1px] bg-foreground/10 overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 left-0 bg-foreground w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
