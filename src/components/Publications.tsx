/**
 * Publications.tsx
 * ────────────────
 * Recognition cards with year placed below the heading (not before it),
 * so cards without a year still align consistently with all other cards.
 * All links are real anchors that open in a new tab.
 */
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, BRAND_GOLD2, BRAND_WARM, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "@/components/Shared";

export default function Publications() {
  const d = SITE_DATA.publications;

  return (
    <section id="publications" aria-label="Publications & Industry Recognitions" className="publications" style={{ backgroundColor: BRAND_WARM, padding: "var(--section-pad, 4rem) 0" }}>
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal><SectionHeader title={d.title} tagline={d.tagline} /></Reveal>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.06 }} variants={stagger}
          className="publications__grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))", gap: "1rem" }}
        >
          {d.items.map((pub) => (
            <motion.article
              key={pub.id}
              variants={fadeUp}
              className="pub-card"
              style={{
                backgroundColor: "#fff", border: "1px solid #e7e5e4",
                borderRadius: "0.75rem", overflow: "hidden",
                display: "flex", flexDirection: "column",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; el.style.borderColor = "#fcd34d"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.borderColor = "#e7e5e4"; }}
            >
              {/* Accent bar */}
              <div className="pub-card__bar" style={{ height: 3, background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD2})` }} />

              <div className="pub-card__body" style={{ padding: "1.125rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Title — always at the top for consistent alignment */}
                <h3 className="pub-card__title" style={{ fontWeight: 700, color: BRAND_DARK, margin: "0 0 0.5rem", lineHeight: 1.45 }}>
                  {pub.title}
                </h3>

                {/* Year badge — immediately below title; invisible spacer if empty so grid rows stay aligned */}
                <div className="pub-card__meta" style={{ marginBottom: "0.375rem", minHeight: "1.25rem" }}>
                  {pub.year && (
                    <span
                      className="pub-card__year"
                      style={{
                        display: "inline-block", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: BRAND_GOLD, backgroundColor: "#FDF9EC",
                        border: "1px solid #fde68a", borderRadius: "1rem",
                        padding: "0.125rem 0.5rem",
                      }}
                    >
                      {pub.year}
                    </span>
                  )}
                </div>

                {/* Organization */}
                <p className="pub-card__org" style={{ fontWeight: 600, color: BRAND_GOLD, margin: "0 0 0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {pub.organization}
                </p>

                {/* Links */}
                <div className="pub-card__links" style={{ borderTop: "1px solid #f5f5f4", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem", marginTop: "auto" }}>
                  {pub.links.map((link) => (
                    link.href ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pub-card__link"
                      >
                        <ExternalLink size={10} style={{ flexShrink: 0, marginTop: "0.1875rem", color: BRAND_GOLD }} />
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      /* Plain text for entries without a URL (NX Best Practices note) */
                      <div key={link.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.375rem" }}>
                        <span style={{ color: BRAND_GOLD, fontSize: FONT.sm, marginTop: "0.0625rem", flexShrink: 0 }}>›</span>
                        <span style={{ color: "#525252", lineHeight: 1.45 }}>{link.label}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
