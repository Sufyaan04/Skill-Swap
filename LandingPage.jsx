import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const LandingPage = () => {
  useScrollReveal();

  const features = [
    {
      icon: "⇄",
      title: "Barter Skills, Not Money",
      desc: "Exchange what you know for what you want to learn. No payments, no subscriptions — just pure skill trading between real people.",
    },
    {
      icon: "🔍",
      title: "Find Your Perfect Match",
      desc: "Search by any skill — React, Guitar, Spanish, Design. Instantly find people offering exactly what you need.",
    },
    {
      icon: "🤝",
      title: "Request & Connect",
      desc: "Send a swap request in seconds. Accept, reject, or negotiate — all in one clean dashboard.",
    },
    {
      icon: "🎓",
      title: "Learn From Real People",
      desc: "No pre-recorded videos. Real humans teaching real skills. The best way to learn is always from someone who's been there.",
    },
  ];

  const steps = [
    { num: "01", title: "Create your profile", desc: "List the skills you offer and the skills you want to learn." },
    { num: "02", title: "Discover people", desc: "Search for anyone offering a skill you need. Filter by category." },
    { num: "03", title: "Send a swap request", desc: "Propose your exchange — tell them what you offer and what you want back." },
    { num: "04", title: "Start learning", desc: "They accept, you connect. Knowledge flows both ways." },
  ];

  const testimonials = [
    { name: "Aryan Mehta", role: "CS Student", text: "I traded React skills for UI/UX design sessions. Landed my first internship because of it. SkillSwap is insane." },
    { name: "Priya Sharma", role: "Freelance Designer", text: "Found a developer to build my portfolio in exchange for brand identity work. Saved me ₹30,000 easily." },
    { name: "Rahul Verma", role: "Data Analyst", text: "Learned Python automation from a senior dev by teaching him Excel. Best trade I've ever made." },
    { name: "Sneha Patel", role: "Marketing Student", text: "Exchanged content writing for Spanish lessons. My tutor got copy for her portfolio. Win-win." },
    { name: "Dev Iyer", role: "Startup Founder", text: "SkillSwap helped me build a founding team without a budget. Everyone traded skills to ship v1." },
    { name: "Aisha Khan", role: "Graphic Designer", text: "Got video editing lessons in exchange for logo design. The community here is genuinely helpful." },
  ];

  const skills = ["React", "Python", "UI Design", "Guitar", "Spanish", "Machine Learning", "Photography", "Copywriting", "Video Editing", "Excel", "Public Speaking", "Figma"];

  return (
    <div className="landing">

      {/* ── NAVBAR ── */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo">
            <span className="landing-logo-icon">⇄</span>
            <span className="landing-logo-text">SkillSwap</span>
          </Link>
          <div className="landing-nav-links">
            <a href="#how-it-works" className="landing-nav-link">How it works</a>
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#testimonials" className="landing-nav-link">Community</a>
          </div>
          <div className="landing-nav-cta">
            <Link to="/login" className="landing-btn-ghost">Log in</Link>
            <Link to="/register" className="landing-btn-solid">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-badge reveal">✦ Free forever. No credit card required.</div>
        <h1 className="hero-title reveal">
          Exchange skills.<br />
          <em>Grow together.</em>
        </h1>
        <p className="hero-subtitle reveal">
          SkillSwap is the platform where students and professionals trade expertise — no money, just knowledge. Teach what you know, learn what you don't.
        </p>
        <div className="hero-cta reveal">
          <Link to="/register" className="landing-btn-solid landing-btn-lg">Start swapping free</Link>
          <a href="#how-it-works" className="landing-btn-outline landing-btn-lg">See how it works →</a>
        </div>

        {/* Floating skill pills */}
        <div className="hero-pills reveal">
          {skills.map((s, i) => (
            <span key={i} className="hero-pill" style={{ animationDelay: `${i * 0.08}s` }}>{s}</span>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="hero-mockup reveal">
          <div className="mockup-bar">
            <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" />
            <span className="mockup-url">skillswap.app/dashboard</span>
          </div>
          <div className="mockup-body">
            <div className="mockup-search">
              <span>🔍</span>
              <span className="mockup-search-text">Search for "React Developer"</span>
              <span className="mockup-search-btn">Search</span>
            </div>
            <div className="mockup-cards">
              {[
                { name: "AM", skill: "React & Node.js", want: "UI/UX Design", color: "#00e5a0" },
                { name: "PS", skill: "Figma & Branding", want: "Python", color: "#6c8cff" },
                { name: "RV", skill: "Data Science", want: "Public Speaking", color: "#ff9f47" },
              ].map((c, i) => (
                <div key={i} className="mockup-card" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                  <div className="mockup-avatar" style={{ background: c.color + "22", color: c.color }}>{c.name}</div>
                  <div className="mockup-card-info">
                    <div className="mockup-card-name">Offers: <strong>{c.skill}</strong></div>
                    <div className="mockup-card-want">Wants: {c.want}</div>
                  </div>
                  <div className="mockup-swap-btn">Swap →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section">
        <p className="marquee-label">Skills being exchanged right now</p>
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...skills, ...skills].map((s, i) => (
              <span key={i} className="marquee-item">✦ {s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="section-header reveal">
          <span className="section-tag">Why SkillSwap</span>
          <h2 className="section-title">Everything you need to<br />trade knowledge</h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="steps-section" id="how-it-works">
        <div className="section-header reveal">
          <span className="section-tag">How it works</span>
          <h2 className="section-title">Up and running<br />in 4 simple steps</h2>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="step-num">{s.num}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header reveal">
          <span className="section-tag">Community love</span>
          <h2 className="section-title">Real swaps.<br />Real results.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section reveal">
        <div className="cta-inner">
          <h2 className="cta-title">Start exchanging skills today.<br /><em>It's completely free.</em></h2>
          <p className="cta-sub">Join hundreds of students and professionals already swapping on SkillSwap.</p>
          <div className="cta-btns">
            <Link to="/register" className="landing-btn-solid landing-btn-lg">Create free account</Link>
            <Link to="/login" className="landing-btn-outline landing-btn-lg">Sign in</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="landing-logo-icon">⇄</span>
            <span className="landing-logo-text">SkillSwap</span>
          </div>
          <p className="footer-tagline">Trade knowledge. Grow together.</p>
          <div className="footer-links">
            <Link to="/register">Get started</Link>
            <Link to="/login">Login</Link>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <p className="footer-copy">© 2026 SkillSwap. Built with ♥ for the community.</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;