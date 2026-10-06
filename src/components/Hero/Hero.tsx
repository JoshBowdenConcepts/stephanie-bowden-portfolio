import type { ReactNode } from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  heading: string;
  subtitle?: string;
  emoji?: string;
  compact?: boolean;
  back?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export default function Hero({
  heading,
  subtitle,
  emoji,
  compact = false,
  back,
  actions,
  children,
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ""}`}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          {back}
          <h1 className={styles.heading}>
            {emoji && (
              <span className={styles.wave} aria-hidden="true">
                {emoji}
              </span>
            )}
            {heading}
          </h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <p className={styles.body}>{children}</p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
