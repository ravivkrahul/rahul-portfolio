import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, ChevronDown, ExternalLink, Play, X } from "lucide-react";

// ─── GRID BACKGROUND ───────────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{
      backgroundImage: `
        linear-gradient(rgba(0,255,180,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,180,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }} />
  );
}

// ─── NOISE OVERLAY ─────────────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }} />
  );
}

// ─── SCANLINE ──────────────────────────────────────────────────────────────────
function Scanline() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
    }} />
  );
}

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SKILL TAG ─────────────────────────────────────────────────────────────────
function SkillTag({ label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="px-4 py-2 text-sm font-mono border rounded-sm"
      style={{
        borderColor: "rgba(0,255,180,0.25)",
        color: "#00ffb4",
        background: "rgba(0,255,180,0.05)",
      }}
    >
      {label}
    </motion.div>
  );
}

// ─── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, github, videoSrc, imgSrc, span = false }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative group border rounded-sm overflow-hidden ${span ? "md:col-span-2" : ""}`}
      style={{ borderColor: "rgba(0,255,180,0.15)", background: "rgba(255,255,255,0.02)" }}
    >
      {/* accent line */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #00ffb4, transparent)" }} />

      {imgSrc && (
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <img src={imgSrc} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" style={{ transition: "transform 0.6s ease, opacity 0.5s ease" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #080c10 100%)" }} />
          {/* corner decoration */}
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r" style={{ borderColor: "#00ffb4" }} />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l" style={{ borderColor: "#00ffb4" }} />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-mono font-semibold mb-3" style={{ color: "#f0f4f8" }}>{title}</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(240,244,248,0.55)" }}>{desc}</p>

        {tags && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded-sm font-mono" style={{ background: "rgba(0,255,180,0.08)", color: "rgba(0,255,180,0.7)" }}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono px-4 py-2 border rounded-sm transition-all duration-200 hover:bg-white hover:text-black"
              style={{ borderColor: "rgba(240,244,248,0.3)", color: "rgba(240,244,248,0.7)" }}
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {videoSrc && (
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-sm transition-all duration-200"
              style={{ background: "#00ffb4", color: "#080c10", fontWeight: 600 }}
            >
              <Play size={13} /> Watch Demo
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(8,12,16,0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-3xl rounded-sm overflow-hidden border"
              style={{ borderColor: "rgba(0,255,180,0.3)" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-4 py-3 font-mono text-xs" style={{ background: "#0d1117", color: "#00ffb4", borderBottom: "1px solid rgba(0,255,180,0.15)" }}>
                <span>// DEMO PLAYBACK</span>
                <button onClick={() => setVideoOpen(false)}><X size={16} /></button>
              </div>
              <div className="aspect-video">
                <iframe src={videoSrc} className="w-full h-full" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);

  const skills = [
    "Robotics & Autonomous Systems",
    "Control Systems & Estimation",
    "Motion Planning & Navigation",
    "Industrial Automation",
    "Embedded Systems",
    "Python",
    "C++",
    "ROS2",
    "MATLAB",
    "SolidWorks",
    "OpenCV",
    "Raspberry Pi",
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080c10", color: "#f0f4f8", fontFamily: "'IBM Plex Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: #00ffb4; border-radius: 2px; }
        .nav-link { position: relative; color: rgba(240,244,248,0.5); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #00ffb4; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #00ffb4; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .glow { box-shadow: 0 0 24px rgba(0,255,180,0.2); }
      `}</style>

      <GridBackground />
      <NoiseOverlay />
      <Scanline />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: scrollYProgress, background: "#00ffb4", width: "100%" }}
      />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 w-full z-50" style={{ background: "rgba(8,12,16,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,255,180,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00ffb4" }} />
            <span className="font-mono text-sm font-semibold tracking-widest" style={{ color: "#00ffb4", fontFamily: "'Syne', sans-serif" }}>RAHUL RAVI VK</span>
          </div>
          <div className="hidden md:flex gap-8">
            {["About", "Skills", "Projects", "Contact"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background accent circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,255,180,0.04) 0%, transparent 70%)" }} />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.04) 0%, transparent 70%)" }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-8 text-xs font-mono"
            style={{ border: "1px solid rgba(0,255,180,0.3)", color: "#00ffb4", background: "rgba(0,255,180,0.06)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ffb4" }} />
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#f0f4f8" }}>Robotics &</span>
            <br />
            <span style={{ color: "#00ffb4" }}>Controls</span>
            <br />
            <span style={{ color: "#f0f4f8" }}>Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 text-sm font-mono max-w-lg mx-auto"
            style={{ color: "rgba(240,244,248,0.45)", lineHeight: 1.8, letterSpacing: "0.04em" }}
          >
            M.Eng Robotics @ University of Maryland · GPA 3.9<br />
            6+ Years Industrial Automation & Control Systems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4 mt-10"
          >
            <a
              href="/rahul-portfolio/Rahul_Ravi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-sm font-mono font-medium rounded-sm transition-all duration-200 glow"
              style={{ background: "#00ffb4", color: "#080c10" }}
            >
              <ExternalLink size={14} /> View Resume
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 text-sm font-mono font-medium rounded-sm border transition-all duration-200 hover:border-[#00ffb4] hover:text-[#00ffb4]"
              style={{ borderColor: "rgba(240,244,248,0.2)", color: "rgba(240,244,248,0.6)" }}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: "rgba(0,255,180,0.4)" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown size={16} style={{ color: "#00ffb4" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00ffb4" }}>01 //</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f0f4f8" }}>About Me</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(0,255,180,0.15)" }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-sm" style={{ border: "1px solid rgba(0,255,180,0.2)" }} />
                <div className="absolute -inset-6 rounded-sm" style={{ border: "1px solid rgba(0,255,180,0.08)" }} />
                <img
                  src="/rahul-portfolio/profile.jpg"
                  alt="Rahul Ravi"
                  className="w-64 h-64 object-cover rounded-sm relative z-10"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                {/* corner marks */}
                {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                  <div key={i} className={`absolute w-5 h-5 z-20 ${cls}`} style={{ borderColor: "#00ffb4" }} />
                ))}
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm leading-loose mb-8" style={{ color: "rgba(240,244,248,0.6)", fontFamily: "'IBM Plex Mono', monospace" }}>
                Robotics engineer with 6+ years in industrial control systems, currently pursuing an M.Eng in Robotics at the University of Maryland. My work sits at the intersection of autonomy, estimation, and intelligent robotic systems.
              </p>
              <p className="text-sm leading-loose mb-10" style={{ color: "rgba(240,244,248,0.6)" }}>
                I build systems that sense, reason, and act — from URDF-based simulation pipelines to real-time navigation frameworks. I care deeply about bridging the gap between theory and hardware.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { val: 6, suffix: "+", label: "Years Experience" },
                  { val: 3, suffix: ".9", label: "GPA" },
                  { val: 3, suffix: "", label: "Projects" },
                ].map(({ val, suffix, label }) => (
                  <div key={label} className="text-center py-4 border rounded-sm" style={{ borderColor: "rgba(0,255,180,0.15)", background: "rgba(0,255,180,0.03)" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#00ffb4" }}>
                      <Counter to={val} suffix={suffix} />
                    </div>
                    <div className="text-xs mt-1" style={{ color: "rgba(240,244,248,0.4)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="px-6 py-28" style={{ borderTop: "1px solid rgba(0,255,180,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00ffb4" }}>02 //</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f0f4f8" }}>Core Skills</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(0,255,180,0.15)" }} />
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => <SkillTag key={s} label={s} delay={i * 0.05} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="px-6 py-28" style={{ borderTop: "1px solid rgba(0,255,180,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00ffb4" }}>03 //</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f0f4f8" }}>Projects</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(0,255,180,0.15)" }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              title="6-DOF Camera Crane – SolidWorks to URDF"
              desc="Designed and modeled a 6-DOF crane system with prismatic and revolute joints. Exported full assembly to URDF and validated in ROS2 RViz."
              tags={["SolidWorks", "URDF", "ROS2", "RViz", "6-DOF"]}
              github="https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF"
              videoSrc="https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview"
              imgSrc="/rahul-portfolio/camera_crane_preview.png"
            />
            <ProjectCard
              title="ROS2 MicroMouse Navigation System"
              desc="ROS2-based navigation framework using DFS with dynamic replanning. Implemented Actions, Services, Topics, and parameter configuration for maze traversal."
              tags={["ROS2", "C++", "DFS", "Navigation", "Path Planning"]}
              github="https://github.com/ravivkrahul/MicroMouse_Cpp"
              videoSrc="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview"
              imgSrc="/rahul-portfolio/micromouse_preview.png"
            />
            <ProjectCard
              title="Autonomous Mobile Robot – Raspberry Pi + OpenCV"
              desc="Developing a real-world autonomous robot using Raspberry Pi, camera-based perception, and structured path planning — focused on hardware-software integration and real-time vision."
              tags={["Raspberry Pi", "OpenCV", "Python", "Computer Vision", "Autonomous"]}
              span
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-28" style={{ borderTop: "1px solid rgba(0,255,180,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00ffb4" }}>04 //</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#f0f4f8" }}>Let's Connect</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(0,255,180,0.15)" }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm leading-loose mb-8" style={{ color: "rgba(240,244,248,0.5)", fontFamily: "'IBM Plex Mono', monospace" }}>
                Open to robotics engineering roles, research collaborations, and interesting automation challenges. Reach out anytime.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Mail size={16} />, label: "ravivk.rahul@gmail.com", href: "mailto:ravivk.rahul@gmail.com" },
                  { icon: <Linkedin size={16} />, label: "linkedin.com/in/rahulravivk", href: "https://www.linkedin.com/in/rahulravivk/" },
                  { icon: <Github size={16} />, label: "github.com/ravivkrahul", href: "https://github.com/ravivkrahul" },
                ].map(({ icon, label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 border rounded-sm group transition-all duration-200"
                    style={{ borderColor: "rgba(0,255,180,0.15)", background: "rgba(0,255,180,0.03)" }}
                  >
                    <span style={{ color: "#00ffb4" }}>{icon}</span>
                    <span className="text-sm font-mono group-hover:text-[#00ffb4] transition-colors" style={{ color: "rgba(240,244,248,0.6)" }}>{label}</span>
                    <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#00ffb4" }} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Terminal-style box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-sm overflow-hidden border hidden md:block"
              style={{ borderColor: "rgba(0,255,180,0.2)" }}
            >
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0d1117", borderBottom: "1px solid rgba(0,255,180,0.15)" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-3 text-xs font-mono" style={{ color: "rgba(0,255,180,0.4)" }}>terminal</span>
              </div>
              <div className="p-6 text-sm font-mono" style={{ background: "#0a0f14", lineHeight: 2 }}>
                <div style={{ color: "rgba(0,255,180,0.4)" }}>$ whoami</div>
                <div style={{ color: "#f0f4f8" }}>rahul_ravi_vk</div>
                <div style={{ color: "rgba(0,255,180,0.4)" }}>$ cat status.txt</div>
                <div style={{ color: "#f0f4f8" }}>M.Eng Robotics, UMD</div>
                <div style={{ color: "rgba(0,255,180,0.4)" }}>$ echo $YEARS_EXP</div>
                <div style={{ color: "#f0f4f8" }}>6+</div>
                <div style={{ color: "rgba(0,255,180,0.4)" }}>$ ls skills/</div>
                <div style={{ color: "#00ffb4" }}>ROS2  C++  Python  Controls</div>
                <div className="flex items-center gap-1" style={{ color: "rgba(0,255,180,0.4)" }}>
                  <span>$</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 ml-1"
                    style={{ background: "#00ffb4" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center" style={{ borderTop: "1px solid rgba(0,255,180,0.08)" }}>
        <p className="text-xs font-mono" style={{ color: "rgba(240,244,248,0.2)" }}>
          © 2025 Rahul Ravi VK · Built with React + Framer Motion
        </p>
      </footer>
    </div>
  );
}