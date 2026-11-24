
import React, { useState, useRef, useEffect } from "react";
import fotoabout from "../assets/foto_about.png";




// ================= DRAGGABLE PHOTO =================

const DraggablePhoto = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const positionRef = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const dragStart = useRef(null);
  const lastPointer = useRef(null);

  const hasAnimated = useRef(false);
  const swingTimer = useRef(null);
  const animationFrame = useRef(null);

  const angle = Math.atan2(position.x, 280) * (180 / Math.PI);

  // Memperbarui posisi foto
  const updatePosition = (nextPosition) => {
    positionRef.current = nextPosition;
    setPosition(nextPosition);
  };

  // Animasi awal ketika About muncul
  useEffect(() => {
    const aboutSection = document.getElementById("about");

    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsSwinging(true);

          swingTimer.current = setTimeout(() => {
            setIsSwinging(false);
          }, 6000);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();
      clearTimeout(swingTimer.current);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // Mulai menarik foto
  const handlePointerDown = (e) => {
    e.preventDefault();

    e.currentTarget.setPointerCapture(e.pointerId);

    cancelAnimationFrame(animationFrame.current);

    velocity.current = { x: 0, y: 0 };

    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: positionRef.current.x,
      startY: positionRef.current.y,
    };

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };

    setIsDragging(true);
    setIsReturning(false);
    setIsSwinging(false);

    clearTimeout(swingTimer.current);
  };

  // Mengikuti gerakan mouse atau jari
  const handlePointerMove = (e) => {
    if (!dragStart.current) return;

    const dx = e.clientX - dragStart.current.mouseX;
    const dy = e.clientY - dragStart.current.mouseY;

    const nextPosition = {
      x: Math.max(
        -130,
        Math.min(130, dragStart.current.startX + dx)
      ),
      y: Math.max(
        -100,
        Math.min(150, dragStart.current.startY + dy)
      ),
    };

    updatePosition(nextPosition);

    // Menghitung kecepatan tarikan terakhir
    const now = performance.now();
    const elapsed = now - lastPointer.current.time;

    if (elapsed > 0) {
      velocity.current = {
        x: ((e.clientX - lastPointer.current.x) / elapsed) * 16,
        y: ((e.clientY - lastPointer.current.y) / elapsed) * 16,
      };
    }

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
    };
  };

  // Melepaskan foto
  const handlePointerUp = () => {
    if (!dragStart.current) return;

    dragStart.current = null;

    setIsDragging(false);
    setIsReturning(true);
  };

  // Fisika pegas / tali elastis
  useEffect(() => {
    if (!isReturning || isDragging) return;

    const animate = () => {
      const current = positionRef.current;

      // Kekuatan pegas
      const spring = 0.035;

      // Redaman pantulan
      const damping = 0.88;

      // Tarikan kembali menuju titik awal
      velocity.current.x += -current.x * spring;
      velocity.current.y += -current.y * spring;

      // Mengurangi kecepatan secara bertahap
      velocity.current.x *= damping;
      velocity.current.y *= damping;

      const nextPosition = {
        x: current.x + velocity.current.x,
        y: current.y + velocity.current.y,
      };

      // Menghentikan animasi ketika sudah stabil
      if (
        Math.abs(nextPosition.x) < 0.15 &&
        Math.abs(nextPosition.y) < 0.15 &&
        Math.abs(velocity.current.x) < 0.15 &&
        Math.abs(velocity.current.y) < 0.15
      ) {
        updatePosition({ x: 0, y: 0 });
        velocity.current = { x: 0, y: 0 };
        setIsReturning(false);
        return;
      }

      updatePosition(nextPosition);

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isReturning, isDragging]);

  return (
    <div
      className={`absolute left-1/2 top-[124px] -ml-[150px] z-30 h-[620px] w-[300px] ${
        isSwinging && !isDragging && !isReturning
          ? "animate-rope-swing"
          : ""
      }`}
    >
      {/* TALI ELASTIS */}
      <svg
        viewBox="0 0 300 620"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <line
          x1="150"
          y1="0"
          x2={150 + position.x}
          y2={180 + position.y}
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transition:
              isDragging || isReturning
                ? "none"
                : "all 0.3s ease",
          }}
        />

        {/* PENGAIT */}
        <circle cx="150" cy="0" r="5" fill="black" />
      </svg>

      {/* FOTO */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        style={{
          transform: `
            translate(
              calc(-50% + ${position.x}px),
              ${180 + position.y}px
            )
            rotate(${angle}deg)
          `,
          transition:
            isDragging || isReturning
              ? "none"
              : "transform 0.5s ease",
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="absolute left-1/2 top-0 z-20 h-[400px] w-[320px] overflow-hidden rounded-[45px] shadow-xl"
      >
        <img
          src={fotoabout}
          alt="Foto Febru"
          draggable="false"
          className="pointer-events-none h-full w-full select-none object-cover object-center"
        />
      </div>
    </div>
  );
};

// ================= ABOUT SECTION =================
const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-white px-5 py-20 text-black md:px-10"
    >
      {/* Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h1 className="select-none font-bbh text-[45vw] leading-none text-[#ded7d7] opacity-90 md:text-[25vw]">
          FEB <br /> DEV
        </h1>
      </div>

      {/* ABOUT LABEL */}
      <div className="relative z-20 mx-auto mb-12 flex w-fit flex-col items-center">
        <div className="rounded-full bg-black px-8 py-3 font-bbh text-sm text-white">
          ABOUT
        </div>
      </div>

      {/* FOTO MENGGANTUNG DARI JUDUL ABOUT */}
      <DraggablePhoto />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-5">

        {/* LEFT CONTENT */}
        <div className="order-2 md:order-1">
          <h1 className="font-bbh text-3xl uppercase leading-[1.05] tracking-tight text-black md:text-4xl lg:text-3xl">
            HI I'M FEBRU
            <br />
            FERDIANSYAH
            <br />
            COMPUTER
            <br />
            SCIENCE
            <br />
            STUDENT
          </h1>

          <a
            href="#project"
            className="mt-5 inline-flex rounded-full bg-black px-7 py-3 font-bbh text-xs text-white transition duration-300 hover:-translate-y-1 hover:bg-gray-500"
          >
            VIEW PROJECT
          </a>
        </div>

        {/* CENTER SPACE */}
        <div className="order-1 h-[620px] md:order-2"></div>

        {/* RIGHT CONTENT */}
        <div className="order-3 md:order-3">
          <p className="text-lg font-semibold leading-snug text-black md:text-base lg:text-2xl">
            Computer Science student at Cakrawala University specializing in{" "}
            <span className="font-extrabold">
              Full-Stack Development, Database Systems, and UI/UX Design.
            </span>{" "}
            Passionate about solving complex problems—especially in Back-End
            architecture—and turning creative ideas into efficient, meaningful
            digital experiences.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
