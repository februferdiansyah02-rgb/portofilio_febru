import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isAbout = activeSection === "about";

  return (
    <nav className="fixed top-5 left-1/2 z-50 w-[85%] max-w-md -translate-x-1/2">
      <div
        className={`flex items-center justify-around rounded-full px-5 py-3 backdrop-blur-md transition-all duration-500 ${
          isAbout
            ? "bg-[#666666]/95 shadow-md"
            : "bg-white/45"
        }`}
      >
        <a
          href="#home"
          className={`font-bold transition-all duration-300 ${
            isAbout
              ? "text-black hover:text-white"
              : "text-white hover:text-black"
          }`}
        >
          Home
        </a>

        <a
          href="#about"
          className={`font-bold transition-all duration-300 ${
            isAbout
              ? "text-black hover:text-white"
              : "text-white hover:text-black"
          }`}
        >
          About
        </a>

        <a
          href="#project"
          className={`font-bold transition-all duration-300 ${
            isAbout
              ? "text-black hover:text-white"
              : "text-white hover:text-black"
          }`}
        >
          Project
        </a>

        <a
          href="#sklis"
          className={`font-bold transition-all duration-300 ${
            isAbout
              ? "text-black hover:text-white"
              : "text-white hover:text-black"
          }`}
        >
          Skills
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;