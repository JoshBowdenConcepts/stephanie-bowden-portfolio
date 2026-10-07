import type { ReactNode } from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  heading: string;
  subtitle?: string;
  emoji?: string;
  compact?: boolean;
  back?: ReactNode;
  actions?: ReactNode;
  image?: { src: string; alt: string };
  children: ReactNode;
}

export default function Hero({
  heading,
  subtitle,
  emoji,
  compact = false,
  back,
  actions,
  image,
  children,
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ""}`}>
      <div className={styles.inner}>
        {back && <div className={styles.toolbar}>{back}</div>}
        <div className={image ? styles.withImage : undefined}>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.photo} src={image.src} alt={image.alt} />
          )}
          <div className={styles.content}>
            <div className={styles.intro}>
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
        </div>
      </div>
    </section>
  );
}
