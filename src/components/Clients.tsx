/**
 * Clients.tsx
 * ───────────
 * Displays client logo cards in a responsive grid.
 * Each card shows a logo and the client name.
 * All data comes from siteData.ts.
 */
import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import {
  BRAND_DARK,
  BRAND_GOLD,
  BRAND_GOLD2,
  SITE_DATA,
  FONT,
} from "@/data/siteData";
import {
  Reveal,
  SectionHeader,
  stagger,
  fadeUp,
} from "@/components/Shared";

export default function Clients() {
  const d = SITE_DATA.clients;

  return (
    <section
      id="clients"
      aria-label="Our Clients"
      className="clients"
      style={{
        backgroundColor: "#fff",
        padding: "var(--section-pad) 0",
      }}
    >
      <div className="section__inner">
        <Reveal>
          <SectionHeader title={d.title} tagline={d.tagline} />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={stagger}
          className="clients__grid"
        >
          {d.items.map((client) => (
            <motion.div
              key={client.id}
              variants={fadeUp}
              className="client-card"
            >
              {/* Logo area */}
              <div className="client-card__logo-wrap">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="client-card__logo-img"
                  />
                ) : (
                  <div className="client-card__logo-placeholder">
                    <Building2
                      size={28}
                      color={BRAND_DARK}
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="client-card__info">
                <p className="client-card__name">
                  {client.name}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div
                className="client-card__bar"
                style={{
                  background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD2})`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}