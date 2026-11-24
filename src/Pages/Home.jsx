import React, { useEffect, useState } from "react";
import Sidebar from "../componets/sidebar";
import fotoSaya from "../assets/foto_saya.png";
import About from "./About";
import Project from "./Project";

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Computer Science Student",
  "UI/UX Designer",
  "Data Analyst",
];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">

      <Sidebar />

      {/* ================= HOME SECTION ================= */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#777] via-[#444] to-black"
      >

        {/* Background Typography */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="select-none font-bbh text-[45vw] leading-none text-white/10 opacity-90 md:text-[25vw]">
          FEB <br /> DEV
        </h1>
      </div>

        {/* Main Content */}
        <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 md:px-12">

          {/* Left Content */}
          <div className="relative z-20 w-full pb-24 md:w-3/5 md:pb-0">

            {/* Name */}
            <h1 className="font-anton text-5xl font-black uppercase leading-[0.85] tracking-tight text-white md:text-7xl lg:text-9xl">
              HI I'M FEBRU
              <br />
              FERDIANSYAH
            </h1>

            {/* Profession */}
            <h2
              key={roleIndex}
              className="font-anton mt-3 text-xl font-extrabold uppercase text-[#c6b5b5] animate-[fadeIn_0.6s_ease-in-out] md:ml-10 md:text-5xl"
            >
              {roles[roleIndex]}
            </h2>

            {/* Download CV */}
            <a
              href="Assets/CV_Febru_Ferdiansyah.pdf"
              download
              className="mt-7 inline-flex items-center justify-center rounded-2xl border border-black bg-white/40 px-6 py-3 text-base font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black md:text-lg"
            >
              DOWNLOAD CV
            </a>

            {/* Social Media */}
            <div className="relative mt-10 flex items-center gap-10">

              {/* WhatsApp */}
              <a
                href="https://wa.me/6282287196964"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#25D366] text-white transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path
                    d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.08 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.42ZM12.09 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.74.98.99-3.65-.24-.38a9.84 9.84 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.9-9.92 9.9Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                  />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/februferdiansyah02-rgb"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center bg-white text-black transition duration-300 hover:-translate-y-2 hover:bg-gray-300"
              >
                <svg viewBox="0 0 24 24" className="h-9 w-9">
                  <path
                    d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.24-5.11 5.51.4.35.75 1.02.75 2.06v3.13c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/feb.ferdi/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8">
                  <rect
                    x="3" y="3" width="18" height="18" rx="5"
                    fill="none" stroke="black" strokeWidth="3.5"
                  />
                  <rect
                    x="3" y="3" width="18" height="18" rx="5"
                    fill="none" stroke="white" strokeWidth="1.8"
                  />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="black" strokeWidth="3" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.8" />
                  <circle cx="18" cy="6" r="1" fill="white" stroke="black" strokeWidth="1" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/febru-ferdiansyah"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded bg-[#0A66C2] text-white transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8">
                  <path
                    d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.9H4.97V9.35h2.96v9.55ZM6.45 8.04a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.48 10.86h-2.96v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.67V9.35h2.84v1.3h.04c.4-.75 1.36-1.55 2.8-1.55 3 0 3.58 1.98 3.58 4.56v5.24Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                  />
                </svg>
              </a>

            </div>
          </div>

          {/* Profile Image */}
          <div className="pointer-events-none absolute bottom-0 right-[-10%] z-10 flex h-[100%] w-[100%] items-end justify-center md:right-[-5%] md:h-[90%] md:w-[70%]">
            <img
              src={fotoSaya}
              alt="Foto Febru"
              className="h-full w-full object-contain object-bottom grayscale"
            />
          </div>

        </section>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <About />

      {/* ================= PROJECT SECTION ================= */}
      <section
        id="project"
        className="min-h-screen w-full bg-black text-white"
      ><Project />
        {/* PROJECT WILL BE CREATED HERE */}
      </section>
      <section
        id="sklis"
        className="min-h-screen w-full bg-white text-black"
      >
        {/* SKLIS WILL BE CREATED HERE */}
      </section>

    </main>
  );
};

export default Home;