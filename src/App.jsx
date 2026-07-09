import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ExternalLink, X, BookOpen, Award, Filter, Play, Youtube, FileText } from "lucide-react";
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
          <span>// VIDEO DEMONSTRATION PLAYBACK</span>
          <button onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-video">
          <iframe src={videoSrc} allowFullScreen title="Project Demo Video"/>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA STRUCTURES
═══════════════════════════════════════════════════════════ */

const ALL_PROJECTS = [
  {
    title: "Baron — Autonomous Block Retrieval Robot",
    desc: "Built a fully autonomous ground robot from scratch to navigate a 10×10 ft arena, detect colored blocks, and deliver them. Integrated PID velocity control, HSV-based color detection, and IMU-encoder sensor fusion to achieve a perfect 9/9 block score in the Grand Challenge execution.",
    tags: ["Raspberry Pi 4", "C++", "PID Control", "Sensor Fusion", "OpenCV"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Autonomous_Pick_and_Place_Robot",
    youtube: "https://youtube.com/playlist?list=PLdM7LpLw5C1EBv95E1sSbJ2eZQ9Ftlzfo&si=hW21UI1M3-VP9cq7"
  },
  {
    title: "6-DOF Camera Crane – SolidWorks to URDF",
    desc: "Designed and modeled a complete 6-DOF crane assembly combining prismatic and revolute joints within SolidWorks. Successfully parsed structural configurations to a valid URDF mapping and executed real-time forward kinematics testing inside ROS 2 RViz environments.",
    tags: ["SolidWorks", "URDF Parsing", "ROS 2", "RViz Kinematics", "6-DOF Assembly"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF",
    videoSrc: "https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview"
  },
  {
    title: "UR5 Browser-to-Robot Drawing System",
    desc: "Built a highly decoupled real-time human-robot control interface linking a modern HTML frontend canvas to a back-end Python WebSocket server. Intercepts custom strokes and calculates immediate inverse kinematics solutions via IKPy to drive a simulated 6-DOF UR5 manipulator arm in Gazebo.",
    tags: ["ROS 2", "UR5 Arm", "Inverse Kinematics", "WebSockets", "Gazebo Simulation"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/UR5-ros2-drawing-robot",
    videoSrc: "https://drive.google.com/file/d/1DiG7gqiEOJPpZ6RzulsZfuZ8Wa0lbqSt/preview"
  },
  {
    title: "TurtleBot4 Real-Time Perception Pipeline",
    desc: "Developed a native ROS 2 vision-control layer optimizing classical computer vision algorithms under explicit hardware processing limitations. Processes four continuous perception assignments simultaneously: scanline centerline path following, SIFT/FLANN homography logo identification, Farneback optical flow time-to-contact hazard stops, and Hough horizon line processing.",
    tags: ["ROS 2", "TurtleBot4", "OpenCV Perception", "SIFT Matching", "Optical Flow"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/turtlebot4-perception-pipeline",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7466973004321779713/"
  },
  {
    title: "Multi-Robot Path Planning — Anytime RRT* + ORCA",
    desc: "Engineered a decentralized multi-agent trajectory framework combining global planning optimization with local obstacle resolution. Combines Anytime RRT* algorithms with independent ORCA pairwise velocity projections to clear tight environments across complex Webots multi-robot simulations.",
    tags: ["Webots Engine", "Anytime RRT*", "ORCA Collision Avoidance", "Multi-Robot Teams"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Multi-Robot-Planning-and-Obstacle-Avoidance"
  },
  {
    title: "Truck Twin-Trailer Simulation & Digital Twin",
    desc: "Modeled a highly non-holonomic multi-link articulated freight configuration. Translated rigid CAD geometry to clean URDF/Xacro scripts, implemented point-to-point proportional steering algorithms, managed keyboard teleoperation scripts, and executed a full deployment pipeline to a high-fidelity Falcon digital twin environment.",
    tags: ["ROS 2 Control", "Gazebo Sim", "Xacro Modelling", "Digital Twin Twin-Trailers"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Truck-trailer-ros2"
  },
  {
    title: "ROS 2 MicroMouse Navigation System",
    desc: "Programmed an automated maze exploration system utilizing a depth-first search strategy optimized with dynamic path correction modules. Built entirely with native ROS 2 C++ parameters, cross-node actions, standalone mapping services, and clean velocity command translation blocks.",
    tags: ["ROS 2 Nodes", "C++17 Core", "DFS Search", "Maze Navigation Algorithms"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/ROS2-MicroMouse-Robot-Navigation",
    videoSrc: "https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview"
  },
  {
    title: "Optimal Control — Nonholonomic Robot",
    desc: "Reproduced and validated mathematical frameworks from established IEEE Access control literature. Optimized non-linear kinematic equations offline via Genetic Algorithms over a large structural initial posture map and built gradient-descent adaptive PID controllers to track trajectory shifts smoothly under mass variations.",
    tags: ["MATLAB Engine", "Optimal Trajectories", "Genetic Algorithms", "Adaptive Control"],
    category: "Classical & Industrial Controls",
    github: "https://github.com/ravivkrahul/Optimal-Controller-Design-for-a-Mobile-Robot-Using-Genetic-Algorithm-and-Adaptive-PID-Controller",
    pdf: "Optimal_Control_Report.pdf"
  },
  {
    title: "A* Path Planning with Pure Pursuit (Sim2Real)",
    desc: "Coded a grid-based A* global path optimizer using Euclidean distances linked to a dynamic pure pursuit steering layer. Successfully deployed the navigation code from virtual Gazebo TurtleBot3 models onto physical TurtleBot4 platforms through structured runtime parameter tuning.",
    tags: ["Path Planning", "A* Heuristics", "Pure Pursuit Tracking", "Sim-to-Real Deployment"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/astar-pure-pursuit-sim2real-tb3-tb4",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7466973004321779713/"
  },
  {
    title: "A* Path Planning — Differential Drive Wheelchair",
    desc: "Designed custom wheelchair URDF assemblies from scratch, matching unique structural non-holonomic limits. Executed clean map inflation routines, discrete grid state generation, and waypoint navigation tracking inside both classic Gazebo environments and dedicated FalconSim models.",
    tags: ["ROS 2 Humble", "Gazebo Wheels", "Custom URDF Model", "A* Obstacle Inflation"],
    category: "Autonomous Systems",
    github: "https://github.com/ninad-iam/ENPM661_Project3"
  },
  {
    title: "Franka Panda Pick-and-Place",
    desc: "Constructed an industrial automated manipulation pipeline for a 7-DOF arm within ROS 2 Humble. Managed collision-aware paths via MoveIt 2 optimization libraries, constructed standalone C++ pose sequencing components, and validated structural tracking via clear RViz2 environments.",
    tags: ["ROS 2 Humble", "MoveIt 2 Core", "Franka Panda 7-DOF", "C++ Joint Tracking"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/MoveIt-Franka-Panda-Pick-and-Place-Simulation",
    youtube: "https://www.youtube.com/playlist?list=PLfEoLXDpE4Es"
  },
  {
    title: "ResNet18 Arrow Direction Regression",
    desc: "Built a robust navigation tracking network migrating classic image threshold maps to deep learning structures. Trained a modified ResNet18 model using PyTorch transfer learning methods to perform continuous angle calculations, deploying live inference execution onto localized Raspberry Pi hardware.",
    tags: ["PyTorch Core", "Deep Learning Models", "Transfer Learning", "Inference Tracking"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/ResNet18-Arrow-Direction-Regression"
  },
  {
    title: "LQG Control — Underactuated Double Pendulum Cart",
    desc: "Modeled complex dynamic interactions using formal Euler-Lagrange equations. Confirmed complete observability through base position changes alone, structured discrete state-space parameters, tuned LQR penalty matrices, and built custom Luenberger observers to cancel simulated 50N disturbances.",
    tags: ["MATLAB Tools", "LQG Design", "State-Space Observers", "Euler-Lagrange Mechanics"],
    category: "Classical & Industrial Controls",
    github: "https://github.com/ravivkrahul/Control_of_underactuated_cart",
    pdf: "LQG_Control_Report.pdf" 
    },
  {
    title: "Self-Regulatory Plant Cultivation System Based on IoT",
    desc: "Designed and built an integrated physical hardware station centered around an Arduino Mega processing unit. Interprets soil parameters, tracks structural temperature variations via DHT11 components, actuates physical solenoid valves using conditional thresholds, and logs live tracking graphs to ThingSpeak IoT clouds via ESP8266 links.",
    tags: ["IoT Arrays", "Arduino Hardware", "ESP8266 Modules", "Embedded Data Logging"],
    category: "Classical & Industrial Controls"
  }
];

const TIMELINE = [
  { year: "May 2026 – Present", role: "Robotics Research Intern", org: "Children's National Hospital · Washington, DC", desc: "Conducting modern robotics research within surgical and clinical contexts." },
  { year: "Sep 2025 – May 2027", role: "M.Eng. in Robotics", org: "University of Maryland, College Park", desc: "Focusing on autonomous navigation architectures, high-speed perception pipelines, and optimal control theory." },
  { year: "May 2023 – Jul 2025", role: "Assistant Manager (Instrumentation & Controls)", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Led automation lifecycle management and predictive infrastructure maintenance across Honeywell DCS and Siemens PLC arrays, reducing system-level down-time metrics by 50%." },
  { year: "Oct 2019 – Apr 2023", role: "Senior Engineer (Instrumentation & Controls)", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Eliminated 90% of structural false trips within air drying systems via custom bistable-relay software emulation. Handled comprehensive loop re-tuning configurations." },
  { year: "Oct 2018 – Oct 2019", role: "Graduate Engineering Trainee", org: "KRIBHCO Fertilizers Ltd", desc: "Installed, calibrated, and checked signal integrity patterns across twenty distinct types of process field transmitters, handling 4-20 mA and HART communication loops." },
  { year: "Aug 2014 – May 2018", role: "B.Eng. in Instrumentation & Control", org: "L.D. College of Engineering · Ahmedabad, India", desc: "Secured an All India Rank of 96 in the national GATE examination. Acquired foundational control theory domain knowledge." }
];

const CERTIFICATIONS = [
  "Control Valve Sizing (PDH) - International Society of Automation (ISA)",
  "Learning Docker & Git/GitHub Engineering Implementations - LinkedIn",
  "Schneider Electric M580 PLC Hardware & EcoStruxure Control Expert Software",
  "Simscape, Simulink, and MATLAB Onramp Systems - MathWorks Validation",
  "Experion PKS: Fundamentals-C300 Troubleshooting & Maintenance - Honeywell",
  "Aveva Edge HMI SCADA Systems Architecture Validation",
  "Basics of Process Instrumentation, SCADA Platforms, and PLC Logic - Siemens"
];

const COURSEWORK = {
  Fall2026: ["Stochastic Control", "ML for Physical Sensing & Perception", "Industrial AI"],
  Spring2026: ["Autonomous Robots", "Perception for Autonomous Robots", "Planning for Autonomous Robots"],
  Fall2025: ["Control of Robotic Systems", "Intro to Robot Modeling", "Introductory Robot Programming"]
};

/* ═══════════════════════════════════════════════════════════
   MAIN APP (SPLIT PANE HYBRID)
═══════════════════════════════════════════════════════════ */

export default function App() {
  const typed = useTyped(["Robotics & Controls Engineer", "Industrial Automation Specialist", "ROS 2 · C++ · Python · MATLAB", "M.Eng. Robotics @ UMD"]);
  const [filter, setFilter] = useState("All");
  const [modalVideo, setModalVideo] = useState(null);

  const displayedProjects = ALL_PROJECTS.filter(p => filter === "All" || p.category === filter);

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        
        :root {
          --bg-main: #ffffff;
          --bg-panel: #f8fafc;
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
        body { font-family: var(--font-sans); background: var(--bg-main); line-height: 1.6; color: var(--text-main); }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; }

        /* Split Layout Base */
        .app-container { display: flex; min-height: 100vh; }
        .left-pane { width: 35%; position: fixed; top: 0; left: 0; height: 100vh; padding: 60px 40px; background: var(--bg-panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
        .right-pane { width: 65%; margin-left: 35%; padding: 60px 80px; overflow-y: auto; background: var(--bg-main); }

        /* Left Pane Styling */
        .profile-header { margin-bottom: 32px; }
        .hero-badge { display: inline-block; padding: 6px 12px; background: var(--accent-light); color: var(--accent); font-size: 11px; font-weight: 600; border-radius: 4px; margin-bottom: 16px; letter-spacing: 0.5px; }
        .hero-title { font-size: 2.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 12px; color: var(--text-main); letter-spacing: -1px; }
        .hero-title span { color: var(--accent); }
        .hero-typed { font-family: var(--font-mono); font-size: 0.95rem; color: var(--accent); margin-bottom: 24px; min-height: 24px; }
        .cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); margin-left: 2px; animation: blink 1s infinite; vertical-align: middle; }
        .hero-desc { font-size: 1rem; color: var(--text-muted); margin-bottom: 32px; line-height: 1.7; }
        
        .contact-links { display: flex; gap: 16px; margin-bottom: 40px; }
        .contact-icon { color: var(--text-muted); transition: color 0.2s; }
        .contact-icon:hover { color: var(--accent); }

        .terminal { background: #0f172a; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); font-family: var(--font-mono); font-size: 12px; color: #e2e8f0; margin-top: auto; }
        .term-header { background: #1e293b; padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-body { padding: 16px; line-height: 1.8; }
        .term-prompt { color: #38bdf8; margin-right: 8px; }
        .term-cmd { color: #f8fafc; font-weight: 600; }
        .term-out { color: #94a3b8; margin-bottom: 12px; padding-left: 16px; }

        /* Right Pane Styling */
        .section-block { margin-bottom: 80px; }
        .sec-title { font-size: 1.75rem; font-weight: 700; color: var(--text-main); margin-bottom: 32px; display: flex; align-items: center; gap: 12px; }
        .sec-title::after { content: ''; flex: 1; height: 1px; background: var(--border); margin-left: 16px; }

        /* Filtered Matrix */
        .filter-controls { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px; background: var(--bg-panel); padding: 8px; border-radius: 8px; border: 1px solid var(--border); }
        .filter-btn { padding: 8px 16px; font-size: 13px; font-weight: 500; color: var(--text-muted); border-radius: 4px; transition: all 0.2s; }
        .filter-btn:hover { background: white; color: var(--text-main); }
        .filter-btn.active { background: white; color: var(--accent); box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid var(--border); }

        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        .card { background: white; border: 1px solid var(--border); border-radius: 8px; padding: 24px; transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -10px rgba(0,0,0,0.08); border-color: var(--accent); }
        .card-header { margin-bottom: 14px; }
        .card-title { font-weight: 700; font-size: 1.15rem; color: var(--text-main); line-height: 1.4; letter-spacing: -0.3px; }
        .card-desc { font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px; flex: 1; line-height: 1.6; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .tag { background: var(--bg-panel); border: 1px solid var(--border); color: var(--text-muted); font-size: 10px; padding: 4px 8px; border-radius: 4px; font-family: var(--font-mono); }
        .card-links { display: flex; gap: 16px; margin-top: auto; padding-top: 12px; border-top: 1px dashed var(--border); flex-wrap: wrap; }
        .card-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--text-muted); transition: color 0.2s; }
        .card-link:hover { color: var(--accent); }
        .card-link.video-btn { color: var(--accent); }

        /* Timeline */
        .timeline { border-left: 2px solid var(--border); padding-left: 24px; margin-left: 12px; }
        .tl-item { position: relative; margin-bottom: 32px; }
        .tl-item::before { content: ''; position: absolute; left: -31px; top: 4px; width: 14px; height: 14px; background: white; border: 2px solid var(--accent); border-radius: 50%; }
        .tl-year { font-family: var(--font-mono); font-size: 12px; color: var(--accent); font-weight: 600; margin-bottom: 4px; }
        .tl-role { font-weight: 700; font-size: 1.1rem; color: var(--text-main); }
        .tl-org { font-size: 13px; color: var(--text-light); margin-bottom: 8px; }
        .tl-desc { font-size: 14px; color: var(--text-muted); }

        /* Skills/Certs */
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .info-box { border: 1px solid var(--border); border-radius: 8px; padding: 24px; background: white; }
        .info-title { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 16px; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; }
        .info-list { list-style: none; }
        .info-list li { padding: 10px 0; border-bottom: 1px solid var(--bg-panel); font-size: 13px; color: var(--text-muted); display: flex; align-items: flex-start; gap: 12px; }
        .info-list li:last-child { border-bottom: none; padding-bottom: 0; }
        .info-list li::before { content: '→'; color: var(--accent); font-weight: bold; }

        /* Video Modals Architecture */
        .modal-backdrop { position: fixed; inset: 0; z-index: 500; background: rgba(15,23,42,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .modal-box { width: 100%; max-width: 800px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid var(--border); }
        .modal-header { background: var(--bg-panel); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .modal-header button { color: var(--text-light); transition: color 0.2s; }
        .modal-header button:hover { color: var(--text-main); }
        .modal-video { aspect-ratio: 16/9; background: #000; }
        .modal-video iframe { width: 100%; height: 100%; border: none; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @media (max-width: 1024px) {
          .app-container { flex-direction: column; }
          .left-pane { width: 100%; position: relative; height: auto; border-right: none; border-bottom: 1px solid var(--border); padding: 40px 24px; }
          .right-pane { width: 100%; margin-left: 0; padding: 40px 24px; }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── LEFT PANE (STATIC DASHBOARD) ── */}
      <aside className="left-pane">
        <div className="profile-header">
          <div className="hero-badge">OPEN TO 2026 CO-OP & 2027 FT</div>
          <h1 className="hero-title">Rahul<br />Ravi <span>VK</span></h1>
          <div className="hero-typed">{typed}<span className="cursor" /></div>
          <p className="hero-desc">Bridging classical control theory with modern autonomous systems. 6+ years of industrial automation experience translating to resilient robotics.</p>
        </div>

        <div className="contact-links">
          <a href="mailto:ravivk.rahul@gmail.com" className="contact-icon"><Mail size={22} /></a>
          <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer" className="contact-icon"><Linkedin size={22} /></a>
          <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer" className="contact-icon"><Github size={22} /></a>
          <a href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="contact-icon" title="Download Resume"><ExternalLink size={22} /></a>
        </div>

        <div className="terminal">
          <div className="term-header">
            <div className="term-dot" style={{ background: "#ff5f56" }} />
            <div className="term-dot" style={{ background: "#ffbd2e" }} />
            <div className="term-dot" style={{ background: "#27c93f" }} />
          </div>
          <div className="term-body">
            <div><span className="term-prompt">~</span><span className="term-cmd">cat expertise.txt</span></div>
            <div className="term-out">ROS 2 · C++ · MATLAB · PID/LQR</div>
            
            <div><span className="term-prompt">~</span><span className="term-cmd">cat availability.txt</span></div>
            <div className="term-out">seeking: ["Fall 2026 Co-Op", "May 2027 FT"]<br/>location: "DMV Area / College Park"</div>
            
            <div><span className="term-prompt">~</span><span className="term-cmd">echo $CURRENT_TASK</span></div>
            <div className="term-out">Robotics Intern @ Children's National Hospital</div>
            
            <div><span className="term-prompt">~</span><span className="cursor" style={{ background: "#e2e8f0" }} /></div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANE (SCROLLING NARRATIVE) ── */}
      <main className="right-pane">
        
        {/* Filtered Matrix Section */}
        <section className="section-block" id="projects">
          <h2 className="sec-title">Engineering Projects</h2>
          
          <div className="filter-controls">
            <Filter size={15} color="var(--text-light)" style={{margin: "8px 4px"}} />
            {["All", "Autonomous Systems", "Classical & Industrial Controls"].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {displayedProjects.map((proj, i) => (
              <div key={i} className="card">
                <div className="card-header">
                  <h3 className="card-title">{proj.title}</h3>
                </div>
                <p className="card-desc">{proj.desc}</p>
                <div className="card-tags">
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="card-links">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="card-link">
                      <Github size={14} /> Code
                    </a>
                  )}
                  {proj.videoSrc && (
                    <button onClick={() => setModalVideo(proj.videoSrc)} className="card-link video-btn">
                      <Play size={13} fill="currentColor" /> Watch Demo
                    </button>
                  )}
                  {proj.videoUrl && (
                    <a href={proj.videoUrl} target="_blank" rel="noopener noreferrer" className="card-link video-btn">
                      <Play size={13} fill="currentColor" /> Watch Demo
                    </a>
                  )}
                  {proj.youtube && (
                    <a href={proj.youtube} target="_blank" rel="noopener noreferrer" className="card-link" style={{ color: "#ef4444" }}>
                      <Youtube size={14} fill="currentColor" /> YouTube
                    </a>
                  )}
                  {proj.pdf && (
                    <a href={`${import.meta.env.BASE_URL}${proj.pdf}`} target="_blank" rel="noopener noreferrer" className="card-link">
                      <FileText size={14} /> Report
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="section-block" id="experience">
          <h2 className="sec-title">Experience & Education</h2>
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
        </section>

        {/* Academics & Certifications Section */}
        <section className="section-block" id="academics">
          <h2 className="sec-title">Credentials</h2>
          <div className="info-grid">
            <div className="info-box">
              <div className="info-title"><BookOpen size={16} /> RECENT COURSEWORK</div>
              <ul className="info-list">
                <li><b>Fall 2026:</b> {COURSEWORK.Fall2026.join(", ")}</li>
                <li><b>Spring 2026:</b> {COURSEWORK.Spring2026.join(", ")}</li>
                <li><b>Fall 2025:</b> {COURSEWORK.Fall2025.join(", ")}</li>
              </ul>
            </div>
            
            <div className="info-box">
              <div className="info-title"><Award size={16} /> CERTIFICATIONS</div>
              <ul className="info-list">
                {CERTIFICATIONS.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Inline Floating Playback Window */}
      {modalVideo && <VideoModal videoSrc={modalVideo} onClose={() => setModalVideo(null)} />}
    </div>
  );
}