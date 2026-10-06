import Link from "next/link";
import Badge from "@/components/Badge/Badge";
import styles from "./Card.module.css";

interface CardProps {
  href: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  badge?: string;
}

export default function Card({
  href,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "",
  imagePosition,
  badge,
}: CardProps) {
  return (
    <Link className={styles.card} href={href}>
      {badge && <Badge className={styles.badge}>{badge}</Badge>}
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.image}
          src={imageSrc}
          alt={imageAlt}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
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
    </Link>
  );
}
