"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PageNav.module.css";

interface PageNavLink {
  id: string;
  label: string;
}

interface PageNavItem extends PageNavLink {
  children?: PageNavLink[];
}

interface PageNavProps {
  label: string;
  items: PageNavItem[];
}

export default function PageNav({ label, items }: PageNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [activeChildId, setActiveChildId] = useState<string>();

  useEffect(() => {
    const byId = (id: string) => document.getElementById(id);
    const sections = items
      .map((item) => ({
        element: byId(item.id),
        children: (item.children ?? [])
          .map((child) => byId(child.id))
          .filter((child) => child !== null),
      }))
      .filter(
        (section): section is { element: HTMLElement; children: HTMLElement[] } =>
          section.element !== null,
      );

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const threshold = window.innerHeight * 0.3;
      const isPast = (element: HTMLElement) =>
        element.getBoundingClientRect().top <= threshold;
      const current = atBottom
        ? sections.at(-1)
        : sections.findLast((section) => isPast(section.element));
      setActiveId(current?.element.id ?? items[0]?.id);
      setActiveChildId(
        (atBottom ? current?.children.at(-1) : current?.children.findLast(isPast))
          ?.id,
      );
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
    const link = nav?.querySelector<HTMLElement>(`.${styles.link}[aria-current]`);
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const offset =
      link.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollBy({ left: offset - 16 });
  }, [activeId]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label={label}>
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                className={styles.link}
                href={`#${item.id}`}
                aria-current={
                  isActive ? (activeChildId ? "true" : "location") : undefined
                }
                onClick={() => {
                  setActiveId(item.id);
                  setActiveChildId(undefined);
                }}
              >
                {item.label}
              </a>
              {isActive && item.children && item.children.length > 0 && (
                <ul className={styles.sublist}>
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a
                        className={styles.sublink}
                        href={`#${child.id}`}
                        aria-current={
                          child.id === activeChildId ? "location" : undefined
                        }
                        onClick={() => setActiveChildId(child.id)}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
