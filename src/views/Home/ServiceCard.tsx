import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/homepage.module.scss";
import { trackEvent } from '@/lib/ga';
import Image from "next/image";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  exploreLink: string;
  bookLink: string;
}

const ServicesGridSection: React.FC = () => {
  const services: ServiceCard[] = [
    { 
      id: 1,
      title: 'Labs',
      description: 'Book online. Get tested at home. With discounts.',
      imageSrc: '/images/lab.webp',
      exploreLink: '/labs',
      bookLink: '/labs'
    },
    {
      id: 2,
      title: 'Medicines',
      description: 'Order online. Delivered with discounts.',
      imageSrc: '/images/medicines.webp',
      exploreLink: '/medicines',
      bookLink: '/medicines'
    },
    { 
      id: 3,
      title: 'Subscription Plans',
      description: 'Personalized for you and your family’s complete health.',
      imageSrc: '/images/careplans.webp',
      exploreLink: '/find-doctors#subscription-plans',
      bookLink: '/find-doctors#subscription-plans'
    },
    { 
      id: 4,
      title: 'Corporate Care',
      description: 'Work energized. Health support for your team.',
      imageSrc: '/images/corporate-care.webp',
      exploreLink: '/partnerwithus',
      bookLink: '/partnerwithus#schedule'
    },
    { 
      id: 5,
      title: 'Wellness Sessions',
      description: 'For your mind and body. For yourself and your team.',
      imageSrc: '/images/wellness-session.webp',
      exploreLink: '/mind-wellness',
      bookLink: '/mind-wellness'
    },
    { 
      id: 6,
      title: 'THUs',
      description: 'Accessible and quality healthcare. Reaching rural areas.',
      imageSrc: '/images/THUS.webp',
      exploreLink: '/thus',
      bookLink: '/thus'
    }
  ];

  // GA4 event mapping for services
  const getEventConfig = (service: string, actionType: 'explore' | 'book') => {
    const eventMap: Record<string, any> = {
      'Labs': {
        explore: { event: 'homepage_services_labs_explore_clk', params: { section: 'services' } },
        book: { event: 'homepage_services_labs_book_clk', params: { section: 'services' } }
      },
      'Medicines': {
        explore: { event: 'homepage_services_medicines_explore_clk', params: { section: 'services' } },
        book: { event: 'homepage_services_medicines_book_clk', params: { section: 'services' } }
      },
      'Subscription Plans': {
        explore: { event: 'homepage_services_subscriptions_explore_clk', params: { section: 'services' } },
        book: { event: 'homepage_services_subscriptions_book_clk', params: { section: 'services' } }
      },
      'Corporate Care': {
        explore: { event: 'homepage_services_corporate_explore_clk', params: { section: 'services' } },
        book: { event: 'homepage_services_corporate_book_clk', params: { section: 'services' } }
      },
      // 'Wellness Sessions': {
      //   explore: { event: 'click', params: { section: 'wellness', action: 'explore', label: 'Explore', value: 3 } },
      //   book: { event: 'generate_lead', params: { section: 'wellness', action: 'book', label: 'Book Now', content_type: 'wellness' } }
      // },
      'THUs': {
        explore: { event: 'homepage_thu_book_clk', params: { section: 'services'} },
        book: { event: 'homepage_thu_explore_clk', params: { section: 'services' } }
      }
    };
    return eventMap[service]?.[actionType] || { event: 'homepage_services_clk', params: { section: 'services' } };
  };

  return (
    <section className={styles["services-grid"]}>
      <div className={styles["services-grid__container"]}>

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={styles["service-card"]}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}

          >
            <div className={styles["service-card__content"]}>
              <h3 className={styles["service-card__title"]}>{service.title}</h3>
              <p className={styles["service-card__description"]}>{service.description}</p>

              <div className={styles["service-card__buttons"]}>

                <Link href={service.exploreLink}>
                  <button
                    className={`${styles.serviceBtn} ${styles["serviceBtn--primary"]}`}
                    onClick={() => {
                      const config = getEventConfig(service.title, 'explore');
                      trackEvent(config.event, config.params);
                    }}
                  >
                    Explore
                  </button>
                </Link>

                <Link href={service.bookLink}>
                  <button
                    className={`${styles.serviceBtn} ${styles["serviceBtn--secondary"]}`}
                    onClick={() => {
                      const config = getEventConfig(service.title, 'book');
                      trackEvent(config.event, config.params);
                    }}
                  >
                    Book now
                  </button>
                </Link>

              </div>
            </div>

            <motion.div 
              className={styles["service-card__image"]}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}

            >
              {/* <img src={service.imageSrc} alt={service.title} className={styles["service-img"]} /> */}
               <Image
    src={service.imageSrc}
    alt={service.title}
    width={400}
    height={300}
    className={styles["service-img"]}
    sizes="(max-width: 768px) 80vw, 400px"
  />
            </motion.div>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default ServicesGridSection;