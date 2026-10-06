import type { Metadata } from "next";
import BackButton from "@/components/BackButton/BackButton";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | Stephanie Bowden",
  description: "Get in touch with Stephanie Bowden by email or LinkedIn.",
};

export default function ContactPage() {
  return (
    <main>
      <Hero compact heading="Contact" back={<BackButton href="/" />}>
        I’d love to hear from you, whether it’s about a role, a project, or
        design systems and data visualization.
      </Hero>
      <section className={styles.contact} aria-label="Contact details">
        <dl className={styles.list}>
          <div className={styles.item}>
            <dt className={styles.label}>Email</dt>
            <dd className={styles.value}>
              <a
                className={styles.link}
                href="mailto:stephanie@bowdenconcepts.com"
              >
                stephanie@bowdenconcepts.com
              </a>
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.label}>LinkedIn</dt>
            <dd className={styles.value}>
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/stephanieclearydesign/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/stephanieclearydesign
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
