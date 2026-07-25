/**
 * Academy.tsx
 * ───────────
 * Two-column layout: photo on the left, training offerings on the right.
 */
import { motion } from "motion/react";
import { BRAND_GOLD, BRAND_WARM, SITE_DATA } from "@/data/siteData";
import { Reveal, SectionHeader, ServiceItem, stagger } from "@/components/Shared";

export default function Academy() {
  const d = SITE_DATA.academy;
  const imgSrc = `https://images.unsplash.com/photo-${d.imageId}?w=1200&h=800&fit=crop&auto=format`;

  return (
    <section id="academy" aria-label="Academic Excellence" className="academy" style={{ backgroundColor: BRAND_WARM, padding: "var(--section-pad, 4rem) 0" }}>
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "3rem", alignItems: "center" }}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.6 }}
            style={{ borderRadius: "0.75rem", overflow: "hidden" }}
          >
            <div style={{ paddingTop: "75%", position: "relative", backgroundColor: "#e7e5e4" }}>
              <img src={imgSrc} alt={d.imageAlt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: BRAND_GOLD }} />
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <SectionHeader title={d.title} tagline={d.tagline} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={stagger}>
              {d.items.map((item) => (
                <ServiceItem key={item.name} name={item.name} subtitle={item.subtitle} />
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
