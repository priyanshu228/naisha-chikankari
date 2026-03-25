import { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`about__inner container ${visible ? 'fade-in-up' : ''}`} style={{ opacity: visible ? 1 : 0 }}>
        <span className="section-label">Our Story</span>
        <h2 className="section-title">Crafted with Passion</h2>
        <div className="about__divider"></div>
        <p className="about__text">
          We specialize in handcrafted chikankari kurtis, sarees, and elegant women
          accessories, blending tradition with modern style. Every piece in our collection
          is a labour of love — meticulously embroidered by skilled artisans from Lucknow,
          carrying forward a centuries-old craft.
        </p>
        <div className="about__features">
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4>100% Authentic</h4>
            <p>Genuine hand-embroidered chikankari from Lucknow</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h4>Made with Love</h4>
            <p>Each piece reflects artisan passion and precision</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <h4>Happy Customers</h4>
            <p>Trusted by thousands of women across India</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
