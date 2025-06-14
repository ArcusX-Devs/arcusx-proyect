import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../images/arcus-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="ArcusX Logo" className="logo-img" />
        </Link>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('problematica')} className="nav-link">
            Problemática
          </a>
          <a onClick={() => scrollToSection('solucion')} className="nav-link">
            Solución
          </a>
          <a onClick={() => scrollToSection('caracteristicas')} className="nav-link">
            Características
          </a>
          <a onClick={() => scrollToSection('equipo')} className="nav-link">
            Equipo
          </a>
          <a onClick={() => scrollToSection('faq')} className="nav-link">
            FAQ
          </a>
          <Link to="/login" className="nav-button login" onClick={closeMenu}>
            Iniciar Sesión
          </Link>
          <Link to="/register" className="nav-button register" onClick={closeMenu}>
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 