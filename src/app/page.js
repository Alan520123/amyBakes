"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

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
              src="/images/AmyBakesCard.jpg"
              alt="Amy Bakes bakery treats"
              fill
              className={styles.splashBgImage}
              priority
            />
          </div>

          <div className={styles.splashTint} />

          <div className={styles.splashContent}>
            <span className={styles.splashBadge}>Fresh. Sweet. Handmade.</span>
            <div className={styles.splashLogo}>
              <span className={styles.splashLogoMark}>Amy</span>
              <span className={styles.splashFlourish} />
              <span className={styles.splashFlourishTail} />
              <span className={styles.splashLogoText}>Bakes</span>
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
              src="/images/AmyBakesCard.jpg"
              alt="Amy Bakes bakery display"
              fill
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.tagline}>Fresh. Sweet. Handmade.</p>
            <h1>Amy Bakes</h1>
            <p className={styles.lead}>
              A cozy bakery for cupcakes, celebration cakes, artisan sourdough,
              and cookies baked from scratch.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="#menu">
                Explore the menu
              </a>
              <a className={styles.secondary} href="#contact">
                Book a tasting
              </a>
            </div>
          </div>
        </section>

        <section className={styles.menu} id="menu">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Featured</p>
            <h2>Sweet treats for every occasion</h2>
          </div>
          <div className={styles.cards}>
            <article className={styles.featureCard}>
              <h3>Cupcakes</h3>
              <p>
                Perfectly portioned cupcakes in playful flavors like vanilla bean,
                red velvet, and salted caramel.
              </p>
            </article>
            <article className={styles.featureCard}>
              <h3>Celebration Cakes</h3>
              <p>
                Custom-designed cakes for birthdays, showers, weddings, and
                anytime you want a show-stopping centerpiece.
              </p>
            </article>
            <article className={styles.featureCard}>
              <h3>Sourdough</h3>
              <p>
                Tangy, crusty loaves made with care and slow fermentation for
                rich flavor and texture.
              </p>
            </article>
            <article className={styles.featureCard}>
              <h3>Cookies</h3>
              <p>
                Soft-baked cookies in classic favorites like chocolate chip,
                oatmeal, and seasonal specialties.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.info}>
          <div>
            <h2>Handcrafted bakery favorites</h2>
            <p>
              Amy Bakes brings local charm to every batch. Whether you want a
              morning loaf, a party cake, or a tray of sweet treats, everything
              is made with seasonal ingredients and a passion for flavor.
            </p>
          </div>
          <div className={styles.benefits}>
            <article className={styles.benefitItem}>
              <h3>Small-batch quality</h3>
              <p>Each order is baked fresh with extra attention to detail.</p>
            </article>
            <article className={styles.benefitItem}>
              <h3>Custom orders</h3>
              <p>Personalized cakes and dessert boxes for every celebration.</p>
            </article>
            <article className={styles.benefitItem}>
              <h3>Local delivery</h3>
              <p>Easy pickup and delivery options inside the neighborhood.</p>
            </article>
          </div>
        </section>

        <section className={styles.contact} id="contact">
          <div className={styles.contactCard}>
            <h2>Ready to place an order?</h2>
            <p>
              Send a message to reserve cupcakes, cake designs, or a fresh loaf
              for the week.
            </p>
            <a className={styles.primary} href="mailto:hello@amy-bakes.com">
              Contact Amy
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
