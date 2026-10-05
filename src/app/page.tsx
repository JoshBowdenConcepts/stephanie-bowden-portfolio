import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          Coming soon
        </p>
        <h1 className={styles.name}>Stephanie Bowden</h1>
        <p className={styles.tagline}>
          A new portfolio is in the works. Check back soon.
        </p>
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Stephanie Bowden
      </footer>
    </div>
  );
}
