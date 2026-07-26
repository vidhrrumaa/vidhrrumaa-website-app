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
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, CheckCircle, Upload } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, BRAND_GOLD2, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader } from "@/components/Shared";
import { TurnstileWidget, type TurnstileHandle } from "@/components/Turnstile";
import { sendContactMessage } from "@/lib/api";
import profilePhoto from "@/images/Srinivas_Profile_Picture.png";

type FormState = "idle" | "submitting" | "success";

// ─── Dark-surface input style ─────────────────────────────────────────────────

const darkInput: React.CSSProperties = {
  width: "100%", padding: "0.5rem 0.875rem",
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

  const fileRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!turnstileToken) {
      setError("Please complete the verification challenge.");
      return;
    }
    setFormState("submitting");
    try {
      await sendContactMessage({
        fullName: form.name,
        email: form.email,
        message: form.message,
        attachment: fileRef.current?.files?.[0] ?? null,
        turnstileToken,
      });
      setFormState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setFormState("idle");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }
  };

  const reset = () => {
    setFormState("idle");
    setError(null);
    setForm({ name: "", email: "", message: "" });
    setFileName(null);
    setTurnstileToken(null);
    if (fileRef.current) fileRef.current.value = "";
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
                    rows={3} placeholder="Tell us about your project..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...darkInput, resize: "vertical" }}
                    onFocus={(e) => { e.target.style.borderColor = BRAND_GOLD; e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
                <div className="contact-form__field">
                  <DarkFieldLabel label="Attachment (optional)" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="contact-form__upload"
                  >
                    <Upload size={16} style={{ flexShrink: 0 }} />
                    <span>{fileName ?? "Click to upload PDF, DOC, DOCX or image (max 5 MB)"}</span>
                  </button>
                  <input
                    ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </div>
                <div className="contact-form__field">
                  <TurnstileWidget ref={turnstileRef} theme="dark" onVerify={setTurnstileToken} onExpire={() => setTurnstileToken(null)} />
                </div>

                {error && (
                  <p className="contact-form__error" role="alert" style={{ color: "#f87171" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting" || !turnstileToken}
                  className="contact__btn-primary"
                  style={{ backgroundColor: BRAND_GOLD, color: BRAND_DARK, opacity: formState === "submitting" || !turnstileToken ? 0.7 : 1 }}
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
