import { useState, useEffect, useRef } from "react";

const data = {
  name: "Anusree M Nambiar",
  role: "Senior Front-end Engineer / Consultant",
  years: "14 Years",
  location: "Trivandrum, Kerala, India",
  email: "anu.sripuri@gmail.com",
  linkedin: "linkedin.com/in/anusreemn",
  github: "github.com/amnambiar",
  about: [
    "I'm a Senior Front-end Engineer with 14 years of experience building scalable, high-performance web applications across blockchain, IoT, logistics, and education domains.",
    "I thrive at the intersection of clean architecture and thoughtful UI — whether that's designing a component library from scratch, migrating a legacy codebase, or integrating complex APIs like Cardano wallet extensions.",
    "Beyond code, I bring a module-lead mindset: I've coordinated teams, mentored engineers, run sprint ceremonies, and delivered consistently across both co-located and fully distributed environments.",
  ],
  personal: [
    {
      icon: "✦",
      label: "Bharatanatyam Dancer",
      desc: "Classical Indian dance has shaped how I think about precision, rhythm, and expression — values I carry into my craft as an engineer.",
    },
    {
      icon: "◈",
      label: "Badminton Player",
      desc: "Quick reflexes, strategic thinking, and a love for the game — badminton keeps me sharp and grounded.",
    },
    {
      icon: "○",
      label: "Continuous Learner",
      desc: "From Pebble smart contracts to Flutter and Playwright — I actively pick up new stacks as the landscape evolves.",
    },
    {
      icon: "◇",
      label: "Team Player & Solo Flyer",
      desc: "I thrive in collaborative teams — energised by shared goals, open dialogue, and collective wins. Equally, I'm just as effective working independently, bringing the same focus and ownership to solo work.",
    },
  ],
  skills: [
    { cat: "Primary Stack", items: ["TypeScript", "React", "Angular", "Next.js"] },
    { cat: "Languages", items: ["JavaScript (ES6/ES5)", "HTML5", "CSS3", "SASS/LESS", "PHP", "CoffeeScript"] },
    { cat: "Frameworks", items: ["AngularJS", "Bootstrap", "Backbone.js", "Handlebars.js", "RequireJS", "WordPress"] },
    { cat: "State Management", items: ["Redux Toolkit (RTK)", "redux-persist"] },
    { cat: "Testing", items: ["React Testing Library", "Playwright", "Cypress", "Jest", "Jasmine", "Karma", "Selenium", "WebdriverIO"] },
    { cat: "Data Visualisation", items: ["D3.js", "amCharts", "Highcharts", "Google Maps API", "Leaflet.js", "jQuery Flot"] },
    { cat: "Build Tools", items: ["Webpack", "Angular CLI", "Grunt", "Gulp", "Browserify"] },
    { cat: "Blockchain / Web3", items: ["Pebble", "Plu-TS", "Cardano Wallet APIs", "CIP-90"] },
    { cat: "Design & Docs", items: ["Figma", "Storybook", "ZeroHeight"] },
    { cat: "CI/CD & SCM", items: ["Git", "Jenkins", "GitHub", "GitLab", "Bitbucket", "SVN"] },
    { cat: "Mobile & Other", items: ["Ionic", "Capacitor", "Stencil.js", "Flutter", "Node.js", "MongoDB", "MySQL"] },
  ],
  experience: [
    {
      role: "Senior Front-End Consultant",
      company: "ModusCreate",
      type: "Remote, Global",
      period: "Apr 2021 – Jan 2026",
      projects: [
        { name: "Reusable React Component Library", tech: "React · Next.js · Tailwind CSS · TypeScript · Jest", desc: "Architected a standalone React component library powering the IOG/IOHK AFV VS Code extension UI." },
        { name: "Cardano Smart Contracts (Pebble / Plu-TS)", tech: "TypeScript · Pebble · Plu-TS · Cardano", desc: "Built a TypeScript on-chain emulator; authored Pebble migration docs and annotated contract examples." },
        { name: "Plutus Certification Testing Tool", tech: "React · TypeScript · Redux Toolkit · Playwright · Figma", desc: "Delivered an MVP front-end surfacing QuickCheck results; integrated Cardano wallet extensions and CIP-90." },
        { name: "MyVCM Component Store", tech: "Angular · TypeScript · Storybook · ZeroHeight · Jasmine", desc: "Led architecture of an Angular component library; documented in Storybook and mentored the team." },
      ],
    },
    {
      role: "Lead Engineer — Front-End",
      company: "QBurst Technologies",
      type: "Trivandrum",
      period: "Feb 2013 – Apr 2021",
      projects: [
        { name: "Savi NEAT — Real-time Sensor Analytics", tech: "TypeScript · Angular · D3.js · amCharts · Google Maps · Webpack", desc: "Module Lead (7 yrs) on an IoT/CEP platform — ported legacy JS app to Angular; built rich data visualisations." },
        { name: "Traffic Solution SmartApp — ATS", tech: "TypeScript · Angular · Webpack · SASS", desc: "Module Lead: built the app shell and a generic SOAP↔REST interface." },
        { name: "GistDigital · ABD Online · EverFi · More", tech: "HTML5 · CSS3 · jQuery · Backbone.js · WordPress · PHP", desc: "Delivered cross-platform donation widget, aviation portal revamp, and Flash→HTML5 educational platform migration." },
      ],
    },
    {
      role: "Server Administrator",
      company: "Poornam InfoVision",
      type: "Ernakulam",
      period: "May 2012 – Jan 2013",
      projects: [
        { name: "Infrastructure & Support", tech: "Linux · Server Administration", desc: "Managed private and shared servers; provided technical support and resolved customer issues." },
      ],
    },
  ],
  education: {
    degree: "B.Tech — Computer Science & Engineering",
    institute: "Cochin University of Science and Technology (CUSAT)",
    year: "May 2012",
  },
};

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1a1a;
    --ink2: #444;
    --muted: #888;
    --pale: #f5f3ef;
    --white: #fafaf8;
    --accent: #2a52a0;
    --accent-light: #e8eef8;
    --rule: #ddd;
    --mono: 'DM Mono', monospace;
    --serif: 'Cormorant Garamond', Georgia, serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--mono);
    background: var(--white);
    color: var(--ink);
    font-size: 13px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(250,250,248,0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--rule);
  }
  .nav-logo { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; letter-spacing: 0.02em; color: var(--ink); text-decoration: none; }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { color: var(--muted); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: var(--ink); }

  /* HERO PHOTO */
  .hero-photo-wrap {
    position: absolute; top: 4rem; right: 3rem;
    width: 200px; height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--rule);
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    z-index: 1;
  }
  .hero-photo { width: 100%; height: 100%; object-fit: cover; object-position: center top; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 3rem;
    padding-top: 6rem;
    position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .hero-eyebrow {
    font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 2rem; height: 1px; background: var(--accent); }
  .hero-name {
    font-family: var(--serif); font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300; line-height: 1.0; color: var(--ink);
    letter-spacing: -0.01em; margin-bottom: 2rem;
  }
  .hero-name em { font-style: italic; color: var(--accent); }
  .hero-meta {
    display: flex; gap: 3rem; align-items: flex-end;
    padding-top: 2rem; border-top: 1px solid var(--rule);
  }
  .hero-meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
  .hero-meta-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .hero-meta-val { font-size: 13px; color: var(--ink2); }
  .hero-meta-val a { color: var(--accent); text-decoration: none; }
  .hero-meta-val a:hover { text-decoration: underline; }
  .hero-number {
    position: absolute; right: 3rem; top: 50%;
    font-family: var(--serif); font-size: clamp(8rem, 18vw, 16rem);
    font-weight: 300; color: var(--pale); line-height: 1;
    pointer-events: none; user-select: none; transform: translateY(-50%);
    letter-spacing: -0.05em;
  }

  /* SECTIONS */
  section { padding: 5rem 3rem; border-bottom: 1px solid var(--rule); }
  .sec-header {
    display: flex; align-items: baseline; gap: 1.5rem;
    margin-bottom: 3rem;
  }
  .sec-label {
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); white-space: nowrap;
  }
  .sec-title {
    font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300; color: var(--ink); line-height: 1.1;
  }
  .sec-rule { flex: 1; height: 1px; background: var(--rule); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
  .about-text p { color: var(--ink2); margin-bottom: 1.2rem; font-size: 13.5px; line-height: 1.8; }
  .about-text p:last-child { margin-bottom: 0; }
  .personal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .personal-card {
    padding: 1.5rem; border: 1px solid var(--rule);
    transition: border-color 0.2s, background 0.2s;
  }
  .personal-card:hover { border-color: var(--accent); background: var(--accent-light); }
  .personal-card.placeholder { border-style: dashed; opacity: 0.55; }
  .personal-icon { font-size: 1.1rem; color: var(--accent); margin-bottom: 0.6rem; }
  .personal-label { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 400; color: var(--ink); margin-bottom: 0.4rem; }
  .personal-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
  .skill-group { padding: 1.5rem; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .skill-group:nth-child(3n) { border-right: none; }
  .skill-cat { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; font-weight: 400; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-tag {
    font-size: 11px; padding: 0.2rem 0.6rem;
    background: var(--pale); color: var(--ink2);
    border: 1px solid transparent;
    transition: border-color 0.15s, color 0.15s;
  }
  .skill-tag:hover { border-color: var(--accent); color: var(--accent); }

  /* EXPERIENCE */
  .exp-company {
    display: flex; align-items: baseline; justify-content: space-between;
    padding: 1.5rem 0; border-top: 1px solid var(--rule);
    cursor: pointer; user-select: none;
  }
  .exp-company:first-of-type { border-top: none; }
  .exp-co-left { display: flex; flex-direction: column; gap: 0.2rem; }
  .exp-co-role { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--ink); }
  .exp-co-name { font-size: 11px; letter-spacing: 0.06em; color: var(--accent); }
  .exp-period { font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }
  .exp-toggle { font-size: 1.2rem; color: var(--muted); transition: transform 0.3s; }
  .exp-toggle.open { transform: rotate(45deg); }
  .exp-projects { overflow: hidden; transition: max-height 0.4s ease; }
  .exp-project { display: grid; grid-template-columns: 0.4fr 1fr; gap: 1rem 2rem; padding: 1rem 0; border-top: 1px solid var(--rule); }
  .exp-project:first-child { border-top: none; padding-top: 0.5rem; }
  .proj-name { font-size: 12px; font-weight: 400; color: var(--ink); line-height: 1.5; }
  .proj-tech { font-size: 10.5px; color: var(--accent); letter-spacing: 0.03em; margin-top: 0.3rem; }
  .proj-desc { font-size: 12.5px; color: var(--ink2); line-height: 1.7; }
  .exp-body { padding: 1rem 0 1.5rem; }

  /* CONTACT */
  .contact-inner { max-width: 600px; }
  .contact-intro { font-family: var(--serif); font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 300; color: var(--ink); margin-bottom: 2rem; line-height: 1.3; }
  .contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
  .contact-link {
    display: flex; align-items: center; gap: 1rem;
    font-size: 13px; color: var(--ink2); text-decoration: none;
    padding: 0.75rem 0; border-bottom: 1px solid var(--rule);
    transition: color 0.2s;
  }
  .contact-link:hover { color: var(--accent); }
  .contact-link-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); width: 80px; }

  /* FOOTER */
  footer { padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; }
  .footer-name { font-family: var(--serif); font-size: 1rem; color: var(--muted); }
  .footer-copy { font-size: 11px; color: var(--muted); }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1rem; }
    .hero { padding: 2rem 1.5rem; padding-top: 5rem; }
    .hero-number { display: none; }
    .hero-meta { flex-direction: column; gap: 1rem; }
    section { padding: 3rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .personal-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .exp-project { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

// ── Components ────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function ExpBlock({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="exp-company" onClick={() => setOpen(o => !o)}>
        <div className="exp-co-left">
          <span className="exp-co-role">{item.role}</span>
          <span className="exp-co-name">{item.company} · {item.type}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span className="exp-period">{item.period}</span>
          <span className={`exp-toggle ${open ? "open" : ""}`}>+</span>
        </div>
      </div>
      <div className="exp-projects" style={{ maxHeight: open ? "1000px" : "0" }}>
        <div className="exp-body">
          {item.projects.map((p, i) => (
            <div className="exp-project" key={i}>
              <div>
                <div className="proj-name">{p.name}</div>
                <div className="proj-tech">{p.tech}</div>
              </div>
              <div className="proj-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id='hero']");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navItems = ["about", "skills", "experience", "contact"];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-logo">AMN</a>
        <ul className="nav-links">
          {navItems.map(n => (
            <li key={n}><a href={`#${n}`} style={{ color: activeSection === n ? "var(--ink)" : undefined }}>{n}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div id="hero" className="hero">
        <div className="hero-number" aria-hidden>14</div>
        <div className="hero-photo-wrap">
          <img src="/anusree.jpeg" alt="Anusree M Nambiar" className="hero-photo" />
        </div>
        <FadeIn delay={100}>
          <div className="hero-eyebrow">Front-end Engineer & Consultant</div>
        </FadeIn>
        <FadeIn delay={200}>
          <h1 className="hero-name">
            Anusree<br /><em>M Nambiar</em>
          </h1>
        </FadeIn>
        <FadeIn delay={350}>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Experience</span>
              <span className="hero-meta-val">14 Years</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Location</span>
              <span className="hero-meta-val">{data.location}</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Email</span>
              <span className="hero-meta-val"><a href={`mailto:${data.email}`}>{data.email}</a></span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">LinkedIn</span>
              <span className="hero-meta-val"><a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer">{data.linkedin}</a></span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">GitHub</span>
              <span className="hero-meta-val"><a href={`https://${data.github}`} target="_blank" rel="noreferrer">{data.github}</a></span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="sec-header">
          <span className="sec-label">01</span>
          <h2 className="sec-title">About</h2>
          <div className="sec-rule" />
        </div>
        <div className="about-grid">
          <FadeIn>
            <div className="about-text">
              {data.about.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="personal-grid">
              {data.personal.map((item, i) => (
                <div key={i} className="personal-card">
                  <div className="personal-icon">{item.icon}</div>
                  <div className="personal-label">{item.label}</div>
                  <div className="personal-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-header">
          <span className="sec-label">02</span>
          <h2 className="sec-title">Skills</h2>
          <div className="sec-rule" />
        </div>
        <FadeIn>
          <div className="skills-grid">
            {data.skills.map((g, i) => (
              <div key={i} className="skill-group">
                <div className="skill-cat">{g.cat}</div>
                <div className="skill-tags">
                  {g.items.map((s, j) => <span key={j} className="skill-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-header">
          <span className="sec-label">03</span>
          <h2 className="sec-title">Experience</h2>
          <div className="sec-rule" />
        </div>
        <FadeIn>
          <p style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "2rem", letterSpacing: "0.05em" }}>
            Click a role to expand projects ↓
          </p>
          {data.experience.map((item, i) => <ExpBlock key={i} item={item} />)}
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--pale)", borderLeft: "3px solid var(--accent)" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Education</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)" }}>{data.education.degree}</div>
            <div style={{ fontSize: "12px", color: "var(--accent)", marginTop: "0.25rem" }}>{data.education.institute} · {data.education.year}</div>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="sec-header">
          <span className="sec-label">04</span>
          <h2 className="sec-title">Contact</h2>
          <div className="sec-rule" />
        </div>
        <FadeIn>
          <div className="contact-inner">
            <p className="contact-intro">
              Open to interesting front-end challenges,<br />
              consultant roles, and conversations worth having.
            </p>
            <div className="contact-links">
              {[
                { label: "Email", val: data.email, href: `mailto:${data.email}` },
                { label: "LinkedIn", val: data.linkedin, href: `https://${data.linkedin}` },
                { label: "GitHub", val: data.github, href: `https://${data.github}` },
                { label: "Location", val: data.location, href: null },
              ].map((c, i) => (
                c.href
                  ? <a key={i} href={c.href} className="contact-link" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <span className="contact-link-label">{c.label}</span>
                      <span>{c.val}</span>
                    </a>
                  : <div key={i} className="contact-link">
                      <span className="contact-link-label">{c.label}</span>
                      <span>{c.val}</span>
                    </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-name">Anusree M Nambiar</span>
        <span className="footer-copy">Senior Front-end Engineer / Consultant · 14 Years</span>
      </footer>
    </>
  );
}
