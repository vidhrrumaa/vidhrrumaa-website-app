/**
 * Shared.tsx — React components shared across sections.
 * Animation variants live in src/utils/animations.ts (React Fast Refresh requirement:
 * files with components must not export non-component values).
 */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BadgeCheck, ChevronDown, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
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
      <p className="section-header__tagline" style={{ color: light ? "rgba(255,255,255,0.85)" : undefined }}>
        "{tagline}"
      </p>
    </div>
  );
}

// ─── ServiceItem ──────────────────────────────────────────────────────────────

/**
 * Plain service row. Pass `badge` to render the featured, expandable variant
 * (e.g. "Siemens Channel Partner"); `details` is its expanded description.
 */
export function ServiceItem({ name, subtitle, badge, details, effect, effectTarget, badgeStyle }: {
  name: string; subtitle: string; badge?: string; details?: string;
  effect?: string; effectTarget?: string; badgeStyle?: string;
}) {
  if (badge) {
    return (
      <FeaturedServiceItem
        name={name} subtitle={subtitle} badge={badge} details={details}
        effect={effect} effectTarget={effectTarget} badgeStyle={badgeStyle}
      />
    );
  }
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

// ─── FeaturedServiceItem ──────────────────────────────────────────────────────
// Disclosure pattern: the whole header is a button (aria-expanded); the panel
// expands inline below it. Closes on the header, the ✕ button, or Escape, and
// returns focus to the header so keyboard users never lose their place.

/**
 * `effect` picks the border-light style: comet | twin | radiant | siemens | aura.
 * `effectTarget` puts the motion on the whole "card" or only the "badge".
 * `badgeStyle` (badge target only): gold | ivory | platinum | teal | foil.
 * See index.css §4a.
 */
function FeaturedServiceItem({
  name, subtitle, badge, details, effect = "comet", effectTarget = "card", badgeStyle = "gold",
}: {
  name: string; subtitle: string; badge: string; details?: string;
  effect?: string; effectTarget?: string; badgeStyle?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const reduced = useReducedMotion();

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.div variants={fadeUp} className={`service-item service-item--featured${open ? " is-open" : ""}`} data-effect={effect} data-target={effectTarget}
      data-badge={effectTarget === "badge" ? badgeStyle : undefined}
    >
      <button
        ref={toggleRef}
        type="button"
        className="featured-item__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="service-item__dot" style={{ backgroundColor: BRAND_GOLD }} />
        <span className="featured-item__text">
          <span className="service-item__name-row">
            <span className="service-item__name">{name}</span>
            <span className="sr-only"> – </span>
            <span className="partner-badge">
              <BadgeCheck size={14} strokeWidth={2.25} aria-hidden="true" />
              <span className="partner-badge__text">{badge}</span>
            </span>
          </span>
          <span className="service-item__label">{subtitle}</span>
        </span>
        <span className="featured-item__chevron" aria-hidden="true">
          <ChevronDown size={18} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${name} – ${badge}`}
            className="featured-item__panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="featured-item__panel-inner">
              <p className="featured-item__details">
                {details || "Full details of our Siemens Channel Partnership are coming soon."}
              </p>
              <button type="button" className="featured-item__close" aria-label="Close details" onClick={close}>
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
