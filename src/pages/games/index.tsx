import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/games.module.scss";
import { gameGenres, gameHighlights } from "@/helper/gamesContent";

export default function Games() {
  return (
    <>
      <Head>
        <title>eShaafi | Games</title>
        <meta
          name="description"
          content="Free action, puzzle, racing and adventure games by eShaafi for Android and iOS."
        />
      </Head>
      <main className={styles.gamesPage}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.eyebrow}>eShaafi Games</span>
            <h1 className={styles.title}>Games for everyone</h1>
            <p className={styles.subtitle}>
              Alongside our healthcare services, eShaafi creates casual mobile
              games that are easy to pick up and fun to play, for Android and
              iOS.
            </p>
          </div>
        </section>

        <section className="container">
          <h2 className={styles.sectionTitle}>What we make</h2>
          <p className={styles.sectionText}>
            Our games span four genres, each designed for short, enjoyable play
            sessions.
          </p>
          <div className={styles.grid}>
            {gameGenres.map((genre) => (
              <div key={genre.title} className={styles.card}>
                <span className={styles.genre}>{genre.title}</span>
                <p className={styles.description}>{genre.description}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Good to know</h2>
          <div className={styles.highlights}>
            {gameHighlights.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.name}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.more}>
            <p className={styles.sectionText}>
              Read how our games handle your data, or write to us at{" "}
              <a href="mailto:contact@eshaafi.com">contact@eshaafi.com</a>.
            </p>
            <Link href="/privacy-policy#gaming-policy" className={styles.moreLink}>
              Games privacy policy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
