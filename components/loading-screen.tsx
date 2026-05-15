"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_TEXTS = [
  "Initializing experience…",
  "Loading assets…",
  "Building the interface…",
  "Almost there…",
];

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const textIdx = useMemo(() => {
    if (progress < 25) return 0;
    if (progress < 50) return 1;
    if (progress < 75) return 2;
    return 3;
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "rgb(var(--bg-base))" }}
        >
          {/* Mesh background blobs — simplified on mobile for perf */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "clamp(200px, 40vw, 500px)",
                height: "clamp(200px, 40vw, 500px)",
                top: "-10%",
                left: "-10%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-violet)/0.4), transparent 65%)",
                filter: "blur(40px)",
                willChange: "transform",
              }}
              animate={{
                x: [0, 20, -10, 0],
                y: [0, 15, -5, 0],
                scale: [1, 1.05, 0.97, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "clamp(220px, 50vw, 600px)",
                height: "clamp(220px, 50vw, 600px)",
                bottom: "-15%",
                right: "-10%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-pink)/0.35), transparent 65%)",
                filter: "blur(40px)",
                willChange: "transform",
              }}
              animate={{
                x: [0, -15, 10, 0],
                y: [0, -10, 8, 0],
                scale: [1, 0.97, 1.04, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute rounded-full hidden md:block"
              style={{
                width: "30vw",
                height: "30vw",
                top: "40%",
                left: "30%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-amber)/0.25), transparent 65%)",
                filter: "blur(50px)",
                willChange: "transform",
              }}
              animate={{
                x: [0, 15, -10, 0],
                y: [0, -15, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* 3D rotating wireframe cube — responsive size */}
          <div className="relative mb-8 md:mb-10" style={{ perspective: 800 }}>
            <motion.div
              className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              animate={{ rotateX: 360, rotateY: 360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* 6 faces of the cube */}
              {[
                {
                  transform: "translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-violet))",
                },
                {
                  transform: "rotateY(90deg) translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-pink))",
                },
                {
                  transform: "rotateY(180deg) translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-amber))",
                },
                {
                  transform: "rotateY(-90deg) translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-violet))",
                },
                {
                  transform: "rotateX(90deg) translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-pink))",
                },
                {
                  transform: "rotateX(-90deg) translateZ(var(--cube-z))",
                  border:
                    "rgb(var(--accent-amber))",
                },
              ].map((face, i) => (
                <div
                  key={i}
                  className="absolute inset-0 [--cube-z:40px] md:[--cube-z:60px]"
                  style={{
                    transform: face.transform,
                    border: `1.5px solid ${face.border}`,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${face.border.replace(")", "/0.08)")}, transparent)`,
                    boxShadow: `0 0 20px ${face.border.replace(")", "/0.12)")}`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
              <span className="gradient-text-animated">
                Dhruv Chandrawanshi
              </span>
            </h1>
            <p className="font-mono text-xs tracking-widest uppercase text-[rgb(var(--text-muted))]">
              Web · Bots · AI Automation
            </p>
          </motion.div>

          {/* Loading status text */}
          <motion.div
            className="relative z-10 mt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={textIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm text-[rgb(var(--text-muted))]"
              >
                {LOADING_TEXTS[textIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-6 h-1 w-36 md:w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgb(var(--accent-violet)), rgb(var(--accent-pink)), rgb(var(--accent-amber)))",
                backgroundSize: "200% 100%",
              }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                width: { duration: 0.15, ease: "linear" },
                backgroundPosition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.p
            className="relative z-10 mt-3 font-mono text-xs text-[rgb(var(--text-subtle))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
