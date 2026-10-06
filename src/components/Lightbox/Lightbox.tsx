"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "@/data/projects";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  media: ProjectMedia;
  src?: string;
  className?: string;
  imageClassName?: string;
  onPrev?: () => void;
  onNext?: () => void;
  thumbnails?: { media: ProjectMedia; src?: string }[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

function MediaElement({
  media,
  src,
  className,
  enlarged = false,
}: LightboxProps & { enlarged?: boolean }) {
  if (media.type === "placeholder") {
    return (
      <span
        className={`${className} ${styles.placeholder}`}
        role="img"
        aria-label={media.alt}
      />
    );
  }
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={src}
        aria-label={media.alt}
        autoPlay
        muted
        loop
        playsInline
        controls={enlarged}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={media.alt} />;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.5;
const DRAG_THRESHOLD = 4;

interface View {
  scale: number;
  x: number;
  y: number;
}

const initialView: View = { scale: 1, x: 0, y: 0 };

function ZoomIcon({ type }: { type: "in" | "out" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={type === "in" ? "M10 4v12M4 10h12" : "M4 10h12"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function clampView(image: HTMLImageElement, view: View): View {
  const boxWidth = image.offsetWidth;
  const boxHeight = image.offsetHeight;
  const fit = Math.min(
    boxWidth / image.naturalWidth,
    boxHeight / image.naturalHeight,
  );
  const maxX = Math.max(0, (image.naturalWidth * fit * view.scale - boxWidth) / 2);
  const maxY = Math.max(0, (image.naturalHeight * fit * view.scale - boxHeight) / 2);
  return {
    scale: view.scale,
    x: Math.min(maxX, Math.max(-maxX, view.x)),
    y: Math.min(maxY, Math.max(-maxY, view.y)),
  };
}

export default function Lightbox({
  media,
  src,
  className,
  imageClassName,
  onPrev,
  onNext,
  thumbnails = [],
  activeIndex,
  onSelect,
}: LightboxProps) {
  const hasNav = Boolean(onPrev && onNext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const [view, setView] = useState<View>(initialView);
  const [dragging, setDragging] = useState(false);
  const thumbsRef = useRef<HTMLUListElement>(null);
  const zoomable = media.type === "image";
  const hasThumbnails = Boolean(thumbnails && thumbnails.length > 1 && onSelect);

  const resetView = () => setView(initialView);

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => dialogRef.current?.close();

  const goPrev = () => {
    resetView();
    onPrev?.();
  };

  const goNext = () => {
    resetView();
    onNext?.();
  };

  const select = (index: number) => {
    resetView();
    onSelect?.(index);
  };

  useEffect(() => {
    if (!dialogRef.current?.open) return;
    const active = thumbsRef.current?.children[activeIndex ?? 0];
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  const zoomTo = (scale: number, clientX?: number, clientY?: number) => {
    const image = imageRef.current;
    if (!image) return;
    const nextScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale));
    let pointX = 0;
    let pointY = 0;
    if (clientX !== undefined && clientY !== undefined) {
      const box = image.getBoundingClientRect();
      pointX = clientX - (box.left + box.width / 2 - view.x);
      pointY = clientY - (box.top + box.height / 2 - view.y);
    }
    const ratio = nextScale / view.scale;
    setView(
      clampView(image, {
        scale: nextScale,
        x: pointX - (pointX - view.x) * ratio,
        y: pointY - (pointY - view.y) * ratio,
      }),
    );
  };

  const isOutsideImage = (image: HTMLImageElement, clientX: number, clientY: number) => {
    const box = image.getBoundingClientRect();
    const fit = Math.min(
      box.width / image.naturalWidth,
      box.height / image.naturalHeight,
    );
    const dx = Math.abs(clientX - (box.left + box.width / 2));
    const dy = Math.abs(clientY - (box.top + box.height / 2));
    return dx > (image.naturalWidth * fit) / 2 || dy > (image.naturalHeight * fit) / 2;
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ""}`}
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`Enlarge: ${media.alt}`}
      >
        <MediaElement
          media={media}
          src={src}
          className={`${styles.thumb} ${imageClassName ?? ""}`}
        />
      </button>
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} ${hasNav ? styles.withNav : ""}`}
        aria-label={media.alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
          if (event.key === "ArrowLeft" && onPrev) goPrev();
          if (event.key === "ArrowRight" && onNext) goNext();
          if (zoomable && (event.key === "+" || event.key === "=")) {
            zoomTo(view.scale * ZOOM_STEP);
          }
          if (zoomable && event.key === "-") zoomTo(view.scale / ZOOM_STEP);
        }}
        onClose={() => {
          document.documentElement.style.overflow = "";
          resetView();
        }}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        {hasNav && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={goNext}
              aria-label="Next image"
            >
              <Chevron direction="right" />
            </button>
          </>
        )}
        {zoomable ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              className={`${styles.full} ${styles.zoomable} ${view.scale > 1 ? styles.zoomed : ""} ${dragging ? styles.dragging : ""} ${view.scale >= MAX_ZOOM ? styles.maxZoom : ""}`}
              src={src}
              alt={media.alt}
              draggable={false}
              style={{
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
              }}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                dragRef.current = { x: event.clientX, y: event.clientY, moved: false };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                const drag = dragRef.current;
                if (!drag || view.scale <= 1) return;
                const dx = event.clientX - drag.x;
                const dy = event.clientY - drag.y;
                if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
                drag.moved = true;
                drag.x = event.clientX;
                drag.y = event.clientY;
                const image = event.currentTarget;
                setDragging(true);
                setView((current) =>
                  clampView(image, {
                    scale: current.scale,
                    x: current.x + dx,
                    y: current.y + dy,
                  }),
                );
              }}
              onPointerUp={(event) => {
                const drag = dragRef.current;
                dragRef.current = null;
                setDragging(false);
                if (!drag || drag.moved) return;
                const image = event.currentTarget;
                if (view.scale === 1 && isOutsideImage(image, event.clientX, event.clientY)) {
                  close();
                } else if (view.scale >= MAX_ZOOM) {
                  resetView();
                } else {
                  zoomTo(view.scale * ZOOM_STEP * ZOOM_STEP, event.clientX, event.clientY);
                }
              }}
              onPointerCancel={() => {
                dragRef.current = null;
                setDragging(false);
              }}
            />
          </>
        ) : (
          <MediaElement media={media} src={src} className={styles.full} enlarged />
        )}
        {(zoomable || hasThumbnails) && (
          <div className={styles.bottomBar}>
            {zoomable && (
              <div className={styles.zoomControls}>
                <button
                  type="button"
                  className={styles.zoomButton}
                  onClick={() => zoomTo(view.scale / ZOOM_STEP)}
                  disabled={view.scale <= MIN_ZOOM}
                  aria-label="Zoom out"
                >
                  <ZoomIcon type="out" />
                </button>
                <span className={styles.zoomLevel} aria-live="polite">
                  {Math.round(view.scale * 100)}%
                </span>
                <button
                  type="button"
                  className={styles.zoomButton}
                  onClick={() => zoomTo(view.scale * ZOOM_STEP)}
                  disabled={view.scale >= MAX_ZOOM}
                  aria-label="Zoom in"
                >
                  <ZoomIcon type="in" />
                </button>
              </div>
            )}
            {hasThumbnails && (
              <ul ref={thumbsRef} className={styles.thumbs}>
                {thumbnails.map((thumbnail, thumbnailIndex) => (
                  <li key={thumbnailIndex}>
                    <button
                      type="button"
                      className={`${styles.thumbButton} ${thumbnail.media.type === "placeholder" ? styles.placeholder : ""}`}
                      onClick={() => select(thumbnailIndex)}
                      aria-label={`Show image ${thumbnailIndex + 1} of ${thumbnails.length}`}
                      aria-current={thumbnailIndex === activeIndex ? "true" : undefined}
                    >
                      {thumbnail.media.type !== "placeholder" && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumbnail.src} alt="" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
