import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Github, ExternalLink, Play, X, ChevronDown } from "lucide-react";
import profileImg from "./assets/profile.jpg";

/* ═══════════════════════════════════════════════════════════
   VISUAL COMPONENTS
═══════════════════════════════════════════════════════════ */

// Animated neural network canvas
function NeuralNet() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const layers = [3, 5, 6, 5, 3];
    const nodes = [];
    layers.forEach((count, li) => {
      for (let ni = 0; ni < count; ni++) {
        nodes.push({ x: (li + 1) / (layers.length + 1), y: (ni + 1) / (count + 1), layer: li, pulse: Math.random() * Math.PI * 2 });
      }
    });
    const draw = () => {
      t += 0.008;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        const nextLayer = nodes.filter(m => m.layer === n.layer + 1);
        nextLayer.forEach(m => {
          const act = (Math.sin(t * 1.2 + n.pulse + m.pulse) + 1) / 2;
          ctx.beginPath();
          ctx.moveTo(n.x * W, n.y * H);
          ctx.lineTo(m.x * W, m.y * H);
          ctx.strokeStyle = `rgba(0,255,180,${act * 0.13 + 0.02})`;
          ctx.lineWidth = act * 1.2 + 0.3;
          ctx.stroke();
          const prog = ((t * 0.6 + n.pulse * 0.3) % 1);
          const px = n.x * W + (m.x * W - n.x * W) * prog;
          const py = n.y * H + (m.y * H - n.y * H) * prog;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,180,${act * 0.6})`;
          ctx.fill();
        });
      });
      nodes.forEach(n => {
        const act = (Math.sin(t + n.pulse) + 1) / 2;
        const r = 3 + act * 2;
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,180,${0.15 + act * 0.5})`; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,180,${act * 0.2})`; ctx.lineWidth = 1; ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.5 }} />;
}

// Animated 6-DOF robot arm
function RobotArm() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT(p => p + 0.022), 16); return () => clearInterval(id); }, []);
  const a1 = Math.sin(t * 0.7) * 28, a2 = Math.sin(t * 1.1 + 1) * 35, a3 = Math.sin(t * 0.9 + 2) * 22;
  const grip = Math.abs(Math.sin(t * 0.5)) * 8 + 2;
  const C = "#00ffb4";
  return (
    <svg width="150" height="155" viewBox="0 0 160 160" style={{ overflow:"visible", filter:"drop-shadow(0 0 7px #00ffb470)" }}>
      <rect x="50" y="148" width="60" height="6" rx="3" fill={C} opacity="0.3" />
      <rect x="68" y="138" width="24" height="12" rx="2" fill={C} opacity="0.45" />
      <circle cx="80" cy="138" r="7" fill={C} opacity="0.6" />
      <g transform={`rotate(${a1}, 80, 138)`}>
        <rect x="77" y="105" width="6" height="35" rx="3" fill={C} opacity="0.75" />
        <circle cx="80" cy="105" r="5.5" fill={C} opacity="0.8" />
        <g transform={`rotate(${a2}, 80, 105)`}>
          <rect x="77.5" y="75" width="5" height="32" rx="2.5" fill={C} opacity="0.85" />
          <circle cx="80" cy="75" r="5" fill={C} opacity="0.9" />
          <g transform={`rotate(${a3}, 80, 75)`}>
            <rect x="78" y="52" width="4" height="25" rx="2" fill={C} />
            <circle cx="80" cy="52" r="4" fill={C} />
            <line x1="80" y1="50" x2={80-grip} y2="40" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="80" y1="50" x2={80+grip} y2="40" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={80-grip} cy="40" r="2" fill={C} opacity="0.7" />
            <circle cx={80+grip} cy="40" r="2" fill={C} opacity="0.7" />
          </g>
        </g>
      </g>
      <text x="92" y="140" fontSize="7" fill={C} opacity="0.4" fontFamily="monospace">J1</text>
      <text x="92" y="107" fontSize="7" fill={C} opacity="0.4" fontFamily="monospace">J2</text>
      <text x="92" y="77" fontSize="7" fill={C} opacity="0.4" fontFamily="monospace">J3</text>
    </svg>
  );
}

// Radar sweep
function RadarSweep() {
  const [angle, setAngle] = useState(0);
  useEffect(() => { const id = setInterval(() => setAngle(a => (a + 1.5) % 360), 16); return () => clearInterval(id); }, []);
  const rad = (angle * Math.PI) / 180, cx = 70, cy = 70, r = 60;
  const x2 = cx + r * Math.cos(rad), y2 = cy + r * Math.sin(rad);
  const C = "#00ffb4";
  const blips = [[45,38],[90,52],[55,88],[30,65],[88,30]];
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" style={{ filter:"drop-shadow(0 0 4px #00ffb440)" }}>
      {[60,44,28,14].map(rr => <circle key={rr} cx={cx} cy={cy} r={rr} fill="none" stroke={C} strokeWidth="0.6" opacity="0.18" />)}
      <line x1={cx-64} y1={cy} x2={cx+64} y2={cy} stroke={C} strokeWidth="0.5" opacity="0.14" />
      <line x1={cx} y1={cy-64} x2={cx} y2={cy+64} stroke={C} strokeWidth="0.5" opacity="0.14" />
      <path d={`M${cx},${cy} L${x2},${y2} A${r},${r} 0 0,0 ${cx+r*Math.cos(rad-0.5)},${cy+r*Math.sin(rad-0.5)} Z`} fill={C} opacity="0.15" />
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={C} strokeWidth="2" opacity="0.9" />
      <circle cx={cx} cy={cy} r="4" fill={C} />
      {blips.map(([bx,by],i) => {
        const bangle = (Math.atan2(by-cy, bx-cx)*180/Math.PI+360)%360;
        const diff = ((angle-bangle)+360)%360;
        const fade = diff < 60 ? (1-diff/60)*0.9+0.05 : 0.05;
        return <g key={i}><circle cx={bx} cy={by} r="3" fill={C} opacity={fade} /><circle cx={bx} cy={by} r="6" fill="none" stroke={C} strokeWidth="0.8" opacity={fade*0.5} /></g>;
      })}
      <text x={cx+16} y={cy-43} fontSize="6" fill={C} opacity="0.35" fontFamily="monospace">60m</text>
    </svg>
  );
}

// PID response waveform
function ControlWave() {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT(p => p + 0.03), 16); return () => clearInterval(id); }, []);
  const W = 280, H = 80, pts = 100;
  const actual = Array.from({length:pts}, (_,i) => {
    const x = i/(pts-1), decay = Math.exp(-x*3.5), osc = Math.sin((x*18-t)*1.0)*decay*0.28;
    return { x: x*W, y: H*(0.35+osc+(1-x)*0.3*decay) };
  });
  const d = actual.map((p,i) => `${i===0?"M":"L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", maxWidth:W }}>
      <line x1="0" y1={H*0.35} x2={W} y2={H*0.35} stroke="#00ffb4" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      <path d={d} fill="none" stroke="#00ffb4" strokeWidth="1.8" opacity="0.85" />
      <text x="4" y="11" fontSize="8" fill="#00ffb4" opacity="0.4" fontFamily="monospace">setpoint ----</text>
      <text x="4" y="22" fontSize="8" fill="#00ffb4" opacity="0.7" fontFamily="monospace">response ——</text>
      <circle cx={actual[pts-1].x} cy={actual[pts-1].y} r="3.5" fill="#00ffb4" opacity="0.9" />
    </svg>
  );
}

// Animated circuit traces
function CircuitBg() {
  const [p, setP] = useState(0);
  useEffect(() => { const id = setInterval(() => setP(v => (v+0.004)%1), 16); return () => clearInterval(id); }, []);
  const paths = ["M0,20 H60 V50 H120 V30 H180","M0,60 H40 V80 H100 V60 H160 V90 H220","M0,100 H80 V70 H140 V100 H200","M60,0 V40 H100 V20 H150","M180,0 V55 H220","M0,130 H50 V110 H110 V130 H170"];
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.18 }}>
      {paths.map((d,i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#00ffb4" strokeWidth="1" opacity="0.35" />
          <path d={d} fill="none" stroke="#00ffb4" strokeWidth="2" opacity="0.9" strokeDasharray="12 400" strokeDashoffset={-((p+i*0.16)%1)*400} />
        </g>
      ))}
    </svg>
  );
}

// Typing hook
function useTyped(texts, speed=55) {
  const [display, setDisplay] = useState(""); const [ti, setTi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    const id = setTimeout(() => {
      if (!del) { if (ci < cur.length) { setDisplay(cur.slice(0,ci+1)); setCi(c=>c+1); } else setTimeout(()=>setDel(true),1800); }
      else { if (ci>0) { setDisplay(cur.slice(0,ci-1)); setCi(c=>c-1); } else { setDel(false); setTi(t=>(t+1)%texts.length); } }
    }, del ? speed/2 : speed);
    return () => clearTimeout(id);
  }, [ci, del, ti, texts, speed]);
  return display;
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */
function ProjectCard({ title, desc, tags, github, videoSrc, imgSrc, wide }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`proj-card${wide?" wide":""}`}>
      <div className="card-accent-line" />
      {imgSrc && (
        <div className="card-img-wrap">
          <img src={imgSrc} alt={title} className="card-img" />
          <div className="card-img-fade" />
          <div className="card-corner tl"/><div className="card-corner tr"/>
          <div className="card-corner bl"/><div className="card-corner br"/>
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        {tags && <div className="card-tags">{tags.map(t=><span key={t} className="tag">{t}</span>)}</div>}
        <div className="card-actions">
          {github && <a href={github} target="_blank" rel="noopener noreferrer" className="btn-outline"><Github size={12}/> GitHub</a>}
          {videoSrc && <button onClick={()=>setOpen(true)} className="btn-solid"><Play size={12}/> Watch Demo</button>}
        </div>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={()=>setOpen(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header"><span>// DEMO PLAYBACK</span><button onClick={()=>setOpen(false)}><X size={15}/></button></div>
            <div className="modal-video"><iframe src={videoSrc} allowFullScreen style={{width:"100%",height:"100%",border:"none"}}/></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const typed = useTyped(["Robotics & Controls Engineer","Industrial Automation Specialist","ROS2 · C++ · MATLAB · Python","Autonomous Systems Builder","M.Eng @ University of Maryland"]);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const el = document.documentElement;
      setScrollPct(window.scrollY / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const skills = [
    { cat:"Robotics", items:["ROS2 (Actions/Services/Topics)","URDF / Xacro","Gazebo Simulation","MoveIt","Digital Twin (Falcon Editor)","Inverse Kinematics (ikpy)"] },
    { cat:"Controls", items:["PID / Adaptive PID","LQR / LQG","Kalman Filtering","State-Space Modeling","Lyapunov Stability","Trajectory Optimization"] },
    { cat:"Industrial Automation", items:["Honeywell DCS (C300, Experion PKS)","Siemens PLC (Ladder Logic)","SCADA Systems","Safety Interlocks","Control Valve Tuning","Loop Checking"] },
    { cat:"Programming & Tools", items:["C++17","Python (NumPy, SciPy, OpenCV)","MATLAB","SolidWorks / Blender","Linux / Git","Raspberry Pi"] },
  ];

  return (
    <div id="top" style={{background:"var(--bg)",color:"var(--fg)",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@700;800&display=swap');
        :root{--bg:#070b0f;--bg2:#0c1117;--bg3:#101820;--fg:#e8f4f0;--fg2:rgba(232,244,240,0.5);--fg3:rgba(232,244,240,0.2);--acc:#00ffb4;--border:rgba(0,255,180,0.12);--mono:'JetBrains Mono',monospace;--display:'Syne',sans-serif;}
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:var(--mono);background:var(--bg);}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--acc);}
        a{text-decoration:none;color:inherit;}

        .nav{position:fixed;top:0;left:0;width:100%;z-index:100;padding:14px 36px;display:flex;justify-content:space-between;align-items:center;transition:all 0.3s;}
        .nav.scrolled{background:rgba(7,11,15,0.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
        .nav-logo{font-family:var(--display);font-size:13px;color:var(--acc);letter-spacing:2px;display:flex;align-items:center;gap:8px;}
        .nav-dot{width:7px;height:7px;border-radius:50%;background:var(--acc);animation:pulse 2s infinite;}
        .nav-links{display:flex;gap:28px;}
        .nav-link{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--fg3);transition:color 0.2s;position:relative;}
        .nav-link:hover{color:var(--acc);}
        .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--acc);transition:width 0.3s;}
        .nav-link:hover::after{width:100%;}

        .progress-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--acc),#00c8ff);z-index:200;transition:width 0.1s linear;}

        .section{padding:88px 36px;max-width:1100px;margin:0 auto;}
        .sec-header{display:flex;align-items:center;gap:12px;margin-bottom:48px;}
        .sec-num{font-size:10px;color:var(--acc);letter-spacing:3px;}
        .sec-title{font-family:var(--display);font-size:1.75rem;font-weight:800;color:var(--fg);}
        .sec-line{flex:1;height:1px;background:var(--border);}

        /* HERO */
        .hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:0 36px;}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,255,180,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.03) 1px,transparent 1px);background-size:52px 52px;}
        .hero-glow{position:absolute;top:15%;left:25%;width:550px;height:550px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,180,0.04) 0%,transparent 65%);}
        .hero-glow2{position:absolute;top:45%;right:5%;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(0,200,255,0.035) 0%,transparent 65%);}
        .hero-inner{position:relative;z-index:2;display:flex;gap:52px;align-items:center;width:100%;max-width:1100px;margin:0 auto;}
        .hero-left{flex:1;}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid rgba(0,255,180,0.3);font-size:9px;color:var(--acc);letter-spacing:2px;margin-bottom:22px;background:rgba(0,255,180,0.05);}
        .hero-name{font-family:var(--display);font-size:clamp(2rem,4.5vw,3.5rem);font-weight:800;line-height:1.05;color:var(--fg);margin-bottom:12px;}
        .hero-typed{font-size:clamp(0.75rem,1.4vw,0.95rem);color:var(--acc);min-height:1.4em;letter-spacing:1px;}
        .cursor{display:inline-block;width:2px;height:1em;background:var(--acc);margin-left:2px;animation:blink 1s infinite;vertical-align:middle;}
        .hero-sub{margin-top:14px;font-size:11.5px;color:var(--fg2);line-height:2.1;max-width:430px;}
        .hero-btns{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;}
        .hero-right{flex-shrink:0;display:flex;flex-direction:column;gap:14px;align-items:center;}

        /* TERMINAL */
        .terminal{background:#0a0f14;border:1px solid var(--border);overflow:hidden;width:295px;font-size:11px;}
        .term-bar{background:#111820;padding:8px 12px;display:flex;align-items:center;gap:6px;border-bottom:1px solid var(--border);}
        .term-dot{width:8px;height:8px;border-radius:50%;}
        .term-title{font-size:9px;color:var(--fg3);margin-left:8px;letter-spacing:1px;}
        .term-body{padding:12px 14px;line-height:2.1;}
        .term-prompt{color:var(--acc);opacity:0.5;}
        .term-out{color:var(--acc);}
        .term-dim{color:var(--fg3);}

        /* ABOUT */
        .about-grid{display:grid;grid-template-columns:270px 1fr;gap:48px;align-items:start;}
        .profile-wrap{position:relative;}
        .profile-img{width:100%;display:block;filter:grayscale(15%) contrast(1.05);}
        .profile-frame{position:absolute;inset:-8px;border:1px solid var(--border);pointer-events:none;}
        .profile-frame2{position:absolute;inset:-16px;border:1px solid rgba(0,255,180,0.05);pointer-events:none;}
        .pcorner{position:absolute;width:14px;height:14px;}
        .pcorner.tl{top:0;left:0;border-top:2px solid var(--acc);border-left:2px solid var(--acc);}
        .pcorner.tr{top:0;right:0;border-top:2px solid var(--acc);border-right:2px solid var(--acc);}
        .pcorner.bl{bottom:0;left:0;border-bottom:2px solid var(--acc);border-left:2px solid var(--acc);}
        .pcorner.br{bottom:0;right:0;border-bottom:2px solid var(--acc);border-right:2px solid var(--acc);}
        .about-text{font-size:12.5px;color:var(--fg2);line-height:2.1;margin-bottom:18px;}
        .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:28px;}
        .stat{text-align:center;padding:16px 8px;border:1px solid var(--border);background:rgba(0,255,180,0.02);}
        .stat-val{font-family:var(--display);font-size:2rem;font-weight:800;color:var(--acc);}
        .stat-lbl{font-size:9px;color:var(--fg3);letter-spacing:1px;margin-top:3px;}

        /* SKILLS */
        .skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;}
        .skill-group{background:var(--bg2);border:1px solid var(--border);padding:20px;position:relative;overflow:hidden;}
        .skill-cat{font-size:9px;color:var(--acc);letter-spacing:3px;margin-bottom:14px;position:relative;}
        .skill-item{font-size:11px;color:var(--fg2);padding:5px 0;border-bottom:1px solid rgba(0,255,180,0.06);display:flex;align-items:center;gap:8px;position:relative;}
        .skill-item:last-child{border-bottom:none;}
        .skill-item::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--acc);flex-shrink:0;opacity:0.55;}

        /* PROJECTS */
        .projects-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .proj-card{background:var(--bg2);border:1px solid var(--border);overflow:hidden;position:relative;transition:border-color 0.2s,transform 0.2s;}
        .proj-card:hover{border-color:rgba(0,255,180,0.38);transform:translateY(-2px);}
        .proj-card.wide{grid-column:1/-1;}
        .card-accent-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--acc),transparent);}
        .card-img-wrap{position:relative;height:195px;overflow:hidden;}
        .card-img{width:100%;height:100%;object-fit:cover;opacity:0.55;transition:opacity 0.4s,transform 0.5s;}
        .proj-card:hover .card-img{opacity:0.78;transform:scale(1.04);}
        .card-img-fade{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--bg2) 100%);}
        .card-corner{position:absolute;width:13px;height:13px;}
        .card-corner.tl{top:8px;left:8px;border-top:1px solid var(--acc);border-left:1px solid var(--acc);}
        .card-corner.tr{top:8px;right:8px;border-top:1px solid var(--acc);border-right:1px solid var(--acc);}
        .card-corner.bl{bottom:8px;left:8px;border-bottom:1px solid var(--acc);border-left:1px solid var(--acc);}
        .card-corner.br{bottom:8px;right:8px;border-bottom:1px solid var(--acc);border-right:1px solid var(--acc);}
        .card-body{padding:20px;}
        .card-title{font-size:13.5px;font-weight:600;color:var(--fg);margin-bottom:9px;line-height:1.4;}
        .card-desc{font-size:11px;color:var(--fg2);line-height:1.9;margin-bottom:14px;}
        .card-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;}
        .tag{font-size:9px;padding:3px 8px;border:1px solid rgba(0,255,180,0.2);color:var(--acc);opacity:0.8;}
        .card-actions{display:flex;gap:10px;}
        .btn-outline{display:flex;align-items:center;gap:6px;font-size:11px;padding:7px 14px;border:1px solid rgba(232,244,240,0.2);color:var(--fg2);font-family:var(--mono);cursor:pointer;background:none;transition:all 0.2s;}
        .btn-outline:hover{border-color:var(--acc);color:var(--acc);}
        .btn-solid{display:flex;align-items:center;gap:6px;font-size:11px;padding:7px 14px;background:var(--acc);color:#070b0f;font-family:var(--mono);font-weight:700;cursor:pointer;border:none;transition:opacity 0.2s;}
        .btn-solid:hover{opacity:0.85;}

        /* MODAL */
        .modal-backdrop{position:fixed;inset:0;z-index:500;background:rgba(7,11,15,0.93);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;}
        .modal-box{width:100%;max-width:820px;border:1px solid rgba(0,255,180,0.3);overflow:hidden;}
        .modal-header{background:#0c1117;padding:10px 16px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:var(--acc);letter-spacing:2px;border-bottom:1px solid var(--border);}
        .modal-header button{background:none;border:none;color:var(--fg2);cursor:pointer;}
        .modal-video{aspect-ratio:16/9;background:#000;}

        /* CONTROLS */
        .ctrl-panel{background:var(--bg2);border:1px solid var(--border);padding:28px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start;}
        .ctrl-lbl{font-size:9px;color:var(--acc);letter-spacing:3px;margin-bottom:10px;opacity:0.7;}
        .ctrl-desc{font-size:12px;color:var(--fg2);line-height:2.1;}
        .ctrl-metrics{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px;}
        .ctrl-metric{background:var(--bg3);border:1px solid var(--border);padding:10px 14px;}
        .ctrl-metric-val{font-size:17px;font-weight:700;color:var(--acc);font-family:var(--display);}
        .ctrl-metric-lbl{font-size:9px;color:var(--fg3);letter-spacing:1px;margin-top:2px;}

        /* CONTACT */
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;}
        .contact-link{display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--border);transition:all 0.2s;margin-bottom:10px;background:rgba(0,255,180,0.02);}
        .contact-link:hover{border-color:rgba(0,255,180,0.4);background:rgba(0,255,180,0.05);}
        .contact-icon{color:var(--acc);flex-shrink:0;}
        .contact-lbl{font-size:11px;color:var(--fg2);}
        .contact-arrow{margin-left:auto;color:var(--fg3);transition:color 0.2s;}
        .contact-link:hover .contact-arrow{color:var(--acc);}

        .footer{padding:22px 36px;border-top:1px solid var(--border);text-align:center;font-size:9px;color:var(--fg3);letter-spacing:1px;}

        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

        @media(max-width:768px){
          .hero-inner,.about-grid,.projects-grid,.contact-grid,.ctrl-panel{flex-direction:column;grid-template-columns:1fr;}
          .hero-inner{flex-direction:column;padding-top:100px;}
          .nav-links{display:none;}
          .terminal{width:100%;}
        }
      `}</style>

      {/* Progress bar */}
      <div className="progress-bar" style={{width:`${scrollPct*100}%`}} />

      {/* Nav */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo"><div className="nav-dot"/>RAHUL RAVI VK</div>
        <div className="nav-links">
          {["about","skills","projects","contact"].map(s=>(
            <a key={s} href={`#${s}`} className="nav-link">{s}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div style={{position:"absolute",inset:0}}><NeuralNet /></div>
        <div className="hero-grid"/>
        <div className="hero-glow"/><div className="hero-glow2"/>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc)",animation:"pulse 2s infinite",display:"inline-block"}}/>
              AVAILABLE FOR OPPORTUNITIES
            </div>
            <h1 className="hero-name">Rahul<br/>Ravi <span style={{color:"var(--acc)"}}>VK</span></h1>
            <div className="hero-typed">{typed}<span className="cursor"/></div>
            <p className="hero-sub">M.Eng Robotics · University of Maryland · GPA 3.9<br/>6+ years in industrial automation &amp; control systems</p>
            <div className="hero-btns">
              <a href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn-solid"><ExternalLink size={13}/> View Resume</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </div>
          <div className="hero-right">
            <RobotArm/>
            <div className="terminal">
              <div className="term-bar">
                {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} className="term-dot" style={{background:c}}/>)}
                <span className="term-title">rahul@portfolio:~</span>
              </div>
              <div className="term-body">
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>whoami</span></div>
                <div className="term-out">rahul_ravi_vk</div>
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>cat expertise.txt</span></div>
                <div className="term-out">ROS2 · C++ · MATLAB · PID/LQR</div>
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>echo $STATUS</span></div>
                <div className="term-out">seeking_roles=true ✓</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span className="term-prompt">$</span>
                  <span style={{display:"inline-block",width:7,height:13,background:"var(--acc)",animation:"blink 1s infinite",verticalAlign:"middle"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#about" style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",color:"var(--acc)",opacity:0.45,display:"flex",flexDirection:"column",alignItems:"center",gap:4,textDecoration:"none"}}>
          <span style={{fontSize:9,letterSpacing:3,fontFamily:"var(--mono)"}}>SCROLL</span>
          <ChevronDown size={16} style={{animation:"pulse 2s infinite"}}/>
        </a>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">01 //</span><h2 className="sec-title">About Me</h2><div className="sec-line"/></div>
          <div className="about-grid">
            <div className="profile-wrap">
              <img src={profileImg} alt="Rahul" className="profile-img"/>
              <div className="profile-frame"/><div className="profile-frame2"/>
              <div className="pcorner tl"/><div className="pcorner tr"/><div className="pcorner bl"/><div className="pcorner br"/>
            </div>
            <div>
              <p className="about-text">
                I grew up fascinated by machines that could think and act. After completing my B.Eng in <span style={{color:"var(--acc)"}}>Instrumentation &amp; Control Engineering</span> at L.D. College of Engineering, Gujarat, India, I sat the GATE exam — one of India's most competitive engineering entrance tests — and secured an <span style={{color:"var(--acc)"}}>All India Rank of 96</span>. That result represented years of focused work and remains one of my proudest achievements.
              </p>
              <p className="about-text">
                Despite aiming for IIT Bombay, IIT Madras, and IISc Bangalore, I didn't get into a master's program at the time. Instead of waiting, I channeled that drive into industry. I joined <span style={{color:"var(--acc)"}}>KRIBHCO Fertilizers Ltd</span> — one of India's largest fertilizer producers — as a trainee engineer, rising over six years to <span style={{color:"var(--acc)"}}>Assistant Manager of Instrumentation</span>. In that role I worked on safety-critical process units, tuned PID loops on Honeywell DCS and Siemens PLC systems, reduced equipment downtime by 50%, and led plant-wide SCADA automation initiatives.
              </p>
              <p className="about-text">
                The master's dream never left. Watching AI, deep learning, and reinforcement learning reshape what autonomous systems can do, I made the decision to leave a stable career and move to the US. I'm now pursuing an <span style={{color:"var(--acc)"}}>M.Eng in Robotics at the University of Maryland, College Park</span> (GPA 3.9) — building on my industrial foundation to work at the frontier of autonomous navigation, optimal control, and intelligent robotics.
              </p>
              <p className="about-text">
                My goal: become an <span style={{color:"var(--acc)"}}>advanced automation engineer</span> who bridges the reliability of classical industrial controls with the intelligence of modern AI — designing robotic systems that are not just capable, but truly deployable in the real world.
              </p>
              <div className="stats">
                {[{v:"AIR 96",l:"GATE Rank"},{v:"6+",l:"Yrs Industry"},{v:"3.9",l:"M.Eng GPA"}].map(s=>(
                  <div key={s.l} className="stat"><div className="stat-val" style={{fontSize:s.v.length>3?"1.3rem":"2rem"}}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="section">
          <div className="sec-header"><span className="sec-num">02 //</span><h2 className="sec-title">Core Skills</h2><div className="sec-line"/></div>
          <div className="skills-grid">
            {skills.map(g=>(
              <div key={g.cat} className="skill-group">
                <div style={{position:"absolute",inset:0}}><CircuitBg/></div>
                <div className="skill-cat">{g.cat.toUpperCase()}</div>
                {g.items.map(item=><div key={item} className="skill-item">{item}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">03 //</span><h2 className="sec-title">Projects</h2><div className="sec-line"/></div>
          <div className="projects-grid">
            <ProjectCard title="6-DOF Camera Crane – SolidWorks to URDF" desc="Designed and modeled a 6-DOF crane system with prismatic and revolute joints. Exported full assembly to URDF and validated kinematics in ROS2 RViz." tags={["SolidWorks","URDF","ROS2","RViz","6-DOF","Forward Kinematics"]} github="https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF" videoSrc="https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview" imgSrc={`${import.meta.env.BASE_URL}camera_crane_preview.png`}/>
            <ProjectCard title="ROS2 MicroMouse Navigation System" desc="ROS2-based maze navigation using DFS with dynamic replanning. Full ROS2 stack: Actions, Services, Topics, parameter server, and real-time path execution." tags={["ROS2","C++","DFS","Navigation","Path Planning","Action Server"]} github="https://github.com/ravivkrahul/MicroMouse_Cpp" videoSrc="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview" imgSrc={`${import.meta.env.BASE_URL}micromouse_preview.png`}/>
            <ProjectCard title="Autonomous Mobile Robot – Raspberry Pi + OpenCV" desc="Real-world autonomous robot using Raspberry Pi and a camera-based perception pipeline with OpenCV. Focused on hardware-software integration, real-time vision inference, and closed-loop motor control." tags={["Raspberry Pi","OpenCV","Python","Vision","Embedded","Autonomous"]} wide/>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">04 //</span><h2 className="sec-title">Let's Connect</h2><div className="sec-line"/></div>
          <div className="contact-grid">
            <div>
              <p style={{fontSize:12,color:"var(--fg2)",lineHeight:2.1,marginBottom:22}}>Open to robotics engineering roles, research collaborations, and interesting automation challenges. Reach out anytime.</p>
              {[
                {icon:<Mail size={16}/>,label:"ravivk.rahul@gmail.com",href:"mailto:ravivk.rahul@gmail.com"},
                {icon:<Linkedin size={16}/>,label:"linkedin.com/in/rahulravivk",href:"https://www.linkedin.com/in/rahulravivk/"},
                {icon:<Github size={16}/>,label:"github.com/ravivkrahul",href:"https://github.com/ravivkrahul"},
              ].map(({icon,label,href})=>(
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">{icon}</span>
                  <span className="contact-lbl">{label}</span>
                  <ExternalLink size={12} className="contact-arrow"/>
                </a>
              ))}
            </div>
            <div className="terminal" style={{width:"100%"}}>
              <div className="term-bar">
                {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} className="term-dot" style={{background:c}}/>)}
                <span className="term-title">terminal · contact</span>
              </div>
              <div className="term-body">
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>ping rahul --msg "hello"</span></div>
                <div className="term-out">PONG · response_time: fast</div>
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>cat availability.txt</span></div>
                <div className="term-out">open_to_work=true</div>
                <div className="term-dim">roles: [robotics, controls, ml]</div>
                <div className="term-dim">location: Maryland, US</div>
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>echo $RESPONSE_RATE</span></div>
                <div className="term-out">within_24h ✓</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span className="term-prompt">$</span>
                  <span style={{display:"inline-block",width:7,height:13,background:"var(--acc)",animation:"blink 1s infinite",verticalAlign:"middle"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">© 2025 Rahul Ravi VK · Robotics &amp; Controls Engineer · Built with React</footer>
    </div>
  );
}