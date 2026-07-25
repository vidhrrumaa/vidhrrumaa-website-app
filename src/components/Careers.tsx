/**
 * Careers.tsx
 * ───────────
 * Application form. Multi-select options (Domain, Software) use rectangular
 * pill tags (border-radius: 0.125rem / 2px) — the enterprise-standard pattern
 * for compact multi-select when the option set is small (< 15 items).
 *
 * Why pills over a listbox:
 *   - All choices are visible at once — no scrolling, no hidden options.
 *   - Faster to scan and tap on touch devices.
 *   - Listboxes are better when option counts exceed ~20 or labels are long.
 */
import { useRef, useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { BRAND_DARK, BRAND_GOLD, BRAND_WARM, SITE_DATA, FONT } from "@/data/siteData";
import { Reveal, SectionHeader } from "@/components/Shared";

// ─── Shared light-surface input style ────────────────────────────────────────

const lightInput: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.875rem", border: "1px solid var(--input-border)",
  borderRadius: "var(--input-radius)",
  backgroundColor: "var(--input-bg)", color: "var(--input-color)",
  outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", lineHeight: 1.5, transition: "border-color 0.18s",
};

const focusBorder = (e: React.FocusEvent<HTMLElement>) => (e.currentTarget.style.borderColor = BRAND_GOLD);
const blurBorder  = (e: React.FocusEvent<HTMLElement>) => (e.currentTarget.style.borderColor = "var(--input-border)");

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="careers-form__label">
      {label} {required && <span style={{ color: BRAND_GOLD }}>*</span>}
    </label>
  );
}

// ─── Multi-select pill tag ────────────────────────────────────────────────────

function PillSelect({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);

  return (
    <div className="pill-group">
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={selected}
            className={`pill-group__item${selected ? " pill-group__item--selected" : ""}`}
            style={{
              backgroundColor: selected ? BRAND_GOLD : "#fafaf9",
              borderColor:     selected ? BRAND_GOLD : "#e0e0e0",
              color:           selected ? BRAND_DARK : "#525252",
              fontWeight:      selected ? 700 : 500,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type CareerForm = {
  firstName: string; lastName:   string;
  email:     string; phone:      string;
  role:      string; experience: string;
  domain:    string[]; software: string[];
  summary:   string;
};

const emptyForm = (): CareerForm => ({
  firstName: "", lastName: "", email: "", phone: "",
  role: "", experience: "", domain: [], software: [], summary: "",
});

export default function Careers() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status,   setStatus]   = useState<"idle" | "sending" | "sent">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [form, setForm] = useState<CareerForm>(emptyForm());

  const set = (field: keyof CareerForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1400);
  };

  const reset = () => { setStatus("idle"); setFileName(null); setForm(emptyForm()); if (fileRef.current) fileRef.current.value = ""; };

  const careers = SITE_DATA.careers;

  return (
    <section id="careers" aria-label="Careers at Vidhrrumaa" className="careers" style={{ backgroundColor: BRAND_WARM, padding: "var(--section-pad) 0" }}>
      <div style={{ maxWidth: "54rem", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Reveal>
          <SectionHeader
            title="Careers"
            tagline="Join a growing team of engineering and technology professionals. We are always looking for passionate talent."
          />
        </Reveal>

        {status === "sent" ? (
          <div className="careers__success">
            <div className="careers__success-icon" style={{ backgroundColor: BRAND_GOLD }}>
              <CheckCircle size={28} color={BRAND_DARK} />
            </div>
            <h3 className="careers__success-title" style={{ color: BRAND_DARK }}>Application Received!</h3>
            <p className="careers__success-sub">Thank you for your interest in joining Vidhrrumaa. Our team will review your application and reach out to you soon.</p>
            <button onClick={reset} className="careers__btn" style={{ backgroundColor: BRAND_DARK }}>Submit Another Application</button>
          </div>
        ) : (
          <Reveal className="careers__form-card">
            <form onSubmit={handleSubmit} className="careers-form">

              {/* Name row */}
              <div className="careers-form__row">
                <div className="careers-form__field">
                  <FieldLabel label="First Name" required />
                  <input type="text" required placeholder="First name" value={form.firstName} onChange={set("firstName")} style={lightInput} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div className="careers-form__field">
                  <FieldLabel label="Last Name" required />
                  <input type="text" required placeholder="Last name"  value={form.lastName}  onChange={set("lastName")}  style={lightInput} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
              </div>

              {/* Contact row */}
              <div className="careers-form__row">
                <div className="careers-form__field">
                  <FieldLabel label="Email ID" required />
                  <input type="email" required placeholder="your@email.com"      value={form.email} onChange={set("email")} style={lightInput} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
                <div className="careers-form__field">
                  <FieldLabel label="Contact Number" required />
                  <input type="tel"   required placeholder="+91 00000 00000" value={form.phone} onChange={set("phone")} style={lightInput} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
              </div>

              {/* Role + Experience row */}
              <div className="careers-form__row">
                <div className="careers-form__field">
                  <FieldLabel label="Area of Interest" required />
                  <select required value={form.role} onChange={set("role")} style={{ ...lightInput, cursor: "pointer" }} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select a role</option>
                    {careers.roles.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="careers-form__field">
                  <FieldLabel label="Years of Experience" required />
                  <select required value={form.experience} onChange={set("experience")} style={{ ...lightInput, cursor: "pointer" }} onFocus={focusBorder} onBlur={blurBorder}>
                    <option value="">Select range</option>
                    {careers.experiences.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>

              {/* Domain */}
              <div className="careers-form__field">
                <FieldLabel label="Domain" required />
                <PillSelect options={careers.domains} value={form.domain} onChange={(v) => setForm((p) => ({ ...p, domain: v }))} />
                <p className="careers-form__hint">Select all that apply</p>
              </div>

              {/* Software */}
              <div className="careers-form__field">
                <FieldLabel label="Software Expertise" required />
                <PillSelect options={careers.softwares} value={form.software} onChange={(v) => setForm((p) => ({ ...p, software: v }))} />
                <p className="careers-form__hint">Select all that apply</p>
              </div>

              {/* Summary */}
              <div className="careers-form__field">
                <FieldLabel label="Profile Summary / Cover Letter" required />
                <textarea required rows={5} placeholder="Tell us about yourself, your experience, and why you want to join Vidhrrumaa..." value={form.summary} onChange={set("summary")} style={{ ...lightInput, resize: "vertical" }} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              {/* Resume upload */}
              <div className="careers-form__field">
                <FieldLabel label="Attach Resume" required />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="careers-form__upload"
                  style={{ color: fileName ? BRAND_DARK : "#a3a3a3" }}
                >
                  <Upload size={16} style={{ flexShrink: 0 }} />
                  <span>{fileName ?? "Click to upload PDF, DOC or DOCX (max 5 MB)"}</span>
                </button>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" required style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
              </div>

              <div className="careers-form__submit-row">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="careers__btn careers__btn--primary"
                  style={{ backgroundColor: BRAND_DARK, opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
