/**
 * Awards.tsx
 * ──────────
 * Recognition cards with click-to-expand lightbox.
 * Hover shows a zoom hint + overlay label. Click opens full lightbox with
 * large image + readable title. ESC or backdrop click closes it.
 */
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { SITE_DATA, BRAND_WARM, BRAND_GOLD, BRAND_DARK } from "../data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "./Shared";

// ─── Lightbox ─────────────────────────────────────────────────────────────────

type LightboxItem = { img: string; title: string };

function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.82)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          background: "rgba(255,255,255,0.1)", border: `1px solid rgba(255,255,255,0.2)`,
          borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <X size={18} color="#fff" />
      </button>

      {/* Image panel */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{    scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "0.75rem",
          overflow: "hidden",
          maxWidth: "min(1200px, 95vw)",
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          border: `3px solid ${BRAND_GOLD}`,
        }}
      >
        {/* Gold bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${BRAND_GOLD}, #a88b28)` }} />

        {/* Image */}
        <div style={{
          background: "#f8f7f5",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1.5rem",
          maxHeight: "85vh",
          overflow: "hidden",
        }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Title */}
        <div style={{
          padding: "1rem 1.5rem 1.25rem",
          background: BRAND_DARK,
          display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <div style={{ width: 3, alignSelf: "stretch", background: BRAND_GOLD, borderRadius: 2, flexShrink: 0 }} />
          <p style={{
            margin: 0, color: "#fff",
            fontSize: "1rem", fontWeight: 700, lineHeight: 1.5,
          }}>
            {item.title}
          </p>
        </div>
      </motion.div>

      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem", marginTop: "1rem" }}>
        Click outside or press Esc to close
      </p>
    </motion.div>
  );
}

// ─── Award card ───────────────────────────────────────────────────────────────

/**
 * All thumbnails share one fixed frame size. Default: whole image shown
 * (contain) on a blurred copy of itself. `fillWidth`: for taller magazine
 * pages — image spans the full frame width, anchored to the top (the lower
 * part is hidden in the card; the lightbox always shows the full image).
 * `focus` overrides which part of a fillWidth image stays in view
 * (CSS object-position, e.g. "center 85%"); default is the top.
 */
function AwardCard({ img, title, fillWidth = false, focus }: {
  img: string; title: string; fillWidth?: boolean; focus?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [open,    setOpen]    = useState(false);

  return (
    <>
      <motion.article
        variants={fadeUp}
        className="award-card"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "zoom-in" }}
      >
        <div className="award-card__bar" />
        <div
          className={`award-card__img-wrap${fillWidth ? " award-card__img-wrap--fill-width" : ""}`}
          style={{ position: "relative", "--award-backdrop": `url("${img}")` } as CSSProperties}
        >
          <img
            src={img} alt={title} loading="lazy"
            style={{ objectPosition: focus, transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
          {/* Hover overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(26,26,26,0.52)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.5rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}>
            <ZoomIn size={32} color={BRAND_GOLD} strokeWidth={1.5} />
            <span style={{
              color: "#fff", fontSize: "0.8125rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Click to expand
            </span>
          </div>
        </div>
        <div className="award-card__body">
          <p className="award-card__title">{title}</p>
        </div>
      </motion.article>

      {open && <Lightbox item={{ img, title }} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Siemens card ─────────────────────────────────────────────────────────────

function SiemensCard({ img, caption }: { img: string; caption: string }) {
  const [hovered, setHovered] = useState(false);
  const [open,    setOpen]    = useState(false);

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="siemens-award-card"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "zoom-in" }}
      >
        <div className="siemens-award-card__bar" />
        <div className="siemens-award-card__img-wrap" style={{ position: "relative" }}>
          <img
            src={img} alt={caption} loading="lazy"
            style={{ transition: "transform 0.4s ease", transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(26,26,26,0.52)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.5rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}>
            <ZoomIn size={32} color={BRAND_GOLD} strokeWidth={1.5} />
            <span style={{
              color: "#fff", fontSize: "0.8125rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              Click to expand
            </span>
          </div>
        </div>
        <p className="siemens-award-card__caption">{caption}</p>
      </motion.div>

      {open && <Lightbox item={{ img, title: caption }} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Awards() {
  const d = SITE_DATA.awards;
  const s = SITE_DATA.siemens;

  return (
    <section
      id="awards"
      aria-label="Awards and Recognitions"
      className="awards"
      style={{ backgroundColor: BRAND_WARM, padding: "var(--section-pad, 4rem) 0" }}
    >
      <div className="section__inner">
        <Reveal>
          <SectionHeader title={d.title} tagline={d.tagline} />
        </Reveal>

        {/* ── Recognition certificates ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.06 }}
          variants={stagger}
          className="awards__grid"
        >
          {d.items.map((award) => (
<AwardCard
              key={award.id}
              img={award.images[0]}
              title={award.title}
              fillWidth={"fillWidth" in award ? award.fillWidth : false}
              focus={"focus" in award ? award.focus : undefined}
            />
          ))}
        </motion.div>

        {/* ── Siemens Calendars ── */}
        <Reveal>
          <h3 className="awards__subheading">{s.calendars.heading}</h3>
        </Reveal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.06 }}
          variants={stagger}
          className="awards__siemens-grid"
        >
          {s.calendars.items.map((item, i) => (
            <SiemensCard key={i} img={item.img} caption={item.caption} />
          ))}
        </motion.div>

        {/* ── Siemens Conferences ── */}
        <Reveal>
          <h3 className="awards__subheading" style={{ marginTop: "0.5rem" }}>
            {s.conferences.heading}
          </h3>
        </Reveal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.06 }}
          variants={stagger}
          className="awards__siemens-grid"
        >
          {s.conferences.items.map((item, i) => (
            <SiemensCard key={i} img={item.img} caption={item.caption} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
