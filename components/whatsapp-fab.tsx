"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/content";

/**
 * Floating WhatsApp call-to-action. Sits to the left of the AI chat
 * launcher so both buttons are visible at the same time without overlap.
 *
 * Brand colour is WhatsApp's official #25D366 with a slightly darker stop
 * for depth. A subtle ping ring draws attention without being distracting.
 */
export function WhatsAppFab() {
  return (
    <motion.a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Dhruv on WhatsApp ${SITE.whatsappDisplay}`}
      title="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-5 right-[5.25rem] z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 md:bottom-6 md:right-24 md:h-16 md:w-16"
      data-cursor-hover
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <svg
        viewBox="0 0 32 32"
        className="relative z-10 h-7 w-7 md:h-8 md:w-8"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.706 3.41 4.728 4.402.66.33 2.395 1.27 3.13 1.27.59 0 1.532-.59 1.876-1.205.18-.327.292-.713.292-1.063 0-.317-1.59-.99-1.77-.99-.143.001-.226.142-.355.142Zm-2.95 7.81c-1.564 0-3.078-.402-4.41-1.205l-.314-.187-3.27.86.87-3.18-.207-.327c-.88-1.398-1.347-3.013-1.347-4.642 0-4.825 3.92-8.744 8.745-8.744 4.825 0 8.74 3.92 8.74 8.744 0 4.825-3.915 8.744-8.74 8.744Zm0-19.187c-5.766 0-10.45 4.682-10.45 10.447 0 1.85.487 3.67 1.418 5.262L5.5 26.5l5.182-1.36a10.5 10.5 0 0 0 5.18 1.353c5.77 0 10.45-4.683 10.45-10.45 0-5.764-4.683-10.446-10.45-10.446v.005Z" />
      </svg>
    </motion.a>
  );
}
