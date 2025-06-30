import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaLaptopCode, FaMoneyBillWave, FaArrowRight, FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiFarcaster } from "react-icons/si";
import '../css/Hero.css';
import footerLogo from '../images/arcus-logo.png';
import brunoImg from '../images/bruno.jpg';
import roqueImg from '../images/roque.jpg';
import jereImg from '../images/jere.jpeg';
import desempleoImg from '../images/desempleo.webp';
import gananciaImg from '../images/ganancia.webp';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            La Plataforma{' '}
            <span className="hero-title-highlight">Web3</span>{' '}
            para el{' '}
            <span className="hero-title-highlight">Talento</span>{' '}
            Latinoamericano
          </h1>
          <p className="hero-description">
            Conectamos talento latinoamericano con oportunidades globales a través de microtareas. 
            Simple, rápido y seguro para empezar a ganar en cripto.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">100+</span>
              <span className="stat-label">Tareas Disponibles</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">200+</span>
              <span className="stat-label">Usuarios Activos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$10K+</span>
              <span className="stat-label">Pagos Procesados</span>
            </div>
          </div>
          <div className="hero-buttons">
            <Link to="/register" className="hero-button primary">
              Comenzar Ahora <FaArrowRight />
            </Link>
            <Link to="/login" className="hero-button secondary">
              Ver Demo
            </Link>
          </div>
        </div>
        <div className="hero-3d">
          <div className="floating-particles">
            <div className="particle particle-1">
              <h3 className="job-title">Desarrollador Frontend React</h3>
              <p className="job-company">TechCorp Solutions</p>
              <div className="job-details">
                <span>Remoto</span>
                <span>Tiempo Completo</span>
              </div>
              <div className="job-price">
                Desde <span>$2,500</span> USD/mes
              </div>
              <div className="job-tags">
                <span className="job-tag">React</span>
                <span className="job-tag">TypeScript</span>
                <span className="job-tag">Next.js</span>
              </div>
            </div>

            <div className="particle particle-2">
              <h3 className="job-title">Diseñador UI/UX Senior</h3>
              <p className="job-company">Creative Digital Agency</p>
              <div className="job-details">
                <span>Híbrido</span>
                <span>Proyecto</span>
              </div>
              <div className="job-price">
                Desde <span>$45</span> USD/hora
              </div>
              <div className="job-tags">
                <span className="job-tag">Figma</span>
                <span className="job-tag">Adobe XD</span>
                <span className="job-tag">UI/UX</span>
              </div>
            </div>

            <div className="particle particle-3">
              <h3 className="job-title">Marketing Manager</h3>
              <p className="job-company">Growth Experts</p>
              <div className="job-details">
                <span>Remoto</span>
                <span>Part-time</span>
              </div>
              <div className="job-price">
                Desde <span>$1,800</span> USD/mes
              </div>
              <div className="job-tags">
                <span className="job-tag">SEO</span>
                <span className="job-tag">SEM</span>
                <span className="job-tag">Analytics</span>
              </div>
            </div>

            <div className="particle particle-4">
              <h3 className="job-title">Desarrollador iOS</h3>
              <p className="job-company">AppTech Solutions</p>
              <div className="job-details">
                <span>Remoto</span>
                <span>Por Proyecto</span>
              </div>
              <div className="job-price">
                Desde <span>$4,000</span> USD/mes
              </div>
              <div className="job-tags">
                <span className="job-tag">Swift</span>
                <span className="job-tag">SwiftUI</span>
                <span className="job-tag">iOS</span>
              </div>
            </div>

            <div className="particle particle-5">
              <h3 className="job-title">Data Scientist</h3>
              <p className="job-company">Data Insights Co.</p>
              <div className="job-details">
                <span>Remoto</span>
                <span>Tiempo Completo</span>
              </div>
              <div className="job-price">
                Desde <span>$3,500</span> USD/mes
              </div>
              <div className="job-tags">
                <span className="job-tag">Python</span>
                <span className="job-tag">ML</span>
                <span className="job-tag">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="problematica" className="problem-section">
        <div className="section-container">
          <div className="problem-content">
            <div className="problem-image-container">
              <img src={desempleoImg} alt="Búsqueda de trabajo" className="problem-image" />
              <div className="image-overlay"></div>
              <div className="image-dots"></div>
            </div>
            <div className="problem-info">
              <div className="problem-header">
                <span className="subtitle">LA PROBLEMÁTICA EN LATINOAMÉRICA</span>
                <h2 className="problem-title">
                  Barreras en el Mercado
                  <span className="highlight-text">Freelance Global</span>
                </h2>
                <p className="problem-description">
                  En Latinoamérica, millones de profesionales enfrentan obstáculos significativos 
                  para acceder al mercado freelance global. ArcusX identifica y aborda estas 
                  barreras para crear oportunidades reales de crecimiento.
                </p>
              </div>

              <div className="stats-container">
                <div className="stat-box">
                  <div className="stat-number">70%</div>
                  <div className="stat-label">Barreras de Entrada</div>
                  <div className="stat-description">
                    De los freelancers latinos enfrentan dificultades con el idioma y la falta de experiencia inicial.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">85%</div>
                  <div className="stat-label">Pagos Complejos</div>
                  <div className="stat-description">
                    Sufren altas comisiones y largos tiempos de espera en transferencias internacionales.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">60%</div>
                  <div className="stat-label">Competencia</div>
                  <div className="stat-description">
                    De los trabajos requieren portafolio previo, limitando oportunidades para nuevos freelancers.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">40%</div>
                  <div className="stat-label">Ingresos Perdidos</div>
                  <div className="stat-description">
                    De potenciales ingresos se pierden debido a barreras tecnológicas y falta de acceso.
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={() => scrollToSection('solucion')} 
                  className="action-button primary"
                >
                  Conoce la Solución
                </button>
                <button className="action-button secondary">Leer Más</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucion" className="solution-section">
        <div className="section-container">
          <div className="solution-content">
            <div className="solution-info">
              <div className="solution-header">
                <span className="subtitle">NUESTRA SOLUCIÓN</span>
                <h2 className="problem-title">
                  Revolucionando el
                  <span className="highlight-text">Trabajo Freelance</span>
                </h2>
                <p className="problem-description">
                  ArcusX transforma la manera en que los freelancers latinoamericanos acceden al mercado global,
                  proporcionando un ecosistema completo de herramientas y oportunidades.
                </p>
              </div>

              <div className="stats-container">
                <div className="stat-box">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Microtareas Accesibles</div>
                  <div className="stat-description">
                    Comienza con tareas simples y bien remuneradas mientras construyes tu reputación y portafolio profesional.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Sistema de Niveles</div>
                  <div className="stat-description">
                    Progresa naturalmente accediendo a tareas más complejas y mejor pagadas a medida que ganas experiencia.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">0%</div>
                  <div className="stat-label">Pagos Web3</div>
                  <div className="stat-description">
                    Recibe pagos instantáneos en criptomonedas, eliminando barreras y comisiones tradicionales.
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Mentoría Continua</div>
                  <div className="stat-description">
                    Accede a recursos educativos y mentores expertos que te guiarán en tu desarrollo profesional.
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <Link to="/register" className="action-button primary">
                  Comienza Ahora
                </Link>
              </div>
            </div>
            {/*CODE OWNER: BRUNO MIRANDA*/}
            <div className="problem-image-container">
              <img src={gananciaImg} alt="Ganancias en ArcusX" className="problem-image" />
              <div className="image-overlay"></div>
              <div className="image-dots"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="caracteristicas" className="features-section">
        <div className="features-container">
          <h2 className="features-title">¿Por qué elegir ArcusX?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaRocket />
              </div>
              <h3>Comienza Rápido</h3>
              <p>Sin experiencia previa requerida. Aprende mientras ganas con tareas simples y bien pagadas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Comunidad Activa</h3>
              <p>Únete a una comunidad vibrante de freelancers latinoamericanos que comparten conocimientos y oportunidades.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaLaptopCode />
              </div>
              <h3>Desarrollo Profesional</h3>
              <p>Mejora tus habilidades con tareas cada vez más desafiantes y construye un portafolio sólido.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Pagos Seguros</h3>
              <p>Recibe pagos puntuales en criptomonedas y sin comisiones ocultas, ya que, buscamos tener una transparencia total (cobramos comisiones bajas y con transparencia).</p>
            </div>
          </div>
        </div>
      </section>

      <section id="equipo" className="team-section">
        
        <div className="section-container">
          
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-content">
            <div className="team-intro">
              <p>Un equipo apasionado por revolucionar el futuro del trabajo en Latinoamérica</p>
            </div>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-member-image">
                  <img src={brunoImg} alt="Bruno Miranda" className="member-img" />
                </div>
                
                <div className="member-info">
                  <h3>Bruno Miranda E.</h3>
                  <p className="member-role">CEO & Fundador</p>
                  <p className="member-bio">Desarrollador full-stack con amplia experiencia en Web3 y liderazgo de equipos tecnológicos.</p>
                  
                  <div className="hero-buttons">
                    <Link to="https://www.linkedin.com/in/bruno-miranda-31602b260/" className="hero-button primary">
                      <FaLinkedin />
                    </Link>

                    <Link to="https://x.com/Brunixsoo/" className="hero-button primary">
                      <FaTwitter />
                    </Link>

                    <Link to="https://github.com/wrever" className="hero-button primary">
                      <FaGithub />
                    </Link>

                  </div>
                </div>
              </div>
              <div className="team-card">
                <div className="team-member-image">
                  <img src={roqueImg} alt="Vicente Vera" className="member-img" />
                </div>
                <div className="member-info">
                  <h3>Vicente Vera</h3>
                  <p className="member-role">COO</p>
                  <p className="member-bio">Experto en operaciones y coordinación, asegurando el funcionamiento eficiente de ArcusX.</p>
                  <div className="hero-buttons">
                    <Link to="https://www.linkedin.com/in/roque-cea/" className="hero-button primary">
                      <FaLinkedin />
                    </Link>
                    <Link to="https://x.com/Cea0407" className="hero-button primary">
                      <FaTwitter />
                    </Link>
                    <Link to="https://github.com/R11000" className="hero-button primary">
                      <FaGithub />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card">
                <div className="team-member-image">
                  <img src={jereImg} alt="Jeremías Meneses" className="member-img" />
                </div>
                <div className="member-info">
                  <h3>Jeremías Meneses</h3>
                  <p className="member-role">CMO</p>
                  <p className="member-bio">Estratega de marketing digital con enfoque en crecimiento y expansión global.</p>
                  <div className="hero-buttons">
                    <Link to="https://www.linkedin.com/in/jerem%C3%ADas-israel-meneses-gatica-525975311/" className="hero-button primary">
                      <FaLinkedin />
                    </Link>
                    <Link to="https://x.com/jeremias_meneses" className="hero-button primary">
                      <FaTwitter />
                    </Link>
                    <Link to="https://github.com/El-Jere-Original" className="hero-button primary">
                      <FaGithub />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container">
          <h2 className="section-title light">Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h3 className="faq-question">¿Cómo funciona el sistema de microtareas?</h3>
              <div className="faq-answer">
                <p>Las microtareas son pequeñas actividades que puedes realizar desde cualquier dispositivo (siempre y cuando sea posible). Cada tarea tiene una recompensa específica y puedes completar tantas como desees.</p>
              </div>
            </div>
            <div className="faq-card">
              <h3 className="faq-question">¿Cómo recibo mis pagos?</h3>
              <div className="faq-answer">
                <p>Los pagos se realizan automáticamente una vez que ambas partes (freelancer y empleador) hayan aceptado un acuerdo mutuo. Podrás retirar y recibir tu dinero a través de wallets.</p>
              </div>
            </div>
            <div className="faq-card">
              <h3 className="faq-question">¿Qué requisitos necesito para empezar?</h3>
              <div className="faq-answer">
                <p>Solo necesitas una conexión a internet y un dispositivo (computadora, tablet o smartphone). No se requieren conocimientos técnicos especiales a menos que sea requerido.</p>
              </div>
            </div>
            <div className="faq-card">
              <h3 className="faq-question">¿Cómo funciona la mentoría?</h3>
              <div className="faq-answer">
                <p>Nuestro sistema de mentoría te conecta con expertos que te guiarán en tu desarrollo profesional. Recibirás consejos personalizados y podrás resolver tus dudas en cualquier momento acerca de nuestra plataforma ArcusX.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>¿Listo para comenzar tu viaje freelance?</h2>
            <p>Únete a miles de personas que ya están ganando dinero y desarrollando sus habilidades en ArcusX</p>
            <Link to="/register" className="cta-button">
              Crear Cuenta Gratis <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <img src={footerLogo} alt="ArcusX Logo" className="footer-logo" />
              <div className="footer-social">
                <Link to="https://instagram.com/arcusx_/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </Link>
                <Link to="https://twitter.com/ArcusX_one" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </Link>
                <Link to="https://www.linkedin.com/in/arcus-x-000348342/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </Link>
                <Link to="https://warpcast.com/arcusx" target="_blank" rel="noopener noreferrer">
                  <SiFarcaster />
                </Link>
              </div>
            </div>
            <div className="footer-section">
              <h4>Plataforma</h4>
              <ul>
                <li><Link to="https://docs.arcusx.one/getting-started/quickstart">Cómo Funciona</Link></li>
                <li><Link to="/dashboard">Tareas Disponibles</Link></li>
                <li><Link to="https://docs.arcusx.one/getting-started/publish-your-docs">Comisiones</Link></li>
               
              </ul>
            </div>
            <div className="footer-section">
              <h4>Recursos</h4>
              <ul>
               
                <li><Link to="https://docs.arcusx.one/">Guía</Link></li>
                <li><Link to="https://docs.arcusx.one/">Tutoriales</Link></li>
                <li><Link to="https://docs.arcusx.one/community/faq">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="https://docs.arcusx.one/legal/privacy-policy">Privacidad</Link></li>
                <li><Link to="https://docs.arcusx.one/legal/terms-and-conditions">Términos</Link></li>
                <li><Link to="https://docs.arcusx.one/legal/security">Seguridad</Link></li>
                <li><Link to="https://docs.arcusx.one/legal/compliance">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ArcusX. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero; 