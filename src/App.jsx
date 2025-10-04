import React, { useState, useEffect } from "react";
import "./index.css";
// IMPORTAÇÕES ADICIONADAS PARA O MENU
import { FaBars, FaTimes } from "react-icons/fa";

/* ========================================================================== */
/* ============           COMPONENTES REUTILIZÁVEIS          ================ */
/* ========================================================================== */

// NAVBAR ATUALIZADA COM LÓGICA DE MENU HAMBÚRGUER E RESPONSIVIDADE
const Navbar = ({ toggleTheme }) => {
  // Novo estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu (será usada nos links)
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav>
      <div className="container">
        <h1>João Bertelli</h1>

        {/* Links para telas grandes (desktop) */}
        <div className="desktop-nav-links">
          <a href="#about">Sobre</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projetos</a>
          <a href="#experience">Experiência</a>
          <a href="#contact">Contato</a>
          <button onClick={toggleTheme} style={{ marginLeft: "1rem" }}>🌙</button>
        </div>

        {/* Botão do menu hambúrguer (só aparece no mobile) */}
        <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Painel do menu mobile */}
      <div className={`mobile-nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={closeMenu}>Sobre</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#projects" onClick={closeMenu}>Projetos</a>
        <a href="#experience" onClick={closeMenu}>Experiência</a>
        <a href="#contact" onClick={closeMenu}>Contato</a>
        <button onClick={toggleTheme}>Mudar Tema 🌙</button>
      </div>
    </nav>
  );
};


const Hero = () => (
  <section className="hero">
    <h2>João Pedro da Silva Bertelli</h2>
    <p>Desenvolvedor Júnior • Python • Flask • React • JavaScript</p>
    <div className="buttons">
      <a href="#projects" className="primary">Ver Projetos</a>
      <a href="/Curriculo_Joao_Bertelli.docx" download className="secondary">Download CV</a>
    </div>
  </section>
);

const Section = ({ id, title, children }) => (
  <section id={id}>
    <h3>{title}</h3>
    {children}
  </section>
);

// O componente Skill foi removido pois você está usando HTML/JSX diretamente
// const Skill = ({ name }) => <div className="skill">{name}</div>;

const Card = ({ title, subtitle, children, images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = Array.isArray(images) && images.length > 0;

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="card">
      {hasImages ? (
        <div className="gallery-container">
          {images.length > 1 && (
            <>
              <button onClick={goToPrevious} className="nav-arrow prev">‹</button>
              <button onClick={goToNext} className="nav-arrow next">›</button>
            </>
          )}
          <img
            src={images[currentIndex]}
            alt={title}
            className="gallery-image"
            onClick={() => onImageClick({ src: images[currentIndex], title: title })}
          />
          {images.length > 1 && (
            <div className="dots-container">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(index);
                  }}
                ></span>
              ))}
            </div>
          )}
        </div>
      ) : null}
      <h4>{title}</h4>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("section, .card, .skill-item");
      elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

/* ========================================================================== */
/* ============                APP PRINCIPAL                 ================ */
/* ========================================================================== */

export default function App() {
  const [theme, setTheme] = useState("light");
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  useScrollAnimation();

  const openPopup = (data) => setPopupData(data);
  const closePopup = () => setPopupData(null);

  return (
    <div>
      <Navbar toggleTheme={toggleTheme} />
      <Hero />

      <Section id="about" title="Sobre Mim">
        <p>
          Sempre gostei de tecnologia e de buscar soluções práticas através da programação. Minha trajetória começou no SENAI, onde me formei em Análise e Desenvolvimento de Sistemas. Durante esse período, tive a oportunidade de atuar como Jovem Aprendiz na ArcelorMittal, trabalhando como programador de sistemas da informação, o que me deu experiência em lidar com demandas reais do ambiente corporativo.

Desde então, venho me aprofundando no desenvolvimento web, com foco em Front-end e integração com Back-end, criando aplicações completas com React.js, Django e Flask, além de sistemas CRUD com autenticação e APIs REST, utilizando também versionamento com GitHub e Gitflow, e metodologias ágeis com Scrum e Kamban. Já participei de projetos educacionais e corporativos que uniram prática, inovação e trabalho em equipe com metodologias ágeis.

Atualmente, estou cursando Engenharia de Software, com o objetivo de expandir minha visão arquitetural e aprofundar meu conhecimento em desenvolvimento de sistemas de maior escala. Busco sempre aplicar boas práticas, aprender novas tecnologias e contribuir para soluções que realmente façam a diferença.
        </p>
      </Section>

      <Section id="skills" title="Habilidades">
        <div className="skills-grid">
          <div className="skill-item">
            <img src="./img/python.png" alt="Ícone Python" />
            <span>Python / Flask</span>
          </div>
          <div className="skill-item">
            <img src="./img/js.png" alt="Ícone JavaScript" />
            <span>JavaScript</span>
          </div>
          <div className="skill-item">
            <img src="./img/biblioteca.png" alt="Ícone React" />
            <span>React / React Native</span>
          </div>
          <div className="skill-item">
            <img src="./img/mysql.png" alt="Ícone MySQL" />
            <span>MySQL / SQLite</span>
          </div>
          <div className="skill-item">
            <img src="./img/github.png" alt="Ícone GitHub" />
            <span>Git & GitHub</span>
          </div>
          <div className="skill-item">
            <img src="./img/css-3.png" alt="Ícone CSS" />
            <span>Css</span>
          </div>
          <div className="skill-item">
            <img src="./img/html-5.png" alt="Ícone HTML" />
            <span>Html</span>
          </div>
        </div>
      </Section>

      <Section id="projects" title="Projetos Relevantes">
        <div className="projects-grid">
          <Card
            title="Sistema de Gerenciamento de Estoque"
            subtitle="Python, Flask, SQLite"
            images={[
              "/img/modaestilo.png",
              "/img/cadastrar.png",
              "/img/analisevendas.png",
              "/img/historicovendas.png"
            ]}
            onImageClick={openPopup}
          >
            <p>Cadastro, controle e relatórios do estoque.</p>
          </Card>
          <Card title="CRUDs e APIs REST em Flask" subtitle="Integrações de dados">
            <p>Integrações de dados com bancos relacionais.</p>
          </Card>
          <Card title="Portfólio em React" subtitle="Responsivo & Deploy Vercel">
            <p>Site responsivo com deploy em Vercel.</p>
          </Card>
        </div>
      </Section>

      <Section id="experience" title="Experiência Profissional">
        <div className="experience">
          <Card title="Estagiário do Espaço Maker — SESI-SP" subtitle="2025 – Atual">
            <ul>
              <li>Auxílio em robótica, programação e modelagem 3D.</li>
              <li>Suporte em impressoras 3D e cortadora a laser.</li>
            </ul>
          </Card>
          <Card title="Programador de Sistemas — Ferro e Aço Rossetti" subtitle="2023 – 2024">
            <ul>
              <li>Desenvolvimento e manutenção de sistemas internos.</li>
              <li>Integração de soluções para controle de dados.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="contact" title="Entre em Contato">
        <div className="contact-container">
          <a href="mailto:jpbertelli10@gmail.com" className="contact-email">
            <img src="/img/gmail.png" alt="Gmail" className="icon" />
            jpbertelli10@gmail.com
          </a>
          <div className="social-icons">
            <a href="https://github.com/JotapBertelli" target="_blank" rel="noreferrer">
              <img src="/img/github.png" alt="GitHub" className="icon" />
            </a>
            <a href="https://www.linkedin.com/in/joão-pedro-da-silva-bertelli-b68ba6275" target="_blank" rel="noreferrer">
              <img src="/img/linkedin.png" alt="Linkedin" className="icon" />
            </a>
          </div>
        </div>
      </Section>

      <footer>
        © 2025 João Pedro Bertelli — Feito com React
      </footer>

      {popupData && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="popup-close" onClick={closePopup}>
              &times;
            </span>
            <img src={popupData.src} alt={popupData.title} className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
}