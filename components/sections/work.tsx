"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentMap: Record<Project["accent"], string> = {
  violet:
    "from-[rgb(var(--accent-violet))] via-[rgb(var(--accent-pink))] to-transparent",
  pink: "from-[rgb(var(--accent-pink))] via-[rgb(var(--accent-amber))] to-transparent",
  amber:
    "from-[rgb(var(--accent-amber))] via-[rgb(var(--accent-pink))] to-transparent",
  cyan: "from-[rgb(var(--accent-cyan))] via-[rgb(var(--accent-violet))] to-transparent",
};

const accentGlow: Record<Project["accent"], string> = {
  violet: "shadow-[0_0_60px_rgb(var(--accent-violet)/0.2)]",
  pink: "shadow-[0_0_60px_rgb(var(--accent-pink)/0.2)]",
  amber: "shadow-[0_0_60px_rgb(var(--accent-amber)/0.2)]",
  cyan: "shadow-[0_0_60px_rgb(var(--accent-cyan)/0.2)]",
};

export function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto w-full max-w-[1400px]">
        <Header />

        {/* Grid layout */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((p, i) => (
            <GridCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
        <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
        <span>Selected work · 2025</span>
      </div>
      <h2 className="font-display text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] md:max-w-[18ch]">
        Real sites I&apos;ve shipped — built with AI,
        <span className="gradient-text"> hand-polished.</span>
      </h2>
    </motion.div>
  );
}

function GridCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const isWide = index === 0 || index === 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative",
        isWide && "md:col-span-2",
      )}
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative block overflow-hidden rounded-3xl border border-white/8 bg-[rgb(var(--bg-panel))] transition-all duration-500",
          "hover:border-white/15",
          accentGlow[project.accent].replace(
            "shadow-[",
            "hover:shadow-[",
          ),
        )}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-cursor-hover
      >
        {/* Gradient border glow on hover */}
        <div
          className={cn(
            "absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-60",
            accentMap[project.accent],
          )}
        />

        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.div
            className={cn(
              "relative",
              isWide ? "aspect-[21/10]" : "aspect-[16/11]",
            )}
            style={{ y: imgY }}
          >
            <Image
              src={`/projects/${project.id}.png`}
              alt={`${project.title} screenshot`}
              fill
              sizes={
                isWide ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 768px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.05]"
              priority={index === 0}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </motion.div>
        </div>

        {/* Content overlay */}
        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-[rgb(var(--text-muted))]">
                {project.year}
              </span>
            </div>
            <motion.div
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[rgb(var(--text-muted))] transition-all duration-300 group-hover:border-white/20 group-hover:bg-[rgb(var(--accent-violet))] group-hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <h3 className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            {project.title}
          </h3>

          <p className="mt-1 text-sm uppercase tracking-[0.15em] text-[rgb(var(--text-muted))]">
            {project.type}
          </p>

          <p className="mt-3 text-pretty text-sm text-[rgb(var(--text-muted))] md:text-base">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.stack.split(" · ").map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/8 bg-white/5 px-3 py-1 font-mono text-xs text-[rgb(var(--text-muted))] transition-colors duration-300 group-hover:border-white/15"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}
