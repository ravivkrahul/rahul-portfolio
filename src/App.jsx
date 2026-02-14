import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

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
            href="/Rahul_Ravi_Resume.pdf"
            download
            className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800"
          >
            Download Resume
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
      <section id="about" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          I am transitioning into robotics with a strong foundation in control systems,
          estimation, and industrial automation. Experienced in PLC/SCADA systems,
          system integration, and robotics frameworks including ROS, Python, and C++.
        </p>
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
              "Industrial Automation (PLC/SCADA)",
              "Embedded Systems",
              "Python, C++, MATLAB, ROS"
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
              desc: "Implemented SLAM and path planning using ROS."
            },
            {
              title: "Industrial Control System Upgrade",
              desc: "Led PLC modernization and SCADA integration."
            },
            {
              title: "Robotic Arm Optimization",
              desc: "Designed PID & state-space controllers."
            },
            {
              title: "Embedded Vision Module",
              desc: "Camera-based real-time object tracking."
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
          <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank">
            <Linkedin />
          </a>
          <a href="https://github.com/ravivkrahul" target="_blank">
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