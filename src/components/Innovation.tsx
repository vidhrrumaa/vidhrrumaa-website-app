/**
 * Innovation.tsx
 * ──────────────
 * Dark-background four-column card grid for Innovation Hub offerings.
 */
import { motion } from "motion/react";
import { BRAND_DARK, BRAND_GOLD, SITE_DATA } from "@/data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "@/components/Shared";

export default function Innovation() {
  const d = SITE_DATA.innovation;

  return (
    <section id="innovation" aria-label="Innovation Hub" className="innovation" style={{ backgroundColor: BRAND_DARK, padding: "var(--section-pad, 4rem) 0" }}>
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal><SectionHeader title={d.title} tagline={d.tagline} light /></Reveal>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13.75rem, 1fr))", gap: "1rem" }}
        >
          {d.items.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="innovation__card"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,164,50,0.18)", borderRadius: "0.75rem", padding: "1.375rem 1.5rem", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,164,50,0.45)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,164,50,0.18)")}
            >
              <div style={{ width: "1.5rem", height: 2, backgroundColor: BRAND_GOLD, borderRadius: 2, marginBottom: "0.875rem" }} />
              <h3 className="card-title card-title--on-dark">{item.name}</h3>
              <p className="card-subtitle card-subtitle--on-dark">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
