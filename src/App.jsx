import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import WhatsAppFloat from './components/WhatsAppFloat';
import WaveDivider from './components/WaveDivider';

const App = () => {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((images, startIndex, productName) => {
    setLightbox({ images, startIndex, productName });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <WaveDivider from="#e8b4c0" to="#f5dbe0" />
      <About />
      <WaveDivider from="#efc4cc" to="#f5dbe0" />
      <Products onImageClick={openLightbox} />
      <WaveDivider from="#f5dbe0" to="#f5dbe0" />
      <Contact />
      <WaveDivider from="#eabfc8" to="#1a2650" />
      <Footer />
      <WhatsAppFloat />
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          productName={lightbox.productName}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};

export default App;
