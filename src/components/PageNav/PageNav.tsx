"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PageNav.module.css";

interface PageNavItem {
  id: string;
  label: string;
}

interface PageNavProps {
  label: string;
  items: PageNavItem[];
}

export default function PageNav({ label, items }: PageNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section) => section !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const threshold = window.innerHeight * 0.3;
      const current = atBottom
        ? sections.at(-1)
        : sections.findLast(
            (section) => section.getBoundingClientRect().top <= threshold,
          );
      setActiveId(current?.id ?? items[0]?.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>("[aria-current]");
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const offset =
      link.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollBy({ left: offset - 16 });
  }, [activeId]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label={label}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={styles.link}
              href={`#${item.id}`}
              aria-current={item.id === activeId ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
