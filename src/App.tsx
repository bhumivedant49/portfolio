import { useEffect, useMemo, useRef, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

type ProjectCategory = "AI/ML" | "Agentic AI" | "Data Science" | "Full Stack";

type Project = {
  title: string;
  categories: ProjectCategory[];
  image: string;
  metric: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  status?: string;
};

const designations = ["Software Engineer", "AI/ML Developer", "Full-Stack Engineer", "IoT Builder"];

const projects: Project[] = [
  {
    title: "Career Compass — Resume Parsing & ATS Scoring Platform",
    categories: ["Full Stack"],
    image: "/career_compass.png",
    metric: "ATS Scoring Engine",
    summary: "Built a full-stack career management platform that parses resumes (PDFBox/POI), calculates transparent ATS scores, identifies skill gaps, and implements JWT-based auth with MySQL persistence.",
    stack: ["Java 21", "Spring Boot 3.5", "Spring Data JPA", "React", "Vite", "MySQL 8", "Flyway", "Apache PDFBox 3", "Apache POI 5", "jjwt 0.13", "BCrypt"],
    links: [
      { label: "GitHub", href: "https://github.com/bhumivedant49/ai-career-assistant" }
      /* <!-- NEEDS CONFIRMATION: has the Spring Security default-credential warning on career-assistant-api been resolved? Do not re-enable Live Site link until confirmed. --> */
    ],
    status: "In Progress"
  },
  {
    title: "Agentic AI Marketing Assistant",
    categories: ["Agentic AI", "Full Stack"],
    image: "/agentic_marketing_assistant.jpg",
    metric: "~60% less manual effort",
    summary: "Production fintech content application that orchestrates live market research, LLM generation, scheduling, and publishing.",
    stack: ["Python", "FastAPI", "OpenAI GPT", "LangChain", "SERP API", "GNews", "n8n", "GCP", "CI/CD"],
    links: [{ label: "Live Site", href: "https://content.decuple.work/" }]
  },
  {
    title: "AI Currency Detection for the Visually Impaired",
    categories: ["AI/ML"],
    image: "/currency_detection_project.jpg",
    metric: "93.8% accuracy",
    summary: "Mobile + IoT assistive system using YOLOv8 to identify Indian currency in real time for visually impaired users.",
    stack: ["YOLOv8", "Java", "TensorFlow", "OpenCV", "IoT", "Android"],
    links: [
      { label: "GitHub", href: "https://github.com/ReebaPatel/Currency-Detection-App/tree/master" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=vTw1TWwg6f8" }
    ]
  },
  {
    title: "Market Research Automation Agent",
    categories: ["Agentic AI"],
    image: "/market_research_agent.jpg",
    metric: "Live web orchestration",
    summary: "Reusable FastAPI microservice that combines LLM calls with SERP data to produce structured business insights.",
    stack: ["Python", "LangChain", "FastAPI", "SERP API", "OpenAI GPT", "REST API"],
    links: [{ label: "GitHub", href: "https://github.com/bhumivedant49/WIT-GenAI-Series-" }]
  },
  {
    title: "Smart Negotiation Analysis for Local Vendors",
    categories: ["Data Science"],
    image: "/smart_negotiation.jpg",
    metric: "Raw data to pricing insight",
    summary: "RFM segmentation and K-Means clustering pipeline for vendor pricing strategy and customer behavior analysis.",
    stack: ["Python", "Scikit-learn", "K-Means", "RFM", "Pandas", "Matplotlib"],
    links: [{ label: "Notebook", href: "https://github.com/bhumivedant49/Smart-Negotiation-for-local-vendors/blob/main/DSPL_Project.ipynb" }]
  },
  {
    title: "EtherSpend - Decentralized Expense Tracker",
    categories: ["Full Stack"],
    image: "/etherspend.png",
    metric: "Smart Contract Integrated",
    summary: "Blockchain-based expense tracker built with React and Solidity. Stores expenses on Ethereum Sepolia with MetaMask wallet integration, immutable on-chain records, and privacy-focused transaction handling.",
    stack: ["React", "Solidity", "Ethereum", "ethers.js", "MetaMask", "Tailwind CSS", "Sepolia Test Network"],
    links: [
      { label: "Live Site", href: "https://ether-spend-decentralized-expense-t.vercel.app/" },
      { label: "GitHub", href: "https://github.com/bhumivedant49/EtherSpend---Decentralized-Expense-Tracker" }
    ]
  }
];

const experiences = [
  {
    role: "Software Developer",
    company: "InfinityPool Finnotech Pvt. Ltd",
    type: "Full-Time Internship",
    period: "Jun 2025 - Apr 2026",
    location: "Pune, India",
    summary: "Built an AI-powered Marketing Assistant and automated content pipelines through agentic workflows, SERP API, GNews, OpenAI GPT models, n8n, GCP, and CI/CD.",
    impact: ["Reduced manual content effort by ~60%", "Contributed to financial AI analytics for a capital-markets environment"]
  },
  {
    role: "AI & Computer Vision Intern - Lead",
    company: "TAM SYSTECH",
    type: "Remote Internship",
    period: "Oct 2025 - Nov 2025",
    location: "Seoul, South Korea (Remote)",
    summary: "Directed an AI intern team across computer-vision pipelines using YOLO/CNN architectures and Roboflow annotation workflows.",
    impact: ["Improved model accuracy by 25%", "Managed preprocessing, augmentation, evaluation, and production deployment"]
  },
  {
    role: "Full Stack Developer Intern",
    company: "Fr. C. R. Institute of Technology",
    type: "Part-Time Internship",
    period: "Jan 2024 - Aug 2025",
    location: "Vashi, Navi Mumbai",
    summary: "Developed 100+ PHP/MySQL modules for a College Management System serving 3,000+ users and acted as SPOC across the SDLC.",
    impact: ["Improved page load performance by 40%", "Raised user satisfaction by 70% post-redesign"]
  },
  {
    role: "Python Backend Intern",
    company: "Resolute AI Software",
    type: "Full-Time Internship",
    period: "Jun 2024 - Sep 2024",
    location: "Bangalore, India",
    summary: "Built a FastAPI backend for BLE-based indoor positioning with Kalman filtering and contributed to a YOLOv8 + OCR Shelf Analytics pipeline on Azure.",
    impact: ["Increased indoor tracking accuracy by 40%", "Reduced signal noise by 35%"]
  }
];

const skillGroups = [
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript (used for this site)", "Node.js", "Java", "PHP", "C/C++"] },
  { title: "Frontend & UX", items: ["React", "Vite", "Component Architecture", "Responsive Design", "Canvas API", "Data-Driven UI", "Web APIs", "Accessibility-minded UI"] },
  { title: "AI/ML & Computer Vision", items: ["Machine Learning", "YOLOv8", "OpenCV", "TensorFlow", "Scikit-learn", "Roboflow", "RFM Segmentation", "K-Means Clustering"] },
  { title: "Agentic AI", items: ["FastAPI", "Flask", "LangChain", "OpenAI GPT", "REST APIs", "Prompt Engineering", "LLM APIs", "n8n Workflow Automation"] },
  { title: "Backend & APIs", items: ["API Design", "Spring Boot", "Spring Security", "JWT", "React", "MySQL", "Vite"] },
  { title: "Cloud, DevOps & Databases", items: ["GCP", "AWS", "Azure", "Docker", "CI/CD", "MySQL", "PostgreSQL", "MongoDB", "Git", "Postman"] },
  { title: "IoT & Embedded Systems", items: ["BLE", "RFID", "MQTT", "IoT System Design", "Kalman Filtering", "Signal Processing"] }
];

const achievements = [
  {
    title: "1st Runner-Up & Best Innovation - HackVerse 2025",
    meta: "Professional | 2025 | HackVerse National Hackathon",
    image: "/hackverse_2025.jpg",
    summary: "Won two awards among 50+ teams for an AI + IoT assistive currency detection solution targeting 1.5M+ visually impaired users."
  },
  {
    title: "Google Cloud Arcade Co-Facilitator",
    meta: "Professional | 2025 | Google",
    image: "/google_arcade.jpg",
    summary: "Guided 100+ students through cloud-native application development on GCP as part of Cloud Arcade Cohort 1."
  },
  {
    title: "Campus Lead - AlgoZenith FCRIT Chapter",
    meta: "Leadership | 2024-2025 | AlgoZenith / FCRIT",
    image: "/algozenith_lead.jpg",
    summary: "Led a 200+ member technical community through coding contests, DSA workshops, and peer mentorship sessions."
  },
  {
    title: "IoT & DevOps Workshop Speaker",
    meta: "Professional | 2024 | FCRIT & SIESCOMS",
    image: "/iot_workshopp.jpg",
    summary: "Conducted a 30-hour RFID & IoT programme for 40+ students and delivered a Docker & CI/CD DevOps session for MCA faculty."
  }
];

const publications = [
  {
    title: "AI-Driven Social Media Marketing Assistant Using Agentic Workflows and Long-Term Memory",
    venue: "IEEE CICN 2026 — Manila, Philippines",
    meta: "Bhumi Vedant (Primary Author), Harshal Shirole, Paras Kadam, Anuj Kadu, Archana Shirke, Priyamvada Singh",
    summary: "Describes an agentic workflow architecture for social media automation that adapts, reasons, and waits for human input before publishing — featuring a three-tier subscription model, automated daily content pipelines, persistent state management, and multi-platform publishing.",
    doi: "https://doi.org/10.1109/CICN70047.2026.11594391",
    tags: ["Primary Author", "In-Person Presentation", "Peer Reviewed", "June 2026"]
  }
];

const credentials = [
  "FastAPI backend efficiency verified: Core signal parsing and API design matches production excellence!",
  "Google Cloud automation verified: Agentic pipelines are robustly structured and deployed.",
  "Stellar leadership qualities unlocked: Bhumi is ready to excel as an AI/ML and Full-stack engineer in your team!"
];

function pickCredentials(score: number) {
  if (score >= 600) return credentials;
  const shuffled = [...credentials].sort(() => Math.random() - 0.5);
  if (score >= 300) return shuffled.slice(0, 2);
  return shuffled.slice(0, 1);
}

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = window.setTimeout(() => {
      if (!deleting && text.length < word.length) setText(word.slice(0, text.length + 1));
      else if (!deleting) setDeleting(true);
      else if (text.length > 0) setText(word.slice(0, text.length - 1));
      else {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      }
    }, deleting ? 35 : text === word ? 1200 : 70);
    return () => window.clearTimeout(timeout);
  }, [deleting, index, text, words]);

  return text;
}

function StatCounter({ target, label, prefix = "", suffix = "" }: { target: number, label: string, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1500;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  
  return <div ref={ref}><strong>{prefix}{count}{suffix}</strong><span>{label}</span></div>;
}

function useScrollSpy() {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return activeId;
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const typed = useTypewriter(designations);
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.categories.includes(filter)), [filter]);
  const activeSection = useScrollSpy();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SpeedInsights />
      <main>
      <nav className="nav">
        <a href="#home" className="brand">BV</a>
        <div>
          <a href="#experience" className={activeSection === "experience" ? "activeNav" : ""}>Experience</a>
          <a href="#skills" className={activeSection === "skills" ? "activeNav" : ""}>Skills</a>
          <a href="#projects" className={activeSection === "projects" ? "activeNav" : ""}>Projects</a>
          <a href="#achievements" className={activeSection === "achievements" ? "activeNav" : ""}>Achievements</a>
          <a href="#publications" className={activeSection === "publications" ? "activeNav" : ""}>Publications</a>
          <a href="#simulator" className={activeSection === "simulator" ? "activeNav" : ""}>Simulator</a>
          <a href="#contact" className={activeSection === "contact" ? "activeNav" : ""}>Contact</a>
        </div>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{theme === "dark" ? "☾" : "☀"}</button>
      </nav>

      <section id="home" className="hero">
        <div className="heroText fade-up">
          <span className="kicker">Professional Portfolio of</span>
          <h1>Bhumi Devendra Vedant</h1>
          <p className="typed">{typed}<span /></p>
          <div className="availability-strip">🚀 Actively seeking Backend / AI-ML / Full-Stack SWE roles — open to relocation across India.</div>
          <p>
            Results-driven software engineer with hands-on experience across fintech, AI/ML, computer vision, full-stack systems, cloud deployment, and IoT.
            This portfolio is built as an interactive product experience, not a static document.
          </p>
          <div className="actions">
            <a href="#experience">View Experience</a>
            <a href="#simulator">Play Simulator 👾</a>
            <a href="https://drive.google.com/file/d/1FOedvL-Vubzqs-GpwTu3r_Kvk8Ww24-W/view?usp=sharing" target="_blank" rel="noreferrer">Open Resume</a>
          </div>
        </div>
        <img src="/bhumi_profile.jpg" alt="Bhumi Vedant" />
      </section>

      <section id="experience" className="section experienceSection">
        <div className="sectionHead fade-up">
          <span className="kicker">Work Experience</span>
          <h2>Internships across fintech, computer vision, platforms, and IoT.</h2>
        </div>
        <div className="experienceGrid">
          {experiences.map((experience, i) => (
            <article key={experience.role} className="experienceCard fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <div>
                <span className="kicker">{experience.type}</span>
                <h3>{experience.role}</h3>
                <strong>{experience.company}</strong>
                <p>{experience.period} | {experience.location}</p>
              </div>
              <p>{experience.summary}</p>
              <ul>{experience.impact.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skillsSection">
        <div className="sectionHead fade-up">
          <span className="kicker">Technical Skills</span>
          <h2>Combined skill stack from academics, internships, projects, and this build.</h2>
          <p>Grouped as a practical engineering toolkit rather than a separate explanation of the website itself.</p>
        </div>
        <div className="skillsGrid">
          {skillGroups.map((group, i) => (
            <article key={group.title} className="skillGroup fade-up" style={{ transitionDelay: `${i * 50}ms` }}>
              <h3>{group.title}</h3>
              <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="sectionHead fade-up">
          <span className="kicker">Project Explorer</span>
          <h2>Filter by domain and inspect implementation evidence.</h2>
        </div>
        <div className="filters">
          {["All", "AI/ML", "Agentic AI", "Data Science", "Full Stack"].map((item) => (
            <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item as ProjectCategory | "All")}>{item}</button>
          ))}
        </div>
        <div className="projects">
          {visibleProjects.slice(0, 4).map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
        {visibleProjects.length > 4 && (
          <details className="moreProjectsDetails">
            <summary>View More Projects</summary>
            <div className="projects" style={{ marginTop: '26px' }}>
              {visibleProjects.slice(4).map((project) => <ProjectCard key={project.title} project={project} />)}
            </div>
          </details>
        )}
      </section>

      <section id="achievements" className="section achievementsSection">
        <div className="sectionHead fade-up">
          <span className="kicker">Achievements & Recognition</span>
          <h2>Impact beyond the classroom.</h2>
        </div>
        <div className="statsRow fade-up">
          <StatCounter target={4} label="Internships" />
          <StatCounter target={6} label="Certifications" />
          <StatCounter target={5} label="Projects" />
          <StatCounter target={2} label="Awards" />
        </div>
        <div className="achievementGrid">
          {achievements.map((achievement, i) => (
            <article key={achievement.title} className="achievementCard fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <img src={achievement.image} alt={achievement.title} />
              <div>
                <span className="kicker">{achievement.meta}</span>
                <h3>{achievement.title}</h3>
                <p>{achievement.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="publications" className="section publicationsSection">
        <div className="sectionHead fade-up">
          <span className="kicker">Research & Publications</span>
          <h2>Contributing to the global body of knowledge.</h2>
        </div>
        <div className="publicationGrid fade-up">
          {publications.map((pub) => (
            <article key={pub.title} className="publicationCard">
              <div>
                <span className="kicker">{pub.venue}</span>
                <h3>{pub.title}</h3>
                <strong style={{ display: "block", marginBottom: "12px", color: "var(--text)" }}>{pub.meta}</strong>
                <p>{pub.summary}</p>
                <a href={pub.doi} target="_blank" rel="noreferrer" style={{ color: "var(--gold)", display: "block", marginBottom: "16px", fontSize: "0.85rem" }}>DOI: {pub.doi.replace("https://doi.org/", "")}</a>
                <div className="pills">{pub.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="simulator" className="section simulatorSection">
        <div className="sectionHead fade-up">
          <span className="kicker">Interactive Simulator</span>
          <h2>Agentic AI Arcade.</h2>
          <p>Canvas API, collision detection, keyboard/pointer controls, localStorage high score, and score-based credential unlocking.</p>
        </div>
        <Arcade />
      </section>

      <section id="contact" className="section contact">
        <div>
          <span className="kicker">Contact</span>
          <h2>Let's build something together.</h2>
          <p>📍 Navi Mumbai, Maharashtra, India</p>
          <p>☎️ +91 98335 12206</p>
          <p>✉️ <a href="mailto:bhumivedant@outlook.com" style={{ color: "inherit", textDecoration: "none" }}>bhumivedant@outlook.com</a></p>
          <div style={{ display: "flex", gap: "20px", marginTop: "24px" }}>
            <a href="https://linkedin.com/in/bhumi-vedant-728a76294" target="_blank" rel="noreferrer" style={{ color: "var(--gold)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/bhumivedant49" target="_blank" rel="noreferrer" style={{ color: "var(--gold)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
        <form onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          window.location.href = `mailto:bhumivedant@outlook.com?subject=${encodeURIComponent(String(data.get("subject") || "Portfolio inquiry"))}&body=${encodeURIComponent(String(data.get("message") || ""))}`;
        }}>
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email Address" type="email" required />
          <input name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Message" required />
          <button>Send Message</button>
        </form>
      </section>
    </main>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project fade-up">
      <img src={project.image} alt={project.title} />
      <div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span className="kicker" style={{ margin: 0 }}>{project.categories.join(" / ")}</span>
          {project.status && <span className="statusBadge">{project.status}</span>}
        </div>
        <h3 style={{ margin: '4px 0 10px' }}>{project.title}</h3>
        <strong>{project.metric}</strong>
        <p>{project.summary}</p>
        <div className="pills">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="projectLinks">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
      </div>
    </article>
  );
}

function Arcade() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [high, setHigh] = useState(() => Number(localStorage.getItem("portfolio_game_highscore") || 0));
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!running || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let raf = 0;
    let localScore = 0;
    let localLives = 3;
    const player = { x: 275, y: 335, w: 50, h: 50 };
    const objects: Array<{ x: number; y: number; size: number; label: string; bad: boolean; speed: number; points: number }> = [];
    const labels = [
      { label: "💵", bad: false, points: 10 },
      { label: "☁️", bad: false, points: 20 },
      { label: "🤖", bad: false, points: 30 },
      { label: "🐛", bad: true, points: 0 },
      { label: "⚠️", bad: true, points: 0 }
    ];

    const move = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      player.x = Math.max(0, Math.min(canvas.width - player.w, (clientX - rect.left) * canvas.width / rect.width - player.w / 2));
    };
    const pointer = (event: PointerEvent) => move(event.clientX);
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") player.x -= 28;
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") player.x += 28;
      player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
    };
    canvas.addEventListener("pointermove", pointer);
    window.addEventListener("keydown", key);

    const finish = () => {
      setRunning(false);
      setResults(pickCredentials(localScore));
      if (localScore > high) {
        localStorage.setItem("portfolio_game_highscore", String(localScore));
        setHigh(localScore);
      }
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(201,168,76,.08)";
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      if (frame % Math.max(18, 52 - Math.floor(localScore / 30)) === 0) {
        const item = labels[Math.floor(Math.random() * labels.length)];
        objects.push({ ...item, x: Math.random() * 560, y: -36, size: 36, speed: 2.5 + Math.random() * 2.5 + localScore / 300 });
      }
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 2;
      ctx.strokeRect(player.x, player.y, player.w, player.h);
      ctx.font = "32px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🛡️", player.x + 25, player.y + 25);
      for (let i = objects.length - 1; i >= 0; i -= 1) {
        const obj = objects[i];
        obj.y += obj.speed;
        ctx.fillText(obj.label, obj.x + 18, obj.y + 18);
        const hit = obj.x < player.x + player.w && obj.x + obj.size > player.x && obj.y < player.y + player.h && obj.y + obj.size > player.y;
        if (hit) {
          objects.splice(i, 1);
          if (obj.bad) {
            localLives -= 1;
            setLives(localLives);
            if (localLives <= 0) return finish();
          } else {
            localScore += obj.points;
            setScore(localScore);
          }
        } else if (obj.y > canvas.height) objects.splice(i, 1);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", pointer);
      window.removeEventListener("keydown", key);
    };
  }, [running, high]);

  const start = () => {
    setScore(0);
    setLives(3);
    setResults([]);
    setRunning(true);
  };

  return (
    <div className="arcade">
      <div className="arcadeHud">
        <span>🏆 Score: {score}</span>
        <span>High: {high}</span>
        <span>{Array.from({ length: 3 }, (_, i) => i < lives ? "♡" : "·").join(" ")}</span>
      </div>
      <div className="canvasWrap">
        <canvas ref={canvasRef} width={600} height={400} />
        {!running && (
          <div className="gameOverlay">
            {results.length ? (
              <>
                <div className="trophy">🏆</div>
                <h3>Simulation Complete!</h3>
                <p>Final Score: {score}</p>
                <div className="credentialBox">
                  <span>🛡️ Recruiter Credentials Unlocked</span>
                  {results.map((item) => <p key={item}>✓ {item}</p>)}
                </div>
                <button onClick={start}>↻ Retry Simulation</button>
                <a href="#contact">Connect with Bhumi →</a>
              </>
            ) : (
              <>
                <div className="trophy">👾</div>
                <h3>Agentic AI Arcade</h3>
                <p>Collect 💵 ☁️ 🤖 and avoid 🐛 ⚠️. Move with mouse, touch, or arrow keys.</p>
                <button onClick={start}>Boot Game Simulator</button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="arcadeHelp"><span>Drag mouse / swipe touch to scanner 🛡️</span><span>Keyboard: ← →</span></div>
    </div>
  );
}

export default App;
