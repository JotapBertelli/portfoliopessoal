import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

/* ========================================================================== */
/* ============           COMPONENTES REUTILIZÁVEIS          ================ */
/* ========================================================================== */
const Navbar = ({ toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <h1 className="logo">João Pedro Bertelli</h1>

        <div className="desktop-nav-links">
          <a href="#about">Sobre</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projetos</a>
          <a href="#experience">Experiência</a>
          <a href="#contact">Contato</a>
          <button onClick={toggleTheme} className="theme-toggle">
            <span className="theme-icon">🌙</span>
          </button>
        </div>

        <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`mobile-nav-links ${isMenuOpen ? 'open' : ''}`}>
        {/* ✅ ADICIONE ESTE BOTÃO AQUI DENTRO */}
        <button className="close-menu-btn" onClick={closeMenu}>
          <FaTimes />
        </button>

        <a href="#about" onClick={closeMenu}>Sobre</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#projects" onClick={closeMenu}>Projetos</a>
        <a href="#experience" onClick={closeMenu}>Experiência</a>
        <a href="#contact" onClick={closeMenu}>Contato</a>
        <button onClick={() => { toggleTheme(); closeMenu(); }} className="mobile-theme-btn">
          Mudar Tema 🌙
        </button>
      </div>

      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
    </nav>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div
        className="hero-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
      <div className="hero-content">
        <div className="hero-badge">Desenvolvedor Júnior full stack</div>
        <h2 className="hero-title">
          João Pedro da Silva <span className="gradient-text">Bertelli</span>
        </h2>
        <div className="hero-tech-stack">
          <span>Python</span>
          <span>Flask</span>
          <span>React</span>
          <span>JavaScript</span>
          <span>MySQL</span>
        </div>
        <div className="buttons">
          <a href="#projects" className="primary">
            <span>Ver Projetos</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10L13 10M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="/cv-joaopedro.pdf" download className="secondary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3V13M10 13L13 10M10 13L7 10M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Download CV</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`section ${className}`}>
    <div className="section-header">
      <h3 className="section-title">{title}</h3>
      <div className="section-line"></div>
    </div>
    {children}
  </section>
);

const SkillCard = ({ name, icon, level }) => (
  <div className="skill-card">
    <div className="skill-icon-wrapper">
      <img src={icon} alt={name} className="skill-icon" />
      <div className="skill-glow"></div>
    </div>
    <span className="skill-name">{name}</span>
    <div className="skill-level">
      <div className="skill-level-fill" style={{ width: level }}></div>
    </div>
  </div>
);

const ProjectCard = ({ title, subtitle, description, images, tags, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = Array.isArray(images) && images.length > 0;

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="project-card">
      {hasImages && (
        <div className="project-gallery">
          {images.length > 1 && (
            <>
              <button onClick={goToPrevious} className="gallery-arrow prev">‹</button>
              <button onClick={goToNext} className="gallery-arrow next">›</button>
            </>
          )}
          <img
            src={images[currentIndex]}
            alt={title}
            className="project-image"
            onClick={() => onImageClick({ src: images[currentIndex], title })}
          />
          {images.length > 1 && (
            <div className="gallery-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`gallery-dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                ></span>
              ))}
            </div>
          )}
          <div className="project-overlay"></div>
        </div>
      )}
      <div className="project-content">
        <h4 className="project-title">{title}</h4>
        <p className="project-subtitle">{subtitle}</p>
        <p className="project-description">{description}</p>
        {tags && (
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceCard = ({ title, company, period, description, achievements }) => (
  <div className="experience-card">
    <div className="experience-header">
      <div>
        <h4 className="experience-title">{title}</h4>
        <p className="experience-company">{company}</p>
      </div>
      <span className="experience-period">{period}</span>
    </div>
    <p className="experience-description">{description}</p>
    {achievements && (
      <ul className="experience-achievements">
        {achievements.map((achievement, index) => (
          <li key={index}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {achievement}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".section, .skill-card, .project-card, .experience-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

/* ========================================================================== */
/* ============                APP PRINCIPAL                 ================ */
/* ========================================================================== */

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  useScrollAnimation();

  const openPopup = (data) => setPopupData(data);
  const closePopup = () => setPopupData(null);

  return (
    <div className="app">
      <Navbar toggleTheme={toggleTheme} />
      <Hero />

      <Section id="about" title="Sobre Mim">
        <div className="about-content">
          <div className="about-text">
            <p>
              Sou um desenvolvedor apaixonado por tecnologia e por criar soluções práticas através da programação.
              Minha jornada começou no <strong>SENAI</strong>, onde me formei em Análise e Desenvolvimento de Sistemas,
              e se consolidou durante minha experiência como Jovem Aprendiz na <strong>ArcelorMittal</strong>.
            </p>
            <p>
              Hoje, mergulho fundo no desenvolvimento web, com foco em <strong>Front-end e Back-end</strong>,
              criando aplicações completas com <strong>React.js</strong>, <strong>Django</strong> e <strong>Flask</strong>.
              Domino sistemas CRUD, autenticação, APIs REST e ferramentas essenciais como Git, GitHub e metodologias ágeis.
            </p>
            <p>
              Atualmente cursando <strong>Engenharia de Software</strong>, busco expandir minha visão arquitetural
              e contribuir para projetos que realmente façam a diferença no mundo digital.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">2+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">6+</span>
              <span className="stat-label">Projetos Concluídos</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">7+</span>
              <span className="stat-label">Tecnologias</span>
            </div>
          </div>
        </div>
      </Section>

      <Section id="skills" title="Habilidades Técnicas">
        <div className="skills-grid">
          <SkillCard name="Python / Flask" icon="./img/python.png"  />
          <SkillCard name="JavaScript" icon="./img/js.png"/>
          <SkillCard name="React / React Native" icon="./img/biblioteca.png"/>
          <SkillCard name="MySQL / SQLite" icon="./img/mysql.png"/>
          <SkillCard name="Git & GitHub" icon="./img/github.png"/>
          <SkillCard name="CSS3" icon="./img/css-3.png" />
          <SkillCard name="HTML5" icon="./img/html-5.png" />
        </div>
      </Section>

      <Section id="projects" title="Projetos em Destaque">
        <div className="projects-grid">
          <ProjectCard
            title="Sistema de Gerenciamento de Estoque"
            subtitle="Moda & Estilo"
            description="Sistema completo de controle de estoque com cadastro de produtos, análise de vendas e relatórios detalhados."
            images={[
              "/img/modaestilo.png",
              "/img/cadastrar.png",
              "/img/analisevendas.png",
              "/img/historicovendas.png"
            ]}
            tags={["Python", "Flask", "SQLite"]}
            onImageClick={openPopup}
          />
          <ProjectCard
  title="Sistema de Cardápio Online Completo(Em desenvolvimento)"
  subtitle="Restaurante Digital - Food Tech"
  description="Plataforma web full-stack para gerenciamento de cardápio digital com painel administrativo, personalização de produtos, sistema de pedidos em tempo real e painel da cozinha. Inclui adicionais customizáveis, checkout com delivery/retirada e interface moderna responsiva."
  images={[
    "/img/foto1.png",
      "/img/foto2.png",
      "/img/foto3.png",
      "/img/foto4.png",
      "/img/foto5.png",
      "/img/foto6.png",

  ]}
  tags={["React", "Django REST", "Python", "JavaScript", "PostgreSQL", "Real-time"]}
  onImageClick={openPopup}
/>
          <ProjectCard
            title="Portfólio Interativo"
            subtitle="React & Design Moderno"
            description="Site responsivo e moderno com animações suaves, tema claro/escuro e deploy automatizado na Vercel."
            tags={["React", "CSS3", "Vercel", "Responsive"]}
            onImageClick={openPopup}
          />
        </div>
      </Section>

      <Section id="experience" title="Experiência Profissional">
        <div className="experience-grid">
          <ExperienceCard
            title="Estagiário do Espaço Maker"
            company="SESI-SP"
            period="2025 – Atual"
            description="Apoio técnico em projetos de robótica educacional, programação e fabricação digital."
            achievements={[
              "Auxílio em projetos de robótica com Arduino e Raspberry Pi",
              "Suporte em impressoras 3D e cortadora a laser",
              "Treinamento de alunos em programação e modelagem 3D"
            ]}
          />
          <ExperienceCard
            title="Programador de Sistemas da Informação"
            company="Ferro e Aço Rossetti"
            period="2023 – 2024"
            description="Desenvolvimento e manutenção de sistemas internos para gestão empresarial."
            achievements={[
              " Desenvolvimento e manutenção de sistemas internos em ambiente corporativo",
              "Participação na implementação de soluções para controle e gerenciamento de dados",
              "Apoio na integração de tecnologias para otimizar processos da empresa"
            ]}
          />
        </div>
      </Section>

      <Section id="contact" title="Vamos Conversar?">
        <div className="contact-container">
          <p className="contact-intro">
            Estou sempre aberto a novas oportunidades e colaborações. Entre em contato!
          </p>
          <a href="mailto:jpbertelli10@gmail.com" className="contact-email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>jpbertelli10@gmail.com</span>
          </a>
          <div className="social-links">
            <a href="https://github.com/JotapBertelli" target="_blank" rel="noreferrer" className="social-link">
              <img src="/img/github.png" alt="GitHub" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/joão-pedro-da-silva-bertelli-b68ba6275" target="_blank" rel="noreferrer" className="social-link">
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 João Pedro Bertelli</p>
        </div>
        <div className="footer-waves">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </footer>

      {popupData && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              <FaTimes />
            </button>
            <img src={popupData.src} alt={popupData.title} className="popup-image" />
          </div>
        </div>
      )}

    </div>
  );
}