/**
 * Services.tsx
 * ────────────
 * Renders three alternating service blocks (Engineering, Digital, Delivery).
 * Odd-numbered blocks are tinted and the image flips to the other side.
 */
import { motion } from "motion/react";
import { BRAND_DARK, BRAND_GOLD, BRAND_WARM, SITE_DATA } from "@/data/siteData";
import { Reveal, SectionHeader, ServiceItem, stagger } from "@/components/Shared";

export default function Services() {
  return (
    <>
      {SITE_DATA.services.map((service, i) => (
        <ServiceBlock key={service.id} service={service} tinted={i % 2 === 1} reverse={i % 2 === 1} />
      ))}
    </>
  );
}

type Service = (typeof SITE_DATA.services)[number];

function ServiceBlock({ service, tinted, reverse }: { service: Service; tinted: boolean; reverse: boolean }) {
  const imgSrc = `https://images.unsplash.com/photo-${service.imageId}?w=1200&h=800&fit=crop&auto=format`;

  return (
    <section
      id={service.id}
      aria-label={service.title}
      className="service-block"
      style={{ backgroundColor: tinted ? BRAND_WARM : "#fff", padding: "var(--section-pad, 4rem) 0" }}
    >
      <div style={{ maxWidth: "var(--max-width, 80rem)", margin: "0 auto", padding: "0 var(--gutter, 1.25rem)" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "3rem", alignItems: "center" }}>

          {/* Text column */}
          <div style={{ order: reverse ? 2 : 1 }}>
            <SectionHeader title={service.title} tagline={service.tagline} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={stagger}>
              {service.items.map((item) => (
                <ServiceItem key={item.name} name={item.name} subtitle={item.subtitle} badge={"badge" in item ? item.badge : undefined}
                  details={"details" in item ? item.details : undefined}
                  effect={"effect" in item ? item.effect : undefined}
                  effectTarget={"effectTarget" in item ? item.effectTarget : undefined}
                  badgeStyle={"badgeStyle" in item ? item.badgeStyle : undefined}
                />
              ))}
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ order: reverse ? 1 : 2, borderRadius: "0.75rem", overflow: "hidden" }}
          >
            <div style={{ paddingTop: "75%", position: "relative", backgroundColor: "#e7e5e4" }}>
              <img src={imgSrc} alt={service.imageAlt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, backgroundColor: BRAND_GOLD }} />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
