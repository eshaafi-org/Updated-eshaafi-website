import React from 'react';
import { motion } from "framer-motion";
import styles from "../../styles/homepage.module.scss";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const ServicesGridSection: React.FC = () => {
  const services: ServiceCard[] = [
    { id: 1, title: 'Labs', description: 'Book online. Get tested at home. With discounts.', imageSrc: '/images/lab.png' },
    { id: 2, title: 'Medicines', description: 'Order online. Delivered with discounts.', imageSrc: '/images/medicines.png' },
    { id: 3, title: 'Care Plans', description: 'Personalized for you and your family’s complete health.', imageSrc: '/images/careplans.png' },
    { id: 4, title: 'Corporate Care', description: 'Work energized. Health support for your team.', imageSrc: '/images/coporate.png' },
    { id: 5, title: 'Wellness Sessions', description: 'For your mind and body. For yourself and your team.', imageSrc: '/images/wellness.png' },
    { id: 6, title: 'THLs', description: 'Accessible and quality healthcare. Reaching rural areas.', imageSrc: '/images/thls.png' }
  ];

  return (
    <section className={styles["services-grid"]}>
      <div className={styles["services-grid__container"]}>

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={styles["service-card"]}

            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          >
            <div className={styles["service-card__content"]}>
              <h3 className={styles["service-card__title"]}>{service.title}</h3>
              <p className={styles["service-card__description"]}>{service.description}</p>

              <div className={styles["service-card__buttons"]}>
                <button className={`${styles.serviceBtn} ${styles["serviceBtn--primary"]}`}>Explore</button>
                <button className={`${styles.serviceBtn} ${styles["serviceBtn--secondary"]}`}>Book now</button>
              </div>
            </div>

            <motion.div 
              className={styles["service-card__image"]}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 + 0.2 }}
            >
              <img src={service.imageSrc} alt={service.title} className={styles["service-img"]} />
            </motion.div>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default ServicesGridSection;
