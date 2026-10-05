import styles from "./Card.module.css";

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Card({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "",
}: CardProps) {
  return (
    <article className={styles.card}>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={imageSrc} alt={imageAlt} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description} title={description}>
          {description}
        </p>
      </div>
    </article>
  );
}
