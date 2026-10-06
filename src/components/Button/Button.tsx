import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

export default function Button({ href, children }: ButtonProps) {
  return (
    <Link className={styles.button} href={href}>
      {children}
    </Link>
  );
}
