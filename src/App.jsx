import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import profileImg from "./assets/profile.jpg";
import micromouseImg from "./assets/projects/micromouse_preview.png";

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
              I started my career in industrial automation working on Honeywell
              Experion PKS (EPKS) systems including C300 DCS controllers and
              Safety Manager architectures. Over the past seven years,
              I’ve worked on control logic, interlocks, and safety-critical systems
              where reliability and structured execution matter.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              I later pursued a Master’s in Robotics at the University of Maryland
              to move toward intelligent autonomy and advanced control.
              My work now focuses on combining classical control systems
              with modern AI-driven decision frameworks.
            </p>

            <p className="text-gray-700 leading-relaxed">
              I bring a builder’s mindset — comfortable working from hardware integration
              and low-level control logic to high-level autonomy architecture —
              focused on building deployable, robust systems.
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

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

            <img
              src={micromouseImg}
              alt="MicroMouse"
              className="w-full h-52 object-cover"
            />

            <div className="p-6">

              <h3 className="text-xl font-semibold mb-3">
                ROS2 MicroMouse Navigation System
              </h3>

              <p className="text-gray-600 mb-4">
                Modular ROS2-based autonomous navigation framework in C++17 implementing
                custom Actions, Services, Topics, and parameter-driven execution.
                Integrated wall-aware DFS with dynamic replanning in a simulator environment.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {["ROS2", "C++17", "rclcpp", "Actions", "Services", "Topics", "MMS Simulator"].map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mb-6">
                <a
                  href="https://github.com/ravivkrahul/MicroMouse_Cpp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-black border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
                >
                  View Code
                </a>

                <a
                  href="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Watch Demo
                </a>
              </div>

              <div className="aspect-video w-full">
                <iframe
                  src="https://drive.google.com/file/d/1msblbBuDRnCMMHjjYTiJ9KUk_LyJcBGa/preview"
                  className="w-full h-full rounded-xl"
                  allow="autoplay"
                  allowFullScreen
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Let’s Connect</h2>

        <div className="flex justify-center gap-6">
          <a href="mailto:ravivk.rahul@gmail.com"><Mail /></a>
          <a href="https://www.linkedin.com/in/rahulravivk/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          <a href="https://github.com/ravivkrahul" target="_blank" rel="noopener noreferrer"><Github /></a>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Rahul Ravi VK
      </footer>

    </div>
  );
}