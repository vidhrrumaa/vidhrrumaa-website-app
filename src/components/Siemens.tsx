/**
 * Siemens.tsx
 * ───────────
 * Showcases Vidhrrumaa's Siemens PLM partnership:
 *   1. Featured in official Siemens PLM Software annual calendars
 *   2. Award-winning participation in Siemens PLM Conferences
 */
import { motion } from "motion/react";
import { BRAND_GOLD, BRAND_GOLD2, SITE_DATA } from "@/data/siteData";
import { Reveal, SectionHeader, stagger, fadeUp } from "@/components/Shared";

export default function Siemens() {
  const d = SITE_DATA.siemens;

  return (
    <section
      id="siemens"
      aria-label="Siemens Partnership"
      className="siemens"
      style={{ backgroundColor: "#fff", padding: "var(--section-pad) 0" }}
    >
      <div className="section__inner">
        <Reveal>
          <SectionHeader title={d.title} tagline={d.tagline} />
        </Reveal>

        {/* Calendars */}
        <Reveal>
          <h3 className="siemens__subheading">{d.calendars.heading}</h3>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.06 }}
          variants={stagger}
          className="siemens__grid"
        >
          {d.calendars.items.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="siemens-card">
              <div className="siemens-card__img-wrap">
                <img src={item.img} alt={item.caption} loading="lazy" />
              </div>
              <p className="siemens-card__caption">{item.caption}</p>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD2})` }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Conference participations */}
        <Reveal>
          <h3 className="siemens__subheading" style={{ marginTop: "0.5rem" }}>{d.conferences.heading}</h3>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.06 }}
          variants={stagger}
          className="siemens__conference-grid"
        >
          {d.conferences.items.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="siemens-card">
              <div className="siemens-card__img-wrap">
                <img src={item.img} alt={item.caption} loading="lazy" />
              </div>
              <p className="siemens-card__caption">{item.caption}</p>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD2})` }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
