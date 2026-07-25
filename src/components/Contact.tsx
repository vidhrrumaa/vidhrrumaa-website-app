/**
 * Contact.tsx
 * ───────────
 * Two-column contact section.
 * Both cards share the same dark-gradient shell so they look visually paired.
 * The grid uses align-items:stretch so cards always reach equal height.
 *
 * Text contrast follows WCAA AA on dark backgrounds:
 *   • Primary text  → #ffffff  (max contrast)
 *   • Secondary     → #d4d4d4  (≥ 4.5:1 on #1A1A1A)
 *   • Captions      → #a8a8a8  (≥ 3:1 for large/bold labels)
 */
import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, BRAND_GOLD2, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader } from "@/components/Shared";
import profilePhoto from "@/images/Srinivas_Profile_Picture.png";

type FormState = "idle" | "submitting" | "success";

// ─── Dark-surface input style ─────────────────────────────────────────────────

const darkInput: React.CSSProperties = {
  width: "100%", padding: "0.6875rem 0.875rem",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "var(--input-radius)",
  backgroundColor: "rgba(255,255,255,0.07)",
  color: "#ffffff",
  outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", lineHeight: 1.5,
  transition: "border-color 0.2s, background-color 0.2s",
};

function DarkFieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="contact-form__label">
      {label} {required && <span style={{ color: BRAND_GOLD }}>*</span>}
    </label>
  );
}

// ─── Shared dark card shell ───────────────────────────────────────────────────

const darkCard: React.CSSProperties = {
  background: `linear-gradient(145deg, ${BRAND_DARK} 0%, #242424 100%)`,
  borderRadius: "1rem",
  padding: "1.75rem",
  color: "#ffffff",
  boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
  display: "flex",
  flexDirection: "column",
  height: "100%", // stretch to grid row height
};

const goldBar: React.CSSProperties = {
  height: 3, borderRadius: 2,
  background: `linear-gradient(90deg, ${BRAND_GOLD}, ${BRAND_GOLD2})`,
  marginBottom: "1.375rem",
  flexShrink: 0,
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const c = SITE_DATA.contact;

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  };

  const reset = () => {
    setFormState("idle");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" aria-label="Contact Vidhrrumaa" className="contact" style={{ backgroundColor: "#fff", padding: "var(--section-pad) 0" }}>
      <div className="section__inner">
        <Reveal>
          <SectionHeader
            title="Contact Us"
            tagline="Ready to transform your engineering operations? Reach out and let's build something exceptional together."
          />
        </Reveal>

        {/* Grid — align-items:stretch makes both cards the same height */}
        <Reveal className="contact__grid">

          {/* ── Founder card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
            style={darkCard}
            className="contact__card contact__card--founder"
          >
            <div style={goldBar} />

            {/* Person header */}
            <div className="contact__person">
              <img
                src={profilePhoto} alt={c.person}
                className="contact__avatar"
                style={{ border: `2px solid ${BRAND_GOLD}` }}
              />
              <div>
                <p className="contact__person-name">{c.person}</p>
                <p className="contact__person-role">Founder, Vidhrrumaa</p>
                <p className="contact__person-cert">SIEMENS Certified PLM Executive</p>
              </div>
            </div>

            {/* Contact links */}
            <div className="contact__links">
              {[
                { label: "Phone", value: `+${c.phone}`, href: `tel:+${c.phone.replace(/-/g, "")}`, Icon: Phone },
                { label: "Email", value: c.email,       href: `mailto:${c.email}`,                  Icon: Mail  },
              ].map(({ label, value, href, Icon }) => (
                <a key={label} href={href} className="contact__link-row">
                  <div className="contact__link-icon" style={{ backgroundColor: BRAND_GOLD }}>
                    <Icon size={16} color={BRAND_DARK} />
                  </div>
                  <div>
                    <div className="contact__link-label">{label}</div>
                    <div className="contact__link-value">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Description — pushed to bottom via margin-top:auto */}
            <div className="contact__description">
              <p>{SITE_DATA.company.description}</p>
            </div>
          </motion.div>

          {/* ── Send a Message card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={darkCard}
            className="contact__card contact__card--form"
          >
            <div style={goldBar} />

            <h3 className="contact__form-title">SEND A MESSAGE</h3>
            <p className="contact__form-sub">Have a project in mind? Drop us a message and we'll get back to you.</p>

            {formState === "success" ? (
              <div className="contact__success">
                <CheckCircle size={46} color={BRAND_GOLD} />
                <p className="contact__success-title">Message Sent!</p>
                <p className="contact__success-sub">We'll get back to you shortly.</p>
                <button onClick={reset} className="contact__btn-secondary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__field">
                  <DarkFieldLabel label="Full Name" required />
                  <input
                    type="text" required placeholder="Your name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={darkInput}
                    onFocus={(e) => { e.target.style.borderColor = BRAND_GOLD; e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
                <div className="contact-form__field">
                  <DarkFieldLabel label="Email" required />
                  <input
                    type="email" required placeholder="your@email.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={darkInput}
                    onFocus={(e) => { e.target.style.borderColor = BRAND_GOLD; e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
                <div className="contact-form__field">
                  <DarkFieldLabel label="Message" />
                  <textarea
                    rows={5} placeholder="Tell us about your project..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...darkInput, resize: "vertical" }}
                    onFocus={(e) => { e.target.style.borderColor = BRAND_GOLD; e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="contact__btn-primary"
                  style={{ backgroundColor: BRAND_GOLD, color: BRAND_DARK }}
                >
                  {formState === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
