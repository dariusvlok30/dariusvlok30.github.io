import React, { useState, useEffect } from "react";
import { Mail, Linkedin, MapPin, ArrowRight } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { personalInfo } from "../data/mock";
import BlobReveal from "./BlobReveal";

const ROLES = [
  "Full Stack AI Engineer",
  "Performance Optimizer",
  "Enterprise Solution Architect",
  "AI Agent Developer",
  "Automation Specialist",
];

/* ── Typewriter ─────────────────────────────────────────────────────────── */
const TypeWriter = ({ words, speed = 80, pause = 2000 }) => {
  const [text, setText]           = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let t;
    if (!deleting && text === word)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "")
      { setDeleting(false); setWordIndex(i => (i + 1) % words.length); }
    else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? speed / 2 : speed
      );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return (
    <span>
      {text}
      <span className="inline-block w-0.5 h-[1em] bg-red-600 ml-px align-middle animate-pulse" />
    </span>
  );
};

/* ── HeroSection ────────────────────────────────────────────────────────── */
const HeroSection = () => (
  <section
    id="hero"
    className="relative w-full overflow-hidden"
    style={{ minHeight: "100svh" }}
  >
    {/* ── Warp shader background — white + red ── */}
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Warp
        style={{ width: "100%", height: "100%" }}
        proportion={0.42}
        softness={1}
        distortion={0.18}
        swirl={0.6}
        swirlIterations={8}
        shape="checks"
        shapeScale={0.08}
        scale={1.2}
        rotation={0}
        speed={0.6}
        colors={["#080808", "#1a0000", "#dc2626", "#0a0a0a"]}
      />
    </div>

    {/* Subtle bottom fade into dark sections below */}
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 1, height: "22%", background: "linear-gradient(to top, #080808 0%, transparent 100%)" }}
    />

    {/* ── Portrait — right side, bottom-anchored ── */}
    <div
      className="absolute"
      style={{ zIndex: 2, right: "2%", bottom: 0, height: "95%", aspectRatio: "3 / 4" }}
    >
      <BlobReveal
        baseImageUrl="/images/portrait-main.png"
        revealImageUrl="/images/portrait-alt.png"
        blobRadius={0.038}
        fadeSpeed={4.5}
      />
      <p
        className="absolute left-0 right-0 text-center text-[9px] font-mono tracking-[0.25em] uppercase pointer-events-none select-none"
        style={{ bottom: "1rem", color: "rgba(150,20,20,0.5)" }}
      >
        hover to reveal
      </p>
    </div>

    {/* Right edge vignette */}
    <div
      className="absolute inset-y-0 right-0 pointer-events-none"
      style={{ zIndex: 3, width: "15%", background: "linear-gradient(to left, #080808 0%, transparent 100%)" }}
    />

    {/* ── Left column — text — dark on white background ── */}
    <div
      className="relative flex flex-col justify-center min-h-screen"
      style={{ zIndex: 4, maxWidth: "54%", padding: "6rem 3rem 6rem 5vw" }}
    >
      {/* Available badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 w-fit"
        style={{ border: "1px solid rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.08)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-red-400/70">
          Available for opportunities
        </span>
      </div>

      {/* Hi label */}
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-white/25 mb-1">
        Hi, I'm
      </p>

      {/* Name */}
      <div className="mb-5">
        <h1
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', Arial, sans-serif",
            fontSize: "clamp(5rem, 11vw, 10rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#f0f0f0",
            fontWeight: 900,
          }}
        >
          DARIUS
        </h1>
        <h1
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', Arial, sans-serif",
            fontSize: "clamp(5rem, 11vw, 10rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "#dc2626",
            fontWeight: 900,
          }}
        >
          VLOK
        </h1>
      </div>

      {/* Role typewriter */}
      <div className="text-sm sm:text-base text-white/40 font-mono mb-4 h-6">
        <TypeWriter words={ROLES} />
      </div>

      {/* Tagline */}
      <p
        className="text-sm text-white/30 italic pl-4 mb-10 max-w-sm leading-relaxed"
        style={{ borderLeft: "2px solid rgba(220,38,38,0.5)" }}
      >
        Racing through development with AI
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="#projects"
          onClick={e => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 text-white font-semibold text-sm hover:bg-red-500 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(220,38,38,0.4)]"
        >
          View Projects
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white/60 hover:text-white transition-all duration-300"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
        >
          <Mail className="w-4 h-4" />
          Get in Touch
        </a>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-5 text-xs text-white/25">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-red-600/60" />
          {personalInfo.location}
        </span>
        <span className="w-px h-3 bg-white/10" />
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-300"
        >
          <Linkedin className="w-3 h-3" />
          LinkedIn
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-8 flex flex-col items-center gap-2" style={{ zIndex: 5 }}>
      <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-white/20">Scroll</span>
      <div
        className="w-px h-10 bg-gradient-to-b from-red-600/50 to-transparent"
        style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
      />
    </div>

    <style>{`
      @keyframes scrollPulse {
        0%, 100% { opacity: 0.3; }
        50%       { opacity: 1; }
      }
    `}</style>
  </section>
);

export default HeroSection;
