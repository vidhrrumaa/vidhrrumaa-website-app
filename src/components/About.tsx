/**
 * About.tsx
 * ─────────
 * Five topic cards that each expand an inline detail panel.
 * "Careers & Contact Us" scrolls directly to the contact section.
 * Cards all align to the top of the grid row (align-items: start).
 */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "@/components/Shared";
import { scrollTo } from "@/utils/scroll";
import profilePhoto from "@/images/Srinivas_Profile_Picture.png";

type AboutKey = "story" | "vision" | "leadership" | "partnerships" | "careers";

// ─── Panel content components ─────────────────────────────────────────────────

function StoryPanel() {
  return (
    <p className="about__text">
      VIDHRRUMAA BUSSINESS INNOWATTIIONS PRIVATE LIMITED is a high-impact engineering and technology company delivering advanced,
      end-to-end solutions across product development and digital transformation. Built on a strong foundation in
      mechanical R&D, we specialize in CAD/CAM/CAE engineering, intelligent software development, and AI-driven
      innovation tailored for global industries.
    </p>
  );
}

function VisionPanel() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "1rem" }}>
      {[
        {
          label: "Mission",
          bg: "#FDF9EC", border: "#fde68a", accent: BRAND_GOLD,
          text: "To deliver High-End, Value-added innovative engineering and software solutions that empower businesses, drive technological growth, and create value through excellence, integrity, and expertise.",
        },
        {
          label: "Vision",
          bg: "#fafaf9", border: "#e7e5e4", accent: BRAND_DARK,
          text: "To be a global leader in Specialized Engineering and software services, known for innovation, quality, and transformative solutions that shape a smarter and more connected future.",
        },
      ].map(({ label, bg, border, accent, text }) => (
        <div key={label} style={{ backgroundColor: bg, border: `1px solid ${border}`, borderRadius: "0.625rem", padding: "1.125rem 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
            <div style={{ width: "0.875rem", height: 2, backgroundColor: accent, borderRadius: 2 }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: accent }}>{label}</span>
          </div>
          <p className="about__text">{text}</p>
        </div>
      ))}
    </div>
  );
}

const STRENGTHS = SITE_DATA.about.strengths;

function LeadershipPanel() {
  return (
    <div>
      <div style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "flex-start" }}>
        {/* Shown uncropped (landscape) so the Vidhrrumaa logo on the wall behind stays visible */}
        <img
          src={profilePhoto} alt={`${SITE_DATA.contact.person} at the Vidhrrumaa office`}
          className="about__profile-photo"
        />
        <div style={{ flex: 1, minWidth: "12rem" }}>
          <div style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: BRAND_GOLD, marginBottom: "0.375rem" }}>SIEMENS Certified PLM / Digital Transformation Executive</div>
          <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: BRAND_DARK, margin: "0 0 0.25rem" }}>{SITE_DATA.contact.person}</h4>
          <p  style={{ fontSize: FONT.base, color: BRAND_GOLD, margin: "0 0 0.75rem", fontWeight: 600 }}>Founder, Vidhrrumaa</p>
          <div className="about__text-group">
            {SITE_DATA.about.leaderBio.split("\n").filter((para) => para.trim()).map((para, i) => (
              <p key={i} className="about__text">{para}</p>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "0.625rem", marginBottom: "0.875rem" }}>
        {STRENGTHS.map((s) => (
          <div key={s.title} style={{ display: "flex", gap: "0.625rem", backgroundColor: "#fff", border: "1px solid #e7e5e4", borderRadius: "0.5rem", padding: "0.75rem 0.875rem" }}>
            <div style={{ marginTop: "0.3125rem", width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: BRAND_GOLD, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="card-title">{s.title}</div>
              <p className="about__text about__text--sm" style={{ marginTop: "0.25rem" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderLeft: `3px solid ${BRAND_GOLD}`, backgroundColor: "#fafaf9", padding: "0.625rem 0.875rem", borderRadius: "0 0.375rem 0.375rem 0" }}>
        <p className="about__text">
          <strong>Ethical Leadership:</strong> Builds agile teams with a focus on transparency, trust, and continuous improvement.
        </p>
      </div>
    </div>
  );
}

function PartnershipsPanel() {
  const points = [
    "Collaborate with manufacturing units, tech companies, and academic institutions.",
    "Build alliances with international software resellers and outsourcing partners.",
    "Engage with government and R&D programs for innovation grants and projects.",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      {points.map((text) => (
        <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }} className="about__point">
          <div style={{ marginTop: "0.375rem", width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: BRAND_GOLD, flexShrink: 0 }} />
          <p className="about__text">{text}</p>
        </div>
      ))}
    </div>
  );
}

const PANELS: Record<string, { label: string; content: React.ReactNode }> = {
  story:        { label: "Our Story",              content: <StoryPanel /> },
  vision:       { label: "Vision & Mission",       content: <VisionPanel /> },
  leadership:   { label: "Leadership",             content: <LeadershipPanel /> },
  partnerships: { label: "Strategic Partnerships", content: <PartnershipsPanel /> },
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function About() {
  const d = SITE_DATA.about;
  const [activeKey, setActiveKey] = useState<AboutKey | null>(null);

  const toggle = (key: AboutKey) => {
    if (key === "careers") { scrollTo("#contact"); return; }
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section id="about" aria-label="About Vidhrrumaa" className="about" style={{ backgroundColor: "#fff", padding: "var(--section-pad, 4rem) 0" }}>
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal><SectionHeader title={d.title} tagline={d.tagline} /></Reveal>

        {/* Cards — align-items:start so all cards sit flush at the top */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={stagger}
          className="about__cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "0.875rem", alignItems: "start", marginBottom: "1rem" }}
        >
          {d.items.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <motion.button
                key={item.name}
                variants={fadeUp}
                onClick={() => toggle(item.key as AboutKey)}
                className="about__card"
                style={{
                  textAlign: "left", background: isActive ? BRAND_DARK : "#fff",
                  border: `1px solid ${isActive ? BRAND_DARK : "#e7e5e4"}`,
                  borderRadius: "0.75rem", padding: "1.125rem 1rem",
                  cursor: "pointer", transition: "all 0.2s", width: "100%",
                }}
                onMouseEnter={(e) => { if (!isActive) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#fcd34d"; el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.07)"; }}}
                onMouseLeave={(e) => { if (!isActive) { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#e7e5e4"; el.style.boxShadow = "none"; }}}
              >
                <div style={{ width: "1.5rem", height: 2, backgroundColor: BRAND_GOLD, borderRadius: 2, marginBottom: "0.75rem" }} />
                <div className={`card-title${isActive ? " card-title--on-dark" : ""}`}>{item.name}</div>
                <div className={`card-subtitle${isActive ? " card-subtitle--on-dark" : ""}`}>{item.subtitle}</div>

                {item.key !== "careers" ? (
                  <div style={{ marginTop: "0.625rem" }}>
                    <ChevronDown size={13} style={{ color: isActive ? BRAND_GOLD : "#a8a29e", transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.25s", display: "block" }} />
                  </div>
                ) : (
                  <div style={{ marginTop: "0.625rem", opacity: 0, transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  >
                    <ArrowRight size={13} style={{ color: BRAND_GOLD, display: "block" }} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Inline expanded panel */}
        <AnimatePresence>
          {activeKey && activeKey !== "careers" && PANELS[activeKey] && (
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ marginTop: "0.25rem", backgroundColor: "#fafaf9", border: "1px solid #e7e5e4", borderRadius: "0.75rem", padding: "1.5rem 1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: 3, height: "1.5rem", backgroundColor: BRAND_GOLD, borderRadius: 2, flexShrink: 0 }} />
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.375rem", fontWeight: 800, color: BRAND_DARK, margin: 0 }}>
                    {PANELS[activeKey].label.toUpperCase()}
                  </h3>
                </div>
                {PANELS[activeKey].content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
