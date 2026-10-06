import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TbArrowRight, TbArrowUpRight, TbBrandGithub, TbBrandLinkedin, TbChevronUp, TbMail, TbMinus, TbX } from "react-icons/tb";
import { personalInfo } from "../data/personal";
import { ContactFormValidator } from "../lib/validators";

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const contactLinks = [
  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: TbMail },
  { label: "GitHub", value: handle(personalInfo.github), href: personalInfo.github, Icon: TbBrandGithub, external: true },
  { label: "LinkedIn", value: handle(personalInfo.linkedin), href: personalInfo.linkedin, Icon: TbBrandLinkedin, external: true },
];

// Set at build time in vite.config.js: true once public/resume.pdf exists.
const showResume = Boolean(personalInfo.resume) && __HAS_RESUME__;

// With a form endpoint (see personal.js) messages are sent directly; without one, the form
// opens the visitor's email app with the message filled in, and says so.
const endpoint = personalInfo.contactFormEndpoint;
const emptyForm = { name: "", email: "", message: "" };
const validator = new ContactFormValidator();

function StatusNote({ status }) {
  if (status === "sending") return "Sending…";
  if (status === "sent") return "Thanks! Your message was sent. I’ll reply to the email you entered.";
  if (status === "opened") return "Your email app should open with the message ready to send.";
  if (status === "invalid") return "Please fix the highlighted fields and try again.";
  if (status === "error") {
    return (
      <>Something went wrong. Please email me at <a className="text-link" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.</>
    );
  }
  return endpoint ? "I’ll reply to the email address you enter." : "This opens your email app with your message filled in.";
}

// aria attributes that tie an input to its error message.
const fieldA11y = (name, errors) => ({
  "aria-invalid": errors[name] ? "true" : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

function FieldError({ name, error }) {
  return error ? <p id={`${name}-error`} className="field-error">{error}</p> : null;
}

function MessageWindow({ open, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  // Closing resets the window so it reopens expanded.
  const close = useCallback(() => {
    setMinimized(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => firstFieldRef.current?.focus({ preventScroll: true }));
    const handleKeyDown = (event) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  // Re-check a field as the visitor types, but only once it has shown an error, so an untouched
  // field never nags. Blur and submit do the first check.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validator.validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validator.validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors: found, isValid } = validator.validateAll(formData);
    setErrors(found);
    if (!isValid) {
      setStatus("invalid");
      // Move focus to the first field that needs fixing.
      e.currentTarget.elements[Object.keys(found)[0]]?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\nReply to: ${formData.email}`);
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      setStatus("opened");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
      setFormData(emptyForm);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <div
      className={`message-window${open ? " is-open" : ""}${minimized ? " is-minimized" : ""}`}
      role="dialog"
      aria-labelledby="message-window-title"
      inert={!open}
      data-lenis-prevent
    >
      <div className="message-window-header">
        <h2 id="message-window-title">Send me a message</h2>
        <div className="message-window-actions">
          <button
            type="button"
            onClick={() => setMinimized((value) => !value)}
            aria-expanded={!minimized}
            aria-controls="message-window-body"
            aria-label={minimized ? "Expand message window" : "Minimize message window"}
          >
            {minimized ? <TbChevronUp aria-hidden="true" /> : <TbMinus aria-hidden="true" />}
          </button>
          <button type="button" onClick={close} aria-label="Close message window">
            <TbX aria-hidden="true" />
          </button>
        </div>
      </div>

      <form id="message-window-body" className="message-window-body" onSubmit={handleSubmit} noValidate>
        <div className="line-field">
          <label htmlFor="name" className="label">Full name</label>
          <input ref={firstFieldRef} type="text" id="name" name="name" autoComplete="name" placeholder="Your full name" value={formData.name} onChange={handleChange} onBlur={handleBlur} aria-required="true" {...fieldA11y("name", errors)} />
          <FieldError name="name" error={errors.name} />
        </div>
        <div className="line-field">
          <label htmlFor="email" className="label">Email address</label>
          <input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} onBlur={handleBlur} aria-required="true" {...fieldA11y("email", errors)} />
          <FieldError name="email" error={errors.email} />
        </div>
        <div className="line-field">
          <label htmlFor="message" className="label">Message</label>
          <textarea id="message" name="message" rows={6} placeholder="Tell me about your project or role..." value={formData.message} onChange={handleChange} onBlur={handleBlur} aria-required="true" {...fieldA11y("message", errors)} />
          <FieldError name="message" error={errors.message} />
        </div>
        <div className="message-window-footer">
          <button type="submit" className="btn btn-primary btn-large" disabled={sending}>
            {endpoint ? (sending ? "Sending…" : "Send message") : "Open email app"}
            {!sending && <TbArrowRight aria-hidden="true" />}
          </button>
          <p className={`message-window-note${status === "error" || status === "invalid" ? " is-error" : ""}`} role="status">
            <StatusNote status={status} />
          </p>
        </div>
      </form>
    </div>
  );
}

export default function Contact() {
  const [windowOpen, setWindowOpen] = useState(false);
  const openButtonRef = useRef(null);

  const closeWindow = useCallback(() => {
    setWindowOpen(false);
    openButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="contact" className="page-section" aria-labelledby="contact-title">
      <div className="section-container contact-layout">
        <div className="contact-intro">
          <h2 id="contact-title" className="section-title contact-title">Let’s work together.</h2>
          <p className="contact-subhead reveal">Have a role or a project in mind?</p>
          <p className="section-lede">Send me a note. Email is the fastest way to reach me.</p>
          {showResume && (
            <a className="btn btn-primary btn-large reveal" href={personalInfo.resume} download>
              Download resume <TbArrowRight aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="contact-side">
          <ul className="contact-cards" data-stagger>
            {contactLinks.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a className="contact-card" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="contact-card-icon"><Icon aria-hidden="true" /></span>
                  <span className="contact-card-text">
                    <span className="label">{label}</span>
                    <span className="contact-card-value">{value}</span>
                  </span>
                  {external && <TbArrowUpRight className="contact-card-arrow" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
          <button
            ref={openButtonRef}
            type="button"
            className="btn btn-large contact-open reveal"
            onClick={() => setWindowOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={windowOpen}
          >
            Send me a message <TbArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      {createPortal(<MessageWindow open={windowOpen} onClose={closeWindow} />, document.body)}
    </section>
  );
}
