"use client";
import React, { useState } from "react";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import styles from "@/styles/aboutPage.module.scss";

const LeadershipTeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Shafique Anwar",
      position: "Founder & CEO",
      image: "/images/profile1.png",
      linkedin: "https://www.linkedin.com/in/shafique-anwar/ ",
      description:
        "An exemplary & visionary CEO who has built several startups, with each venture imparting valuable lessons for many. Mr. Shafique believes that the business focus yields a deep sense of fulfillment.",
    },
    {
      id: 2,
      name: "Hajra Malik",
      position: (
        <>
          Co-Founder & Chief <br /> Strategy Officer
        </>
      ),
      image: "/images/Vector (2).svg",
      linkedin: "https://www.linkedin.com/in/hajra-malik-083871229/ ",
      description:
        "Ms. Hajra Malik leads eShaafi with a dream she’s carried from a young age to make healthcare not just accessible, but an experience of empathy and trust.",
    },
    {
      id: 3,
      name: "Ijaz Ahmed",
      position: "Chief Operating Officer (COO)",
      image: "/images/profile3.png",
      linkedin: "https://www.linkedin.com/in/ijaz-ahmad-862707222/",
      description:
        "Visionary COO dedicated to making eShaafi a global telemedicine leader. Brings 30+ years of distinguished leadership experience in operations, strategic planning, and senior management.",
    },
    {
      id: 4,
      name: "Muhammad Faisal",
      position: "Head of Growth",
      image: "/images/profile4.png",
      linkedin: "https://www.linkedin.com/in/muhammad-faisal-vp/",
      description:
        "Driven by a vision for a healthier Pakistan, Faisal is passionate about polishing digital healthcare to revolutionize patient-centric treatment. He is highly experienced in the healthcare sector of Pakistan.",
    },
    {
      id: 5,
      name: "Ali Nadeem",
      position: "Head of Business Development",
      image: "/images/profile5.png",
      linkedin: "https://www.linkedin.com/in/ali-nadeem-11296534/",
      description:
        "Seasoned business development leader with 13+ years of experience driving growth & partnerships in healthcare & corporate sectors.",
    },
    {
      id: 6,
      name: "Pasha Ahtesham",
      position: "Head of Partnerships & Growth",
      image: "/images/profile6.png",
      linkedin: "http://linkedin.com/in/pasha-ahtesham-✪-5010aa307 ",
      description:
        "Pasha is an enthusiastic young blood and works heftily on networking and making connections for eShaafi by explaining realistic facts that people truly care about.",
    },
    {
      id: 7,
      name: "Dr. Ali Nasim",
      position: "Clinical Lead",
      image: "/images/profile7.png",
      linkedin: "https://www.linkedin.com/in/dr-ali-nasim-chattha-108a4473/",
      description:
        "An ENT Surgeon and General Physician committed to providing comprehensive, patient-centered care. Specialized in diagnosing and treating ear, nose, throat, head, and neck disorders, combining medical expertise with surgical precision",
    },
    {
      id: 8,
      name: "Ayesha Rafaqat",
      position: "Product Owner & CSR Lead",
      image: "/images/profile8.png",
      linkedin: "https://www.linkedin.com/in/ayesha-rafaqat",
      description:
        "Building human-first digital products that create real-world impact, Ayesha currently looking after product planning & development at eShaafi. She is passionate about experiences that serve, scale, and solve.",
    },
  ];

  // ✅ Function to get popup position class
  const getPopupPositionClass = (index: number, totalInRow: number) => {
    if (index % totalInRow === 0) return styles.popupLeft; // First column
    if ((index + 1) % totalInRow === 0) return styles.popupRight; // Last column
    return styles.popupCenter; // Middle column
  };

  return (
    <section id="our-team" className={styles.leadershipSection}>
      <div className={styles.leadershipWrapper}>
        {/* Heading */}
        <div className={styles.leadershipHeader}>
          <motion.h2
            className={styles.leadershipTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span>Leadership</span> Team
          </motion.h2>
        </div>

        {/* FIRST 6 MEMBERS (3x2) */}
        <div className={styles.teamGrid}>
          {teamMembers.slice(0, 6).map((member, index) => (
            <motion.div
              key={member.id}
              className={styles.teamMember}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className={styles.memberImage}>
                <img src={member.image} alt={member.name} />
              </div>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberPosition}>{member.position}</p>
              <div className={styles.memberLinkedin}>
                <Linkedin size={16} />
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>

              {hoveredMember === member.id && (
                <motion.div
                  className={`${styles.hoverPopup} ${getPopupPositionClass(index, 3)}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className={styles.popupName}>{member.name}</h5>
                  <p className={styles.popupPosition}>
                    {typeof member.position === "string" ? member.position : "Co-Founder & Chief Strategy Officer"}
                  </p>
                  <p className={styles.popupDescription}>{member.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* LAST ROW ONLY 2 MEMBERS */}
        <div className={styles.lastTwoRow}>
          {teamMembers.slice(6, 8).map((member, index) => (
            <motion.div
              key={member.id}
              className={styles.teamMember}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className={styles.memberImage}>
                <img src={member.image} alt={member.name} />
              </div>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberPosition}>{member.position}</p>
              <div className={styles.memberLinkedin}>
                <Linkedin size={16} />
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>

              {hoveredMember === member.id && (
                <motion.div
                  className={`${styles.hoverPopup} ${index === 0 ? styles.popupRight : styles.popupLeft}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className={styles.popupName}>{member.name}</h5>
                  <p className={styles.popupPosition}>{member.position}</p>
                  <p className={styles.popupDescription}>{member.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeamSection;
