import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ExternalLink, Play, X, ChevronDown, Youtube, BookOpen, Award, Briefcase, Code, TerminalSquare } from "lucide-react";
import profileImg from "./assets/profile.jpg";

/* ═══════════════════════════════════════════════════════════
   UTILITY COMPONENTS
═══════════════════════════════════════════════════════════ */

function useTyped(texts, speed=55) {
  const [display, setDisplay] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  
  useEffect(() => {
    const cur = texts[ti];
    const id = setTimeout(() => {
      if (!del) {
        if (ci < cur.length) { setDisplay(cur.slice(0,ci+1)); setCi(c=>c+1); }
        else setTimeout(()=>setDel(true),2000);
      } else {
        if (ci>0) { setDisplay(cur.slice(0,ci-1)); setCi(c=>c-1); }
        else { setDel(false); setTi(t=>(t+1)%texts.length); }
      }
    }, del ? speed/2 : speed);
    return () => clearTimeout(id);
  }, [ci, del, ti, texts, speed]);
  
  return display;
}

function VideoModal({ videoSrc, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>// DEMO PLAYBACK</span>
          <button onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-video">
          <iframe src={videoSrc} allowFullScreen title="Demo"/>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */

const FEATURED_PROJECTS = [
  {
    title: "Baron — Autonomous Block Retrieval Robot",
    desc: "Built a fully autonomous ground robot from scratch to navigate a 10×10 ft arena, detect colored blocks in sequence, and deliver them. Achieved a perfect score in the Grand Challenge. Integrated PID velocity control, HSV-based color detection, IMU-encoder sensor fusion, and visual servoing.",
    tags: ["Raspberry Pi 4", "C++", "PID Control", "Sensor Fusion", "OpenCV", "Hardware"],
    github: "https://github.com/ravivkrahul",
    youtube: "https://youtu.be/eGcQADTv"
  },
  {
    title: "TurtleBot4 Real-Time Perception Pipeline",
    desc: "Developed a ROS 2 vision-control pipeline integrating four real-time perception tasks (arrow path following, logo detection, dynamic obstacle TTC stop, horizon line overlay) on a TurtleBot4 under strict latency constraints using classical CV.",
    tags: ["ROS 2", "TurtleBot4", "OpenCV", "SIFT", "Optical Flow", "C++"],
    github: "https://github.com/ravivkrahul/turtlebot4-perception-pipeline"
  },
  {
    title: "Multi-Robot Path Planning — Anytime RRT* + ORCA",
    desc: "Hierarchical multi-robot planner combining Anytime RRT* global path planning with ORCA local velocity control in Webots. Achieved 100% success rate with zero inter-robot collisions across 10 paired runs using decentralized pairwise velocity correction.",
    tags: ["Webots", "Anytime RRT*", "ORCA", "Multi-Robot", "Path Planning", "Python"],
    github: "https://github.com/ravivkrahul/Planning-obstacle-avoidance-multi-robot"
  },
  {
    title: "UR5 Browser-to-Robot Drawing System",
    desc: "End-to-end human-robot interface enabling a user to draw a 3D trajectory in a browser, replicated in real-time by a simulated 6-DOF UR5 in Gazebo. Utilized custom Python WebSockets and IKPy for fast inverse kinematics mapping.",
    tags: ["ROS 2", "UR5", "Gazebo", "Inverse Kinematics", "WebSocket", "Web UI"]
  }
];

const ALL_PROJECTS = [
  {
    title: "Truck Twin-Trailer Simulation & Digital Twin",
    desc: "Multi-link articulated truck modeled from CAD to ROS 2 Control simulation in Gazebo, deployed to Falcon Editor digital twin. Includes P-controller navigation and LiDAR integration.",
    tags: ["ROS 2", "Gazebo", "URDF/Xacro", "Digital Twin"],
    github: "https://github.com/ravivkrahul/Truck-trailer-ros2"
  },
  {
    title: "Optimal Control — Nonholonomic Robot",
    desc: "Reproduced IEEE Access methodology: GA-based kinematic optimization with cubic spline interpolation and adaptive PID dynamic controller. Verified via Lyapunov stability analysis.",
    tags: ["MATLAB", "Optimal Control", "Genetic Algorithm", "Adaptive PID"]
  },
  {
    title: "A* Path Planning with Pure Pursuit (Sim2Real)",
    desc: "A* planner with pure pursuit path follower built from scratch. Transferred successfully from Gazebo TurtleBot3 to physical TurtleBot4 with retuned adaptive lookahead parameters.",
    tags: ["Path Planning", "A*", "Pure Pursuit", "Sim-to-Real", "ROS 2"],
    github: "https://github.com/ravivkrahul/astar-pure-pursuit-sim2real-tb3-tb4"
  },
  {
    title: "A* Path Planning — Differential Drive Wheelchair",
    desc: "A* path planning and closed-loop navigation for a custom wheelchair URDF in ROS 2 Humble. Deployed in both Gazebo Classic and FalconSim environments.",
    tags: ["ROS 2 Humble", "Gazebo", "A*", "URDF"],
    github: "https://github.com/ninad-iam/ENPM661_Project3"
  },
  {
    title: "Franka Panda Pick-and-Place",
    desc: "End-to-end pick-and-place pipeline for a 7-DOF Franka Panda arm. Integrated MoveIt 2 motion planning and custom C++ execution nodes validated in RViz2.",
    tags: ["ROS 2 Humble", "MoveIt 2", "Franka Panda", "C++"],
    github: "https://github.com/rahulravivk/MoveIt_franka_panda"
  },
  {
    title: "ResNet18 Arrow Detection",
    desc: "Vision-based arrow direction system progressing from HSV segmentation to ResNet18 transfer learning. Achieved 100% test accuracy and deployed inference on Raspberry Pi 4.",
    tags: ["PyTorch", "Deep Learning", "Computer Vision", "Raspberry Pi"]
  },
  {
    title: "LQG Control — Underactuated Double Pendulum Cart",
    desc: "Derived Euler-Lagrange equations, designed LQR controller, and implemented Luenberger Observer to construct a full LQG control system rejecting 50N disturbances.",
    tags: ["MATLAB", "LQG/LQR", "State-Space", "Underactuated Systems"]
  },
  {
    title: "Self-Regulatory Plant Cultivation System Based on IoT",
    desc: "Autonomous irrigation/fertilization system using Arduino Mega, ESP8266, DHT11, and soil moisture sensors with ThingSpeak cloud logging.",
    tags: ["IoT", "Arduino", "ESP8266", "Embedded"]
  }
];

const TIMELINE = [
  { year: "May 2026 – Present", role: "Robotics Research Intern", org: "Children's National Hospital · Washington, DC", desc: "Conducting robotics research in a clinical context." },
  { year: "Sep 2025 – May 2027", role: "M.Eng. in Robotics", org: "University of Maryland, College Park", desc: "Focusing on autonomous navigation, perception pipelines, and optimal control." },
  { year: "May 2023 – Jul 2025", role: "Assistant Manager (Instrumentation & Controls)", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Led predictive maintenance programs across DCS and PLC platforms, reducing equipment downtime by 50%. Deployed pump torque-converter speed control logic." },
  { year: "Oct 2019 – Apr 2023", role: "Senior Engineer (Instrumentation & Controls)", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Eliminated 90% of false trips on Air Dryer Unit using bistable-relay emulation. Reduced process downtime by 30% via systematic PID retuning." },
  { year: "Oct 2018 – Oct 2019", role: "Graduate Engineering Trainee", org: "KRIBHCO Fertilizers Ltd", desc: "Installed, calibrated, and validated 20+ types of field instrumentation across live continuous process units." },
  { year: "Aug 2014 – May 2018", role: "B.Eng. in Instrumentation & Control", org: "L.D. College of Engineering · Ahmedabad, India", desc: "Secured GATE All India Rank of 96. Foundation in systems control and automation." }
];

const CERTIFICATIONS = [
  "Control Valve Sizing (PDH) - ISA",
  "Schneider Electric M580 PLC & EcoStruxure Control Expert",
  "Experion PKS: Fundamentals-C300 Troubleshooting - Honeywell",
  "Aveva Edge HMI - SCADA",
  "Simscape, Simulink, and MATLAB Onramp - MathWorks",
  "Learning Docker & Git/GitHub - LinkedIn",
  "Basics of Process Instrumentation, SCADA, and PLC - Siemens"
];

const COURSEWORK = {
  Fall2025: ["Control of Robotic Systems", "Intro to Robot Modeling", "Introductory Robot Programming"],
  Spring2026: ["Autonomous Robots", "Perception for Autonomous Robots", "Planning for Autonomous Robots"],
  Fall2026: ["Stochastic Control", "ML for Physical Sensing & Perception", "Industrial AI"]
};

const PAPERS = [
  {
    area: "Controls & Optimal Control",
    color: "#2563eb",
    entries: [
      {
        title: "Optimal Controller Design for a Mobile Robot Using Genetic Algorithm and Adaptive PID Controller",
        authors: "Jin-Hyun Park (2025)",
        venue: "IEEE Access, Vol. 13",
        doi: "10.1109/ACCESS.2025.3570472",
        implemented: true,
        summary: `This paper tackles a problem I directly worked on — getting a nonholonomic mobile robot to reach a target pose as fast as possible. The core difficulty: optimal kinematic gains can't be derived analytically because the closed-loop equations are nonlinear.
The solution is a two-layer controller. The kinematic gains (Kρ, Kα, Kβ) are found offline using a Genetic Algorithm. For arbitrary poses, 2D cubic spline interpolation generates smooth gain estimates — running 2.76× faster than prior neural network approaches.
The dynamic layer is a gradient-descent Adaptive PID that tunes its own gains in real time. Lyapunov analysis proves closed-loop stability.`,
        relevance: "I implemented this exact architecture in MATLAB for my UMD project — GA-based trajectory generation combined with an adaptive PID dynamic controller. Reading the formal Lyapunov stability proof shaped how I structured my own simulation.",
        tags: ["Genetic Algorithm", "Adaptive PID", "Lyapunov Stability", "Trajectory Optimization"]
      }
    ]
  }
];

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */

export default function App() {
  const typed = useTyped(["Robotics & Controls Engineer", "Industrial Automation Specialist", "ROS 2 · C++ · Python · MATLAB", "M.Eng. Robotics @ UMD"]);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["about", "projects", "skills", "research", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 150) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "var(--bg-main)", color: "var(--text-main)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        
        :root {
          --bg-main: #ffffff;
          --bg-alt: #f8fafc;
          --bg-card: #ffffff;
          --text-main: #0f172a;
          --text-muted: #475569;
          --text-light: #94a3b8;
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --border: #e2e8f0;
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-sans); background: var(--bg-main); line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; }

        /* Navigation */
        .nav { position: fixed; top: 0; left: 0; width: 100%; z-index: 100; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease; }
        .nav.scrolled { background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 12px 40px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .nav-logo { font-weight: 700; font-size: 14px; letter-spacing: 1px; color: var(--text-main); }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 32px; }
        .nav-link { font-size: 12px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--accent); }

        /* Layout */
        .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
        .section-alt { background: var(--bg-alt); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .sec-header { margin-bottom: 48px; }
        .sec-title { font-size: 2rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 12px; }
        .sec-title::after { content: ''; flex: 1; height: 1px; background: var(--border); margin-left: 16px; }

        /* Hero & Terminal */
        .hero { min-height: 100vh; display: flex; align-items: center; padding: 0 40px; position: relative; }
        .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 400px; gap: 60px; align-items: center; }
        .hero-badge { display: inline-block; padding: 6px 12px; background: var(--accent-light); color: var(--accent); font-size: 11px; font-weight: 600; border-radius: 4px; margin-bottom: 24px; letter-spacing: 0.5px; }
        .hero-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 16px; color: var(--text-main); letter-spacing: -1px; }
        .hero-title span { color: var(--accent); }
        .hero-typed { font-family: var(--font-mono); font-size: 1rem; color: var(--accent); margin-bottom: 24px; min-height: 24px; }
        .cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); margin-left: 2px; animation: blink 1s infinite; vertical-align: middle; }
        .hero-desc { font-size: 1.1rem; color: var(--text-muted); max-width: 500px; margin-bottom: 32px; }
        .hero-actions { display: flex; gap: 16px; }
        .btn-primary { background: var(--accent); color: white; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { opacity: 0.9; }
        .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--border); padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-outline:hover { border-color: var(--text-main); }
        
        .terminal { background: #0f172a; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15); width: 100%; font-family: var(--font-mono); font-size: 13px; color: #e2e8f0; }
        .term-header { background: #1e293b; padding: 12px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-body { padding: 20px; line-height: 1.8; }
        .term-prompt { color: #38bdf8; margin-right: 8px; }
        .term-cmd { color: #f8fafc; font-weight: 600; }
        .term-out { color: #94a3b8; margin-bottom: 12px; padding-left: 16px; }

        /* About & Timeline */
        .about-grid { display: grid; grid-template-columns: 300px 1fr; gap: 64px; align-items: start; }
        .profile-img { width: 100%; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
        .about-text p { margin-bottom: 16px; color: var(--text-muted); font-size: 1.05rem; }
        .timeline { margin-top: 48px; border-left: 2px solid var(--border); padding-left: 24px; }
        .tl-item { position: relative; margin-bottom: 32px; }
        .tl-item::before { content: ''; position: absolute; left: -31px; top: 4px; width: 16px; height: 16px; background: white; border: 2px solid var(--accent); border-radius: 50%; }
        .tl-year { font-family: var(--font-mono); font-size: 12px; color: var(--accent); font-weight: 600; margin-bottom: 4px; }
        .tl-role { font-weight: 700; font-size: 1.1rem; color: var(--text-main); }
        .tl-org { font-size: 13px; color: var(--text-light); margin-bottom: 8px; }
        .tl-desc { font-size: 14px; color: var(--text-muted); }

        /* Projects */
        .featured-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 48px; }
        .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 24px; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(0,0,0,0.08); }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .card-title { font-weight: 700; font-size: 1.1rem; color: var(--text-main); line-height: 1.4; }
        .card-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; flex: 1; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .tag { background: var(--bg-alt); border: 1px solid var(--border); color: var(--text-muted); font-size: 11px; padding: 4px 10px; border-radius: 4px; font-family: var(--font-mono); }
        .card-links { display: flex; gap: 12px; }
        .card-link { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--text-main); transition: color 0.2s; }
        .card-link:hover { color: var(--accent); }

        .all-projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .compact-card { padding: 20px; border: 1px solid var(--border); border-radius: 6px; background: white; }
        .compact-title { font-weight: 600; font-size: 1rem; margin-bottom: 8px; color: var(--text-main); }
        .compact-desc { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5; }

        /* Skills & Certs */
        .skills-container { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .skill-box { border: 1px solid var(--border); border-radius: 8px; padding: 24px; background: white; }
        .skill-box-title { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 16px; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; }
        .cert-list { list-style: none; }
        .cert-list li { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-main); display: flex; align-items: flex-start; gap: 12px; }
        .cert-list li:last-child { border-bottom: none; padding-bottom: 0; }
        .cert-list li::before { content: '→'; color: var(--accent); font-weight: bold; }

        /* Contact & Footer */
        .contact-wrap { text-align: center; max-width: 600px; margin: 0 auto; }
        .contact-wrap p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 32px; }
        .footer { background: var(--bg-alt); padding: 40px; border-top: 1px solid var(--border); text-align: center; }
        .footer-text { font-size: 13px; color: var(--text-light); }

        /* Modals */
        .modal-backdrop { position: fixed; inset: 0; z-index: 500; background: rgba(15,23,42,0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .modal-box { width: 100%; max-width: 800px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modal-header { background: var(--bg-alt); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--border); }
        .modal-header button { background: none; border: none; cursor: pointer; color: var(--text-muted); }
        .modal-video { aspect-ratio: 16/9; background: #000; }
        .modal-video iframe { width: 100%; height: 100%; border: none; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @media (max-width: 900px) {
          .hero-inner, .about-grid, .skills-container { grid-template-columns: 1fr; }
          .featured-grid, .all-projects-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .hero { padding-top: 100px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">RAHUL<span>VK</span></div>
        <div className="nav-links">
          {["about", "projects", "skills", "research", "contact"].map(s => (
            <a key={s} href={`#${s}`} className={`nav-link ${activeSection === s ? "active" : ""}`}>{s}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">OPEN TO 2026 CO-OP & 2027 FT</div>
            <h1 className="hero-title">Rahul<br />Ravi <span>VK</span></h1>
            <div className="hero-typed">{typed}<span className="cursor" /></div>
            <p className="hero-desc">Bridging classical control theory with modern autonomous systems. 6+ years of industrial automation experience moving into advanced robotics.</p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Resume <ExternalLink size={16} />
              </a>
            </div>
          </div>
          <div className="terminal">
            <div className="term-header">
              <div className="term-dot" style={{ background: "#ff5f56" }} />
              <div className="term-dot" style={{ background: "#ffbd2e" }} />
              <div className="term-dot" style={{ background: "#27c93f" }} />
            </div>
            <div className="term-body">
              <div><span className="term-prompt">~</span><span className="term-cmd">whoami</span></div>
              <div className="term-out">rahul_ravi_vk</div>
              
              <div><span className="term-prompt">~</span><span className="term-cmd">cat expertise.txt</span></div>
              <div className="term-out">ROS 2 · C++ · MATLAB · PID/LQR</div>
              
              <div><span className="term-prompt">~</span><span className="term-cmd">cat availability.txt</span></div>
              <div className="term-out">seeking_roles: ["Fall 2026 Co-Op", "May 2027 Full-Time"]<br/>location_pref: "DMV Area / College Park"</div>
              
              <div><span className="term-prompt">~</span><span className="term-cmd">echo $CURRENT_TASK</span></div>
              <div className="term-out">Robotics Research Intern @ Children's National Hospital</div>
              
              <div><span className="term-prompt">~</span><span className="cursor" style={{ background: "#e2e8f0" }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-alt">
        <div className="section">
          <h2 className="sec-title">About & Experience</h2>
          <div className="about-grid">
            <img src={profileImg} alt="Rahul Ravi VK" className="profile-img" />
            <div>
              <div className="about-text">
                <p>I grew up fascinated by machines that could think and act. After earning my B.Eng. in Instrumentation & Control Engineering (securing an All India Rank of 96 in the GATE exam), I spent nearly seven years at KRIBHCO Fertilizers Ltd.</p>
                <p>As an Instrumentation & Controls Engineer, I designed and tuned closed-loop control on Honeywell DCS and Siemens PLCs. I built advanced control strategies that reduced equipment downtime by up to 50% and owned the full automation lifecycle for safety-critical process units.</p>
                <p>That experience grounded me in the reality of hardware—the gap between a controller that works in simulation and one that holds up in the real world. Now pursuing an M.Eng. in Robotics at the University of Maryland, I am combining that industrial reliability instinct with modern perception pipelines, optimal control, and AI.</p>
              </div>
              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="tl-item">
                    <div className="tl-year">{item.year}</div>
                    <div className="tl-role">{item.role}</div>
                    <div className="tl-org">{item.org}</div>
                    <div className="tl-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <h2 className="sec-title">Featured Work</h2>
        <div className="featured-grid">
          {FEATURED_PROJECTS.map((proj, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <h3 className="card-title">{proj.title}</h3>
                <TerminalSquare size={20} color="var(--accent)" />
              </div>
              <p className="card-desc">{proj.desc}</p>
              <div className="card-tags">
                {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="card-links">
                {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="card-link"><Github size={14} /> GitHub</a>}
                {proj.youtube && <a href={proj.youtube} target="_blank" rel="noopener noreferrer" className="card-link" style={{color:"#ef4444"}}><Youtube size={14} /> YouTube</a>}
              </div>
            </div>
          ))}
        </div>

        <h3 style={{fontSize:"1.2rem", fontWeight:600, marginBottom: "24px", color:"var(--text-main)"}}>More Projects</h3>
        <div className="all-projects-grid">
          {ALL_PROJECTS.map((proj, i) => (
            <div key={i} className="compact-card">
              <h4 className="compact-title">{proj.title}</h4>
              <p className="compact-desc">{proj.desc}</p>
              <div className="card-tags" style={{marginBottom:12}}>
                {proj.tags.slice(0,3).map(t => <span key={t} className="tag" style={{fontSize:"10px", padding:"2px 6px"}}>{t}</span>)}
              </div>
              {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="card-link" style={{fontSize:"12px"}}><Github size={12} /> Code</a>}
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS & CERTS ── */}
      <section id="skills" className="section-alt">
        <div className="section">
          <h2 className="sec-title">Skills & Academics</h2>
          <div className="skills-container">
            <div className="skill-box">
              <div className="skill-box-title"><Award size={16} /> CERTIFICATIONS</div>
              <ul className="cert-list">
                {CERTIFICATIONS.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </div>
            <div className="skill-box">
              <div className="skill-box-title"><BookOpen size={16} /> M.ENG COURSEWORK (UMD)</div>
              <ul className="cert-list">
                <li><b>Fall 2026:</b> {COURSEWORK.Fall2026.join(", ")}</li>
                <li><b>Spring 2026:</b> {COURSEWORK.Spring2026.join(", ")}</li>
                <li><b>Fall 2025:</b> {COURSEWORK.Fall2025.join(", ")}</li>
              </ul>
            </div>
            <div className="skill-box" style={{ gridColumn: "1 / -1" }}>
              <div className="skill-box-title"><Code size={16} /> TECHNICAL EXPERTISE</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "var(--text-main)" }}>Robotics & Simulation</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>ROS 2, MoveIt 2, Gazebo, URDF/Xacro, Digital Twins (Falcon Editor), Point Cloud Processing.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "var(--text-main)" }}>Controls & Planning</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>PID/Adaptive PID, LQR/LQG, Kalman Filtering, A*, RRT*, Pure Pursuit, ORCA, Kinematics.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", color: "var(--text-main)" }}>Industrial Automation</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Honeywell DCS (C300, Experion PKS), Siemens/Schneider PLCs, SCADA, Ladder Logic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="research" className="section">
        <h2 className="sec-title">Research Implementation</h2>
        <div className="skill-box">
          {PAPERS[0].entries.map((paper, i) => (
            <div key={i}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-main)" }}>{paper.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "16px", fontFamily: "var(--font-mono)" }}>{paper.authors} — {paper.venue}</p>
              <div style={{ background: "var(--bg-alt)", padding: "16px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px", color: "var(--text-muted)" }}>
                {paper.summary}
              </div>
              <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px", fontSize: "14px", color: "var(--text-main)" }}>
                <strong>Relevance:</strong> {paper.relevance}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-alt">
        <div className="section contact-wrap">
          <h2 className="sec-title" style={{ justifyContent: "center" }}>Let's Connect</h2>
          <p>I am actively seeking Fall 2026 Co-Op/Internship opportunities and full-time roles starting May 2027. Open to discussing robotics engineering, perception pipelines, and control systems.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a href="mailto:ravivk.rahul@gmail.com" className="btn-primary"><Mail size={18} /> ravivk.rahul@gmail.com</a>
            <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer" className="btn-outline"><Linkedin size={18} /> LinkedIn</a>
            <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer" className="btn-outline"><Github size={18} /> GitHub</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-text">
          © {new Date().getFullYear()} Rahul Ravi VK · M.Eng Robotics @ UMD<br/>
          Built with React & Lucide
        </div>
      </footer>
    </div>
  );
}