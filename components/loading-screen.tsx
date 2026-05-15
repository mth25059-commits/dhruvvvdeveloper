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
          {/* Mesh background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "40vw",
                height: "40vw",
                top: "-10%",
                left: "-10%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-violet)/0.4), transparent 65%)",
                filter: "blur(60px)",
              }}
              animate={{
                x: [0, 40, -20, 0],
                y: [0, 30, -10, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "50vw",
                height: "50vw",
                bottom: "-15%",
                right: "-10%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-pink)/0.35), transparent 65%)",
                filter: "blur(60px)",
              }}
              animate={{
                x: [0, -30, 20, 0],
                y: [0, -20, 15, 0],
                scale: [1, 0.95, 1.08, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "30vw",
                height: "30vw",
                top: "40%",
                left: "30%",
                background:
                  "radial-gradient(circle, rgb(var(--accent-amber)/0.25), transparent 65%)",
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, 25, -15, 0],
                y: [0, -25, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* 3D rotating wireframe cube */}
          <div className="relative mb-10" style={{ perspective: 800 }}>
            <motion.div
              className="relative"
              style={{
                width: 120,
                height: 120,
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateX: 360, rotateY: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* 6 faces of the cube */}
              {[
                {
                  transform: "translateZ(60px)",
                  border:
                    "rgb(var(--accent-violet))",
                },
                {
                  transform: "rotateY(90deg) translateZ(60px)",
                  border:
                    "rgb(var(--accent-pink))",
                },
                {
                  transform: "rotateY(180deg) translateZ(60px)",
                  border:
                    "rgb(var(--accent-amber))",
                },
                {
                  transform: "rotateY(-90deg) translateZ(60px)",
                  border:
                    "rgb(var(--accent-violet))",
                },
                {
                  transform: "rotateX(90deg) translateZ(60px)",
                  border:
                    "rgb(var(--accent-pink))",
                },
                {
                  transform: "rotateX(-90deg) translateZ(60px)",
                  border:
                    "rgb(var(--accent-amber))",
                },
              ].map((face, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: face.transform,
                    border: `1.5px solid ${face.border}`,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${face.border.replace(")", "/0.08)")}, transparent)`,
                    backdropFilter: "blur(4px)",
                    boxShadow: `0 0 30px ${face.border.replace(")", "/0.15)")}, inset 0 0 20px ${face.border.replace(")", "/0.05)")}`,
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
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
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
          <div className="relative z-10 mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
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
