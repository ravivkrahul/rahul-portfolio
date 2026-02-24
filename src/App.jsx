import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import profileImg from "./assets/profile.jpg";

export default function App() {
  const [showCraneVideo, setShowCraneVideo] = useState(false);
  const [showMouseVideo, setShowMouseVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 scroll-smooth">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Rahul Ravi VK</h1>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
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
          M.Eng Robotics @ University of Maryland (GPA 3.9) | 6+ Years Industrial Automation
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href={`${import.meta.env.BASE_URL}Rahul_Ravi_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            View Resume
          </a>

          <a
            href="#contact"
            className="border border-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Contact Me
          </a>
        </div>
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
              Robotics engineer with 6+ years in industrial control systems.
              Currently pursuing M.Eng in Robotics at University of Maryland,
              focusing on autonomy, control, and intelligent robotic systems.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Core Skills</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Robotics & Autonomous Systems",
              "Control Systems & Estimation",
              "Motion Planning & Navigation",
              "Industrial Automation",
              "Embedded Systems",
              "Python • C++ • ROS2 • MATLAB"
            ].map((skill, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-2xl shadow-sm text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">Projects</h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Camera Crane */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <img
              src={`${import.meta.env.BASE_URL}camera_crane_preview.png`}
              alt="Camera Crane"
              className="w-full h-56 object-cover rounded-xl mb-6"
            />
            <h3 className="text-xl font-semibold mb-3">
              6-DOF Camera Crane – SolidWorks to URDF
            </h3>
            <p className="text-gray-600 mb-4">
              Designed and modeled a 6-DOF crane system with prismatic and revolute joints.
              Exported full assembly to URDF and validated in ROS2 RViz.
            </p>

            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com/ravivkrahul/Camera_Crane-SOLIDWORKS-MODEL-and-URDF"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                View Code
              </a>
              <button
                onClick={() => setShowCraneVideo(!showCraneVideo)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {showCraneVideo ? "Hide Demo" : "Watch Demo"}
              </button>
            </div>

            {showCraneVideo && (
              <div className="aspect-video w-full">
                <iframe
                  src="https://drive.google.com/file/d/15ch_nCc1SRkQLc9Vk0bVXVV0IPXA_89C/preview"
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* MicroMouse */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <img
              src={`${import.meta.env.BASE_URL}micromouse_preview.png`}
              alt="MicroMouse"
              className="w-full h-56 object-cover rounded-xl mb-6"
            />
            <h3 className="text-xl font-semibold mb-3">
              ROS2 MicroMouse Navigation System
            </h3>
            <p className="text-gray-600 mb-4">
              ROS2-based navigation framework using DFS with dynamic replanning.
              Implemented Actions, Services, Topics, and parameter configuration.
            </p>

            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com/ravivkrahul/MicroMouse_Cpp"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                View Code
              </a>
              <button
                onClick={() => setShowMouseVideo(!showMouseVideo)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                {showMouseVideo ? "Hide Demo" : "Watch Demo"}
              </button>
            </div>

            {showMouseVideo && (
              <div className="aspect-video w-full">
                <iframe
                  src="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview"
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Raspberry Pi Robot */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
            <h3 className="text-xl font-semibold mb-3">
              Autonomous Mobile Robot – Raspberry Pi + OpenCV
            </h3>
            <p className="text-gray-600">
              Developing a real-world autonomous robot using Raspberry Pi,
              camera-based perception, and structured path planning.
              Focused on hardware-software integration and real-time vision.
            </p>
          </div>

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