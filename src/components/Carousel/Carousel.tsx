"use client";

import { useEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox/Lightbox";
import type { ProjectMedia } from "@/data/projects";
import styles from "./Carousel.module.css";

interface CarouselProps {
  items: ProjectMedia[];
  basePath?: string;
  label?: string;
  className?: string;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel({
  items,
  basePath = "",
  label = "Image gallery",
  className,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const thumbsRef = useRef<HTMLUListElement>(null);
  const count = items.length;
  const current = items[index];

  const go = (next: number) => setIndex((next + count) % count);

  useEffect(() => {
    const list = thumbsRef.current;
    const active = list?.children[index] as HTMLElement | undefined;
    if (!list || !active) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = active.getBoundingClientRect();
    if (itemBox.left < listBox.left) {
      list.scrollLeft += itemBox.left - listBox.left - 8;
    } else if (itemBox.right > listBox.right) {
      list.scrollLeft += itemBox.right - listBox.right + 8;
    }
  }, [index]);

  return (
    <div
      className={`${styles.carousel} ${className ?? ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("dialog")) {
          return;
        }
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
    >
      <Lightbox
        media={current}
        src={current.type === "placeholder" ? undefined : `${basePath}${current.src}`}
        className={styles.stage}
        imageClassName={styles.image}
        onPrev={count > 1 ? () => go(index - 1) : undefined}
        onNext={count > 1 ? () => go(index + 1) : undefined}
        thumbnails={items.map((item) => ({
          media: item,
          src: item.type === "placeholder" ? undefined : `${basePath}${item.src}`,
        }))}
        activeIndex={index}
        onSelect={setIndex}
      />
      <p className={styles.srOnly} aria-live="polite">
        Image {index + 1} of {count}: {current.alt}
      </p>
      {count > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index - 1)}
            aria-label="Previous image"
          >
            <Chevron direction="left" />
          </button>
          <ul ref={thumbsRef} className={styles.thumbs}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <button
                type="button"
                className={`${styles.thumb} ${item.type === "placeholder" ? styles.placeholder : ""}`}
                onClick={() => setIndex(itemIndex)}
                aria-label={`Show image ${itemIndex + 1} of ${count}`}
                aria-current={itemIndex === index ? "true" : undefined}
              >
                {item.type !== "placeholder" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${basePath}${item.src}`} alt="" loading="lazy" />
                )}
              </button>
            </li>
          ))}
          </ul>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index + 1)}
            aria-label="Next image"
          >
            <Chevron direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}
