import styles from "./Collage.module.css";

interface CollageImage {
  src: string;
  alt: string;
}

interface CollageProps {
  images: CollageImage[];
  className?: string;
}

export default function Collage({ images, className }: CollageProps) {
  return (
    <ul className={className ? `${styles.collage} ${className}` : styles.collage}>
      {images.map((image) => (
        <li key={image.src} className={styles.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.image}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}
