"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { Metric } from "@/data/projects";
import styles from "./Metrics.module.css";

const DURATION_MS = 1400;

interface MetricsProps {
  items: Metric[];
}

function splitNumber(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    target: Number(match[2]),
    decimals: match[2].split(".")[1]?.length ?? 0,
    suffix: match[3],
  };
}

function useProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | undefined;
        frame = requestAnimationFrame(function tick(now) {
          start ??= now;
          const t = reduceMotion ? 1 : Math.min((now - start) / DURATION_MS, 1);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

export default function Metrics({ items }: MetricsProps) {
  const ref = useRef<HTMLUListElement>(null);
  const progress = useProgress(ref);

  return (
    <ul ref={ref} className={styles.metrics}>
      {items.map((item, index) => {
        const parts = splitNumber(item.value);
        const display = parts
          ? `${parts.prefix}${(parts.target * progress).toFixed(parts.decimals)}${parts.suffix}`
          : item.value;

        return (
          <li key={index} className={styles.metric}>
            <p className={styles.value}>
              <span className={styles.number} aria-hidden="true">
                {display}
              </span>
              <span className={styles.srOnly}>{item.value}</span>
              <br />
              {item.label}
            </p>
            <p className={styles.caption}>{item.caption}</p>
          </li>
        );
      })}
    </ul>
  );
}
