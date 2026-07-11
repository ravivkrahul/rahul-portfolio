import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, ExternalLink, X, GraduationCap, Award, Play, Youtube, FileText, MapPin, ArrowUpRight } from "lucide-react";
import profileImg from "./assets/profile.jpg";

/* Discord logo (lucide has no official Discord icon) */
function DiscordIcon({ size = 19 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOOKS & SMALL COMPONENTS
═══════════════════════════════════════════════════════════ */

function useTyped(texts, speed = 55) {
  const [display, setDisplay] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    const id = setTimeout(() => {
      if (!del) {
        if (ci < cur.length) { setDisplay(cur.slice(0, ci + 1)); setCi(c => c + 1); }
        else setTimeout(() => setDel(true), 2200);
      } else {
        if (ci > 0) { setDisplay(cur.slice(0, ci - 1)); setCi(c => c - 1); }
        else { setDel(false); setTi(t => (t + 1) % texts.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [ci, del, ti, texts, speed]);
  return display;
}

function VideoModal({ videoSrc, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>Demo playback</span>
          <button onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <div className="modal-video">
          <iframe src={videoSrc} allowFullScreen title="Project demo" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */

const BASE = import.meta.env.BASE_URL;

const PROJECTS = [
  {
    title: "Autonomous Block Retrieval Robot",
    blurb: "A ground-up autonomous robot that navigated a 10×10 ft arena, detected colored blocks in sequence, and delivered them with zero human input — scoring a perfect 9/9 in the Grand Challenge.",
    stack: ["Raspberry Pi 4", "C++", "PID Control", "Sensor Fusion", "OpenCV"],
    category: "Autonomous Systems",
    featured: true,
    metric: "9/9 blocks · 7:21",
    github: "https://github.com/ravivkrahul/Autonomous_Pick_and_Place_Robot",
    youtube: "https://youtube.com/playlist?list=PLdM7LpLw5C1EBv95E1sSbJ2eZQ9Ftlzfo&si=hW21UI1M3-VP9cq7",
  },
  {
    title: "TurtleBot4 Real-Time Perception Pipeline",
    blurb: "A native ROS 2 vision-control layer running four perception tasks at once on-robot — scanline path following, SIFT/FLANN logo detection, optical-flow collision stops, and Hough horizon tracking — all in classical CV to stay inside the control loop.",
    stack: ["ROS 2", "TurtleBot4", "SIFT Matching", "Optical Flow", "OpenCV"],
    category: "Perception & Vision",
    featured: true,
    metric: "4 tasks · on-robot",
    github: "https://github.com/ravivkrahul/turtlebot4-perception-pipeline",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7466973004321779713/",
  },
  {
    title: "Optimal Control — Nonholonomic Robot",
    blurb: "Reproduced an IEEE Access control paper end to end: a Genetic Algorithm optimizes kinematic gains offline across 72 postures, a gradient-descent adaptive PID handles the dynamics, and Lyapunov analysis proves stability under 5–70 kg mass variation.",
    stack: ["MATLAB", "Genetic Algorithm", "Adaptive PID", "Lyapunov Stability"],
    category: "Classical & Industrial Controls",
    featured: true,
    metric: "IEEE reproduction",
    github: "https://github.com/ravivkrahul/Optimal-Controller-Design-for-a-Mobile-Robot-Using-Genetic-Algorithm-and-Adaptive-PID-Controller",
    pdf: "Optimal_Control_Report.pdf",
  },
  {
    title: "6-DOF Camera Crane — SolidWorks to URDF",
    blurb: "Modeled a full 6-DOF crane assembly of prismatic and revolute joints in SolidWorks, exported a clean URDF, and validated forward kinematics live in ROS 2 RViz.",
    stack: ["SolidWorks", "URDF", "ROS 2", "RViz", "6-DOF"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF",
    videoSrc: "https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview",
  },
  {
    title: "UR5 Browser-to-Robot Drawing System",
    blurb: "A decoupled human-robot interface linking an HTML canvas to a Python WebSocket server, solving inverse kinematics via IKPy to draw strokes live on a simulated 6-DOF UR5 in Gazebo.",
    stack: ["ROS 2", "UR5", "Inverse Kinematics", "WebSockets", "Gazebo"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/UR5-ros2-drawing-robot",
    videoSrc: "https://drive.google.com/file/d/1DiG7gqiEOJPpZ6RzulsZfuZ8Wa0lbqSt/preview",
  },
  {
    title: "Multi-Robot Planning — Anytime RRT* + ORCA",
    blurb: "A decentralized multi-agent planner pairing Anytime RRT* global search with ORCA local velocity avoidance, clearing tight environments across Webots simulations with zero inter-robot collisions.",
    stack: ["Webots", "Anytime RRT*", "ORCA", "Multi-Robot"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Multi-Robot-Planning-and-Obstacle-Avoidance",
  },
  {
    title: "A* Path Planning + Pure Pursuit (Sim2Real)",
    blurb: "A grid-based A* planner feeding a dynamic pure-pursuit controller, deployed from Gazebo TurtleBot3 simulation onto a physical TurtleBot4 through structured runtime parameter tuning.",
    stack: ["A* Search", "Pure Pursuit", "Sim-to-Real", "TurtleBot"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/astar-pure-pursuit-sim2real-tb3-tb4",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7466973004321779713/",
  },
  {
    title: "LQG Control — Underactuated Double Pendulum Cart",
    blurb: "Derived the dynamics via Euler-Lagrange, proved observability from cart position alone, tuned an LQR, and built a Luenberger observer with integral action to reject a 50 N disturbance to zero steady-state error.",
    stack: ["MATLAB", "LQG", "State-Space Observers", "Euler-Lagrange"],
    category: "Classical & Industrial Controls",
    github: "https://github.com/ravivkrahul/Control_of_underactuated_cart",
    pdf: "LQG_Control_Report.pdf",
  },
  {
    title: "Truck Twin-Trailer Simulation & Digital Twin",
    blurb: "A non-holonomic articulated freight model taken from CAD to URDF/Xacro, driven by proportional steering with keyboard teleop, then deployed into a high-fidelity Falcon digital twin.",
    stack: ["ROS 2 Control", "Gazebo", "Xacro", "Digital Twin"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/Truck-trailer-ros2",
  },
  {
    title: "ROS 2 MicroMouse Navigation System",
    blurb: "An automated maze-solving system using depth-first search with dynamic path correction, built entirely on native ROS 2 C++ actions, mapping services, and velocity command nodes.",
    stack: ["ROS 2", "C++17", "DFS Search", "Maze Navigation"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/ROS2-MicroMouse-Robot-Navigation",
    videoSrc: "https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview",
  },
  {
    title: "Franka Panda Pick-and-Place",
    blurb: "A collision-aware manipulation pipeline for a 7-DOF Franka Panda in ROS 2 Humble, using MoveIt 2 for planning and a custom C++ node for named-pose sequencing, validated in RViz2.",
    stack: ["ROS 2 Humble", "MoveIt 2", "7-DOF Arm", "C++"],
    category: "Autonomous Systems",
    github: "https://github.com/ravivkrahul/MoveIt-Franka-Panda-Pick-and-Place-Simulation",
    youtube: "https://www.youtube.com/playlist?list=PLfEoLXDpE4Es",
  },
  {
    title: "A* Path Planning — Wheelchair Robot",
    blurb: "A custom differential-drive wheelchair URDF built from scratch, navigated with 8-connected A* and obstacle inflation across both Gazebo and a FalconSim digital twin.",
    stack: ["ROS 2 Humble", "Custom URDF", "A* Search", "FalconSim"],
    category: "Autonomous Systems",
    github: "https://github.com/ninad-iam/ENPM661_Project3",
  },
  {
    title: "ResNet18 Arrow Direction Regression",
    blurb: "A navigation network that moved from classical thresholding to deep learning — a ResNet18 transfer-learning model regressing continuous steering angles, deployed for live inference on Raspberry Pi hardware.",
    stack: ["PyTorch", "Transfer Learning", "ResNet18", "Raspberry Pi"],
    category: "Perception & Vision",
    github: "https://github.com/ravivkrahul/ResNet18-Arrow-Direction-Regression",
  },
  {
    title: "Self-Regulatory IoT Plant Cultivation System",
    blurb: "An Arduino Mega station that reads soil, temperature, and light, actuates solenoid valves on thresholds, and streams live telemetry to ThingSpeak over ESP8266 — a self-running irrigation controller.",
    stack: ["Arduino", "ESP8266", "IoT", "ThingSpeak"],
    category: "Classical & Industrial Controls",
  },

  /* ── KRIBHCO INDUSTRIAL (2018–2025) ── */
  {
    title: "Air Dryer Unit — Control Panel Redesign & Commissioning",
    blurb: "Redesigned and built an in-house control panel that replaced a worn bistable relay and mechanical timer with PLC ladder logic — preserving proven operator behavior while removing the mechanical failure points. Executed a single-day cutover inside the 8-hour maintenance window with zero production loss.",
    stack: ["Siemens PLC", "TIA Portal", "Ladder Logic", "Panel Design", "Commissioning"],
    category: "Industrial Automation",
    metric: "Single-day cutover",
    details: {
      scope: "Complete redesign and in-house construction of a control panel to eliminate mechanical failure points in the air dryer regeneration system.",
      sections: [
        { h: "Challenge", b: "The original panel relied on two degraded mechanical components. A bistable relay served as the mode selector between Dryer A ↔ Dryer B regeneration and inline bypass — its worn cam mechanism caused poor contact, elevated resistance, and erratic false mode transitions. A mechanical timer controlled the 5-hour heating and 3-hour cooling regeneration cycles; worn gears caused timing drift and unpredictable execution. The deteriorated panel made preventive maintenance risky and prompted a full replacement." },
        { h: "Solution", b: "Designed and built a new panel in-house that preserved the proven relay-based control logic (and operator familiarity), eliminated the bistable relay and timer by implementing their functionality in an integrated PLC, and consolidated all logic into a single maintainable platform." },
        { h: "Execution", b: "Documented the exact relay switching sequence and timer cycle with operators and maintenance staff; redrew complete electrical documentation in Microsoft Visio. Designed the layout and supervised in-house construction, integrating temperature sensors, flow sensors, control valves, and solenoid valves with organized terminal blocks. Verified the new logic operated identically to the original before commissioning, coordinating cutover with Mechanical, Electrical, Production, and Civil teams." },
        { h: "Commissioning & Cutover", b: "Executed a single-day cutover: shut down the compressor, de-energized and disconnected the old panel (fully documented), rewired to the new panel, powered up, tested, and handed over — all within the scheduled 8-hour maintenance window." },
        { h: "Outcome", b: "Transitioned from legacy mechanical control to modern PLC logic with no production loss, eliminated failures from worn relay contacts and timer degradation, and delivered a maintainable system operators could run reliably." },
      ],
      stack: "Siemens PLC · TIA Portal (ladder logic) · Microsoft Visio · Temperature/flow sensors · Control & solenoid valves",
    },
  },
  {
    title: "Pump Torque-Converter Speed Control Modernization",
    blurb: "Consolidated a legacy two-stage cascade controller into the Honeywell C300 DCS, replaced an obsolete speed sensor with a Pepperl+Fuchs unit on a custom-fabricated mount, and performed online PID retuning of both level and speed loops during shutdown at near-normal operating conditions.",
    stack: ["Honeywell DCS", "Cascade PID", "Pepperl+Fuchs", "Online Tuning"],
    category: "Industrial Automation",
    metric: "Dual-loop consolidation",
    details: {
      scope: "Upgrade a 30-year-old pump control system to consolidate dual cascade controllers into a single DCS platform with modern sensor technology.",
      sections: [
        { h: "Challenge", b: "The system used a two-stage cascade design: a level controller in the DCS output a setpoint to a local speed controller in the pump's original panel. No spare parts existed for the obsolete local controller, and the worn speed sensor had no available equivalent — failure of either meant production stoppage with no repair path." },
        { h: "Solution", b: "Consolidated both cascade controllers into the DCS to eliminate dependence on the obsolete local panel, replaced the speed sensor with a modern Pepperl+Fuchs unit, redesigned the sensor mounting with the fabrication team, and retraced and reconfigured all wiring for the new architecture." },
        { h: "Execution", b: "Selected the Pepperl+Fuchs sensor and built a custom mounting bracket integrating it with the existing pump structure. Developed the secondary speed-controller logic inside the Honeywell C300 DCS, configuring level (primary) → speed (secondary) cascade PID modules while preserving all legacy safety interlocks and pre-start conditions. Installed new multicore cable from the DCS to the legacy panel and updated all terminal routing." },
        { h: "Commissioning & PID Tuning", b: "Brought the system online with production during annual shutdown, held process conditions near normal operating parameters, and performed online PID retuning of both level and speed loops under realistic dynamics — validating stability across the operating range." },
        { h: "Outcome", b: "Eliminated single points of failure from obsolete hardware, created a sustainable vendor-standard solution, and tuned the system to run reliably at actual operating conditions with no permanent downtime." },
      ],
      stack: "Honeywell Experion PKS C300 DCS · Pepperl+Fuchs speed sensor · Cascade PID loops · Fabrication support",
    },
  },
  {
    title: "DCS & Safety System Management — 4000+ Loops",
    blurb: "Ran day-to-day operations of a Honeywell Experion PKS C300 DCS and Safety Manager ESD supporting 4000+ control loops: RAID5 storage administration, backup and disaster-recovery validation, safety-interlock verification, one-to-one station redundancy, and plant-trip root-cause analysis for operators.",
    stack: ["Honeywell C300", "Safety Manager ESD", "RAID5", "Trip Analysis"],
    category: "Industrial Automation",
    metric: "99.5%+ availability",
    details: {
      scope: "Manage and maintain Honeywell Experion PKS C300 DCS infrastructure and the Safety Manager ESD system supporting 4000+ control loops across plant operations.",
      sections: [
        { h: "System Architecture", b: "A primary C300 DCS server on RAID5 storage drove 4000+ process loops across fertilizer units, air handling, compressor control, pump speed, temperature/pressure, and level systems. Multiple operator and engineering stations connected over the plant network, with spare station/server configurations maintained for one-to-one replacement, plus a Safety Manager ESD for safety-critical interlocks." },
        { h: "DCS & RAID5 Administration", b: "Continuously monitored server performance and availability, managed user access across stations, ran routine backups to RAID5, validated data integrity and disaster recovery, and monitored disk-array health — performing drive replacements as needed to maintain redundancy." },
        { h: "Safety Manager (ESD)", b: "Verified Emergency Shut Down function and interlock operation, monitored safety diagnostics for faults or degradation, ensured safety-critical loops maintained proper response times, and ran periodic safety-system tests and validation." },
        { h: "Trip Analysis & Troubleshooting", b: "On plant trips, checked interlocks and identified root causes — distinguishing safety-system function, process upset, or instrumentation anomaly — and gave operators clear root-cause analysis to speed recovery. Resolved DCS server, station-connectivity, and loop-performance issues with minimal production impact." },
        { h: "Outcome", b: "Maintained 99.5%+ DCS availability across 4000+ loops, kept the ESD system operational, protected data integrity via RAID5 and backups, and supported continuous plant operation without critical outages." },
      ],
      stack: "Honeywell Experion PKS C300 DCS · Safety Manager ESD · RAID5 storage · Distributed client-server architecture · 4000+ loops",
    },
  },
  {
    title: "Cracker Unit — 72-Channel Temperature System Upgrade",
    blurb: "Replaced an aged 72-channel temperature scanner with modern instrumentation: 72 new K-type thermocouples in Inconel thermowells, a signal-conditioning junction box, full rewiring with shielding, and per-channel simulation plus high/low alarm testing across all 72 measurement points.",
    stack: ["Thermocouples", "Inconel Thermowells", "Signal Conditioning", "Alarm Testing"],
    category: "Industrial Automation",
    metric: "72 channels verified",
    details: {
      scope: "Replace an aged 72-channel temperature scanner and upgrade the temperature measurement system across the cracker unit with modern instrumentation.",
      sections: [
        { h: "Challenge", b: "The original 72-channel scanner had aged and become unreliable. Multiple K-type thermocouple elements needed replacement, temperature measurement was critical to operation and product quality, and the signal-conditioning and junction-box infrastructure required an upgrade — with all 72 channels needing reconfiguration and alarm testing." },
        { h: "Mechanical Coordination", b: "Coordinated with the mechanical team to fabricate small thermowells on the pipeline, sized to the new element dimensions and validated for proper thermal contact and sensor protection." },
        { h: "Scanner & Element Replacement", b: "Procured a modern 72-channel scanner, 72 high-temperature K-type thermocouples, Inconel thermowells for durability, and a junction box with signal conditioning and reference-junction compensation. Installed all hardware and connected each element to its scanner channel." },
        { h: "Rewiring & Configuration", b: "Performed complete rewiring of all 72 channels with proper shielding and grounding, configuring each channel's sensor type, temperature range, alarm setpoints, and data-logging parameters — with clear labeling and documentation." },
        { h: "Simulation & Alarm Testing", b: "Ran temperature simulation on each of the 72 channels, verified scanner response across the operating range, tested every high/low alarm, confirmed setpoints triggered at design temperatures, and validated data logging — documenting results for all channels." },
        { h: "Outcome", b: "Restored reliable, accurate temperature measurement across cracker operations with improved alarm functionality and full visibility into the temperature profile — all 72 channels verified operational." },
      ],
      stack: "72-channel scanner · K-type thermocouples · Inconel thermowells · Signal-conditioning junction box · Shielded wiring · Simulation & alarm testing",
    },
  },
  {
    title: "Compressor Panel — Isolator Replacement & Loop Verification",
    blurb: "Documented and replaced aged AI/AO/DI/DO isolators in a compressor control panel with matched Pepperl+Fuchs equivalents during annual shutdown, then verified signal integrity end-to-end across all 60 control loops from field transmitter through panel to final element.",
    stack: ["Pepperl+Fuchs Isolators", "Loop Verification", "24VDC", "Shutdown Execution"],
    category: "Industrial Automation",
    metric: "60 loops verified",
    details: {
      scope: "Replace aged isolators in a compressor control panel with modern equivalents and verify integrity across all 60 dependent control loops.",
      sections: [
        { h: "Challenge", b: "The panel's isolators had aged and were no longer reliable or readily available as spares. Multiple types (AI, AO, DI, DO) supported 60 control loops critical to compressor operation, and replacement had to happen during annual shutdown to minimize production impact." },
        { h: "Documentation & Procurement", b: "Conducted a full documentation review of every installed isolator, capturing electrical specs and functionality, and built a matched replacement list from the Pepperl+Fuchs catalog — including single-input/double-output configurations — selected for drop-in compatibility." },
        { h: "Replacement", b: "During shutdown, systematically removed all aged isolators and installed new Pepperl+Fuchs units in identical positions to preserve circuit configuration, verifying proper seating and electrical contact." },
        { h: "Wiring & Loop Verification", b: "Wired with printed ferrules and terminal lugs for reliable connections, then verified all 60 loops — confirming signal continuity from field transmitters through the panel to control valves, testing each loop for correct transmission and response, and confirming no signal degradation." },
        { h: "Outcome", b: "Restored reliable signal isolation across all 60 loops, verified complete signal-chain integrity, eliminated isolator-failure risk, and extended panel service life — all within the annual shutdown window with no production impact." },
      ],
      stack: "Pepperl+Fuchs isolators (AI/AO/DI/DO) · 24VDC supply · Printed ferrules & terminal lugs · Loop verification procedures",
    },
  },
];

const TIMELINE = [
  { year: "May 2026 — Present", role: "Robotics Research Intern", org: "Children's National Hospital · Washington, DC", desc: "Applied robotics research within surgical and clinical contexts." },
  { year: "Sep 2025 — May 2027", role: "M.Eng. in Robotics", org: "University of Maryland, College Park", desc: "Autonomous navigation, high-speed perception pipelines, and optimal control theory. GPA 3.9." },
  { year: "May 2023 — Jul 2025", role: "Assistant Manager, Instrumentation & Controls", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Led automation lifecycle and predictive maintenance across Honeywell DCS and Siemens PLC arrays, cutting system-level downtime by 50%." },
  { year: "Oct 2019 — Apr 2023", role: "Senior Engineer, Instrumentation & Controls", org: "KRIBHCO Fertilizers Ltd · Surat, India", desc: "Eliminated 90% of false trips on air-drying systems via bistable-relay software emulation, alongside comprehensive control-loop re-tuning." },
  { year: "Oct 2018 — Oct 2019", role: "Graduate Engineering Trainee", org: "KRIBHCO Fertilizers Ltd", desc: "Calibrated and validated signal integrity across 20+ field transmitter types over 4–20 mA and HART loops." },
  { year: "Aug 2014 — May 2018", role: "B.Eng., Instrumentation & Control", org: "L.D. College of Engineering · Ahmedabad, India", desc: "GATE All India Rank 96. Foundation in control theory and process engineering." },
];

const CERTIFICATIONS = [
  "Control Valve Sizing (PDH) — ISA",
  "Experion PKS C300 Fundamentals & Troubleshooting — Honeywell",
  "M580 PLC Hardware & EcoStruxure Control Expert — Schneider Electric",
  "Process Instrumentation, SCADA & PLC Logic — Siemens",
  "Simscape, Simulink & MATLAB Onramp — MathWorks",
  "Aveva Edge HMI / SCADA Architecture",
  "Docker & Git / GitHub — LinkedIn Learning",
];

const COURSEWORK = [
  { term: "Fall 2026", items: ["Stochastic Control", "ML for Physical Sensing & Perception", "Industrial AI"] },
  { term: "Spring 2026", items: ["Autonomous Robots", "Perception for Autonomous Robots", "Planning for Autonomous Robots"] },
  { term: "Fall 2025", items: ["Control of Robotic Systems", "Robot Modeling", "Robot Programming"] },
];

const CAT = {
  "Autonomous Systems": { label: "Autonomous", tint: "var(--sage)", soft: "var(--sage-soft)" },
  "Perception & Vision": { label: "Computer Vision", tint: "var(--plum)", soft: "var(--plum-soft)" },
  "Classical & Industrial Controls": { label: "Controls", tint: "var(--slate)", soft: "var(--slate-soft)" },
  "Industrial Automation": { label: "Industrial", tint: "var(--accent)", soft: "var(--accent-soft)" },
};

const NAV = [["work", "Work"], ["path", "Experience"], ["credentials", "Credentials"]];

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */

function DetailModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  const d = project.details;
  const meta = CAT[project.category] || {};
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="detail-box" onMouseDown={(e) => e.stopPropagation()} style={{ "--tint": meta.tint, "--soft": meta.soft }}>
        <div className="detail-head">
          <div>
            <span className="detail-cat">{meta.label}</span>
            <h3>{project.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="detail-body">
          {d.scope && <p className="detail-scope"><span>Scope</span>{d.scope}</p>}
          {d.sections.map((s, i) => (
            <div key={i} className="detail-sec">
              <h4>{s.h}</h4>
              <p>{s.b}</p>
            </div>
          ))}
          {d.stack && <div className="detail-stack"><span>Stack</span>{d.stack}</div>}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onPlay, onDetails }) {
  const meta = CAT[p.category] || {};
  return (
    <article className={`card ${p.featured ? "card-feat" : ""}`} style={{ "--tint": meta.tint, "--soft": meta.soft }}>
      <div className="card-top">
        <span className="card-cat">{meta.label}</span>
        {p.metric && <span className="card-metric">{p.metric}</span>}
      </div>
      <h3 className="card-title">{p.title}</h3>
      <p className="card-blurb">{p.blurb}</p>
      <div className="card-stack">
        {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="card-links">
        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="clink"><Github size={14} /> Code</a>}
        {p.videoSrc && <button onClick={() => onPlay(p.videoSrc)} className="clink accent"><Play size={12} fill="currentColor" /> Demo</button>}
        {p.videoUrl && <a href={p.videoUrl} target="_blank" rel="noopener noreferrer" className="clink accent"><Play size={12} fill="currentColor" /> Demo</a>}
        {p.youtube && <a href={p.youtube} target="_blank" rel="noopener noreferrer" className="clink yt"><Youtube size={14} fill="currentColor" /> YouTube</a>}
        {p.pdf && <a href={`${BASE}${p.pdf}`} target="_blank" rel="noopener noreferrer" className="clink"><FileText size={14} /> Report</a>}
        {p.details && <button onClick={() => onDetails(p)} className="clink accent"><FileText size={14} /> View details</button>}
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */

export default function App() {
  const typed = useTyped(["Robotics & Controls Engineer", "Industrial Automation Specialist", "ROS 2 · C++ · Python · MATLAB", "M.Eng. Robotics @ UMD"]);
  const [filter, setFilter] = useState("All");
  const [modalVideo, setModalVideo] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [active, setActive] = useState("work");
  const [copied, setCopied] = useState("");
  const [photoOpen, setPhotoOpen] = useState(false);

  const copyText = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1800);
  };

  useEffect(() => {
    const main = document.querySelector(".right-pane");
    const fn = () => {
      const secs = ["work", "path", "credentials"];
      const y = (main?.scrollTop || window.scrollY) + 120;
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.offsetTop <= y) { setActive(secs[i]); break; }
      }
    };
    main?.addEventListener("scroll", fn);
    window.addEventListener("scroll", fn);
    return () => { main?.removeEventListener("scroll", fn); window.removeEventListener("scroll", fn); };
  }, []);

  const counts = {
    All: PROJECTS.length,
    "Autonomous Systems": PROJECTS.filter(p => p.category === "Autonomous Systems").length,
    "Perception & Vision": PROJECTS.filter(p => p.category === "Perception & Vision").length,
    "Industrial Automation": PROJECTS.filter(p => p.category === "Industrial Automation").length,
    "Classical & Industrial Controls": PROJECTS.filter(p => p.category === "Classical & Industrial Controls").length,
  };
  const shown = PROJECTS.filter(p => filter === "All" || p.category === filter);

  return (
    <div className="app">
      <style>{CSS}</style>

      {/* ── LEFT RAIL ── */}
      <aside className="left-pane">
        <div className="rail-top">
          <button className="avatar-wrap" onClick={() => setPhotoOpen(true)} aria-label="View larger photo">
            <img src={profileImg} alt="Rahul Ravi VK" className="avatar" />
          </button>
          <div className="badge">Open to 2026 Co-op & 2027 Full-time</div>
          <h1 className="name">Rahul <span>Ravi VK</span></h1>
          <div className="typed">{typed}<span className="cursor" /></div>
          <p className="tagline">
            Six years tuning safety-critical industrial control systems. Now widening my
            expertise into robotics, computer vision, ML and Industrial AI through an M.Eng.
            at the University of Maryland, College Park.
          </p>

          <div className="rail-loc"><MapPin size={13} /> College Park, MD · DMV Area</div>

          <div className="socials">
            <button onClick={() => copyText("ravivk.rahul@gmail.com", "Email copied — ravivk.rahul@gmail.com")} className="soc" aria-label="Copy email"><Mail size={19} /></button>
            <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer" className="soc" aria-label="LinkedIn"><Linkedin size={19} /></a>
            <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer" className="soc" aria-label="GitHub"><Github size={19} /></a>
            <button onClick={() => copyText("abhyutthanam", "Discord copied — abhyutthanam")} className="soc" aria-label="Copy Discord username"><DiscordIcon /></button>
          </div>
          {copied && <div className="copied-toast">{copied}</div>}

          <div className="rail-cta">
            <a href={`${BASE}Rahul_Ravi_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn-fill">
              Résumé <ArrowUpRight size={15} />
            </a>
          </div>

          <nav className="rail-nav">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
                <span className="rail-nav-dot" />{label}
              </a>
            ))}
          </nav>
        </div>

        <div className="rail-foot">
          <span>© 2026 Rahul Ravi VK</span>
        </div>
      </aside>

      {/* ── RIGHT CONTENT ── */}
      <main className="right-pane">

        {/* WORK */}
        <section className="block" id="work">
          <header className="block-head">
            <span className="eyebrow">01 · Selected work</span>
            <h2>Projects</h2>
          </header>

          <div className="filters">
            {["All", "Autonomous Systems", "Perception & Vision", "Industrial Automation", "Classical & Industrial Controls"].map(f => (
              <button key={f} className={`fbtn ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : CAT[f].label}
                <span className="fcount">{counts[f]}</span>
              </button>
            ))}
          </div>

          <div className="grid">
            {shown.map((p, i) => <ProjectCard key={i} p={p} onPlay={setModalVideo} onDetails={setDetailProject} />)}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="block alt" id="path">
          <header className="block-head">
            <span className="eyebrow">02 · Experience & education</span>
            <h2>From the control room to the robotics lab.</h2>
          </header>

          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className={`tl ${i === 0 ? "tl-now" : ""}`}>
                <div className="tl-rail"><span className="tl-dot" /></div>
                <div className="tl-body">
                  <span className="tl-year">{t.year}</span>
                  <h4 className="tl-role">{t.role}</h4>
                  <span className="tl-org">{t.org}</span>
                  <p className="tl-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="block" id="credentials">
          <header className="block-head">
            <span className="eyebrow">03 · Credentials</span>
            <h2>Coursework & certifications.</h2>
          </header>

          <div className="cred-grid">
            <div className="cred-col">
              <div className="cred-label"><GraduationCap size={16} /> Graduate coursework · UMD</div>
              <div className="courses">
                {COURSEWORK.map((c) => (
                  <div key={c.term} className="course-row">
                    <span className="course-term">{c.term}</span>
                    <span className="course-items">{c.items.join(" · ")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cred-col">
              <div className="cred-label"><Award size={16} /> Professional certifications</div>
              <ul className="cert-list">
                {CERTIFICATIONS.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="closer">
            <h3>Let's build something.</h3>
            <p>Open to automation, controls, and robotics engineering roles, research collaborations, and hard automation problems.</p>
            <div className="closer-links">
              <button onClick={() => copyText("ravivk.rahul@gmail.com", "Email copied — ravivk.rahul@gmail.com")} className="btn-fill">ravivk.rahul@gmail.com</button>
              <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer" className="btn-line">LinkedIn <ArrowUpRight size={14} /></a>
              <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer" className="btn-line">GitHub <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>

      {modalVideo && <VideoModal videoSrc={modalVideo} onClose={() => setModalVideo(null)} />}
      {detailProject && <DetailModal project={detailProject} onClose={() => setDetailProject(null)} />}

      {photoOpen && (
        <div className="photo-backdrop" onClick={() => setPhotoOpen(false)}>
          <img src={profileImg} alt="Rahul Ravi VK" className="photo-large" onClick={(e) => e.stopPropagation()} />
          <button className="photo-close" onClick={() => setPhotoOpen(false)} aria-label="Close"><X size={22} /></button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,500;8..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --paper:#fcfbf8;
  --paper2:#f4f2ec;
  --card:#ffffff;
  --ink:#211f1b;
  --ink2:#5a564e;
  --ink3:#98938a;
  --line:#e8e4db;
  --line2:#d9d4c8;
  --accent:#b0603f;
  --accent-deep:#8f4a2e;
  --accent-soft:#f6ebe4;
  --sage:#4d6a56;
  --sage-soft:#e9f0ea;
  --slate:#5a6b8c;
  --slate-soft:#eaeef4;
  --plum:#7a5a78;
  --plum-soft:#f0eaf0;
  --serif:'Roboto Serif',Georgia,serif;
  --sans:'Inter',system-ui,sans-serif;
  --mono:'JetBrains Mono',monospace;
}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;}
a{text-decoration:none;color:inherit;}
button{font-family:inherit;cursor:pointer;border:none;background:none;}
::selection{background:var(--accent-soft);}

.app{display:flex;min-height:100vh;}

/* ── LEFT RAIL ── */
.left-pane{width:38%;max-width:520px;position:fixed;top:0;left:0;height:100vh;padding:44px 52px 28px;
  background:var(--paper2);border-right:1px solid var(--line);display:flex;flex-direction:column;
  justify-content:space-between;overflow:hidden;}
.left-pane::before{content:'';position:absolute;top:0;left:0;right:0;height:220px;
  background:linear-gradient(180deg,rgba(176,96,63,0.06),transparent);pointer-events:none;}
.rail-top{position:relative;}
.avatar-wrap{width:132px;height:132px;border-radius:50%;padding:4px;background:var(--card);
  border:1px solid var(--line2);margin-bottom:26px;box-shadow:0 8px 26px rgba(33,31,27,0.08);
  cursor:pointer;transition:transform .2s,box-shadow .2s;display:block;}
.avatar-wrap:hover{transform:scale(1.03);box-shadow:0 12px 32px rgba(33,31,27,0.14);}
.avatar{width:100%;height:100%;border-radius:50%;object-fit:cover;filter:grayscale(6%);display:block;}
.badge{display:inline-block;font-size:11px;font-weight:600;letter-spacing:0.02em;color:var(--accent-deep);
  background:var(--accent-soft);padding:6px 13px;border-radius:100px;margin-bottom:20px;}
.name{font-family:var(--serif);font-size:2.7rem;font-weight:500;line-height:1.05;letter-spacing:-0.02em;margin-bottom:14px;}
.name span{color:var(--accent);font-style:italic;}
.typed{font-family:var(--mono);font-size:0.9rem;color:var(--accent-deep);min-height:24px;margin-bottom:22px;}
.cursor{display:inline-block;width:2px;height:1em;background:var(--accent);margin-left:2px;
  animation:blink 1s infinite;vertical-align:middle;}
.tagline{font-size:1rem;line-height:1.65;color:var(--ink2);margin-bottom:20px;max-width:38ch;}
.rail-loc{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:12px;
  color:var(--ink3);margin-bottom:26px;}
.socials{display:flex;gap:12px;margin-bottom:26px;}
.soc{width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:50%;
  border:1px solid var(--line2);color:var(--ink2);transition:all .2s;}
.soc:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-2px);}
.rail-cta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px;}
.copied-toast{font-family:var(--mono);font-size:11.5px;color:var(--sage);background:var(--sage-soft);
  padding:8px 13px;border-radius:8px;margin-bottom:20px;display:inline-block;animation:fade .2s ease;}

.btn-fill{display:inline-flex;align-items:center;gap:7px;background:var(--accent);color:#fff;
  font-size:13.5px;font-weight:500;padding:11px 20px;border-radius:100px;transition:all .2s;}
.btn-fill:hover{background:var(--accent-deep);transform:translateY(-1px);}
.btn-line{display:inline-flex;align-items:center;gap:6px;color:var(--ink);font-size:13.5px;font-weight:500;
  padding:11px 20px;border-radius:100px;border:1px solid var(--line2);transition:all .2s;}
.btn-line:hover{border-color:var(--accent);color:var(--accent);}

.rail-nav{display:flex;flex-direction:column;gap:2px;border-top:1px solid var(--line);padding-top:24px;}
.rail-nav a{display:flex;align-items:center;gap:11px;font-size:14px;color:var(--ink3);
  padding:8px 0;transition:color .2s;letter-spacing:0.01em;}
.rail-nav a:hover{color:var(--ink);}
.rail-nav a.on{color:var(--accent);font-weight:500;}
.rail-nav-dot{width:6px;height:6px;border-radius:50%;background:currentColor;opacity:0.45;transition:opacity .2s;}
.rail-nav a.on .rail-nav-dot{opacity:1;}
.rail-foot{font-family:var(--mono);font-size:11px;color:var(--ink3);padding-top:24px;}

/* ── RIGHT ── */
.right-pane{width:62%;margin-left:38%;min-height:100vh;}
@media(min-width:1600px){.left-pane{max-width:560px;} .right-pane{margin-left:520px;width:auto;flex:1;}}

.block{max-width:920px;padding:88px 72px;}
.block.alt{background:var(--paper2);border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  max-width:none;}
.block.alt > *{max-width:920px;}
.block-head{margin-bottom:44px;max-width:60ch;}
.eyebrow{display:inline-block;font-family:var(--mono);font-size:12px;letter-spacing:0.12em;text-transform:uppercase;
  color:var(--accent);margin-bottom:18px;}
.block-head h2{font-family:var(--serif);font-size:clamp(1.7rem,3vw,2.5rem);font-weight:500;
  letter-spacing:-0.02em;line-height:1.12;margin-bottom:16px;}
.block-head p{font-size:1.05rem;line-height:1.65;color:var(--ink2);}
.block-head strong{color:var(--ink);font-weight:600;}

/* filters */
.filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;}
.fbtn{display:inline-flex;align-items:center;gap:9px;font-size:13.5px;font-weight:500;color:var(--ink2);
  padding:9px 16px;border-radius:100px;border:1px solid var(--line2);transition:all .2s;}
.fbtn:hover{border-color:var(--ink3);}
.fbtn.on{background:var(--accent);color:#fff;border-color:var(--accent);}
.fcount{font-family:var(--mono);font-size:11px;opacity:0.7;}
.fbtn.on .fcount{opacity:0.9;}

/* grid */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:26px;
  display:flex;flex-direction:column;position:relative;overflow:hidden;
  transition:transform .2s,box-shadow .2s,border-color .2s;}
.card::before{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:var(--tint);
  opacity:0;transition:opacity .2s;}
.card:hover{transform:translateY(-4px);box-shadow:0 16px 32px -14px rgba(33,31,27,0.16);border-color:var(--line2);}
.card:hover::before{opacity:1;}
.card-feat{border-color:var(--line2);box-shadow:0 4px 18px -12px rgba(33,31,27,0.12);}
.card-feat::before{opacity:0.5;}
.card-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px;}
.card-cat{font-family:var(--mono);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;font-weight:600;
  color:var(--tint);background:var(--soft);padding:4px 10px;border-radius:100px;}
.card-metric{font-family:var(--mono);font-size:10.5px;color:var(--ink3);letter-spacing:0.02em;}
.card-title{font-family:var(--serif);font-size:1.28rem;font-weight:500;letter-spacing:-0.01em;
  line-height:1.25;margin-bottom:12px;}
.card-blurb{font-size:14px;line-height:1.65;color:var(--ink2);margin-bottom:20px;flex:1;}
.card-stack{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:22px;}
.tag{font-family:var(--mono);font-size:10.5px;color:var(--ink2);background:var(--paper2);
  border:1px solid var(--line);padding:4px 10px;border-radius:100px;}
.card-links{display:flex;gap:16px;flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--line);margin-top:auto;}
.clink{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink2);transition:color .2s;}
.clink:hover{color:var(--accent);}
.clink.accent{color:var(--accent);}
.clink.yt:hover{color:#c0392b;}

/* timeline */
.timeline{position:relative;}
.tl{display:grid;grid-template-columns:24px 1fr;gap:20px;}
.tl-rail{display:flex;flex-direction:column;align-items:center;}
.tl-rail::after{content:'';flex:1;width:2px;background:var(--line2);}
.tl:last-child .tl-rail::after{display:none;}
.tl-dot{width:13px;height:13px;border-radius:50%;background:var(--paper2);border:2px solid var(--line2);
  margin-top:4px;flex-shrink:0;}
.tl-now .tl-dot{background:var(--accent);border-color:var(--accent);box-shadow:0 0 0 4px var(--accent-soft);}
.tl-body{padding-bottom:34px;}
.tl:last-child .tl-body{padding-bottom:0;}
.tl-year{font-family:var(--mono);font-size:12px;color:var(--accent);letter-spacing:0.02em;}
.tl-role{font-size:1.1rem;font-weight:600;letter-spacing:-0.01em;margin:4px 0 2px;}
.tl-org{font-size:13.5px;color:var(--ink3);}
.tl-desc{font-size:14px;line-height:1.6;color:var(--ink2);margin-top:8px;max-width:62ch;}

/* credentials */
.cred-grid{display:grid;grid-template-columns:1fr 1fr;gap:44px;margin-bottom:72px;}
.cred-label{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:12px;font-weight:500;
  letter-spacing:0.04em;text-transform:uppercase;color:var(--accent);margin-bottom:22px;
  padding-bottom:14px;border-bottom:1px solid var(--line2);}
.courses{display:flex;flex-direction:column;gap:18px;}
.course-row{display:flex;flex-direction:column;gap:5px;}
.course-term{font-family:var(--mono);font-size:11.5px;color:var(--ink3);}
.course-items{font-size:14.5px;color:var(--ink);line-height:1.5;}
.cert-list{list-style:none;display:flex;flex-direction:column;gap:13px;}
.cert-list li{font-size:14px;color:var(--ink2);line-height:1.5;padding-left:20px;position:relative;}
.cert-list li::before{content:'';position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%;
  background:var(--accent);opacity:0.5;}

/* closer */
.closer{border-top:1px solid var(--line);padding-top:56px;text-align:center;}
.closer h3{font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:500;
  letter-spacing:-0.02em;margin-bottom:14px;}
.closer p{font-size:1.05rem;color:var(--ink2);margin-bottom:32px;max-width:50ch;margin-left:auto;margin-right:auto;}
.closer-links{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

/* modal */
.modal-backdrop{position:fixed;inset:0;z-index:500;background:rgba(33,31,27,0.55);backdrop-filter:blur(5px);
  display:flex;align-items:center;justify-content:center;padding:24px;animation:fade .2s ease;}
.modal-box{width:100%;max-width:860px;background:var(--card);border-radius:14px;overflow:hidden;
  box-shadow:0 30px 70px rgba(0,0,0,0.3);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;
  border-bottom:1px solid var(--line);font-family:var(--mono);font-size:12.5px;color:var(--ink2);}
.modal-header button{color:var(--ink3);display:flex;}
.modal-header button:hover{color:var(--ink);}
.modal-video{aspect-ratio:16/9;background:#000;}
.modal-video iframe{width:100%;height:100%;border:none;}

/* detail modal */
.detail-box{width:100%;max-width:720px;max-height:88vh;background:var(--card);border-radius:16px;
  overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 70px rgba(0,0,0,0.3);animation:fade .2s ease;}
.detail-head{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:26px 30px;
  border-bottom:1px solid var(--line);background:var(--soft);}
.detail-cat{display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;
  font-weight:600;color:var(--tint);margin-bottom:10px;}
.detail-head h3{font-family:var(--serif);font-size:1.4rem;font-weight:500;letter-spacing:-0.01em;line-height:1.25;}
.detail-head button{color:var(--ink3);display:flex;flex-shrink:0;margin-top:2px;}
.detail-head button:hover{color:var(--ink);}
.detail-body{padding:26px 30px 32px;overflow-y:auto;}
.detail-scope{font-size:14.5px;line-height:1.6;color:var(--ink);margin-bottom:26px;padding:16px 18px;
  background:var(--paper2);border-radius:10px;border-left:3px solid var(--tint);}
.detail-scope span{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;
  color:var(--tint);margin-bottom:7px;font-weight:600;}
.detail-sec{margin-bottom:22px;}
.detail-sec h4{font-size:14px;font-weight:600;color:var(--ink);margin-bottom:7px;letter-spacing:-0.01em;}
.detail-sec p{font-size:14px;line-height:1.7;color:var(--ink2);}
.detail-stack{margin-top:6px;padding-top:20px;border-top:1px solid var(--line);font-size:13px;line-height:1.6;color:var(--ink2);}
.detail-stack span{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;
  color:var(--tint);margin-bottom:7px;font-weight:600;}

/* photo lightbox */
.photo-backdrop{position:fixed;inset:0;z-index:600;background:rgba(33,31,27,0.7);backdrop-filter:blur(6px);
  display:flex;align-items:center;justify-content:center;padding:32px;animation:fade .2s ease;cursor:zoom-out;}
.photo-large{max-width:min(480px,90vw);max-height:88vh;width:auto;border-radius:16px;
  box-shadow:0 30px 80px rgba(0,0,0,0.4);cursor:default;}
.photo-close{position:absolute;top:24px;right:24px;width:44px;height:44px;border-radius:50%;
  background:rgba(255,255,255,0.12);color:#fff;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.photo-close:hover{background:rgba(255,255,255,0.22);}

@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes fade{from{opacity:0;}to{opacity:1;}}

/* ── RESPONSIVE ── */
@media(max-width:1080px){
  .app{flex-direction:column;}
  .left-pane{width:100%;max-width:none;position:relative;height:auto;
    border-right:none;border-bottom:1px solid var(--line);padding:44px 32px 32px;}
  .right-pane{width:100%;margin-left:0;}
  .rail-nav{display:none;}
  .block{padding:64px 32px;max-width:none;}
  .cred-grid{grid-template-columns:1fr;gap:44px;}
}
@media(max-width:560px){
  .left-pane{padding:36px 22px 24px;}
  .name{font-size:2.2rem;}
  .block{padding:52px 22px;}
  .grid{grid-template-columns:1fr;}
  .tl-desc{max-width:none;}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important;}}
`;