import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Mail, Linkedin, MapPin, ArrowRight, ChevronDown } from "lucide-react";
import { personalInfo } from "../data/mock";
// import BlobReveal from "./BlobReveal"; // re-enable portrait block when ready (see norris.md)

const ROLES = [
  "Full Stack AI Engineer",
  "Performance Optimizer",
  "Enterprise Architect",
  "AI Agent Developer",
  "Automation Specialist",
];

/* ── Typewriter ─────────────────────────────────────────────────────────── */
const TypeWriter = ({ words, speed = 75, pause = 2200 }) => {
  const [text, setText]           = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting]   = useState(false);
  useEffect(() => {
    const word = words[wordIndex];
    let t;
    if (!deleting && text === word)      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "")    { setDeleting(false); setWordIndex(i => (i+1) % words.length); }
    else t = setTimeout(() => setText(deleting ? word.slice(0,text.length-1) : word.slice(0,text.length+1)), deleting ? speed/2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, speed, pause]);
  return <span>{text}<span className="inline-block w-0.5 h-[1em] bg-green-500 ml-0.5 align-middle animate-pulse"/></span>;
};

/* ── 3D Letter — each char animates in with depth + stagger ─────────────── */
const AnimatedWord = ({ text, color, fontSize, delay = 0, stagger = 0.06 }) => (
  <span style={{ display: "block", lineHeight: 0.88, perspective: "600px" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, rotateX: -90, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        transition={{
          delay: delay + i * stagger,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          display: "inline-block",
          color,
          fontSize,
          fontFamily: "'Bebas Neue', 'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          transformOrigin: "50% 100%",
          willChange: "transform",
        }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

/* ── Floating badge ─────────────────────────────────────────────────────── */
const FloatingBadge = ({ children, delay, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

/* ── HeroSection ────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // Parallax: background text drifts up slower than scroll
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: "radial-gradient(rgba(22,163,74,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Green radial glow at centre bottom ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 0,
          bottom: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "80%", height: "70%",
          background: "radial-gradient(ellipse at 50% 100%, rgba(22,163,74,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Giant DARIUS VLOK — BEHIND portrait ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1, y: bgTextY }}
      >
        <AnimatedWord
          text="DARIUS"
          color="rgba(15,23,42,0.07)"
          fontSize="clamp(6rem, 18vw, 18rem)"
          delay={0.05}
          stagger={0.07}
        />
        <AnimatedWord
          text="VLOK"
          color="rgba(22,163,74,0.12)"
          fontSize="clamp(6rem, 18vw, 18rem)"
          delay={0.45}
          stagger={0.07}
        />
      </motion.div>

      {/* Portrait disabled — re-enable when ready (see norris.md) */}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 3, height: "18%", background: "linear-gradient(to top, #f9fafb 0%, transparent 100%)" }}
      />

      {/* ── Left column ── */}
      <div
        className="absolute flex flex-col justify-center"
        style={{ zIndex: 4, left: "3vw", top: "50%", transform: "translateY(-50%)", width: "clamp(150px, 21%, 240px)" }}
      >
        <motion.p
          initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.55, ease: "easeOut" }}
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 mb-2"
        >
          Hi, I'm
        </motion.p>

        {/* Small name for left col */}
        <motion.div
          initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.55, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="block font-black leading-none tracking-tight text-gray-900"
            style={{ fontFamily:"'Bebas Neue','Arial Black',sans-serif", fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
            DARIUS
          </span>
          <span className="block font-black leading-none tracking-tight text-green-600"
            style={{ fontFamily:"'Bebas Neue','Arial Black',sans-serif", fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
            VLOK
          </span>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="text-[11px] text-gray-500 font-mono mb-4 h-5"
        >
          <TypeWriter words={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-[11px] text-gray-400 italic pl-3 mb-7 leading-relaxed"
          style={{ borderLeft: "2px solid rgba(22,163,74,0.45)" }}
        >
          Racing through development with AI
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="flex flex-col gap-2.5"
        >
          <motion.a
            whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(22,163,74,0.35)" }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior:"smooth" }); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white font-semibold text-xs transition-colors duration-200 hover:bg-green-500"
          >
            View Projects <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
            style={{ border: "1px solid rgba(0,0,0,0.11)", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)" }}
          >
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </motion.a>
        </motion.div>
      </div>

      {/* ── Right column ── */}
      <div
        className="absolute flex flex-col justify-center gap-4"
        style={{ zIndex: 4, right: "3vw", top: "50%", transform: "translateY(-50%)", width: "clamp(120px, 17%, 190px)" }}
      >
        <FloatingBadge delay={1.6}
          style={{ display:"flex", alignItems:"center", gap:"8px" }}
        >
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-green-700 group transition-colors duration-200"
          >
            <span className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-green-400 transition-colors duration-200">
              <Linkedin className="w-3.5 h-3.5" />
            </span>
            LinkedIn
          </a>
        </FloatingBadge>

        <FloatingBadge delay={1.75} style={{}}>
          <span className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-green-600" />
            </span>
            {personalInfo.location}
          </span>
        </FloatingBadge>

        {/* Speed stat */}
        <FloatingBadge delay={2.15} style={{}}>
          <div className="px-3 py-2 rounded-xl" style={{ background:"rgba(15,23,42,0.03)", border:"1px solid rgba(0,0,0,0.07)" }}>
            <p className="text-[18px] font-black text-gray-900 leading-none">10x</p>
            <p className="text-[9px] text-gray-400 font-mono uppercase tracking-widest mt-0.5">Faster with AI</p>
          </div>
        </FloatingBadge>
      </div>

      {/* ── Animated horizontal rule line that draws itself ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ zIndex: 4, bottom: "22%", left: "3vw", right: "3vw" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ height: "1px", background: "linear-gradient(to right, rgba(22,163,74,0.3) 0%, rgba(22,163,74,0.05) 50%, transparent 100%)" }} />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 5 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
