import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero() {
  return (
    <section id="home" className="hero">
      <img
        src="/agatha.jpg"
        alt="Agatha Rukwaro"
        className="hero-corner-photo"
      />

      <div className="hero-left">
        <img
          src="/hero-image.jpg"
          alt="Agatha Rukwaro working on a laptop"
        />
      </div>

      <div className="hero-right">
        <div className="hero-content">
          <span className="hero-tag">👋 Welcome to my Portfolio</span>

          <h1>
            Hi, I'm <span>Agatha Rukwaro</span>
          </h1>

          <h2>
            Full-Stack Developer | ICT Specialist | AI Enthusiast
          </h2>

          <p>
            I build responsive, scalable, and user-focused web applications
            while exploring Artificial Intelligence to create smarter digital
            solutions. Passionate about full-stack development, AI automation,
            and solving real-world problems through clean code, innovation, and
            continuous learning.
          </p>

          <a href="projects" className="btn-primary">
            View My Work
          </a>

          <div className="hero-socials">
            <a
              href="https://github.com/Aggie-stack"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/agatha-rukwaro-55422b380"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;