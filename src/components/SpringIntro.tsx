import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SpringIntroProps {
  onComplete: () => void;
}

export default function SpringIntro({ onComplete }: SpringIntroProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false);

  useEffect(() => {
    // Staggered Narrative Timeline:
    // 0-1.8s: Bouncing dot (Deliberate gravity)
    // 1.8s: Expansion
    // 2.6s: Row 1 Reveal
    // 3.1s: Row 2 Reveal
    // 3.8s: Rotation (after full text is out)
    // 5.0s: Rotation Ends
    // 5.4s: Start Exit
    const expansionTimer = setTimeout(() => {
      setHasExpanded(true);
    }, 1800);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 400); 
    }, 5400);

    return () => {
      clearTimeout(expansionTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-parchment flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isExiting 
            ? { scale: 0, opacity: 0 } 
            : hasExpanded 
              ? { scale: 1, opacity: 1, y: 0, scaleX: 1, scaleY: 1 } 
              : { 
                  y: [0, -100, 0, -60, 0],
                  scaleX: [1.1, 0.9, 1.1, 0.95, 1.1],
                  scaleY: [0.8, 1.1, 0.8, 1.05, 0.8],
                  opacity: 1 
                }
        }
        transition={
          hasExpanded 
            ? { 
                scale: { type: "spring", stiffness: 120, damping: 18 },
                scaleX: { duration: 0.4 },
                scaleY: { duration: 0.4 },
                opacity: { duration: 0.3 }
              }
            : { 
                y: { 
                  duration: 1.8, 
                  times: [0, 0.3, 0.5, 0.8, 1],
                  ease: ["easeOut", "easeIn", "easeOut", "easeIn"] 
                },
                scaleX: { duration: 1.8, times: [0, 0.3, 0.5, 0.8, 1] },
                scaleY: { duration: 1.8, times: [0, 0.3, 0.5, 0.8, 1] }
              }
        }
        className="relative flex items-center justify-center text-center shadow-xl overflow-hidden rounded-full bg-[#5a7a2e]"
        style={{ 
          width: hasExpanded ? 'min(80vw, 400px)' : '100px',
          height: hasExpanded ? 'min(80vw, 400px)' : '100px',
          transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {hasExpanded && (
          <div
            style={{ fontFamily: "'Barriecito', cursive" }}
            className="flex flex-col gap-1 text-[#f9f7f2] relative z-10 scale-90 md:scale-100" 
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-3xl md:text-5xl"
            >
              Spring is Here.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-xl md:text-3xl opacity-80"
            >
              New Flavors to Love.
            </motion.span>
          </div>
        )}

        {hasExpanded && (
          <>
            <motion.div 
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              animate={!isExiting ? { rotate: 360, scale: 1, opacity: 1 } : { scale: 0 }}
              transition={{ 
                rotate: { delay: 2.1, duration: 1.2, ease: "easeInOut" },
                opacity: { delay: 1.2, duration: 0.6 },
                scale: { delay: 1.2, duration: 0.8 }
              }}
              className="absolute inset-4 rounded-full border-2 border-dashed border-[#f9f7f2]/20 pointer-events-none" 
            />
            
            <motion.div
              animate={!isExiting ? { rotate: 360 } : {}}
              transition={{ delay: 2.1, duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-[10px] pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#f9f7f2]/40 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#f9f7f2]/40 rounded-full" />
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

