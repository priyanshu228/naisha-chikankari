import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import useGoogleSheet from '../hooks/useGoogleSheet';
import './Products.css';

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error } = useGoogleSheet();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="products" className="products" ref={ref}>
      <div className="container">
        <div className="products__header">
          <span className="section-label">Our Collection</span>
          <h2 className="section-title">Curated for You</h2>
          <p className="section-subtitle">
            Discover our handpicked collection of chikankari apparel and ethnic accessories.
          </p>
        </div>

        {loading && (
          <div className="products__loading">
            <div className="products__spinner"></div>
            <p>Loading collection...</p>
          </div>
        )}

        {error && (
          <div className="products__error">
            <p>Unable to load products. Please refresh the page.</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="products__empty">
            <p>No products available right now. Check back soon!</p>
          </div>
        )}

        {visible && !loading && !error && currentProducts.length > 0 && (
          <>
            <div className="products__grid">
              {currentProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="products__pagination">
                <button
                  className="products__page-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`products__page-btn ${page === currentPage ? 'products__page-btn--active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="products__page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
