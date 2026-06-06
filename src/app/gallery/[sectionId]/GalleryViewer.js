"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

export default function SectionGalleryViewer({ section }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchCurrentX, setTouchCurrentX] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  if (!section) {
    return null;
  }

  const openAt = (idx) => setActiveIndex(idx);
  const close = () => setActiveIndex(null);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === section.galleryImages.length - 1 ? 0 : i + 1));
  }, [section.galleryImages.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? section.galleryImages.length - 1 : i - 1));
  }, [section.galleryImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, prev, next]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchCurrentX === null) {
      setTouchStartX(null);
      setTouchCurrentX(null);
      return;
    }
    const delta = touchCurrentX - touchStartX;
    const threshold = 50;
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.galleryHero}>
        <div className={styles.galleryHeroHeader}>
          <div>
            <h1 className={styles.galleryHeroTitle}>{section.name}</h1>
            <p className={styles.galleryHeroText}>{section.description}</p>
          </div>
          <div className={styles.galleryHeroMeta}>
            <span className={styles.galleryHeroBadge}>{section.galleryImages.length} Photos</span>
            <span className={styles.galleryHeroNote}>Click an image to view it full size</span>
          </div>

          <Link className={styles.sectionButton} href="/">
            Back to home
          </Link>
        </div>
      </div>

      <div className={styles.galleryGrid}>
        {section.galleryImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className={styles.galleryCard}
            onClick={() => openAt(index)}
            aria-label={`Open ${section.name} gallery image ${index + 1}`}
          >
            <div className={styles.galleryCardMedia}>
              <Image
                src={image}
                alt={`${section.name} gallery ${index + 1}`}
                fill
                className={styles.galleryImage}
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={index < 3}
              />
              <div className={styles.galleryCardOverlay} />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div className={styles.galleryModalBackdrop} onClick={close}>
          <div
            className={styles.galleryModal}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className={styles.galleryModalClose}
              onClick={close}
              aria-label="Close full size image"
            >
              ×
            </button>

            <button
              type="button"
              className={`${styles.galleryNavButton} ${styles.galleryNavLeft}`}
              onClick={prev}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div className={styles.galleryModalImageWrapper}>
              <Image
                src={section.galleryImages[activeIndex]}
                alt={`Full size ${section.name}`}
                fill
                className={styles.galleryImage}
                sizes="(max-width: 1024px) 100vw, 90vw"
                priority
              />
            </div>

            <button
              type="button"
              className={`${styles.galleryNavButton} ${styles.galleryNavRight}`}
              onClick={next}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
