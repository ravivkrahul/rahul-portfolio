import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Github, ExternalLink, Play, X, ChevronDown, Youtube } from "lucide-react";
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
    <div
      style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(7,11,15,0.93)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{width:"100%",maxWidth:820,border:"1px solid rgba(0,255,180,0.3)",overflow:"hidden"}}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={{background:"#0c1117",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:10,color:"var(--acc)",letterSpacing:2,borderBottom:"1px solid rgba(0,255,180,0.12)"}}>
          <span>// DEMO PLAYBACK</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(232,244,240,0.5)",cursor:"pointer",lineHeight:1}}><X size={15}/></button>
        </div>
        <div style={{aspectRatio:"16/9",background:"#000"}}>
          <iframe src={videoSrc} allowFullScreen style={{width:"100%",height:"100%",border:"none"}} title="Demo"/>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tags, github, youtube, videoSrc, imgSrc, wide, featured }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`proj-card${wide?" wide":""}${featured?" featured":""}`}>
        <div className="card-accent-line" />
        {featured && <div className="featured-badge">⭐ FEATURED</div>}
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
            {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{borderColor:"#FF0000",color:"#FF0000"}}><Youtube size={12}/> YouTube</a>}
            {videoSrc && <button onClick={()=>setOpen(true)} className="btn-solid"><Play size={12}/> Watch Demo</button>}
          </div>
        </div>
      </div>
      {open && <VideoModal videoSrc={videoSrc} onClose={()=>setOpen(false)}/>}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESEARCH ACCORDION
═══════════════════════════════════════════════════════════ */

const PAPERS = [
  {
    area: "Controls & Optimal Control",
    color: "#00ffb4",
    entries: [
      {
        title: "Optimal Controller Design for a Mobile Robot Using Genetic Algorithm and Adaptive PID Controller",
        authors: "Jin-Hyun Park (2025)",
        venue: "IEEE Access, Vol. 13",
        doi: "10.1109/ACCESS.2025.3570472",
        pdfPath: "/rahul-portfolio/papers/Optimal_Controller_Design_for_a_Mobile_Robot_Using_Genetic_Algorithm_and_Adaptive_PID_Controller.pdf",
        implemented: true,
        summary: `This paper tackles a problem I directly worked on — getting a nonholonomic mobile robot to reach a target pose as fast as possible. The core difficulty: optimal kinematic gains can't be derived analytically because the closed-loop equations are nonlinear differential equations whose convergence changes entirely based on initial conditions.

The solution is a two-layer controller. The kinematic controller gains (Kρ, Kα, Kβ) are found offline using a Genetic Algorithm across a discretized grid of 72 initial postures. For any arbitrary starting pose not in the grid, 2D cubic spline interpolation generates smooth gain estimates — running 2.76× faster than the prior neural network approach and with no training overhead.

The dynamic layer is a gradient-descent Adaptive PID that tunes its own gains in real time using wheel angular velocity error. Since the system Jacobian can't be computed exactly in practice, the sign of the incremental ratio is used instead — a pragmatic engineering approximation. Lyapunov analysis proves the closed-loop stability of the full system.

Key result: when the robot mass varies from 5 kg to 70 kg — something a fixed-gain PID completely breaks on — the adaptive controller adjusts within 300 ms and still hits the target cleanly. Under external disturbances, arrival time deviates by at most 0.15 s. The prior method (Park et al.) failed to reach the target entirely in 2 of 6 disturbance test cases.`,
        relevance: "I implemented this exact architecture in MATLAB for my UMD project — GA-based trajectory generation with cubic interpolation, combined with a gradient descent adaptive PID dynamic controller. Reading the formal Lyapunov stability proof and the systematic gain interpolation method directly shaped how I structured and validated my own simulation.",
        tags: ["Genetic Algorithm","Adaptive PID","Nonholonomic Robot","Lyapunov Stability","Trajectory Optimization","Cubic Interpolation","MATLAB","IEEE Access 2025"],
      },
    ],
  },
];

function ResearchAccordion() {
  const [openArea, setOpenArea] = useState(null);
  const [openPaper, setOpenPaper] = useState(null);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {PAPERS.map((area) => {
        const areaOpen = openArea === area.area;
        return (
          <div key={area.area} style={{border:`1px solid ${areaOpen ? area.color+"50" : "var(--border)"}`,borderRadius:2,overflow:"hidden",transition:"border-color 0.25s"}}>
            <button
              onClick={() => { setOpenArea(areaOpen ? null : area.area); setOpenPaper(null); }}
              style={{width:"100%",background:areaOpen?"rgba(0,0,0,0.3)":"var(--bg2)",border:"none",padding:"16px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:"background 0.2s"}}
            >
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:area.color,boxShadow:`0 0 8px ${area.color}`}}/>
                <span style={{fontFamily:"var(--display)",fontSize:14,fontWeight:700,color:"var(--fg)",letterSpacing:0.5}}>{area.area}</span>
                <span style={{fontSize:9,color:area.color,letterSpacing:2,opacity:0.7}}>{area.entries.length} {area.entries.length===1?"PAPER":"PAPERS"}</span>
              </div>
              <span style={{color:area.color,fontSize:16,transform:areaOpen?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.25s",display:"inline-block"}}>+</span>
            </button>

            {areaOpen && (
              <div style={{borderTop:`1px solid ${area.color}20`}}>
                {area.entries.map((paper, pi) => {
                  const paperOpen = openPaper === `${area.area}-${pi}`;
                  return (
                    <div key={pi} style={{borderBottom:pi<area.entries.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}>
                      <button
                        onClick={() => setOpenPaper(paperOpen ? null : `${area.area}-${pi}`)}
                        style={{width:"100%",background:paperOpen?"rgba(0,0,0,0.25)":"transparent",border:"none",padding:"14px 22px 14px 38px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",textAlign:"left",gap:16,transition:"background 0.15s"}}
                      >
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                            {paper.implemented && (
                              <span style={{fontSize:8,padding:"2px 8px",background:"rgba(0,255,180,0.08)",border:"1px solid rgba(0,255,180,0.35)",color:"#00ffb4",borderRadius:2,letterSpacing:1.5,fontFamily:"var(--mono)"}}>✓ IMPLEMENTED</span>
                            )}
                          </div>
                          <div style={{fontSize:12,fontWeight:600,color:"var(--fg)",lineHeight:1.6,marginBottom:5}}>{paper.title}</div>
                          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                            <span style={{fontSize:10,color:"var(--fg3)"}}>{paper.authors}</span>
                            <span style={{fontSize:9,padding:"2px 7px",border:`1px solid ${area.color}35`,color:area.color,borderRadius:2}}>{paper.venue}</span>
                            <span style={{fontSize:9,color:"var(--fg3)",fontFamily:"var(--mono)",opacity:0.6}}>DOI: {paper.doi}</span>
                          </div>
                        </div>
                        <span style={{color:area.color,opacity:0.6,fontSize:14,flexShrink:0,transform:paperOpen?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.2s",display:"inline-block",marginTop:4}}>+</span>
                      </button>

                      {paperOpen && (
                        <div style={{padding:"0 22px 22px 38px",background:"rgba(0,0,0,0.2)"}}>
                          <div style={{fontSize:11,color:"var(--fg2)",lineHeight:2.1,marginBottom:16,padding:"16px 18px",borderLeft:`2px solid ${area.color}60`,background:"rgba(0,0,0,0.15)",whiteSpace:"pre-line"}}>
                            {paper.summary}
                          </div>
                          <div style={{fontSize:11,marginBottom:18,lineHeight:1.9,padding:"12px 16px",background:"rgba(0,255,180,0.03)",border:"1px solid rgba(0,255,180,0.08)",borderRadius:2}}>
                            <span style={{color:"var(--fg3)",fontFamily:"var(--mono)",fontSize:9,letterSpacing:1}}>// WHY IT MATTERS TO ME{"\n"}</span>
                            <span style={{color:area.color,opacity:0.85}}>{paper.relevance}</span>
                          </div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                              {paper.tags.map(t=>(
                                <span key={t} style={{fontSize:9,padding:"2px 8px",border:`1px solid ${area.color}30`,color:area.color,borderRadius:2,opacity:0.75}}>{t}</span>
                              ))}
                            </div>
                            <a href={paper.pdfPath} target="_blank" rel="noopener noreferrer"
                              style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:area.color,border:`1px solid ${area.color}40`,padding:"6px 14px",borderRadius:2,textDecoration:"none",transition:"background 0.2s"}}
                              onMouseEnter={e=>{e.currentTarget.style.background=area.color+"15"}}
                              onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}
                            >
                              <ExternalLink size={11}/> Read Paper (PDF)
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
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
  const [activeSection, setActiveSection] = useState("about");
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const el = document.documentElement;
      setScrollPct(window.scrollY / (el.scrollHeight - el.clientHeight));
      const sections = ["about","projects","skills","research","contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const skills = [
    { cat:"Robotics", items:["ROS2 (Actions/Services/Topics)","URDF / Xacro","Gazebo Simulation","MoveIt","Digital Twin (Falcon Editor)","Inverse Kinematics (ikpy)"] },
    { cat:"Controls", items:["PID / Adaptive PID","LQR / LQG","Kalman Filtering","State-Space Modeling","Lyapunov Stability","Trajectory Optimization","MATLAB / Simulink","Simscape"] },
    { cat:"Industrial Automation", items:["Honeywell DCS (C300, Experion PKS)","Siemens PLC (Ladder Logic)","Schneider M580 PLC","SCADA Systems","Safety Interlocks","Control Valve Tuning"] },
    { cat:"Programming & Tools", items:["C++17","Python (NumPy, SciPy, OpenCV)","MATLAB","SolidWorks / Blender","Linux / Git","Raspberry Pi"] },
  ];

  return (
    <div id="top" style={{background:"var(--bg)",color:"var(--fg)",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@700;800&display=swap');
        :root{--bg:#070b0f;--bg2:#0c1117;--bg3:#101820;--fg:#e8f4f0;--fg2:rgba(232,244,240,0.72);--fg3:rgba(232,244,240,0.42);--acc:#00ffb4;--border:rgba(0,255,180,0.18);--mono:'JetBrains Mono',monospace;--display:'Syne',sans-serif;}
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
        .nav-link{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--fg2);transition:color 0.2s;position:relative;}
        .nav-link:hover{color:var(--acc);}
        .nav-link.active{color:var(--acc);}
        .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--acc);transition:width 0.3s;}
        .nav-link:hover::after{width:100%;}
        .nav-link.active::after{width:100%;}

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
        .about-text{font-size:14px;color:var(--fg2);line-height:2.1;margin-bottom:18px;}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px;}
        .stat{text-align:center;padding:16px 8px;border:1px solid var(--border);background:rgba(0,255,180,0.02);}
        .stat-val{font-family:var(--display);font-size:2rem;font-weight:800;color:var(--acc);}
        .stat-lbl{font-size:10px;color:var(--fg3);letter-spacing:1px;margin-top:3px;}

        .tl-year{font-size:10px;color:var(--acc);letter-spacing:2px;margin-bottom:5px;font-family:var(--mono);opacity:0.8;}
        .tl-role{font-size:14px;font-weight:600;color:var(--fg);margin-bottom:3px;}
        .tl-org{font-size:12px;color:var(--fg3);margin-bottom:6px;}
        .tl-desc{font-size:12px;color:var(--fg2);line-height:1.9;}

        /* SKILLS */
        .skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;}
        .skill-group{background:var(--bg2);border:1px solid var(--border);padding:20px;position:relative;overflow:hidden;}
        .skill-cat{font-size:10px;color:var(--acc);letter-spacing:3px;margin-bottom:14px;position:relative;}
        .skill-item{font-size:12px;color:var(--fg);padding:6px 0;border-bottom:1px solid rgba(0,255,180,0.08);display:flex;align-items:center;gap:8px;position:relative;}
        .skill-item:last-child{border-bottom:none;}
        .skill-item::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--acc);flex-shrink:0;opacity:0.7;}

        /* PROJECTS */
        .projects-grid{display:grid;grid-template-columns:1fr;gap:18px;}
        .proj-card{background:var(--bg2);border:1px solid var(--border);overflow:hidden;position:relative;transition:border-color 0.2s,transform 0.2s;}
        .proj-card:hover{border-color:rgba(0,255,180,0.38);transform:translateY(-2px);}
        .proj-card.featured{border-color:rgba(0,255,180,0.28);background:linear-gradient(135deg,#0c1117 0%,#0d1a14 100%);}
        .proj-card.featured .card-accent-line{background:linear-gradient(90deg,transparent,var(--acc),#00c8ff,transparent);}
        .featured-badge{display:inline-flex;align-items:center;gap:5px;font-size:8px;padding:2px 8px;background:rgba(0,255,180,0.1);border:1px solid rgba(0,255,180,0.35);color:var(--acc);letter-spacing:1.5px;margin-bottom:8px;}
        .proj-card.wide{grid-column:1/-1;}
        .card-accent-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--acc),transparent);}
        .card-img-wrap{position:relative;height:220px;overflow:hidden;}
        .card-img{width:100%;height:100%;object-fit:cover;opacity:0.55;transition:opacity 0.4s,transform 0.5s;}
        .proj-card:hover .card-img{opacity:0.78;transform:scale(1.04);}
        .card-img-fade{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--bg2) 100%);}
        .card-corner{position:absolute;width:13px;height:13px;}
        .card-corner.tl{top:8px;left:8px;border-top:1px solid var(--acc);border-left:1px solid var(--acc);}
        .card-corner.tr{top:8px;right:8px;border-top:1px solid var(--acc);border-right:1px solid var(--acc);}
        .card-corner.bl{bottom:8px;left:8px;border-bottom:1px solid var(--acc);border-left:1px solid var(--acc);}
        .card-corner.br{bottom:8px;right:8px;border-bottom:1px solid var(--acc);border-right:1px solid var(--acc);}
        .card-body{padding:22px;}
        .card-title{font-size:15px;font-weight:600;color:var(--fg);margin-bottom:10px;line-height:1.4;}
        .card-desc{font-size:12.5px;color:var(--fg2);line-height:1.9;margin-bottom:14px;}
        .card-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;}
        .tag{font-size:9px;padding:3px 8px;border:1px solid rgba(0,255,180,0.2);color:var(--acc);opacity:0.8;}
        .card-actions{display:flex;gap:10px;}
        .btn-outline{display:flex;align-items:center;gap:6px;font-size:12px;padding:7px 14px;border:1px solid rgba(232,244,240,0.2);color:var(--fg2);font-family:var(--mono);cursor:pointer;background:none;transition:all 0.2s;}
        .btn-outline:hover{border-color:var(--acc);color:var(--acc);}
        .btn-solid{display:flex;align-items:center;gap:6px;font-size:12px;padding:7px 14px;background:var(--acc);color:#070b0f;font-family:var(--mono);font-weight:700;cursor:pointer;border:none;transition:opacity 0.2s;}
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

        /* TIMELINE */
        .timeline{position:relative;margin-top:40px;padding-top:8px;}
        .timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--acc),rgba(0,255,180,0.1));}
        .tl-item{position:relative;padding:0 0 32px 28px;}
        .tl-item:last-child{padding-bottom:0;}
        .tl-dot{position:absolute;left:-5px;top:4px;width:11px;height:11px;border-radius:50%;background:var(--bg);border:2px solid var(--acc);box-shadow:0 0 8px rgba(0,255,180,0.4);}
        .tl-dot.dim{border-color:rgba(0,255,180,0.4);box-shadow:none;}

        .footer{padding:36px;border-top:1px solid var(--border);background:var(--bg2);}
        .footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;}
        .footer-left{display:flex;flex-direction:column;gap:6px;}
        .footer-name{font-family:var(--display);font-size:13px;color:var(--acc);letter-spacing:2px;}
        .footer-copy{font-size:10px;color:var(--fg3);letter-spacing:1px;}
        .footer-links{display:flex;gap:16px;align-items:center;}
        .footer-link{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--fg3);transition:color 0.2s;letter-spacing:1px;}
        .footer-link:hover{color:var(--acc);}
        .footer-email{font-size:10px;color:var(--fg3);letter-spacing:0.5px;}

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
          {["about","projects","skills","research","contact"].map(s=>(
            <a key={s} href={`#${s}`} className={`nav-link${activeSection===s?" active":""}`}>{s}</a>
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
                <div style={{display:"flex",gap:8}}><span className="term-prompt">$</span><span>cat learning.txt</span></div>
                <div className="term-out" style={{color:"#a78bfa"}}>[ Nav2, MPC, RL for Control ]</div>
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
                I grew up fascinated by machines that could think and act. After my B.Eng. in <span style={{color:"var(--acc)"}}>Instrumentation &amp; Control Engineering</span> at L.D. College of Engineering, Gujarat, I took the GATE exam and secured an <span style={{color:"var(--acc)"}}>All India Rank of 96</span> — years of focused work, and still one of my proudest achievements.
              </p>
              <p className="about-text">
                Rather than pursue a master's right away, I moved into industry. I joined <span style={{color:"var(--acc)"}}>KRIBHCO Fertilizers Ltd</span>, one of India's largest fertilizer producers, as a trainee engineer and over six years grew into the role of <span style={{color:"var(--acc)"}}>Assistant Manager of Instrumentation</span>. I worked on safety-critical process units, tuned PID loops on Honeywell Experion DCS and Siemens PLC systems, reduced equipment downtime on our units by up to 50%, and led plant-wide SCADA automation initiatives.
              </p>
              <p className="about-text">
                The master's dream never left. Watching AI, deep learning, and reinforcement learning reshape what autonomous systems can do, I made the decision to leave a stable career and move to the US. I'm now pursuing an <span style={{color:"var(--acc)"}}>M.Eng. in Robotics at the University of Maryland, College Park</span> (GPA 3.9), building on that industrial foundation toward work where autonomous navigation, optimal control, and modern ML meet.
              </p>
              <p className="about-text">
                My goal is to become an <span style={{color:"var(--acc)"}}>automation engineer</span> who bridges the reliability of classical industrial controls with the intelligence of modern AI — designing robotic systems that aren't just capable in a lab, but genuinely deployable in the real world. Outside engineering, I'm a lifelong sports enthusiast — cricket, soccer, and badminton have been constants, and I'm currently picking up tennis.
              </p>
              <div className="stats">
                {[{v:"AIR 96",l:"GATE Rank"},{v:"6+",l:"Yrs Industry"},{v:"3.9",l:"M.Eng GPA"},{v:"6",l:"Projects"}].map(s=>(
                  <div key={s.l} className="stat"><div className="stat-val" style={{fontSize:s.v.length>3?"1.3rem":"2rem"}}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>
                ))}
              </div>
              <div className="timeline">
                {[
                  {year:"Sep 2025 – Present", role:"M.Eng in Robotics", org:"University of Maryland, College Park · GPA 3.9", desc:"Autonomous navigation, optimal control, ROS2, and ML-based robotics. Building on industrial foundation to work at the frontier of intelligent systems.", active:true},
                  {year:"May 2023 – Jul 2025", role:"Assistant Manager, Instrumentation", org:"KRIBHCO Fertilizers Ltd · Gujarat, India", desc:"Led reliability initiatives on safety-critical units — 50% downtime reduction. Integrated torque-converter logic in Honeywell DCS (C300), 15% availability gain.", active:false},
                  {year:"Oct 2019 – Apr 2023", role:"Senior Engineer, Instrumentation", org:"KRIBHCO Fertilizers Ltd · Gujarat, India", desc:"Designed Siemens PLC logic to eliminate false trips (90% reduction). Tuned PID loops on pressure and flow controls — 30% decrease in process downtime.", active:false},
                  {year:"Oct 2018 – Oct 2019", role:"Graduate Engineer Trainee", org:"KRIBHCO Fertilizers Ltd · Gujarat, India", desc:"Installed and calibrated 20+ types of process instrumentation including transmitters, sensors, and controllers. Configured hardware and software platforms for real-time data acquisition and analysis.", active:false},
                  {year:"May 2017 – Jun 2017", role:"Summer Intern", org:"Indian Oil Corporation Ltd · Vadodara, India", desc:"Exposure to large-scale industrial operations and the role of instrumentation & control in a major oil refinery environment.", active:false},
                  {year:"Aug 2014 – May 2018", role:"B.Eng, Instrumentation & Control", org:"L.D. College of Engineering · Gujarat, India", desc:"GATE All India Rank 96. Foundation in control theory, instrumentation systems, and process engineering.", active:false},
                ].map((item,i)=>(
                  <div key={i} className="tl-item">
                    <div className={`tl-dot${item.active?"":" dim"}`}/>
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
      <section id="projects" style={{background:"var(--bg)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">02 //</span><h2 className="sec-title">Projects</h2><div className="sec-line"/></div>
          <div className="projects-grid">
            <ProjectCard featured title="6-DOF Camera Crane – SolidWorks to URDF" desc="Designed and modeled a 6-DOF crane system with prismatic and revolute joints. Exported full assembly to URDF and validated kinematics in ROS2 RViz." tags={["SolidWorks","URDF","ROS2","RViz","6-DOF","Forward Kinematics"]} github="https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF" videoSrc="https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview" imgSrc={`${import.meta.env.BASE_URL}camera_crane_preview.png`}/>
            <ProjectCard featured title="UR5 Drawing Robot – ROS2 + WebSocket + IK" desc="Built a decoupled control architecture for a UR5 manipulator in ROS2, bridging a web interface to a Python backend via WebSockets to execute real-time inverse kinematics (ikpy) in Gazebo simulation. Users draw paths in the browser which are translated to joint commands and executed live on the robot arm." tags={["ROS2","UR5","Inverse Kinematics","WebSocket","Python","Gazebo","ikpy","Web Control"]} github="https://github.com/ravivkrahul/UR5-ros2-drawing-robot" videoSrc="https://drive.google.com/file/d/1DiG7gqiEOJPpZ6RzulsZfuZ8Wa0lbqSt/preview" imgSrc={`${import.meta.env.BASE_URL}web_socket_preview.png`}/>
            <ProjectCard featured title="Optimal Controller Design – GA + Adaptive PID (MATLAB)" desc="Implemented a two-layer mobile robot control system in MATLAB: a GA-optimized kinematic controller using cubic polynomial interpolation for trajectory generation, and a gradient-descent-based adaptive PID dynamic controller. Validated against mass variation (5–70 kg) and external disturbances using Lyapunov stability analysis." tags={["MATLAB","Genetic Algorithm","Adaptive PID","Lyapunov Stability","Trajectory Optimization","Nonholonomic Robot"]} github="https://github.com/ravivkrahul/Controller_Design_Using_Genetic_Algorithm_and_Adaptive_PID_Controller_MATLAB"/>
            <ProjectCard title="ROS2 MicroMouse Navigation System" desc="ROS2-based maze navigation using DFS with dynamic replanning. Full ROS2 stack: Actions, Services, Topics, parameter server, and real-time path execution." tags={["ROS2","C++","DFS","Navigation","Path Planning","Action Server"]} github="https://github.com/ravivkrahul/MicroMouse_Cpp" videoSrc="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview" imgSrc={`${import.meta.env.BASE_URL}micromouse_preview.png`}/>
            <ProjectCard title="Truck Twin-Trailer Simulation – ROS2 + Gazebo" desc="Simulated a truck with two articulated trailers in Gazebo Classic. Built URDF/Xacro model of the full assembly, implemented a Proportional controller for waypoint tracking, keyboard teleoperation via pynput, and ROS2 Control integration with position and velocity controllers. Also deployed the robot model on Falcon simulation platform using Blender URDF→FBX conversion." tags={["ROS2 Humble","Gazebo","URDF/Xacro","P Controller","ROS2 Control","Teleoperation","Python","Blender"]} github="https://github.com/ravivkrahul/Truck-trailer-ros2" videoSrc="https://drive.google.com/file/d/1mdpFN_nNgGmpQJpitGadek_PmwLtWvHB/preview" imgSrc={`${import.meta.env.BASE_URL}truck_preview.png`}/>
            <ProjectCard title="Autonomous Mobile Robot – Raspberry Pi + OpenCV" desc="Real-world autonomous robot using Raspberry Pi and a camera-based perception pipeline with OpenCV. Focused on hardware-software integration, real-time vision inference, and closed-loop motor control." tags={["Raspberry Pi","OpenCV","Python","Vision","Embedded","Autonomous","🚧 In Progress"]} github="https://github.com/ravivkrahul/Autonomous-Robot-Build-Series" youtube="https://youtube.com/playlist?list=PLdM7LpLw5C1EBv95E1sSbJ2eZQ9Ftlzfo&si=hW21UI1M3-VP9cq7"/>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">03 //</span><h2 className="sec-title">Core Skills</h2><div className="sec-line"/></div>
          <div className="skills-grid">
            {skills.map(g=>(
              <div key={g.cat} className="skill-group">
                <div style={{position:"absolute",inset:0}}><CircuitBg/></div>
                <div className="skill-cat">{g.cat.toUpperCase()}</div>
                {g.items.map(item=><div key={item} className="skill-item">{item}</div>)}
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{marginTop:40}}>
            <div style={{fontSize:9,color:"var(--acc)",letterSpacing:3,marginBottom:18,opacity:0.7}}>CERTIFICATIONS</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {[
                {name:"Honeywell Experion PKS C300 Fundamentals", issuer:"Honeywell"},
                {name:"Siemens – Basics of PLC & SCADA", issuer:"Siemens"},
                {name:"Schneider Electric M580 PLC & EcoStruxure Control Expert", issuer:"Schneider Electric"},
                {name:"Basics of Process Instrumentation", issuer:"Industry"},
                {name:"Simscape Onramp", issuer:"MathWorks"},
              ].map(c=>(
                <div key={c.name} style={{display:"flex",flexDirection:"column",gap:4,padding:"10px 14px",border:"1px solid rgba(0,255,180,0.15)",background:"rgba(0,255,180,0.02)",minWidth:200,flex:"1 1 200px"}}>
                  <span style={{fontSize:10,color:"var(--fg)",lineHeight:1.5}}>{c.name}</span>
                  <span style={{fontSize:9,color:"var(--acc)",opacity:0.55,letterSpacing:1}}>{c.issuer.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="research" style={{background:"var(--bg)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">04 //</span><h2 className="sec-title">Research Radar</h2><div className="sec-line"/></div>
          <p style={{fontSize:11,color:"var(--fg3)",marginBottom:32,letterSpacing:1}}>// Papers I've studied, implemented, or built upon — summarized in my own words</p>
          <ResearchAccordion />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}}>
        <div className="section">
          <div className="sec-header"><span className="sec-num">05 //</span><h2 className="sec-title">Let's Connect</h2><div className="sec-line"/></div>
          <div className="contact-grid">
            <div>
              <p style={{fontSize:12,color:"var(--fg2)",lineHeight:2.1,marginBottom:22}}>Open to robotics engineering roles, research collaborations, and interesting automation challenges. Reach out anytime.</p>
              {/* Email — static, no link */}
              <div className="contact-link" style={{cursor:"default"}}>
                <span className="contact-icon"><Mail size={16}/></span>
                <span className="contact-lbl">ravivk.rahul@gmail.com</span>
              </div>
              {/* LinkedIn + GitHub — external links */}
              {[
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

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-name">RAHUL RAVI VK</div>
            <div className="footer-copy">© 2025 · Robotics & Controls Engineer · M.Eng UMD</div>
            <div className="footer-email">ravivk.rahul@gmail.com</div>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer" className="footer-link"><Linkedin size={13}/> LinkedIn</a>
            <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer" className="footer-link"><Github size={13}/> GitHub</a>
            <a href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`} target="_blank" rel="noopener noreferrer" className="footer-link"><ExternalLink size={13}/> Resume</a>
          </div>
        </div>
      </footer>
    </div>
  );
}