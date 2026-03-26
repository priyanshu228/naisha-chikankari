import { useState, useEffect, useRef, useCallback } from 'react';
import './Lightbox.css';

const SWIPE_THRESHOLD = 50;

const Lightbox = ({ images, startIndex, productName, onClose }) => {
  const [current, setCurrent] = useState(startIndex || 0);
  const [zoomed, setZoomed] = useState(false);
  const [animating, setAnimating] = useState(true);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const hasMultiple = images.length > 1;

  // Open animation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setAnimating(false), 50);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultiple) setCurrent((p) => (p + 1) % images.length);
      if (e.key === 'ArrowLeft' && hasMultiple) setCurrent((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, hasMultiple, onClose]);

  const next = useCallback(() => setCurrent((p) => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), [images.length]);

  // Touch swipe
  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const dist = touchStart.current - touchEnd.current;
    if (Math.abs(dist) >= SWIPE_THRESHOLD && hasMultiple) {
      if (dist > 0) next();
      else prev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <div className={`lightbox ${animating ? '' : 'lightbox--open'}`} onClick={onClose}>
      <div className="lightbox__backdrop" />

      {/* Close button */}
      <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Counter */}
      {hasMultiple && (
        <div className="lightbox__counter">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Product name */}
      {productName && <div className="lightbox__title">{productName}</div>}

      {/* Main image */}
      <div
        className="lightbox__content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[current]}
          alt={productName || 'Product'}
          className={`lightbox__image ${zoomed ? 'lightbox__image--zoomed' : ''}`}
          onClick={() => setZoomed(!zoomed)}
        />
      </div>

      {/* Navigation arrows */}
      {hasMultiple && (
        <>
          <button className="lightbox__arrow lightbox__arrow--left" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="lightbox__arrow lightbox__arrow--right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"/>
            </svg>
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className={`lightbox__thumb ${i === current ? 'lightbox__thumb--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
