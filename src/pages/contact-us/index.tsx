import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import styles from "@/styles/contact.module.scss";
import { trackEvent } from "@/lib/ga";

const EMAIL_ENDPOINT =
  "https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification";

// Each topic is routed by the email service to its team inbox.
const topics = [
  { label: "General inquiry", type: "business" },
  { label: "Partnerships & corporate care", type: "business" },
  { label: "Careers", type: "career" },
  { label: "TeleHealth Units (THUs)", type: "thu" },
  { label: "Media & PR", type: "social" },
];

const contactDetails = [
  {
    icon: <FaPhone />,
    title: "Call us",
    text: "+92 311 115 1161",
    href: "tel:+923111151161",
  },
  {
    icon: <FaEnvelope />,
    title: "Email us",
    text: "contact@eshaafi.com",
    href: "mailto:contact@eshaafi.com",
  },
  {
    icon: <FaLocationDot />,
    title: "Visit us",
    text: "7th Floor, Business Hub Broadway Commercial, DHA Phase 8, Lahore, 54792",
  },
];

type FormErrors = { [key: string]: string };

export default function ContactUs() {
  useEffect(() => {
    if (!sessionStorage.getItem("contact_us_page_view_tracked")) {
      trackEvent("contact_us_page_view_clk", { section: "page_load" });
      sessionStorage.setItem("contact_us_page_view_tracked", "true");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(topics[0].label);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (name.trim().length < 2) newErrors.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      trackEvent("contact_us_form_error_clk", { section: "form", error_type: "validation" });
      return;
    }

    trackEvent("contact_us_form_submit_clk", { section: "form", topic });
    setIsLoading(true);
    const selected = topics.find((t) => t.label === topic) || topics[0];

    try {
      const response = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selected.type,
          name,
          email,
          phone,
          message,
          subject: `Contact Us - ${selected.label}`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());

      trackEvent("contact_us_form_success_clk", { section: "form", topic });
      setModalType("success");
      setName("");
      setEmail("");
      setPhone("");
      setTopic(topics[0].label);
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      trackEvent("contact_us_form_error_clk", { section: "form", error_type: "submission_failed" });
      setModalType("error");
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Head>
        <title>eShaafi | Contact Us</title>
        <meta
          name="description"
          content="Get in touch with eShaafi by phone, email or our contact form."
        />
      </Head>

      <section className={styles.hero}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Questions about appointments, partnerships or eShaafi Games? Our team
          is here to help.
        </p>
      </section>

      <section className={`container ${styles.content}`}>
        <div className={styles.details}>
          {contactDetails.map((item) => (
            <div key={item.title} className={styles.detailCard}>
              <span className={styles.detailIcon}>{item.icon}</span>
              <h2 className={styles.detailTitle}>{item.title}</h2>
              {item.href ? (
                <a href={item.href} className={styles.detailText}>
                  {item.text}
                </a>
              ) : (
                <p className={styles.detailText}>{item.text}</p>
              )}
            </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formTitle}>Send us a message</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? styles.invalid : ""}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.invalid : ""}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="topic">Topic</label>
              <select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {topics.map((t) => (
                  <option key={t.label} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={errors.message ? styles.invalid : ""}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              {modalType === "success" ? "Thank you!" : "Message not sent"}
            </h3>
            <p className={styles.modalMessage}>
              {modalType === "success"
                ? "We have received your message. Our team will get back to you soon."
                : "Something went wrong. Please try again, or email contact@eshaafi.com."}
            </p>
            <button className={styles.modalButton} onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
