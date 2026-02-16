import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import profileImg from "./assets/profile.jpg";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Rahul Ravi VK</h1>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-gray-600">About</a>
            <a href="#skills" className="hover:text-gray-600">Skills</a>
            <a href="#projects" className="hover:text-gray-600">Projects</a>
            <a href="#contact" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-32 pb-20 text-center bg-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Robotics & Controls Engineer
        </motion.h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          M.Eng Robotics @ University of Maryland (GPA 3.9) | 7+ Years Industrial Automation
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800"
          >
            View Resume
          </a>

          <a
            href="#contact"
            className="border border-black px-6 py-3 rounded-2xl hover:bg-black hover:text-white"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={profileImg}
              alt="Rahul Ravi"
              className="w-72 h-72 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              I started my career in industrial automation, working on Honeywell
              Experion PKS (EPKS) systems including C300 DCS controllers and
              Safety Manager (ESD) architectures. Over the past seven years,
              I’ve worked on control logic, interlocks, and safety-critical
              systems in large-scale process environments where reliability
              truly matters.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Over time, I became increasingly interested in how intelligent
              systems could make these environments more adaptive and efficient.
              That curiosity led me to pursue a Master’s in Robotics at the
              University of Maryland and begin working at the intersection of
              classical control and AI-driven autonomy.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
            I am now focused on integrating advanced control systems with intelligent,
            learning-driven autonomy. My work centers on combining classical control
            strategies with modern AI techniques such as reinforcement learning,
            model predictive control (MPC), and adaptive learning-based methods.
            I am particularly interested in building robust robotic and intelligent
            systems that operate under real-world constraints while continuously
            improving through data-driven optimization.
          </p>

          <p className="text-gray-700 leading-relaxed">
            I bring a builder’s mindset — comfortable working from hardware integration
            and low-level control logic to high-level autonomy architecture — and I am
            motivated by creating deployable systems that balance reliability,
            intelligence, and execution speed.
          </p>
          </div>

        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10">Core Skills</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Robotics & Autonomous Systems",
              "Control Systems & Estimation",
              "Motion Planning & Navigation",
              "Industrial Automation (PLC / SCADA / DCS)",
              "Embedded Systems & Integration",
              "Python • C++ • ROS • MATLAB"
            ].map((skill, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-2xl shadow-sm text-center"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10">Selected Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Autonomous Navigation System",
              desc: "Implemented SLAM and path planning using ROS with real-world sensor integration."
            },
            {
              title: "Industrial Control System Upgrade",
              desc: "Led PLC modernization and SCADA integration to improve system reliability and uptime."
            },
            {
              title: "Robotic Arm Optimization",
              desc: "Designed and tuned PID and state-space controllers for improved trajectory tracking."
            },
            {
              title: "Embedded Vision Module",
              desc: "Developed camera-based detection system integrated with edge hardware for real-time tracking."
            }
          ].map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Let’s Connect</h2>

        <div className="flex justify-center gap-6">
          <a href="mailto:ravivk.rahul@gmail.com">
            <Mail />
          </a>
          <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Rahul Ravi VK
      </footer>
    </div>
  );
}