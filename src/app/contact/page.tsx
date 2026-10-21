import type { Metadata } from "next";
import BackButton from "@/components/BackButton/BackButton";
import Collage from "@/components/Collage/Collage";
import Hero from "@/components/Hero/Hero";
import styles from "./page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const collageImages = [
  {
    src: `${basePath}/images/IMG_1321.jpeg`,
    alt: "Terraced tea plantation on rolling hills at sunset.",
  },
  {
    src: `${basePath}/images/IMG_2902.jpeg`,
    alt: "A tricolor hound standing on a rocky trail beside yellow goldenrod.",
  },
  {
    src: `${basePath}/images/IMG_5525.jpeg`,
    alt: "Bright pink bougainvillea climbing a white wall under a blue sky.",
  },
  {
    src: `${basePath}/images/IMG_5914.jpeg`,
    alt: "Stephanie and her partner smiling pitchside at Anfield stadium.",
  },
  {
    src: `${basePath}/images/IMG_8720.jpeg`,
    alt: "Sea cliffs above the ocean at dusk.",
  },
  {
    src: `${basePath}/images/IMG_9124.jpeg`,
    alt: "An adult’s and a toddler’s bare feet side by side in dark beach sand.",
  },
];

export const metadata: Metadata = {
  title: "Contact | Stephanie Bowden",
  description: "Get in touch with Stephanie Bowden by email or LinkedIn.",
};

export default function ContactPage() {
  return (
    <main>
      <Hero
        compact
        heading="Contact"
        back={<BackButton href="/" />}
        image={{
          src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/stephanie-bowden.jpg`,
          alt: "Stephanie Bowden smiling outdoors in front of a wooden fence.",
        }}
      >
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
        <Collage className={styles.collage} images={collageImages} />
      </section>
    </main>
  );
}
