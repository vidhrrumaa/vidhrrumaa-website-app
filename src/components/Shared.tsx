/**
 * Shared.tsx — React components shared across sections.
 * Animation variants live in src/utils/animations.ts (React Fast Refresh requirement:
 * files with components must not export non-component values).
 */
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { BRAND_DARK, BRAND_GOLD, FONT } from "@/data/siteData";
import { fadeUp } from "@/utils/animations";

export { fadeUp, stagger } from "@/utils/animations";

// ─── Reveal ───────────────────────────────────────────────────────────────────

type RevealProps = {
  children:  ReactNode;
  className?: string;
  style?:    CSSProperties;
  delay?:    number;
  duration?: number;
  y?:        number;
  once?:     boolean;
  amount?:   number;
};

export function Reveal({
  children, className, style,
  delay = 0.04, duration = 0.6, y = 24,
  once = false, amount = 0.15,
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = {
    hidden:  { opacity: 0, y: reduced ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" as const } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

type SectionHeaderProps = { title: string; tagline: string; light?: boolean };

export function SectionHeader({ title, tagline, light = false }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-header__title" style={{ color: light ? "#ffffff" : BRAND_DARK }}>
        {title.toUpperCase()}
      </h2>
      <p className="section-header__tagline" style={{ color: light ? "rgba(255,255,255,0.62)" : undefined }}>
        "{tagline}"
      </p>
    </div>
  );
}

// ─── ServiceItem ──────────────────────────────────────────────────────────────

export function ServiceItem({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} className="service-item">
      <span className="service-item__dot" style={{ backgroundColor: BRAND_GOLD }} />
      <div>
        <div className="service-item__name">{name}</div>
        <div className="service-item__label">{subtitle}</div>
      </div>
    </motion.div>
  );
}
