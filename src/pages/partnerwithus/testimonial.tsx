"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/partnerwithus.module.scss";

const ClientTestimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const clients = [
    { logo: "/images/logo.png", alt: "Daklit" },
    { logo: "/images/logo22.png", alt: "Logic Racks" },
    { logo: "/images/logo3.png", alt: "Spartans" },
    { logo: "/images/logo4.png", alt: "Think Collective" },
    { logo: "/images/logo5.png", alt: "Abstron" },
    { logo: "/images/logo6.png", alt: "NextTech" },
  ];

  const testimonials = [
    {
      quote:
        "The competence of Dr. Maria and her communication / conduct of the session were highly appreciated. Female students and staff especially took great interest and we're really engaged. The one-on-one session was also fabulous. ICMAP is really grateful to eShafi for the superb role in developing awareness about Breast Cancer. ",
      author: "Muhammad Imran",
      company: " FCMA Chairman, ICMAP Islamabad ",
      companyLogo: "/images/logo4.png",
    },
    {
      quote:
        "It was an amazing session. The dr was so professional. She conducted a very informative session and answered all the queries. Happy collaborating with you ",
      author: "Summar Raja",
      company: "People & Culture Manager, Taleemabad",
      companyLogo: "/images/logo3.png",
    },
    {
      quote:
        "Thanks to eShaafi for organizing such a much-needed and insightful session. The discussion on retention, burnout, and employee engagement couldn’t be more timely. Really grateful to be part of such initiatives that keep us growing as professionals and as humans. ",
      author: "Fatima Firdous  ",
      company: "HR MANAGER, Xpert Prime",
      companyLogo: "/images/logo2.png",
    },
     {
      quote:
        "Thanks to eShaafi for taking a wonderful initiative in the corporate sector, leading much-needed awareness on an important topic in our society of breast cancer awareness.",
      author: "Sehar Malik   ",
      company: "Senior Executive HR, Folium AI",
      companyLogo: "/images/logo2.png",
    },
     {
      quote:
        "Prime System Solutions had a great experience partnering with eShaafi for a Breast Cancer Awareness session conducted at our workplace. The session was informative, well-organized, and thoughtfully delivered. ",
      author: "Hiba Siddiqui  ",
      company: "Head of People Experience, Prime System Solutions",
      companyLogo: "/images/logo2.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            Satisfied Words From <span>Our Clients</span>
          </h2>
          <p>
            Hear from our valued partners and clients who&apos;ve seen the
            difference eShaafi makes.
          </p>
        </div>

        {/* LOGOS MARQUEE */}
        <div className={styles.clientLogos}>
          <div className={styles.marqueeTrack}>
            {clients.concat(clients).map((client, index) => (
              <div key={index} className={styles.logoBox}>
                <img src={client.logo} alt={client.alt} />
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIAL SLIDER */}
        <div className={styles.testimonialSlider}>
          <div key={activeSlide} className={`${styles.testimonialCard} ${styles.fade}`}>
            <div className={styles.quoteIcon}>
              <img src="/images/quote.svg" alt="quote icon" />
            </div>
            <p className={styles.quote}>{testimonials[activeSlide].quote}</p>

            <div className={styles.authorInfo}>
              <div className={styles.authorDetails}>
                 <h4>{testimonials[activeSlide].author}</h4>
                <p className={styles.position}>{testimonials[activeSlide].company}</p>
                {/* <img
                  src={testimonials[activeSlide].companyLogo}
                  alt={testimonials[activeSlide].company}
                  className={styles.companyLogo}
                /> */}
              </div>
            </div>
          </div>

          <div className={styles.sliderDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  activeSlide === index ? styles.activeDot : ""
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
