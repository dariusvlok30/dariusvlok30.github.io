import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, MapPin, ArrowRight, Github } from "lucide-react";
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
const TypeWriter = ({ words, speed = 80, pause = 2200 }) => {
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
      <span className="inline-block w-0.5 h-[1em] bg-green-500 ml-px align-middle animate-pulse" />
    </span>
  );
};

/* ── Split text with stagger animation ─────────────────────────────────── */
const SplitText = ({ text, delay = 0, color = "#0a0a0a", fontSize }) => (
  <span style={{ display: "block", lineHeight: 0.85 }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: delay + i * 0.055,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          display: "inline-block",
          color,
          fontSize,
          fontFamily: "'Bebas Neue', 'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
        }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

/* ── HeroSection ────────────────────────────────────────────────────────── */
const HeroSection = () => (
  <section
    id="hero"
    className="relative w-full overflow-hidden"
    style={{ minHeight: "100svh", background: "#ffffff" }}
  >
    {/* ── Layer 0: Warp shader — white + green ── */}
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Warp
        style={{ width: "100%", height: "100%" }}
        proportion={0.38}
        softness={1}
        distortion={0.10}
        swirl={0.5}
        swirlIterations={6}
        shape="checks"
        shapeScale={0.06}
        scale={1.3}
        rotation={0}
        speed={0.4}
        colors={["#ffffff", "#f0fdf4", "#22c55e", "#ffffff"]}
      />
    </div>

    {/* ── Layer 1: Dot grid overlay ── */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        backgroundImage: "radial-gradient(rgba(22,163,74,0.12) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />

    {/* ── Layer 2: DARIUS VLOK — sits BEHIND the portrait ── */}
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      style={{ zIndex: 2 }}
    >
      <SplitText
        text="DARIUS"
        delay={0.1}
        color="rgba(15,23,42,0.12)"
        fontSize="clamp(7rem, 17vw, 17rem)"
      />
      <SplitText
        text="VLOK"
        delay={0.5}
        color="rgba(22,163,74,0.18)"
        fontSize="clamp(7rem, 17vw, 17rem)"
      />
    </div>

    {/* ── Layer 3: Portrait canvas — centered, bottom-anchored ── */}
    <div
      className="absolute"
      style={{
        zIndex: 3,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        height: "92%",
        aspectRatio: "3 / 4",
      }}
    >
      <BlobReveal
        baseImageUrl="/images/portrait-main.png"
        revealImageUrl="/images/portrait-alt.png"
        spotRadius={0.22}
        lerpSpeed={0.12}
        fadeInSpeed={8}
        fadeOutSpeed={5}
      />
    </div>

    {/* Bottom gradient fade into dark sections */}
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 4, height: "20%", background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)" }}
    />

    {/* Right edge fade */}
    <div
      className="absolute inset-y-0 right-0 pointer-events-none"
      style={{ zIndex: 4, width: "12%", background: "linear-gradient(to left, #ffffff 0%, transparent 100%)" }}
    />

    {/* ── Layer 5: Left column — text in front ── */}
    <div
      className="absolute flex flex-col justify-center"
      style={{
        zIndex: 5,
        left: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(160px, 22%, 260px)",
        padding: "1rem 0",
      }}
    >
      {/* Hi label */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 mb-2"
      >
        Hi, I'm
      </motion.p>

      {/* Name — small version on left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mb-5"
      >
        <span
          className="block font-black leading-none tracking-tight text-gray-900"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          DARIUS
        </span>
        <span
          className="block font-black leading-none tracking-tight text-green-600"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          VLOK
        </span>
      </motion.div>

      {/* Role typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="text-[11px] text-gray-500 font-mono mb-4 leading-relaxed"
      >
        <TypeWriter words={ROLES} />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-[11px] text-gray-400 italic pl-3 mb-7 leading-relaxed"
        style={{ borderLeft: "2px solid rgba(22,163,74,0.5)" }}
      >
        Racing through development with AI
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <a
          href="#projects"
          onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold text-xs hover:bg-green-500 transition-all duration-300 hover:shadow-[0_6px_24px_rgba(22,163,74,0.4)]"
        >
          View Projects <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs text-gray-700 hover:text-gray-900 transition-all duration-300"
          style={{ border: "1px solid rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
        >
          <Mail className="w-3.5 h-3.5" /> Get in Touch
        </a>
      </motion.div>
    </div>

    {/* ── Layer 5: Right column — meta info ── */}
    <div
      className="absolute flex flex-col justify-center gap-5"
      style={{
        zIndex: 5,
        right: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(120px, 18%, 200px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-green-700 transition-colors duration-300 group"
        >
          <span className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-green-400 transition-colors duration-300 shadow-sm">
            <Linkedin className="w-3.5 h-3.5" />
          </span>
          LinkedIn
        </a>

        <span className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-green-600" />
          </span>
          {personalInfo.location}
        </span>

        {/* Hover hint */}
        <div
          className="mt-4 px-3 py-2 rounded-xl text-center"
          style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}
        >
          <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-green-700/60">
            hover to reveal
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">the F1 suit</p>
        </div>
      </motion.div>
    </div>

    {/* ── Scroll indicator ── */}
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ zIndex: 6 }}
    >
      <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-gray-400">Scroll</span>
      <div
        className="w-px h-10 bg-gradient-to-b from-green-500/50 to-transparent"
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
