/**
 * Hero.tsx
 * ────────
 * Full-viewport hero with Unsplash engineering background, stat counters,
 * and animated entrance via motion/react.
 */
import { motion } from "motion/react";
import { BRAND_DARK, BRAND_GOLD, SITE_DATA, FONT } from "@/data/siteData";
import { scrollTo } from "@/utils/scroll";
import { fadeUp, stagger } from "@/components/Shared";

export default function Hero() {
  return (
    <section id="home" aria-label="Hero — Vidhrrumaa" className="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: BRAND_DARK }}>

      {/* Background image + overlay */}
      <img
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&auto=format"
        alt="" aria-hidden="true" fetchPriority="high"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(26,26,26,0.88) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent)` }} />

      {/* Content */}
      <div className="hero__content" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "6rem var(--gutter, 1.25rem) 3.75rem", textAlign: "center", color: "#fff" }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>

          <motion.p variants={fadeUp} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: FONT.base, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: BRAND_GOLD, margin: 0 }}>
            Engineering Excellence — Global Delivery
          </motion.p>

          <motion.h1 variants={fadeUp} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3.25rem, 10vw, 6.875rem)", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, margin: 0 }}>
            VIDHRRUMAA
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.125rem, 3vw, 1.875rem)", fontWeight: 300, color: "#e5e5e5", maxWidth: "42rem", margin: 0, lineHeight: 1.3 }}>
            {SITE_DATA.company.tagline}
          </motion.p>

          <motion.p variants={fadeUp} style={{ fontSize: FONT.base, color: "#a3a3a3", maxWidth: "32rem", margin: 0, lineHeight: 1.65 }}>
            {SITE_DATA.company.description}
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={() => scrollTo("#engineering")}
              style={{ background: BRAND_GOLD, color: BRAND_DARK, border: "none", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 700, padding: "0.8125rem 1.75rem", borderRadius: "0.375rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              style={{ background: "transparent", color: "#fff", border: "2px solid rgba(196,164,50,0.45)", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 700, padding: "0.8125rem 1.75rem", borderRadius: "0.375rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
          className="hero__stats"
          style={{ display: "flex", justifyContent: "center", gap: "clamp(1.5rem, 6vw, 3.75rem)", marginTop: "3.5rem" }}
        >
          {SITE_DATA.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 800, color: BRAND_GOLD, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: FONT.base, color: "#737373", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.375rem" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
