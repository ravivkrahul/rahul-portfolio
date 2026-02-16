import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import profileImg from "./assets/profile.jpg";

export default function App() {
  const [showVideo, setShowVideo] = useState(false);

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
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={profileImg}
              alt="Rahul Ravi"
              className="w-72 h-72 object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
  I am a Robotics Engineer with over seven years of experience building and deploying
  industrial control systems in high-reliability environments. My foundation was built
  on Honeywell Experion PKS (EPKS) platforms, including C300 DCS controllers and
  Safety Manager architectures, where I designed and implemented safety-critical
  control logic.
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  I am currently in my first year of the Master of Engineering in Robotics program
  at the University of Maryland, College Park, where I am deepening my expertise in
  control systems, autonomy, and intelligent robotics.
</p>

<p className="text-gray-700 leading-relaxed mb-6">
  My work now focuses on integrating advanced control systems with intelligent,
  learning-driven autonomy. I am particularly interested in combining classical
  control strategies with modern AI techniques such as reinforcement learning,
  model predictive control (MPC), and adaptive learning-based methods.
</p>

<p className="text-gray-700 leading-relaxed">
  I bring a builder’s mindset — comfortable working from hardware integration
  and low-level control logic to high-level autonomy architecture — motivated by
  creating deployable systems that balance reliability, intelligence, and execution speed.
</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Selected Project
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* Preview Image (Safe public folder method) */}
          <img
            src={`${import.meta.env.BASE_URL}micromouse_preview.png`}
            alt="MicroMouse"
            className="w-full h-56 object-cover rounded-xl mb-6"
          />

          <h3 className="text-xl font-semibold mb-3">
            ROS2 MicroMouse Navigation System
          </h3>

          <p className="text-gray-600 mb-4">
            ROS2-based autonomous navigation framework in C++17 implementing
            custom Actions, Services, Topics, and dynamic replanning logic.
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["ROS2", "C++17", "Actions", "Services", "Topics"].map((tech, i) => (
              <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <a
              href="https://github.com/ravivkrahul/MicroMouse_Cpp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
            >
              View Code
            </a>

            <button
              onClick={() => setShowVideo(!showVideo)}
              className="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {showVideo ? "Hide Demo" : "Watch Demo"}
            </button>
          </div>

          {/* Video (only when selected) */}
          {showVideo && (
            <div className="aspect-video w-full mt-4">
              <iframe
                src="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview"
                className="w-full h-full rounded-xl"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          )}

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Let’s Connect</h2>
        <div className="flex justify-center gap-6">
          <a href="mailto:ravivk.rahul@gmail.com"><Mail /></a>
          <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank"><Linkedin /></a>
          <a href="https://github.com/ravivkrahul" target="_blank"><Github /></a>
        </div>
      </section>

    </div>
  );
}