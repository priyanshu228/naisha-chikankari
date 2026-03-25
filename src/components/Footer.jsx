import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <img src="/logo.jpg" alt="Naisha Chikankari" className="footer__logo-img" />
          <h3 className="footer__logo">
            Naisha<span>Chikankari</span>
          </h3>
        </div>
        <p className="footer__copy">
          &copy; {year} Naisha Chikankari. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
