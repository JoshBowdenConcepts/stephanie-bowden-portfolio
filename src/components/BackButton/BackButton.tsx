import Link from "next/link";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  return (
    <Link className={styles.back} href={href}>
      <span className={styles.arrow} aria-hidden="true">
        ←
      </span>
      {label}
    </Link>
  );
}
