import { useState, useRef, useCallback } from 'react';
import './ProductCard.css';

const WHATSAPP_NUMBER = '918448805903';
const SWIPE_THRESHOLD = 40;

const ProductCard = ({ product, index, onImageClick }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Touch/swipe state
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const message = encodeURIComponent(
    `Hi, I am interested in ${product.name}. Please share more details.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
  const hasVideo = product.video && product.video.trim();

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setImgLoaded(false);
    setCurrentImg((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setImgLoaded(false);
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= SWIPE_THRESHOLD && hasMultipleImages) {
      if (distance > 0) nextImage();
      else prevImage();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (onImageClick && images.length > 0) {
      onImageClick(images, currentImg, product.name);
    }
  };

  // Convert YouTube URL to embed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    return url;
  };

  return (
    <div className={`product-card fade-in-up stagger-${(index % 8) + 1}`} style={{ opacity: 0 }}>
      <div
        className="product-card__media-wrap"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {showVideo && hasVideo ? (
          <div className="product-card__video">
            <iframe
              src={getEmbedUrl(product.video)}
              title={product.name}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            {images.length > 0 ? (
              <div className="product-card__image-container" onClick={handleImageClick}>
                {/* Skeleton shimmer */}
                {!imgLoaded && <div className="product-card__skeleton" />}
                <img
                  src={images[currentImg]}
                  alt={product.name}
                  className={`product-card__image ${imgLoaded ? 'product-card__image--loaded' : ''}`}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            ) : (
              <div className="product-card__placeholder">No Image</div>
            )}

            {hasMultipleImages && (
              <>
                <button className="product-card__arrow product-card__arrow--left" onClick={prevImage} aria-label="Previous image">&#8249;</button>
                <button className="product-card__arrow product-card__arrow--right" onClick={nextImage} aria-label="Next image">&#8250;</button>
                <div className="product-card__dots">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`product-card__dot ${i === currentImg ? 'product-card__dot--active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setImgLoaded(false); setCurrentImg(i); }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {hasVideo && (
          <button
            className="product-card__video-toggle"
            onClick={(e) => { e.stopPropagation(); setShowVideo(!showVideo); }}
            aria-label={showVideo ? 'Show images' : 'Play video'}
          >
            {showVideo ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        )}

        {product.badge && (
          <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}

        {/* Zoom hint on hover */}
        {images.length > 0 && !showVideo && (
          <div className="product-card__zoom-hint" onClick={handleImageClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">{product.price}</p>
        <p className="product-card__desc">{product.description}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card__cta"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
