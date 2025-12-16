"use client";
import React, { useState } from "react";
import styles from "../../../styles/joinus.module.scss";

const CurrentOpenings: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Roles");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filters = [
    "All Roles",
    "Engineering",
    "Medical",
    "Business",
    "Remote",
    "On-Site",
  ];

  const jobs = [
    // {  
    //   id: 1,
    //   title: "Senior Software Engineer",
    //   department: "Engineering",
    //   location: "Remote",
    //   tags: ["Engineering", "Remote"],
    //   description: {
    //     about: [
    //       "Develop and maintain high-quality software applications",
    //       "Collaborate with cross-functional teams for product delivery",
    //       "Participate in code reviews and ensure best practices",
    //       "Troubleshoot and debug complex software issues",
    //     ],
    //     requirements: [
    //       "Bachelor's degree in Computer Science or related field",
    //       "3+ years of experience in software development",
    //       "Proficiency in React, Node.js, and TypeScript",
    //       "Strong problem-solving and communication skills",
    //     ],
    //   },
    // },
    // {
    //   id: 2,
    //   title: "Healthcare Consultant",
    //   department: "Medical",
    //   location: "On-Site",
    //   tags: ["Medical", "On-Site"],
    //   description: {
    //     about: [
    //       "Provide expert guidance to patients on healthcare choices, treatment options, and service selection",
    //       "Conduct intake health assessments and implement appropriate healthcare solutions",
    //       "Collaborate with medical professionals to ensure comprehensive patient care",
    //       "Liaise between patients, doctors, hospitals, and insurance providers",
    //     ],
    //     requirements: [
    //       "Bachelor's degree in Healthcare Administration, Public Health, Nursing, or related field",
    //       "2–3 years of experience in healthcare patient care or medical consulting",
    //       "Strong communication skills and ability to explain complex medical information to patients",
    //       "Strong problem-solving abilities and ability to handle sensitive health information",
    //     ],
    //   },
    // },
    // {
    //   id: 3,
    //   title: "Product Manager - Telemedicine",
    //   department: "Engineering",
    //   location: "Remote",
    //   tags: ["Engineering", "Remote"],
    //   description: {
    //     about: [
    //       "Lead product development and strategy for telemedicine solutions",
    //       "Coordinate with engineering, design, and healthcare teams",
    //       "Gather and prioritize requirements from stakeholders",
    //       "Analyze user feedback to improve product features",
    //     ],
    //     requirements: [
    //       "Bachelor's degree in Business, Healthcare, or related field",
    //       "3+ years of product management experience",
    //       "Familiarity with healthcare technology and telemedicine platforms",
    //       "Excellent organizational and communication skills",
    //     ],
    //   },
    // }
  ];

  return (
    <div id="current-openings" className={styles["current-openings-container"]}>
      <h1 className={styles["page-title"]}>
        Current <span className={styles["title-blue"]}>Openings</span>
      </h1>

      <input
        type="text"
        placeholder="Search for roles"
        className={styles["search-input"]}
      />

      <div className={styles["filter-container"]}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`${styles["filter-btn"]} ${
              selectedFilter === filter ? styles.active : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles["jobs-list"]}>
        {jobs.length === 0 ? (
          <div className={styles.noOpenRoles}>
            No open positions right now!<br />
            {/* <span style={{ fontWeight: 400, fontSize: '1.2rem', display: 'block', marginTop: 8 }}>
              But we’re always looking for talented people—check back soon or drop us your CV!
            </span> */}
          </div>
        ) : (
          jobs.map((job, index) => (
            <div key={job.id}>
              <div className={styles["job-card"]}>
                <div className={styles["job-header"]}>
                  <div>
                    <h3 className={styles["job-title"]}>{job.title}</h3>
                    <div className={styles["job-meta"]}>
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div className={styles["job-actions"]}>
                    <button
                      className={styles["arrow-btn"]}
                      onClick={() =>
                        setExpandedJob(expandedJob === job.id ? null : job.id)
                      }
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00568A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {expandedJob === job.id ? (
                          <polyline points="18 15 12 9 6 15"></polyline>
                        ) : (
                          <polyline points="6 9 12 15 18 9"></polyline>
                        )}
                      </svg>
                    </button>

                    <button
                      className={styles["apply-btn"]}
                      onClick={() => (window.location.href = "/applynow")}
                    >
                      Apply Now
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="19" x2="19" y2="5"></line>
                        <polyline points="10 5 19 5 19 14"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {expandedJob === job.id && job.description && (
                  <div className={styles["job-details"]}>
                    <div className={styles["detail-section"]}>
                      <h4 className={styles["detail-title"]}>
                        About the Role :{" "}
                      </h4>
                      <ul className={styles["detail-list"]}>
                        {job.description.about.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles["detail-section"]}>
                      <h4 className={styles["detail-title"]}>Requirements :</h4>
                      <ul className={styles["detail-list"]}>
                        {job.description.requirements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {index < jobs.length - 1 && (
                <div className={styles["divider"]}></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentOpenings;
