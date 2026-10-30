import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBullhorn, FaEnvelope, FaHandshake, FaPhone } from "react-icons/fa6";
import styles from "@/styles/contact.module.scss";
import { trackEvent } from "@/lib/ga";

const EMAIL_ENDPOINT =
  "https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage/new/patient/emailWebsite/notification";

// Each topic is routed by the email service to its team inbox.
const topics = [
  { label: "Advertising & monetization", type: "business" },
  { label: "Publishing & game partnerships", type: "business" },
  { label: "General games question", type: "business" },
  { label: "Media & PR", type: "social" },
];

const partnerCards = [
  {
    icon: <FaBullhorn />,
    title: "Advertisers & ad networks",
    text: "Reach players across our action, puzzle, racing and adventure games with rewarded, interstitial and banner placements.",
  },
  {
    icon: <FaHandshake />,
    title: "Publishers & studios",
    text: "Co-develop, publish or cross-promote casual games with the eShaafi Games team.",
  },
];

const contactDetails = [
  {
    icon: <FaEnvelope />,
    title: "Partnerships",
    text: "business@eshaafi.com",
    href: "mailto:business@eshaafi.com",
  },
  {
    icon: <FaEnvelope />,
    title: "General",
    text: "contact@eshaafi.com",
    href: "mailto:contact@eshaafi.com",
  },
  {
    icon: <FaPhone />,
    title: "Phone",
    text: "+92 311 115 1161",
    href: "tel:+923111151161",
  },
];

const faqs = [
  {
    q: "Are eShaafi games free to play?",
    a: "Yes. All our games are free to download. Some include optional in-app purchases and ads that help keep them free.",
  },
  {
    q: "Which devices can I play on?",
    a: "Our games are made for Android and iOS phones and tablets.",
  },
  {
    q: "How do I report a bug or problem in a game?",
    a: "Choose “General games question” in the form below, tell us the game name and your device, and describe what happened. Screenshots help, so mention if you can share them by email.",
  },
  {
    q: "Where can ad partners verify your inventory?",
    a: "Our authorized sellers are listed in our app-ads.txt file at /app-ads.txt.",
    link: { href: "/app-ads.txt", label: "View app-ads.txt" },
  },
  {
    q: "How do eShaafi games handle my data?",
    a: "Our games follow the eShaafi Games privacy policy, which explains what we collect, why, and how to opt out.",
    link: { href: "/privacy-policy#gaming-policy", label: "Read the games privacy policy" },
  },
];

type FormErrors = { [key: string]: string };

export default function Contact() {
  useEffect(() => {
    if (!sessionStorage.getItem("contact_page_view_tracked")) {
      trackEvent("contact_page_view_clk", { section: "page_load" });
      sessionStorage.setItem("contact_page_view_tracked", "true");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
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
      trackEvent("contact_form_error_clk", { section: "form", error_type: "validation" });
      return;
    }

    trackEvent("contact_form_submit_clk", { section: "form", topic });
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
          company,
          message,
          subject: `eShaafi Games - ${selected.label}`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());

      trackEvent("contact_form_success_clk", { section: "form", topic });
      setModalType("success");
      setName("");
      setEmail("");
      setCompany("");
      setTopic(topics[0].label);
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      trackEvent("contact_form_error_clk", { section: "form", error_type: "submission_failed" });
      setModalType("error");
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <Head>
        <title>eShaafi | Contact</title>
        <meta
          name="description"
          content="Contact eShaafi Games about advertising, partnerships and our mobile games."
        />
      </Head>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>eShaafi Games</span>
            <h1 className={styles.title}>Let&apos;s talk games</h1>
            <p className={styles.subtitle}>
              Advertising, partnerships or a question about one of our games?
              Send us a message and the right team will get back to you.
            </p>
          </div>
        </section>

        <section className="container">
          <h2 className={styles.sectionTitle}>Advertising &amp; partners</h2>
          <p className={styles.sectionText}>
            We work with ad networks, brands and studios to bring great casual
            games to players on Android and iOS.
          </p>
          <div className={styles.partners}>
            {partnerCards.map((card) => (
              <div key={card.title} className={styles.card}>
                <span className={styles.icon}>{card.icon}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.details}>
              <h2 className={styles.sectionTitle}>Reach us directly</h2>
              {contactDetails.map((item) => (
                <a key={item.title} href={item.href} className={styles.detail}>
                  <span className={styles.detailIcon}>{item.icon}</span>
                  <span>
                    <span className={styles.detailLabel}>{item.title}</span>
                    <span className={styles.detailValue}>{item.text}</span>
                  </span>
                </a>
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
                  <label htmlFor="company">Company (optional)</label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
          </div>

          <h2 className={styles.sectionTitle}>Game FAQs</h2>
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details key={faq.q} className={styles.faq}>
                <summary>{faq.q}</summary>
                <p>
                  {faq.a}{" "}
                  {faq.link && <Link href={faq.link.href}>{faq.link.label}</Link>}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              {modalType === "success" ? "Thank you!" : "Message not sent"}
            </h3>
            <p className={styles.modalMessage}>
              {modalType === "success"
                ? "We have received your message. Our team will get back to you soon."
                : "Something went wrong. Please try again, or email business@eshaafi.com."}
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
