/**
 * Industries.tsx
 * ──────────────
 * Five-column icon card grid covering Vidhrrumaa's target verticals.
 */
import { motion } from "motion/react";
import { BRAND_DARK, BRAND_GOLD, INDUSTRY_ICONS, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "@/components/Shared";

export default function Industries() {
  const d = SITE_DATA.industries;

  return (
    <section id="industries" aria-label="Industries we serve" className="industries" style={{ backgroundColor: "#fff", padding: "var(--section-pad, 4rem) 0" }}>
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal><SectionHeader title={d.title} tagline={d.tagline} /></Reveal>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))", gap: "0.875rem" }}
        >
          {d.items.map((item) => {
            const Icon = INDUSTRY_ICONS[item.icon as keyof typeof INDUSTRY_ICONS];
            return (
              <motion.div
                key={item.name}
                variants={fadeUp}
                className="industries__card"
                style={{ backgroundColor: "#fff", border: "1px solid #e7e5e4", borderRadius: "0.75rem", padding: "1.25rem 1rem", textAlign: "center", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#fcd34d"; el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#e7e5e4"; el.style.boxShadow = "none"; }}
              >
                <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", backgroundColor: "#F5E9C6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                  {Icon ? <Icon size={18} strokeWidth={1.5} color={BRAND_DARK} /> : null}
                </div>
                <h3 style={{ fontSize: FONT.base, fontWeight: 700, color: BRAND_DARK, margin: "0 0 0.25rem", lineHeight: 1.3 }}>{item.name}</h3>
                <p  style={{ fontSize: FONT.sm, color: "#78716c", margin: 0, lineHeight: 1.4 }}>{item.subtitle}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
