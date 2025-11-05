import React, { useState, useEffect } from "react";
import styles from "./coming-soon.module.scss";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set launch date to 90 days from now
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 90);

      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className={styles.comingSoonContainer}>
      <div className={styles.backgroundGradient}></div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoSection}>
            <h1 className={styles.mainTitle} style={{ fontFamily: "'Inter', sans-serif" }}>
              Something
            </h1>
            <h1 className={styles.mainTitleHighlight} style={{ fontFamily: "'Inter', sans-serif" }}>
              Amazing
            </h1>
            <h1 className={styles.mainTitle} style={{ fontFamily: "'Inter', sans-serif" }}>
              is Coming Soon
            </h1>
          </div>

          <p className={styles.subtitle} style={{ fontFamily: "'Inter', sans-serif" }}>
            We&apos;re working on something incredible. Get notified when we launch!
          </p>
        </div>

        <div className={styles.countdownSection}>
          <div className={styles.countdown}>
            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.days).padStart(2, "0")}</div>
              <div className={styles.timeLabel} style={{ fontFamily: "'Inter', sans-serif" }}>
                Days
              </div>
            </div>
            <div className={styles.separator}>:</div>

            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.hours).padStart(2, "0")}</div>
              <div className={styles.timeLabel} style={{ fontFamily: "'Inter', sans-serif" }}>
                Hours
              </div>
            </div>
            <div className={styles.separator}>:</div>

            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, "0")}</div>
              <div className={styles.timeLabel} style={{ fontFamily: "'Inter', sans-serif" }}>
                Minutes
              </div>
            </div>
            <div className={styles.separator}>:</div>

            <div className={styles.timeUnit}>
              <div className={styles.timeValue}>{String(timeLeft.seconds).padStart(2, "0")}</div>
              <div className={styles.timeLabel} style={{ fontFamily: "'Inter', sans-serif" }}>
                Seconds
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subscriptionSection}>
          <form onSubmit={handleSubscribe} className={styles.subscriptionForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.emailInput}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <button type="submit" className={styles.notifyButton} style={{ fontFamily: "'Inter', sans-serif" }}>
              Notify Me
            </button>
          </form>

          {subscribed && (
            <div className={styles.successMessage} style={{ fontFamily: "'Inter', sans-serif" }}>
              ✓ Thank you! We&apos;ll keep you updated.
            </div>
          )}
        </div>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>🏥</div>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>Quality Healthcare</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>⏰</div>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>24/7 Available</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>💻</div>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>Online Consultations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
