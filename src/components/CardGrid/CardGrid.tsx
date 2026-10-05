import type { ReactNode } from "react";
import styles from "./CardGrid.module.css";

interface CardGridProps {
  label: string;
  children: ReactNode;
}

export default function CardGrid({ label, children }: CardGridProps) {
  return (
    <section className={styles.section} aria-label={label}>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}
