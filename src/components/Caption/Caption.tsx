import styles from "./Caption.module.css";

interface CaptionProps {
  children: string;
}

export default function Caption({ children }: CaptionProps) {
  return <p className={styles.caption}>{children}</p>;
}
