import { useEffect, useState } from 'react';
import './Hero.css';

const PETAL_COUNT = 18;

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate petals evenly spread across full width
  const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
    const segment = 100 / PETAL_COUNT;
    return {
      id: i,
      left: segment * i + Math.random() * segment,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      size: 8 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.25,
      drift: -30 + Math.random() * 60,
    };
  });

  return (
    <section id="home" className="hero">
      {/* Animated gradient background */}
      <div className="hero__gradient"></div>

      {/* Floating petals */}
      <div className="hero__petals">
        {petals.map((p) => (
          <div
            key={p.id}
            className="hero__petal"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Decorative rings */}
      <div className="hero__ring hero__ring--1"></div>
      <div className="hero__ring hero__ring--2"></div>
      <div className="hero__ring hero__ring--3"></div>

      {/* Shimmer lines */}
      <div className="hero__shimmer hero__shimmer--1"></div>
      <div className="hero__shimmer hero__shimmer--2"></div>

      <div className="hero__overlay"></div>

      <div className={`hero__content container ${loaded ? 'hero__content--visible' : ''}`}>
        <div className="hero__logo-wrap">
          <img src="/logo.jpg" alt="Naisha Chikankari" className="hero__logo" />
          <div className="hero__logo-glow"></div>
        </div>

        <p className="hero__label">
          {'Est. with Love & Tradition'.split('').map((char, i) => (
            <span key={i} className="hero__char" style={{ animationDelay: `${0.8 + i * 0.03}s` }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-brand">
            {'Naisha'.split('').map((char, i) => (
              <span key={i} className="hero__title-char" style={{ animationDelay: `${1.2 + i * 0.08}s` }}>
                {char}
              </span>
            ))}
          </span>
          <span className="hero__title-line">
            {'Chikankari'.split('').map((char, i) => (
              <span key={i} className="hero__title-char" style={{ animationDelay: `${1.7 + i * 0.05}s` }}>
                {char}
              </span>
            ))}
          </span>
          <span className="hero__title-line hero__title-sub">
            {'& Handlooms'.split('').map((char, i) => (
              <span key={i} className="hero__title-char" style={{ animationDelay: `${2.3 + i * 0.05}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero__tagline-wrap">
          <div className="hero__tagline-line"></div>
          <p className="hero__tagline">Elegant Chikankari Styles for Every Occasion</p>
          <div className="hero__tagline-line"></div>
        </div>

        <a href="#products" className="hero__cta">
          <span className="hero__cta-text">Explore Collection</span>
          <span className="hero__cta-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </span>
          <span className="hero__cta-shimmer"></span>
        </a>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
