import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__content container">
        <img src="/logo.jpg" alt="Naisha Chikankari" className="hero__logo fade-in-up" />
        <p className="hero__label fade-in-up stagger-1">Est. with Love & Tradition</p>
        <h1 className="hero__title fade-in-up stagger-2">
          Naisha Chikankari
        </h1>
        <p className="hero__tagline fade-in-up stagger-3">
          Elegant Chikankari Styles for Every Occasion
        </p>
        <a href="#products" className="hero__cta fade-in-up stagger-4">
          Explore Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      </div>
      <div className="hero__scroll-hint fade-in stagger-5">
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
