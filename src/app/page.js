"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./page.module.css";
import sections from "./sections.json";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashExit, setSplashExit] = useState(false);

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setSplashExit(true), 1800);
    const hideTimer = window.setTimeout(() => setShowSplash(false), 2400);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={styles.page}>
      {showSplash ? (
        <div className={`${styles.splashOverlay} ${splashExit ? styles.splashOverlayExit : ""}`}>
          <div className={styles.splashImageWrapper}>
            <Image
              src="/images/AmyBakesMainLogo.jpg"
              alt="Amy Bakes bakery treats"
              fill
              className={styles.splashBgImage}
              priority
            />
          </div>

          <div className={styles.splashTint} />

          <div className={styles.splashContent}>

            <div className={styles.splashLogo}>
              <span className={styles.splashLogoMark}>Amy</span>
              <span className={styles.splashFlourish} />
              <span className={styles.splashFlourishTail} />
              <span className={styles.splashLogoText}>Bakes</span>
              <span className={styles.splashBadge}>Pastries & Desserts</span>
            </div>
            
            <p>Warm bakery treats and custom cakes baked from scratch for every celebration.</p>
          </div>

          <div className={styles.splashDecor}>
            <span className={styles.splashCircle} />
            <span className={styles.splashCircleAlt} />
            <span className={styles.splashDot} />
          </div>
        </div>
      ) : null}

      <main className={`${styles.main} ${!showSplash ? styles.contentReady : ""}`}>
        <section className={styles.hero}>
          <div className={styles.heroMedia}>
            <Image
              src="/images/AmyBakesMainLogo.jpg"
              alt="Amy Bakes bakery display"
              fill
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroCopy}>
            <h1>Amy Bakes</h1>
            <p className={styles.tagline}>Pastries & Desserts</p>
            <p className={styles.lead}>
              A cozy bakery for cupcakes, celebration cakes, artisan sourdough,
              and cookies baked from scratch.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="#menu">
                Explore the menu
              </a>
            </div>
          </div>
        </section>

        {/* Dynamically render sections from JSON data */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2>{section.name}</h2>
            <p>{section.description}</p>
            <div className={styles.sectionMedia}>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay={false}
                centerMode={false}
                containerClass="carousel-container"
                draggable
                infinite={false}
                keyBoardControl
                minimumTouchDrag={80}
                itemClass="carousel-item"
                responsive={{
                  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 40 },
                  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, partialVisibilityGutter: 30 },
                  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, partialVisibilityGutter: 30 }
                }}
                showDots={true}
                ssr
                swipeable
              >
                {section.showcaseImages.map((mediaItem, index) => (
                  <div key={index} className={styles.sectionMediaItem}>
                    <Image
                      src={mediaItem}
                      alt={`${section.name} showcase ${index + 1}`}
                      fill
                      className={styles.sectionImage}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <Link className={styles.sectionButton} href={`/gallery/${encodeURIComponent(section.id)}`}>
              View {section.name}
            </Link>
          </section>
          ))
        }

        <section id="contact" className={styles.contactSection}>
          <h2>Contact Us</h2>
          <p>Have questions or want to book a tasting? Get in touch!</p>
          <button className={styles.contactButton}>Contact Amy!</button>
        </section>
      </main>
    </div>
  );
}
