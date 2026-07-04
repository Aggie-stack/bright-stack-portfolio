function About() {
  const webTech = ["HTML5", "CSS3", "JavaScript", "React", "Flask", "Python", "Git", "GitHub"];
  const aiTech = ["Python", "OpenAI API", "REST APIs", "Prompt Engineering", "Automation"];
  const ictSkills = ["Networking", "System Support", "Troubleshooting", "Microsoft Office", "Windows"];
  const dataTech = ["Python", "SQL", "Data Analysis", "APIs", "AI Tools"];

  const services = [
    {
      tag: "DEV",
      title: "Web Development",
      description:
        "Designing and developing responsive, modern, and scalable websites and web applications.",
      skillsLabel: "Technologies",
      skills: webTech,
    },
    {
      tag: "AI",
      title: "AI & Automation",
      description:
        "Building intelligent applications and automating business workflows to improve productivity and efficiency.",
      skillsLabel: "Technologies",
      skills: aiTech,
    },
    {
      tag: "ICT",
      title: "ICT Solutions",
      description:
        "Providing reliable ICT support and practical technology solutions for businesses and organizations.",
      skillsLabel: "Skills",
      skills: ictSkills,
    },
    {
      tag: "DATA",
      title: "Data & Innovation",
      description:
        "Leveraging data and emerging technologies to develop smarter software solutions and support informed decision-making.",
      skillsLabel: "Technologies",
      skills: dataTech,
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "I embrace creativity and modern technology to build meaningful digital solutions.",
    },
    {
      title: "Integrity",
      description:
        "I value honesty, professionalism, and building lasting trust with clients and partners.",
    },
    {
      title: "Excellence",
      description:
        "I am committed to delivering high-quality software and ICT solutions.",
    },
    {
      title: "Continuous learning",
      description:
        "Technology evolves every day, and so do I. Learning never stops at Bright Stack Technologies.",
    },
  ];

  const goals = [
    "Build scalable full-stack web applications.",
    "Deliver professional software and ICT solutions.",
    "Contribute to open-source projects.",
    "Develop AI-powered applications and automation tools.",
    "Continuously learn emerging technologies.",
    "Grow Bright Stack Technologies into a trusted global technology brand.",
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">

        <span className="section-eyebrow">Who I AM</span>
        <h2 className="section-title">About Bright Stack Technologies</h2>

        <div className="about-intro">
          <div className="about-id-card">
            <span className="about-monogram">BS</span>
            <p className="about-role">Founder &amp; Lead Developer</p>
            <div className="about-tags">
              <span>Full-Stack</span>
              <span>AI</span>
              <span>ICT</span>
            </div>
          </div>

          <div className="about-bio">
            <p className="about-bio-text">
              <strong>Bright Stack Technologies</strong> is a modern software
              development and ICT brand founded by{" "}
              <strong>Agatha Rukwaro</strong>. I specialize in building
              innovative, scalable, and user-focused digital solutions that
              help businesses and individuals thrive in the digital world.
            </p>

            <p className="about-bio-text">
              My passion lies in software engineering, Artificial
              Intelligence, automation, and emerging technologies. Every
              project I build reflects my commitment to clean code,
              innovation, continuous learning, and delivering technology that
              creates real impact.
            </p>
          </div>
        </div>

        <span className="section-eyebrow">What I do</span>
        <h2 className="section-title">Services &amp; Technologies</h2>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <span className="service-tag">{service.tag}</span>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <h4>{service.skillsLabel}</h4>

              <div className="tech-list">
                {service.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <span className="section-eyebrow">Where I'm headed</span>
        <h2 className="section-title">Goals</h2>

        <ul className="goals-list">
          {goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>

        <span className="section-eyebrow">What drives ME</span>
        <h2 className="section-title">Core Values</h2>

        <div className="values-grid">
          {values.map((value) => (
            <div className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mission-box">
          <h2 className="mission-title">My Mission</h2>

          <p className="mission-text">
            To empower businesses and individuals through innovative
            software, Artificial Intelligence, and ICT solutions that solve
            real-world problems, improve efficiency, and create lasting
            digital impact.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;