import type { ReactNode } from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  heading: string;
  emoji?: string;
  children: ReactNode;
}

export default function Hero({ heading, emoji, children }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {emoji && (
            <span className={styles.wave} aria-hidden="true">
              {emoji}
            </span>
          )}
          {heading}
        </h1>
        <p className={styles.body}>{children}</p>
      </div>
    </section>
  );
}
