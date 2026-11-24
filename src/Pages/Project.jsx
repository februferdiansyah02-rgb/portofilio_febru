
import React, { useState } from "react";


const projects = [
  {
    id: 1,
    title: "Hydration Tracker",
    description:
      "a web bassed hyrdro trekking application to help users monitor their daily water intake,manage hydration goals, and maintain a healthy lifestyle .the application provides an interactive dashboard to recordwater cosumtion ,track  daily progress,and monitor hydrotion activites though a simple ans user-freindly interface.",
    image: "/image/hyrdro_trekker.png",
    color: "#323131",
    link: "https://hyrdretiontreker.netlify.app/",
  },
  {
    id: 2,
    title: "Sahabat Sehat",
    description:
      "Aplikasi kesehatan dengan desain UI/UX yang berfokus pada kenyamanan dan pengalaman pengguna.",
    image: "/images/sahabat-sehat.png",
    color: "#363535",
    link: "#",
  },
  {
    id: 3,
    title: "Kebun Target",
    description:
      "Website interaktif untuk mengelola target harian dengan sistem perkembangan bunga.",
    image: "/images/kebun-target.png",
    color: "#414141",
    link: "#",
  },
  {
    id: 4,
    title: "KOPI.ONE",
    description:
      "Sistem manajemen cafe untuk mengelola menu, pesanan, pembayaran, dan operasional cafe.",
    image: "/images/kopi-one.png",
    color: "#212020",
    link: "#",
  },
  {
    id: 5,
    title: "Spotify Dashboard",
    description:
      "Dashboard interaktif untuk menampilkan dan menganalisis data musik melalui visualisasi data.",
    image: "/images/spotify.png",
    color: "#292929",
    link: "#",
  },
];

const Project = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const getOffset = (index) => {
    const total = projects.length;

    let offset = (index - activeIndex + total) % total;

    if (offset > Math.floor(total / 2)) {
      offset -= total;
    }

    return offset;
  };

  return (
    <section
      id="project"
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#777777] via-[#555555] to-black pt-12"
    >
      {/* ================= BACKGROUND TEXT ================= */}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="select-none font-bbh text-[45vw] leading-none text-white/10 opacity-90 md:text-[25vw]">
          FEB <br /> DEV
        </h1>
      </div>


      {/* ================= NAVBAR ================= */}

     
      {/* ================= PROJECT CARDS ================= */}

      <div className="relative mt-30 flex h-[450px] w-full max-w-[950px] items-center justify-center">

        {projects.map((project, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;

          return (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Pilih ${project.title}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={`
                absolute
                h-[500px]
                w-[350px]
                overflow-hidden
                rounded-[18px]
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isActive ? "cursor-default shadow-2xl" : "cursor-pointer hover:brightness-110"}
              `}
              style={{
                transform: `
                  translateX(${offset * 145}px)
                  scale(${1 - Math.abs(offset) * 0.015})
                `,
                zIndex: 10 - Math.abs(offset) * 2,
                backgroundColor: project.color,
              }}
            >

              {/* ================= CARD CONTENT ================= */}

              <div
                    className={`
                        flex h-full w-full flex-col items-center p-4
                        justify-start gap-5
                        visible opacity-100
                        transition-all duration-500
                    `}
                    >

                {/* PROJECT IMAGE */}

                <div className="h-[230px] w-full overflow-hidden rounded-[15px] bg-white/20">

                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                </div>

                {/* PROJECT INFORMATION */}

                <div className="w-full px-3 text-white">

                  <h2 className="mb-3 font-anton text-xl leading-snug">
                    {project.title}
                  </h2>

                  <p className="font-poppins text-[11px] font-medium leading-relaxed">
                    {project.description}
                  </p>

                </div>

                {/* VIEW PROJECT BUTTON */}

                <a
                    href={project.link}
                    onClick={(e) => e.stopPropagation()}
                    className="mx-auto mt-auto flex w-fit items-center justify-center rounded-2xl border-2 border-[#00aaff] bg-[#222] px-6 py-2 font-anton text-white transition-all duration-300 hover:bg-white hover:text-black"
                    >
                    View Project
                    </a>
                </div>

            </div>
          );
        })}

      </div>

      {/* ================= CARD INDICATOR ================= */}

      <div className="relative z-20 mt-2 flex items-center gap-3">

        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Pilih project ${project.title}`}
            className={`
              h-2 rounded-full transition-all duration-500
              ${
                activeIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white"
              }
            `}
          />
        ))}

      </div>

    </section>
  );
};

export default Project;
