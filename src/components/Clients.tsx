/**
 * Clients.tsx
 * ───────────
 * Displays client logo cards in a responsive grid.
 * Each card shows a logo and the client name.
 * All data comes from siteData.ts.
 */
import { motion } from "motion/react";
import {
  BRAND_GOLD,
  BRAND_GOLD2,
  SITE_DATA,
} from "@/data/siteData";
import {
  Reveal,
  SectionHeader,
  stagger,
  fadeUp,
} from "@/components/Shared";

// ─── Wordmark (fallback logo built from the client name) ─────────────────────
// Simple text logo in the style of the existing image logos: a small dark
// monogram tile plus the name (legal suffix dropped) in plain bold caps.

const LEGAL_SUFFIX = /\s+(PRIVATE\s+LIMITED|PVT\.?\s*LTD\.?|LIMITED|LTD\.?)$/i;

function Wordmark({ name }: { name: string }) {
  const core     = name.replace(LEGAL_SUFFIX, "").trim();
  const initials = core.split(/\s+/).map((w) => w[0]).join("").slice(0, 3);

  return (
    <div className="client-wordmark" aria-hidden="true">
      <span className="client-wordmark__mark">{initials}</span>
      <span className="client-wordmark__name">{core}</span>
    </div>
  );
}

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
                  <Wordmark name={client.name} />
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