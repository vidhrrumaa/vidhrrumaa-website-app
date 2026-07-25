/**
 * Navbar.tsx
 * ──────────
 * Fixed top navigation bar.
 *
 * Desktop (≥ 1024 px):
 *   Primary links + "More ↓" dropdown for Publications & Clients.
 *   No hamburger on desktop.
 *
 * Mobile / tablet (< 1024 px):
 *   Hamburger menu contains ALL links (primary + more).
 */
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, NAV_LINKS, MORE_LINKS, FONT } from "@/data/siteData";
import { scrollTo } from "@/utils/scroll";
import logoSrc from "@/images/VIDHRRUMAA_LOGO.jpg";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen,   setMoreOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    setMoreOpen(false);
    setTimeout(() => scrollTo(href), 80);
  };

  // Shared nav link button style — 14px keeps all links inside the grid column
  const navBtn = (color = "#525252"): React.CSSProperties => ({
    background: "none", border: "none", cursor: "pointer",
    fontSize: FONT.base, fontWeight: 600, color,
    padding: "5px 7px", borderRadius: 4, whiteSpace: "nowrap",
    transition: "color 0.2s", fontFamily: "inherit",
  });

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="navbar"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "#fff",
        borderBottom: `3px solid ${BRAND_GOLD}`,
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <div className="navbar__inner">
        <div className="navbar__row">

          {/* ── Logo ── */}
          <button
            className="navbar__logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Vidhrrumaa — scroll to top"
          >
            <img src={logoSrc} alt="Vidhrrumaa" className="navbar__logo-img" />
            <div className="navbar__brand-text">
              <span className="navbar__brand-name">VIDHRRUMAA</span>
              <span className="navbar__brand-sub">Engineering Excellence</span>
            </div>
          </button>

          {/* ── Desktop nav (≥ 1024 px) ── */}
          <div className="navbar__desktop-links" aria-label="Desktop navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => goTo(link.href)}
                style={navBtn()}
                onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
              >
                {link.label}
              </button>
            ))}

            {/* More dropdown */}
            <div ref={moreRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                style={{ ...navBtn(), display: "flex", alignItems: "center", gap: 4 }}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onMouseEnter={(e) => (e.currentTarget.style.color = BRAND_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
              >
                More
                <ChevronDown
                  size={12}
                  style={{ transition: "transform 0.2s", transform: moreOpen ? "rotate(180deg)" : "none" }}
                />
              </button>

              {moreOpen && (
                <div className="navbar__dropdown" role="menu">
                  {MORE_LINKS.map((link) => (
                    <button
                      key={link.href}
                      role="menuitem"
                      onClick={() => goTo(link.href)}
                      className="navbar__dropdown-item"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: CTA + hamburger ── */}
          <div className="navbar__actions">
            <button
              className="navbar__cta"
              onClick={() => goTo("#contact")}
              style={{ backgroundColor: BRAND_DARK }}
            >
              Contact Us
            </button>

            {/* Hamburger — mobile only (hidden ≥ 1024 px via CSS) */}
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} color={BRAND_DARK} /> : <Menu size={22} color={BRAND_DARK} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div id="mobile-menu" className="navbar__mobile-menu" role="menu">
            {/* All primary + more links */}
            {[...NAV_LINKS, ...MORE_LINKS].map((link) => (
              <button
                key={link.href}
                role="menuitem"
                onClick={() => goTo(link.href)}
                className="navbar__mobile-item"
              >
                {link.label}
              </button>
            ))}
            <div className="navbar__mobile-cta-wrap">
              <button
                onClick={() => goTo("#contact")}
                className="navbar__mobile-cta"
                style={{ backgroundColor: BRAND_DARK }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
