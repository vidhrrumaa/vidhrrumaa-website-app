/**
 * Footer.tsx — Minimal brand footer.
 * Nav links omitted: the fixed navbar already provides full-page navigation,
 * so a duplicate footer nav adds clutter without UX value.
 */
import { motion } from "motion/react";
import { BRAND_GOLD } from "@/data/siteData";
import logoSrc from "@/images/VIDHRRUMAA_LOGO.jpg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="contentinfo"
      className="footer"
      style={{ borderTop: `3px solid ${BRAND_GOLD}` }}
    >
      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <img src={logoSrc} alt="Vidhrrumaa" className="footer__logo" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="footer__brand-name">VIDHRRUMAA</span>
            <span className="footer__brand-sub">Engineering Excellence</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="footer__copy">
          © {year} VIDHRRUMAA BUSSINESS INNOWATTIIONS PRIVATE LIMITED. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}