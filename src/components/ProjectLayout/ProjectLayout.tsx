import type { ReactNode } from "react";
import styles from "./ProjectLayout.module.css";

interface ProjectLayoutProps {
  nav: ReactNode;
  children: ReactNode;
}

export default function ProjectLayout({ nav, children }: ProjectLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>{nav}</aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
