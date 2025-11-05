"use client";
import style from "../../styles/doctors.module.scss";
import { Text16, Text12 } from "@/components/Typography";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export default function FQuest({
  quests,
  heading,
}: {
  quests: any;
  heading: string;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="container sm-pt-0">
      <div className={style.faqHeadingContainer}>
        <h2 className={style.faqHeading}>
          Frequently Asked <span className={style.faqHeadingHighlight}>Questions</span>
        </h2>
      </div>
      <ul className={style.faqContainer}>
        {quests.map((itm: any, indx: number) => (
          <li key={indx} className={style.faqItem}>
            <div 
              className={style.faqItemHeader}
              onClick={() => toggleExpand(indx)}
            >
              <p className={style.faqQuestion}>{itm.heading}</p>
              <button className={style.faqToggleBtn} aria-expanded={expandedIndex === indx} aria-label={expandedIndex === indx ? 'Collapse' : 'Expand'}>
                {expandedIndex === indx ? (
                  <FiX size={20} />
                ) : (
                  <FiPlus size={20} />
                )}
              </button>
            </div>
            {expandedIndex === indx && (
              <div className={style.faqItemContent}>
                <Text12 className={style.faqAnswer}>{itm.text}</Text12>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
