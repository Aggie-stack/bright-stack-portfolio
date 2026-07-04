import { useState } from "react";

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
      <path d="m4 6 8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: `Thank you, ${formData.name}! Your message has been sent.`,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Server error. Please try again later.",
      });
    }

    setSending(false);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">

        <span className="section-eyebrow">Get in touch</span>
        <h2 className="section-title">Contact me</h2>

        <p className="contact-intro">
          Have a project in mind or just want to say hello? Reach out
          directly or send a message below.
        </p>

        <div className="contact-info">
          <a href="mailto:ruwaroagatha7@gmail.com">
            <IconMail />
            ruwaroagatha7@gmail.com
          </a>
          <a href="tel:+254701592594">
            <IconPhone />
            +254 701 592 594
          </a>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>

            {status && (
              <div className={`contact-status ${status.type}`}>
                {status.message}
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;