"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentText: Record<Project["accent"], string> = {
  violet: "text-[rgb(var(--accent-violet))]",
  pink: "text-[rgb(var(--accent-pink))]",
  amber: "text-[rgb(var(--accent-amber))]",
  cyan: "text-[rgb(var(--accent-cyan))]",
};

const accentBorder: Record<Project["accent"], string> = {
  violet: "border-[rgb(var(--accent-violet)/0.3)] hover:border-[rgb(var(--accent-violet)/0.6)]",
  pink: "border-[rgb(var(--accent-pink)/0.3)] hover:border-[rgb(var(--accent-pink)/0.6)]",
  amber: "border-[rgb(var(--accent-amber)/0.3)] hover:border-[rgb(var(--accent-amber)/0.6)]",
  cyan: "border-[rgb(var(--accent-cyan)/0.3)] hover:border-[rgb(var(--accent-cyan)/0.6)]",
};

const accentGlow: Record<Project["accent"], string> = {
  violet: "hover:shadow-[0_8px_80px_rgb(var(--accent-violet)/0.15)]",
  pink: "hover:shadow-[0_8px_80px_rgb(var(--accent-pink)/0.15)]",
  amber: "hover:shadow-[0_8px_80px_rgb(var(--accent-amber)/0.15)]",
  cyan: "hover:shadow-[0_8px_80px_rgb(var(--accent-cyan)/0.15)]",
};

export function SelectedWork() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto w-full max-w-[1400px]">
        <Header />

        {/* Masterclass showcase — full-width stacked cards */}
        <div className="mt-16 flex flex-col gap-10 md:mt-24 md:gap-16">
          {PROJECTS.map((p, i) => (
            <ShowcaseCard key={p.id} project={p} index={i} />
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

function ShowcaseCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        duration: 0.9,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative block overflow-hidden rounded-2xl border bg-[rgb(var(--bg-panel))] transition-all duration-500 md:rounded-3xl",
          accentBorder[project.accent],
          accentGlow[project.accent],
        )}
        data-cursor-hover
      >
        {/* Layout: alternating image/info sides on desktop */}
        <div className={cn(
          "flex flex-col",
          isEven ? "md:flex-row" : "md:flex-row-reverse",
        )}>
          {/* Image side — 60% on desktop */}
          <div className="relative w-full overflow-hidden md:w-[60%]">
            <motion.div
              className="relative aspect-[16/10] md:aspect-auto md:h-full md:min-h-[420px]"
              style={{ y: imgY, scale: imgScale }}
            >
              <Image
                src={`/projects/${project.id}.png`}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
                priority={index === 0}
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className={cn(
              "pointer-events-none absolute inset-0",
              isEven
                ? "bg-gradient-to-r from-transparent via-transparent to-[rgb(var(--bg-panel))]"
                : "bg-gradient-to-l from-transparent via-transparent to-[rgb(var(--bg-panel))]",
              "hidden md:block",
            )} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-panel))] via-transparent to-transparent md:hidden" />
          </div>

          {/* Info side — 40% on desktop */}
          <div className={cn(
            "relative flex w-full flex-col justify-between p-6 md:w-[40%] md:p-10",
          )}>
            {/* Top: number + arrow */}
            <div className="flex items-start justify-between">
              <span className={cn(
                "font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none opacity-15",
                accentText[project.accent],
              )}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <motion.div
                className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-[rgb(var(--text-muted))] transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-white"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </div>

            {/* Middle: title + type + description */}
            <div className="mt-6 flex-1 md:mt-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
                {project.type}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {project.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-[rgb(var(--text-muted))] md:text-base">
                {project.description}
              </p>
            </div>

            {/* Bottom: stack tags + year */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                {project.stack.split(" · ").map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-300",
                      accentBorder[project.accent],
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(var(--text-muted))]">
                <span className="inline-block h-px w-4 bg-[rgb(var(--text-muted))/0.3]" />
                <span className="font-mono uppercase tracking-[0.15em]">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
